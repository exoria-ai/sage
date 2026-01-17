/**
 * SAGE MCP Route Handler (LIVE PRODUCTION)
 *
 * Provides Streamable HTTP transport for MCP tools.
 * Deploy to Vercel for remote MCP server access.
 *
 * ⚠️  IMPORTANT: This is the LIVE production server.
 * Changes to mcp-dev-server.ts are NOT automatically synced here.
 * When adding new tools to dev, you MUST also add them here for users to access them.
 *
 * Sync checklist:
 * 1. Add tool import
 * 2. Add server.tool() definition with full description
 * 3. Deploy to Vercel
 * 4. Verify tool appears in production
 */

import { z } from 'zod';
import { put } from '@vercel/blob';
import { createMcpHandler } from 'mcp-handler';
import { geocodeAddress } from '@/lib/tools/geocode';
import { getParcelDetails } from '@/lib/tools/parcel';
import { getZoning } from '@/lib/tools/zoning';
import { getFloodZone } from '@/lib/tools/flood';
import { getFireHazardZone } from '@/lib/tools/fire';
import { getSupervisorDistrict } from '@/lib/tools/supervisor';
import { getSolanoContext } from '@/lib/tools/context';
import { renderMap } from '@/lib/tools/render-map';
import { searchParcels } from '@/lib/tools/search-parcels';
import { getSpecialDistricts } from '@/lib/tools/special-districts';
import { getNearby } from '@/lib/tools/nearby';
import {
  getCountyCodeSections,
  listCountyCodeChapters,
  listCountyCodeSections,
  searchCountyCode,
} from '@/lib/tools/county-code';
import { getParcelsInBuffer } from '@/lib/tools/parcels-in-buffer';
import {
  searchBudget,
  getBudgetChunk,
  listBudgetDepartments,
  listBudgetSections,
  getDepartmentBudget,
  getBudgetOverview,
} from '@/lib/tools/budget';
import {
  generateImage,
  editImage,
} from '@/lib/tools/image-generation';

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

    // Get Solano Context Tool
    server.tool(
      'get_solano_context',
      `Retrieve detailed reference material about Solano County GIS topics.

USE THIS TOOL when you need to:
- Interpret zoning codes or flood zones
- Explain Proposition 13 / assessed values
- Understand ADU rules and requirements
- Know which department to contact
- Get proper disclaimer language

AVAILABLE TOPICS:
- jurisdiction: City vs county routing, incorporated cities
- zoning: Zoning code meanings and allowed uses
- prop13: Assessed value vs market value, Proposition 13/8
- adu: ADU/JADU requirements, state and local rules
- flood: FEMA flood zone explanations, insurance
- fire: Fire hazard severity zones, defensible space
- contacts: Department phone numbers and emails
- districts: Special districts (fire, water, sewer)
- disclaimers: Standard disclaimer language

Returns full reference document for the requested topic.`,
      {
        topic: z.string().describe('Topic to retrieve (e.g., "zoning", "flood", "adu", "contacts")'),
      },
      async ({ topic }) => {
        const result = await getSolanoContext({ topic });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Render Map Tool
    server.tool(
      'render_map',
      `Generate a static map image for the user to view.

**PURPOSE**: This tool creates a visual map that the user can see. The entire point is to
produce an image URL that you MUST share with the user.

**CRITICAL - ALWAYS INCLUDE THE URL**:
The tool returns an imageUrl field. You MUST include this URL in your response to the user.
The embedded image may not display in all clients, so the URL is essential.
Format: "Here's the map: [imageUrl]" or include it with your description.

WORKFLOW (address → map):
1. geocode_address({ address: "675 Texas St, Fairfield, CA" }) → get APN
2. render_map({ apn: "003-025-1020" }) → use APN directly (preferred)
   OR render_map({ center: { latitude, longitude }, zoom: 18 })

INPUT (provide ONE):
- apn: Assessor's Parcel Number - PREFERRED. Centers on parcel, highlights boundary.
- center: { latitude, longitude } - Map centered on point with marker.
- buffer: Buffer visualization - for radius/notification maps (see below)
- apns: Array of APNs - display multiple parcels
- bbox: { xmin, ymin, xmax, ymax } - explicit bounding box
- extent: 'county' - Zoom to show the entire county with boundaries

COUNTY MAP MODE - For county-wide visualization:
  render_map({ extent: 'county', boundaries: { showCounty: true, showCities: true } })

  → Shows entire Solano County at appropriate zoom
  → Can overlay county boundary (blue dashed line) and city boundaries (colored, labeled)
  → Parcel boundaries hidden at county zoom (too cluttered)

OPTIONS:
- width/height: Image dimensions (default: 1200x800)
- zoom: Map zoom 1-19 (default: 17). Auto-calculated for buffer mode.
- basemap: 'aerial' (default, recommended) or 'streets'

BUFFER MODE - For radius visualization:
  render_map({ buffer: { apn: "003-025-1020", radius_feet: 300 } })

  → Do NOT call get_parcels_in_buffer first - this tool handles spatial queries internally.
  → Source parcel highlighted in orange, buffer shown as dashed circle.
  → Only use get_parcels_in_buffer if you need owner names/addresses for notification lists.

REMEMBER: Always include the imageUrl in your response!`,
      {
        apn: z.string().optional().describe("Assessor's Parcel Number to center map on"),
        apns: z.array(z.string()).optional().describe('Array of APNs to display (for search results or buffer parcels)'),
        center: z.object({
          latitude: z.number(),
          longitude: z.number(),
        }).optional().describe('Center point coordinates'),
        bbox: z.object({
          xmin: z.number(),
          ymin: z.number(),
          xmax: z.number(),
          ymax: z.number(),
        }).optional().describe('Bounding box in WGS84'),
        buffer: z.object({
          apn: z.string().optional().describe('Source parcel APN for buffer center'),
          latitude: z.number().optional().describe('Source point latitude (if no APN)'),
          longitude: z.number().optional().describe('Source point longitude (if no APN)'),
          radius_feet: z.number().describe('Buffer radius in feet (e.g., 300, 500, 1000)'),
          show_ring: z.boolean().optional().describe('Show buffer circle (default: true)'),
          highlight_parcels: z.boolean().optional().describe('Highlight parcels in buffer (default: true)'),
        }).optional().describe('Buffer visualization options'),
        boundaries: z.object({
          showCounty: z.boolean().optional().describe('Show county boundary outline (blue dashed line)'),
          showCities: z.boolean().optional().describe('Show city boundary outlines with labels'),
          countyFill: z.boolean().optional().describe('Fill county with semi-transparent color'),
          cityFill: z.boolean().optional().describe('Fill cities with semi-transparent color'),
        }).optional().describe('County/city boundary visualization options'),
        extent: z.enum(['county']).optional().describe("Zoom to show full extent: 'county' for county-wide view"),
        width: z.number().optional().describe('Image width in pixels (default: 600)'),
        height: z.number().optional().describe('Image height in pixels (default: 400)'),
        zoom: z.number().optional().describe('Map zoom level 1-19 (auto-calculated for buffer mode)'),
        format: z.enum(['png', 'jpg']).optional().describe('Image format (default: png)'),
        basemap: z.enum(['aerial', 'streets']).optional().describe('Basemap type: aerial (default) or streets'),
      },
      async ({ apn, apns, center, bbox, buffer, boundaries, extent, width, height, zoom, format, basemap }) => {
        const result = await renderMap({
          apn,
          apns,
          center,
          bbox,
          buffer,
          boundaries,
          extent,
          width,
          height,
          zoom,
          format,
          basemap,
        });

        // If successful, upload to Vercel Blob and return URL
        if (result.success && result.imageBase64 && result.mimeType) {
          // Generate a unique filename
          const ext = format || 'png';
          const timestamp = Date.now();
          const identifier = apn || apns?.[0] || buffer?.apn || extent || `${center?.latitude}_${center?.longitude}` || 'map';
          const filename = `maps/${identifier.replace(/[^a-zA-Z0-9-_]/g, '-')}_${timestamp}.${ext}`;

          // Convert base64 to buffer and upload
          const imageBuffer = Buffer.from(result.imageBase64, 'base64');

          let imageUrl: string;
          try {
            const blob = await put(filename, imageBuffer, {
              access: 'public',
              contentType: result.mimeType,
            });
            imageUrl = blob.url;
          } catch (uploadError) {
            // If blob upload fails, fall back to the dynamic API route
            console.error('Blob upload failed:', uploadError);
            const baseUrl = process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : 'https://sage-three-theta.vercel.app';
            const params = new URLSearchParams();
            if (apn) params.set('apn', apn);
            if (center) {
              params.set('lat', center.latitude.toString());
              params.set('lng', center.longitude.toString());
            }
            if (zoom) params.set('zoom', zoom.toString());
            imageUrl = `${baseUrl}/api/map?${params.toString()}`;
          }

          return {
            content: [
              {
                type: 'image',
                data: result.imageBase64,
                mimeType: result.mimeType,
                annotations: {
                  audience: ['user'],
                  priority: 1.0,
                },
              },
              {
                type: 'text',
                text: `Map generated successfully.

📍 **IMPORTANT - Share this link with the user:**
${imageUrl}

Center: ${result.center?.latitude}, ${result.center?.longitude}
Dimensions: ${result.width}x${result.height}
Zoom: ${result.zoom}`,
              },
            ],
          };
        }

        // Error case
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Search Parcels Tool
    server.tool(
      'search_parcels',
      `Search for parcels matching criteria with aggregations.

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
      {
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
      async ({ criteria, include_samples, sample_limit }) => {
        const result = await searchParcels({ criteria, include_samples, sample_limit });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Special Districts Tool
    server.tool(
      'get_special_districts',
      `Get all special districts covering a location.

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
      {
        apn: z.string().optional().describe("Assessor's Parcel Number"),
        latitude: z.number().optional().describe('Latitude in WGS84'),
        longitude: z.number().optional().describe('Longitude in WGS84'),
      },
      async ({ apn, latitude, longitude }) => {
        const result = await getSpecialDistricts({ apn, latitude, longitude });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Nearby Tool
    server.tool(
      'get_nearby',
      `Find nearby points of interest.

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
      {
        layer_type: z.string().describe('Type of POI: school, park, fire_station, hospital, library, police, transit, community_center'),
        apn: z.string().optional().describe("Assessor's Parcel Number"),
        latitude: z.number().optional().describe('Latitude in WGS84'),
        longitude: z.number().optional().describe('Longitude in WGS84'),
        radius_feet: z.number().optional().describe('Search radius in feet (default: 5280 = 1 mile)'),
        limit: z.number().optional().describe('Maximum results to return (default: 10)'),
      },
      async ({ layer_type, apn, latitude, longitude, radius_feet, limit }) => {
        const result = await getNearby({ layer_type, apn, latitude, longitude, radius_feet, limit });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get County Code Sections Tool
    server.tool(
      'get_county_code_sections',
      `Retrieve the full text of specific sections from the Solano County Code.

WHEN TO USE THIS TOOL:
- User asks about subdivision requirements, procedures, or definitions
- User asks about zoning regulations, allowed uses, or permit requirements
- User needs exact legal language from the county code
- User asks "what does the code say about..." something specific
- You need to cite specific regulations in your response

STRATEGY - Batch multiple sections in one call:
If a user asks about "subdivision exemptions", retrieve sections 26-15, 26-15.1, and 26-15.2 together.
If discussing zoning, retrieve the relevant district section (e.g., 28.21.20 for Agricultural districts).

CURRENTLY AVAILABLE:
- Chapter 19: Parks, Recreation and Other Public Property (31 sections)
  - Article I: Parks, Playgrounds and Recreation Fund
  - Article II: In General (definitions, enforcement, boating, swimming, vehicles, pets, prohibited acts)
  - Article III: Camping or Squatting
  - Article IV: Use of Public Property
- Chapter 23: Refuse and Garbage (28 sections)
  - Articles I-VII: Definitions, storage, collections, disposal sites, fees, appeals, enforcement
- Chapter 24: Roads, Streets and Other Public Property (16 sections)
  - Article I: Encroachments (permits for work on county roads)
  - Article II: Terminal Access Routes
  - Article III: Working of Prisoners on Public Works
  - Article IV: Travel Reduction Requirements
- Chapter 26: Subdivisions (41 sections)
  - Sections 26-11 through 26-15.3: Authority, purpose, application, exemptions, fees
  - Sections 26-21 through 26-21.32: All subdivision-related definitions
- Chapter 26.5: Underground Utilities (10 sections)
  - Underground utility district establishment, requirements, responsibilities
- Chapter 28: Zoning Regulations (166 sections)
  - Article I (28.01-28.05): General provisions, definitions
  - Article II (28.10-28.69): Districts and allowed uses
    - 28.21.x: Agricultural (A-40, A-80, A-20, A-160) districts
    - 28.22.x: Suisun Marsh Agricultural district
    - 28.23.x: Suisun Valley Agricultural district
    - 28.31.x: Rural Residential (R-R-5, R-R-10) districts
    - 28.32.x: Residential-Traditional Community district
    - 28.41.x: Commercial (C) district
    - 28.61.x: Park (P) district
  - Article III (28.70-28.82): Land Use Regulations (specific use requirements)
    - 28.71: Agricultural uses
    - 28.72: Residential uses (including ADUs)
    - 28.73: Recreation, education, public assembly
    - 28.74: Retail and office uses
    - 28.75: Tourist uses (agritourism, vacation rentals)
    - 28.76: Commercial services
    - 28.80-28.82: Wind energy, wireless facilities, cannabis
  - Article IV (28.90-28.99): Site Development Standards
    - 28.91: Architectural standards
    - 28.94: Parking requirements
    - 28.96: Signs
    - 28.97: Yards and setbacks
  - Article V (28.100-28.119): Operations (permits, procedures)
    - 28.101: Administrative Permit (AP)
    - 28.106: Use Permit (MUP/UP)
    - 28.107: Variance
    - 28.112: Appeals
- Chapter 30: Address Numbering System (9 sections)
  - Articles I-V: System description, numbering, road naming, road signs, penalties
- Chapter 31: Grading, Drainage, Land Leveling, and Erosion Control (22 sections)
  - Article I: Title, Purpose and General Provisions (definitions, appeals, fees)
  - Article II: Procedure (permit requirements, exemptions, minor/major permits)
  - Article III: Design Principles and Standards
  - Article IV: Implementation and Enforcement

SECTION ID FORMAT: "26-11", "28.21.20", "28.01" (chapter-section or chapter.section.subsection)

OUTPUT: Full section text with title, chapter info. For allowed uses sections, includes
markdown tables showing permit requirements (A/AP/MUP/UP) by zoning district.

TIP: If unsure which sections to retrieve, use search_county_code first to find relevant sections.`,
      {
        section_ids: z.array(z.string()).describe('Array of section IDs to retrieve (e.g., ["26-11", "26-21.3"])'),
      },
      async ({ section_ids }) => {
        const result = await getCountyCodeSections({ section_ids });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // List County Code Chapters Tool
    server.tool(
      'list_county_code_chapters',
      `List all available chapters in the Solano County Code database.

WHEN TO USE:
- To discover what county code content is available
- When user asks broadly about "the county code" without specifics
- To provide overview of code coverage

Returns chapter numbers, titles, and counts of articles/sections.`,
      {},
      async () => {
        const result = await listCountyCodeChapters();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // List County Code Sections Tool
    server.tool(
      'list_county_code_sections',
      `List all sections within a specific chapter of the Solano County Code.

WHEN TO USE:
- User wants to browse what's in a chapter
- You need to find the right section ID before retrieving full text
- User asks "what sections cover [topic]" within a known chapter

Returns section IDs and titles (not full text - use get_county_code_sections for that).`,
      {
        chapter: z.string().describe('Chapter number (e.g., "26" for Subdivisions)'),
      },
      async ({ chapter }) => {
        const result = await listCountyCodeSections({ chapter });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Search County Code Tool
    server.tool(
      'search_county_code',
      `Search the Solano County Code by keyword.

WHEN TO USE:
- User asks about a topic but you don't know which sections cover it
- Need to find relevant sections before retrieving full text
- User uses terminology that might appear in multiple sections

STRATEGY:
1. Search for key terms from the user's question
2. Review the matching section titles and snippets
3. Use get_county_code_sections to retrieve full text of relevant sections

Returns matching sections with snippets showing context around matches.
Title matches are ranked higher than text matches.`,
      {
        query: z.string().describe('Search term (e.g., "lot line adjustment", "parcel map", "exemption")'),
        chapter: z.string().optional().describe('Limit search to specific chapter'),
        max_results: z.number().optional().describe('Maximum results to return (default: 10)'),
      },
      async ({ query, chapter, max_results }) => {
        const result = await searchCountyCode({ query, chapter, max_results });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Parcels in Buffer Tool
    server.tool(
      'get_parcels_in_buffer',
      `Find all parcels within a specified radius of a location or parcel.

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
      {
        apn: z.string().optional().describe("Source parcel APN - buffer measured from this parcel's boundary"),
        latitude: z.number().optional().describe('Source point latitude (use if no APN)'),
        longitude: z.number().optional().describe('Source point longitude (use if no APN)'),
        radius_feet: z.number().optional().describe('Buffer radius in feet (default: 300)'),
        include_source: z.boolean().optional().describe('Include source parcel in results (default: false)'),
      },
      async ({ apn, latitude, longitude, radius_feet, include_source }) => {
        const result = await getParcelsInBuffer({ apn, latitude, longitude, radius_feet, include_source });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // ==========================================
    // Budget Tools
    // ==========================================

    // Search Budget Tool
    server.tool(
      'search_budget',
      `Search the FY2025-26 Recommended Budget document.

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
      {
        query: z.string().describe('Search query'),
        top_k: z.number().optional().describe('Max results (default: 5)'),
        department: z.string().optional().describe('Filter by department'),
        section: z.string().optional().describe('Filter by section (A-N)'),
        chunk_type: z.string().optional().describe('Filter by type: narrative, table, summary'),
      },
      async ({ query, top_k, department, section, chunk_type }) => {
        const result = await searchBudget({ query, top_k, department, section, chunk_type });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Budget Chunk Tool
    server.tool(
      'get_budget_chunk',
      `Retrieve the full text of a specific budget chunk by ID.

Use after search_budget to get complete text of a result.`,
      {
        chunk_id: z.string().describe('Chunk ID from search results'),
      },
      async ({ chunk_id }) => {
        const result = await getBudgetChunk({ chunk_id });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // List Budget Departments Tool
    server.tool(
      'list_budget_departments',
      `List all departments in the budget document.

Returns a list of all department names for filtering searches.`,
      {},
      async () => {
        const result = await listBudgetDepartments();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // List Budget Sections Tool
    server.tool(
      'list_budget_sections',
      `List all major sections in the budget document.

Sections are lettered A-N and cover different functional areas:
A. Budget Summary
B. Permanent Position Summary
C. County Statistical Profile
...etc.`,
      {},
      async () => {
        const result = await listBudgetSections();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Department Budget Tool
    server.tool(
      'get_department_budget',
      `Get all budget information for a specific department.

Returns all chunks (narrative and tables) for a department.`,
      {
        department: z.string().describe('Department name (partial match)'),
        include_narrative: z.boolean().optional().describe('Include narrative chunks (default: true)'),
        include_tables: z.boolean().optional().describe('Include table chunks (default: true)'),
      },
      async ({ department, include_narrative, include_tables }) => {
        const result = await getDepartmentBudget({ department, include_narrative, include_tables });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Get Budget Overview Tool
    server.tool(
      'get_budget_overview',
      `Get overview statistics about the budget document.

Returns document metadata, section list, and chunk counts.`,
      {},
      async () => {
        const result = await getBudgetOverview();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // ==========================================
    // Image Generation Tools
    // ==========================================

    // Generate Infographic Tool
    server.tool(
      'generate_infographic',
      `Generate infographics, diagrams, and visualizations using AI.

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
      {
        prompt: z.string().describe('Detailed description of the image to generate. Be specific about style, content, layout, and any text to include.'),
        aspect_ratio: z.enum(['21:9', '16:9', '3:2', '4:3', '5:4', '1:1', '4:5', '3:4', '2:3', '9:16']).optional().describe('Aspect ratio of the image. Default: 16:9 (good for presentations)'),
        resolution: z.enum(['1K', '2K', '4K']).optional().describe('Image resolution. Default: 1K. Use 2K or 4K for higher quality.'),
        output_format: z.enum(['jpeg', 'png', 'webp']).optional().describe('Output format. Default: png'),
        num_images: z.number().min(1).max(4).optional().describe('Number of images to generate (1-4). Default: 1'),
      },
      async ({ prompt, aspect_ratio, resolution, output_format, num_images }) => {
        const result = await generateImage({
          prompt,
          aspect_ratio,
          resolution,
          output_format,
          num_images,
        });

        // If successful, return image content blocks so agent can see them
        if (result.success && result.images && result.images.length > 0) {
          // Build content array with proper types
          const imageBlocks = result.images.map((img) => ({
            type: 'image' as const,
            data: img.base64,
            mimeType: img.mimeType,
          }));

          const urls = result.images.map((img) => img.url).join('\n');
          const textBlock = {
            type: 'text' as const,
            text: `Infographic generated successfully.

**IMPORTANT - Share these URLs with the user (they cannot see the images otherwise):**
${urls}

${result.description ? `Description: ${result.description}` : ''}`,
          };

          return {
            content: [...imageBlocks, textBlock],
          };
        }

        // Error case
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Edit Image Tool
    server.tool(
      'edit_image',
      `Edit or combine images using AI.

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
      {
        prompt: z.string().describe('Description of the edits to make. Be specific about what to change, add, or remove.'),
        image_urls: z.array(z.string()).describe('URLs of source images to edit. Can be FAL URLs from previous generations or any public image URL.'),
        aspect_ratio: z.enum(['auto', '21:9', '16:9', '3:2', '4:3', '5:4', '1:1', '4:5', '3:4', '2:3', '9:16']).optional().describe('Aspect ratio. Default: auto (preserves original)'),
        resolution: z.enum(['1K', '2K', '4K']).optional().describe('Output resolution. Default: 1K'),
        output_format: z.enum(['jpeg', 'png', 'webp']).optional().describe('Output format. Default: png'),
        num_images: z.number().min(1).max(4).optional().describe('Number of variations to generate (1-4). Default: 1'),
      },
      async ({ prompt, image_urls, aspect_ratio, resolution, output_format, num_images }) => {
        const result = await editImage({
          prompt,
          image_urls,
          aspect_ratio,
          resolution,
          output_format,
          num_images,
        });

        // If successful, return image content blocks so agent can see them
        if (result.success && result.images && result.images.length > 0) {
          // Build content array with proper types
          const imageBlocks = result.images.map((img) => ({
            type: 'image' as const,
            data: img.base64,
            mimeType: img.mimeType,
          }));

          const urls = result.images.map((img) => img.url).join('\n');
          const textBlock = {
            type: 'text' as const,
            text: `Image edited successfully.

**IMPORTANT - Share these URLs with the user (they cannot see the images otherwise):**
${urls}

${result.description ? `Description: ${result.description}` : ''}`,
          };

          return {
            content: [...imageBlocks, textBlock],
          };
        }

        // Error case
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
