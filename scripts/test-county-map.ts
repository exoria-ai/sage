/**
 * Test script for county map generation
 */
import { captureMapView } from '../lib/tools/capture-map';
import { writeFile } from 'fs/promises';
import { join } from 'path';

async function main() {
  console.log('Testing county map generation...\n');

  // Test 1: County extent with boundaries
  console.log('Test 1: County extent with boundaries');
  const result = await captureMapView({
    extent: 'county',
    boundaries: {
      showCounty: true,
      showCities: true,
    },
    basemap: 'streets',
    width: 1200,
    height: 900,
  });

  if (result.success && result.imageBase64) {
    const outputPath = join(__dirname, '../test-output/county-map.png');
    await writeFile(outputPath, Buffer.from(result.imageBase64, 'base64'));
    console.log(`✓ Success! Map saved to: ${outputPath}`);
    console.log(`  Center: ${result.center?.latitude}, ${result.center?.longitude}`);
    console.log(`  Zoom: ${result.zoom}`);
    console.log(`  Dimensions: ${result.width}x${result.height}`);
  } else {
    console.log(`✗ Failed: ${result.message}`);
    console.log(`  Error type: ${result.error_type}`);
    console.log(`  Suggestion: ${result.suggestion}`);
  }
}

main().catch(console.error);
