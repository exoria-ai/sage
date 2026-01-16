/**
 * SAGE Tool Registry
 *
 * Exports all available MCP tools and the handler for tool calls.
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js';
import { geocodeAddress } from './geocode.js';
import { getParcelDetails } from './parcel.js';
import { getZoning } from './zoning.js';
import { getFloodZone } from './flood.js';
import { getFireHazardZone } from './fire.js';
import { getSupervisorDistrict } from './supervisor.js';

// Tool definitions with rich descriptions for Claude
export const tools: Tool[] = [
  {
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
    inputSchema: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description: 'Street address to geocode (include city and state)',
        },
      },
      required: ['address'],
    },
  },
  {
    name: 'get_parcel_details',
    description: `Get comprehensive property information for a parcel.

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
    inputSchema: {
      type: 'object',
      properties: {
        apn: {
          type: 'string',
          description: "Assessor's Parcel Number (format: XXX-XXX-XXX)",
        },
        latitude: {
          type: 'number',
          description: 'Latitude in WGS84 (use if no APN)',
        },
        longitude: {
          type: 'number',
          description: 'Longitude in WGS84 (use if no APN)',
        },
      },
    },
  },
  {
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
    inputSchema: {
      type: 'object',
      properties: {
        apn: {
          type: 'string',
          description: 'APN to query zoning for',
        },
        latitude: {
          type: 'number',
          description: 'Latitude in WGS84',
        },
        longitude: {
          type: 'number',
          description: 'Longitude in WGS84',
        },
      },
    },
  },
  {
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
    inputSchema: {
      type: 'object',
      properties: {
        apn: {
          type: 'string',
          description: 'APN to query flood zone for',
        },
        latitude: {
          type: 'number',
          description: 'Latitude in WGS84',
        },
        longitude: {
          type: 'number',
          description: 'Longitude in WGS84',
        },
      },
    },
  },
  {
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
    inputSchema: {
      type: 'object',
      properties: {
        apn: {
          type: 'string',
          description: 'APN to query fire hazard zone for',
        },
        latitude: {
          type: 'number',
          description: 'Latitude in WGS84',
        },
        longitude: {
          type: 'number',
          description: 'Longitude in WGS84',
        },
      },
    },
  },
  {
    name: 'get_supervisor_district',
    description: `Get Solano County Board of Supervisors district information.

OUTPUT:
- District number (1-5)
- Supervisor name and contact info
- District office location
- District boundaries description

CONTEXT: Board of Supervisors governs unincorporated areas and county-wide services.
For issues in incorporated cities, contact city council instead.`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: {
          type: 'string',
          description: 'APN to find supervisor district for',
        },
        latitude: {
          type: 'number',
          description: 'Latitude in WGS84',
        },
        longitude: {
          type: 'number',
          description: 'Longitude in WGS84',
        },
      },
    },
  },
];

// Tool call handler - routes to appropriate implementation
export async function handleToolCall(
  name: string,
  args: Record<string, unknown> | undefined
): Promise<{ content: Array<{ type: string; text: string }> }> {
  try {
    let result: unknown;

    switch (name) {
      case 'geocode_address':
        result = await geocodeAddress(args as { address: string });
        break;

      case 'get_parcel_details':
        result = await getParcelDetails(args as {
          apn?: string;
          latitude?: number;
          longitude?: number;
        });
        break;

      case 'get_zoning':
        result = await getZoning(args as {
          apn?: string;
          latitude?: number;
          longitude?: number;
        });
        break;

      case 'get_flood_zone':
        result = await getFloodZone(args as {
          apn?: string;
          latitude?: number;
          longitude?: number;
        });
        break;

      case 'get_fire_hazard_zone':
        result = await getFireHazardZone(args as {
          apn?: string;
          latitude?: number;
          longitude?: number;
        });
        break;

      case 'get_supervisor_district':
        result = await getSupervisorDistrict(args as {
          apn?: string;
          latitude?: number;
          longitude?: number;
        });
        break;

      default:
        result = {
          success: false,
          error_type: 'UNKNOWN_TOOL',
          message: `Unknown tool: ${name}`,
          suggestion: 'Available tools: geocode_address, get_parcel_details, get_zoning, get_flood_zone, get_fire_hazard_zone, get_supervisor_district',
        };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              success: false,
              error_type: 'INTERNAL_ERROR',
              message: `Tool execution failed: ${errorMessage}`,
              suggestion: 'This may be a temporary issue. Please try again.',
            },
            null,
            2
          ),
        },
      ],
    };
  }
}
