/**
 * Interactive Map Tools for SAGE
 *
 * These tools help users work with the new interactive ESRI-based map.
 * Since the map runs in the browser and MCP tools run on the server,
 * these tools primarily provide URLs and instructions for the interactive map.
 *
 * For actual map manipulation (pan, zoom, layer toggle), users interact
 * directly with the map UI at /map, which has full ESRI widget support.
 */

import { WEB_MAPS, getWebMapConfig, isPresetConfigured, getConfiguredPresets } from '../esri/webmaps';

// Base URL for the map page (will be set from environment or default)
const getMapBaseUrl = () => {
  // In production, use the deployed URL
  // In development, use localhost
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

export interface OpenInteractiveMapInput {
  preset?: 'base' | 'hazards' | 'zoning' | 'environmental' | 'districts';
  webMapId?: string;
  center?: { longitude: number; latitude: number };
  zoom?: number;
}

export interface OpenInteractiveMapOutput {
  url: string;
  preset: string;
  webMapName: string;
  description: string;
  isConfigured: boolean;
  instructions: string;
}

/**
 * Generate a URL to open the interactive map with specific settings
 */
export async function openInteractiveMap(
  input: OpenInteractiveMapInput
): Promise<OpenInteractiveMapOutput> {
  const preset = input.preset || 'base';
  const config = getWebMapConfig(preset);

  // Build the URL with query parameters
  const baseUrl = getMapBaseUrl();
  const url = new URL('/map', baseUrl);

  if (input.webMapId) {
    url.searchParams.set('id', input.webMapId);
  } else {
    url.searchParams.set('preset', preset);
  }

  // Note: center and zoom would require client-side handling via URL params
  // For now, the Web Map's saved extent will be used

  const isConfigured = input.webMapId ? true : isPresetConfigured(preset);

  return {
    url: url.toString(),
    preset,
    webMapName: config?.name || preset,
    description: config?.description || 'Interactive map',
    isConfigured,
    instructions: isConfigured
      ? `Open ${url.toString()} to view the interactive map. You can pan, zoom, click on features, toggle layers, and use drawing tools.`
      : `The ${preset} map preset is not yet configured. Please ask Ryan to create the Web Map in ArcGIS Online and provide the ID.`,
  };
}

export interface GetInteractiveMapStatusOutput {
  available: boolean;
  configuredPresets: string[];
  allPresets: {
    id: string;
    name: string;
    description: string;
    configured: boolean;
  }[];
  mapPageUrl: string;
  instructions: string;
}

/**
 * Get the status of interactive map configuration
 */
export async function getInteractiveMapStatus(): Promise<GetInteractiveMapStatusOutput> {
  const configuredPresets = getConfiguredPresets();
  const allPresets = Object.entries(WEB_MAPS).map(([id, config]) => ({
    id,
    name: config.name,
    description: config.description,
    configured: Boolean(config.id),
  }));

  const baseUrl = getMapBaseUrl();
  const mapPageUrl = `${baseUrl}/map`;

  const available = configuredPresets.length > 0;

  return {
    available,
    configuredPresets,
    allPresets,
    mapPageUrl,
    instructions: available
      ? `The interactive map is available at ${mapPageUrl}. Configured presets: ${configuredPresets.join(', ')}.`
      : 'The interactive map is being set up. Web Map IDs need to be configured in ArcGIS Online.',
  };
}

/**
 * Format a response about the interactive map for the user
 */
export function formatMapInstructions(preset: string = 'base'): string {
  const config = getWebMapConfig(preset);
  const configured = isPresetConfigured(preset);
  const baseUrl = getMapBaseUrl();

  if (!configured) {
    return `
## Interactive Map - Setup in Progress

The **${config?.name || preset}** map is being configured.

Once set up, you'll be able to:
- 🗺️ Pan and zoom freely
- 🖱️ Click on parcels to see details
- 📊 Toggle layers (parcels, zoning, hazards, etc.)
- ✏️ Draw shapes and measure distances
- 🖨️ Print/export maps

**Current Status:** Waiting for Web Map ID from ArcGIS Online configuration.
    `.trim();
  }

  return `
## Interactive Map Available

Open the **${config?.name}** map: ${baseUrl}/map?preset=${preset}

**Features:**
- 🗺️ Pan and zoom freely
- 🖱️ Click on parcels to see details
- 📊 Toggle layers using the Layers panel
- ✏️ Draw shapes and measure distances
- 🖨️ Print/export maps

**Available Map Views:**
${Object.entries(WEB_MAPS)
  .map(([id, c]) => `- **${c.name}** (${id}): ${c.description}`)
  .join('\n')}
  `.trim();
}
