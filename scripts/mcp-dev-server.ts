#!/usr/bin/env npx tsx
/**
 * SAGE MCP Development Server (stdio)
 *
 * A stdio-based MCP server for local development that supports
 * dynamic tool reloading via list_changed notifications.
 *
 * Usage:
 *   npx tsx scripts/mcp-dev-server.ts
 *
 * Add to Claude Code:
 *   claude mcp add --transport stdio sage-dev -- npx tsx scripts/mcp-dev-server.ts
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Import tool implementations
import { geocodeAddress } from '../lib/tools/geocode.js';
import { getParcelDetails } from '../lib/tools/parcel.js';
import { getZoning } from '../lib/tools/zoning.js';
import { getFloodZone } from '../lib/tools/flood.js';
import { getFireHazardZone } from '../lib/tools/fire.js';
import { getSupervisorDistrict } from '../lib/tools/supervisor.js';
import { getSolanoContext } from '../lib/tools/context.js';
import { renderMap } from '../lib/tools/render-map.js';

const server = new Server(
  {
    name: 'sage-gis-dev',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
const TOOLS = [
  {
    name: 'geocode_address',
    description: `Convert a street address to coordinates and APN (Assessor's Parcel Number).

INPUT: Street address in Solano County (e.g., "123 Main St, Fairfield, CA")

OUTPUT:
- latitude/longitude (WGS84)
- APN (formatted as XXX-XXX-XXX)
- Normalized address
- Match confidence score`,
    inputSchema: {
      type: 'object',
      properties: {
        address: { type: 'string', description: 'Street address to geocode' },
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
- Geometry: Parcel boundary coordinates`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: { type: 'string', description: "Assessor's Parcel Number" },
        latitude: { type: 'number', description: 'Latitude in WGS84' },
        longitude: { type: 'number', description: 'Longitude in WGS84' },
      },
    },
  },
  {
    name: 'get_zoning',
    description: `Query zoning designation for a location.

Automatic jurisdiction routing - checks if inside city or unincorporated county.

OUTPUT:
- Zoning code (e.g., "R-1", "A-40", "C-2")
- Zoning description
- Jurisdiction
- Permitted uses summary`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: { type: 'string', description: 'APN to query zoning for' },
        latitude: { type: 'number', description: 'Latitude in WGS84' },
        longitude: { type: 'number', description: 'Longitude in WGS84' },
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
- Insurance implications`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: { type: 'string', description: 'APN to query flood zone for' },
        latitude: { type: 'number', description: 'Latitude in WGS84' },
        longitude: { type: 'number', description: 'Longitude in WGS84' },
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
- Building code implications`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: { type: 'string', description: 'APN to query fire hazard zone for' },
        latitude: { type: 'number', description: 'Latitude in WGS84' },
        longitude: { type: 'number', description: 'Longitude in WGS84' },
      },
    },
  },
  {
    name: 'get_supervisor_district',
    description: `Get Solano County Board of Supervisors district information.

OUTPUT:
- District number (1-5)
- Supervisor name and contact info
- District office location`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: { type: 'string', description: 'APN to find supervisor district for' },
        latitude: { type: 'number', description: 'Latitude in WGS84' },
        longitude: { type: 'number', description: 'Longitude in WGS84' },
      },
    },
  },
  {
    name: 'get_solano_context',
    description: `Retrieve detailed reference material about Solano County GIS topics.

AVAILABLE TOPICS:
- jurisdiction: City vs county routing
- zoning: Zoning code meanings
- prop13: Assessed vs market value
- adu: ADU/JADU requirements
- flood: FEMA flood zone explanations
- fire: Fire hazard severity zones
- contacts: Department phone numbers
- districts: Special districts
- disclaimers: Standard disclaimer language`,
    inputSchema: {
      type: 'object',
      properties: {
        topic: { type: 'string', description: 'Topic to retrieve' },
      },
      required: ['topic'],
    },
  },
  {
    name: 'render_map',
    description: `Generate a static map image centered on a location or parcel.

Uses CARTO Voyager basemap tiles with parcel geometry overlay.

INPUT (provide ONE):
- apn: Parcel number - map centered on parcel with boundary highlighted
- center: { latitude, longitude } - map centered on point with marker
- bbox: { xmin, ymin, xmax, ymax } - explicit bounding box

OPTIONS:
- width: Image width in pixels (default: 600)
- height: Image height in pixels (default: 400)
- zoom: Map zoom level 1-19 (default: 17)
- format: 'png' or 'jpg' (default: 'png')`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: { type: 'string', description: 'APN to center map on' },
        center: {
          type: 'object',
          properties: {
            latitude: { type: 'number' },
            longitude: { type: 'number' },
          },
        },
        bbox: {
          type: 'object',
          properties: {
            xmin: { type: 'number' },
            ymin: { type: 'number' },
            xmax: { type: 'number' },
            ymax: { type: 'number' },
          },
        },
        width: { type: 'number' },
        height: { type: 'number' },
        zoom: { type: 'number' },
        format: { type: 'string', enum: ['png', 'jpg'] },
      },
    },
  },
];

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: unknown;

    switch (name) {
      case 'geocode_address':
        result = await geocodeAddress(args as { address: string });
        break;
      case 'get_parcel_details':
        result = await getParcelDetails(args as { apn?: string; latitude?: number; longitude?: number });
        break;
      case 'get_zoning':
        result = await getZoning(args as { apn?: string; latitude?: number; longitude?: number });
        break;
      case 'get_flood_zone':
        result = await getFloodZone(args as { apn?: string; latitude?: number; longitude?: number });
        break;
      case 'get_fire_hazard_zone':
        result = await getFireHazardZone(args as { apn?: string; latitude?: number; longitude?: number });
        break;
      case 'get_supervisor_district':
        result = await getSupervisorDistrict(args as { apn?: string; latitude?: number; longitude?: number });
        break;
      case 'get_solano_context':
        result = await getSolanoContext(args as { topic: string });
        break;
      case 'render_map': {
        const mapResult = await renderMap(args as Parameters<typeof renderMap>[0]);
        if (mapResult.success && mapResult.imageBase64 && mapResult.mimeType) {
          return {
            content: [
              {
                type: 'image',
                data: mapResult.imageBase64,
                mimeType: mapResult.mimeType,
              },
              {
                type: 'text',
                text: JSON.stringify({
                  success: true,
                  center: mapResult.center,
                  width: mapResult.width,
                  height: mapResult.height,
                  zoom: mapResult.zoom,
                }, null, 2),
              },
            ],
          };
        }
        result = mapResult;
        break;
      }
      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('SAGE MCP Dev Server running on stdio');

  // Watch for file changes and send list_changed notification
  // This allows hot-reloading of tools during development
  if (process.env.WATCH_TOOLS === 'true') {
    const fs = await import('fs');
    const path = await import('path');
    const toolsDir = path.join(process.cwd(), 'lib', 'tools');

    console.error(`Watching for changes in ${toolsDir}`);

    fs.watch(toolsDir, { recursive: true }, (eventType, filename) => {
      if (filename?.endsWith('.ts')) {
        console.error(`Tool file changed: ${filename}, sending list_changed notification`);
        // Clear module cache to reload tool implementations
        Object.keys(require.cache).forEach((key) => {
          if (key.includes('lib/tools')) {
            delete require.cache[key];
          }
        });
        // Send notification (MCP SDK should handle this)
        server.notification({
          method: 'notifications/tools/list_changed',
        });
      }
    });
  }
}

main().catch(console.error);
