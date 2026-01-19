#!/usr/bin/env npx tsx
/**
 * ESRI REST API Documentation Scraper
 *
 * Scrapes the ArcGIS REST Services Reference documentation and converts
 * each page to markdown using Turndown for clean conversion.
 *
 * Usage:
 *   npx tsx scripts/scrape-esri-rest-api.ts --priority  # Scrape priority pages
 *   npx tsx scripts/scrape-esri-rest-api.ts --url=/rest/services-reference/enterprise/query-feature-service-layer/
 *   npx tsx scripts/scrape-esri-rest-api.ts --all      # Scrape all from items_to_scrape.md
 */

import TurndownService from 'turndown';
import { load } from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://developers.arcgis.com';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'esri-rest-api');

// Rate limiting
const DELAY_MS = 500;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Configure Turndown for clean markdown output
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// Custom rules for code blocks - handle ESRI's code block structure
turndown.addRule('codeBlocks', {
  filter: (node) => {
    return node.nodeName === 'PRE' && node.querySelector('code') !== null;
  },
  replacement: (content, node) => {
    const codeEl = (node as Element).querySelector('code');
    let code = codeEl?.textContent || content;

    // Clean up ESRI-specific artifacts
    // Remove line numbers at start of lines (e.g., "1\n2\n" or standalone numbers)
    code = code.replace(/^(\d+\n)+/gm, '');
    // Remove "Copy" text that appears in their UI
    code = code.replace(/^Copy\s*/gm, '');

    const langClass = codeEl?.className || '';
    const langMatch = langClass.match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : '';
    return `\n\`\`\`${lang}\n${code.trim()}\n\`\`\`\n`;
  },
});

// Handle definition lists (common in REST API docs)
turndown.addRule('definitionLists', {
  filter: 'dl',
  replacement: (content, node) => {
    const dl = node as Element;
    const items: string[] = [];

    const children = Array.from(dl.children);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.tagName === 'DT') {
        const term = child.textContent?.trim() || '';
        const nextChild = children[i + 1];
        const def =
          nextChild?.tagName === 'DD' ? nextChild.textContent?.trim() || '' : '';
        items.push(`**${term}**: ${def}`);
      }
    }
    return '\n' + items.join('\n\n') + '\n';
  },
});

// Handle tables better
turndown.addRule('tables', {
  filter: 'table',
  replacement: (content, node) => {
    const table = node as Element;
    const rows = Array.from(table.querySelectorAll('tr'));
    if (rows.length === 0) return content;

    const lines: string[] = [];
    let headerProcessed = false;

    rows.forEach((row, rowIndex) => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      const cellValues = cells.map((cell) => {
        // Get text content, clean up whitespace
        let text = cell.textContent?.trim().replace(/\s+/g, ' ') || '';
        // Remove line numbers that appear in code snippets within tables
        // Pattern: "Syntax:1 2 3 4 5 6 ..." -> "Syntax: "
        text = text.replace(/(Syntax:|Example:)\s*((?:\d+\s+)+)/g, '$1 ');
        // Also handle standalone line number sequences like "1 2 3 4 5 6 7 8 9 10 11 ["
        text = text.replace(/(?:^|\s)((?:\d+\s+){3,})(?=\[|{)/g, ' ');
        // Clean up "Use dark colors for code blocksCopy" text
        text = text.replace(/Use dark colors for code blocks?Copy?\d*/g, '');
        // Escape pipes in content
        return text.replace(/\|/g, '\\|');
      });

      if (cellValues.length === 0) return;

      lines.push('| ' + cellValues.join(' | ') + ' |');

      // Add separator after header row
      if (row.querySelector('th') && !headerProcessed) {
        lines.push('|' + cellValues.map(() => '---').join('|') + '|');
        headerProcessed = true;
      } else if (rowIndex === 0 && !headerProcessed) {
        // First row might be header without th tags
        lines.push('|' + cellValues.map(() => '---').join('|') + '|');
        headerProcessed = true;
      }
    });

    return '\n\n' + lines.join('\n') + '\n\n';
  },
});

/**
 * Fetch a page and return its HTML content
 */
async function fetchPage(url: string): Promise<string> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; SAGE-DocScraper/1.0)',
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${fullUrl}: ${response.status}`);
  }

  return response.text();
}

/**
 * Extract the main content and convert to markdown
 */
function htmlToMarkdown(html: string, urlPath: string): string {
  const $ = load(html);

  // Get the title
  const title = $('h1').first().text().trim() || $('title').text().trim();

  // Extract main content area
  const mainContent = $('main#main, main, article, .content').first();

  if (!mainContent.length) {
    console.warn(`  Warning: No main content found, using body`);
  }

  // Remove navigation, sidebars, and other non-content elements
  mainContent.find('nav, aside, .sidebar, .navigation, .breadcrumb, .toc').remove();
  mainContent.find('script, style, noscript').remove();

  // Remove feedback section at the bottom
  mainContent.find('.feedback, [class*="feedback"], [class*="Feedback"]').remove();

  // Remove the first h1 since we add it ourselves
  mainContent.find('h1').first().remove();

  // Remove ESRI UI elements that leak into content
  mainContent.find('.calcite-code-copy, [class*="code-copy"]').remove();
  mainContent.find('button').remove();

  // Get the cleaned HTML
  const contentHtml = mainContent.html() || $('body').html() || '';

  // Convert to markdown using Turndown
  let markdown = turndown.turndown(contentHtml);

  // Clean up the markdown
  markdown = cleanMarkdown(markdown, title, urlPath);

  return markdown;
}

/**
 * Clean up and format the markdown output
 */
function cleanMarkdown(markdown: string, title: string, urlPath: string): string {
  const lines: string[] = [];

  // Add header with source info
  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> Source: [${urlPath}](${BASE_URL}${urlPath})`);
  lines.push('');

  // Process the markdown content
  let content = markdown
    // Remove excessive blank lines
    .replace(/\n{4,}/g, '\n\n\n')
    // Clean up list formatting
    .replace(/^-\s+$/gm, '')
    // Remove empty links
    .replace(/\[\]\([^)]*\)/g, '')
    // Fix spacing around headers
    .replace(/^(#{1,6})\s*$/gm, '')
    .replace(/([^\n])\n(#{1,6}\s)/g, '$1\n\n$2')
    // Remove ESRI-specific UI text that leaks through
    .replace(/Use dark colors for code blocks?Copy?/g, '')
    .replace(/Use dark colors for code block/g, '')
    // Remove feedback question at the end
    .replace(/Was this page helpful\?\s*YesNo\s*$/g, '')
    .replace(/Was this page helpful\?[\s\S]*$/g, '')
    // Clean up whitespace
    .trim();

  lines.push(content);

  return lines.join('\n');
}

/**
 * Extract category from URL path
 */
function getCategoryFromUrl(urlPath: string): string {
  // /rest/services-reference/enterprise/query-feature-service-layer/
  // -> feature-service or just enterprise
  const parts = urlPath.split('/').filter(Boolean);

  // Skip 'rest' and 'services-reference'
  if (parts.length >= 3 && parts[0] === 'rest' && parts[1] === 'services-reference') {
    // Check for nested paths first (routing, spatial-analysis, geoanalytics)
    if (parts.includes('routing')) return 'routing';
    if (parts.includes('spatial-analysis')) return 'spatial-analysis';
    if (parts.includes('geoanalytics')) return 'geoanalytics';

    // Group by service type based on the page name
    const pageName = parts[parts.length - 1] || parts[parts.length - 2];

    // Categorize by common patterns
    if (pageName.includes('feature-service') || pageName.includes('feature-layer'))
      return 'feature-service';
    if (pageName.includes('map-service')) return 'map-service';
    if (pageName.includes('image-service')) return 'image-service';
    if (pageName.includes('geometry') || pageName === 'buffer' || pageName === 'project' ||
        pageName === 'intersect' || pageName === 'union' || pageName === 'simplify' ||
        pageName === 'convex-hull' || pageName === 'distance' || pageName === 'areas-and-lengths')
      return 'geometry-service';
    if (pageName.includes('geocode') || pageName === 'suggest' || pageName === 'find-address-candidates' ||
        pageName === 'reverse-geocode' || pageName === 'batch-geocode' || pageName === 'analyze-geocode-input')
      return 'geocode-service';
    if (pageName.startsWith('gp-') || pageName === 'submit-gp-job' || pageName === 'execute-gp-task')
      return 'geoprocessing';
    if (pageName.includes('vector-tile')) return 'vector-tile-service';
    if (pageName.includes('scene-service') || pageName === 'layer-scene-service' ||
        pageName === 'feature-scene-service' || pageName === 'geometry-scene-service')
      return 'scene-service';
    if (pageName === 'uploads' || pageName === 'upload' || pageName === 'commit' ||
        pageName === 'register' || pageName === 'item' || pageName === 'parts')
      return 'uploads';
    if (
      pageName.includes('object') ||
      pageName.includes('symbol') ||
      pageName.includes('renderer') ||
      pageName.includes('domain')
    )
      return 'data-types';

    // Default to enterprise
    return parts[2] || 'enterprise';
  }

  return 'general';
}

/**
 * Get filename from URL path
 */
function getFilenameFromUrl(urlPath: string): string {
  const parts = urlPath.split('/').filter(Boolean);
  const pageName = parts[parts.length - 1] || parts[parts.length - 2] || 'index';
  return `${pageName}.md`;
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
 * Save markdown to file
 */
function saveMarkdown(urlPath: string, content: string): string {
  const category = getCategoryFromUrl(urlPath);
  const filename = getFilenameFromUrl(urlPath);

  const categoryDir = path.join(OUTPUT_DIR, category);
  ensureDir(categoryDir);

  const filepath = path.join(categoryDir, filename);
  fs.writeFileSync(filepath, content, 'utf-8');

  return filepath;
}

/**
 * Scrape a single page
 */
async function scrapePage(urlPath: string): Promise<{ success: boolean; filepath?: string }> {
  console.log(`Fetching: ${urlPath}`);

  try {
    const html = await fetchPage(urlPath);
    const markdown = htmlToMarkdown(html, urlPath);
    const filepath = saveMarkdown(urlPath, markdown);
    console.log(`  ✓ Saved: ${filepath}`);
    return { success: true, filepath };
  } catch (error) {
    console.error(`  ✗ Error:`, error instanceof Error ? error.message : error);
    return { success: false };
  }
}

/**
 * Parse items_to_scrape.md and extract all URLs
 */
function parseItemsToScrape(): string[] {
  const itemsFile = path.join(OUTPUT_DIR, 'items_to_scrape.md');

  if (!fs.existsSync(itemsFile)) {
    console.error(`Items file not found: ${itemsFile}`);
    return [];
  }

  const content = fs.readFileSync(itemsFile, 'utf-8');
  const urls: string[] = [];

  // Match markdown links like [Text](/rest/services-reference/...)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkPattern.exec(content)) !== null) {
    const url = match[2];
    if (url.startsWith('/rest/')) {
      urls.push(url);
    }
  }

  return urls;
}

/**
 * Priority pages most relevant for SAGE
 */
const PRIORITY_PAGES = [
  // Data Types (essential for understanding requests/responses)
  '/rest/services-reference/enterprise/geometry-objects/',
  '/rest/services-reference/enterprise/feature-object/',
  '/rest/services-reference/enterprise/featureset-object/',
  '/rest/services-reference/enterprise/symbol-objects/',
  '/rest/services-reference/enterprise/renderer-objects/',
  '/rest/services-reference/enterprise/domain-objects/',
  '/rest/services-reference/enterprise/layer/',

  // Feature Service (most commonly used)
  '/rest/services-reference/enterprise/feature-service/',
  '/rest/services-reference/enterprise/layer-feature-service/',
  '/rest/services-reference/enterprise/query-feature-service-layer/',
  '/rest/services-reference/enterprise/add-features/',
  '/rest/services-reference/enterprise/update-features/',
  '/rest/services-reference/enterprise/delete-features/',
  '/rest/services-reference/enterprise/apply-edits-feature-service-layer/',

  // Map Service (for rendering)
  '/rest/services-reference/enterprise/map-service/',
  '/rest/services-reference/enterprise/export-map/',
  '/rest/services-reference/enterprise/identify-map-service/',
  '/rest/services-reference/enterprise/query-map-service-layer/',

  // Geometry Service (for spatial operations)
  '/rest/services-reference/enterprise/geometry-service/',
  '/rest/services-reference/enterprise/buffer/',
  '/rest/services-reference/enterprise/project/',
  '/rest/services-reference/enterprise/intersect/',
  '/rest/services-reference/enterprise/union/',
  '/rest/services-reference/enterprise/areas-and-lengths/',
  '/rest/services-reference/enterprise/convex-hull/',
  '/rest/services-reference/enterprise/distance/',
  '/rest/services-reference/enterprise/simplify/',

  // Geocode Service
  '/rest/services-reference/enterprise/geocode-service/',
  '/rest/services-reference/enterprise/find-address-candidates/',
  '/rest/services-reference/enterprise/reverse-geocode/',
  '/rest/services-reference/enterprise/suggest/',

  // Geocoding Tools
  '/rest/services-reference/enterprise/analyze-geocode-input/',
  '/rest/services-reference/enterprise/batch-geocode/',
  '/rest/services-reference/enterprise/geocode-enterprise-table/',
  '/rest/services-reference/enterprise/geocode-file/',

  // Geoprocessing Service
  '/rest/services-reference/enterprise/gp-overview/',
  '/rest/services-reference/enterprise/gp-service/',
  '/rest/services-reference/enterprise/gp-task/',
  '/rest/services-reference/enterprise/gp-data-types/',
  '/rest/services-reference/enterprise/submit-gp-job/',
  '/rest/services-reference/enterprise/gp-job/',
  '/rest/services-reference/enterprise/execute-gp-task/',
  '/rest/services-reference/enterprise/gp-result/',

  // Routing Services
  '/rest/services-reference/enterprise/routing/routing-services/',
  '/rest/services-reference/enterprise/routing/route-service-direct/',
  '/rest/services-reference/enterprise/routing/serviceArea-service-direct/',
  '/rest/services-reference/enterprise/routing/closestFacility-service-direct/',
  '/rest/services-reference/enterprise/routing/travelCostMatrix-service-direct/',
  '/rest/services-reference/enterprise/routing/routing-data-types/',
  '/rest/services-reference/enterprise/network-service/',

  // Vector Tile Service
  '/rest/services-reference/enterprise/vector-tile-service/',
  '/rest/services-reference/enterprise/vector-tile/',
  '/rest/services-reference/enterprise/vector-tile-style/',
  '/rest/services-reference/enterprise/export-tiles-vector-tile-service/',

  // Scene Service
  '/rest/services-reference/enterprise/scene-service/',
  '/rest/services-reference/enterprise/layer-scene-service/',
  '/rest/services-reference/enterprise/feature-scene-service/',
  '/rest/services-reference/enterprise/geometry-scene-service/',

  // Spatial Analysis
  '/rest/services-reference/enterprise/spatial-analysis/overview/spatial-analysis-tools/',
  '/rest/services-reference/enterprise/spatial-analysis/tasks/tasks-overview/',
  '/rest/services-reference/enterprise/spatial-analysis/tasks/sa-create-buffers/',
  '/rest/services-reference/enterprise/spatial-analysis/tasks/sa-dissolve-boundaries/',
  '/rest/services-reference/enterprise/spatial-analysis/tasks/sa-find-hot-spots/',
  '/rest/services-reference/enterprise/spatial-analysis/tasks/enrich-layer/',
  '/rest/services-reference/enterprise/spatial-analysis/tasks/sa-overlay-layers/',
  '/rest/services-reference/enterprise/spatial-analysis/tasks/sa-summarize-within/',
  '/rest/services-reference/enterprise/spatial-analysis/tasks/create-drivetime/',
  '/rest/services-reference/enterprise/spatial-analysis/tasks/find-nearest/',
  '/rest/services-reference/enterprise/spatial-analysis/reference/feature-input-1/',
  '/rest/services-reference/enterprise/spatial-analysis/reference/feature-output-1/',

  // Uploads
  '/rest/services-reference/enterprise/uploads/',
  '/rest/services-reference/enterprise/upload/',
  '/rest/services-reference/enterprise/commit/',
  '/rest/services-reference/enterprise/register/',
  '/rest/services-reference/enterprise/item/',

  // Utilities (for printing/exporting)
  '/rest/services-reference/enterprise/export-web-map-task/',
  '/rest/services-reference/enterprise/exportwebmap-specification/',
  '/rest/services-reference/enterprise/get-layout-templates-info-task/',

  // Overview/Getting Started
  '/rest/services-reference/enterprise/get-started-with-the-services-directory/',
  '/rest/services-reference/enterprise/output-formats/',
  '/rest/services-reference/enterprise/using-spatial-references/',
];

async function main() {
  const args = process.argv.slice(2);

  ensureDir(OUTPUT_DIR);

  if (args.includes('--help')) {
    console.log(`
ESRI REST API Documentation Scraper

Usage:
  npx tsx scripts/scrape-esri-rest-api.ts [options]

Options:
  --url=<path>    Scrape a specific URL path
  --priority      Scrape priority pages for SAGE
  --all           Scrape all pages from items_to_scrape.md
  --help          Show this help

Examples:
  npx tsx scripts/scrape-esri-rest-api.ts --url=/rest/services-reference/enterprise/query-feature-service-layer/
  npx tsx scripts/scrape-esri-rest-api.ts --priority
  npx tsx scripts/scrape-esri-rest-api.ts --all
`);
    return;
  }

  // Single URL mode
  const urlArg = args.find((a) => a.startsWith('--url='));
  if (urlArg) {
    const urlPath = urlArg.split('=')[1];
    if (!urlPath) {
      console.error('Please specify a URL path');
      return;
    }
    await scrapePage(urlPath);
    return;
  }

  // Priority pages mode
  if (args.includes('--priority')) {
    console.log(`\nScraping ${PRIORITY_PAGES.length} priority pages...\n`);

    let success = 0;
    let failed = 0;

    for (const urlPath of PRIORITY_PAGES) {
      const result = await scrapePage(urlPath);
      if (result.success) success++;
      else failed++;
      await sleep(DELAY_MS);
    }

    console.log(`\nDone! ${success} succeeded, ${failed} failed.`);
    return;
  }

  // All pages mode
  if (args.includes('--all')) {
    const urls = parseItemsToScrape();
    console.log(`\nFound ${urls.length} URLs in items_to_scrape.md\n`);

    if (urls.length === 0) {
      console.error('No URLs found to scrape');
      return;
    }

    let success = 0;
    let failed = 0;

    for (const urlPath of urls) {
      const result = await scrapePage(urlPath);
      if (result.success) success++;
      else failed++;
      await sleep(DELAY_MS);
    }

    console.log(`\nDone! ${success} succeeded, ${failed} failed.`);
    return;
  }

  console.log('No action specified. Use --help for usage info.');
}

main().catch(console.error);
