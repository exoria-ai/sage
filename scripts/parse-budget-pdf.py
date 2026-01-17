#!/usr/bin/env python3
"""
Parse Solano County Budget PDF into structured JSON for RAG indexing.

This script extracts text from the budget PDF, identifies document structure,
and outputs chunks suitable for embedding and vector search.

Usage:
    source .venv/bin/activate
    python scripts/parse-budget-pdf.py [--input path/to/budget.pdf] [--output path/to/output.json]
"""

import argparse
import json
import re
import sys
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Optional

import fitz  # PyMuPDF


@dataclass
class BudgetChunk:
    """A chunk of budget document content for indexing."""
    id: str
    document_id: str
    page_start: int
    page_end: int
    section_letter: str  # A, B, C, etc.
    section_name: str  # "Budget Summary", "Public Protection", etc.
    department: Optional[str]  # e.g., "Sheriff/Coroner"
    budget_unit: Optional[str]  # e.g., "6550"
    fund: Optional[str]  # e.g., "Fund 900"
    department_head: Optional[str]
    functional_area: Optional[str]  # e.g., "Public Protection"
    subsection: Optional[str]  # e.g., "DEPARTMENTAL BUDGET SUMMARY"
    chunk_type: str  # "narrative", "table", "summary", "toc", "glossary"
    text: str
    fiscal_year: str = "FY2025-26"


# Major sections from TOC
MAJOR_SECTIONS = {
    'A': 'Budget Summary',
    'B': 'Permanent Position Summary',
    'C': 'County Statistical Profile',
    'D': 'Budget Construction Legal Requirements',
    'E': 'Summary Budget Schedules',
    'F': 'General Government Support Services',
    'G': 'Capital Project',
    'H': 'Public Protection',
    'I': 'Public Ways',
    'J': 'Health and Public Assistance',
    'K': 'Education',
    'L': 'Contingencies',
    'M': 'Special Districts',
    'N': 'Glossary'
}

# Known subsection headers in department budgets
SUBSECTION_HEADERS = [
    'DEPARTMENTAL PURPOSE',
    'DEPARTMENT PURPOSE',
    'FUNCTION AND RESPONSIBILITIES',
    'SIGNIFICANT CHALLENGES AND ACCOMPLISHMENTS',
    'WORKLOAD INDICATORS',
    'DEPARTMENTAL BUDGET SUMMARY',
    'DEPARTMENT BUDGET SUMMARY',
    'DIVISION BUDGET SUMMARY',
    'SUMMARY OF SIGNIFICANT ADJUSTMENTS',
    'SUMMARY OF POSITION CHANGES',
    'PENDING ISSUES AND POLICY CONSIDERATIONS',
    'DEPARTMENT COMMENTS',
    'DIVISION PURPOSE',
    'BUREAU PURPOSE',
]


def extract_page_header(text: str) -> dict:
    """Extract structured info from page header."""
    result = {
        'budget_unit': None,
        'fund': None,
        'department': None,
        'department_head': None,
        'functional_area': None,
        'section_letter': None,
    }

    # Pattern: "6550 – Fund 900-Sheriff/Coroner"
    bu_match = re.search(r'^(\d{4})\s*[–-]\s*(Fund \d+)[–-](.+?)$', text, re.MULTILINE)
    if bu_match:
        result['budget_unit'] = bu_match.group(1)
        result['fund'] = bu_match.group(2)
        result['department'] = bu_match.group(3).strip()

    # Pattern for section page number like "H-32" or "A-1"
    section_match = re.search(r'^([A-N])-(\d+)\s*$', text, re.MULTILINE)
    if section_match:
        result['section_letter'] = section_match.group(1)

    # Try to find department head (usually on line after department name)
    head_patterns = [
        r'([A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+),\s*(?:County Administrator|Sheriff|District Attorney|Chief|Director|Auditor|Assessor)',
    ]
    for pattern in head_patterns:
        head_match = re.search(pattern, text)
        if head_match:
            result['department_head'] = head_match.group(0)
            break

    # Functional area patterns
    func_areas = [
        'Public Protection', 'General Relief', 'Judicial', 'Legislative & Administration',
        'Public Protection/Detention & Corrections', 'Health & Social Services',
        'Public Ways', 'Education', 'Capital Projects'
    ]
    for area in func_areas:
        if area in text:
            result['functional_area'] = area
            break

    return result


def identify_subsections(text: str) -> list[tuple[str, int, int]]:
    """Find subsection boundaries in text."""
    subsections = []

    for header in SUBSECTION_HEADERS:
        # Find all occurrences
        for match in re.finditer(rf'^{re.escape(header)}\s*$', text, re.MULTILINE):
            subsections.append((header, match.start(), match.end()))

    # Sort by position
    subsections.sort(key=lambda x: x[1])
    return subsections


def is_table_content(text: str) -> bool:
    """Detect if text appears to be tabular data."""
    lines = text.strip().split('\n')
    if len(lines) < 3:
        return False

    # Check for common table patterns
    number_pattern = r'\$?[\d,]+(?:\.\d{2})?'
    lines_with_numbers = sum(1 for line in lines if re.search(number_pattern, line))

    # If more than half the lines have numbers, likely a table
    return lines_with_numbers > len(lines) * 0.5


def clean_text(text: str) -> str:
    """Clean extracted text."""
    # Remove excessive whitespace but preserve paragraph breaks
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def extract_section_from_page(text: str) -> Optional[str]:
    """Try to determine which major section a page belongs to."""
    # Look for section indicators like "A-1", "H-32"
    match = re.search(r'\b([A-N])-\d+\b', text)
    if match:
        return match.group(1)

    # Look for section header
    for letter, name in MAJOR_SECTIONS.items():
        if f'{letter}. {name}' in text or f'Section {letter}' in text:
            return letter

    return None


def parse_budget_pdf(pdf_path: str, verbose: bool = False) -> list[BudgetChunk]:
    """Parse budget PDF into chunks."""
    doc = fitz.open(pdf_path)
    chunks = []
    chunk_id = 0

    # Get document filename for document_id
    doc_name = Path(pdf_path).stem
    document_id = re.sub(r'[^\w-]', '-', doc_name.lower())

    if verbose:
        print(f"Parsing {len(doc)} pages from {pdf_path}")

    # First pass: extract all page text with metadata
    pages_data = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()

        header_info = extract_page_header(text)
        section = extract_section_from_page(text) or header_info.get('section_letter')

        pages_data.append({
            'page_num': page_num + 1,  # 1-indexed
            'text': text,
            'section': section,
            **header_info
        })

    # Second pass: create chunks
    # Strategy: chunk by page, but combine small pages and split large subsections

    current_section = None
    current_dept = None
    page_buffer = []

    for i, page_data in enumerate(pages_data):
        page_num = page_data['page_num']
        text = page_data['text']
        section = page_data['section']

        # Detect section/department changes
        section_changed = section and section != current_section
        dept_changed = page_data['department'] and page_data['department'] != current_dept

        if section_changed or dept_changed:
            # Flush buffer
            if page_buffer:
                chunk = create_chunk_from_pages(
                    page_buffer, document_id, chunk_id,
                    current_section, current_dept
                )
                if chunk:
                    chunks.append(chunk)
                    chunk_id += 1
                page_buffer = []

            current_section = section or current_section
            current_dept = page_data['department'] or current_dept

        page_buffer.append(page_data)

        # Check if we should flush based on content size
        combined_text = '\n'.join(p['text'] for p in page_buffer)

        # If buffer is getting large (>4000 chars) or has multiple subsections, flush
        subsections = identify_subsections(combined_text)
        if len(combined_text) > 4000 or len(subsections) > 2:
            chunk = create_chunk_from_pages(
                page_buffer, document_id, chunk_id,
                current_section, current_dept
            )
            if chunk:
                chunks.append(chunk)
                chunk_id += 1
            page_buffer = []

    # Flush remaining buffer
    if page_buffer:
        chunk = create_chunk_from_pages(
            page_buffer, document_id, chunk_id,
            current_section, current_dept
        )
        if chunk:
            chunks.append(chunk)

    doc.close()

    if verbose:
        print(f"Created {len(chunks)} chunks")

    return chunks


def create_chunk_from_pages(
    pages: list[dict],
    document_id: str,
    chunk_id: int,
    section_letter: Optional[str],
    department: Optional[str]
) -> Optional[BudgetChunk]:
    """Create a chunk from one or more pages."""
    if not pages:
        return None

    combined_text = '\n'.join(p['text'] for p in pages)
    cleaned_text = clean_text(combined_text)

    if len(cleaned_text) < 50:  # Skip very short chunks
        return None

    # Get metadata from first page with data
    first_page = pages[0]

    # Determine chunk type
    if is_table_content(cleaned_text):
        chunk_type = 'table'
    elif section_letter == 'N':
        chunk_type = 'glossary'
    elif any(h in cleaned_text for h in ['BUDGET SUMMARY', 'BUDGET SCHEDULES']):
        chunk_type = 'summary'
    else:
        chunk_type = 'narrative'

    # Find primary subsection if any
    subsections = identify_subsections(cleaned_text)
    primary_subsection = subsections[0][0] if subsections else None

    section_name = MAJOR_SECTIONS.get(section_letter, 'Unknown')

    return BudgetChunk(
        id=f"{document_id}-{chunk_id:04d}",
        document_id=document_id,
        page_start=pages[0]['page_num'],
        page_end=pages[-1]['page_num'],
        section_letter=section_letter or '',
        section_name=section_name,
        department=department or first_page.get('department'),
        budget_unit=first_page.get('budget_unit'),
        fund=first_page.get('fund'),
        department_head=first_page.get('department_head'),
        functional_area=first_page.get('functional_area'),
        subsection=primary_subsection,
        chunk_type=chunk_type,
        text=cleaned_text,
    )


def main():
    parser = argparse.ArgumentParser(description='Parse Solano County Budget PDF')
    parser.add_argument(
        '--input', '-i',
        default='docs/FY2025-26 Recommended Budget Document (FULL).pdf',
        help='Path to budget PDF'
    )
    parser.add_argument(
        '--output', '-o',
        default='data/budget/fy2025-26-recommended.json',
        help='Path for output JSON'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Print progress information'
    )

    args = parser.parse_args()

    # Ensure output directory exists
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Parse PDF
    chunks = parse_budget_pdf(args.input, verbose=args.verbose)

    # Convert to dicts for JSON serialization
    chunks_data = [asdict(chunk) for chunk in chunks]

    # Write output
    with open(output_path, 'w') as f:
        json.dump({
            'document_id': chunks[0].document_id if chunks else 'unknown',
            'fiscal_year': 'FY2025-26',
            'document_type': 'recommended',
            'total_chunks': len(chunks),
            'chunks': chunks_data
        }, f, indent=2)

    print(f"Wrote {len(chunks)} chunks to {output_path}")

    # Print summary statistics
    section_counts = {}
    type_counts = {}
    for chunk in chunks:
        section_counts[chunk.section_name] = section_counts.get(chunk.section_name, 0) + 1
        type_counts[chunk.chunk_type] = type_counts.get(chunk.chunk_type, 0) + 1

    print("\nChunks by section:")
    for section, count in sorted(section_counts.items()):
        print(f"  {section}: {count}")

    print("\nChunks by type:")
    for chunk_type, count in sorted(type_counts.items()):
        print(f"  {chunk_type}: {count}")


if __name__ == '__main__':
    main()
