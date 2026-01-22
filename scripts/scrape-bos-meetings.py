#!/usr/bin/env python3
"""
Scrape Solano County Board of Supervisors meeting documents from Granicus.

Downloads agendas and minutes PDFs for 2025-2026 meetings.
"""

import os
import re
import time
import requests
from bs4 import BeautifulSoup
from pathlib import Path
from datetime import datetime

BASE_URL = "https://solano.granicus.com"
PUBLISHER_URL = f"{BASE_URL}/ViewPublisher.php?view_id=8"
OUTPUT_DIR = Path(__file__).parent.parent / "data" / "meetings" / "bos" / "pdfs"

# Create output directory
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def parse_granicus_page(session: requests.Session) -> list[dict]:
    """Parse the Granicus publisher page to extract meeting info."""
    print(f"Fetching meeting list from {PUBLISHER_URL}")

    resp = session.get(PUBLISHER_URL)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, 'html.parser')
    meetings = []

    # Find all meeting rows - they're in tables with class "listingTable"
    for table in soup.find_all('table', class_='listingTable'):
        for row in table.find_all('tr'):
            cells = row.find_all('td')
            if len(cells) < 4:
                continue

            # First cell contains meeting name
            name_cell = cells[0]
            name = name_cell.get_text(strip=True)

            # Check if it's a Board of Supervisors meeting
            if 'Board of Supervisors' not in name:
                continue

            # Extract date from name (format: "Board of Supervisors on 2025-12-09 9:00 AM")
            date_match = re.search(r'(\d{4}-\d{2}-\d{2})', name)
            if not date_match:
                continue

            meeting_date = date_match.group(1)
            year = int(meeting_date[:4])

            # Only process 2025-2026 meetings
            if year < 2025:
                continue

            # Check for Special Meeting designation
            is_special = 'Special Meeting' in name

            # Find agenda link
            agenda_link = None
            for cell in cells:
                link = cell.find('a', href=re.compile(r'AgendaViewer'))
                if link:
                    agenda_link = link.get('href')
                    break

            # Find minutes link
            minutes_link = None
            for cell in cells:
                link = cell.find('a', href=re.compile(r'MinutesViewer'))
                if link:
                    minutes_link = link.get('href')
                    break

            # Extract clip_id from links
            clip_id = None
            if agenda_link:
                clip_match = re.search(r'clip_id=(\d+)', agenda_link)
                if clip_match:
                    clip_id = clip_match.group(1)
            elif minutes_link:
                clip_match = re.search(r'clip_id=(\d+)', minutes_link)
                if clip_match:
                    clip_id = clip_match.group(1)

            if clip_id:
                meetings.append({
                    'name': name,
                    'date': meeting_date,
                    'clip_id': clip_id,
                    'is_special': is_special,
                    'has_agenda': agenda_link is not None,
                    'has_minutes': minutes_link is not None,
                })

    # Deduplicate by clip_id
    seen = set()
    unique_meetings = []
    for m in meetings:
        if m['clip_id'] not in seen:
            seen.add(m['clip_id'])
            unique_meetings.append(m)

    print(f"Found {len(unique_meetings)} BOS meetings for 2025-2026")
    return unique_meetings


def download_pdf(session: requests.Session, url: str, output_path: Path) -> bool:
    """Download a PDF from Granicus."""
    try:
        resp = session.get(url, timeout=30)
        resp.raise_for_status()

        # Verify it's a PDF
        if not resp.content.startswith(b'%PDF'):
            print(f"    Warning: Not a PDF file")
            return False

        with open(output_path, 'wb') as f:
            f.write(resp.content)

        return True
    except Exception as e:
        print(f"    Error: {e}")
        return False


def download_meeting_documents(session: requests.Session, meeting: dict) -> list[dict]:
    """Download agenda and minutes for a meeting."""
    documents = []
    meeting_date = meeting['date']
    clip_id = meeting['clip_id']
    suffix = "-special" if meeting['is_special'] else ""

    print(f"\nProcessing: {meeting['name']}")

    # Download agenda
    if meeting['has_agenda']:
        agenda_url = f"{BASE_URL}/AgendaViewer.php?view_id=8&clip_id={clip_id}"
        output_filename = f"bos-{meeting_date}{suffix}-agenda.pdf"
        output_path = OUTPUT_DIR / output_filename

        if output_path.exists():
            print(f"  Already exists: {output_filename}")
        else:
            print(f"  Downloading agenda: {output_filename}")
            if download_pdf(session, agenda_url, output_path):
                print(f"    Saved: {output_path.stat().st_size} bytes")

        documents.append({
            'meeting_date': meeting_date,
            'doc_type': 'agenda',
            'filename': output_filename,
            'is_special': meeting['is_special'],
        })

    # Download minutes
    if meeting['has_minutes']:
        minutes_url = f"{BASE_URL}/MinutesViewer.php?view_id=8&clip_id={clip_id}"
        output_filename = f"bos-{meeting_date}{suffix}-minutes.pdf"
        output_path = OUTPUT_DIR / output_filename

        if output_path.exists():
            print(f"  Already exists: {output_filename}")
        else:
            print(f"  Downloading minutes: {output_filename}")
            if download_pdf(session, minutes_url, output_path):
                print(f"    Saved: {output_path.stat().st_size} bytes")

        documents.append({
            'meeting_date': meeting_date,
            'doc_type': 'minutes',
            'filename': output_filename,
            'is_special': meeting['is_special'],
        })

    return documents


def main():
    print("=" * 60)
    print("Solano County Board of Supervisors Meeting Scraper")
    print("=" * 60)

    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (compatible; SolanoCountySage/1.0)'
    })

    # Parse the Granicus page
    meetings = parse_granicus_page(session)

    if not meetings:
        print("No meetings found!")
        return

    # Sort by date descending
    meetings.sort(key=lambda x: x['date'], reverse=True)

    # Download documents
    all_documents = []
    for meeting in meetings:
        docs = download_meeting_documents(session, meeting)
        all_documents.extend(docs)
        time.sleep(0.5)  # Be polite

    # Summary
    print("\n" + "=" * 60)
    print("Download Summary")
    print("=" * 60)

    agendas = [d for d in all_documents if d['doc_type'] == 'agenda']
    minutes = [d for d in all_documents if d['doc_type'] == 'minutes']

    print(f"Total documents: {len(all_documents)}")
    print(f"  Agendas: {len(agendas)}")
    print(f"  Minutes: {len(minutes)}")
    print(f"\nOutput directory: {OUTPUT_DIR}")

    # List files
    print("\nDownloaded files:")
    for f in sorted(OUTPUT_DIR.iterdir()):
        if f.is_file() and f.suffix == '.pdf':
            size_kb = f.stat().st_size / 1024
            print(f"  {f.name} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
