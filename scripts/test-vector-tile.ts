#!/usr/bin/env npx tsx
/**
 * Test Vector Tile Layer in Print Service
 *
 * Tests if the ESRI print service can render vector tile layers
 * which would give us labels and styled parcels automatically.
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const OUTPUT_DIR = 'test-output/vector-tile';
const OPEN_AFTER_RENDER = process.argv.includes('--open');

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PRINT_SERVICE_URL =
  'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute';

// Test location with multiple parcels visible
const TEST_CENTER = { lat: 38.2566, lon: -122.0530 };

const VECTOR_TILE_URL = 'https://vectortileservices7.arcgis.com/KbDaBCmcuKbyQfck/arcgis/rest/services/Parcels_Public_Aumentum_Vector_Tile/VectorTileServer';

function buildWebMap(options: {
  width: number;
  height: number;
  zoom: number;
  useVectorTile: boolean;
  useFeatureLayer: boolean;
}) {
  const { width, height, zoom, useVectorTile, useFeatureLayer } = options;

  const degreesPerPixelX = 360 / (256 * Math.pow(2, zoom));
  const degreesPerPixelY = degreesPerPixelX * Math.cos((TEST_CENTER.lat * Math.PI) / 180);
  const halfWidth = (width / 2) * degreesPerPixelX;
  const halfHeight = (height / 2) * degreesPerPixelY;

  const operationalLayers: Record<string, unknown>[] = [];

  // Option 1: Vector Tile Layer (has labels built-in)
  if (useVectorTile) {
    operationalLayers.push({
      id: 'parcels-vector-tile',
      title: 'Parcels (Vector Tile)',
      layerType: 'VectorTileLayer',
      styleUrl: `${VECTOR_TILE_URL}/resources/styles/root.json`,
      visibility: true,
      opacity: 1,
    });
  }

  // Option 2: Feature Layer with custom symbology (no labels)
  if (useFeatureLayer) {
    operationalLayers.push({
      id: 'parcels-feature',
      title: 'Parcels (Feature)',
      url: 'https://services2.arcgis.com/SCn6czzcqKAFwdGU/arcgis/rest/services/Parcels_Public_Aumentum/FeatureServer/0',
      visibility: true,
      opacity: 1,
      layerType: 'ArcGISFeatureLayer',
      layerDefinition: {
        drawingInfo: {
          renderer: {
            type: 'simple',
            symbol: {
              type: 'esriSFS',
              style: 'esriSFSNull',
              outline: {
                type: 'esriSLS',
                style: 'esriSLSSolid',
                color: [0, 0, 0, 255],
                width: 1,
              },
            },
          },
        },
      },
    });
  }

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
    operationalLayers,
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
          layerType: 'VectorTileLayer',
          visibility: true,
          opacity: 1,
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
  zoom: number;
  useVectorTile: boolean;
  useFeatureLayer: boolean;
}

const testCases: TestCase[] = [
  {
    name: '01-vector-tile-z16',
    description: 'Vector Tile only at zoom 16 (should show labels)',
    zoom: 16,
    useVectorTile: true,
    useFeatureLayer: false,
  },
  {
    name: '02-vector-tile-z17',
    description: 'Vector Tile only at zoom 17 (more labels)',
    zoom: 17,
    useVectorTile: true,
    useFeatureLayer: false,
  },
  {
    name: '03-vector-tile-z18',
    description: 'Vector Tile only at zoom 18 (detailed)',
    zoom: 18,
    useVectorTile: true,
    useFeatureLayer: false,
  },
  {
    name: '04-feature-only-z17',
    description: 'Feature Layer only at zoom 17 (no labels)',
    zoom: 17,
    useVectorTile: false,
    useFeatureLayer: true,
  },
  {
    name: '05-both-layers-z17',
    description: 'Both Vector Tile + Feature Layer at zoom 17',
    zoom: 17,
    useVectorTile: true,
    useFeatureLayer: true,
  },
];

async function runTest(testCase: TestCase): Promise<{
  success: boolean;
  duration: number;
  fileSize?: number;
  error?: string;
}> {
  const startTime = Date.now();
  console.log(`\n📍 ${testCase.name}: ${testCase.description}`);

  try {
    const webMapJson = buildWebMap({
      width: 1200,
      height: 800,
      zoom: testCase.zoom,
      useVectorTile: testCase.useVectorTile,
      useFeatureLayer: testCase.useFeatureLayer,
    });

    const params = new URLSearchParams({
      Web_Map_as_JSON: JSON.stringify(webMapJson),
      Format: 'PNG32',
      Layout_Template: 'MAP_ONLY',
      f: 'json',
    });

    const response = await fetch(PRINT_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      console.log(`   ❌ Error: ${data.error.message}`);
      return { success: false, duration: Date.now() - startTime, error: data.error.message };
    }

    const imageUrl = data.results?.[0]?.value?.url;
    if (!imageUrl) {
      console.log(`   ❌ No image URL`);
      return { success: false, duration: Date.now() - startTime, error: 'No image URL' };
    }

    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    const duration = Date.now() - startTime;

    const filename = `${OUTPUT_DIR}/${testCase.name}.png`;
    writeFileSync(filename, imageBuffer);

    console.log(`   ✅ Success (${(duration / 1000).toFixed(1)}s, ${(imageBuffer.length / 1024).toFixed(0)} KB)`);

    return { success: true, duration, fileSize: imageBuffer.length };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`   ❌ ${message}`);
    return { success: false, duration: Date.now() - startTime, error: message };
  }
}

async function main() {
  console.log('🗺️  Vector Tile Print Service Test');
  console.log('='.repeat(50));
  console.log('Testing if print service can render vector tile labels');

  const results = [];
  for (const tc of testCases) {
    const result = await runTest(tc);
    results.push({ ...tc, ...result });
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Results Summary');
  console.log('='.repeat(50));

  const vectorTileWorks = results.filter(r => r.useVectorTile && r.success).length > 0;

  console.log(`\nVector Tile Support: ${vectorTileWorks ? '✅ YES' : '❌ NO'}`);

  for (const r of results) {
    const status = r.success ? '✅' : '❌';
    const time = `${(r.duration / 1000).toFixed(1)}s`;
    const size = r.fileSize ? `${(r.fileSize / 1024).toFixed(0)} KB` : 'N/A';
    const errorNote = r.error ? ` (${r.error.slice(0, 50)})` : '';
    console.log(`${status} ${r.name}: ${time}, ${size}${errorNote}`);
  }

  // HTML gallery
  const html = `<!DOCTYPE html>
<html><head><title>Vector Tile Test</title>
<style>
body{font-family:system-ui;margin:2rem;background:#111;color:#eee}
h1{color:#fff}
.summary{background:#222;padding:1rem;border-radius:8px;margin-bottom:2rem}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(500px,1fr));gap:1rem}
.card{background:#222;border-radius:8px;overflow:hidden}
.card img{width:100%;cursor:pointer}
.card-body{padding:1rem}
.card h3{margin:0 0 .5rem;font-size:.9rem}
.card p{margin:0;color:#888;font-size:.8rem}
.success{color:#4ade80}.error{color:#f87171}
</style></head><body>
<h1>🗺️ Vector Tile Print Service Test</h1>
<div class="summary">
<h2>Summary</h2>
<p class="${vectorTileWorks ? 'success' : 'error'}">
Vector Tile Layer Support: <strong>${vectorTileWorks ? 'YES - Labels available!' : 'NO - Use Feature Layer'}</strong>
</p>
</div>
<div class="grid">
${results.map(r => `
<div class="card">
${r.success ? `<a href="${r.name}.png" target="_blank"><img src="${r.name}.png"></a>` : '<div style="padding:2rem;text-align:center;color:#f87171">Failed to render</div>'}
<div class="card-body">
<h3 class="${r.success ? 'success' : 'error'}">${r.success ? '✅' : '❌'} ${r.name}</h3>
<p>${r.description}</p>
<p>⏱️ ${(r.duration / 1000).toFixed(1)}s ${r.fileSize ? `· 📁 ${(r.fileSize / 1024).toFixed(0)} KB` : ''}</p>
${r.error ? `<p class="error">Error: ${r.error}</p>` : ''}
</div></div>`).join('')}
</div></body></html>`;

  writeFileSync(`${OUTPUT_DIR}/index.html`, html);
  console.log(`\n📄 Gallery: ${OUTPUT_DIR}/index.html`);

  if (OPEN_AFTER_RENDER) {
    execSync(`open ${OUTPUT_DIR}`);
  }
}

main().catch(console.error);
