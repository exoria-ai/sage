#!/usr/bin/env python3
"""
One-off script to download all PDFs from the 2008 Solano County General Plan website.
Downloads to /data/general_plan_2008/ folder.
"""

import os
import urllib.request
import urllib.parse
from pathlib import Path

# Base URL for PDFs
BASE_URL = "https://content.solanocounty.gov/sites/default/files/2025-05/"

# All PDFs from the General Plan page
PDF_FILES = [
    # General Plan Chapters
    "Chapter%200%20-%20Title%20Page%20%26%20Table%20of%20Contents.pdf",
    "Chapter%201%20-%20Introduction.pdf",
    "Chapter%202%20-%20Land%20Use.pdf",
    "Chapter%203%20-%20Agriculture.pdf",
    "Chapter%204%20-%20Resources.pdf",
    "Chapter%205%20-%20Public%20Health%20%26%20Saftey.pdf",
    "Chapter%206%20-%20Economic%20Development.pdf",
    "Chapter%207%20-%20Transportation.pdf",
    "Chapter%208%20-%20Public%20Facilities.pdf",
    "Chapter%209%20-%20Housing%20Element.pdf",
    "Chapter%2010%20-%20Park%20and%20Recreation%20Element.pdf",
    "Chapter%2011%20-%20Tri-City%20%26%20County%20Plan.pdf",
    "Chapter%2012%20-%20Suisun%20Marsh%20LPP%20Policies.pdf",

    # Appendices
    "Appendix%20A%20-%20Acronyms%20%26%20Other%20Abbreviations.pdf",
    "Appendix%20B%20-%20Guiding%20Principles.pdf",
    "Appendix%20C%20-%20Suisun%20Marsh%20Addendum%20(Deleted-See%20Chapter%2012).pdf",
    "Appendix%20D%20-%20MMRP.pdf",
    "Appendix%20E%20-%20Ordinance%20No.%202008-01.pdf",

    # General Plan Amendments (Resolutions)
    "Resolution%202024-216%20-%20Executed.pdf",
    "Resolution%202024-133%20-%20Excuted%20%20(Yin%20Ranch).pdf",
    "Resolution%202024-16%20-%20Executed%20(Housing%20Element%20Update).pdf",
    "Resolution%202023-265%20-%20Executed%20%20(MSA).pdf",
    "Resolution%202023-266%20-%20Executed%20(Wildlife).pdf",
    "Resolution%202023-51%20-%20Executed%20(Wind%20Turbine).pdf",
    "Resolution%2020-86%20-%20%20Executed%20(Morgan).pdf",
    "Resolution%2018-187%20-%20Executed%20Suisun%20Marsh%20LLP.pdf",
    "Resolution%202017-144%20%20-%20Executed%20%20(Rockville%20Trails).pdf",
    "Resolution%20107%20-%20Travis%20AFB.pdf",
    "Resolution%202012-169%20-%20Executed%20Suisun%20Marsh.pdf",
    "Resolution%2012-030%20-%20Executed%20Land%20Use.pdf",

    # Environmental Impact Reports
    "Solano%20County%20DEIR%20-%204-18-08.pdf",
    "Addendum%20-%20%20General%20Plan%20EIR%20%202023-2031%20Housing%20Element%20Update.pdf",
    "Volumne%20I.pdf",  # Note: typo in original filename
    "Volume%20II.pdf",
    "Volume%20III.pdf",

    # Land Use Diagram
    "General%20Plan%20Land%20Use%20Diagram.pdf",
]


def download_pdfs():
    # Create output directory
    output_dir = Path(__file__).parent.parent / "data" / "general_plan_2008"
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Downloading {len(PDF_FILES)} PDFs to {output_dir}")
    print("-" * 60)

    success_count = 0
    error_count = 0

    for encoded_filename in PDF_FILES:
        # Decode the filename for saving locally
        decoded_filename = urllib.parse.unquote(encoded_filename)
        url = BASE_URL + encoded_filename
        output_path = output_dir / decoded_filename

        print(f"Downloading: {decoded_filename}...")

        try:
            # Download the file
            urllib.request.urlretrieve(url, output_path)
            file_size = output_path.stat().st_size
            print(f"  -> Saved ({file_size / 1024:.1f} KB)")
            success_count += 1
        except Exception as e:
            print(f"  -> ERROR: {e}")
            error_count += 1

    print("-" * 60)
    print(f"Download complete: {success_count} succeeded, {error_count} failed")
    print(f"Files saved to: {output_dir}")


if __name__ == "__main__":
    download_pdfs()
