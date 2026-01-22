#!/usr/bin/env npx tsx
/**
 * Local Map Rendering Test Tool
 *
 * Renders maps using the new capture-map.ts implementation and saves them
 * locally for visual inspection.
 *
 * Usage:
 *   npx tsx scripts/test-capture-map.ts
 *   npx tsx scripts/test-capture-map.ts --open  # Opens images after rendering
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { captureMapView } from '../lib/tools/capture-map';

const OUTPUT_DIR = 'test-output/maps';
const OPEN_AFTER_RENDER = process.argv.includes('--open');

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

interface TestCase {
  name: string;
  description: string;
  options: Parameters<typeof captureMapView>[0];
}

const testCases: TestCase[] = [
  {
    name: '01-apn-basic',
    description: 'Basic parcel by APN (008-013-001)',
    options: {
      apn: '008-013-001',
      width: 800,
      height: 600,
      basemap: 'topographic',
    },
  },
  {
    name: '02-apn-aerial',
    description: 'Parcel with aerial basemap',
    options: {
      apn: '008-013-001',
      width: 800,
      height: 600,
      basemap: 'imagery',
    },
  },
  {
    name: '03-coordinates',
    description: 'Render by coordinates (Fairfield downtown)',
    options: {
      center: { latitude: 38.2494, longitude: -122.0400 },
      zoom: 17,
      width: 800,
      height: 600,
      basemap: 'topographic',
    },
  },
  {
    name: '04-buffer-300ft',
    description: 'Buffer visualization (300ft around parcel)',
    options: {
      buffer: {
        apn: '008-013-001',
        radius_feet: 300,
        show_ring: true,
        highlight_parcels: true,
      },
      width: 1000,
      height: 800,
      basemap: 'topographic',
    },
  },
  {
    name: '05-buffer-500ft',
    description: 'Buffer visualization (500ft)',
    options: {
      buffer: {
        apn: '008-013-001',
        radius_feet: 500,
        show_ring: true,
      },
      width: 1000,
      height: 800,
      basemap: 'imagery',
    },
  },
  {
    name: '06-county-extent',
    description: 'County-wide view with boundaries',
    options: {
      extent: 'county',
      boundaries: { showCounty: true, showCities: true },
      width: 1200,
      height: 800,
      basemap: 'topographic',
    },
  },
  {
    name: '07-multi-parcels',
    description: 'Multiple highlighted parcels',
    options: {
      center: { latitude: 38.04, longitude: -122.14 },
      zoom: 17,
      apns: ['008-013-001', '008-013-002', '008-013-003'],
      width: 800,
      height: 600,
      basemap: 'topographic',
    },
  },
  {
    name: '08-high-zoom',
    description: 'High zoom level (building detail)',
    options: {
      apn: '008-013-001',
      zoom: 19,
      width: 800,
      height: 600,
      basemap: 'imagery',
    },
  },
  {
    name: '09-low-zoom',
    description: 'Low zoom level (neighborhood)',
    options: {
      apn: '008-013-001',
      zoom: 15,
      width: 800,
      height: 600,
      basemap: 'topographic',
    },
  },
  {
    name: '10-fairfield-parcels',
    description: 'Fairfield city center parcels',
    options: {
      center: { latitude: 38.2494, longitude: -122.0400 },
      zoom: 18,
      width: 1000,
      height: 800,
      basemap: 'topographic',
    },
  },
  {
    name: '11-aerial2025-layer',
    description: 'Parcel with 2025 aerial layer enabled',
    options: {
      apn: '008-013-001',
      width: 800,
      height: 600,
      basemap: 'topographic',
      layers: {
        aerial2025: true,
        parcels: true,
      },
    },
  },
  {
    name: '12-layers-off',
    description: 'Parcel with parcels layer disabled',
    options: {
      apn: '008-013-001',
      width: 800,
      height: 600,
      basemap: 'topographic',
      layers: {
        parcels: false,
      },
    },
  },
  {
    name: '13-city-boundary-layer',
    description: 'City boundary layer via layers option',
    options: {
      center: { latitude: 38.2494, longitude: -122.0400 },
      zoom: 12,
      width: 1000,
      height: 800,
      basemap: 'topographic',
      layers: {
        cityBoundary: true,
        parcels: false,
      },
    },
  },
  {
    name: '14-imagery-hybrid',
    description: 'Imagery Hybrid basemap with labels',
    options: {
      apn: '008-013-001',
      width: 800,
      height: 600,
      basemap: 'imagery-hybrid',
    },
  },
  {
    name: '15-navigation',
    description: 'Navigation basemap',
    options: {
      center: { latitude: 38.2494, longitude: -122.0400 },
      zoom: 15,
      width: 800,
      height: 600,
      basemap: 'navigation',
    },
  },
];

async function runTest(testCase: TestCase): Promise<{
  success: boolean;
  filename?: string;
  error?: string;
  duration: number;
}> {
  const startTime = Date.now();
  console.log(`\n📍 ${testCase.name}: ${testCase.description}`);
  console.log(`   Options: ${JSON.stringify(testCase.options, null, 2).split('\n').join('\n   ')}`);

  try {
    const result = await captureMapView(testCase.options);
    const duration = Date.now() - startTime;

    if (!result.success) {
      console.log(`   ❌ Failed: ${result.message}`);
      return { success: false, error: result.message, duration };
    }

    // Save the image
    const filename = `${OUTPUT_DIR}/${testCase.name}.png`;
    const imageBuffer = Buffer.from(result.imageBase64!, 'base64');
    writeFileSync(filename, imageBuffer);

    console.log(`   ✅ Success (${duration}ms)`);
    console.log(`   📁 Saved: ${filename}`);
    console.log(`   📐 Size: ${result.width}x${result.height}, Zoom: ${result.zoom}`);
    console.log(`   🔗 URL: ${result.imageUrl?.substring(0, 80)}...`);

    return { success: true, filename, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    const message = error instanceof Error ? error.message : String(error);
    console.log(`   ❌ Error: ${message}`);
    return { success: false, error: message, duration };
  }
}

async function main() {
  console.log('🗺️  SAGE Map Rendering Test Tool');
  console.log('================================');
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Test cases: ${testCases.length}`);

  const results: Array<{ name: string; success: boolean; duration: number }> = [];

  for (const testCase of testCases) {
    const result = await runTest(testCase);
    results.push({ name: testCase.name, success: result.success, duration: result.duration });
  }

  // Summary
  console.log('\n================================');
  console.log('📊 Summary');
  console.log('================================');

  const passed = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  const totalTime = results.reduce((sum, r) => sum + r.duration, 0);

  console.log(`✅ Passed: ${passed}/${results.length}`);
  console.log(`❌ Failed: ${failed}/${results.length}`);
  console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(1)}s`);
  console.log(`📁 Output: ${OUTPUT_DIR}/`);

  // List failed tests
  if (failed > 0) {
    console.log('\nFailed tests:');
    results.filter((r) => !r.success).forEach((r) => console.log(`  - ${r.name}`));
  }

  // Open output directory if requested
  if (OPEN_AFTER_RENDER && passed > 0) {
    console.log('\n🖼️  Opening output directory...');
    try {
      if (process.platform === 'darwin') {
        execSync(`open ${OUTPUT_DIR}`);
      } else if (process.platform === 'linux') {
        execSync(`xdg-open ${OUTPUT_DIR}`);
      } else if (process.platform === 'win32') {
        execSync(`start ${OUTPUT_DIR}`);
      }
    } catch {
      console.log(`   (Could not open directory automatically)`);
    }
  }

  // Create an HTML gallery for easy viewing
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>SAGE Map Rendering Test Results</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; background: #f5f5f5; }
    h1 { color: #333; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; }
    .card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .card img { width: 100%; height: auto; display: block; }
    .card-body { padding: 1rem; }
    .card h3 { margin: 0 0 0.5rem; font-size: 1rem; }
    .card p { margin: 0; color: #666; font-size: 0.875rem; }
    .meta { margin-top: 0.5rem; font-size: 0.75rem; color: #999; }
    .success { color: #16a34a; }
    .failed { color: #dc2626; }
    .summary { background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
  </style>
</head>
<body>
  <h1>🗺️ SAGE Map Rendering Test Results</h1>
  <div class="summary">
    <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    <p><strong>Results:</strong> <span class="success">${passed} passed</span>, <span class="failed">${failed} failed</span></p>
    <p><strong>Total time:</strong> ${(totalTime / 1000).toFixed(1)}s</p>
  </div>
  <div class="grid">
    ${testCases
      .map((tc, i) => {
        const result = results[i];
        return `
    <div class="card">
      ${result?.success ? `<img src="${tc.name}.png" alt="${tc.description}" loading="lazy">` : ''}
      <div class="card-body">
        <h3>${tc.name}</h3>
        <p>${tc.description}</p>
        <div class="meta">
          <span class="${result?.success ? 'success' : 'failed'}">${result?.success ? '✅ Success' : '❌ Failed'}</span>
          · ${result?.duration}ms
        </div>
      </div>
    </div>`;
      })
      .join('')}
  </div>
</body>
</html>`;

  writeFileSync(`${OUTPUT_DIR}/index.html`, htmlContent);
  console.log(`\n📄 Gallery: ${OUTPUT_DIR}/index.html`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
