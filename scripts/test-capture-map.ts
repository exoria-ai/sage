#!/usr/bin/env npx tsx
/**
 * Test the updated capture_map_view tool
 *
 * Tests:
 * 1. Vector tile parcels with labels
 * 2. Enhanced spatial context metadata
 * 3. Various zoom levels to verify labels appear
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { captureMapView } from '../lib/tools/capture-map';

const OUTPUT_DIR = 'test-output/capture-map';
const OPEN_AFTER = process.argv.includes('--open');

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
    name: '01-single-parcel-z17',
    description: 'Single parcel at zoom 17 (should show labels)',
    options: {
      apn: '0030251020', // Government Center area
      zoom: 17,
    },
  },
  {
    name: '02-single-parcel-z18',
    description: 'Single parcel at zoom 18 (more labels)',
    options: {
      apn: '0030251020',
      zoom: 18,
    },
  },
  {
    name: '03-buffer-300ft',
    description: 'Buffer visualization 300ft',
    options: {
      buffer: {
        apn: '0030251020',
        radius_feet: 300,
      },
    },
  },
  {
    name: '04-aerial-with-parcels',
    description: 'Aerial imagery with parcel overlay',
    options: {
      apn: '0030251020',
      layers: { aerial2025: true },
      zoom: 18,
    },
  },
  {
    name: '05-county-overview',
    description: 'County overview with boundaries',
    options: {
      extent: 'county',
      layers: {
        countyBoundary: true,
        cityBoundary: true,
        parcels: false, // Too zoomed out for parcels
      },
    },
  },
  {
    name: '06-multiple-apns',
    description: 'Multiple parcels highlighted (auto-zoom to fit)',
    options: {
      apns: ['0030251020', '0030251010', '0030251030'],
      // No zoom specified - should auto-calculate to fit all parcels
    },
  },
  {
    name: '06b-widely-spaced-apns',
    description: 'Widely-spaced parcels (Fairfield + Vacaville + Benicia)',
    options: {
      // Fairfield (38.25, -122.04), Vacaville (38.35, -121.98), Benicia (38.05, -122.16)
      apns: ['003-019-303', '013-106-036', '008-911-540'],
      // No zoom specified - should auto-calculate to fit all
    },
  },
  {
    name: '07-with-scale-bar',
    description: 'Letter layout with scale bar and title',
    options: {
      apn: '0030251020',
      zoom: 17,
      layout: 'Letter ANSI A Landscape',
      layoutOptions: {
        title: 'Solano County Parcel Map',
        scalebarUnit: 'Feet',
      },
    },
  },
];

async function runTest(tc: TestCase): Promise<{
  success: boolean;
  duration: number;
  context?: unknown;
}> {
  const start = Date.now();
  console.log(`\n📍 ${tc.name}: ${tc.description}`);

  try {
    const result = await captureMapView(tc.options);
    const duration = Date.now() - start;

    if (!result.success) {
      console.log(`   ❌ Error: ${result.message}`);
      return { success: false, duration };
    }

    // Save image
    const imageBuffer = Buffer.from(result.imageBase64!, 'base64');
    writeFileSync(`${OUTPUT_DIR}/${tc.name}.png`, imageBuffer);

    // Log context
    console.log(`   ✅ Success (${(duration / 1000).toFixed(1)}s)`);
    if (result.context) {
      console.log(`   📊 Scale: ${result.context.scale}`);
      console.log(`   📊 Area: ${result.context.approximateArea}`);
      console.log(`   📊 Layers: ${result.context.layersShown.join(', ')}`);
      if (result.context.highlightedApns) {
        console.log(`   📊 Highlighted: ${result.context.highlightedApns.join(', ')}`);
      }
    }

    return { success: true, duration, context: result.context };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`   ❌ ${message}`);
    return { success: false, duration: Date.now() - start };
  }
}

async function main() {
  console.log('🗺️  Capture Map View Test');
  console.log('='.repeat(50));
  console.log('Testing vector tile parcels with labels and enhanced metadata');

  const results = [];
  for (const tc of testCases) {
    const result = await runTest(tc);
    results.push({ ...tc, ...result });
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary');
  console.log('='.repeat(50));

  const passed = results.filter(r => r.success).length;
  console.log(`\n${passed}/${results.length} tests passed`);

  for (const r of results) {
    const status = r.success ? '✅' : '❌';
    console.log(`${status} ${r.name}: ${(r.duration / 1000).toFixed(1)}s`);
  }

  // Generate HTML gallery
  const html = `<!DOCTYPE html>
<html><head><title>Capture Map View Test</title>
<style>
body{font-family:system-ui;margin:2rem;background:#111;color:#eee}
h1{color:#fff}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(500px,1fr));gap:1rem}
.card{background:#222;border-radius:8px;overflow:hidden}
.card img{width:100%;cursor:pointer}
.card-body{padding:1rem}
.card h3{margin:0 0 .5rem;font-size:.9rem}
.card p{margin:0 0 .5rem;color:#888;font-size:.8rem}
.context{font-family:monospace;font-size:.7rem;color:#666;white-space:pre-wrap}
</style></head><body>
<h1>🗺️ Capture Map View Test</h1>
<p>Testing vector tile parcels with labels and enhanced spatial context metadata</p>
<div class="grid">
${results.map(r => `
<div class="card">
${r.success ? `<a href="${r.name}.png" target="_blank"><img src="${r.name}.png"></a>` : '<div style="padding:2rem;text-align:center;color:#f87171">Failed</div>'}
<div class="card-body">
<h3>${r.success ? '✅' : '❌'} ${r.name}</h3>
<p>${r.description}</p>
<p>⏱️ ${(r.duration/1000).toFixed(1)}s</p>
${r.context ? `<div class="context">${JSON.stringify(r.context, null, 2)}</div>` : ''}
</div></div>`).join('')}
</div></body></html>`;

  writeFileSync(`${OUTPUT_DIR}/index.html`, html);
  console.log(`\n📄 Gallery: ${OUTPUT_DIR}/index.html`);

  if (OPEN_AFTER) {
    execSync(`open ${OUTPUT_DIR}/index.html`);
  }
}

main().catch(console.error);
