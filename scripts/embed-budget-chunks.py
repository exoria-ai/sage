#!/usr/bin/env python3
"""
Generate embeddings for budget chunks and store in SQLite with sqlite-vec.

This script reads the parsed budget JSON, generates embeddings using OpenAI,
and stores everything in a SQLite database with vector search capability.

Usage:
    source .venv/bin/activate
    python scripts/embed-budget-chunks.py [--input path/to/chunks.json] [--db path/to/budget.db]

Requirements:
    pip install openai sqlite-vec
"""

import argparse
import json
import os
import sqlite3
import struct
import sys
import time
from pathlib import Path
from typing import Optional

try:
    import openai
except ImportError:
    print("Error: openai package required. Install with: pip install openai")
    sys.exit(1)

try:
    import sqlite_vec
except ImportError:
    print("Error: sqlite-vec package required. Install with: pip install sqlite-vec")
    sys.exit(1)


# Embedding model configuration
EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIM = 1536
BATCH_SIZE = 100  # OpenAI allows up to 2048 inputs, but we'll batch smaller


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


def get_openai_client() -> openai.OpenAI:
    """Create OpenAI client."""
    api_key = os.environ.get("OPENAI_API_KEY")

    # Try loading from .env.local if not in environment
    if not api_key:
        env_vars = load_env_file('.env.local')
        api_key = env_vars.get("OPENAI_API_KEY")

    if not api_key:
        print("Error: OPENAI_API_KEY not found.")
        print("Set it via environment variable or add to .env.local:")
        print("  export OPENAI_API_KEY=sk-...")
        print("  or")
        print("  echo 'OPENAI_API_KEY=sk-...' >> .env.local")
        sys.exit(1)

    return openai.OpenAI(api_key=api_key)


def create_database(db_path: str) -> sqlite3.Connection:
    """Create SQLite database with vector extension."""
    conn = sqlite3.connect(db_path)

    # Load the sqlite-vec extension
    conn.enable_load_extension(True)
    sqlite_vec.load(conn)
    conn.enable_load_extension(False)

    # Create tables
    conn.executescript("""
        -- Main chunks table
        CREATE TABLE IF NOT EXISTS budget_chunks (
            id TEXT PRIMARY KEY,
            document_id TEXT NOT NULL,
            fiscal_year TEXT NOT NULL,
            page_start INTEGER,
            page_end INTEGER,
            section_letter TEXT,
            section_name TEXT,
            department TEXT,
            budget_unit TEXT,
            fund TEXT,
            department_head TEXT,
            functional_area TEXT,
            subsection TEXT,
            chunk_type TEXT,
            text TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Indexes for filtering
        CREATE INDEX IF NOT EXISTS idx_chunks_document ON budget_chunks(document_id);
        CREATE INDEX IF NOT EXISTS idx_chunks_department ON budget_chunks(department);
        CREATE INDEX IF NOT EXISTS idx_chunks_section ON budget_chunks(section_letter);
        CREATE INDEX IF NOT EXISTS idx_chunks_type ON budget_chunks(chunk_type);

        -- Virtual table for vector search (will be created after we know count)
    """)

    return conn


def serialize_embedding(embedding: list[float]) -> bytes:
    """Serialize embedding to bytes for sqlite-vec."""
    return struct.pack(f'{len(embedding)}f', *embedding)


def generate_embeddings(client: openai.OpenAI, texts: list[str], verbose: bool = False) -> list[list[float]]:
    """Generate embeddings for a batch of texts."""
    if verbose:
        print(f"  Generating embeddings for {len(texts)} texts...")

    response = client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=texts,
        dimensions=EMBEDDING_DIM
    )

    return [item.embedding for item in response.data]


def process_chunks(
    conn: sqlite3.Connection,
    chunks: list[dict],
    client: openai.OpenAI,
    verbose: bool = False
) -> int:
    """Process chunks: insert metadata and generate embeddings."""
    cursor = conn.cursor()

    # Insert chunk metadata
    if verbose:
        print(f"Inserting {len(chunks)} chunks into database...")

    for chunk in chunks:
        cursor.execute("""
            INSERT OR REPLACE INTO budget_chunks
            (id, document_id, fiscal_year, page_start, page_end,
             section_letter, section_name, department, budget_unit, fund,
             department_head, functional_area, subsection, chunk_type, text)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            chunk['id'],
            chunk['document_id'],
            chunk.get('fiscal_year', 'FY2025-26'),
            chunk.get('page_start'),
            chunk.get('page_end'),
            chunk.get('section_letter'),
            chunk.get('section_name'),
            chunk.get('department'),
            chunk.get('budget_unit'),
            chunk.get('fund'),
            chunk.get('department_head'),
            chunk.get('functional_area'),
            chunk.get('subsection'),
            chunk.get('chunk_type'),
            chunk['text']
        ))

    conn.commit()

    # Create vector table
    if verbose:
        print(f"Creating vector table for {len(chunks)} embeddings...")

    cursor.execute(f"""
        CREATE VIRTUAL TABLE IF NOT EXISTS budget_embeddings USING vec0(
            chunk_id TEXT PRIMARY KEY,
            embedding float[{EMBEDDING_DIM}]
        )
    """)

    # Generate embeddings in batches
    total_embedded = 0
    texts = [c['text'] for c in chunks]
    ids = [c['id'] for c in chunks]

    for i in range(0, len(texts), BATCH_SIZE):
        batch_texts = texts[i:i + BATCH_SIZE]
        batch_ids = ids[i:i + BATCH_SIZE]

        if verbose:
            print(f"  Processing batch {i // BATCH_SIZE + 1}/{(len(texts) + BATCH_SIZE - 1) // BATCH_SIZE}...")

        try:
            embeddings = generate_embeddings(client, batch_texts, verbose=False)

            for chunk_id, embedding in zip(batch_ids, embeddings):
                cursor.execute(
                    "INSERT OR REPLACE INTO budget_embeddings (chunk_id, embedding) VALUES (?, ?)",
                    (chunk_id, serialize_embedding(embedding))
                )

            total_embedded += len(embeddings)
            conn.commit()

            # Rate limiting - OpenAI has limits
            if i + BATCH_SIZE < len(texts):
                time.sleep(0.5)

        except Exception as e:
            print(f"Error generating embeddings for batch starting at {i}: {e}")
            raise

    return total_embedded


def main():
    parser = argparse.ArgumentParser(description='Generate embeddings for budget chunks')
    parser.add_argument(
        '--input', '-i',
        default='data/budget/fy2025-26-recommended.json',
        help='Path to parsed chunks JSON'
    )
    parser.add_argument(
        '--db', '-d',
        default='data/budget/budget.db',
        help='Path for SQLite database'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Print progress information'
    )

    args = parser.parse_args()

    # Check input file
    if not Path(args.input).exists():
        print(f"Error: Input file not found: {args.input}")
        print("Run parse-budget-pdf.py first to create the chunks JSON.")
        sys.exit(1)

    # Load chunks
    if args.verbose:
        print(f"Loading chunks from {args.input}...")

    with open(args.input) as f:
        data = json.load(f)

    chunks = data['chunks']
    if args.verbose:
        print(f"Loaded {len(chunks)} chunks")

    # Create database
    if args.verbose:
        print(f"Creating database at {args.db}...")

    Path(args.db).parent.mkdir(parents=True, exist_ok=True)
    conn = create_database(args.db)

    # Get OpenAI client
    client = get_openai_client()

    # Process chunks
    try:
        total = process_chunks(conn, chunks, client, verbose=args.verbose)
        print(f"Successfully embedded {total} chunks")
        print(f"Database saved to {args.db}")
    finally:
        conn.close()


if __name__ == '__main__':
    main()
