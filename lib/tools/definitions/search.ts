/**
 * Search Tool Definitions
 *
 * Parcel search and buffer queries.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import { searchParcels } from '../search-parcels';
import { getParcelsInBuffer } from '../parcels-in-buffer';

export const searchParcelsTool = defineTool({
  name: 'search_parcels',
  description: `Search for parcels matching criteria with aggregations.

Enables queries like "all agricultural parcels in District 3" or "vacant lots over 5 acres".

SEARCH CRITERIA (provide one or more):
- zoning: Zone code (e.g., "A-40", "R-1", "C-2")
- use_description: Property use (e.g., "SINGLE FAMILY RESIDENCE", "AGRICULTURAL")
- min_acres / max_acres: Acreage range
- min_value / max_value: Assessed value range
- year_built_after / year_built_before: Building age
- has_pool / has_solar: Boolean amenities
- city: Tax area city (e.g., "FAIRFIELD", "VALLEJO")
- williamson_act: Agricultural preserve status

OUTPUT:
- total_count: Number of matching parcels
- aggregations: Total acres, avg acres, total value, counts by use type
- sample_parcels: Up to 5 example parcels with key details

NOTE: For supervisor district filtering, first query the district boundaries
and then filter by city or use spatial queries.`,
  schema: {
    criteria: z.object({
      zoning: z.string().optional().describe('Zone code to match (e.g., "A-40", "R-1")'),
      use_code: z.string().optional().describe('Property use code'),
      use_description: z.string().optional().describe('Property use description to match'),
      min_acres: z.number().optional().describe('Minimum acreage'),
      max_acres: z.number().optional().describe('Maximum acreage'),
      min_value: z.number().optional().describe('Minimum total assessed value'),
      max_value: z.number().optional().describe('Maximum total assessed value'),
      year_built_after: z.number().optional().describe('Built after this year'),
      year_built_before: z.number().optional().describe('Built before this year'),
      has_pool: z.boolean().optional().describe('Has pool'),
      has_solar: z.boolean().optional().describe('Has solar'),
      city: z.string().optional().describe('Tax area city name'),
      williamson_act: z.boolean().optional().describe('Under Williamson Act contract'),
    }).describe('Search criteria'),
    include_samples: z.boolean().optional().describe('Include sample parcels (default: true)'),
    sample_limit: z.number().optional().describe('Number of sample parcels (default: 5)'),
  },
  handler: async ({ criteria, include_samples, sample_limit }) => {
    const result = await searchParcels({ criteria, include_samples, sample_limit });
    return jsonResponse(result);
  },
});

export const getParcelsInBufferTool = defineTool({
  name: 'get_parcels_in_buffer',
  description: `Find all parcels within a specified radius of a location or parcel.

PRIMARY USE CASE: Property owner notification lists for discretionary permits.
California jurisdictions typically require notifying owners within 300-1000 feet
of a project site for use permits, variances, subdivisions, and rezonings.

**IMPORTANT: CHOOSING THE RIGHT TOOL**

For VISUALIZATION (buffer map image):
  → Use render_map with buffer parameter directly. Do NOT call this tool first.
  → render_map({ buffer: { apn: "123-456-789", radius_feet: 300 } })
  → This is much more efficient - the map renderer handles spatial queries internally.

For NOTIFICATION LISTS (owner/address data):
  → Use this tool to get structured parcel data.
  → Results are limited to 250 parcels to avoid context exhaustion.
  → For larger buffers with 250+ parcels, consider smaller radius or just use render_map.

INPUT (provide ONE):
- apn: Source parcel APN - buffer measured from parcel boundary
- latitude/longitude: Point location - buffer measured from point

OPTIONS:
- radius_feet: Buffer distance (default: 300)
  Common values: 300 (typical minimum), 500, 1000 (large projects)
- include_source: Include the source parcel in results (default: false)

OUTPUT for each parcel:
- apn: Assessor's Parcel Number
- situs_address: Property street address
- owner_name: Owner of record (if available in public data)
- city: City/jurisdiction
- acreage: Parcel size
- distance_feet: Distance from source (0 = adjacent/touching)
- centroid: Lat/lon of parcel center

NOTE: Distance is measured from source parcel boundary (if APN provided)
or from source point (if coordinates provided). Parcels are included if
any part of their boundary falls within the buffer radius.

LIMITS: Maximum 250 parcels returned. If truncated, total_parcels shows full count.`,
  schema: {
    apn: z.string().optional().describe("Source parcel APN - buffer measured from this parcel's boundary"),
    latitude: z.number().optional().describe('Source point latitude (use if no APN)'),
    longitude: z.number().optional().describe('Source point longitude (use if no APN)'),
    radius_feet: z.number().optional().describe('Buffer radius in feet (default: 300)'),
    include_source: z.boolean().optional().describe('Include source parcel in results (default: false)'),
  },
  handler: async ({ apn, latitude, longitude, radius_feet, include_source }) => {
    const result = await getParcelsInBuffer({ apn, latitude, longitude, radius_feet, include_source });
    return jsonResponse(result);
  },
});

/** All search tools */
export const searchTools = [searchParcelsTool, getParcelsInBufferTool];
