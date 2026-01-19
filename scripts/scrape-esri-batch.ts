#!/usr/bin/env npx ts-node
/**
 * ESRI ArcGIS JS SDK Batch Documentation Scraper
 *
 * Scrapes all URLs from items_to_scrape.md and converts each page to markdown.
 * Handles nested modules with proper categorization.
 *
 * Usage:
 *   npx ts-node scripts/scrape-esri-batch.ts [--dry-run] [--skip-existing] [--limit=N] [--start=N]
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { load } from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://developers.arcgis.com/javascript/latest/api-reference/';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'esri-js-sdk');
const ITEMS_FILE = path.join(OUTPUT_DIR, 'items_to_scrape.md');

// Rate limiting - be respectful to ESRI servers
const DELAY_MS = 750;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface DocPage {
  url: string;
  module: string;
  category: string;
}

/**
 * Parse module name into folder path
 * Examples:
 *   esri-Map -> core/Map.md
 *   esri-layers-FeatureLayer -> layers/FeatureLayer.md
 *   esri-layers-support-Field -> layers/support/Field.md
 *   esri-rest-knowledgeGraph-Entity -> rest/knowledgeGraph/Entity.md
 *   esri-geometry-operators-bufferOperator -> geometry/operators/bufferOperator.md
 */
function moduleToPath(module: string): { folder: string; filename: string } {
  // Remove 'esri-' prefix
  const withoutPrefix = module.replace(/^esri-/, '');
  const parts = withoutPrefix.split('-');

  if (parts.length === 1) {
    // e.g., esri-Map -> core/Map.md
    return { folder: 'core', filename: parts[0] ?? 'unknown' };
  }

  // Last part is the class/module name, rest is folder path
  const filename = parts[parts.length - 1] ?? 'unknown';
  const folder = parts.slice(0, -1).join('/');

  return { folder, filename };
}

/**
 * Extract all URLs from items_to_scrape.md
 */
function extractUrlsFromItemsFile(): DocPage[] {
  const content = fs.readFileSync(ITEMS_FILE, 'utf-8');
  const urlPattern = /\(\/javascript\/latest\/api-reference\/([^)]+\.html)\)/g;
  const pages: DocPage[] = [];
  const seen = new Set<string>();

  let match;
  while ((match = urlPattern.exec(content)) !== null) {
    const htmlFilename = match[1];
    if (!htmlFilename) continue;

    const module = htmlFilename.replace('.html', ''); // e.g., esri-layers-FeatureLayer

    if (seen.has(module)) continue;
    seen.add(module);

    const { folder } = moduleToPath(module);

    pages.push({
      url: `${BASE_URL}${htmlFilename}`,
      module,
      category: folder,
    });
  }

  return pages;
}

/**
 * Fetch a page with retry logic
 */
async function fetchPage(url: string, retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SAGE-DocScraper/1.0)',
          Accept: 'text/html,application/xhtml+xml',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response.text();
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`  Retry ${attempt}/${retries} for ${url}`);
      await sleep(1000 * attempt);
    }
  }
  throw new Error('Unreachable');
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

  // Import statements - look for ESM/AMD/CDN patterns
  const imports = extractImportStatements($, modulePath);
  if (imports) {
    lines.push('## Import');
    lines.push('');
    lines.push(imports);
    lines.push('');
  }

  // Since version - multiple patterns
  const sinceVersion = extractSinceVersion($);
  if (sinceVersion) {
    lines.push(`**Since:** ${sinceVersion}`);
    lines.push('');
  }

  // Description/Overview - get all paragraphs before first h2
  const overview = extractOverview($);
  if (overview) {
    lines.push('## Overview');
    lines.push('');
    lines.push(overview);
    lines.push('');
  }

  // Inheritance/Subclasses
  const inheritance = extractInheritance($);
  if (inheritance) {
    lines.push('## Inheritance');
    lines.push('');
    lines.push(inheritance);
    lines.push('');
  }

  // See Also links
  const seeAlso = extractSeeAlso($);
  if (seeAlso) {
    lines.push('## See Also');
    lines.push('');
    lines.push(seeAlso);
    lines.push('');
  }

  // Constructors
  const constructors = extractConstructors($);
  if (constructors) {
    lines.push('## Constructors');
    lines.push('');
    lines.push(constructors);
    lines.push('');
  }

  // Property Overview Table
  const propsOverview = extractPropertyOverview($);
  if (propsOverview) {
    lines.push('## Property Overview');
    lines.push('');
    lines.push(propsOverview);
    lines.push('');
  }

  // Property Details
  const propsSection = extractPropertiesSection($);
  if (propsSection) {
    lines.push('## Property Details');
    lines.push('');
    lines.push(propsSection);
    lines.push('');
  }

  // Method Overview Table
  const methodsOverview = extractMethodOverview($);
  if (methodsOverview) {
    lines.push('## Method Overview');
    lines.push('');
    lines.push(methodsOverview);
    lines.push('');
  }

  // Method Details
  const methodsSection = extractMethodsSection($);
  if (methodsSection) {
    lines.push('## Method Details');
    lines.push('');
    lines.push(methodsSection);
    lines.push('');
  }

  // Event Overview
  const eventsOverview = extractEventOverview($);
  if (eventsOverview) {
    lines.push('## Event Overview');
    lines.push('');
    lines.push(eventsOverview);
    lines.push('');
  }

  // Event Details
  const eventsSection = extractEventsSection($);
  if (eventsSection) {
    lines.push('## Event Details');
    lines.push('');
    lines.push(eventsSection);
    lines.push('');
  }

  // Type Definitions (for TypeScript)
  const typeDefs = extractTypeDefinitions($);
  if (typeDefs) {
    lines.push('## Type Definitions');
    lines.push('');
    lines.push(typeDefs);
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
 * Extract import statements (ESM, AMD, CDN)
 * Only capture actual import statements, not full code examples
 */
function extractImportStatements($: any, modulePath: string): string | null {
  const imports: string[] = [];
  const seenImports = new Set<string>();

  // Look for code elements containing import patterns
  $('code').each((_: number, el: any) => {
    const text = $(el).text().trim();

    // Skip if this is a long code block (likely an example, not just an import)
    // Import statements should be short - typically under 150 chars for a single import
    // or under 300 chars for a multi-line import with a few modules
    if (text.length > 400) return;

    // ESM import - must start with "import" and be relatively short
    if (text.startsWith('import ') && text.includes('@arcgis/core')) {
      // Extract just the import line(s), not any following code
      const lines = text.split('\n');
      const importLines: string[] = [];
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('import ') || trimmed.startsWith('from ') ||
            (importLines.length > 0 && (trimmed.endsWith(',') || trimmed.includes('} from')))) {
          importLines.push(line);
        } else if (importLines.length > 0) {
          // Stop once we hit non-import code
          break;
        }
      }
      if (importLines.length > 0) {
        const importText = importLines.join('\n');
        if (!seenImports.has(importText)) {
          seenImports.add(importText);
          imports.push(`\`\`\`javascript\n${importText}\n\`\`\``);
        }
      }
    }
    // CDN import - only capture the actual $arcgis.import call, not example code that follows
    else if (text.includes('$arcgis.import')) {
      const lines = text.split('\n');
      const importLines: string[] = [];
      let foundImport = false;
      let parenDepth = 0;

      for (const line of lines) {
        const trimmed = line.trim();

        // Start capturing when we see $arcgis.import
        if (trimmed.includes('$arcgis.import')) {
          foundImport = true;
        }

        if (foundImport) {
          importLines.push(line);
          // Track parentheses to know when the import statement ends
          parenDepth += (line.match(/\(/g) || []).length;
          parenDepth -= (line.match(/\)/g) || []).length;

          // If we've closed all parens and the line ends with ; we're done
          if (parenDepth <= 0 && trimmed.endsWith(';')) {
            break;
          }
        }
      }

      if (importLines.length > 0 && importLines.length < 15) {
        const importText = importLines.join('\n');
        if (!seenImports.has(importText)) {
          seenImports.add(importText);
          imports.push(`\`\`\`javascript\n// CDN\n${importText}\n\`\`\``);
        }
      }
    }
    // AMD require - must start with require or be a simple require call
    else if (text.includes('require(') && text.includes('esri/') && text.length < 300) {
      if (!seenImports.has(text)) {
        seenImports.add(text);
        imports.push(`\`\`\`javascript\n// AMD\n${text}\n\`\`\``);
      }
    }
  });

  // If no imports found, generate default ESM import
  if (imports.length === 0) {
    const className = modulePath.split('/').pop() || 'Module';
    imports.push(`\`\`\`javascript\nimport ${className} from "@arcgis/core/${modulePath}.js";\n\`\`\``);
  }

  return imports.length > 0 ? imports.slice(0, 3).join('\n\n') : null;
}

/**
 * Extract Since version with multiple fallback patterns
 */
function extractSinceVersion($: any): string | null {
  // Pattern 1: span with "Since:"
  const sinceSpan = $('span:contains("Since:")').first();
  if (sinceSpan.length) {
    const match = sinceSpan.parent().text().match(/Since:\s*(?:ArcGIS (?:Maps SDK for JavaScript|API for JavaScript)\s*)?([\d.]+)/i);
    if (match) return match[1];
  }

  // Pattern 2: Look in meta or data attributes
  const sinceAttr = $('[data-since], .since').first();
  if (sinceAttr.length) {
    return sinceAttr.attr('data-since') || sinceAttr.text().replace(/Since:?\s*/i, '').trim();
  }

  // Pattern 3: Search in page text
  const pageText = $('body').text();
  const match = pageText.match(/Since:?\s*(?:ArcGIS (?:Maps SDK|API) for JavaScript\s*)?(4\.\d+)/i);
  if (match) return match[1];

  return null;
}

/**
 * Extract overview/description from multiple sources
 */
function extractOverview($: any): string | null {
  const paragraphs: string[] = [];

  // Get the main content area
  const mainContent = $('article, .content, main, #content').first();
  const contentArea = mainContent.length ? mainContent : $('body');

  // Get description paragraphs - text before first major section
  contentArea.find('> p, > div > p').each((_: number, el: any): void => {
    const $p = $(el);
    // Stop at common section markers
    if ($p.prevAll('h2').length > 0) return;

    const text = cleanText($p.text());
    if (text && text.length > 20 && !text.startsWith('ESM:') && !text.startsWith('AMD:') && !text.startsWith('CDN:')) {
      paragraphs.push(text);
    }
  });

  // Also check for class-description or module-description
  const descClass = $('.class-description, .module-description, .lead').first();
  if (descClass.length && paragraphs.length === 0) {
    paragraphs.push(cleanText(descClass.text()));
  }

  return paragraphs.length > 0 ? paragraphs.join('\n\n') : null;
}

/**
 * Extract inheritance chain and subclasses
 */
function extractInheritance($: any): string | null {
  const lines: string[] = [];

  // Look for "Inheritance" section
  const inheritanceHeader = $('h2:contains("Inheritance"), h3:contains("Inheritance")').first();
  if (inheritanceHeader.length) {
    const inheritanceList = inheritanceHeader.nextAll('ul, ol').first();
    if (inheritanceList.length) {
      inheritanceList.find('li').each((_: number, el: any) => {
        lines.push(`- ${cleanText($(el).text())}`);
      });
    }
  }

  // Look for "extends" in class signature
  const extendsMatch = $('body').text().match(/extends\s+(\w+)/);
  if (extendsMatch && lines.length === 0) {
    lines.push(`Extends: **${extendsMatch[1]}**`);
  }

  // Subclasses
  const subclassHeader = $('h2:contains("Subclass"), h3:contains("Subclass")').first();
  if (subclassHeader.length) {
    lines.push('');
    lines.push('**Subclasses:**');
    subclassHeader.nextAll('ul').first().find('li').each((_: number, el: any) => {
      lines.push(`- ${cleanText($(el).text())}`);
    });
  }

  return lines.length > 0 ? lines.join('\n') : null;
}

/**
 * Extract See Also links
 * ESRI uses: <dt class="tag-see">See also</dt><dd class="tag-see"><ul>...</ul></dd>
 */
function extractSeeAlso($: any): string | null {
  const links: string[] = [];

  // Primary pattern: ESRI uses dt.tag-see for "See also" header
  $('dt.tag-see, dt.tag-see-internal-header').each((_: number, dt: any) => {
    const $dt = $(dt);
    // Get the following dd which contains the ul
    const $dd = $dt.next('dd.tag-see');
    if ($dd.length) {
      $dd.find('ul li').each((_2: number, li: any) => {
        const $li = $(li);
        const link = $li.find('a').first();
        if (link.length) {
          const text = cleanText(link.text());
          if (text) {
            links.push(`- ${text}`);
          }
        } else {
          const text = cleanText($li.text());
          if (text) links.push(`- ${text}`);
        }
      });
    }
  });

  // Fallback: Look for h2/h3 "See also" headers
  if (links.length === 0) {
    $('h2:contains("See also"), h2:contains("See Also"), h3:contains("See also")').each((_: number, header: any) => {
      $(header).nextAll('ul').first().find('li').each((_2: number, li: any) => {
        const $li = $(li);
        const link = $li.find('a').first();
        if (link.length) {
          const text = cleanText(link.text());
          if (text) links.push(`- ${text}`);
        } else {
          const text = cleanText($li.text());
          if (text) links.push(`- ${text}`);
        }
      });
    });
  }

  return links.length > 0 ? links.join('\n') : null;
}

/**
 * Extract constructor information
 */
function extractConstructors($: any): string | null {
  const lines: string[] = [];

  $('h2:contains("Constructor"), h3:contains("Constructor")').each((_: number, header: any) => {
    const $header = $(header);

    // Get constructor signature
    const signature = $header.nextAll('pre, code').first().text().trim();
    if (signature) {
      lines.push('```javascript');
      lines.push(signature);
      lines.push('```');
    }

    // Get parameters table
    const paramsTable = $header.nextAll('table').first();
    if (paramsTable.length) {
      lines.push('');
      lines.push('**Parameters:**');
      lines.push('');
      lines.push('| Name | Type | Description |');
      lines.push('|------|------|-------------|');
      paramsTable.find('tr').each((i: number, row: any) => {
        if (i === 0) return; // Skip header
        const cells = $(row).find('td');
        if (cells.length >= 2) {
          const name = cleanText(cells.eq(0).text());
          const type = cleanText(cells.eq(1).text()).split('\n')[0];
          const desc = cells.length > 2 ? cleanText(cells.eq(2).text()).substring(0, 100) : '';
          lines.push(`| ${name} | \`${type}\` | ${desc} |`);
        }
      });
    }
  });

  return lines.length > 0 ? lines.join('\n') : null;
}

/**
 * Extract Property Overview table
 */
function extractPropertyOverview($: any): string | null {
  const rows: string[] = [];

  $('h2:contains("Property Overview")').each((_: number, header: any) => {
    const table = $(header).nextAll('table').first();
    if (!table.length) return;

    rows.push('| Name | Type | Summary |');
    rows.push('|------|------|---------|');

    table.find('tr').each((i: number, row: any) => {
      if (i === 0) return; // Skip header row
      const cells = $(row).find('td');
      if (cells.length >= 1) {
        const name = cleanText(cells.eq(0).text());
        const type = cells.length > 1 ? cleanText(cells.eq(1).text()).split('\n')[0] : '';
        const summary = cells.length > 2 ? cleanText(cells.eq(2).text()).substring(0, 80) : '';
        if (name && !name.includes('Property Overview')) {
          rows.push(`| \`${name}\` | \`${type}\` | ${summary} |`);
        }
      }
    });
  });

  return rows.length > 2 ? rows.join('\n') : null;
}

/**
 * Extract Method Overview table
 */
function extractMethodOverview($: any): string | null {
  const rows: string[] = [];

  $('h2:contains("Method Overview")').each((_: number, header: any) => {
    const table = $(header).nextAll('table').first();
    if (!table.length) return;

    rows.push('| Name | Return Type | Summary |');
    rows.push('|------|-------------|---------|');

    table.find('tr').each((i: number, row: any) => {
      if (i === 0) return;
      const cells = $(row).find('td');
      if (cells.length >= 1) {
        const name = cleanText(cells.eq(0).text());
        const returnType = cells.length > 1 ? cleanText(cells.eq(1).text()).split('\n')[0] : 'void';
        const summary = cells.length > 2 ? cleanText(cells.eq(2).text()).substring(0, 80) : '';
        if (name && !name.includes('Method Overview')) {
          rows.push(`| \`${name}()\` | \`${returnType}\` | ${summary} |`);
        }
      }
    });
  });

  return rows.length > 2 ? rows.join('\n') : null;
}

/**
 * Extract Event Overview table
 */
function extractEventOverview($: any): string | null {
  const rows: string[] = [];

  $('h2:contains("Event Overview")').each((_: number, header: any) => {
    const table = $(header).nextAll('table').first();
    if (!table.length) return;

    rows.push('| Name | Summary |');
    rows.push('|------|---------|');

    table.find('tr').each((i: number, row: any) => {
      if (i === 0) return;
      const cells = $(row).find('td');
      if (cells.length >= 1) {
        const name = cleanText(cells.eq(0).text());
        const summary = cells.length > 1 ? cleanText(cells.eq(1).text()).substring(0, 100) : '';
        if (name && !name.includes('Event Overview')) {
          rows.push(`| \`${name}\` | ${summary} |`);
        }
      }
    });
  });

  return rows.length > 2 ? rows.join('\n') : null;
}

/**
 * Extract Type Definitions
 */
function extractTypeDefinitions($: any): string | null {
  const types: string[] = [];

  $('h2:contains("Type Definitions"), h3:contains("Type Definitions")').each((_: number, header: any) => {
    $(header).nextAll('h4, h5').each((_2: number, typeHeader: any) => {
      const $th = $(typeHeader);
      const typeName = cleanText($th.text());
      if (!typeName) return;

      types.push(`### ${typeName}`);

      // Get type properties/fields
      const propsTable = $th.nextAll('table').first();
      if (propsTable.length) {
        types.push('');
        types.push('| Property | Type | Description |');
        types.push('|----------|------|-------------|');
        propsTable.find('tr').each((i: number, row: any) => {
          if (i === 0) return;
          const cells = $(row).find('td');
          if (cells.length >= 2) {
            const prop = cleanText(cells.eq(0).text());
            const propType = cleanText(cells.eq(1).text()).split('\n')[0];
            const desc = cells.length > 2 ? cleanText(cells.eq(2).text()).substring(0, 80) : '';
            types.push(`| \`${prop}\` | \`${propType}\` | ${desc} |`);
          }
        });
      }
      types.push('');
    });
  });

  return types.length > 0 ? types.join('\n') : null;
}

/**
 * Extract detailed property information
 */
function extractPropertiesSection($: any): string | null {
  const items: string[] = [];
  const seenProps = new Set<string>();

  // ESRI uses h4 for property names in Property Details section
  // Find the Property Details header and iterate through following h4 elements
  const propDetailsHeader = $('h2:contains("Property Details"), h3:contains("Property Details")').first();

  if (propDetailsHeader.length) {
    // Get all siblings after Property Details header until next h2
    let current = propDetailsHeader.next();

    while (current.length && !current.is('h2')) {
      // Check if this is a property header (h4 or h3)
      if (current.is('h4, h3')) {
        const propName = cleanText(current.text()).replace(/\s*#\s*$/, '');

        // Skip section headers and already-seen props
        if (propName && !propName.includes('Details') && !seenProps.has(propName)) {
          seenProps.add(propName);

          items.push(`### \`${propName}\``);

          // Look for type in the next code element or paragraph
          let typeFound = false;
          let sibling = current.next();
          let descCount = 0;

          while (sibling.length && !sibling.is('h4, h3, h2') && descCount < 5) {
            const tagName = sibling.prop('tagName')?.toLowerCase();

            // Type info often in a paragraph with code
            if (!typeFound && (tagName === 'p' || tagName === 'code')) {
              const sibText = cleanText(sibling.text());

              // Check if this looks like type info
              if (sibText.match(/^[A-Z][\w<>[\],\s|]+$|^\w+\s*\|/)) {
                const typeText = sibText.split('\n')[0]?.substring(0, 100);
                if (typeText && typeText.length > 0) {
                  items.push(`- **Type:** \`${typeText}\``);
                  typeFound = true;
                }
              } else if (sibText.length > 20 && !sibText.startsWith('Since:') && !sibText.startsWith('Default')) {
                // This is a description paragraph
                items.push(`- ${sibText.substring(0, 300)}`);
                descCount++;
              }
            }

            // Check for "Since:" version
            if (tagName === 'p' && sibling.text().includes('Since:')) {
              const sinceMatch = sibling.text().match(/Since:\s*(?:ArcGIS[^)]*\s*)?([\d.]+)/i);
              if (sinceMatch) {
                items.push(`- **Since:** ${sinceMatch[1]}`);
              }
            }

            // Check for Default value
            if (sibling.text().includes('Default')) {
              const defaultMatch = sibling.text().match(/Default\s*(?:value)?:?\s*`?([^`\n]+)/i);
              if (defaultMatch && defaultMatch[1]) {
                items.push(`- **Default:** \`${cleanText(defaultMatch[1]).substring(0, 60)}\``);
              }
            }

            sibling = sibling.next();
          }

          items.push('');
        }
      }

      current = current.next();
    }
  }

  // Fallback: Look for h4[id] property definitions anywhere on page
  if (items.length === 0) {
    $('h4[id]').each((_: number, el: any): void => {
      const $el = $(el);
      const id = $el.attr('id') || '';

      // Skip methods and events
      if (id.includes('(') || id.includes('event-') || id.includes('method')) return;

      const name = cleanText($el.text()).replace(/\s*#\s*$/, '');
      if (!name || seenProps.has(name) || name.includes('Details') || name.includes('Overview')) return;
      seenProps.add(name);

      items.push(`### \`${name}\``);

      // Look for type in following element
      const nextSibling = $el.next();
      if (nextSibling.length) {
        const text = cleanText(nextSibling.text());
        // Check if looks like type (starts with capital, contains type characters)
        if (text.match(/^[A-Z][\w<>[\],\s|]+$/)) {
          items.push(`- **Type:** \`${text.substring(0, 80)}\``);
        } else if (text.length > 15 && text.length < 400) {
          items.push(`- ${text.substring(0, 250)}`);
        }
      }

      items.push('');
    });
  }

  return items.length > 0 ? items.join('\n') : null;
}

/**
 * Extract detailed method information with parameters and return types
 */
function extractMethodsSection($: any): string | null {
  const items: string[] = [];
  const seenMethods = new Set<string>();

  // Look for Method Details section
  $('h2:contains("Method Details"), h2:contains("Methods")').each((_: number, header: any): void => {
    const $header = $(header);

    // Get all method headers that follow
    $header.nextAll('h3, h4').each((_2: number, methodHeader: any): void => {
      const $method = $(methodHeader);
      let methodName = cleanText($method.text()).replace(/\s*#\s*$/, '');

      // Stop if we hit another major section
      if ($method.is('h2') || methodName.includes('Property') || methodName.includes('Event')) {
        return;
      }

      // Extract just the method name (without parameters)
      const nameMatch = methodName.match(/^(\w+)/);
      if (!nameMatch || !nameMatch[1]) return;
      methodName = nameMatch[1];

      if (!methodName || seenMethods.has(methodName)) return;
      seenMethods.add(methodName);

      items.push(`### \`${methodName}()\``);

      // Look for method signature in following code block
      const signature = $method.nextAll('pre, code').first();
      if (signature.length) {
        const sigText = cleanText(signature.text());
        if (sigText && sigText.includes('(') && sigText.length < 200) {
          items.push('');
          items.push('```javascript');
          items.push(sigText);
          items.push('```');
        }
      }

      // Get description
      const descParagraphs: string[] = [];
      $method.nextAll('p').each((_3: number, p: any): void => {
        const $p = $(p);
        // Stop if we're past this method's section
        const prevHeader = $p.prevAll('h3, h4').first();
        if (prevHeader.length && cleanText(prevHeader.text()).replace(/\s*#\s*$/, '').match(/^(\w+)/)?.[1] !== methodName) {
          return;
        }
        const text = cleanText($p.text());
        if (text && text.length > 10 && !text.startsWith('Parameter') && !text.startsWith('Return')) {
          descParagraphs.push(text);
        }
      });
      if (descParagraphs.length > 0) {
        items.push('');
        items.push(descParagraphs[0]?.substring(0, 300) || '');
      }

      // Extract parameters table
      const paramsHeader = $method.nextAll('h5:contains("Parameter"), h4:contains("Parameter")').first();
      if (paramsHeader.length) {
        const paramsTable = paramsHeader.nextAll('table').first();
        if (paramsTable.length) {
          items.push('');
          items.push('**Parameters:**');
          items.push('');
          items.push('| Name | Type | Description |');
          items.push('|------|------|-------------|');

          paramsTable.find('tr').each((i: number, row: any) => {
            if (i === 0) return; // Skip header
            const cells = $(row).find('td');
            if (cells.length >= 2) {
              const paramName = cleanText(cells.eq(0).text());
              const paramType = cleanText(cells.eq(1).text()).split('\n')[0];
              const paramDesc = cells.length > 2 ? cleanText(cells.eq(2).text()).substring(0, 80) : '';
              items.push(`| \`${paramName}\` | \`${paramType}\` | ${paramDesc} |`);
            }
          });
        }
      }

      // Alternative: look for parameter list
      const paramsList = $method.nextAll('ul').first();
      if (!paramsHeader.length && paramsList.length) {
        const listItems: string[] = [];
        paramsList.find('> li').each((_3: number, li: any) => {
          const text = cleanText($(li).text());
          if (text.includes(':') || text.match(/^\w+\s+\[/)) {
            listItems.push(`- ${text.substring(0, 150)}`);
          }
        });
        if (listItems.length > 0) {
          items.push('');
          items.push('**Parameters:**');
          items.push('');
          items.push(...listItems);
        }
      }

      // Extract return type
      const returnsHeader = $method.nextAll('h5:contains("Return"), h4:contains("Return")').first();
      if (returnsHeader.length) {
        const returnsTable = returnsHeader.nextAll('table').first();
        if (returnsTable.length) {
          items.push('');
          items.push('**Returns:**');
          items.push('');
          items.push('| Type | Description |');
          items.push('|------|-------------|');

          returnsTable.find('tr').each((i: number, row: any) => {
            if (i === 0) return;
            const cells = $(row).find('td');
            if (cells.length >= 1) {
              const retType = cleanText(cells.eq(0).text()).split('\n')[0];
              const retDesc = cells.length > 1 ? cleanText(cells.eq(1).text()).substring(0, 100) : '';
              items.push(`| \`${retType}\` | ${retDesc} |`);
            }
          });
        } else {
          // Look for return type in text
          const returnText = returnsHeader.next().text();
          if (returnText) {
            items.push('');
            items.push(`**Returns:** \`${cleanText(returnText).substring(0, 100)}\``);
          }
        }
      }

      items.push('');
    });
  });

  // Fallback for simpler pages
  if (items.length === 0) {
    $('h3[id*="method"], h4[id*="method"]').each((_: number, el: any) => {
      const $el = $(el);
      const name = cleanText($el.text()).replace(/\s*#\s*$/, '').replace(/\(.*\)/, '');

      if (!name || seenMethods.has(name)) return;
      seenMethods.add(name);

      items.push(`### \`${name}()\``);

      const nextP = $el.nextAll('p').first();
      if (nextP.length) {
        items.push(`- ${cleanText(nextP.text()).substring(0, 200)}`);
      }

      items.push('');
    });
  }

  return items.length > 0 ? items.join('\n') : null;
}

/**
 * Extract detailed event information
 */
function extractEventsSection($: any): string | null {
  const items: string[] = [];
  const seenEvents = new Set<string>();

  // Look for Event Details section
  $('h2:contains("Event Details")').each((_: number, header: any): void => {
    $(header).nextAll('h3, h4').each((_2: number, eventHeader: any): void => {
      const $event = $(eventHeader);
      const eventName = cleanText($event.text()).replace(/\s*#\s*$/, '');

      // Stop at other sections
      if ($event.is('h2') || eventName.includes('Property') || eventName.includes('Method')) {
        return;
      }

      if (!eventName || seenEvents.has(eventName)) return;
      seenEvents.add(eventName);

      items.push(`### \`${eventName}\``);

      // Get event description
      const desc = $event.nextAll('p').first();
      if (desc.length) {
        items.push('');
        items.push(cleanText(desc.text()).substring(0, 300));
      }

      // Look for event properties table
      const propsTable = $event.nextAll('table').first();
      if (propsTable.length) {
        items.push('');
        items.push('**Event Properties:**');
        items.push('');
        items.push('| Name | Type | Description |');
        items.push('|------|------|-------------|');

        propsTable.find('tr').each((i: number, row: any): void => {
          if (i === 0) return;
          const cells = $(row).find('td');
          if (cells.length >= 2) {
            const propName = cleanText(cells.eq(0).text());
            const propType = cleanText(cells.eq(1).text()).split('\n')[0];
            const propDesc = cells.length > 2 ? cleanText(cells.eq(2).text()).substring(0, 80) : '';
            items.push(`| \`${propName}\` | \`${propType}\` | ${propDesc} |`);
          }
        });
      }

      items.push('');
    });
  });

  return items.length > 0 ? items.join('\n') : null;
}

/**
 * Extract code examples
 */
function extractCodeExamples($: any): string | null {
  const examples: string[] = [];

  $('pre code, .snippet code').each((i: number, el: any) => {
    if (i > 5) return; // Limit to first 6 examples

    const code = $(el).text().trim();
    if (code && code.length > 30 && code.length < 2000) {
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
 * Clean text for markdown
 */
function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
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
 * Save markdown to file using proper folder hierarchy
 */
function saveMarkdown(module: string, content: string): string {
  const { folder, filename } = moduleToPath(module);
  const categoryDir = path.join(OUTPUT_DIR, folder);
  ensureDir(categoryDir);

  const filepath = path.join(categoryDir, `${filename}.md`);
  fs.writeFileSync(filepath, content, 'utf-8');
  return filepath;
}

/**
 * Check if a module has already been scraped
 */
function isAlreadyScraped(module: string): boolean {
  const { folder, filename } = moduleToPath(module);
  const categoryDir = path.join(OUTPUT_DIR, folder);
  const filepath = path.join(categoryDir, `${filename}.md`);
  return fs.existsSync(filepath);
}

/**
 * Main batch scraper
 */
async function main() {
  const args = process.argv.slice(2);

  const dryRun = args.includes('--dry-run');
  const skipExisting = args.includes('--skip-existing');
  const limitArg = args.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1] || '0', 10) : Infinity;
  const startArg = args.find((a) => a.startsWith('--start='));
  const start = startArg ? parseInt(startArg.split('=')[1] || '0', 10) : 0;
  const moduleArg = args.find((a) => a.startsWith('--module='));

  console.log('ESRI ArcGIS JS SDK Batch Scraper');
  console.log('================================');
  console.log('');

  // Single module mode
  if (moduleArg) {
    const moduleName = moduleArg.split('=')[1];
    if (!moduleName) {
      console.error('Please specify a module name (e.g., --module=esri-rest-route)');
      return;
    }
    const url = `${BASE_URL}${moduleName}.html`;
    console.log(`Scraping single module: ${moduleName}`);
    console.log(`URL: ${url}`);
    console.log('');

    try {
      const html = await fetchPage(url);
      const markdown = htmlToMarkdown(html, moduleName);
      const filepath = saveMarkdown(moduleName, markdown);
      console.log(`Saved to: ${filepath}`);
      console.log('');
      console.log('--- Generated Markdown Preview ---');
      console.log(markdown.substring(0, 2000));
      if (markdown.length > 2000) console.log('...[truncated]');
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : error}`);
    }
    return;
  }

  // Extract URLs
  console.log('Extracting URLs from items_to_scrape.md...');
  const pages = extractUrlsFromItemsFile();
  console.log(`Found ${pages.length} unique modules to scrape`);
  console.log('');

  if (dryRun) {
    console.log('DRY RUN - No files will be written');
    console.log('');
    console.log('First 30 modules with folder structure:');
    pages.slice(0, 30).forEach((p) => {
      const { folder, filename } = moduleToPath(p.module);
      console.log(`  ${folder}/${filename}.md`);
    });
    console.log('');
    console.log('Folder structure:');
    const categories = new Set(pages.map((p) => p.category));
    const sortedCategories = Array.from(categories).sort();
    sortedCategories.forEach((c) => console.log(`  docs/esri-js-sdk/${c}/`));
    return;
  }

  // Process pages
  let processed = 0;
  let skipped = 0;
  let errors = 0;

  const pagesToProcess = pages.slice(start, start + limit);
  console.log(`Processing ${pagesToProcess.length} modules (starting at ${start})...`);
  console.log('');

  for (const page of pagesToProcess) {
    // Check if already scraped
    if (skipExisting && isAlreadyScraped(page.module)) {
      skipped++;
      continue;
    }

    process.stdout.write(`[${processed + skipped + errors + 1}/${pagesToProcess.length}] ${page.module}... `);

    try {
      const html = await fetchPage(page.url);
      const markdown = htmlToMarkdown(html, page.module);
      const filepath = saveMarkdown(page.module, markdown);
      console.log(`saved to ${path.relative(OUTPUT_DIR, filepath)}`);
      processed++;
    } catch (error) {
      console.log(`ERROR: ${error instanceof Error ? error.message : error}`);
      errors++;
    }

    // Rate limiting
    await sleep(DELAY_MS);
  }

  console.log('');
  console.log('=== Summary ===');
  console.log(`Processed: ${processed}`);
  console.log(`Skipped (existing): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total: ${processed + skipped + errors}`);
}

main().catch(console.error);
