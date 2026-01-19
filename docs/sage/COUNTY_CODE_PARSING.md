# County Code HTML Parsing Pipeline

This document describes the process of converting Solano County Code HTML files into structured JSON data for use by the Sage MCP tools.

## Overview

The county code (ordinances) is published on the Solano County website as HTML pages. We scrape these pages, parse them into structured JSON, and expose them through MCP tools that allow Claude to look up specific sections, search by keyword, and cite regulations accurately.

## Pipeline Steps

### 1. Acquire Raw HTML

HTML files are manually downloaded from the county's online code portal and saved to:

```
data/codes/solano/html_raw/
```

Files are named by chapter number:
- `chapter-28.01.html` - Chapter 28 Article I
- `chapter-28.10.html` - Chapter 28 Article II (Districts)
- `chapter-28.70.html` - Chapter 28 Article III (Land Use Regulations)
- etc.

### 2. HTML Structure

The county code HTML follows a consistent structure:

```html
<div id="mainContent">
  <!-- Article headers -->
  <h2 class="CH">Article I. General Provisions</h2>

  <!-- Section headers -->
  <h3 class="Cite" id="JD_28.01">
    <a name="28.01">28.01</a> Definitions.
  </h3>

  <!-- Section content -->
  <p class="P0">Content paragraphs...</p>

  <!-- Allowed use tables -->
  <table>
    <caption>TABLE 28.21A - TABLE OF ALLOWED USES</caption>
    <thead>...</thead>
    <tbody>...</tbody>
  </table>
</div>
```

Key CSS classes:
- `h2.CH` - Article headers
- `h3.Cite` - Section headers (with `id` and `name` attributes)
- `p.P0` - Body paragraphs
- `span.bold` - Bold text (used in table category headers)

### 3. Parse HTML to JSON

The parser script (`scripts/parse-chapter-28.ts`) extracts:

**Sections:**
- ID from `<a name="">` attribute (e.g., "28.01")
- Title from header text after section number
- Body text from following `<p>` elements
- Tables (both regular and "Allowed Uses" format)

**Allowed Use Tables:**
The parser has special handling for zoning "Allowed Uses" tables:

```typescript
interface AllowedUseTable {
  name: string;           // "TABLE 28.21A"
  zones: string[];        // ["A-40", "A-80", "A-20", ...]
  legend: Record<string, string>;  // {"A": "Allowed by right", ...}
  categories: UseCategory[];
}

interface UseCategory {
  letter: string;         // "A", "B", "C"
  name: string;           // "Agricultural Uses"
  uses: UseEntry[];
}

interface UseEntry {
  name: string;           // "Crop Production"
  permits: Record<string, string>;  // {"A-40": "A", "A-80": "AP", ...}
  regulations?: string;   // "28.71.10"
}
```

**Article Grouping:**
Sections are grouped into articles based on section number prefixes:
- `28.0x` → Article I (General Provisions)
- `28.1x-28.6x` → Article II (Districts and Allowable Uses)
- `28.7x-28.8x` → Article III (Land Use Regulations)
- `28.9x` → Article IV (Site Development Standards)
- `28.10x+` → Article V (Operations)

### 4. Output JSON Structure

Output is written to `data/codes/solano/chapter-{N}-{name}.json`:

```json
{
  "chapter": "28",
  "title": "Zoning Regulations",
  "articles": [
    {
      "id": "I",
      "title": "General Provisions",
      "sections": [
        {
          "id": "28.01",
          "title": "Definitions",
          "text": "Full section text...",
          "ordinances": [],
          "tables": [/* AllowedUseTable objects if present */]
        }
      ]
    }
  ]
}
```

### 5. Runtime Access

The library at `lib/tools/county-code.ts` provides runtime access:

- **Lazy loading**: JSON files loaded on-demand
- **Caching**: Loaded chapters cached in memory
- **Section index**: Fast O(1) lookups by section ID
- **Search**: Full-text search with snippet extraction

## Running the Parser

```bash
npx tsx scripts/parse-chapter-28.ts
```

Output:
```
Parsing Chapter 28 HTML files...

Processing chapter-28.01.html...
  Found 42 sections
Processing chapter-28.10.html...
  Found 85 sections
...

Total unique sections: 166

Wrote data/codes/solano/chapter-28-zoning.json

Chapter structure:
  Article I: General Provisions (42 sections)
  Article II: Districts and Allowable Uses (45 sections)
  Article III: Land Use Regulations (38 sections)
  Article IV: Site Development and Other Standards (21 sections)
  Article V: Operations of Chapter (20 sections)
```

## Testing

Run the test script to validate the parsed data:

```bash
npx tsx scripts/test-county-code.ts
```

This verifies:
- Chapter loading
- Section retrieval (single and batch)
- Search functionality
- Table structure and content

## MCP Tools Exposed

The parsed data is exposed through these MCP tools:

| Tool | Description |
|------|-------------|
| `get_county_code_sections` | Retrieve full text of specific sections |
| `list_county_code_chapters` | List available chapters with metadata |
| `list_county_code_sections` | List all sections in a chapter |
| `search_county_code` | Full-text search with snippets |

## Adding New Chapters

To add a new chapter:

1. Download HTML file(s) to `data/codes/solano/html_raw/`
2. Copy and adapt the parser script for the new chapter's structure
3. Run parser to generate JSON
4. Test with `test-county-code.ts`

Different chapters may have different HTML structures and require parser adjustments.

## File Locations

| Path | Description |
|------|-------------|
| `data/codes/solano/html_raw/` | Raw HTML files from county website |
| `data/codes/solano/*.json` | Parsed JSON output |
| `scripts/parse-chapter-28.ts` | Parser for Chapter 28 |
| `scripts/test-county-code.ts` | Test script |
| `lib/tools/county-code.ts` | Runtime access library |

## Development History

The parsing system was developed iteratively:

1. **Initial analysis** - Examined raw HTML to identify token waste:
   - Each table cell had ~100-200 chars of inline styling
   - Raw HTML: ~1.7MB with verbose styles
   - Identified key patterns: `h3.Cite` for sections, `p.P0` for content

2. **Storage decision** - Evaluated SQLite vs Supabase:
   - SQLite chosen for: zero latency, ships with code, no external deps
   - Read-heavy, rarely updated data (code changes quarterly)

3. **Parser development** - Built `parse-chapter-28.ts`:
   - Extracts sections using CSS selectors
   - Parses "Allowed Uses" tables into structured data
   - Groups sections into articles by section number prefix
   - Outputs clean JSON (~385KB, 75% reduction)

4. **Incremental additions** - Added articles as HTML became available:
   - First: 28.01 (definitions), 28.10 (districts) → 74 sections
   - Later: 28.70, 28.90, 28.100 → 166 total sections
   - Fixed article grouping bug (28.100 was matching 28.1x prefix)

5. **Test validation** - Created practical query tests simulating real questions:
   - "Can I build a winery on A-40 land?"
   - "What permits do I need for an ADU?"
   - "What's the definition of a small winery?"

## Known Limitations

- **Manual HTML download**: No automated scraping (would need to handle pagination, auth, etc.)
- **Chapter-specific parsing**: Each chapter may need parser tweaks for its HTML quirks
- **No incremental updates**: Full re-parse required when county updates code
- **Ordinance references**: Not currently extracted (would require additional parsing)

## Data Quality Notes

- Tables are converted to markdown for readability in the `text` field
- Structured `tables` array preserves machine-readable permit data
- Whitespace is normalized but formatting (bold, links) is stripped
- Internal cross-references (links to other sections) are preserved as plain text
