#!/usr/bin/env npx tsx
/**
 * Test script for hazard layer visualization in capture_map_view
 *
 * Tests scenarios similar to the interactive map's Hazards preset:
 * - Flood zones (FEMA NFHL)
 * - Fire Hazard Severity Zones (CAL FIRE)
 * - Combined hazard views
 * - Parcel-specific hazard assessments
 *
 * Usage: npx tsx scripts/test-hazard-visualization.ts
 */

import { captureMapView } from '../lib/tools/capture-map';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

const SOLANO_AGOL_BASE = 'https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services';
const OUTPUT_DIR = 'test-output/hazard-visualization';

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

function saveImage(name: string, base64: string) {
  const outPath = `${OUTPUT_DIR}/${name}.png`;
  writeFileSync(outPath, Buffer.from(base64, 'base64'));
  return outPath;
}

interface TestResult {
  name: string;
  success: boolean;
  time: number;
  imagePath?: string;
  error?: string;
}

const results: TestResult[] = [];

async function runTest(
  name: string,
  description: string,
  testFn: () => Promise<ReturnType<typeof captureMapView>>
) {
  console.log(`\n🧪 ${name}: ${description}`);
  console.log('-'.repeat(70));
  const start = Date.now();

  try {
    const result = await testFn();
    const elapsed = (Date.now() - start) / 1000;

    if (result.success) {
      console.log(`✅ Success (${elapsed.toFixed(1)}s)`);
      console.log(`   📊 Scale: ${result.spatialContext?.scale || 'N/A'}`);
      console.log(`   📊 Area: ${result.spatialContext?.approximateArea || 'N/A'}`);

      let imagePath: string | undefined;
      if (result.imageBase64) {
        imagePath = saveImage(name, result.imageBase64);
        console.log(`   📁 Saved: ${imagePath}`);
      }

      results.push({ name, success: true, time: elapsed, imagePath });
    } else {
      console.log(`❌ Failed: ${result.message}`);
      results.push({ name, success: false, time: elapsed, error: result.message });
    }
  } catch (error) {
    const elapsed = (Date.now() - start) / 1000;
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.log(`❌ Error: ${errorMsg}`);
    results.push({ name, success: false, time: elapsed, error: errorMsg });
  }
}

async function runTests() {
  console.log('🗺️  Hazard Visualization Test Suite');
  console.log('='.repeat(70));
  console.log('Testing AI vision capability for hazard assessment scenarios\n');

  // Test 1: Flood zone view - parcel in flood area (like screenshot 1)
  await runTest('01-flood-parcel', 'Parcel with FEMA flood zone overlay', async () => {
    return captureMapView({
      apn: '013-111-507', // Parcel visible in your flood map screenshot
      zoom: 16,
      additionalLayers: [
        {
          url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28',
          title: 'FEMA Flood Zones',
          opacity: 0.6,
          layerType: 'ArcGISFeatureLayer',
        },
      ],
      basemap: 'topographic',
    });
  });

  // Test 2: Fire hazard - parcel in high fire zone (like screenshot 2)
  await runTest('02-fire-parcel', 'Parcel with fire hazard severity overlay', async () => {
    return captureMapView({
      apn: '012-706-001', // Parcel in fire hazard area from your screenshot
      zoom: 15,
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone/FeatureServer/0`,
          title: 'Fire Hazard Severity',
          opacity: 0.6,
        },
      ],
      basemap: 'imagery-hybrid',
    });
  });

  // Test 3: Phase 2 2025 Fire Hazard layer
  await runTest('03-fire-phase2-2025', 'Fire Hazard Phase 2 2025 combined layer', async () => {
    return captureMapView({
      center: { latitude: 38.35, longitude: -122.1 }, // Vacaville hills area
      zoom: 12,
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone_Phase2_2025/FeatureServer/0`,
          title: 'Fire Hazard 2025',
          opacity: 0.5,
        },
      ],
      basemap: 'imagery-hybrid',
      layers: { parcels: true, cityBoundary: true },
    });
  });

  // Test 4: County-wide hazard overview (like screenshot 4)
  await runTest('04-county-hazards', 'County-wide fire and flood hazard view', async () => {
    return captureMapView({
      extent: 'county',
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone/FeatureServer/0`,
          title: 'Fire Hazard Severity',
          opacity: 0.5,
        },
        {
          url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28',
          title: 'FEMA Flood Zones',
          opacity: 0.4,
          layerType: 'ArcGISFeatureLayer',
        },
      ],
      basemap: 'topographic',
      layers: { cityBoundary: true, countyBoundary: true },
    });
  });

  // Test 5: Specific parcel hazard assessment - complete package
  await runTest('05-parcel-hazard-assessment', 'Full parcel hazard assessment view', async () => {
    return captureMapView({
      apn: '012-805-010', // Rural parcel in potential hazard areas
      zoom: 15,
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone/FeatureServer/0`,
          title: 'Fire Hazard',
          opacity: 0.4,
        },
        {
          url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28',
          title: 'Flood Zones',
          opacity: 0.4,
          layerType: 'ArcGISFeatureLayer',
        },
      ],
      basemap: 'imagery-hybrid',
    });
  });

  // Test 6: Local county floodplains layer (alternative to FEMA)
  await runTest('06-county-floodplains', 'County floodplain layer visualization', async () => {
    return captureMapView({
      center: { latitude: 38.19, longitude: -122.04 }, // Suisun area
      zoom: 13,
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/Floodplains/FeatureServer/0`,
          title: 'County Floodplains',
          opacity: 0.6,
        },
      ],
      basemap: 'topographic',
      layers: { parcels: true, cityBoundary: true },
    });
  });

  // Test 7: Flood zone only - neighborhood view (matching your first screenshot)
  await runTest('07-flood-neighborhood', 'Neighborhood flood zone view with parcels', async () => {
    return captureMapView({
      center: { latitude: 38.249, longitude: -122.038 }, // Area from your flood screenshot
      zoom: 16,
      additionalLayers: [
        {
          url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28',
          title: 'FEMA Flood Zones',
          opacity: 0.5,
          layerType: 'ArcGISFeatureLayer',
        },
      ],
      basemap: 'topographic',
      layers: { parcels: true },
    });
  });

  // Test 8: High fire hazard area closeup
  await runTest('08-fire-closeup', 'High fire hazard area with parcel detail', async () => {
    return captureMapView({
      center: { latitude: 38.38, longitude: -122.12 }, // Vacaville hills
      zoom: 14,
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone/FeatureServer/0`,
          title: 'Fire Hazard Severity',
          opacity: 0.55,
        },
      ],
      basemap: 'imagery-hybrid',
      layers: { parcels: true },
    });
  });

  // Test 9: Suisun Marsh area (flood + special district)
  await runTest('09-suisun-marsh-hazards', 'Suisun Marsh area hazard view', async () => {
    return captureMapView({
      center: { latitude: 38.19, longitude: -122.04 }, // Suisun Marsh
      zoom: 12,
      additionalLayers: [
        {
          url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28',
          title: 'FEMA Flood Zones',
          opacity: 0.5,
          layerType: 'ArcGISFeatureLayer',
        },
      ],
      basemap: 'imagery-hybrid',
      layers: { countyBoundary: true },
    });
  });

  // Test 10: Multiple parcels with hazard context
  await runTest('10-multi-parcel-hazards', 'Multiple parcels with combined hazard layers', async () => {
    return captureMapView({
      apns: ['012-705-007', '012-705-003', '012-706-001'],
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone/FeatureServer/0`,
          title: 'Fire Hazard',
          opacity: 0.45,
        },
      ],
      basemap: 'imagery-hybrid',
    });
  });

  // Generate HTML gallery
  generateGallery();

  // Print summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 Summary');
  console.log('='.repeat(70));

  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n${passed}/${results.length} tests passed`);

  for (const r of results) {
    const icon = r.success ? '✅' : '❌';
    console.log(`${icon} ${r.name}: ${r.time.toFixed(1)}s${r.error ? ` - ${r.error}` : ''}`);
  }

  console.log(`\n📄 Gallery: ${OUTPUT_DIR}/index.html`);
}

function generateGallery() {
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Hazard Visualization Test Results</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 20px; background: #f5f5f5; }
    h1 { color: #333; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); gap: 20px; }
    .test { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .test img { width: 100%; height: auto; display: block; }
    .test-info { padding: 15px; }
    .test-name { font-weight: bold; font-size: 1.1em; margin-bottom: 5px; }
    .test-status { font-size: 0.9em; color: #666; }
    .success { color: #22c55e; }
    .failed { color: #ef4444; }
  </style>
</head>
<body>
  <h1>🗺️ Hazard Visualization Test Results</h1>
  <p>Generated: ${new Date().toISOString()}</p>
  <div class="grid">
    ${results.map(r => `
    <div class="test">
      ${r.imagePath ? `<img src="${r.imagePath.replace(OUTPUT_DIR + '/', '')}" alt="${r.name}">` : '<div style="padding:50px;text-align:center;color:#999;">No image</div>'}
      <div class="test-info">
        <div class="test-name">${r.name}</div>
        <div class="test-status ${r.success ? 'success' : 'failed'}">
          ${r.success ? '✅ Success' : '❌ Failed'} (${r.time.toFixed(1)}s)
          ${r.error ? `<br><small>${r.error}</small>` : ''}
        </div>
      </div>
    </div>
    `).join('')}
  </div>
</body>
</html>`;

  writeFileSync(`${OUTPUT_DIR}/index.html`, html);
}

runTests().catch(console.error);
