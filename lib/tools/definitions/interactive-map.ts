/**
 * Interactive Map URL Tool Definition
 *
 * Generates URLs to open the SAGE interactive map with specific view settings.
 * This allows any LLM with MCP access to construct proper map URLs without
 * understanding the underlying client code.
 */

import { z } from 'zod';
import { defineTool, jsonResponse, ToolResponse } from '../types';
import { env } from '@/lib/config';

/** Available map presets */
const MAP_PRESETS = ['parcels', 'planning', 'hazards'] as const;

/** Preset descriptions for documentation */
const PRESET_DESCRIPTIONS: Record<(typeof MAP_PRESETS)[number], string> = {
  parcels: 'Parcels - Default view with parcels, addresses, and property information',
  planning: 'Planning - Zoning, general plans, and land use',
  hazards: 'Hazards - FEMA flood zones and CAL FIRE severity zones',
};

/**
 * Get the base URL for the map application
 */
function getMapBaseUrl(): string {
  return env.baseUrl || 'https://sage-three-theta.vercel.app';
}

/**
 * Build the interactive map URL with provided parameters
 */
function buildMapUrl(params: {
  preset?: string;
  webMapId?: string;
  apn?: string;
  address?: string;
  center?: { longitude?: number; latitude?: number };
  zoom?: number;
  origin?: { longitude?: number; latitude?: number; label?: string };
  destination?: { longitude?: number; latitude?: number; label?: string };
}): string {
  const url = new URL('/map', getMapBaseUrl());

  // Map source: web map ID takes precedence over preset
  if (params.webMapId) {
    url.searchParams.set('id', params.webMapId);
  } else if (params.preset) {
    url.searchParams.set('preset', params.preset);
  }

  // Feature highlighting: APN takes precedence over address
  if (params.apn) {
    url.searchParams.set('apn', params.apn);
  } else if (params.address) {
    url.searchParams.set('address', params.address);
  }

  // View parameters
  if (params.center?.longitude !== undefined && params.center?.latitude !== undefined) {
    url.searchParams.set('center', `${params.center.longitude},${params.center.latitude}`);
  }
  if (params.zoom) {
    url.searchParams.set('zoom', params.zoom.toString());
  }

  // Route parameters
  if (params.origin?.longitude !== undefined && params.origin?.latitude !== undefined) {
    const parts: (string | number)[] = [params.origin.longitude, params.origin.latitude];
    if (params.origin.label) parts.push(encodeURIComponent(params.origin.label));
    url.searchParams.set('origin', parts.join(','));
  }
  if (params.destination?.longitude !== undefined && params.destination?.latitude !== undefined) {
    const parts: (string | number)[] = [params.destination.longitude, params.destination.latitude];
    if (params.destination.label) parts.push(encodeURIComponent(params.destination.label));
    url.searchParams.set('destination', parts.join(','));
  }

  return url.toString();
}

export const getInteractiveMapUrlTool = defineTool({
  name: 'get_interactive_map_url',
  description: `Generate a URL to open the SAGE interactive map with specific view settings.

**PURPOSE**: Creates a URL for the full interactive map experience. Unlike render_map (static image),
this opens a live map where users can pan, zoom, toggle layers, and explore.

**WHEN TO USE**:
- User wants to explore the map interactively
- User needs to toggle layers or change basemaps
- User wants to use map widgets (legend, layer list, basemap gallery)
- User is looking at multiple properties or wants to navigate around
- After showing a static map image, offer the interactive link for exploration

**USE render_map INSTEAD** when:
- User just needs a quick visual (static image is faster)
- User wants to embed an image in a document
- You need to show a specific view without user interaction

**URL PARAMETERS**:

1. **Map Preset** (preset): Which layer configuration to use
   - parcels: Parcels (default) - parcels, addresses, property information
   - planning: Planning - zoning, general plans, land use
   - hazards: Hazards - FEMA flood zones, CAL FIRE severity zones

2. **Feature Highlight** (one of):
   - apn: Highlight and zoom to a parcel by APN (e.g., "0001-011-180")
   - address: Geocode and highlight an address (e.g., "675 Texas St, Fairfield")

3. **View Settings**:
   - center: { longitude, latitude } - initial map center
   - zoom: 1-20 - initial zoom level (17 is typical parcel view)

4. **Route Display**:
   - origin: { longitude, latitude, label? } - route start point
   - destination: { longitude, latitude, label? } - route end point
   Shows driving route with distance/time overlay

**EXAMPLES**:

Simple parcel view:
  get_interactive_map_url({ apn: "0001-011-180" })
  → Opens map centered on parcel, highlighted

Hazard assessment:
  get_interactive_map_url({ apn: "0001-011-180", preset: "hazards" })
  → Opens hazard layers, centered on parcel

Address lookup:
  get_interactive_map_url({ address: "675 Texas St, Fairfield, CA" })
  → Geocodes address, highlights parcel, opens map

Route display:
  get_interactive_map_url({
    origin: { longitude: -122.0, latitude: 38.2, label: "Start" },
    destination: { longitude: -122.1, latitude: 38.3, label: "End" }
  })
  → Opens map with driving route displayed

Custom view:
  get_interactive_map_url({ center: { longitude: -122.0, latitude: 38.25 }, zoom: 12 })
  → Opens map at specific location/zoom

**IMPORTANT**: Always share the returned URL with the user!`,

  schema: {
    preset: z.enum(MAP_PRESETS).optional()
      .describe('Map preset/theme: parcels (default), planning, hazards'),
    webMapId: z.string().optional()
      .describe('Custom ArcGIS Web Map ID (overrides preset)'),
    apn: z.string().optional()
      .describe('APN to highlight and zoom to (e.g., "0001-011-180")'),
    address: z.string().optional()
      .describe('Address to geocode and highlight (e.g., "675 Texas St, Fairfield, CA")'),
    center: z.object({
      longitude: z.number().describe('Longitude in WGS84'),
      latitude: z.number().describe('Latitude in WGS84'),
    }).optional().describe('Initial map center point'),
    zoom: z.number().min(1).max(20).optional()
      .describe('Initial zoom level (1=world, 17=parcel detail, 20=max)'),
    origin: z.object({
      longitude: z.number().describe('Start point longitude'),
      latitude: z.number().describe('Start point latitude'),
      label: z.string().optional().describe('Label for start marker'),
    }).optional().describe('Route origin point'),
    destination: z.object({
      longitude: z.number().describe('End point longitude'),
      latitude: z.number().describe('End point latitude'),
      label: z.string().optional().describe('Label for end marker'),
    }).optional().describe('Route destination point'),
  },

  handler: async ({
    preset,
    webMapId,
    apn,
    address,
    center,
    zoom,
    origin,
    destination,
  }): Promise<ToolResponse> => {
    // Build the URL
    const url = buildMapUrl({
      preset,
      webMapId,
      apn,
      address,
      center,
      zoom,
      origin,
      destination,
    });

    // Build a description of what the map will show
    const features: string[] = [];

    const presetName = preset || 'parcels';
    features.push(`**Preset**: ${presetName} - ${PRESET_DESCRIPTIONS[presetName as keyof typeof PRESET_DESCRIPTIONS]}`);

    if (apn) {
      features.push(`**Highlighted Parcel**: ${apn}`);
    } else if (address) {
      features.push(`**Highlighted Address**: ${address}`);
    }

    if (center) {
      features.push(`**Center**: ${center.latitude.toFixed(6)}, ${center.longitude.toFixed(6)}`);
    }

    if (zoom) {
      features.push(`**Zoom**: ${zoom}`);
    }

    if (origin && destination) {
      const originLabel = origin.label || `${origin.latitude.toFixed(4)}, ${origin.longitude.toFixed(4)}`;
      const destLabel = destination.label || `${destination.latitude.toFixed(4)}, ${destination.longitude.toFixed(4)}`;
      features.push(`**Route**: ${originLabel} → ${destLabel}`);
    }

    const description = features.join('\n');

    return jsonResponse({
      url,
      description: `Interactive map URL generated.\n\n${description}`,
      instructions: `Open this link to explore the interactive map: ${url}\n\nFeatures:\n- Pan and zoom freely\n- Click parcels for details\n- Toggle layers in the Layers panel\n- Change basemaps\n- View legend`,
    });
  },
});

export const listMapPresetsTool = defineTool({
  name: 'list_map_presets',
  description: `List available map presets for the interactive map.

Returns all available map presets with their descriptions and intended use cases.
Use this when you need to help a user choose the right map view for their task.`,

  schema: {},

  handler: async (): Promise<ToolResponse> => {
    const presets = MAP_PRESETS.map(preset => ({
      id: preset,
      name: PRESET_DESCRIPTIONS[preset].split(' - ')[0],
      description: PRESET_DESCRIPTIONS[preset],
    }));

    return jsonResponse({
      presets,
      baseUrl: getMapBaseUrl(),
      note: 'Use get_interactive_map_url to generate URLs with these presets',
    });
  },
});

/** All interactive map tools */
export const interactiveMapTools = [getInteractiveMapUrlTool, listMapPresetsTool];
