#!/usr/bin/env npx tsx
/**
 * Test script for render_map additionalLayers and extentLayer features
 *
 * Usage: npx tsx scripts/test-additional-layers.ts
 */

import { renderMap } from '../lib/tools/render-map';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

const SOLANO_AGOL_BASE = 'https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services';
const OUTPUT_DIR = 'test-output/additional-layers';

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

function saveImage(name: string, base64: string) {
  const outPath = `${OUTPUT_DIR}/${name}.png`;
  writeFileSync(outPath, Buffer.from(base64, 'base64'));
  return outPath;
}

async function runTests() {
  console.log('Testing render_map additionalLayers and extentLayer features\n');
  console.log('='.repeat(70));

  // Test 1: additionalLayers with Zoning layer
  console.log('\n🧪 Test 1: Zoning layer overlay on a parcel');
  console.log('-'.repeat(70));
  try {
    const result1 = await renderMap({
      apn: '008-013-001', // Known working APN
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/SolanoCountyZoning_092322/FeatureServer/4`,
          title: 'County Zoning',
          opacity: 0.6,
        },
      ],
      layers: { aerial2025: true },
    });

    if (result1.success) {
      console.log('✅ Success!');
      console.log(`   Center: ${result1.center?.latitude}, ${result1.center?.longitude}`);
      console.log(`   Zoom: ${result1.zoom}`);
      console.log(`   Image URL: ${result1.imageUrl}`);
      if (result1.imageBase64) {
        const outPath = saveImage('test1-zoning-overlay', result1.imageBase64);
        console.log(`   Saved: ${outPath}`);
      }
    } else {
      console.log('❌ Failed:', result1.message);
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  // Test 2: Multiple additionalLayers (Fire Hazard + Flood)
  console.log('\n🧪 Test 2: Multiple overlay layers (Fire Hazard + Flood Zones)');
  console.log('-'.repeat(70));
  try {
    const result2 = await renderMap({
      center: { latitude: 38.248, longitude: -122.041 }, // Rural Solano area
      zoom: 13,
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone/FeatureServer/0`,
          title: 'Fire Hazard Severity',
          opacity: 0.5,
        },
        {
          url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28',
          title: 'FEMA Flood Zones',
          opacity: 0.5,
          layerType: 'ArcGISFeatureLayer',
        },
      ],
      basemap: 'imagery-hybrid',
    });

    if (result2.success) {
      console.log('✅ Success!');
      console.log(`   Center: ${result2.center?.latitude}, ${result2.center?.longitude}`);
      console.log(`   Zoom: ${result2.zoom}`);
      console.log(`   Image URL: ${result2.imageUrl}`);
      if (result2.imageBase64) {
        const outPath = saveImage('test2-fire-flood-overlay', result2.imageBase64);
        console.log(`   Saved: ${outPath}`);
      }
    } else {
      console.log('❌ Failed:', result2.message);
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  // Test 3: extentLayer - Use Fire Stations extent
  console.log('\n🧪 Test 3: extentLayer - Zoom to Fire Stations extent');
  console.log('-'.repeat(70));
  try {
    const result3 = await renderMap({
      extentLayer: {
        url: `${SOLANO_AGOL_BASE}/Fire_Stations/FeatureServer/0`,
        padding: 0.1,
      },
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/Fire_Stations/FeatureServer/0`,
          title: 'Fire Stations',
        },
        {
          url: `${SOLANO_AGOL_BASE}/FireResponse_Boundary/FeatureServer/0`,
          title: 'Fire Response Areas',
          opacity: 0.4,
        },
      ],
      layers: { cityBoundary: true, countyBoundary: true },
    });

    if (result3.success) {
      console.log('✅ Success!');
      console.log(`   Center: ${result3.center?.latitude}, ${result3.center?.longitude}`);
      console.log(`   Zoom: ${result3.zoom}`);
      console.log(`   Image URL: ${result3.imageUrl}`);
      if (result3.imageBase64) {
        const outPath = saveImage('test3-fire-stations-extent', result3.imageBase64);
        console.log(`   Saved: ${outPath}`);
      }
    } else {
      console.log('❌ Failed:', result3.message);
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  // Test 4: extentLayer with where clause - Filter to specific city
  console.log('\n🧪 Test 4: extentLayer with where clause (Fairfield schools)');
  console.log('-'.repeat(70));
  try {
    const result4 = await renderMap({
      extentLayer: {
        url: `${SOLANO_AGOL_BASE}/Schools/FeatureServer/0`,
        where: "CITY='FAIRFIELD'",
        padding: 0.15,
      },
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/Schools/FeatureServer/0`,
          title: 'Schools',
          where: "CITY='FAIRFIELD'",
        },
      ],
      layers: { cityBoundary: true },
      basemap: 'navigation',
    });

    if (result4.success) {
      console.log('✅ Success!');
      console.log(`   Center: ${result4.center?.latitude}, ${result4.center?.longitude}`);
      console.log(`   Zoom: ${result4.zoom}`);
      console.log(`   Image URL: ${result4.imageUrl}`);
      if (result4.imageBase64) {
        const outPath = saveImage('test4-fairfield-schools', result4.imageBase64);
        console.log(`   Saved: ${outPath}`);
      }
    } else {
      console.log('❌ Failed:', result4.message);
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  // Test 5: Complex scenario - BOS Districts with political overlays
  console.log('\n🧪 Test 5: Board of Supervisors Districts overlay');
  console.log('-'.repeat(70));
  try {
    const result5 = await renderMap({
      extent: 'county',
      additionalLayers: [
        {
          url: `${SOLANO_AGOL_BASE}/BOS_District_Boundaries_2021/FeatureServer/0`,
          title: 'BOS Districts',
          opacity: 0.6,
        },
      ],
      layers: { cityBoundary: true, countyBoundary: true },
    });

    if (result5.success) {
      console.log('✅ Success!');
      console.log(`   Center: ${result5.center?.latitude}, ${result5.center?.longitude}`);
      console.log(`   Zoom: ${result5.zoom}`);
      console.log(`   Image URL: ${result5.imageUrl}`);
      if (result5.imageBase64) {
        const outPath = saveImage('test5-bos-districts', result5.imageBase64);
        console.log(`   Saved: ${outPath}`);
      }
    } else {
      console.log('❌ Failed:', result5.message);
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  console.log('\n' + '='.repeat(70));
  console.log('Tests complete! Check test-output/additional-layers/ directory for generated images.');
}

runTests().catch(console.error);
