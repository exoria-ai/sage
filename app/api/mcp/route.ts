/**
 * SAGE MCP Route Handler
 *
 * Provides Streamable HTTP transport for MCP tools.
 * Deploy to Vercel for remote MCP server access.
 */

import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';
import { geocodeAddress } from '@/lib/tools/geocode';
import { getParcelDetails } from '@/lib/tools/parcel';
import { getZoning } from '@/lib/tools/zoning';
import { getFloodZone } from '@/lib/tools/flood';
import { getFireHazardZone } from '@/lib/tools/fire';
import { getSupervisorDistrict } from '@/lib/tools/supervisor';

const handler = createMcpHandler(
  (server) => {
    // Geocode Address Tool
    server.tool(
      'geocode_address',
      `Convert a street address to coordinates and APN (Assessor's Parcel Number).

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
      {
        address: z.string().describe('Street address to geocode (include city and state)'),
      },
      async ({ address }) => {
        const result = await geocodeAddress({ address });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Parcel Details Tool
    server.tool(
      'get_parcel_details',
      `Get comprehensive property information for a parcel.

INPUT: Either APN (preferred) or coordinates

OUTPUT:
- Basic: APN, situs address, acreage, legal description
- Assessment: Assessed land/improvement values, base year (Prop 13)
- Owner: Owner name (if public record)
- Geometry: Parcel boundary coordinates

NOTES:
- APN format: XXX-XXX-XXX (with or without dashes)
- Assessed value ≠ market value (Prop 13 limits increases to 2%/year)
- For coordinates, returns parcel containing that point`,
      {
        apn: z.string().optional().describe("Assessor's Parcel Number (format: XXX-XXX-XXX)"),
        latitude: z.number().optional().describe('Latitude in WGS84 (use if no APN)'),
        longitude: z.number().optional().describe('Longitude in WGS84 (use if no APN)'),
      },
      async ({ apn, latitude, longitude }) => {
        const result = await getParcelDetails({ apn, latitude, longitude });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Zoning Tool
    server.tool(
      'get_zoning',
      `Query zoning designation for a location.

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
      {
        apn: z.string().optional().describe('APN to query zoning for'),
        latitude: z.number().optional().describe('Latitude in WGS84'),
        longitude: z.number().optional().describe('Longitude in WGS84'),
      },
      async ({ apn, latitude, longitude }) => {
        const result = await getZoning({ apn, latitude, longitude });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Flood Zone Tool
    server.tool(
      'get_flood_zone',
      `Query FEMA flood zone designation for a location.

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
      {
        apn: z.string().optional().describe('APN to query flood zone for'),
        latitude: z.number().optional().describe('Latitude in WGS84'),
        longitude: z.number().optional().describe('Longitude in WGS84'),
      },
      async ({ apn, latitude, longitude }) => {
        const result = await getFloodZone({ apn, latitude, longitude });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Fire Hazard Zone Tool
    server.tool(
      'get_fire_hazard_zone',
      `Query CAL FIRE Fire Hazard Severity Zone (FHSZ) designation.

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
      {
        apn: z.string().optional().describe('APN to query fire hazard zone for'),
        latitude: z.number().optional().describe('Latitude in WGS84'),
        longitude: z.number().optional().describe('Longitude in WGS84'),
      },
      async ({ apn, latitude, longitude }) => {
        const result = await getFireHazardZone({ apn, latitude, longitude });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Supervisor District Tool
    server.tool(
      'get_supervisor_district',
      `Get Solano County Board of Supervisors district information.

OUTPUT:
- District number (1-5)
- Supervisor name and contact info
- District office location
- District boundaries description

CONTEXT: Board of Supervisors governs unincorporated areas and county-wide services.
For issues in incorporated cities, contact city council instead.`,
      {
        apn: z.string().optional().describe('APN to find supervisor district for'),
        latitude: z.number().optional().describe('Latitude in WGS84'),
        longitude: z.number().optional().describe('Longitude in WGS84'),
      },
      async ({ apn, latitude, longitude }) => {
        const result = await getSupervisorDistrict({ apn, latitude, longitude });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );
  },
  {
    serverInfo: {
      name: 'sage-gis',
      version: '0.1.0',
    },
  },
  { basePath: '/api' }
);

export { handler as GET, handler as POST, handler as DELETE };
