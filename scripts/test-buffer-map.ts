/**
 * Test script for buffer map rendering
 * Run with: npx tsx scripts/test-buffer-map.ts
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { renderMap } from '../lib/tools/render-map';

async function testBufferMap() {
  console.log('Testing buffer map rendering...\n');

  // Ensure output directory exists
  const outputDir = '/Users/ryan/Development/sage/test-output';
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Test case: 300 ft buffer around 675 Texas St, Fairfield (the courthouse)
  // This large parcel tests the zoom calculation that accounts for parcel extent
  const testApn = '003-025-1020';
  const radiusFeet = 300;

  console.log(`Source APN: ${testApn}`);
  console.log(`Buffer radius: ${radiusFeet} ft`);
  console.log('Rendering...\n');

  const result = await renderMap({
    buffer: {
      apn: testApn,
      radius_feet: radiusFeet,
    },
  });

  if (!result.success) {
    console.error('Render failed:', result.message);
    console.error('Suggestion:', result.suggestion);
    process.exit(1);
  }

  // Save the image
  const outputPath = `${outputDir}/buffer-map.png`;
  const imageBuffer = Buffer.from(result.imageBase64!, 'base64');
  writeFileSync(outputPath, imageBuffer);

  console.log('Success!');
  console.log(`Center: ${result.center?.latitude}, ${result.center?.longitude}`);
  console.log(`Dimensions: ${result.width}x${result.height}`);
  console.log(`Zoom: ${result.zoom}`);
  console.log(`\nImage saved to: ${outputPath}`);
  console.log('\nOpen with: open ' + outputPath);
}

testBufferMap().catch(console.error);
