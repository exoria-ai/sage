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
  description: `Get detailed information about a specific GIS layer.

WHEN TO USE:
- You found a layer ID and need its full details
- User asks about a specific layer's fields or capabilities
- You need the exact service URL for render_map additionalLayers

RETURNS:
- Full service URL (for use with render_map, spatial queries)
- Field definitions (names, types, descriptions)
- Geometry type (Point, Polygon, Polyline)
- Lookup method (spatial, attribute, both)
- Coverage area and update frequency
- Related layers
- Source/maintainer information
- Usage notes and caveats

Example: get_gis_layer_details({ layerId: "fema-flood-zones" })`,
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

export const findLayersForQuestionTool = defineTool({
  name: 'find_layers_for_question',
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
- Service URL (for queries or render_map)
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

/** All GIS layers discovery tools */
export const gisLayersTools = [
  listGISCategoriesTool,
  listGISLayersTool,
  getGISLayerDetailsTool,
  searchGISLayersTool,
  findLayersForQuestionTool,
];
