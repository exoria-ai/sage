#!/usr/bin/env npx ts-node
/**
 * ESRI ArcGIS JS SDK Documentation Scraper
 *
 * Scrapes the ArcGIS Maps SDK for JavaScript API reference
 * and converts each page to markdown for LLM consumption.
 *
 * Usage:
 *   npx ts-node scripts/scrape-esri-docs.ts [--module=esri-layers-FeatureLayer] [--priority]
 */

import { load, type CheerioAPI } from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://developers.arcgis.com/javascript/latest/api-reference/';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'esri-js-sdk');

// Rate limiting
const DELAY_MS = 500;
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface DocPage {
  url: string;
  module: string;
  category: string;
}

/**
 * Fetch a page and extract its HTML content
 */
async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; SAGE-DocScraper/1.0)',
      'Accept': 'text/html,application/xhtml+xml'
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
function htmlToMarkdown(html: string, module: string): string {
  const $ = load(html);

  const lines: string[] = [];

  // Title
  const title = $('h1').first().text().trim() || module;
  lines.push(`# ${title}`);
  lines.push('');

  // Module path
  const modulePath = module.replace(/^esri-/, '').replace(/-/g, '/');
  lines.push(`**Module:** \`@arcgis/core/${modulePath}\``);
  lines.push('');

  // Since version
  const sinceText = $('span:contains("Since:")').parent().text();
  if (sinceText) {
    const versionMatch = sinceText.match(/Since:\s*([\d.]+)/);
    if (versionMatch) {
      lines.push(`**Since:** ${versionMatch[1]}`);
      lines.push('');
    }
  }

  // Description/Overview - look for main content description
  const overview = $('.lead, .class-description, article > p').first();
  if (overview.length) {
    lines.push('## Overview');
    lines.push('');
    lines.push(cleanText(overview.text()));
    lines.push('');
  }

  // Inheritance - look for "extends" info
  const extendsInfo = $('a[href*="Accessor"], .extends').first();
  if (extendsInfo.length) {
    lines.push('## Inheritance');
    lines.push('');
    lines.push(`Extends: ${cleanText(extendsInfo.text())}`);
    lines.push('');
  }

  // Properties
  const propsSection = extractPropertiesSection($);
  if (propsSection) {
    lines.push('## Properties');
    lines.push('');
    lines.push(propsSection);
    lines.push('');
  }

  // Methods
  const methodsSection = extractMethodsSection($);
  if (methodsSection) {
    lines.push('## Methods');
    lines.push('');
    lines.push(methodsSection);
    lines.push('');
  }

  // Events
  const eventsSection = extractEventsSection($);
  if (eventsSection) {
    lines.push('## Events');
    lines.push('');
    lines.push(eventsSection);
    lines.push('');
  }

  // Code examples
  const examples = extractCodeExamples($);
  if (examples) {
    lines.push('## Examples');
    lines.push('');
    lines.push(examples);
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Extract properties section
 */
function extractPropertiesSection($: CheerioAPI): string | null {
  const items: string[] = [];

  // Look for property overview table
  $('h2:contains("Property Overview")').nextAll('table').first().find('tr').each((i, row) => {
    if (i === 0) return; // Skip header row

    const $row = $(row);
    const cells = $row.find('td');
    if (cells.length >= 2) {
      const name = cells.eq(0).text().trim();
      const type = cells.eq(1).text().trim();
      const desc = cells.length > 2 ? cells.eq(2).text().trim() : '';

      if (name && !name.includes('Property Overview')) {
        items.push(`### \`${name}\``);
        if (type) items.push(`- **Type:** \`${type.split('\n')[0]}\``);
        if (desc) items.push(`- ${cleanText(desc).substring(0, 200)}`);
        items.push('');
      }
    }
  });

  // Also check for detailed property definitions
  $('h3[id]').each((_, el) => {
    const $el = $(el);
    const id = $el.attr('id') || '';

    // Skip if not a property (methods have () in them usually)
    if (id.includes('(') || id.includes('event-')) return;

    const name = $el.text().trim();
    const nextP = $el.nextAll('p').first().text().trim();
    const typeEl = $el.nextAll('.type, [class*="type"]').first().text().trim();

    // Only add if we don't already have this property
    if (name && !items.some(item => item.includes(`\`${name}\``))) {
      items.push(`### \`${name}\``);
      if (typeEl) items.push(`- **Type:** \`${typeEl}\``);
      if (nextP) items.push(`- ${cleanText(nextP).substring(0, 300)}`);
      items.push('');
    }
  });

  return items.length > 0 ? items.join('\n') : null;
}

/**
 * Extract methods section
 */
function extractMethodsSection($: CheerioAPI): string | null {
  const items: string[] = [];

  // Look for method overview table
  $('h2:contains("Method Overview")').nextAll('table').first().find('tr').each((i, row) => {
    if (i === 0) return; // Skip header row

    const $row = $(row);
    const cells = $row.find('td');
    if (cells.length >= 2) {
      const name = cells.eq(0).text().trim();
      const returnType = cells.eq(1).text().trim();
      const desc = cells.length > 2 ? cells.eq(2).text().trim() : '';

      if (name && !name.includes('Method Overview')) {
        items.push(`### \`${name}()\``);
        if (returnType) items.push(`- **Returns:** \`${returnType.split('\n')[0]}\``);
        if (desc) items.push(`- ${cleanText(desc).substring(0, 200)}`);
        items.push('');
      }
    }
  });

  return items.length > 0 ? items.join('\n') : null;
}

/**
 * Extract events section
 */
function extractEventsSection($: CheerioAPI): string | null {
  const items: string[] = [];

  // Look for event overview table
  $('h2:contains("Event Overview")').nextAll('table').first().find('tr').each((i, row) => {
    if (i === 0) return; // Skip header row

    const $row = $(row);
    const cells = $row.find('td');
    if (cells.length >= 1) {
      const name = cells.eq(0).text().trim();
      const desc = cells.length > 1 ? cells.eq(1).text().trim() : '';

      if (name && !name.includes('Event Overview')) {
        items.push(`### \`${name}\``);
        if (desc) items.push(`- ${cleanText(desc).substring(0, 200)}`);
        items.push('');
      }
    }
  });

  return items.length > 0 ? items.join('\n') : null;
}

/**
 * Extract code examples from the page
 */
function extractCodeExamples($: CheerioAPI): string | null {
  const examples: string[] = [];

  $('pre code, .snippet code').each((i, el) => {
    if (i > 5) return; // Limit to first 6 examples

    const code = $(el).text().trim();
    if (code && code.length > 30 && code.length < 2000) {
      // Detect language
      const parent = $(el).parent();
      const lang = parent.attr('class')?.match(/language-(\w+)/)?.[1] || 'javascript';

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
 * Save markdown to file
 */
function saveMarkdown(module: string, content: string, category: string): void {
  const categoryDir = path.join(OUTPUT_DIR, category);
  ensureDir(categoryDir);

  const filename = `${module}.md`;
  const filepath = path.join(categoryDir, filename);

  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`Saved: ${filepath}`);
}

/**
 * Main scraper function
 */
async function scrapeModule(page: DocPage): Promise<void> {
  console.log(`Fetching: ${page.module}`);

  try {
    const html = await fetchPage(page.url);
    const markdown = htmlToMarkdown(html, page.module);
    saveMarkdown(page.module, markdown, page.category);
  } catch (error) {
    console.error(`Error scraping ${page.module}:`, error);
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
  npx ts-node scripts/scrape-esri-docs.ts [options]

Options:
  --module=<name>   Scrape a specific module (e.g., esri-layers-FeatureLayer)
  --priority        Scrape priority modules for SAGE
  --help            Show this help

Examples:
  npx ts-node scripts/scrape-esri-docs.ts --module=esri-layers-FeatureLayer
  npx ts-node scripts/scrape-esri-docs.ts --priority
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

    for (const module of PRIORITY_MODULES) {
      const url = `${BASE_URL}${module}.html`;
      // Determine category from module name
      const parts = module.split('-');
      const category = parts.length > 1 ? parts[1] : 'core';
      await scrapeModule({ url, module, category });
      await sleep(DELAY_MS);
    }

    console.log('\nDone! Scraped priority modules.');
    return;
  }

  console.log('No action specified. Use --help for usage info.');
}

main().catch(console.error);
