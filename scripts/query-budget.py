#!/usr/bin/env python3
"""
Query the budget database with semantic search.

Usage:
    source .venv/bin/activate
    python scripts/query-budget.py "What is the Sheriff's budget?"

For testing without embeddings (keyword search only):
    python scripts/query-budget.py --keyword "Sheriff budget"
"""

import argparse
import json
import os
import sqlite3
import struct
import sys
from pathlib import Path

try:
    import sqlite_vec
    HAS_SQLITE_VEC = True
except ImportError:
    HAS_SQLITE_VEC = False

try:
    import openai
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False


def load_env_file(path: str) -> dict:
    """Load environment variables from a file."""
    env_vars = {}
    if os.path.exists(path):
        with open(path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key.strip()] = value.strip()
    return env_vars


def serialize_embedding(embedding: list[float]) -> bytes:
    """Serialize embedding to bytes for sqlite-vec."""
    return struct.pack(f'{len(embedding)}f', *embedding)


def get_query_embedding(query: str) -> list[float]:
    """Generate embedding for a query."""
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        env_vars = load_env_file('.env.local')
        api_key = env_vars.get("OPENAI_API_KEY")

    if not api_key:
        raise ValueError("OPENAI_API_KEY not set")

    client = openai.OpenAI(api_key=api_key)
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=query,
        dimensions=1536
    )
    return response.data[0].embedding


def semantic_search(conn: sqlite3.Connection, query: str, top_k: int = 5) -> list[dict]:
    """Perform semantic search using vector similarity."""
    # Generate query embedding
    query_embedding = get_query_embedding(query)
    query_bytes = serialize_embedding(query_embedding)

    # Search for similar vectors
    cursor = conn.cursor()
    cursor.execute("""
        SELECT
            chunk_id,
            distance
        FROM budget_embeddings
        WHERE embedding MATCH ?
        ORDER BY distance
        LIMIT ?
    """, (query_bytes, top_k))

    results = []
    for chunk_id, distance in cursor.fetchall():
        # Get chunk metadata and text
        cursor.execute("""
            SELECT * FROM budget_chunks WHERE id = ?
        """, (chunk_id,))
        row = cursor.fetchone()
        if row:
            columns = [desc[0] for desc in cursor.description]
            chunk = dict(zip(columns, row))
            chunk['similarity_score'] = 1 - distance  # Convert distance to similarity
            results.append(chunk)

    return results


def keyword_search(conn: sqlite3.Connection, query: str, top_k: int = 5) -> list[dict]:
    """Perform simple keyword search (fallback when no embeddings)."""
    cursor = conn.cursor()

    # Split query into keywords
    keywords = query.lower().split()

    # Build WHERE clause with LIKE for each keyword
    where_clauses = []
    params = []
    for keyword in keywords:
        where_clauses.append("(LOWER(text) LIKE ? OR LOWER(department) LIKE ? OR LOWER(section_name) LIKE ?)")
        params.extend([f'%{keyword}%', f'%{keyword}%', f'%{keyword}%'])

    where_sql = " AND ".join(where_clauses) if where_clauses else "1=1"

    cursor.execute(f"""
        SELECT * FROM budget_chunks
        WHERE {where_sql}
        LIMIT ?
    """, params + [top_k])

    columns = [desc[0] for desc in cursor.description]
    results = []
    for row in cursor.fetchall():
        chunk = dict(zip(columns, row))
        chunk['similarity_score'] = 0.5  # Placeholder score for keyword search
        results.append(chunk)

    return results


def search_from_json(json_path: str, query: str, top_k: int = 5, department_filter: str = None) -> list[dict]:
    """Search directly from JSON file (no database needed)."""
    with open(json_path) as f:
        data = json.load(f)

    keywords = query.lower().split()
    results = []

    for chunk in data['chunks']:
        text_lower = chunk['text'].lower()
        dept = chunk.get('department') or ''
        dept_lower = dept.lower()
        section_lower = (chunk.get('section_name') or '').lower()
        subsection_lower = (chunk.get('subsection') or '').lower()

        # Apply department filter if specified
        if department_filter and department_filter.lower() not in dept_lower:
            continue

        # Score calculation - weight different match types
        score = 0.0

        for kw in keywords:
            # Department name match is most valuable
            if kw in dept_lower:
                score += 3.0
            # Subsection match (e.g., "budget summary")
            if kw in subsection_lower:
                score += 2.0
            # Section name match
            if kw in section_lower:
                score += 1.5
            # Text content match
            if kw in text_lower:
                score += 1.0

        if score > 0:
            chunk_copy = chunk.copy()
            # Normalize score
            chunk_copy['similarity_score'] = min(score / (len(keywords) * 3), 1.0)
            results.append(chunk_copy)

    # Sort by score and return top_k
    results.sort(key=lambda x: x['similarity_score'], reverse=True)
    return results[:top_k]


def format_result(chunk: dict, show_text: bool = True) -> str:
    """Format a search result for display."""
    lines = [
        f"ID: {chunk['id']}",
        f"Pages: {chunk.get('page_start', '?')}-{chunk.get('page_end', '?')}",
        f"Section: {chunk.get('section_letter', '?')}. {chunk.get('section_name', 'Unknown')}",
        f"Department: {chunk.get('department', 'N/A')}",
        f"Type: {chunk.get('chunk_type', 'unknown')}",
        f"Score: {chunk.get('similarity_score', 0):.3f}",
    ]

    if show_text:
        text_preview = chunk['text'][:500].replace('\n', ' ')
        lines.append(f"Text: {text_preview}...")

    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description='Query the budget database')
    parser.add_argument('query', help='Search query')
    parser.add_argument(
        '--db', '-d',
        default='data/budget/budget.db',
        help='Path to SQLite database'
    )
    parser.add_argument(
        '--json', '-j',
        default='data/budget/fy2025-26-recommended.json',
        help='Path to JSON file (fallback if no database)'
    )
    parser.add_argument(
        '--keyword', '-k',
        action='store_true',
        help='Use keyword search instead of semantic search'
    )
    parser.add_argument(
        '--top', '-t',
        type=int,
        default=5,
        help='Number of results to return'
    )
    parser.add_argument(
        '--no-text',
        action='store_true',
        help='Hide text preview in results'
    )

    args = parser.parse_args()

    # Try database first
    db_path = Path(args.db)
    json_path = Path(args.json)

    if db_path.exists() and HAS_SQLITE_VEC:
        conn = sqlite3.connect(str(db_path))
        conn.enable_load_extension(True)
        sqlite_vec.load(conn)
        conn.enable_load_extension(False)

        try:
            if args.keyword:
                print(f"Keyword search in database: '{args.query}'\n")
                results = keyword_search(conn, args.query, args.top)
            else:
                print(f"Semantic search in database: '{args.query}'\n")
                results = semantic_search(conn, args.query, args.top)
        finally:
            conn.close()

    elif json_path.exists():
        print(f"Database not found, searching JSON: '{args.query}'\n")
        results = search_from_json(str(json_path), args.query, args.top)

    else:
        print(f"Error: Neither database ({db_path}) nor JSON ({json_path}) found")
        sys.exit(1)

    # Display results
    if not results:
        print("No results found.")
    else:
        print(f"Found {len(results)} results:\n")
        for i, result in enumerate(results, 1):
            print(f"{'='*60}")
            print(f"Result {i}:")
            print(format_result(result, show_text=not args.no_text))
            print()


if __name__ == '__main__':
    main()
