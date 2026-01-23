/**
 * Directions Tool Definitions
 *
 * Tools for routing and travel time calculations.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import { getDirections, getTravelTime } from '../directions';

const locationSchema = z.object({
  address: z.string().optional().describe('Street address to geocode'),
  latitude: z.coerce.number().optional().describe('Latitude in WGS84'),
  longitude: z.coerce.number().optional().describe('Longitude in WGS84'),
  apn: z.string().optional().describe("Assessor's Parcel Number (future support)"),
});

const locationSchemaSimple = z.object({
  address: z.string().optional().describe('Street address to geocode'),
  latitude: z.coerce.number().optional().describe('Latitude in WGS84'),
  longitude: z.coerce.number().optional().describe('Longitude in WGS84'),
});

export const getDirectionsTool = defineTool({
  name: 'get_directions',
  description: `Get driving directions between two locations using ESRI World Route Service.

Uses simple routing (0.005 credits per route) - essentially free.
Requires ARCGIS_API_KEY environment variable.

INPUT - Origin and Destination (provide one of):
- address: Street address (will be geocoded)
- latitude/longitude: Direct coordinates
- apn: Assessor's Parcel Number (future support)

OPTIONS:
- return_geometry: Include route polyline for map display (default: false)

OUTPUT:
- origin/destination: Resolved addresses and coordinates
- summary: Total distance (miles), time (minutes), human-readable time text
- directions: Turn-by-turn instructions with distance/time per step
- map_url: Link to view route on map (when implemented)
- route_geometry: Polyline paths for map rendering (if return_geometry=true)

USE CASES:
- "How do I get from City Hall to the County Courthouse?"
- "What's the drive time from 123 Main St to Travis AFB?"
- "Give me directions from my parcel to the nearest fire station"

NOTE: This tool calculates driving routes on public roads.
For walking, cycling, or other modes, route times may vary.`,
  schema: {
    origin: locationSchema.describe('Starting location'),
    destination: locationSchema.describe('Ending location'),
    return_geometry: z.boolean().optional().describe('Include route polyline for map display (default: false)'),
  },
  handler: async ({ origin, destination, return_geometry }) => {
    const result = await getDirections({ origin, destination, return_geometry });
    return jsonResponse(result);
  },
});

export const getTravelTimeTool = defineTool({
  name: 'get_travel_time',
  description: `Get travel time and distance between two locations (no turn-by-turn directions).

More concise output than get_directions - use when you just need time/distance.

INPUT - Origin and Destination (provide one of):
- address: Street address (will be geocoded)
- latitude/longitude: Direct coordinates

OUTPUT:
- distance_miles: Total distance
- time_minutes: Total travel time
- time_text: Human-readable duration (e.g., "25 minutes", "1 hour 15 minutes")

USE CASES:
- "How far is it from Fairfield to Vacaville?"
- "What's the commute time from Dixon to Vallejo?"`,
  schema: {
    origin: locationSchemaSimple.describe('Starting location'),
    destination: locationSchemaSimple.describe('Ending location'),
  },
  handler: async ({ origin, destination }) => {
    const result = await getTravelTime({ origin, destination });
    return jsonResponse(result);
  },
});

/** All directions tools */
export const directionsTools = [getDirectionsTool, getTravelTimeTool];
