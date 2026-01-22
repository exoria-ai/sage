/**
 * GIS Layers Discovery Tool Definitions
 *
 * Tools for discovering and querying available GIS layers for Solano County.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import {
  listGISCategories,
  listGISLayers,
  getGISLayerDetails,
  searchGISLayers,
  findLayersForQuestion,
  listGISDownloads,
} from '../gis-layers';

export const listGISCategoriesTool = defineTool({
  name: 'list_gis_categories',
  description: `List all available GIS layer categories.

WHEN TO USE:
- User wants to know what GIS data is available
- You need to understand the scope of available layers
- User asks "what kinds of maps/layers do you have?"

CATEGORIES INCLUDE:
- property: Parcels, address points, building footprints
- zoning: Zoning districts, general plans (county + 7 cities)
- hazards: Flood zones, fire hazard, earthquake faults
- districts: Political districts (BOS, Congressional, State)
- services: Garbage, water, fire districts
- poi: Schools, parks, hospitals, libraries, transit
- infrastructure: Roads, bridges, culverts
- emergency: Real-time OES incidents
- environmental: Farmland, conservation, soils
- demographics: Census tracts
- basemap: Aerial imagery

Returns category names with layer counts and example layers.`,
  schema: {},
  handler: async () => {
    const result = await listGISCategories();
    return jsonResponse(result);
  },
});

export const listGISLayersTool = defineTool({
  name: 'list_gis_layers',
  description: `List GIS layers, optionally filtered by category or priority.

WHEN TO USE:
- User wants to see all layers in a specific category
- You need to find the right layer for a task
- User asks "what zoning layers are available?" or similar

FILTERS:
- category: Filter by category (e.g., "zoning", "hazards", "poi")
- priority: Filter by priority ("high", "medium", "low")

High-priority layers are most commonly needed for property research.

Returns layer IDs, names, descriptions, and service URLs.`,
  schema: {
    category: z.string().optional().describe('Filter by category (e.g., "zoning", "hazards", "poi")'),
    priority: z.enum(['high', 'medium', 'low']).optional().describe('Filter by priority level'),
  },
  handler: async ({ category, priority }) => {
    const result = await listGISLayers({ category, priority });
    return jsonResponse(result);
  },
});

export const getGISLayerDetailsTool = defineTool({
  name: 'get_gis_layer_details',
  description: `Get detailed information about a specific GIS layer, including both live service URLs and file downloads.

WHEN TO USE:
- You found a layer ID and need its full details
- User asks about a specific layer's fields or capabilities
- You need the exact service URL for capture_map_view additionalLayers
- User wants to download GIS data as Shapefile or Geodatabase
- You need to determine the best data access method (live query vs file download)

RETURNS:
- Full service URL (for use with capture_map_view, spatial queries)
- Field definitions (names, types, descriptions)
- Geometry type (Point, Polygon, Polyline)
- Lookup method (spatial, attribute, both, or download-only)
- Coverage area and update frequency
- Related layers
- Source/maintainer information
- Usage notes and caveats
- **metadataUrl**: Link to AGOL item page with full metadata
- **downloads**: Array of available file downloads (shapefile, geodatabase, etc.)

DATA ACCESS GUIDANCE:
- **Live Service (serviceUrl)**: Best for real-time queries, spatial lookups, and getting current data
- **File Download**: Best for bulk analysis, offline work, or loading into desktop GIS (ArcGIS Pro, QGIS)
- Some layers have BOTH options - choose based on user's needs

Example: get_gis_layer_details({ layerId: "solano-parcels" })`,
  schema: {
    layerId: z.string().describe('Layer ID (e.g., "fema-flood-zones", "solano-parcels")'),
  },
  handler: async ({ layerId }) => {
    const result = await getGISLayerDetails({ layerId });
    return jsonResponse(result);
  },
});

export const searchGISLayersTool = defineTool({
  name: 'search_gis_layers',
  description: `Search GIS layers by keyword.

WHEN TO USE:
- User asks about a topic and you need to find relevant layers
- You don't know which layer contains certain data
- User asks "do you have a layer for X?"

SEARCH STRATEGY:
1. Searches layer names (highest priority)
2. Searches tags (e.g., "fire", "flood", "school")
3. Searches example user questions
4. Searches descriptions

Results are ranked by relevance and layer priority.

Example searches:
- "flood" → FEMA flood zones, local floodplains
- "school" → Schools layer
- "garbage" → Garbage Service Areas
- "zoning fairfield" → Fairfield Zoning layer`,
  schema: {
    query: z.string().describe('Search term (e.g., "flood", "school", "zoning")'),
    category: z.string().optional().describe('Limit search to specific category'),
    maxResults: z.number().optional().describe('Maximum results (default: 10)'),
  },
  handler: async ({ query, category, maxResults }) => {
    const result = await searchGISLayers({ query, category, maxResults });
    return jsonResponse(result);
  },
});

export const suggestLayersTool = defineTool({
  name: 'suggest_layers',
  description: `Find GIS layers that can answer a user's question.

WHEN TO USE:
- User asks a natural language question about a location
- You need to determine which layers to query
- Planning which data sources to use for a property report

This tool matches user questions against the catalog of "userQuestions"
that each layer is designed to answer.

EXAMPLES:
- "Is this property in a flood zone?" → FEMA flood zones, local floodplains
- "Who picks up my trash?" → Garbage Service Areas
- "What schools are nearby?" → Schools layer
- "Is this in a fire hazard area?" → Fire Hazard Severity Zone, CAL FIRE layers

Returns recommended layers with:
- Service URL (for queries or capture_map_view)
- Lookup method (spatial vs attribute)
- Relevant sample question from catalog
- Any important notes/caveats`,
  schema: {
    question: z.string().describe('User\'s question (e.g., "What flood zone is this property in?")'),
    maxResults: z.number().optional().describe('Maximum layers to return (default: 5)'),
  },
  handler: async ({ question, maxResults }) => {
    const result = await findLayersForQuestion({ question, maxResults });
    return jsonResponse(result);
  },
});

export const listGISDownloadsTool = defineTool({
  name: 'list_gis_downloads',
  description: `List GIS datasets available for file download (Shapefile, Geodatabase, LiDAR, etc.).

WHEN TO USE:
- User wants to download GIS data for offline use
- User asks "what data can I download?"
- User needs bulk data for desktop GIS analysis
- User asks about Shapefile, Geodatabase, or LiDAR downloads
- Planning data export or transfer workflows

DOWNLOADS VS LIVE SERVICES:
Many layers offer BOTH live service URLs (for real-time queries) AND file downloads:
- **Live Service**: Best for web maps, API queries, getting current data
- **File Download**: Best for bulk analysis, offline work, desktop GIS (ArcGIS Pro, QGIS)

AVAILABLE FORMATS:
- shapefile: Industry-standard vector format (.shp/.dbf/.shx in .zip)
- geodatabase: Esri File Geodatabase (.gdb in .zip) - richer data model
- lidar: Point cloud data (LAZ format) from USGS 3DEP
- geojson, csv, kml: Other common formats

AVAILABLE DATASETS include:
- Parcels, Address Points, Road Centerlines
- City/County Boundaries, Supervisor Districts
- Zoning, General Plan
- LiDAR elevation data (2023)

Returns for each downloadable layer:
- Layer ID and name
- Available download formats with direct URLs
- Metadata page URL
- Whether a live service is also available`,
  schema: {
    format: z.enum(['shapefile', 'geodatabase', 'geojson', 'csv', 'lidar', 'kml', 'other']).optional()
      .describe('Filter by specific format (e.g., "shapefile", "geodatabase", "lidar")'),
    category: z.string().optional()
      .describe('Filter by category (e.g., "property", "districts", "zoning")'),
  },
  handler: async ({ format, category }) => {
    const result = await listGISDownloads({ format, category });
    return jsonResponse(result);
  },
});

/** All GIS layers discovery tools */
export const gisLayersTools = [
  listGISCategoriesTool,
  listGISLayersTool,
  getGISLayerDetailsTool,
  searchGISLayersTool,
  suggestLayersTool,
  listGISDownloadsTool,
];
