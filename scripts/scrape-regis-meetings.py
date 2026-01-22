#!/usr/bin/env python3
"""
Scrape ReGIS Members Meeting documents from Solano County website.

Downloads agendas and minutes PDFs for parsing into structured JSON.
"""

import os
import re
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from pathlib import Path

BASE_URL = "https://regis.solanocounty.com"
MEETINGS_URL = f"{BASE_URL}/regis-members-meetings/"
OUTPUT_DIR = Path(__file__).parent.parent / "data" / "meetings" / "regis" / "pdfs"

# Create output directory
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def get_meeting_links(session: requests.Session) -> list[dict]:
    """Get all meeting page links from the main meetings page."""
    print(f"Fetching meeting list from {MEETINGS_URL}")

    resp = session.get(MEETINGS_URL)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, 'html.parser')
    meetings = []

    # Find all meeting rows - they're in a table or list structure
    # Looking for links that contain "regis-members-meeting"
    for link in soup.find_all('a', href=True):
        href = link.get('href', '')
        if '/meetings/regis-members-meeting' in href:
            # Extract meeting name from link text
            name = link.get_text(strip=True)
            if name and 'ReGIS Members Meeting' in name:
                full_url = urljoin(BASE_URL, href)
                meetings.append({
                    'name': name,
                    'url': full_url
                })

    # Deduplicate by URL
    seen = set()
    unique_meetings = []
    for m in meetings:
        if m['url'] not in seen:
            seen.add(m['url'])
            unique_meetings.append(m)

    print(f"Found {len(unique_meetings)} meetings")
    return unique_meetings


def extract_date_from_name(name: str) -> str | None:
    """Extract date from meeting name like 'ReGIS Members Meeting: January 21, 2026'."""
    # Pattern: Month Day, Year
    match = re.search(r'(\w+)\s+(\d{1,2}),?\s+(\d{4})', name)
    if match:
        month_name, day, year = match.groups()
        months = {
            'january': '01', 'february': '02', 'march': '03', 'april': '04',
            'may': '05', 'june': '06', 'july': '07', 'august': '08',
            'september': '09', 'october': '10', 'november': '11', 'december': '12'
        }
        month = months.get(month_name.lower())
        if month:
            return f"{year}-{month}-{day.zfill(2)}"
    return None


def download_meeting_documents(session: requests.Session, meeting: dict) -> list[dict]:
    """Download all documents from a meeting page."""
    print(f"\nProcessing: {meeting['name']}")

    resp = session.get(meeting['url'])
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, 'html.parser')
    documents = []

    meeting_date = extract_date_from_name(meeting['name'])
    if not meeting_date:
        print(f"  Warning: Could not extract date from '{meeting['name']}'")
        # Try to extract from URL
        url_match = re.search(r'(\w+)-(\d{1,2})-(\d{4})', meeting['url'])
        if url_match:
            month_name, day, year = url_match.groups()
            months = {
                'january': '01', 'february': '02', 'march': '03', 'april': '04',
                'may': '05', 'june': '06', 'july': '07', 'august': '08',
                'september': '09', 'october': '10', 'november': '11', 'december': '12'
            }
            month = months.get(month_name.lower())
            if month:
                meeting_date = f"{year}-{month}-{day.zfill(2)}"

    if not meeting_date:
        print(f"  Skipping: Could not determine meeting date")
        return documents

    # Find all download links (PDF and DOCX)
    for link in soup.find_all('a', href=True):
        href = link.get('href', '')

        # Check if it's a document link
        if not (href.endswith('.pdf') or href.endswith('.docx')):
            continue

        # Determine document type from filename or context
        href_lower = href.lower()
        filename = os.path.basename(urlparse(href).path)

        # Skip "agenda packet" - usually duplicates agenda content
        # Focus on agenda and minutes
        if 'agenda-and-meeting-minutes' in href_lower or 'agenda-and-minutes' in href_lower:
            # This is typically the combined packet - skip it
            print(f"  Skipping combined packet: {filename}")
            continue

        # Determine document type
        if 'minutes' in href_lower:
            doc_type = 'minutes'
        elif 'agenda' in href_lower:
            doc_type = 'agenda'
        else:
            # Unknown type - skip
            print(f"  Skipping unknown doc type: {filename}")
            continue

        # Generate output filename
        ext = '.pdf' if href.endswith('.pdf') else '.docx'
        output_filename = f"regis-{meeting_date}-{doc_type}{ext}"
        output_path = OUTPUT_DIR / output_filename

        # Download if not already present
        if output_path.exists():
            print(f"  Already exists: {output_filename}")
        else:
            full_url = urljoin(BASE_URL, href)
            print(f"  Downloading: {output_filename}")

            try:
                doc_resp = session.get(full_url)
                doc_resp.raise_for_status()

                with open(output_path, 'wb') as f:
                    f.write(doc_resp.content)

                print(f"    Saved: {len(doc_resp.content)} bytes")
            except Exception as e:
                print(f"    Error downloading: {e}")
                continue

        documents.append({
            'meeting_date': meeting_date,
            'doc_type': doc_type,
            'filename': output_filename,
            'source_url': urljoin(BASE_URL, href)
        })

    return documents


def main():
    print("=" * 60)
    print("ReGIS Meeting Document Scraper")
    print("=" * 60)

    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (compatible; SolanoCountySage/1.0)'
    })

    # Get list of all meetings
    meetings = get_meeting_links(session)

    if not meetings:
        print("No meetings found!")
        return

    # Download documents from each meeting
    all_documents = []
    for meeting in meetings:
        docs = download_meeting_documents(session, meeting)
        all_documents.extend(docs)

        # Be polite - small delay between requests
        time.sleep(0.5)

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

    # List files in output directory
    print("\nDownloaded files:")
    for f in sorted(OUTPUT_DIR.iterdir()):
        if f.is_file():
            size_kb = f.stat().st_size / 1024
            print(f"  {f.name} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
