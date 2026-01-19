#!/usr/bin/env node
/**
 * ESRI ArcGIS JS SDK Documentation Scraper
 *
 * Scrapes the ArcGIS Maps SDK for JavaScript API reference
 * and converts each page to markdown for LLM consumption.
 *
 * Usage:
 *   node scripts/scrape-esri-docs.js [--module=esri-layers-FeatureLayer] [--priority]
 */

const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://developers.arcgis.com/javascript/latest/api-reference/';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'esri-js-sdk');

// Rate limiting
const DELAY_MS = 1000;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch a page and extract its HTML content
 */
async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

/**
 * Convert ESRI documentation HTML to markdown
 */
function htmlToMarkdown(html, module) {
  const $ = cheerio.load(html);

  const lines = [];

  // Title
  const title = $('h1').first().text().trim() || module;
  lines.push(`# ${title}`);
  lines.push('');

  // Module path
  const modulePath = module.replace(/^esri-/, '').replace(/-/g, '/');
  lines.push(`**Module:** \`@arcgis/core/${modulePath}\``);
  lines.push('');

  // Find "Since" version
  $('*').each((_, el) => {
    const text = $(el).text();
    if (text.includes('Since:')) {
      const match = text.match(/Since:\s*([\d.]+)/);
      if (match) {
        lines.push(`**Since:** ${match[1]}`);
        lines.push('');
        return false; // break
      }
    }
  });

  // Get main article content - try different selectors
  let mainContent = $('article').first();
  if (!mainContent.length) {
    mainContent = $('main').first();
  }
  if (!mainContent.length) {
    mainContent = $('body');
  }

  // Extract overview/description (first major paragraph)
  const firstP = mainContent.find('p').first();
  if (firstP.length && firstP.text().length > 50) {
    lines.push('## Overview');
    lines.push('');
    lines.push(cleanText(firstP.text()));
    lines.push('');
  }

  // Look for subheadings to find sections
  const seenSections = new Set();

  mainContent.find('h2, h3').each((_, heading) => {
    const $heading = $(heading);
    const headingText = $heading.text().trim();

    // Skip duplicates
    if (seenSections.has(headingText)) return;
    seenSections.add(headingText);

    // Get content after this heading until next heading
    let content = '';
    let next = $heading.next();
    let count = 0;

    while (next.length && count < 20 && !next.is('h2, h3')) {
      const tagName = next.prop('tagName')?.toLowerCase();

      if (tagName === 'table') {
        // Extract table as markdown
        content += extractTableAsMarkdown($, next);
      } else if (tagName === 'pre') {
        const code = next.find('code').text().trim() || next.text().trim();
        if (code) {
          content += '\n```javascript\n' + code + '\n```\n';
        }
      } else if (tagName === 'ul' || tagName === 'ol') {
        next.find('li').each((_, li) => {
          content += `- ${cleanText($(li).text())}\n`;
        });
      } else {
        const text = cleanText(next.text());
        if (text && text.length > 10) {
          content += text + '\n\n';
        }
      }

      next = next.next();
      count++;
    }

    // Only add section if it has content
    if (content.trim()) {
      const level = $heading.is('h2') ? '##' : '###';
      lines.push(`${level} ${headingText}`);
      lines.push('');
      lines.push(content.trim());
      lines.push('');
    }
  });

  // Extract all code examples
  const examples = [];
  $('pre code').each((i, el) => {
    if (i > 8) return; // Limit examples

    const code = $(el).text().trim();
    if (code && code.length > 30 && code.length < 3000) {
      examples.push(code);
    }
  });

  if (examples.length > 0) {
    lines.push('## Code Examples');
    lines.push('');
    examples.forEach((code, i) => {
      lines.push(`### Example ${i + 1}`);
      lines.push('');
      lines.push('```javascript');
      lines.push(code);
      lines.push('```');
      lines.push('');
    });
  }

  return lines.join('\n');
}

/**
 * Extract HTML table as markdown
 */
function extractTableAsMarkdown($, table) {
  const rows = [];

  $(table).find('tr').each((i, row) => {
    const cells = [];
    $(row).find('th, td').each((_, cell) => {
      cells.push(cleanText($(cell).text()).substring(0, 100));
    });
    if (cells.length > 0) {
      rows.push(cells);
    }
  });

  if (rows.length === 0) return '';

  let md = '\n';

  // Header row
  if (rows.length > 0) {
    md += '| ' + rows[0].join(' | ') + ' |\n';
    md += '| ' + rows[0].map(() => '---').join(' | ') + ' |\n';
  }

  // Data rows
  for (let i = 1; i < rows.length && i < 50; i++) {
    md += '| ' + rows[i].join(' | ') + ' |\n';
  }

  return md + '\n';
}

/**
 * Clean text for markdown output
 */
function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
}

/**
 * Ensure output directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Save markdown to file
 */
function saveMarkdown(module, content, category) {
  const categoryDir = path.join(OUTPUT_DIR, category);
  ensureDir(categoryDir);

  const filename = `${module}.md`;
  const filepath = path.join(categoryDir, filename);

  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`Saved: ${filepath} (${content.length} bytes)`);
}

/**
 * Main scraper function
 */
async function scrapeModule(page) {
  console.log(`Fetching: ${page.module}`);

  try {
    const html = await fetchPage(page.url);
    const markdown = htmlToMarkdown(html, page.module);
    saveMarkdown(page.module, markdown, page.category);
    return true;
  } catch (error) {
    console.error(`Error scraping ${page.module}:`, error.message);
    return false;
  }
}

/**
 * Scrape specific modules relevant to SAGE
 */
const PRIORITY_MODULES = [
  // Core
  'esri-Map',
  'esri-WebMap',
  'esri-Graphic',
  'esri-PopupTemplate',
  'esri-Color',
  'esri-config',

  // Views
  'esri-views-MapView',
  'esri-views-View',

  // Layers
  'esri-layers-FeatureLayer',
  'esri-layers-GraphicsLayer',
  'esri-layers-TileLayer',
  'esri-layers-VectorTileLayer',
  'esri-layers-MapImageLayer',
  'esri-layers-GeoJSONLayer',
  'esri-layers-Layer',
  'esri-layers-support-Field',
  'esri-layers-support-LabelClass',
  'esri-layers-support-FeatureFilter',
  'esri-layers-support-FeatureEffect',

  // Geometry
  'esri-geometry-Point',
  'esri-geometry-Polygon',
  'esri-geometry-Polyline',
  'esri-geometry-Extent',
  'esri-geometry-Geometry',
  'esri-geometry-SpatialReference',
  'esri-geometry-geometryEngine',

  // Symbols
  'esri-symbols-SimpleFillSymbol',
  'esri-symbols-SimpleLineSymbol',
  'esri-symbols-SimpleMarkerSymbol',
  'esri-symbols-TextSymbol',
  'esri-symbols-PictureMarkerSymbol',
  'esri-symbols-Symbol',

  // Renderers
  'esri-renderers-SimpleRenderer',
  'esri-renderers-UniqueValueRenderer',
  'esri-renderers-ClassBreaksRenderer',
  'esri-renderers-Renderer',
  'esri-renderers-support-UniqueValueInfo',
  'esri-renderers-support-ClassBreakInfo',

  // Popup
  'esri-popup-content-FieldsContent',
  'esri-popup-content-TextContent',
  'esri-popup-content-MediaContent',
  'esri-popup-FieldInfo',

  // Widgets
  'esri-widgets-Legend',
  'esri-widgets-LayerList',
  'esri-widgets-Search',
  'esri-widgets-Popup',
  'esri-widgets-Sketch',
  'esri-widgets-BasemapGallery',
  'esri-widgets-Zoom',
  'esri-widgets-Home',

  // REST/Query
  'esri-rest-support-Query',
  'esri-rest-support-FeatureSet',
  'esri-rest-query',

  // Portal
  'esri-portal-Portal',
  'esri-portal-PortalItem',
];

async function main() {
  const args = process.argv.slice(2);

  ensureDir(OUTPUT_DIR);

  if (args.includes('--help')) {
    console.log(`
ESRI Documentation Scraper

Usage:
  node scripts/scrape-esri-docs.js [options]

Options:
  --module=<name>   Scrape a specific module (e.g., esri-layers-FeatureLayer)
  --priority        Scrape priority modules for SAGE
  --help            Show this help

Examples:
  node scripts/scrape-esri-docs.js --module=esri-layers-FeatureLayer
  node scripts/scrape-esri-docs.js --priority
`);
    return;
  }

  // Single module mode
  const moduleArg = args.find(a => a.startsWith('--module='));
  if (moduleArg) {
    const module = moduleArg.split('=')[1];
    if (!module) {
      console.error('Please specify a module name');
      return;
    }
    const url = `${BASE_URL}${module}.html`;
    await scrapeModule({ url, module, category: 'manual' });
    return;
  }

  // Priority modules mode
  if (args.includes('--priority')) {
    console.log(`Scraping ${PRIORITY_MODULES.length} priority modules...`);

    let success = 0;
    let failed = 0;

    for (const module of PRIORITY_MODULES) {
      const url = `${BASE_URL}${module}.html`;
      // Determine category from module name
      const parts = module.split('-');
      const category = parts.length > 1 ? parts[1] : 'core';

      const result = await scrapeModule({ url, module, category });
      if (result) {
        success++;
      } else {
        failed++;
      }

      await sleep(DELAY_MS);
    }

    console.log(`\nDone! Scraped ${success} modules, ${failed} failed.`);
    return;
  }

  console.log('No action specified. Use --help for usage info.');
}

main().catch(console.error);
