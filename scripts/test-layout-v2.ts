#!/usr/bin/env npx tsx
/**
 * Layout Template Test v2
 *
 * Uses symbology matching the SAGE WebMap design (black parcel outlines)
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const OUTPUT_DIR = 'test-output/layout-v2';
const OPEN_AFTER_RENDER = process.argv.includes('--open');

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PRINT_SERVICE_URL =
  'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute';

// Test location: Solano County Government Center area
const TEST_CENTER = { lat: 38.2566, lon: -122.0530 };
const TEST_APN = '0030251020';

// Symbology matching your WebMap design
const PARCEL_SYMBOL = {
  type: 'esriSFS',
  style: 'esriSFSNull', // Transparent fill
  outline: {
    type: 'esriSLS',
    style: 'esriSLSSolid',
    color: [0, 0, 0, 255], // Black outline (matching your WebMap)
    width: 1.5,
  },
};

const HIGHLIGHT_SYMBOL = {
  type: 'esriSFS',
  style: 'esriSFSSolid',
  color: [59, 130, 246, 77], // Blue 30% opacity
  outline: {
    type: 'esriSLS',
    style: 'esriSLSSolid',
    color: [59, 130, 246, 255], // Blue solid
    width: 3,
  },
};

function buildWebMap(options: {
  width: number;
  height: number;
  zoom?: number;
  useCustomSymbology?: boolean;
}) {
  const { width, height, zoom = 17, useCustomSymbology = true } = options;

  const degreesPerPixelX = 360 / (256 * Math.pow(2, zoom));
  const degreesPerPixelY = degreesPerPixelX * Math.cos((TEST_CENTER.lat * Math.PI) / 180);
  const halfWidth = (width / 2) * degreesPerPixelX;
  const halfHeight = (height / 2) * degreesPerPixelY;

  const parcelsLayer: Record<string, unknown> = {
    id: 'parcels',
    title: 'Parcels',
    url: 'https://services2.arcgis.com/SCn6czzcqKAFwdGU/arcgis/rest/services/Parcels_Public_Aumentum/FeatureServer/0',
    visibility: true,
    opacity: 1,
    layerType: 'ArcGISFeatureLayer',
  };

  // Add custom symbology if requested
  if (useCustomSymbology) {
    parcelsLayer.layerDefinition = {
      drawingInfo: {
        renderer: {
          type: 'simple',
          symbol: PARCEL_SYMBOL,
        },
      },
    };
  }

  const highlightLayer = {
    id: 'parcels-highlight',
    title: 'Selected Parcel',
    url: 'https://services2.arcgis.com/SCn6czzcqKAFwdGU/arcgis/rest/services/Parcels_Public_Aumentum/FeatureServer/0',
    visibility: true,
    opacity: 1,
    layerType: 'ArcGISFeatureLayer',
    layerDefinition: {
      definitionExpression: `parcelid='${TEST_APN}'`,
      drawingInfo: {
        renderer: {
          type: 'simple',
          symbol: HIGHLIGHT_SYMBOL,
        },
      },
    },
  };

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
    operationalLayers: [parcelsLayer, highlightLayer],
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
  width: number;
  height: number;
  useCustomSymbology: boolean;
  layoutOptions?: Record<string, unknown>;
}

const testCases: TestCase[] = [
  {
    name: '01-map-only-service-default',
    description: 'MAP_ONLY with service default symbology (lime green)',
    layoutTemplate: 'MAP_ONLY',
    width: 1200,
    height: 800,
    useCustomSymbology: false,
  },
  {
    name: '02-map-only-custom-symbology',
    description: 'MAP_ONLY with custom symbology (black outlines)',
    layoutTemplate: 'MAP_ONLY',
    width: 1200,
    height: 800,
    useCustomSymbology: true,
  },
  {
    name: '03-letter-landscape-custom',
    description: 'Letter Landscape with custom symbology + scale bar',
    layoutTemplate: 'Letter ANSI A Landscape',
    width: 1200,
    height: 800,
    useCustomSymbology: true,
    layoutOptions: {
      titleText: 'Solano County Parcel Map',
      authorText: 'SAGE GIS',
      scalebarUnit: 'Feet',
    },
  },
  {
    name: '04-a4-landscape-custom',
    description: 'A4 Landscape with custom symbology + scale bar',
    layoutTemplate: 'A4 Landscape',
    width: 1200,
    height: 800,
    useCustomSymbology: true,
    layoutOptions: {
      titleText: 'Property Analysis',
      scalebarUnit: 'Feet',
    },
  },
  {
    name: '05-larger-map-only',
    description: 'MAP_ONLY 1800x1200 with custom symbology',
    layoutTemplate: 'MAP_ONLY',
    width: 1800,
    height: 1200,
    useCustomSymbology: true,
  },
  {
    name: '06-tabloid-custom',
    description: 'Tabloid with custom symbology (largest)',
    layoutTemplate: 'Tabloid ANSI B Landscape',
    width: 1200,
    height: 800,
    useCustomSymbology: true,
    layoutOptions: {
      titleText: 'Detailed Parcel Map',
      scalebarUnit: 'Feet',
    },
  },
];

async function runTest(testCase: TestCase): Promise<{
  success: boolean;
  duration: number;
  fileSize?: number;
}> {
  const startTime = Date.now();
  console.log(`\n📍 ${testCase.name}: ${testCase.description}`);

  try {
    const webMapJson = buildWebMap({
      width: testCase.width,
      height: testCase.height,
      useCustomSymbology: testCase.useCustomSymbology,
    });

    const params = new URLSearchParams({
      Web_Map_as_JSON: JSON.stringify(webMapJson),
      Format: 'PNG32',
      Layout_Template: testCase.layoutTemplate,
      f: 'json',
    });

    if (testCase.layoutOptions) {
      params.set('Layout_Options', JSON.stringify(testCase.layoutOptions));
    }

    const response = await fetch(PRINT_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      console.log(`   ❌ Error: ${data.error.message}`);
      return { success: false, duration: Date.now() - startTime };
    }

    const imageUrl = data.results?.[0]?.value?.url;
    if (!imageUrl) {
      console.log(`   ❌ No image URL`);
      return { success: false, duration: Date.now() - startTime };
    }

    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    const duration = Date.now() - startTime;

    const filename = `${OUTPUT_DIR}/${testCase.name}.png`;
    writeFileSync(filename, imageBuffer);

    console.log(`   ✅ Success (${(duration/1000).toFixed(1)}s, ${(imageBuffer.length/1024).toFixed(0)} KB)`);

    return { success: true, duration, fileSize: imageBuffer.length };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`   ❌ ${message}`);
    return { success: false, duration: Date.now() - startTime };
  }
}

async function main() {
  console.log('🗺️  Layout Template Test v2 - Custom Symbology');
  console.log('='.repeat(50));

  const results = [];
  for (const tc of testCases) {
    const result = await runTest(tc);
    results.push({ ...tc, ...result });
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Results');
  console.log('='.repeat(50));

  for (const r of results) {
    const status = r.success ? '✅' : '❌';
    const time = `${(r.duration/1000).toFixed(1)}s`;
    const size = r.fileSize ? `${(r.fileSize/1024).toFixed(0)} KB` : 'N/A';
    console.log(`${status} ${r.name}: ${time}, ${size}`);
  }

  // HTML gallery
  const html = `<!DOCTYPE html>
<html><head><title>Layout Test v2</title>
<style>
body{font-family:system-ui;margin:2rem;background:#111;color:#eee}
h1{color:#fff}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(500px,1fr));gap:1rem}
.card{background:#222;border-radius:8px;overflow:hidden}
.card img{width:100%;cursor:pointer}
.card-body{padding:1rem}
.card h3{margin:0 0 .5rem;font-size:.9rem}
.card p{margin:0;color:#888;font-size:.8rem}
</style></head><body>
<h1>🗺️ Layout Template Test v2</h1>
<p>Comparing service default vs custom symbology (black parcel outlines)</p>
<div class="grid">
${results.filter(r=>r.success).map(r=>`
<div class="card">
<a href="${r.name}.png" target="_blank"><img src="${r.name}.png"></a>
<div class="card-body">
<h3>${r.name}</h3>
<p>${r.description}</p>
<p>⏱️ ${(r.duration/1000).toFixed(1)}s · 📁 ${r.fileSize?(r.fileSize/1024).toFixed(0)+' KB':'N/A'}</p>
</div></div>`).join('')}
</div></body></html>`;

  writeFileSync(`${OUTPUT_DIR}/index.html`, html);
  console.log(`\n📄 Gallery: ${OUTPUT_DIR}/index.html`);

  if (OPEN_AFTER_RENDER) {
    execSync(`open ${OUTPUT_DIR}`);
  }
}

main().catch(console.error);
