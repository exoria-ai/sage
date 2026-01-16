/**
 * Debug city boundary query
 */

import axios from 'axios';

const lat = 38.2494;
const lon = -122.04;

const geometry = JSON.stringify({
  x: lon,
  y: lat,
  spatialReference: { wkid: 4326 },
});

console.log('Geometry JSON:', geometry);
console.log('Encoded:', encodeURIComponent(geometry));

const url = `https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services/CityBoundary/FeatureServer/2/query?where=1%3D1&geometry=${encodeURIComponent(geometry)}&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&inSR=4326&outFields=name&returnGeometry=false&f=json&outSR=4326`;

console.log('Full URL:', url);

async function test() {
  const response = await axios.get(url);
  console.log('Response:', JSON.stringify(response.data, null, 2));
}

test().catch(console.error);
