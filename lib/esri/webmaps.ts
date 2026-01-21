/**
 * Web Map ID Registry for SAGE
 *
 * This file contains the ArcGIS Online Web Map IDs for different map presets.
 * Ryan will populate these IDs after creating the Web Maps in ArcGIS Online.
 *
 * To update:
 * 1. Log into ArcGIS Online (arcgis.com)
 * 2. Open the Web Map
 * 3. Copy the ID from the URL (e.g., https://www.arcgis.com/home/item.html?id=YOUR_ID_HERE)
 * 4. Paste it below
 */

export interface WebMapConfig {
  id: string;
  name: string;
  description: string;
  // Default center if the Web Map doesn't have one saved
  defaultCenter?: { longitude: number; latitude: number };
  defaultZoom?: number;
}

/**
 * Web Map configurations by preset name
 *
 * INSTRUCTIONS FOR RYAN:
 * After creating each Web Map in ArcGIS Online, copy the ID and paste it here.
 * The ID is the alphanumeric string in the URL after "id="
 */
export const WEB_MAPS: Record<string, WebMapConfig> = {
  parcels: {
    id: 'cb2950078519445aa33f413f3d7d6a49',
    name: 'Parcels',
    description: 'Parcels, addresses, and property information',
    defaultCenter: { longitude: -121.972606, latitude: 38.256397 },
    defaultZoom: 10,
  },
  planning: {
    id: 'ad2ccb372575468092b5a0ab65a1f101',
    name: 'Planning',
    description: 'Zoning, general plans, and land use',
    defaultCenter: { longitude: -121.972606, latitude: 38.256397 },
    defaultZoom: 10,
  },
  hazards: {
    id: '1522f21627de455eb6e91ed24791bf1d',
    name: 'Hazards',
    description: 'FEMA flood zones and CAL FIRE severity zones',
    defaultCenter: { longitude: -121.972606, latitude: 38.256397 },
    defaultZoom: 10,
  },
};

/**
 * Get a Web Map configuration by preset name
 */
export function getWebMapConfig(preset: string): WebMapConfig | undefined {
  return WEB_MAPS[preset];
}

/**
 * Get Web Map ID by preset name
 */
export function getWebMapId(preset: string): string {
  return WEB_MAPS[preset]?.id || '';
}

/**
 * Check if a preset has a configured Web Map ID
 */
export function isPresetConfigured(preset: string): boolean {
  return Boolean(WEB_MAPS[preset]?.id);
}

/**
 * Get all configured presets
 */
export function getConfiguredPresets(): string[] {
  return Object.entries(WEB_MAPS)
    .filter(([, config]) => Boolean(config.id))
    .map(([preset]) => preset);
}

/**
 * Solano County default extent (for fallback)
 */
export const SOLANO_COUNTY_EXTENT = {
  xmin: -122.5,
  ymin: 38.0,
  xmax: -121.5,
  ymax: 38.6,
  spatialReference: { wkid: 4326 },
};

/**
 * Default center point for Solano County
 */
export const SOLANO_COUNTY_CENTER = {
  longitude: -122.0,
  latitude: 38.27,
};

/**
 * Solano County ArcGIS Services - for reference
 */
export const SOLANO_SERVICES = {
  parcels:
    'https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services/Parcels_Public_Aumentum/FeatureServer/0',
  addressPoints:
    'https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services/Address_Points/FeatureServer/0',
  cityBoundaries:
    'https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services/CityBoundary/FeatureServer/2',
  countyZoning:
    'https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services/SolanoCountyZoning_092322/FeatureServer/4',
  supervisorDistricts:
    'https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services/BOS_District_Boundaries_2021/FeatureServer/0',
};

/**
 * External hazard services
 */
export const HAZARD_SERVICES = {
  femaFlood:
    'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer',
  calFire:
    'https://services.gis.ca.gov/arcgis/rest/services/Environment/Fire_Severity_Zones/MapServer',
};
