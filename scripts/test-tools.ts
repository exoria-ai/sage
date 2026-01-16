/**
 * Test script for SAGE tools
 *
 * Tests each tool against live Solano County GIS services.
 * Run with: npx tsx scripts/test-tools.ts
 */

import { geocodeAddress } from '../src/mcp-server/tools/geocode.js';
import { getParcelDetails } from '../src/mcp-server/tools/parcel.js';
import { getZoning } from '../src/mcp-server/tools/zoning.js';
import { getFloodZone } from '../src/mcp-server/tools/flood.js';
import { getFireHazardZone } from '../src/mcp-server/tools/fire.js';
import { getSupervisorDistrict } from '../src/mcp-server/tools/supervisor.js';

async function runTests() {
  console.log('='.repeat(60));
  console.log('SAGE Tool Tests - Live GIS Services');
  console.log('='.repeat(60));
  console.log();

  // Test address in Fairfield (known location)
  const testAddress = '600 Union Ave, Fairfield, CA';
  // Approximate coordinates for Fairfield area
  const testLat = 38.2494;
  const testLon = -122.0400;

  // Test 1: Geocode Address
  console.log('TEST 1: geocode_address');
  console.log('-'.repeat(40));
  try {
    const geocodeResult = await geocodeAddress({ address: testAddress });
    console.log('Input:', testAddress);
    console.log('Result:', JSON.stringify(geocodeResult, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
  console.log();

  // Test 2: Get Parcel Details (by coordinates)
  console.log('TEST 2: get_parcel_details (by coordinates)');
  console.log('-'.repeat(40));
  try {
    const parcelResult = await getParcelDetails({ latitude: testLat, longitude: testLon });
    console.log('Input: lat=', testLat, 'lon=', testLon);
    console.log('Result:', JSON.stringify(parcelResult, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
  console.log();

  // Test 3: Get Zoning
  console.log('TEST 3: get_zoning (by coordinates)');
  console.log('-'.repeat(40));
  try {
    const zoningResult = await getZoning({ latitude: testLat, longitude: testLon });
    console.log('Input: lat=', testLat, 'lon=', testLon);
    console.log('Result:', JSON.stringify(zoningResult, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
  console.log();

  // Test 4: Get Flood Zone
  console.log('TEST 4: get_flood_zone (by coordinates)');
  console.log('-'.repeat(40));
  try {
    const floodResult = await getFloodZone({ latitude: testLat, longitude: testLon });
    console.log('Input: lat=', testLat, 'lon=', testLon);
    console.log('Result:', JSON.stringify(floodResult, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
  console.log();

  // Test 5: Get Fire Hazard Zone
  console.log('TEST 5: get_fire_hazard_zone (by coordinates)');
  console.log('-'.repeat(40));
  try {
    const fireResult = await getFireHazardZone({ latitude: testLat, longitude: testLon });
    console.log('Input: lat=', testLat, 'lon=', testLon);
    console.log('Result:', JSON.stringify(fireResult, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
  console.log();

  // Test 6: Get Supervisor District
  console.log('TEST 6: get_supervisor_district (by coordinates)');
  console.log('-'.repeat(40));
  try {
    const supervisorResult = await getSupervisorDistrict({ latitude: testLat, longitude: testLon });
    console.log('Input: lat=', testLat, 'lon=', testLon);
    console.log('Result:', JSON.stringify(supervisorResult, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
  console.log();

  console.log('='.repeat(60));
  console.log('Tests complete');
  console.log('='.repeat(60));
}

runTests().catch(console.error);
