#!/usr/bin/env npx tsx
/**
 * Layout Template Comparison Test
 *
 * Compares MAP_ONLY (current) vs layout templates with legend/scale bar
 * to evaluate generation time and output quality.
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const OUTPUT_DIR = 'test-output/layout-comparison';
const OPEN_AFTER_RENDER = process.argv.includes('--open');

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PRINT_SERVICE_URL =
  'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute';

// Test parcel: Solano County Government Center
const TEST_APN = '0030251020'; // 003-025-102
const TEST_CENTER = { lat: 38.2566, lon: -122.0530 };

// Sample WebMap JSON for testing
function buildTestWebMap(width: number, height: number) {
  const zoom = 17;
  const degreesPerPixelX = 360 / (256 * Math.pow(2, zoom));
  const degreesPerPixelY = degreesPerPixelX * Math.cos((TEST_CENTER.lat * Math.PI) / 180);
  const halfWidth = (width / 2) * degreesPerPixelX;
  const halfHeight = (height / 2) * degreesPerPixelY;

  return {
    mapOptions: {
      extent: {
        xmin: TEST_CENTER.lon - halfWidth,
        ymin: TEST_CENTER.lat - halfHeight,
        xmax: TEST_CENTER.lon + halfWidth,
        ymax: TEST_CENTER.lat + halfHeight,
        spatialReference: { wkid: 4326 },
      },
    },
    operationalLayers: [
      {
        id: 'parcels',
        title: 'Parcels',
        url: 'https://services2.arcgis.com/SCn6czzcqKAFwdGU/arcgis/rest/services/Parcels_Public_Aumentum/FeatureServer/0',
        visibility: true,
        opacity: 1,
        layerType: 'ArcGISFeatureLayer',
      },
      {
        id: 'parcels-highlight',
        title: 'Highlighted Parcel',
        url: 'https://services2.arcgis.com/SCn6czzcqKAFwdGU/arcgis/rest/services/Parcels_Public_Aumentum/FeatureServer/0',
        visibility: true,
        opacity: 1,
        layerType: 'ArcGISFeatureLayer',
        layerDefinition: {
          definitionExpression: `parcelid='${TEST_APN}'`,
          drawingInfo: {
            renderer: {
              type: 'simple',
              symbol: {
                type: 'esriSFS',
                style: 'esriSFSSolid',
                color: [59, 130, 246, 77],
                outline: {
                  type: 'esriSLS',
                  style: 'esriSLSSolid',
                  color: [59, 130, 246, 255],
                  width: 3,
                },
              },
            },
          },
        },
      },
    ],
    baseMap: {
      title: 'Topographic',
      baseMapLayers: [
        {
          id: 'World_Hillshade',
          url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',
          visibility: true,
          opacity: 1,
          layerType: 'ArcGISTiledMapServiceLayer',
        },
        {
          id: 'World_Topo_Map',
          type: 'VectorTileLayer',
          visibility: true,
          opacity: 1,
          layerType: 'VectorTileLayer',
          styleUrl: 'https://cdn.arcgis.com/sharing/rest/content/items/7dc6cea0b1764a1f9af2e679f642f0f5/resources/styles/root.json',
        },
      ],
    },
    exportOptions: {
      outputSize: [width, height],
      dpi: 96,
    },
  };
}

interface TestCase {
  name: string;
  description: string;
  layoutTemplate: string;
  format: string;
  width: number;
  height: number;
  layoutOptions?: Record<string, unknown>;
}

const testCases: TestCase[] = [
  // Current approach - MAP_ONLY
  {
    name: '01-map-only-current',
    description: 'Current: MAP_ONLY 1200x800',
    layoutTemplate: 'MAP_ONLY',
    format: 'PNG32',
    width: 1200,
    height: 800,
  },
  // 50% larger MAP_ONLY
  {
    name: '02-map-only-larger',
    description: 'MAP_ONLY 1800x1200 (50% larger)',
    layoutTemplate: 'MAP_ONLY',
    format: 'PNG32',
    width: 1800,
    height: 1200,
  },
  // Letter landscape with legend/scalebar
  {
    name: '03-letter-landscape',
    description: 'Letter Landscape (8.5x11") with legend/scale',
    layoutTemplate: 'Letter ANSI A Landscape',
    format: 'PNG32',
    width: 1200,
    height: 800,
    layoutOptions: {
      titleText: 'Solano County Parcel Map',
      authorText: 'SAGE GIS Assistant',
      copyrightText: '© Solano County',
      scalebarUnit: 'Feet',
      legendOptions: {
        operationalLayers: [
          { id: 'parcels-highlight' },
          { id: 'parcels' }
        ]
      }
    },
  },
  // A4 landscape
  {
    name: '04-a4-landscape',
    description: 'A4 Landscape with legend/scale',
    layoutTemplate: 'A4 Landscape',
    format: 'PNG32',
    width: 1200,
    height: 800,
    layoutOptions: {
      titleText: 'Property Analysis Map',
      authorText: 'SAGE',
      scalebarUnit: 'Feet',
    },
  },
  // Tabloid for larger output
  {
    name: '05-tabloid-landscape',
    description: 'Tabloid (11x17") - largest with legend/scale',
    layoutTemplate: 'Tabloid ANSI B Landscape',
    format: 'PNG32',
    width: 1200,
    height: 800,
    layoutOptions: {
      titleText: 'Detailed Property Map',
      authorText: 'SAGE GIS Assistant',
      scalebarUnit: 'Feet',
    },
  },
  // A4 Portrait for comparison
  {
    name: '06-a4-portrait',
    description: 'A4 Portrait with legend/scale',
    layoutTemplate: 'A4 Portrait',
    format: 'PNG32',
    width: 800,
    height: 1200,
    layoutOptions: {
      titleText: 'Parcel Report',
      scalebarUnit: 'Feet',
    },
  },
];

async function runTest(testCase: TestCase): Promise<{
  success: boolean;
  filename?: string;
  error?: string;
  duration: number;
  fileSize?: number;
}> {
  const startTime = Date.now();
  console.log(`\n📍 ${testCase.name}: ${testCase.description}`);

  try {
    const webMapJson = buildTestWebMap(testCase.width, testCase.height);

    // Build request params
    const params = new URLSearchParams({
      Web_Map_as_JSON: JSON.stringify(webMapJson),
      Format: testCase.format,
      Layout_Template: testCase.layoutTemplate,
      f: 'json',
    });

    // Add layout options if provided
    if (testCase.layoutOptions) {
      params.set('Layout_Options', JSON.stringify(testCase.layoutOptions));
    }

    const response = await fetch(PRINT_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();
    const exportDuration = Date.now() - startTime;

    if (data.error) {
      console.log(`   ❌ Print service error: ${data.error.message}`);
      return { success: false, error: data.error.message, duration: exportDuration };
    }

    const imageUrl = data.results?.[0]?.value?.url;
    if (!imageUrl) {
      console.log(`   ❌ No image URL in response`);
      return { success: false, error: 'No image URL', duration: exportDuration };
    }

    // Fetch the image
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);
    const totalDuration = Date.now() - startTime;

    // Save the image
    const filename = `${OUTPUT_DIR}/${testCase.name}.png`;
    writeFileSync(filename, imageBuffer);

    console.log(`   ✅ Success`);
    console.log(`   ⏱️  Export: ${exportDuration}ms, Total: ${totalDuration}ms`);
    console.log(`   📁 Saved: ${filename} (${(imageBuffer.length / 1024).toFixed(1)} KB)`);

    return {
      success: true,
      filename,
      duration: totalDuration,
      fileSize: imageBuffer.length
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const message = error instanceof Error ? error.message : String(error);
    console.log(`   ❌ Error: ${message}`);
    return { success: false, error: message, duration };
  }
}

async function main() {
  console.log('🗺️  Layout Template Comparison Test');
  console.log('====================================');
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Test cases: ${testCases.length}`);
  console.log(`Test location: Solano County Government Center`);

  const results: Array<{
    name: string;
    description: string;
    success: boolean;
    duration: number;
    fileSize?: number;
  }> = [];

  for (const testCase of testCases) {
    const result = await runTest(testCase);
    results.push({
      name: testCase.name,
      description: testCase.description,
      success: result.success,
      duration: result.duration,
      fileSize: result.fileSize
    });
  }

  // Summary
  console.log('\n====================================');
  console.log('📊 Performance Comparison');
  console.log('====================================');

  console.log('\n| Test | Time | Size | Notes |');
  console.log('|------|------|------|-------|');

  for (const r of results) {
    const time = `${(r.duration / 1000).toFixed(1)}s`;
    const size = r.fileSize ? `${(r.fileSize / 1024).toFixed(0)} KB` : 'N/A';
    const status = r.success ? '' : '❌ FAILED';
    console.log(`| ${r.name} | ${time} | ${size} | ${status} |`);
  }

  const passed = results.filter((r) => r.success);
  const avgMapOnly = passed
    .filter(r => r.name.includes('map-only'))
    .reduce((sum, r) => sum + r.duration, 0) / 2;
  const avgLayout = passed
    .filter(r => !r.name.includes('map-only'))
    .reduce((sum, r) => sum + r.duration, 0) / passed.filter(r => !r.name.includes('map-only')).length;

  console.log(`\n📈 Average times:`);
  console.log(`   MAP_ONLY: ${(avgMapOnly / 1000).toFixed(1)}s`);
  console.log(`   With Layout: ${(avgLayout / 1000).toFixed(1)}s`);
  console.log(`   Difference: ${((avgLayout - avgMapOnly) / 1000).toFixed(1)}s (${((avgLayout / avgMapOnly - 1) * 100).toFixed(0)}% slower)`);

  // Open output directory if requested
  if (OPEN_AFTER_RENDER) {
    console.log('\n🖼️  Opening output directory...');
    try {
      if (process.platform === 'darwin') {
        execSync(`open ${OUTPUT_DIR}`);
      }
    } catch {
      console.log(`   (Could not open directory automatically)`);
    }
  }

  // Create HTML gallery
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Layout Template Comparison</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; background: #1a1a2e; color: #eee; }
    h1 { color: #fff; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); gap: 1.5rem; }
    .card { background: #16213e; border-radius: 8px; overflow: hidden; }
    .card img { width: 100%; height: auto; display: block; cursor: pointer; }
    .card img:hover { opacity: 0.9; }
    .card-body { padding: 1rem; }
    .card h3 { margin: 0 0 0.5rem; font-size: 1rem; color: #fff; }
    .card p { margin: 0; color: #aaa; font-size: 0.875rem; }
    .meta { margin-top: 0.5rem; font-size: 0.75rem; color: #888; }
    .summary { background: #16213e; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; }
    .summary h2 { margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { padding: 0.5rem; text-align: left; border-bottom: 1px solid #333; }
    th { color: #4ecca3; }
    .highlight { background: #0f3460; }
  </style>
</head>
<body>
  <h1>🗺️ Layout Template Comparison</h1>
  <div class="summary">
    <h2>Performance Results</h2>
    <p>Comparing MAP_ONLY (current) vs layout templates with legend/scale bar</p>
    <table>
      <tr><th>Test</th><th>Time</th><th>Size</th><th>Description</th></tr>
      ${results.map(r => `
      <tr class="${r.name.includes('map-only') ? 'highlight' : ''}">
        <td>${r.name}</td>
        <td>${(r.duration / 1000).toFixed(1)}s</td>
        <td>${r.fileSize ? (r.fileSize / 1024).toFixed(0) + ' KB' : 'N/A'}</td>
        <td>${r.description}</td>
      </tr>`).join('')}
    </table>
    <p style="margin-top: 1rem; color: #4ecca3;">
      <strong>Key Finding:</strong> Layout templates with legend/scale are ~${((avgLayout / avgMapOnly - 1) * 100).toFixed(0)}% slower than MAP_ONLY
    </p>
  </div>
  <h2>Visual Comparison</h2>
  <div class="grid">
    ${results.filter(r => r.success).map(r => `
    <div class="card">
      <a href="${r.name}.png" target="_blank">
        <img src="${r.name}.png" alt="${r.description}" loading="lazy">
      </a>
      <div class="card-body">
        <h3>${r.name}</h3>
        <p>${r.description}</p>
        <div class="meta">
          ⏱️ ${(r.duration / 1000).toFixed(1)}s · 📁 ${r.fileSize ? (r.fileSize / 1024).toFixed(0) + ' KB' : 'N/A'}
        </div>
      </div>
    </div>`).join('')}
  </div>
</body>
</html>`;

  writeFileSync(`${OUTPUT_DIR}/index.html`, htmlContent);
  console.log(`\n📄 Gallery: ${OUTPUT_DIR}/index.html`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
