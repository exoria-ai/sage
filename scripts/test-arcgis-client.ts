/**
 * Debug ArcGIS client
 */

import { solanoClient, LAYERS } from '../src/mcp-server/services/arcgis.js';

async function test() {
  console.log('Testing CityBoundary layer...');
  console.log('Layer path:', LAYERS.CITY_BOUNDARIES);

  try {
    const features = await solanoClient.queryByPoint(
      LAYERS.CITY_BOUNDARIES,
      38.2494,
      -122.04,
      'name'
    );
    console.log('Features:', JSON.stringify(features, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
