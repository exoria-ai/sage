#!/usr/bin/env python3
"""
Parse Solano County Board of Supervisors meeting documents (PDF) into structured JSON.

Extracts meeting content organized by agenda items for search and retrieval.

Usage:
    source .venv/bin/activate
    python scripts/parse-bos-meetings.py
"""

import json
import re
import sys
from dataclasses import dataclass, asdict, field
from pathlib import Path
from typing import Optional

try:
    import fitz  # PyMuPDF for PDF
except ImportError:
    print("PyMuPDF not installed. Run: pip install pymupdf")
    sys.exit(1)


# Paths
SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR.parent / "data" / "meetings" / "bos"
PDF_DIR = DATA_DIR / "pdfs"
OUTPUT_FILE = DATA_DIR / "bos-meetings.json"


@dataclass
class MeetingChunk:
    """A chunk of meeting document content."""
    id: str
    meeting_id: str
    committee: str
    meeting_date: str
    document_type: str  # "agenda" or "minutes"
    item_number: str
    item_title: str
    chunk_type: str  # "header", "consent", "action", "public_hearing", "general"
    text: str
    page_start: int = 1
    page_end: int = 1
    is_special_meeting: bool = False
    vote_result: Optional[str] = None
    resolution_number: Optional[str] = None


def extract_text_from_pdf(path: Path) -> tuple[str, int]:
    """Extract text from PDF file. Returns (text, page_count)."""
    doc = fitz.open(path)
    text_parts = []
    for page in doc:
        text_parts.append(page.get_text())
    doc.close()
    return "\n".join(text_parts), len(text_parts)


def extract_meeting_date(filename: str) -> Optional[str]:
    """Extract date from filename like 'bos-2025-01-07-minutes.pdf'."""
    match = re.search(r'(\d{4}-\d{2}-\d{2})', filename)
    return match.group(1) if match else None


def extract_document_type(filename: str) -> str:
    """Extract document type from filename."""
    if 'minutes' in filename.lower():
        return 'minutes'
    return 'agenda'


def is_special_meeting(filename: str) -> bool:
    """Check if this is a special meeting."""
    return 'special' in filename.lower()


def parse_bos_agenda_items(text: str) -> list[dict]:
    """Parse BOS agenda/minutes items from text."""
    items = []

    # BOS uses numbered items like "25-962" or just numbers
    # Pattern for Legistar-style items: XX-XXX followed by title
    item_pattern = re.compile(
        r'^(\d{2}-\d+)\s*\n(.+?)(?=\n\d{2}-\d+\s*\n|\nCONSENT|\nSEPARATE ACTION|\nADJOURNMENT|\nCLOSED SESSION|\Z)',
        re.MULTILINE | re.DOTALL
    )

    matches = list(item_pattern.finditer(text))

    for match in matches:
        item_num = match.group(1)
        content = match.group(2).strip()

        # Extract title (first line or sentence)
        lines = content.split('\n')
        title = lines[0].strip() if lines else content[:100]

        # Clean up title
        title = re.sub(r'^(Adopt|Approve|Receive|Accept|Authorize|Conduct|Consider)', r'\1', title)
        title = title[:200]  # Cap title length

        # Detect item type
        chunk_type = 'general'
        content_lower = content.lower()
        if 'public hearing' in content_lower:
            chunk_type = 'public_hearing'
        elif 'resolution' in content_lower or 'ordinance' in content_lower:
            chunk_type = 'action'
        elif 'receive' in content_lower and 'report' in content_lower:
            chunk_type = 'report'

        # Extract vote result if present
        vote_result = None
        vote_match = re.search(r'(\d-\d)\s*vote', content, re.IGNORECASE)
        if vote_match:
            vote_result = vote_match.group(1)

        # Extract resolution number if present
        resolution = None
        res_match = re.search(r'Resolution\s+No\.\s*(\d{4}-\d+)', content)
        if res_match:
            resolution = res_match.group(1)

        items.append({
            'number': item_num,
            'title': title,
            'content': content,
            'chunk_type': chunk_type,
            'vote_result': vote_result,
            'resolution': resolution,
        })

    return items


def parse_bos_sections(text: str) -> list[dict]:
    """Parse BOS meeting sections (CONSENT, SEPARATE ACTION, etc.)."""
    sections = []

    # Common BOS section headers
    section_patterns = [
        (r'CALL TO ORDER.*?(?=\nROLL CALL|\nPRESENTATIONS|\Z)', 'call_to_order', 'Call to Order'),
        (r'ROLL CALL.*?(?=\nPRESENTATIONS|\nCONSENT|\Z)', 'roll_call', 'Roll Call'),
        (r'PRESENTATIONS\n(.*?)(?=\nCONSENT|\nSEPARATE ACTION|\nPUBLIC COMMENT|\Z)', 'presentations', 'Presentations'),
        (r'CONSENT CALENDAR.*?\n(.*?)(?=\nSEPARATE ACTION|\nPUBLIC COMMENT|\nBOARD MEMBER|\Z)', 'consent', 'Consent Calendar'),
        (r'SEPARATE ACTION ITEMS.*?\n(.*?)(?=\nPUBLIC COMMENT|\nBOARD MEMBER|\nADJOURNMENT|\Z)', 'action', 'Separate Action Items'),
        (r'PUBLIC COMMENT.*?(?=\nBOARD MEMBER|\nADJOURNMENT|\Z)', 'public_comment', 'Public Comment'),
        (r'CLOSED SESSION.*?(?=\nADJOURNMENT|\Z)', 'closed_session', 'Closed Session'),
        (r'ADJOURNMENT.*', 'adjournment', 'Adjournment'),
    ]

    for pattern, chunk_type, title in section_patterns:
        match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        if match:
            content = match.group(0).strip()
            if len(content) > 50:  # Only include non-trivial sections
                sections.append({
                    'number': '0',
                    'title': title,
                    'content': content[:6000],  # Cap content
                    'chunk_type': chunk_type,
                    'vote_result': None,
                    'resolution': None,
                })

    return sections


def parse_document(path: Path) -> list[MeetingChunk]:
    """Parse a BOS meeting document into chunks."""
    chunks = []

    filename = path.name
    meeting_date = extract_meeting_date(filename)
    doc_type = extract_document_type(filename)
    special = is_special_meeting(filename)

    if not meeting_date:
        print(f"  Warning: Could not extract date from {filename}")
        return chunks

    suffix = "-special" if special else ""
    meeting_id = f"bos-{meeting_date}{suffix}"

    # Extract text
    text, page_count = extract_text_from_pdf(path)

    # Clean text
    text = re.sub(r'\r\n', '\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)

    # Try to parse individual agenda items first
    items = parse_bos_agenda_items(text)

    # If no items found, try to parse sections
    if not items:
        items = parse_bos_sections(text)

    if not items:
        # Fallback to single chunk
        chunk = MeetingChunk(
            id=f"{meeting_id}-{doc_type}-001",
            meeting_id=meeting_id,
            committee="Board of Supervisors",
            meeting_date=meeting_date,
            document_type=doc_type,
            item_number="0",
            item_title="Full Document",
            chunk_type="general",
            text=text[:10000],  # Cap at 10000 chars
            page_start=1,
            page_end=page_count,
            is_special_meeting=special,
        )
        chunks.append(chunk)
    else:
        # Create chunk for each item
        for i, item in enumerate(items):
            chunk = MeetingChunk(
                id=f"{meeting_id}-{doc_type}-{str(i+1).zfill(3)}",
                meeting_id=meeting_id,
                committee="Board of Supervisors",
                meeting_date=meeting_date,
                document_type=doc_type,
                item_number=item['number'],
                item_title=item['title'],
                chunk_type=item['chunk_type'],
                text=item['content'][:6000],  # Cap each chunk
                page_start=1,
                page_end=page_count,
                is_special_meeting=special,
                vote_result=item.get('vote_result'),
                resolution_number=item.get('resolution'),
            )
            chunks.append(chunk)

    return chunks


def main():
    print("=" * 60)
    print("Board of Supervisors Meeting Document Parser")
    print("=" * 60)

    if not PDF_DIR.exists():
        print(f"Error: PDF directory not found: {PDF_DIR}")
        print("Run scrape-bos-meetings.py first to download documents.")
        sys.exit(1)

    # Find all PDF documents
    pdf_files = sorted(PDF_DIR.glob("*.pdf"))

    print(f"\nFound {len(pdf_files)} PDF documents")

    all_chunks = []
    meetings_seen = set()

    for path in pdf_files:
        print(f"\nProcessing: {path.name}")
        try:
            chunks = parse_document(path)
            all_chunks.extend(chunks)

            for chunk in chunks:
                meetings_seen.add(chunk.meeting_id)

            print(f"  Extracted {len(chunks)} chunks")
        except Exception as e:
            print(f"  Error: {e}")
            import traceback
            traceback.print_exc()

    # Build output structure
    output = {
        "committee": "Board of Supervisors",
        "committee_id": "bos",
        "description": "Solano County Board of Supervisors meetings",
        "source_url": "https://solano.granicus.com/ViewPublisher.php?view_id=8",
        "total_meetings": len(meetings_seen),
        "total_chunks": len(all_chunks),
        "date_range": {
            "earliest": min(c.meeting_date for c in all_chunks) if all_chunks else None,
            "latest": max(c.meeting_date for c in all_chunks) if all_chunks else None,
        },
        "chunks": [asdict(c) for c in all_chunks]
    }

    # Write output
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(output, f, indent=2)

    print("\n" + "=" * 60)
    print("Parse Summary")
    print("=" * 60)
    print(f"Total meetings: {len(meetings_seen)}")
    print(f"Total chunks: {len(all_chunks)}")

    # Count by type
    by_doc_type = {}
    by_chunk_type = {}
    special_count = 0
    for chunk in all_chunks:
        by_doc_type[chunk.document_type] = by_doc_type.get(chunk.document_type, 0) + 1
        by_chunk_type[chunk.chunk_type] = by_chunk_type.get(chunk.chunk_type, 0) + 1
        if chunk.is_special_meeting:
            special_count += 1

    print(f"\nBy document type:")
    for dt, count in sorted(by_doc_type.items()):
        print(f"  {dt}: {count}")

    print(f"\nBy chunk type:")
    for ct, count in sorted(by_chunk_type.items()):
        print(f"  {ct}: {count}")

    print(f"\nSpecial meeting chunks: {special_count}")

    print(f"\nOutput: {OUTPUT_FILE}")
    print(f"Size: {OUTPUT_FILE.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
