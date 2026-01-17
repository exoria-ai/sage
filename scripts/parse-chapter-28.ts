/**
 * Parser for Chapter 28 (Zoning) HTML files
 *
 * Extracts sections, definitions, and allowed use tables from the raw HTML
 * and converts them to structured JSON for the county code lookup tool.
 */

import { JSDOM } from 'jsdom';
import { promises as fs } from 'fs';
import * as path from 'path';

// Types for the output structure (matching existing county code format)
interface CodeSection {
  id: string;
  title: string;
  text: string;
  ordinances: string[];
  tables?: AllowedUseTable[];
}

interface CodeArticle {
  id: string;
  title: string;
  sections: CodeSection[];
}

interface CodeChapter {
  chapter: string;
  title: string;
  articles: CodeArticle[];
}

// Types for allowed use tables
interface AllowedUseTable {
  name: string;
  zones: string[];
  legend: Record<string, string>;
  categories: UseCategory[];
}

interface UseCategory {
  letter: string;
  name: string;
  uses: UseEntry[];
}

interface UseEntry {
  name: string;
  indent?: number; // For sub-entries like "Small", "Medium", "Large"
  permits: Record<string, string>; // zone -> permit type
  regulations?: string;
}

const HTML_DIR = path.join(process.cwd(), 'data', 'codes', 'solano', 'html_raw');
const OUTPUT_DIR = path.join(process.cwd(), 'data', 'codes', 'solano');

/**
 * Clean text content by removing extra whitespace and normalizing
 */
function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Extract text content from an element, handling nested tags
 */
function extractText(element: Element): string {
  let text = '';
  for (const node of element.childNodes) {
    if (node.nodeType === 3) { // Text node
      text += node.textContent;
    } else if (node.nodeType === 1) { // Element node
      const el = node as Element;
      const tagName = el.tagName.toLowerCase();

      // Skip navigation and image elements
      if (tagName === 'img' || tagName === 'a' && el.querySelector('img')) {
        continue;
      }

      // Handle links - extract text and note the reference
      if (tagName === 'a') {
        const href = el.getAttribute('href');
        const linkText = el.textContent?.trim() || '';
        if (href?.includes('#')) {
          // Internal reference - just keep the text
          text += linkText;
        } else {
          text += linkText;
        }
      } else if (tagName === 'br') {
        text += '\n';
      } else if (tagName === 'p') {
        text += extractText(el) + '\n\n';
      } else if (tagName === 'span') {
        text += extractText(el);
      } else {
        text += extractText(el);
      }
    }
  }
  return text;
}

/**
 * Parse an allowed uses table (TABLE 28.21A, etc.)
 */
function parseAllowedUsesTable(table: Element): AllowedUseTable | null {
  const caption = table.querySelector('caption');
  const tableName = caption ? cleanText(caption.textContent || '') : '';

  if (!tableName.includes('TABLE OF ALLOWED USES')) {
    return null;
  }

  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');

  if (!thead || !tbody) {
    console.warn(`Table ${tableName} missing thead or tbody`);
    return null;
  }

  // Parse header to get zone columns
  const headerRows = thead.querySelectorAll('tr');
  const zones: string[] = [];
  let legendText = '';

  for (const row of headerRows) {
    const cells = row.querySelectorAll('th');
    for (const cell of cells) {
      const text = cleanText(cell.textContent || '');

      // Look for legend row (A = Allowed by right, AP = ...)
      if (text.includes('= Allowed') || text.includes('= Administrative')) {
        legendText = text;
      }

      // Look for zone codes (A-40, A-80, R-R-2.5, etc.)
      if (text.match(/^[A-Z]+-\d+$|^[A-Z]+-[A-Z]+-[\d.]+$/)) {
        zones.push(text);
      }
    }
  }

  // Parse legend
  const legend: Record<string, string> = {};
  const legendMatches = legendText.matchAll(/([A-Z]+)\s*=\s*([^,]+)/g);
  for (const match of legendMatches) {
    legend[match[1]] = match[2].trim();
  }
  // Add common ones if not found
  if (!legend['A']) legend['A'] = 'Allowed by right';
  if (!legend['AP']) legend['AP'] = 'Administrative Permit';
  if (!legend['MUP']) legend['MUP'] = 'Minor Use Permit';
  if (!legend['UP']) legend['UP'] = 'Use Permit';
  if (!legend['E']) legend['E'] = 'Exempt';
  if (!legend['---'] && !legend['-']) {
    legend['---'] = 'Prohibited';
    legend['-'] = 'Prohibited';
  }

  // Parse body rows
  const categories: UseCategory[] = [];
  let currentCategory: UseCategory | null = null;

  const rows = tbody.querySelectorAll('tr');
  for (const row of rows) {
    const cells = row.querySelectorAll('td');
    if (cells.length === 0) continue;

    // Check if this is a category header row (spans full width, has bold text)
    const firstCell = cells[0];
    const colspan = parseInt(firstCell.getAttribute('colspan') || '1');
    const hasBold = firstCell.querySelector('.bold, span.bold') !== null;
    const text = cleanText(firstCell.textContent || '');

    if (colspan >= 6 && hasBold && text.toUpperCase() === text) {
      // This is a main category header (like "AGRICULTURAL USES")
      // Skip it - we'll use the lettered subcategories
      continue;
    }

    // Check for lettered subcategory (A., B., C., etc.)
    if (cells.length >= 2) {
      const letterCell = cleanText(cells[0].textContent || '');
      const letterMatch = letterCell.match(/^([A-Z])\.?$/);

      if (letterMatch && cells[1].querySelector('.bold')) {
        // New category
        const categoryName = cleanText(cells[1].textContent || '');
        currentCategory = {
          letter: letterMatch[1],
          name: categoryName,
          uses: []
        };
        categories.push(currentCategory);
        continue;
      }
    }

    // Regular use row - extract use name and permit values
    if (!currentCategory) continue;

    // Find the use name cell (usually second cell after empty first)
    let useName = '';
    let permitValues: string[] = [];
    let regulations = '';
    let isIndented = false;

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const cellText = cleanText(cell.textContent || '');

      if (i === 0 && cellText === '') {
        // Empty first cell - normal
        continue;
      }

      if (i === 0 && cellText !== '') {
        // First cell has content - might be a sub-item marker
        continue;
      }

      if (i === 1 || (i === 0 && useName === '')) {
        // Use name cell
        useName = cellText;
        // Check if it's an indented sub-item (like "Small", "Medium", "Large")
        const style = cell.getAttribute('style') || '';
        if (style.includes('padding-left') || cellText.match(/^(Small|Medium|Large|Minor|Major)/i)) {
          isIndented = true;
        }
        continue;
      }

      // Permit value cells
      if (cellText.match(/^(A|AP|MUP|UP|E|---|-)$/)) {
        permitValues.push(cellText);
      } else if (cellText.match(/^\d+\.\d+/)) {
        // Regulations reference
        regulations = cellText;
      } else if (cellText.includes('/')) {
        // Combined permit (like "A/MUP")
        permitValues.push(cellText);
      }
    }

    if (useName && permitValues.length > 0) {
      const permits: Record<string, string> = {};
      for (let i = 0; i < Math.min(zones.length, permitValues.length); i++) {
        permits[zones[i]] = permitValues[i];
      }

      currentCategory.uses.push({
        name: useName,
        indent: isIndented ? 1 : undefined,
        permits,
        regulations: regulations || undefined
      });
    }
  }

  return {
    name: tableName.replace('TABLE OF ALLOWED USES', '').trim() || 'Allowed Uses',
    zones,
    legend,
    categories
  };
}

/**
 * Convert a parsed table to readable markdown text for the section content
 */
function tableToMarkdown(table: AllowedUseTable): string {
  let md = `## ${table.name}\n\n`;

  // Legend
  md += '**Legend:** ';
  md += Object.entries(table.legend)
    .map(([code, desc]) => `${code} = ${desc}`)
    .join(', ');
  md += '\n\n';

  // Table header
  md += '| Use | ' + table.zones.join(' | ') + ' | Regulations |\n';
  md += '|-----|' + table.zones.map(() => '---').join('|') + '|-------------|\n';

  // Categories and uses
  for (const cat of table.categories) {
    md += `| **${cat.letter}. ${cat.name}** |` + table.zones.map(() => '').join('|') + '||\n';

    for (const use of cat.uses) {
      const prefix = use.indent ? '  ' : '';
      const permits = table.zones.map(z => use.permits[z] || '').join(' | ');
      md += `| ${prefix}${use.name} | ${permits} | ${use.regulations || ''} |\n`;
    }
  }

  return md;
}

/**
 * Parse a single HTML file into sections
 */
async function parseHtmlFile(filePath: string): Promise<CodeSection[]> {
  const html = await fs.readFile(filePath, 'utf-8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const sections: CodeSection[] = [];

  // Find all section headers (h3.Cite)
  const headers = doc.querySelectorAll('h3.Cite');

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const id = header.getAttribute('id') || '';
    const anchor = header.querySelector('a[name]');
    const sectionId = anchor?.getAttribute('name') || id;

    // Extract title (text after the section number)
    const headerText = cleanText(header.textContent || '');
    const titleMatch = headerText.match(/^[\d.-]+\s*(.*)$/);
    const title = titleMatch ? titleMatch[1] : headerText;

    // Collect content until next header
    let content = '';
    const tables: AllowedUseTable[] = [];
    let nextElement = header.nextElementSibling;

    while (nextElement && !nextElement.matches('h3.Cite, h2.CH')) {
      if (nextElement.tagName.toLowerCase() === 'table') {
        // Try to parse as allowed uses table
        const parsedTable = parseAllowedUsesTable(nextElement);
        if (parsedTable) {
          tables.push(parsedTable);
          content += '\n\n' + tableToMarkdown(parsedTable);
        } else {
          // Regular table - extract as text
          content += '\n\n[Table]\n';
          const rows = nextElement.querySelectorAll('tr');
          for (const row of rows) {
            const cells = row.querySelectorAll('td, th');
            const cellTexts = Array.from(cells).map(c => cleanText(c.textContent || ''));
            content += cellTexts.join(' | ') + '\n';
          }
        }
      } else if (nextElement.tagName.toLowerCase() === 'p') {
        content += extractText(nextElement) + '\n\n';
      } else {
        content += extractText(nextElement);
      }

      nextElement = nextElement.nextElementSibling;
    }

    sections.push({
      id: sectionId,
      title: title.trim(),
      text: cleanText(content),
      ordinances: [], // Would need to extract from source if available
      tables: tables.length > 0 ? tables : undefined
    });
  }

  return sections;
}

/**
 * Group sections into articles based on section numbering
 */
function groupIntoArticles(sections: CodeSection[]): CodeArticle[] {
  // Chapter 28 articles based on section ranges
  const articleDefs: Array<{id: string; title: string; prefix: string}> = [
    { id: 'I', title: 'General Provisions', prefix: '28.0' },
    { id: 'II', title: 'Districts and Allowable Uses', prefix: '28.1' },
    { id: 'II', title: 'Districts and Allowable Uses', prefix: '28.2' },
    { id: 'II', title: 'Districts and Allowable Uses', prefix: '28.3' },
    { id: 'II', title: 'Districts and Allowable Uses', prefix: '28.4' },
    { id: 'III', title: 'Site Development Standards', prefix: '28.5' },
    { id: 'IV', title: 'Specific Use Regulations', prefix: '28.7' },
    { id: 'V', title: 'Nonconforming Uses', prefix: '28.8' },
    { id: 'VI', title: 'Administration', prefix: '28.9' },
  ];

  const articles = new Map<string, CodeArticle>();

  for (const section of sections) {
    // Find matching article
    let articleDef = articleDefs.find(a => section.id.startsWith(a.prefix));

    if (!articleDef) {
      // Default to General Provisions
      articleDef = articleDefs[0];
    }

    if (!articles.has(articleDef.id)) {
      articles.set(articleDef.id, {
        id: articleDef.id,
        title: articleDef.title,
        sections: []
      });
    }

    articles.get(articleDef.id)!.sections.push(section);
  }

  // Sort articles by Roman numeral order
  const order = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  return Array.from(articles.values()).sort((a, b) =>
    order.indexOf(a.id) - order.indexOf(b.id)
  );
}

/**
 * Main parser function
 */
async function main() {
  console.log('Parsing Chapter 28 HTML files...\n');

  const allSections: CodeSection[] = [];

  // Parse each HTML file
  const files = await fs.readdir(HTML_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html') && f.includes('28'));

  for (const file of htmlFiles) {
    console.log(`Processing ${file}...`);
    const filePath = path.join(HTML_DIR, file);
    const sections = await parseHtmlFile(filePath);
    console.log(`  Found ${sections.length} sections`);
    allSections.push(...sections);
  }

  // Remove duplicates (same section ID)
  const uniqueSections = new Map<string, CodeSection>();
  for (const section of allSections) {
    if (!uniqueSections.has(section.id)) {
      uniqueSections.set(section.id, section);
    }
  }

  console.log(`\nTotal unique sections: ${uniqueSections.size}`);

  // Group into articles
  const articles = groupIntoArticles(Array.from(uniqueSections.values()));

  // Build chapter structure
  const chapter: CodeChapter = {
    chapter: '28',
    title: 'Zoning Regulations',
    articles
  };

  // Write output
  const outputPath = path.join(OUTPUT_DIR, 'chapter-28-zoning.json');
  await fs.writeFile(outputPath, JSON.stringify(chapter, null, 2));
  console.log(`\nWrote ${outputPath}`);

  // Print summary
  console.log('\nChapter structure:');
  for (const article of articles) {
    console.log(`  Article ${article.id}: ${article.title} (${article.sections.length} sections)`);
  }
}

main().catch(console.error);
