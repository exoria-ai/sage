/**
 * Generic Parser for Solano County Code HTML files
 *
 * Extracts sections from HTML chapters and converts them to structured JSON
 * for the county code lookup tool.
 *
 * Usage:
 *   npx tsx scripts/parse-county-code.ts chapter-19.html parks-recreation
 *   npx tsx scripts/parse-county-code.ts chapter-23.html refuse-garbage
 *   npx tsx scripts/parse-county-code.ts chapter-24.html roads-streets
 *   npx tsx scripts/parse-county-code.ts chapter-26.5.html underground-utilities
 *   npx tsx scripts/parse-county-code.ts chapter-30.html address-numbering
 *   npx tsx scripts/parse-county-code.ts chapter-31.html grading-drainage
 */

import { JSDOM } from 'jsdom';
import { promises as fs } from 'fs';
import * as path from 'path';

// Types for the output structure
interface CodeSection {
  id: string;
  title: string;
  text: string;
  ordinances: string[];
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

interface ParsedSection {
  id: string;
  title: string;
  text: string;
  ordinances: string[];
  articleId: string;
  articleTitle: string;
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
 * Extract ordinance numbers from history note text
 */
function extractOrdinances(historyNote: string): string[] {
  const matches = historyNote.matchAll(/Ord\.?\s*No\.?\s*(\d+)/gi);
  const ordinances: string[] = [];
  for (const match of matches) {
    if (match[1] && !ordinances.includes(match[1])) {
      ordinances.push(match[1]);
    }
  }
  return ordinances;
}

/**
 * Extract text content from an element, handling nested tags
 */
function extractText(element: Element): string {
  let text = '';
  for (const node of element.childNodes) {
    if (node.nodeType === 3) {
      // Text node
      text += node.textContent;
    } else if (node.nodeType === 1) {
      // Element node
      const el = node as Element;
      const tagName = el.tagName.toLowerCase();

      // Skip navigation and image elements
      if (tagName === 'img' || (tagName === 'a' && el.querySelector('img'))) {
        continue;
      }

      // Handle links - extract text
      if (tagName === 'a') {
        text += el.textContent?.trim() || '';
      } else if (tagName === 'br') {
        text += '\n';
      } else if (tagName === 'p') {
        text += extractText(el) + '\n\n';
      } else if (tagName === 'span') {
        // Handle bold spans for definitions
        if (el.classList.contains('bold')) {
          text += '**' + extractText(el) + '**';
        } else {
          text += extractText(el);
        }
      } else {
        text += extractText(el);
      }
    }
  }
  return text;
}

/**
 * Parse article header text to extract ID and title
 */
function parseArticleHeader(text: string): { id: string; title: string } | null {
  const articleMatch = text.match(/ARTICLE\s+([IVX]+)\.?\s*(.+)?/i);
  if (articleMatch) {
    return {
      id: articleMatch[1] || '',
      title: cleanText(articleMatch[2] || ''),
    };
  }
  return null;
}

/**
 * Parse a single HTML file into sections with article assignments
 */
async function parseHtmlFile(filePath: string): Promise<{
  sections: ParsedSection[];
  chapterNum: string;
  chapterTitle: string;
}> {
  const html = await fs.readFile(filePath, 'utf-8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const sections: ParsedSection[] = [];

  // Extract chapter info from h1.Title
  const h1 = doc.querySelector('h1.Title');
  let chapterNum = '';
  let chapterTitle = '';
  if (h1) {
    // Remove superscript footnote markers from the title
    const supElements = h1.querySelectorAll('sup');
    for (const sup of supElements) {
      sup.remove();
    }
    const h1Text = h1.textContent || '';
    // Extract chapter number (handles 26.5 style)
    const chapterMatch = h1Text.match(/CHAPTER\s+([\d.]+)/i);
    if (chapterMatch) {
      chapterNum = chapterMatch[1] || '';
    }
    // Extract title (text after <br>)
    const brIndex = h1Text.indexOf('\n');
    if (brIndex >= 0) {
      chapterTitle = cleanText(h1Text.substring(brIndex + 1));
    } else {
      // Try to get text after chapter number
      const titleMatch = h1Text.match(/CHAPTER\s+[\d.]+\s*(.+)/i);
      if (titleMatch) {
        chapterTitle = cleanText(titleMatch[1] || '');
      }
    }
  }

  // Get the main content area
  const mainContent = doc.querySelector('#mainContent');
  if (!mainContent) {
    console.error('No #mainContent found');
    return { sections, chapterNum, chapterTitle };
  }

  // Track current article as we iterate through elements
  let currentArticleId = 'I';
  let currentArticleTitle = 'General Provisions';

  // Process elements in order
  const elements = mainContent.children;
  let i = 0;

  while (i < elements.length) {
    const element = elements[i];
    if (!element) {
      i++;
      continue;
    }

    // Check for article headers (p.Article)
    if (element.classList.contains('Article')) {
      const parsed = parseArticleHeader(element.textContent || '');
      if (parsed) {
        currentArticleId = parsed.id;
        currentArticleTitle = parsed.title;
      }
      i++;
      continue;
    }

    // Check for section headers (h3.Cite)
    if (element.tagName.toLowerCase() === 'h3' && element.classList.contains('Cite')) {
      const id = element.getAttribute('id') || '';
      const anchor = element.querySelector('a[name]');
      const sectionId = anchor?.getAttribute('name') || id;

      // Extract title (text after the section number)
      const headerText = cleanText(element.textContent || '');
      const titleMatch = headerText.match(/^[\d.-]+\s*(.*)$/);
      const title = titleMatch && titleMatch[1] ? titleMatch[1] : headerText;

      // Collect content from following elements until next header or article
      let content = '';
      let ordinances: string[] = [];
      i++; // Move to next element

      while (i < elements.length) {
        const nextElement = elements[i];
        if (!nextElement) break;

        // Stop at next section or article
        if (
          (nextElement.tagName.toLowerCase() === 'h3' && nextElement.classList.contains('Cite')) ||
          nextElement.classList.contains('Article')
        ) {
          break;
        }

        if (nextElement.tagName.toLowerCase() === 'table') {
          // Extract table as text
          content += '\n\n[Table]\n';
          const rows = nextElement.querySelectorAll('tr');
          for (const row of rows) {
            const cells = row.querySelectorAll('td, th');
            const cellTexts = Array.from(cells).map((c) => cleanText(c.textContent || ''));
            content += cellTexts.join(' | ') + '\n';
          }
        } else if (nextElement.classList.contains('HistoryNote')) {
          // Extract ordinance numbers from history note
          const historyText = nextElement.textContent || '';
          ordinances = extractOrdinances(historyText);
        } else if (nextElement.tagName.toLowerCase() === 'p') {
          // Skip TOC entries
          if (nextElement.classList.contains('CiteTOC') || nextElement.classList.contains('ArticleTOC')) {
            i++;
            continue;
          }

          const pClass = nextElement.className;
          // Add appropriate indentation based on paragraph class
          let prefix = '';
          if (pClass.includes('P2')) {
            prefix = '  ';
          } else if (pClass.includes('P3')) {
            prefix = '    ';
          } else if (pClass.includes('P4')) {
            prefix = '      ';
          }

          const pText = extractText(nextElement);
          if (pText.trim()) {
            content += prefix + pText.trim() + '\n\n';
          }
        }

        i++;
      }

      sections.push({
        id: sectionId,
        title: title.trim(),
        text: cleanText(content),
        ordinances,
        articleId: currentArticleId,
        articleTitle: currentArticleTitle,
      });

      continue; // Don't increment i again, already advanced
    }

    i++;
  }

  return { sections, chapterNum, chapterTitle };
}

/**
 * Group sections into articles
 */
function groupIntoArticles(sections: ParsedSection[]): CodeArticle[] {
  const articleMap = new Map<string, CodeArticle>();
  const romanOrder = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  for (const section of sections) {
    if (!articleMap.has(section.articleId)) {
      articleMap.set(section.articleId, {
        id: section.articleId,
        title: section.articleTitle,
        sections: [],
      });
    }

    articleMap.get(section.articleId)!.sections.push({
      id: section.id,
      title: section.title,
      text: section.text,
      ordinances: section.ordinances,
    });
  }

  // Sort by Roman numeral order
  const articles = Array.from(articleMap.values());
  articles.sort((a, b) => {
    const aIndex = romanOrder.indexOf(a.id);
    const bIndex = romanOrder.indexOf(b.id);
    if (aIndex === -1 && bIndex === -1) return a.id.localeCompare(b.id);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return articles;
}

/**
 * Main parser function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: npx tsx scripts/parse-county-code.ts <html-file> <output-slug>');
    console.log('Example: npx tsx scripts/parse-county-code.ts chapter-19.html parks-recreation');
    process.exit(1);
  }

  const htmlFile = args[0]!;
  const outputSlug = args[1]!;

  const filePath = path.join(HTML_DIR, htmlFile);

  // Check if file exists
  try {
    await fs.access(filePath);
  } catch {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  console.log(`Parsing ${htmlFile}...`);

  const { sections, chapterNum, chapterTitle } = await parseHtmlFile(filePath);

  console.log(`  Found ${sections.length} sections`);
  console.log(`  Chapter: ${chapterNum} - ${chapterTitle}`);

  // Group into articles
  const articles = groupIntoArticles(sections);

  // Build chapter structure
  const chapter: CodeChapter = {
    chapter: chapterNum,
    title: chapterTitle,
    articles,
  };

  // Write output
  const outputPath = path.join(OUTPUT_DIR, `chapter-${chapterNum}-${outputSlug}.json`);
  await fs.writeFile(outputPath, JSON.stringify(chapter, null, 2));
  console.log(`\nWrote ${outputPath}`);

  // Print summary
  console.log('\nChapter structure:');
  for (const article of articles) {
    console.log(`  Article ${article.id}: ${article.title} (${article.sections.length} sections)`);
  }
}

main().catch(console.error);
