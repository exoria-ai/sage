#!/usr/bin/env npx ts-node
/**
 * ESRI ArcGIS REST API Documentation Scraper
 *
 * Scrapes the ArcGIS REST APIs documentation and converts
 * each page to markdown for LLM consumption.
 *
 * Usage:
 *   npx ts-node scripts/scrape-esri-rest-docs.ts --discover    # Discover all pages
 *   npx ts-node scripts/scrape-esri-rest-docs.ts --priority    # Scrape priority pages
 *   npx ts-node scripts/scrape-esri-rest-docs.ts --all         # Scrape all pages
 *   npx ts-node scripts/scrape-esri-rest-docs.ts --url=<url>   # Scrape single URL
 */

import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type CheerioAPI = ReturnType<typeof cheerio.load>;

const BASE_URL = 'https://developers.arcgis.com';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'esri-rest-api');
const INDEX_FILE = path.join(OUTPUT_DIR, '_index.json');

// Rate limiting
const DELAY_MS = 300;
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface DocPage {
  url: string;
  title: string;
  category: string;
  subcategory?: string;
}

interface PageIndex {
  discoveredAt: string;
  pages: DocPage[];
}

/**
 * Fetch a page and extract its HTML content
 */
async function fetchPage(url: string): Promise<string> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; SAGE-DocScraper/1.0)',
      'Accept': 'text/html,application/xhtml+xml'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${fullUrl}: ${response.status}`);
  }

  return response.text();
}

/**
 * Discover all documentation pages by crawling the sidebar navigation
 */
async function discoverPages(): Promise<DocPage[]> {
  const pages: DocPage[] = [];
  const visited = new Set<string>();

  // Main sections to crawl
  const sections = [
    { url: '/rest/services-reference/enterprise/', category: 'services-enterprise' },
    { url: '/rest/services-reference/online/', category: 'services-online' },
    { url: '/rest/geocode/', category: 'geocode' },
    { url: '/rest/routing/', category: 'routing' },
    { url: '/rest/elevation/', category: 'elevation' },
    { url: '/rest/places/', category: 'places' },
    { url: '/rest/basemap-styles/', category: 'basemap-styles' },
    { url: '/rest/geoenrichment/', category: 'geoenrichment' },
    { url: '/rest/analysis/', category: 'spatial-analysis' },
    { url: '/rest/users-groups-and-items/', category: 'portal' },
    { url: '/rest/enterprise-administration/', category: 'enterprise-admin' },
  ];

  for (const section of sections) {
    console.log(`Discovering pages in ${section.category}...`);

    try {
      const html = await fetchPage(section.url);
      const $ = cheerio.load(html);

      // Find all links in the sidebar navigation tree
      $('[role="tree"] a, [role="treeitem"] a, nav a[href*="/rest/"]').each((_: number, el: cheerio.Element) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();

        if (href && text && href.startsWith('/rest/') && !visited.has(href)) {
          visited.add(href);

          // Determine subcategory from URL structure
          const urlParts = href.replace('/rest/', '').split('/').filter(p => p);
          const subcategory = urlParts.length > 1 ? urlParts[0] : undefined;

          pages.push({
            url: href,
            title: text,
            category: section.category,
            subcategory
          });
        }
      });

      await sleep(DELAY_MS);
    } catch (error) {
      console.error(`Error discovering ${section.category}:`, error);
    }
  }

  return pages;
}

/**
 * Convert REST API documentation HTML to markdown
 */
function htmlToMarkdown(html: string, page: DocPage): string {
  const $ = cheerio.load(html);
  const lines: string[] = [];

  // Title
  const title = $('h1').first().text().trim() || page.title;
  lines.push(`# ${title}`);
  lines.push('');

  // Category info
  lines.push(`**Category:** ${page.category}${page.subcategory ? ` / ${page.subcategory}` : ''}`);
  lines.push(`**URL:** ${BASE_URL}${page.url}`);
  lines.push('');

  // Extract meta info box (URL pattern, Methods, Version, etc.)
  const metaTable = $('main table').first();
  if (metaTable.length) {
    lines.push('## Service Info');
    lines.push('');
    metaTable.find('tr').each((_: number, row: cheerio.Element) => {
      const cells = $(row).find('td, th');
      if (cells.length >= 2) {
        const label = cells.eq(0).text().trim();
        const value = cells.eq(1).text().trim();
        if (label && value) {
          lines.push(`- **${label}:** ${value}`);
        }
      }
    });
    lines.push('');
  }

  // Description section
  const descHeader = $('h2').filter((_: number, el: cheerio.Element) => $(el).text().includes('Description')).first();
  if (descHeader.length) {
    lines.push('## Description');
    lines.push('');

    let el = descHeader.next();
    let descParagraphs = 0;
    while (el.length && el.prop('tagName') !== 'H2' && descParagraphs < 5) {
      if (el.prop('tagName') === 'P') {
        const text = cleanText(el.text());
        if (text.length > 20) {
          lines.push(text);
          lines.push('');
          descParagraphs++;
        }
      }
      // Handle note/callout boxes
      if (el.hasClass('note') || el.find('.note').length) {
        const noteText = cleanText(el.text());
        if (noteText) {
          lines.push(`> **Note:** ${noteText}`);
          lines.push('');
        }
      }
      el = el.next();
    }
  }

  // Request Parameters section
  const paramHeader = $('h2').filter((_: number, el: cheerio.Element) => $(el).text().includes('Request parameters')).first();
  if (paramHeader.length) {
    lines.push('## Request Parameters');
    lines.push('');

    // Find the parameters table
    let el = paramHeader.next();
    while (el.length && el.prop('tagName') !== 'TABLE' && el.prop('tagName') !== 'H2') {
      el = el.next();
    }

    if (el.prop('tagName') === 'TABLE') {
      el.find('tbody tr, tr').each((i: number, row: cheerio.Element) => {
        const cells = $(row).find('td');
        if (cells.length >= 2) {
          const paramName = cells.eq(0).text().trim();
          const paramDesc = cleanText(cells.eq(1).text()).substring(0, 500);

          if (paramName && !paramName.toLowerCase().includes('parameter')) {
            lines.push(`### \`${paramName}\``);
            lines.push('');
            lines.push(paramDesc);
            lines.push('');
          }
        }
      });
    }
  }

  // Response section
  const responseHeader = $('h2').filter((_: number, el: cheerio.Element) =>
    $(el).text().includes('Response') || $(el).text().includes('JSON Response')
  ).first();
  if (responseHeader.length) {
    lines.push('## Response');
    lines.push('');

    let el = responseHeader.next();
    let responseContent = 0;
    while (el.length && el.prop('tagName') !== 'H2' && responseContent < 3) {
      if (el.prop('tagName') === 'P') {
        const text = cleanText(el.text());
        if (text.length > 20) {
          lines.push(text);
          lines.push('');
          responseContent++;
        }
      }
      el = el.next();
    }
  }

  // Code examples
  const examples = extractCodeExamples($);
  if (examples) {
    lines.push('## Examples');
    lines.push('');
    lines.push(examples);
    lines.push('');
  }

  // Child resources/operations (for service overview pages)
  const childOps = $('h2').filter((_: number, el: cheerio.Element) =>
    $(el).text().includes('Operations') ||
    $(el).text().includes('Child Resources') ||
    $(el).text().includes('Sub-resources')
  ).first();
  if (childOps.length) {
    lines.push('## Operations / Resources');
    lines.push('');

    let el = childOps.next();
    while (el.length && el.prop('tagName') !== 'H2') {
      if (el.prop('tagName') === 'UL' || el.prop('tagName') === 'OL') {
        el.find('li').each((_: number, li: cheerio.Element) => {
          const link = $(li).find('a').first();
          const text = link.length ? link.text().trim() : $(li).text().trim();
          if (text) {
            lines.push(`- ${text}`);
          }
        });
        lines.push('');
      }
      el = el.next();
    }
  }

  return lines.join('\n');
}

/**
 * Extract code examples from the page
 */
function extractCodeExamples($: CheerioAPI): string | null {
  const examples: string[] = [];

  $('pre code, .code-snippet code, [class*="language-"]').each((i: number, el: cheerio.Element) => {
    if (i > 4) return; // Limit to first 5 examples

    const code = $(el).text().trim();
    if (code && code.length > 30 && code.length < 3000) {
      // Detect language
      const parent = $(el).parent();
      const classAttr = parent.attr('class') || $(el).attr('class') || '';
      const langMatch = classAttr.match(/language-(\w+)/);
      const lang = langMatch ? langMatch[1] : 'json';

      examples.push(`\`\`\`${lang}`);
      examples.push(code);
      examples.push('```');
      examples.push('');
    }
  });

  return examples.length > 0 ? examples.join('\n') : null;
}

/**
 * Clean text for markdown output
 */
function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
}

/**
 * Ensure output directory exists
 */
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Generate a safe filename from URL
 */
function urlToFilename(url: string): string {
  return url
    .replace('/rest/', '')
    .replace(/\//g, '_')
    .replace(/^_|_$/g, '')
    .replace(/_+/g, '_')
    || 'index';
}

/**
 * Save markdown to file
 */
function saveMarkdown(page: DocPage, content: string): void {
  const categoryDir = path.join(OUTPUT_DIR, page.category);
  ensureDir(categoryDir);

  const filename = `${urlToFilename(page.url)}.md`;
  const filepath = path.join(categoryDir, filename);

  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`Saved: ${filepath}`);
}

/**
 * Save/load page index
 */
function saveIndex(pages: DocPage[]): void {
  ensureDir(OUTPUT_DIR);
  const index: PageIndex = {
    discoveredAt: new Date().toISOString(),
    pages
  };
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
  console.log(`Index saved: ${pages.length} pages`);
}

function loadIndex(): PageIndex | null {
  if (fs.existsSync(INDEX_FILE)) {
    return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
  }
  return null;
}

/**
 * Priority pages most relevant for SAGE GIS assistant
 */
const PRIORITY_URLS = [
  // Feature Service (most important for querying parcels, etc.)
  '/rest/services-reference/enterprise/feature-service/',
  '/rest/services-reference/enterprise/layer-feature-service/',
  '/rest/services-reference/enterprise/query-feature-service-layer/',
  '/rest/services-reference/enterprise/query-feature-service/',
  '/rest/services-reference/enterprise/add-features/',
  '/rest/services-reference/enterprise/apply-edits-feature-service-layer/',
  '/rest/services-reference/enterprise/generate-renderer/',

  // Map Service
  '/rest/services-reference/enterprise/map-service/',
  '/rest/services-reference/enterprise/export-map/',
  '/rest/services-reference/enterprise/identify-map-service/',
  '/rest/services-reference/enterprise/find-map-service/',

  // Geometry operations
  '/rest/services-reference/enterprise/geometry-objects/',
  '/rest/services-reference/enterprise/buffer/',
  '/rest/services-reference/enterprise/project/',
  '/rest/services-reference/enterprise/union/',
  '/rest/services-reference/enterprise/intersect/',

  // Geocoding
  '/rest/geocode/',
  '/rest/geocode/find-address-candidates/',
  '/rest/geocode/reverse-geocode/',
  '/rest/geocode/geocode-addresses/',

  // Data types
  '/rest/services-reference/enterprise/feature-object/',
  '/rest/services-reference/enterprise/featureset-object/',
  '/rest/services-reference/enterprise/renderer-objects/',
  '/rest/services-reference/enterprise/symbol-objects/',
  '/rest/services-reference/enterprise/domain-objects/',

  // Image/Tile services
  '/rest/services-reference/enterprise/image-service/',
  '/rest/services-reference/enterprise/export-image/',
  '/rest/services-reference/enterprise/vector-tile-service/',
  '/rest/services-reference/enterprise/map-tile-service/',

  // Portal
  '/rest/users-groups-and-items/working-with-users-groups-and-items/',
  '/rest/users-groups-and-items/item/',
  '/rest/users-groups-and-items/search/',
];

/**
 * Scrape a single page
 */
async function scrapePage(page: DocPage): Promise<boolean> {
  console.log(`Fetching: ${page.title} (${page.url})`);

  try {
    const html = await fetchPage(page.url);
    const markdown = htmlToMarkdown(html, page);
    saveMarkdown(page, markdown);
    return true;
  } catch (error) {
    console.error(`Error scraping ${page.url}:`, error);
    return false;
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);

  ensureDir(OUTPUT_DIR);

  if (args.includes('--help')) {
    console.log(`
ESRI REST API Documentation Scraper

Usage:
  npx ts-node scripts/scrape-esri-rest-docs.ts [options]

Options:
  --discover        Discover and index all documentation pages
  --priority        Scrape priority pages (most relevant for SAGE)
  --all             Scrape all discovered pages
  --url=<url>       Scrape a single URL
  --category=<cat>  Scrape all pages in a category
  --help            Show this help

Examples:
  npx ts-node scripts/scrape-esri-rest-docs.ts --discover
  npx ts-node scripts/scrape-esri-rest-docs.ts --priority
  npx ts-node scripts/scrape-esri-rest-docs.ts --url=/rest/services-reference/enterprise/query-feature-service-layer/
`);
    return;
  }

  // Discover mode
  if (args.includes('--discover')) {
    console.log('Discovering all documentation pages...');
    const pages = await discoverPages();
    saveIndex(pages);

    // Print summary by category
    const byCategory = new Map<string, number>();
    pages.forEach(p => {
      byCategory.set(p.category, (byCategory.get(p.category) || 0) + 1);
    });
    console.log('\nPages by category:');
    byCategory.forEach((count, cat) => console.log(`  ${cat}: ${count}`));
    return;
  }

  // Single URL mode
  const urlArg = args.find(a => a.startsWith('--url='));
  if (urlArg) {
    const url = urlArg.split('=')[1];
    if (!url) {
      console.error('Please specify a URL');
      return;
    }
    const page: DocPage = {
      url,
      title: url.split('/').filter(p => p).pop() || 'page',
      category: 'manual'
    };
    await scrapePage(page);
    return;
  }

  // Priority mode
  if (args.includes('--priority')) {
    console.log(`Scraping ${PRIORITY_URLS.length} priority pages...`);

    let success = 0;
    for (const url of PRIORITY_URLS) {
      const page: DocPage = {
        url,
        title: url.split('/').filter(p => p).pop() || 'page',
        category: url.includes('geocode') ? 'geocode' :
                  url.includes('users-groups') ? 'portal' : 'services-enterprise'
      };
      if (await scrapePage(page)) success++;
      await sleep(DELAY_MS);
    }

    console.log(`\nDone! Scraped ${success}/${PRIORITY_URLS.length} priority pages.`);
    return;
  }

  // All pages mode
  if (args.includes('--all')) {
    const index = loadIndex();
    if (!index) {
      console.error('No index found. Run --discover first.');
      return;
    }

    console.log(`Scraping ${index.pages.length} pages...`);

    let success = 0;
    for (const page of index.pages) {
      if (await scrapePage(page)) success++;
      await sleep(DELAY_MS);
    }

    console.log(`\nDone! Scraped ${success}/${index.pages.length} pages.`);
    return;
  }

  // Category mode
  const catArg = args.find(a => a.startsWith('--category='));
  if (catArg) {
    const category = catArg.split('=')[1];
    const index = loadIndex();
    if (!index) {
      console.error('No index found. Run --discover first.');
      return;
    }

    const pages = index.pages.filter(p => p.category === category);
    if (pages.length === 0) {
      console.error(`No pages found for category: ${category}`);
      console.log('Available categories:', [...new Set(index.pages.map(p => p.category))].join(', '));
      return;
    }

    console.log(`Scraping ${pages.length} pages in ${category}...`);

    let success = 0;
    for (const page of pages) {
      if (await scrapePage(page)) success++;
      await sleep(DELAY_MS);
    }

    console.log(`\nDone! Scraped ${success}/${pages.length} pages.`);
    return;
  }

  console.log('No action specified. Use --help for usage info.');
}

main().catch(console.error);
