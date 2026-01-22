/**
 * Test script for map rendering quality
 * Run with: npx tsx scripts/test-map-quality.ts
 *
 * Tests various parcel types and scenarios to evaluate map quality
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { captureMapView } from '../lib/tools/capture-map';

const outputDir = '/Users/ryan/Development/sage/test-output';

interface TestCase {
  name: string;
  description: string;
  options: Parameters<typeof captureMapView>[0];
}

const testCases: TestCase[] = [
  // Test 1: Government building (large parcel) - the courthouse
  {
    name: '01-courthouse-aerial',
    description: '675 Texas St - Large government complex (aerial)',
    options: {
      apn: '003-025-1020',
      basemap: 'aerial',
    },
  },
  {
    name: '02-courthouse-streets',
    description: '675 Texas St - Large government complex (streets)',
    options: {
      apn: '003-025-1020',
      basemap: 'streets',
    },
  },

  // Test 2: Typical residential parcel
  {
    name: '03-residential-aerial',
    description: 'Residential parcel in Fairfield (aerial)',
    options: {
      apn: '003-102-1010',
      basemap: 'aerial',
    },
  },
  {
    name: '04-residential-streets',
    description: 'Residential parcel in Fairfield (streets)',
    options: {
      apn: '003-102-1010',
      basemap: 'streets',
    },
  },

  // Test 3: Small dense residential area - multiple parcels
  {
    name: '05-neighborhood-aerial',
    description: 'Neighborhood view with multiple parcels',
    options: {
      apn: '003-102-1020',
      zoom: 18,
      basemap: 'aerial',
    },
  },

  // Test 4: Rural/agricultural parcel (northern Solano near Dixon)
  {
    name: '06-rural-aerial',
    description: 'Rural parcel near Dixon (aerial)',
    options: {
      apn: '013-364-2030',
      basemap: 'aerial',
      zoom: 16,
    },
  },
  {
    name: '07-rural-streets',
    description: 'Rural parcel near Dixon (streets)',
    options: {
      apn: '013-364-2030',
      basemap: 'streets',
      zoom: 16,
    },
  },

  // Test 5: Buffer visualization
  {
    name: '08-buffer-300ft',
    description: '300 ft buffer around courthouse',
    options: {
      buffer: {
        apn: '003-025-1020',
        radius_feet: 300,
      },
    },
  },

  // Test 6: Multiple highlighted parcels
  {
    name: '09-multi-parcel',
    description: 'Multiple parcels highlighted',
    options: {
      apns: ['003-102-1010', '003-102-1020', '003-102-1030'],
      center: { latitude: 38.256, longitude: -122.060 },
      zoom: 18,
      basemap: 'aerial',
    },
  },

  // Test 7: Coordinates only (no parcel)
  {
    name: '10-coords-only',
    description: 'Map centered on coordinates only',
    options: {
      center: { latitude: 38.25, longitude: -122.04 },
      zoom: 16,
      basemap: 'streets',
      showParcel: true,
    },
  },

  // Test 8: Wide view for context
  {
    name: '11-wide-view',
    description: 'Zoomed out view showing more context',
    options: {
      apn: '003-025-1020',
      zoom: 15,
      basemap: 'streets',
    },
  },
];

async function runTests() {
  console.log('Map Quality Test Suite\n');
  console.log('='.repeat(60));

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const results: { name: string; success: boolean; time: number; error?: string }[] = [];

  for (const test of testCases) {
    console.log(`\nTest: ${test.name}`);
    console.log(`Description: ${test.description}`);

    const startTime = Date.now();

    try {
      const result = await captureMapView(test.options);
      const elapsed = Date.now() - startTime;

      if (!result.success) {
        console.log(`  ❌ FAILED: ${result.message}`);
        results.push({ name: test.name, success: false, time: elapsed, error: result.message });
        continue;
      }

      // Save the image
      const outputPath = `${outputDir}/${test.name}.png`;
      const imageBuffer = Buffer.from(result.imageBase64!, 'base64');
      writeFileSync(outputPath, imageBuffer);

      console.log(`  ✅ Success (${elapsed}ms)`);
      console.log(`     Center: ${result.center?.latitude.toFixed(5)}, ${result.center?.longitude.toFixed(5)}`);
      console.log(`     Size: ${result.width}x${result.height}, Zoom: ${result.zoom}`);
      console.log(`     Saved: ${outputPath}`);

      results.push({ name: test.name, success: true, time: elapsed });

    } catch (error) {
      const elapsed = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.log(`  ❌ ERROR: ${errorMsg}`);
      results.push({ name: test.name, success: false, time: elapsed, error: errorMsg });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const avgTime = Math.round(results.reduce((sum, r) => sum + r.time, 0) / results.length);

  console.log(`Passed: ${passed}/${results.length}`);
  console.log(`Failed: ${failed}/${results.length}`);
  console.log(`Avg time: ${avgTime}ms`);

  if (failed > 0) {
    console.log('\nFailed tests:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.name}: ${r.error}`);
    });
  }

  console.log(`\nView all outputs: open ${outputDir}`);
}

runTests().catch(console.error);
