#!/usr/bin/env npx tsx
/**
 * SAGE MCP Development Server (stdio) - LOCAL DEV ONLY
 *
 * A stdio-based MCP server for local development that supports
 * dynamic tool reloading via list_changed notifications.
 *
 * ⚠️  IMPORTANT: This is the LOCAL DEVELOPMENT server (scratchpad).
 * Changes here do NOT automatically appear in production!
 *
 * When you add/modify tools here, you MUST also update:
 *   → app/api/mcp/route.ts (the LIVE production server)
 *
 * A feature is NOT complete until it works on the live server.
 * The user tests via the live server at sage.solano.ai, not this dev server.
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
import { searchParcels } from '../lib/tools/search-parcels.js';
import { getSpecialDistricts } from '../lib/tools/special-districts.js';
import { getNearby } from '../lib/tools/nearby.js';
import {
  getCountyCodeSections,
  listCountyCodeChapters,
  listCountyCodeSections,
  searchCountyCode,
} from '../lib/tools/county-code.js';
import { getParcelsInBuffer } from '../lib/tools/parcels-in-buffer.js';
import {
  searchBudget,
  getBudgetChunk,
  listBudgetDepartments,
  listBudgetSections,
  getDepartmentBudget,
  getBudgetOverview,
} from '../lib/tools/budget.js';
import {
  generateImage,
  editImage,
} from '../lib/tools/image-generation.js';

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

Uses CARTO Voyager or Solano aerial imagery for basemap.
Parcel overlays rendered via Solano County MapServer.

INPUT (provide ONE):
- apn: Parcel number - map centered on parcel with boundary highlighted
- apns: Array of APNs - display multiple parcels (search results)
- center: { latitude, longitude } - map centered on point with marker
- bbox: { xmin, ymin, xmax, ymax } - explicit bounding box

OPTIONS:
- width: Image width in pixels (default: 600)
- height: Image height in pixels (default: 400)
- zoom: Map zoom level 1-19 (default: 17)
- format: 'png' or 'jpg' (default: 'png')
- basemap: 'streets' or 'aerial' (default: 'streets')`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: { type: 'string', description: 'APN to center map on' },
        apns: { type: 'array', items: { type: 'string' }, description: 'Array of APNs to display' },
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
        basemap: { type: 'string', enum: ['streets', 'aerial'] },
      },
    },
  },
  {
    name: 'search_parcels',
    description: `Search for parcels matching criteria with aggregations.

Enables queries like "all agricultural parcels" or "vacant lots over 5 acres".

CRITERIA: zoning, use_description, min_acres, max_acres, min_value, max_value,
year_built_after, year_built_before, has_pool, has_solar, city, williamson_act

OUTPUT: total_count, aggregations, sample_parcels`,
    inputSchema: {
      type: 'object',
      properties: {
        criteria: {
          type: 'object',
          properties: {
            zoning: { type: 'string' },
            use_code: { type: 'string' },
            use_description: { type: 'string' },
            min_acres: { type: 'number' },
            max_acres: { type: 'number' },
            min_value: { type: 'number' },
            max_value: { type: 'number' },
            year_built_after: { type: 'number' },
            year_built_before: { type: 'number' },
            has_pool: { type: 'boolean' },
            has_solar: { type: 'boolean' },
            city: { type: 'string' },
            williamson_act: { type: 'boolean' },
          },
        },
        include_samples: { type: 'boolean' },
        sample_limit: { type: 'number' },
      },
      required: ['criteria'],
    },
  },
  {
    name: 'get_special_districts',
    description: `Get all special districts covering a location.

Returns fire, water, school, garbage, cemetery, reclamation, GSA districts.

INPUT: Either APN or coordinates`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: { type: 'string', description: 'APN to query' },
        latitude: { type: 'number', description: 'Latitude in WGS84' },
        longitude: { type: 'number', description: 'Longitude in WGS84' },
      },
    },
  },
  {
    name: 'get_nearby',
    description: `Find nearby points of interest.

LAYER TYPES: school, park, fire_station, hospital, library, police, transit, community_center

INPUT: layer_type, location (APN or coordinates), radius_feet, limit`,
    inputSchema: {
      type: 'object',
      properties: {
        layer_type: { type: 'string', description: 'Type of POI' },
        apn: { type: 'string', description: 'APN' },
        latitude: { type: 'number', description: 'Latitude' },
        longitude: { type: 'number', description: 'Longitude' },
        radius_feet: { type: 'number', description: 'Search radius (default: 5280)' },
        limit: { type: 'number', description: 'Max results (default: 10)' },
      },
      required: ['layer_type'],
    },
  },
  {
    name: 'get_county_code_sections',
    description: `Retrieve sections from the Solano County Code.

AVAILABLE:
- Chapter 26: Subdivisions (41 sections)
- Chapter 28: Zoning Regulations (74 sections)

SECTION ID FORMAT: "26-11", "28.21.20", "28.01"`,
    inputSchema: {
      type: 'object',
      properties: {
        section_ids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Section IDs to retrieve',
        },
      },
      required: ['section_ids'],
    },
  },
  {
    name: 'list_county_code_chapters',
    description: 'List all available chapters in the county code database.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'list_county_code_sections',
    description: 'List all sections in a specific chapter.',
    inputSchema: {
      type: 'object',
      properties: {
        chapter: { type: 'string', description: 'Chapter number (e.g., "26", "28")' },
      },
      required: ['chapter'],
    },
  },
  {
    name: 'search_county_code',
    description: 'Search county code by keyword.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term' },
        chapter: { type: 'string', description: 'Limit to specific chapter' },
        max_results: { type: 'number', description: 'Max results (default: 10)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_parcels_in_buffer',
    description: `Find parcels within a radius of a location.

INPUT: apn or coordinates, radius_feet (default: 300)
OUTPUT: List of parcels with owner info for notification lists`,
    inputSchema: {
      type: 'object',
      properties: {
        apn: { type: 'string', description: 'Source parcel APN' },
        latitude: { type: 'number', description: 'Source latitude' },
        longitude: { type: 'number', description: 'Source longitude' },
        radius_feet: { type: 'number', description: 'Buffer radius (default: 300)' },
        include_source: { type: 'boolean', description: 'Include source parcel' },
      },
    },
  },
  // Budget document tools
  {
    name: 'search_budget',
    description: `Search the FY2025-26 Recommended Budget document.

Use this tool when users ask questions about:
- County department budgets and funding
- Staffing levels and positions
- Budget priorities and challenges
- Program accomplishments and workload
- Revenue sources and expenditures

INPUT:
- query: Search terms (required)
- top_k: Number of results (default: 5)
- department: Filter by department name
- section: Filter by section letter (A-N)
- chunk_type: Filter by type (narrative, table, summary)

OUTPUT: Matching budget document chunks with relevance scores.`,
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        top_k: { type: 'number', description: 'Max results (default: 5)' },
        department: { type: 'string', description: 'Filter by department' },
        section: { type: 'string', description: 'Filter by section (A-N)' },
        chunk_type: { type: 'string', description: 'Filter by type: narrative, table, summary' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_budget_chunk',
    description: `Retrieve the full text of a specific budget chunk by ID.

Use after search_budget to get complete text of a result.`,
    inputSchema: {
      type: 'object',
      properties: {
        chunk_id: { type: 'string', description: 'Chunk ID from search results' },
      },
      required: ['chunk_id'],
    },
  },
  {
    name: 'list_budget_departments',
    description: `List all departments in the budget document.

Returns a list of all department names for filtering searches.`,
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'list_budget_sections',
    description: `List all major sections in the budget document.

Sections are lettered A-N and cover different functional areas:
A. Budget Summary
B. Permanent Position Summary
C. County Statistical Profile
...etc.`,
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_department_budget',
    description: `Get all budget information for a specific department.

Returns all chunks (narrative and tables) for a department.`,
    inputSchema: {
      type: 'object',
      properties: {
        department: { type: 'string', description: 'Department name (partial match)' },
        include_narrative: { type: 'boolean', description: 'Include narrative chunks (default: true)' },
        include_tables: { type: 'boolean', description: 'Include table chunks (default: true)' },
      },
      required: ['department'],
    },
  },
  {
    name: 'get_budget_overview',
    description: `Get overview statistics about the budget document.

Returns document metadata, section list, and chunk counts.`,
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  // Infographic generation tools
  {
    name: 'generate_infographic',
    description: `Generate infographics, diagrams, and visualizations using AI.

**CRITICAL**: This tool returns image URLs. You MUST include these URLs in your response
to the user so they can view the generated infographics. Format as clickable markdown links.

Intended uses:
- Create infographics explaining county data, zoning, or processes
- Generate presentation slides for staff meetings
- Create diagrams illustrating geographic concepts
- Visualize organizational structures or workflows
- Generate educational materials about county services

Aspect ratios:
- 16:9: Presentations, slides (default)
- 1:1: Square infographics
- 4:3: Traditional presentations
- 9:16: Mobile/portrait infographics
- 21:9: Ultra-wide banners`,
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Detailed description of the image to generate. Be specific about style, content, layout, and any text to include.',
        },
        aspect_ratio: {
          type: 'string',
          enum: ['21:9', '16:9', '3:2', '4:3', '5:4', '1:1', '4:5', '3:4', '2:3', '9:16'],
          description: 'Aspect ratio of the image. Default: 16:9 (good for presentations)',
        },
        resolution: {
          type: 'string',
          enum: ['1K', '2K', '4K'],
          description: 'Image resolution. Default: 1K. Use 2K or 4K for higher quality.',
        },
        output_format: {
          type: 'string',
          enum: ['jpeg', 'png', 'webp'],
          description: 'Output format. Default: png',
        },
        num_images: {
          type: 'integer',
          minimum: 1,
          maximum: 4,
          description: 'Number of images to generate (1-4). Default: 1',
        },
      },
      required: ['prompt'],
    },
  },
  {
    name: 'edit_image',
    description: `Edit or combine images using AI.

**CRITICAL**: This tool returns image URLs. You MUST include these URLs in your response
to the user so they can view the edited images. Format as clickable markdown links.

Capabilities:
- Modify existing images based on text prompts
- Combine multiple images into one
- Add annotations, labels, or callouts
- Change style, colors, or composition
- Remove or add elements

Input images:
- Use URLs from previous generate_infographic calls
- Use any publicly accessible image URL
- Can provide multiple images to combine/reference`,
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Description of the edits to make. Be specific about what to change, add, or remove.',
        },
        image_urls: {
          type: 'array',
          items: { type: 'string' },
          description: 'URLs of source images to edit. Can be FAL URLs from previous generations or any public image URL.',
        },
        aspect_ratio: {
          type: 'string',
          enum: ['auto', '21:9', '16:9', '3:2', '4:3', '5:4', '1:1', '4:5', '3:4', '2:3', '9:16'],
          description: 'Aspect ratio. Default: auto (preserves original)',
        },
        resolution: {
          type: 'string',
          enum: ['1K', '2K', '4K'],
          description: 'Output resolution. Default: 1K',
        },
        output_format: {
          type: 'string',
          enum: ['jpeg', 'png', 'webp'],
          description: 'Output format. Default: png',
        },
        num_images: {
          type: 'integer',
          minimum: 1,
          maximum: 4,
          description: 'Number of variations to generate (1-4). Default: 1',
        },
      },
      required: ['prompt', 'image_urls'],
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
      case 'search_parcels':
        result = await searchParcels(args as Parameters<typeof searchParcels>[0]);
        break;
      case 'get_special_districts':
        result = await getSpecialDistricts(args as { apn?: string; latitude?: number; longitude?: number });
        break;
      case 'get_nearby':
        result = await getNearby(args as Parameters<typeof getNearby>[0]);
        break;
      case 'get_county_code_sections':
        result = await getCountyCodeSections(args as { section_ids: string[] });
        break;
      case 'list_county_code_chapters':
        result = await listCountyCodeChapters();
        break;
      case 'list_county_code_sections':
        result = await listCountyCodeSections(args as { chapter: string });
        break;
      case 'search_county_code':
        result = await searchCountyCode(args as { query: string; chapter?: string; max_results?: number });
        break;
      case 'get_parcels_in_buffer':
        result = await getParcelsInBuffer(args as Parameters<typeof getParcelsInBuffer>[0]);
        break;
      case 'search_budget':
        result = await searchBudget(args as Parameters<typeof searchBudget>[0]);
        break;
      case 'get_budget_chunk':
        result = await getBudgetChunk(args as Parameters<typeof getBudgetChunk>[0]);
        break;
      case 'list_budget_departments':
        result = await listBudgetDepartments();
        break;
      case 'list_budget_sections':
        result = await listBudgetSections();
        break;
      case 'get_department_budget':
        result = await getDepartmentBudget(args as Parameters<typeof getDepartmentBudget>[0]);
        break;
      case 'get_budget_overview':
        result = await getBudgetOverview();
        break;
      case 'generate_infographic': {
        const imgResult = await generateImage(args as unknown as Parameters<typeof generateImage>[0]);
        if (imgResult.success && imgResult.images && imgResult.images.length > 0) {
          const content: Array<{ type: string; data?: string; mimeType?: string; text?: string }> = [];
          for (const img of imgResult.images) {
            content.push({ type: 'image', data: img.base64, mimeType: img.mimeType });
          }
          const urls = imgResult.images.map((img) => img.url).join('\n');
          content.push({
            type: 'text',
            text: `Infographic generated successfully.\n\n**IMPORTANT - Share these URLs with the user:**\n${urls}`,
          });
          return { content };
        }
        result = imgResult;
        break;
      }
      case 'edit_image': {
        const editResult = await editImage(args as unknown as Parameters<typeof editImage>[0]);
        if (editResult.success && editResult.images && editResult.images.length > 0) {
          const content: Array<{ type: string; data?: string; mimeType?: string; text?: string }> = [];
          for (const img of editResult.images) {
            content.push({ type: 'image', data: img.base64, mimeType: img.mimeType });
          }
          const urls = editResult.images.map((img) => img.url).join('\n');
          content.push({
            type: 'text',
            text: `Image edited successfully.\n\n**IMPORTANT - Share these URLs with the user:**\n${urls}`,
          });
          return { content };
        }
        result = editResult;
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
