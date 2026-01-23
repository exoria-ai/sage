/**
 * Core GIS Tool Definitions
 *
 * Geocoding, parcel lookup, zoning, and basic spatial queries.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import { geocodeAddress } from '../geocode';
import { getParcelDetails } from '../parcel';
import { getZoning } from '../zoning';
import { getFloodZone } from '../flood';
import { getFireHazardZone } from '../fire';
import { getSupervisorDistrict } from '../supervisor';
import { getSpecialDistricts } from '../special-districts';
import { getNearby } from '../nearby';

export const geocodeAddressTool = defineTool({
  name: 'geocode_address',
  description: `Convert a street address to coordinates and APN (Assessor's Parcel Number).

INPUT: Street address in Solano County (e.g., "123 Main St, Fairfield, CA")

OUTPUT:
- latitude/longitude (WGS84)
- APN (formatted as XXX-XXX-XXX)
- Normalized address
- Match confidence score

NOTES:
- Searches Solano County address points layer
- Returns closest match if exact not found
- City in address may not match legal jurisdiction (USPS uses nearest city name)`,
  schema: {
    address: z.string().describe('Street address to geocode (include city and state)'),
  },
  handler: async ({ address }) => {
    const result = await geocodeAddress({ address });
    return jsonResponse(result);
  },
});

export const getParcelDetailsTool = defineTool({
  name: 'get_parcel_details',
  description: `Get comprehensive property information for a parcel.

INPUT: Either APN (preferred) or coordinates

OUTPUT:
- Parcel: APN, address, city, acreage, lot sqft, use code/description, subdivision, zoning
- Building: Year built, sqft (total, floors, garage), stories, beds/baths, rooms, HVAC, pool, solar
- Assessment: Roll year, land/improvement/total value, trees & vines, equipment, tax rate area
- Williamson Act: Enrollment status, contract number, prime/nonprime acres (if applicable)
- Flags: Government owned, homeowner exemption
- Links: Property details URL, tax map URL, tax info URL
- Geometry: Parcel boundary polygon

NOTES:
- APN format: XXX-XXX-XXX (with or without dashes)
- Assessed value ≠ market value (Prop 13 limits increases to 2%/year)
- For coordinates, returns parcel containing that point
- Empty/null fields are omitted from response`,
  schema: {
    apn: z.string().optional().describe("Assessor's Parcel Number (format: XXX-XXX-XXX)"),
    latitude: z.coerce.number().optional().describe('Latitude in WGS84 (use if no APN)'),
    longitude: z.coerce.number().optional().describe('Longitude in WGS84 (use if no APN)'),
  },
  handler: async ({ apn, latitude, longitude }) => {
    const result = await getParcelDetails({ apn, latitude, longitude });
    return jsonResponse(result);
  },
});

export const getZoningTool = defineTool({
  name: 'get_zoning',
  description: `Query zoning designation for a location.

CRITICAL - Automatic jurisdiction routing:
1. First checks if location is within city boundaries
2. If inside city → queries that city's zoning layer
3. If unincorporated → queries county zoning layer

Cities in Solano County: Benicia, Dixon, Fairfield, Rio Vista, Suisun City, Vacaville, Vallejo

WATCH OUT: Mailing address city ≠ legal jurisdiction!
Example: "Fairfield, CA 94534" address may be in unincorporated county.

OUTPUT:
- Zoning code (e.g., "R-1", "A-40", "C-2")
- Zoning description
- Jurisdiction (city name or "Unincorporated Solano County")
- Permitted uses summary
- Link to full zoning code

IMPORTANT: Zoning ≠ automatic permission. Permits still required for most development.`,
  schema: {
    apn: z.string().optional().describe('APN to query zoning for'),
    latitude: z.coerce.number().optional().describe('Latitude in WGS84'),
    longitude: z.coerce.number().optional().describe('Longitude in WGS84'),
  },
  handler: async ({ apn, latitude, longitude }) => {
    const result = await getZoning({ apn, latitude, longitude });
    return jsonResponse(result);
  },
});

export const getFloodZoneTool = defineTool({
  name: 'get_flood_zone',
  description: `Query FEMA flood zone designation for a location.

OUTPUT:
- Flood zone code (e.g., "AE", "X", "AO")
- Zone description and flood risk level
- Special Flood Hazard Area (SFHA) status
- Base Flood Elevation (BFE) if applicable
- Insurance implications
- Community panel number

INTERPRETATION:
- Zone A, AE, AH, AO, V, VE = SFHA (high risk, insurance typically required for mortgages)
- Zone X (shaded) = Moderate risk (500-year flood)
- Zone X (unshaded) = Minimal risk
- Zone D = Undetermined

NOTE: Flood insurance may still be advisable even outside SFHA.
LOMA (Letter of Map Amendment) can change zone for specific properties.`,
  schema: {
    apn: z.string().optional().describe('APN to query flood zone for'),
    latitude: z.coerce.number().optional().describe('Latitude in WGS84'),
    longitude: z.coerce.number().optional().describe('Longitude in WGS84'),
  },
  handler: async ({ apn, latitude, longitude }) => {
    const result = await getFloodZone({ apn, latitude, longitude });
    return jsonResponse(result);
  },
});

export const getFireHazardZoneTool = defineTool({
  name: 'get_fire_hazard_zone',
  description: `Query CAL FIRE Fire Hazard Severity Zone (FHSZ) designation.

OUTPUT:
- FHSZ classification: Moderate, High, or Very High
- State Responsibility Area (SRA) vs Local Responsibility Area (LRA)
- Defensible space requirements
- Building code implications (Chapter 7A)
- Vegetation management requirements

INTERPRETATION:
- Very High FHSZ in SRA: Strictest requirements, 100ft defensible space
- High FHSZ: Significant requirements, enhanced building standards
- Moderate FHSZ: Standard fire-safe requirements

IMPORTANT DISTINCTION:
- Fire Hazard = potential fire behavior based on terrain, vegetation, weather
- Fire Risk = probability of fire occurring (includes ignition sources)
FHSZ maps hazard, not risk. High-hazard areas may have low risk if remote.`,
  schema: {
    apn: z.string().optional().describe('APN to query fire hazard zone for'),
    latitude: z.coerce.number().optional().describe('Latitude in WGS84'),
    longitude: z.coerce.number().optional().describe('Longitude in WGS84'),
  },
  handler: async ({ apn, latitude, longitude }) => {
    const result = await getFireHazardZone({ apn, latitude, longitude });
    return jsonResponse(result);
  },
});

export const getSupervisorDistrictTool = defineTool({
  name: 'get_supervisor_district',
  description: `Get Solano County Board of Supervisors district information.

OUTPUT:
- District number (1-5)
- Supervisor name and contact info
- District office location
- District boundaries description

CONTEXT: Board of Supervisors governs unincorporated areas and county-wide services.
For issues in incorporated cities, contact city council instead.`,
  schema: {
    apn: z.string().optional().describe('APN to find supervisor district for'),
    latitude: z.coerce.number().optional().describe('Latitude in WGS84'),
    longitude: z.coerce.number().optional().describe('Longitude in WGS84'),
  },
  handler: async ({ apn, latitude, longitude }) => {
    const result = await getSupervisorDistrict({ apn, latitude, longitude });
    return jsonResponse(result);
  },
});

export const getSpecialDistrictsTool = defineTool({
  name: 'get_special_districts',
  description: `Get all special districts covering a location.

Returns comprehensive district information for a property including:
- Fire district / fire response area
- Water district
- School district
- Garbage/waste service area
- Cemetery district
- Reclamation/flood protection district
- Groundwater Sustainability Agency (GSA)
- Board of Supervisors district

INPUT: Either APN or coordinates

OUTPUT: Object with district details for each applicable district type.

USE CASE: "Who provides services to this property?" or
"What districts does this parcel fall within?"`,
  schema: {
    apn: z.string().optional().describe("Assessor's Parcel Number"),
    latitude: z.coerce.number().optional().describe('Latitude in WGS84'),
    longitude: z.coerce.number().optional().describe('Longitude in WGS84'),
  },
  handler: async ({ apn, latitude, longitude }) => {
    const result = await getSpecialDistricts({ apn, latitude, longitude });
    return jsonResponse(result);
  },
});

export const findNearbyTool = defineTool({
  name: 'find_nearby',
  description: `Find nearby points of interest.

AVAILABLE LAYER TYPES:
- school: Schools (elementary, middle, high)
- park: Parks and recreation areas
- fire_station: Fire stations
- hospital: Hospitals and medical centers
- library: Public libraries
- police: Police stations
- transit: Public transit stops
- community_center: Community centers

INPUT:
- layer_type: Type of POI to search for
- Location: Either APN or coordinates
- radius_feet: Search radius (default: 5280 = 1 mile)
- limit: Max results to return (default: 10)

OUTPUT: List of nearby features with name, type, and distance.

USE CASE: "What schools are within 1 mile?" or
"Find the nearest fire station to this address"`,
  schema: {
    layer_type: z.string().describe('Type of POI: school, park, fire_station, hospital, library, police, transit, community_center'),
    apn: z.string().optional().describe("Assessor's Parcel Number"),
    latitude: z.coerce.number().optional().describe('Latitude in WGS84'),
    longitude: z.coerce.number().optional().describe('Longitude in WGS84'),
    radius_feet: z.coerce.number().optional().describe('Search radius in feet (default: 5280 = 1 mile)'),
    limit: z.coerce.number().optional().describe('Maximum results to return (default: 10)'),
  },
  handler: async ({ layer_type, apn, latitude, longitude, radius_feet, limit }) => {
    const result = await getNearby({ layer_type, apn, latitude, longitude, radius_feet, limit });
    return jsonResponse(result);
  },
});

/** All core GIS tools */
export const gisCoreTools = [
  geocodeAddressTool,
  getParcelDetailsTool,
  getZoningTool,
  getFloodZoneTool,
  getFireHazardZoneTool,
  getSupervisorDistrictTool,
  getSpecialDistrictsTool,
  findNearbyTool,
];
