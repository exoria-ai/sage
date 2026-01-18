#!/usr/bin/env python3
"""
Parse Solano County 2008 General Plan PDFs into structured JSON for search/RAG.

This script processes all General Plan chapter PDFs, resolution amendments,
and EIR documents, extracting text and metadata into searchable chunks.

Usage:
    source .venv/bin/activate
    python scripts/parse-general-plan-pdfs.py [--verbose]
"""

import argparse
import json
import re
import sys
from dataclasses import dataclass, asdict, field
from pathlib import Path
from typing import Optional, List

import fitz  # PyMuPDF


@dataclass
class GeneralPlanChunk:
    """A chunk of General Plan document content for indexing."""
    id: str
    document_id: str
    document_type: str  # "chapter", "appendix", "resolution", "eir", "diagram"
    document_title: str  # Full document title
    chapter_number: Optional[str]  # e.g., "1", "2", "10", "A", "B"
    page_start: int
    page_end: int
    section_title: Optional[str]  # e.g., "Land Use Goals and Policies"
    subsection_title: Optional[str]  # e.g., "Goal LU.G-1"
    chunk_type: str  # "narrative", "table", "policy", "goal", "toc"
    text: str
    keywords: List[str] = field(default_factory=list)  # Extracted key terms


# Document categorization based on filename patterns
DOCUMENT_TYPES = {
    r'^Chapter\s*(\d+)': ('chapter', lambda m: m.group(1)),
    r'^Appendix\s*([A-E])': ('appendix', lambda m: m.group(1)),
    r'^Resolution': ('resolution', lambda m: None),
    r'^Solano County DEIR': ('eir', lambda m: 'DEIR'),
    r'^Addendum': ('eir', lambda m: 'Addendum'),
    r'^Volum[ne]\s*(I+)': ('eir', lambda m: f'FEIR-{m.group(1)}'),
    r'^General Plan Land Use Diagram': ('diagram', lambda m: None),
}

# Known section headers in General Plan chapters
SECTION_PATTERNS = [
    # Goals and policies
    r'^(GOAL\s+[A-Z]+\.G-\d+)',
    r'^(Policy\s+[A-Z]+\.[A-Z]-\d+)',
    # Major section headers
    r'^(INTRODUCTION|PURPOSE|BACKGROUND|VISION)',
    r'^(GOALS?\s+AND\s+POLICIES)',
    r'^(IMPLEMENTATION\s+PROGRAMS?)',
    r'^(EXISTING\s+CONDITIONS)',
    r'^(SETTING|CONTEXT)',
    # Chapter-specific patterns
    r'^(LAND\s+USE\s+DESIGNATIONS?)',
    r'^(AGRICULTURAL\s+RESOURCES?)',
    r'^(CIRCULATION\s+AND\s+MOBILITY)',
    r'^(HOUSING\s+NEEDS?\s+ASSESSMENT)',
    r'^(CONSTRAINTS?\s+ANALYSIS)',
    r'^(RESOURCES?\s+INVENTORY)',
]

# Keywords to extract for better search
KEYWORD_PATTERNS = [
    r'\b(ADU|accessory dwelling unit)\b',
    r'\b(ag(?:ricultural)?(?:\s+preserve)?)\b',
    r'\b(setback)s?\b',
    r'\b(density|FAR|floor area ratio)\b',
    r'\b(height limit)s?\b',
    r'\b(parcel|lot)\s+size\b',
    r'\b(zoning|zone)\b',
    r'\b(permit|entitlement)s?\b',
    r'\b(CEQA|environmental)\b',
    r'\b(traffic|transportation|circulation)\b',
    r'\b(flood|drainage|storm\s*water)\b',
    r'\b(fire|wildfire|FHSZ)\b',
    r'\b(housing|residential)\b',
    r'\b(commercial|retail|industrial)\b',
    r'\b(open\s+space|conservation)\b',
    r'\b(public\s+facilities?|infrastructure)\b',
    r'\b(Suisun|Vallejo|Fairfield|Vacaville|Dixon|Benicia|Rio\s+Vista)\b',
]


def categorize_document(filename: str) -> tuple[str, Optional[str], str]:
    """
    Categorize a document based on its filename.
    Returns: (document_type, chapter_number, clean_title)
    """
    clean_name = filename.replace('.pdf', '').strip()

    for pattern, (doc_type, extract_num) in DOCUMENT_TYPES.items():
        match = re.search(pattern, clean_name, re.IGNORECASE)
        if match:
            chapter_num = extract_num(match) if extract_num else None
            return (doc_type, chapter_num, clean_name)

    return ('other', None, clean_name)


def extract_section_title(text: str) -> Optional[str]:
    """Try to extract a section title from text."""
    for pattern in SECTION_PATTERNS:
        match = re.search(pattern, text, re.MULTILINE | re.IGNORECASE)
        if match:
            return match.group(1).strip()
    return None


def extract_keywords(text: str) -> List[str]:
    """Extract relevant keywords from text."""
    keywords = set()
    text_lower = text.lower()

    for pattern in KEYWORD_PATTERNS:
        matches = re.findall(pattern, text_lower, re.IGNORECASE)
        for match in matches:
            if isinstance(match, tuple):
                keywords.add(match[0].lower())
            else:
                keywords.add(match.lower())

    return sorted(list(keywords))


def is_table_content(text: str) -> bool:
    """Detect if text appears to be tabular data."""
    lines = text.strip().split('\n')
    if len(lines) < 3:
        return False

    # Check for common table patterns
    number_pattern = r'\d+(?:,\d{3})*(?:\.\d+)?'
    lines_with_numbers = sum(1 for line in lines if re.search(number_pattern, line))

    # Check for multiple tab/space-separated columns
    lines_with_columns = sum(1 for line in lines if len(re.split(r'\s{2,}|\t', line)) > 2)

    return lines_with_numbers > len(lines) * 0.4 or lines_with_columns > len(lines) * 0.5


def is_policy_or_goal(text: str) -> bool:
    """Detect if text contains policy or goal statements."""
    return bool(re.search(r'(GOAL|Policy)\s+[A-Z]+\.[A-Z]?-?\d+', text, re.IGNORECASE))


def clean_text(text: str) -> str:
    """Clean extracted text."""
    # Remove excessive whitespace but preserve paragraph breaks
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Remove page numbers that appear alone
    text = re.sub(r'^\d+-\d+\s*$', '', text, flags=re.MULTILINE)
    text = re.sub(r'^Page\s+\d+\s*$', '', text, flags=re.MULTILINE)
    return text.strip()


def parse_single_pdf(pdf_path: Path, verbose: bool = False) -> List[GeneralPlanChunk]:
    """Parse a single PDF into chunks."""
    chunks = []

    # Categorize the document
    doc_type, chapter_num, doc_title = categorize_document(pdf_path.name)
    document_id = re.sub(r'[^\w-]', '-', pdf_path.stem.lower())

    if verbose:
        print(f"  Parsing: {pdf_path.name} (type={doc_type}, chapter={chapter_num})")

    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"  ERROR opening {pdf_path.name}: {e}")
        return []

    chunk_id = 0
    page_buffer = []
    current_section = None

    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()

        # Detect section changes
        new_section = extract_section_title(text)
        if new_section and new_section != current_section:
            # Flush buffer
            if page_buffer:
                chunk = create_chunk(
                    page_buffer, document_id, doc_type, doc_title,
                    chapter_num, current_section, chunk_id
                )
                if chunk:
                    chunks.append(chunk)
                    chunk_id += 1
                page_buffer = []
            current_section = new_section

        page_buffer.append({
            'page_num': page_num + 1,
            'text': text,
        })

        # Flush if buffer is getting large
        combined_text = '\n'.join(p['text'] for p in page_buffer)
        if len(combined_text) > 5000:
            chunk = create_chunk(
                page_buffer, document_id, doc_type, doc_title,
                chapter_num, current_section, chunk_id
            )
            if chunk:
                chunks.append(chunk)
                chunk_id += 1
            page_buffer = []

    # Flush remaining buffer
    if page_buffer:
        chunk = create_chunk(
            page_buffer, document_id, doc_type, doc_title,
            chapter_num, current_section, chunk_id
        )
        if chunk:
            chunks.append(chunk)

    doc.close()

    if verbose:
        print(f"    -> {len(chunks)} chunks")

    return chunks


def create_chunk(
    pages: List[dict],
    document_id: str,
    doc_type: str,
    doc_title: str,
    chapter_num: Optional[str],
    section_title: Optional[str],
    chunk_id: int
) -> Optional[GeneralPlanChunk]:
    """Create a chunk from one or more pages."""
    if not pages:
        return None

    combined_text = '\n'.join(p['text'] for p in pages)
    cleaned_text = clean_text(combined_text)

    if len(cleaned_text) < 100:  # Skip very short chunks
        return None

    # Determine chunk type
    if is_table_content(cleaned_text):
        chunk_type = 'table'
    elif is_policy_or_goal(cleaned_text):
        chunk_type = 'policy'
    elif 'TABLE OF CONTENTS' in cleaned_text.upper():
        chunk_type = 'toc'
    else:
        chunk_type = 'narrative'

    # Extract keywords for search enhancement
    keywords = extract_keywords(cleaned_text)

    return GeneralPlanChunk(
        id=f"{document_id}--{chunk_id:04d}",
        document_id=document_id,
        document_type=doc_type,
        document_title=doc_title,
        chapter_number=chapter_num,
        page_start=pages[0]['page_num'],
        page_end=pages[-1]['page_num'],
        section_title=section_title,
        subsection_title=None,  # Could be enhanced later
        chunk_type=chunk_type,
        text=cleaned_text,
        keywords=keywords,
    )


def parse_all_pdfs(input_dir: Path, verbose: bool = False) -> List[GeneralPlanChunk]:
    """Parse all PDFs in the input directory."""
    all_chunks = []

    pdf_files = sorted(input_dir.glob('*.pdf'))

    if not pdf_files:
        print(f"No PDF files found in {input_dir}")
        return []

    print(f"Found {len(pdf_files)} PDFs to parse")

    for pdf_path in pdf_files:
        chunks = parse_single_pdf(pdf_path, verbose)
        all_chunks.extend(chunks)

    return all_chunks


def main():
    parser = argparse.ArgumentParser(description='Parse Solano County General Plan PDFs')
    parser.add_argument(
        '--input', '-i',
        default='data/general_plan_2008',
        help='Directory containing General Plan PDFs'
    )
    parser.add_argument(
        '--output', '-o',
        default='data/general_plan_2008/general-plan-2008.json',
        help='Path for output JSON'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Print progress information'
    )

    args = parser.parse_args()

    input_dir = Path(args.input)
    output_path = Path(args.output)

    if not input_dir.exists():
        print(f"Input directory not found: {input_dir}")
        sys.exit(1)

    # Parse all PDFs
    chunks = parse_all_pdfs(input_dir, verbose=args.verbose)

    if not chunks:
        print("No chunks generated!")
        sys.exit(1)

    # Convert to dicts for JSON serialization
    chunks_data = [asdict(chunk) for chunk in chunks]

    # Build document summary
    doc_types = {}
    for chunk in chunks:
        doc_types[chunk.document_type] = doc_types.get(chunk.document_type, 0) + 1

    # Write output
    with open(output_path, 'w') as f:
        json.dump({
            'document_collection': '2008-solano-county-general-plan',
            'description': 'Solano County 2008 General Plan chapters, appendices, amendments, and EIR documents',
            'total_chunks': len(chunks),
            'document_types': doc_types,
            'chunks': chunks_data
        }, f, indent=2)

    print(f"\nWrote {len(chunks)} chunks to {output_path}")

    # Print summary statistics
    print("\nChunks by document type:")
    for doc_type, count in sorted(doc_types.items()):
        print(f"  {doc_type}: {count}")

    chunk_types = {}
    for chunk in chunks:
        chunk_types[chunk.chunk_type] = chunk_types.get(chunk.chunk_type, 0) + 1

    print("\nChunks by content type:")
    for chunk_type, count in sorted(chunk_types.items()):
        print(f"  {chunk_type}: {count}")

    # Sample keywords
    all_keywords = set()
    for chunk in chunks:
        all_keywords.update(chunk.keywords)
    print(f"\nUnique keywords extracted: {len(all_keywords)}")
    if args.verbose:
        print(f"  Sample: {sorted(list(all_keywords))[:20]}")


if __name__ == '__main__':
    main()
