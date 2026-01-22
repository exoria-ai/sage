/**
 * Comprehensive GIS Layer Catalog for Solano County
 *
 * Extracted from the Solano_Base WebMap (187b9ec4edc243b7baf459ef27d9ab82)
 * which combines layers from all three interactive map viewers.
 *
 * Use these URLs with capture_map_view's additionalLayers parameter or
 * for layer validation in test-layer-validity.ts
 */

// Base URLs for different ArcGIS organizations
export const ARCGIS_ORGS = {
  solanoCounty: 'https://services2.arcgis.com/SCn6czzcqKAFwdGU',
  solanoTiles: 'https://tiles.arcgis.com/tiles/SCn6czzcqKAFwdGU',
  solanoVectorTiles: 'https://vectortileservices7.arcgis.com/KbDaBCmcuKbyQfck',
  californiaGov: 'https://services.gis.ca.gov',
  cgs: 'https://services2.arcgis.com/zr3KAIbsRSUyARHG', // California Geological Survey
  fema: 'https://hazards.fema.gov',
};

export type LayerType = 'FeatureServer' | 'MapServer' | 'VectorTileServer';

export interface LayerDefinition {
  /** Display name for the layer */
  title: string;
  /** Full URL to the layer */
  url: string;
  /** Layer type for validation and rendering */
  type: LayerType;
  /** Category for organizing layers */
  category: 'parcels' | 'boundaries' | 'hazards' | 'planning' | 'aerials' | 'infrastructure';
  /** Whether this layer is critical for the app (affects tests) */
  critical?: boolean;
  /** Recommended opacity when overlaying (0-1) */
  defaultOpacity?: number;
  /** Notes about the layer */
  notes?: string;
}

/**
 * Complete layer catalog organized by category
 */
export const LAYER_CATALOG: Record<string, LayerDefinition> = {
  // ============== PARCELS ==============
  parcels: {
    title: 'Parcels',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Parcels_Public_Aumentum/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'parcels',
    critical: true,
  },
  parcelsVectorTile: {
    title: 'Parcels (Vector Tile with Labels)',
    url: `${ARCGIS_ORGS.solanoVectorTiles}/arcgis/rest/services/Parcels_Public_Aumentum_Shapefiles_Vector_Tiles/VectorTileServer`,
    type: 'VectorTileServer',
    category: 'parcels',
    critical: true,
    notes: 'Updated Dec 2025 - includes APN labels at zoom 16+',
  },
  addressPoints: {
    title: 'Address Points',
    url: `${ARCGIS_ORGS.solanoCounty}/arcgis/rest/services/Address_Points/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'parcels',
    critical: true,
  },
  landValue: {
    title: 'Land Value per Square Foot',
    url: `${ARCGIS_ORGS.solanoVectorTiles}/arcgis/rest/services/Parcels_Public_Aumentum_gdb/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'parcels',
    notes: 'Aumentum data with assessed values',
  },
  subdivisions: {
    title: 'Subdivisions',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Subdivisions/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'parcels',
  },

  // ============== BOUNDARIES ==============
  cityBoundary: {
    title: 'City Boundary',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/CityBoundary/FeatureServer/2`,
    type: 'FeatureServer',
    category: 'boundaries',
    critical: true,
  },
  countyBoundary: {
    title: 'County Boundary',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/County_Boundary/FeatureServer/1`,
    type: 'FeatureServer',
    category: 'boundaries',
    critical: true,
  },
  citySphereOfInfluence: {
    title: 'City Sphere of Influence',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Cities_SphereOfInfluence/FeatureServer/1`,
    type: 'FeatureServer',
    category: 'boundaries',
  },
  bosDistricts: {
    title: 'Board of Supervisors Districts',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/BOS_District_Boundaries_2021/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'boundaries',
  },
  travisAfbBoundary: {
    title: 'Travis Air Force Base Boundary',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Travis_Air_Force_Base_property_boundaries/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'boundaries',
  },

  // ============== HAZARDS ==============
  fireHazardSeverity: {
    title: 'Fire Hazard Severity Zone',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/FireHazardSeverityZone/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'hazards',
    critical: true,
    defaultOpacity: 0.5,
  },
  fireHazard2025: {
    title: 'Fire Hazard Severity Zone Phase 2 2025',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/FireHazardSeverityZone_Phase2_2025/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'hazards',
    defaultOpacity: 0.5,
    notes: 'Latest CAL FIRE data as of 2025',
  },
  femaFloodZones: {
    title: 'FEMA Flood Zones (NFHL)',
    url: `${ARCGIS_ORGS.fema}/arcgis/rest/services/public/NFHL/MapServer/28`,
    type: 'FeatureServer', // Layer 28 is a Feature Layer within the MapServer
    category: 'hazards',
    critical: true,
    defaultOpacity: 0.5,
    notes: 'National Flood Hazard Layer - official FEMA data',
  },
  caFlood100Year: {
    title: 'California 100-Year Floodplain',
    url: `${ARCGIS_ORGS.californiaGov}/arcgis/rest/services/InlandWaters/Flood_Risk_State/MapServer/0`,
    type: 'FeatureServer',
    category: 'hazards',
    defaultOpacity: 0.5,
  },
  caFlood200Year: {
    title: 'California 200-Year Floodplain',
    url: `${ARCGIS_ORGS.californiaGov}/arcgis/rest/services/InlandWaters/Flood_Risk_State/MapServer/1`,
    type: 'FeatureServer',
    category: 'hazards',
    defaultOpacity: 0.5,
  },
  countyFloodplains: {
    title: 'County Floodplains',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Floodplains/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'hazards',
    defaultOpacity: 0.5,
    notes: 'Local floodplain data from Solano County',
  },
  earthquakeFaultZones: {
    title: 'Alquist-Priolo Earthquake Fault Zones',
    url: `${ARCGIS_ORGS.cgs}/arcgis/rest/services/CGS_Alquist_Priolo_Fault_Zones/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'hazards',
    defaultOpacity: 0.6,
    notes: 'From California Geological Survey - NOT on Solano AGOL',
  },
  travisWildlifeHazard: {
    title: 'Travis Wildlife Hazard Zone (Bird Strike)',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/BirdStrikeHazardZone/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'hazards',
    defaultOpacity: 0.4,
  },

  // ============== PLANNING - COUNTY ==============
  countyZoning: {
    title: 'County Unincorporated Zoning',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/SolanoCountyZoning_092322/FeatureServer/4`,
    type: 'FeatureServer',
    category: 'planning',
    critical: true,
    defaultOpacity: 0.6,
  },
  countyGeneralPlan: {
    title: 'County General Plan',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/SolanoCountyUnincorporated_GeneralPlan2008_updated0923/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'planning',
    defaultOpacity: 0.6,
  },

  // ============== PLANNING - CITY ZONING ==============
  beniciaZoning: {
    title: 'Benicia Zoning',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Benicia_Zoning/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'planning',
    defaultOpacity: 0.6,
  },
  dixonZoning: {
    title: 'Dixon Zoning',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/City_of_Dixon_Zoning/FeatureServer/3`,
    type: 'FeatureServer',
    category: 'planning',
    defaultOpacity: 0.6,
  },
  fairfieldZoning: {
    title: 'Fairfield Zoning',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/City_of_Fairfield_Zoning/FeatureServer/3`,
    type: 'FeatureServer',
    category: 'planning',
    defaultOpacity: 0.6,
  },
  rioVistaZoning: {
    title: 'Rio Vista Zoning',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/City_of_Rio_Vista_Zoning/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'planning',
    defaultOpacity: 0.6,
  },
  suisunZoning: {
    title: 'Suisun City Zoning',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Suisun_City_Zoning/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'planning',
    defaultOpacity: 0.6,
  },
  vacavilleZoning: {
    title: 'Vacaville Zoning',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/City_of_Vacaville_Zoning/FeatureServer/3`,
    type: 'FeatureServer',
    category: 'planning',
    defaultOpacity: 0.6,
  },
  vallejoZoning: {
    title: 'Vallejo Zoning',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Vallejo_Zoning/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'planning',
    defaultOpacity: 0.6,
  },

  // ============== PLANNING - CITY GENERAL PLANS ==============
  beniciaGeneralPlan: {
    title: 'Benicia General Plan',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Benicia_GP/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'planning',
  },
  dixonGeneralPlan: {
    title: 'Dixon General Plan',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Dixon_GP/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'planning',
  },
  fairfieldGeneralPlan: {
    title: 'Fairfield General Plan',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/City_of_Fairfield_General_Plan/FeatureServer/3`,
    type: 'FeatureServer',
    category: 'planning',
  },
  rioVistaGeneralPlan: {
    title: 'Rio Vista General Plan',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/City_of_Rio_Vista_General_Plan/FeatureServer/3`,
    type: 'FeatureServer',
    category: 'planning',
  },
  suisunGeneralPlan: {
    title: 'Suisun General Plan',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Suisun_City_General_Plan/FeatureServer/3`,
    type: 'FeatureServer',
    category: 'planning',
  },
  vacavilleGeneralPlan: {
    title: 'Vacaville General Plan',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/City_of_Vacaville_General_Plan/FeatureServer/3`,
    type: 'FeatureServer',
    category: 'planning',
  },
  vallejoGeneralPlan: {
    title: 'Vallejo General Plan',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/City_of_Vallejo_General_Plan/FeatureServer/3`,
    type: 'FeatureServer',
    category: 'planning',
  },

  // ============== AERIALS ==============
  aerial2025: {
    title: 'Aerial 2025',
    url: `${ARCGIS_ORGS.solanoTiles}/arcgis/rest/services/Aerial2025_WGS84/MapServer`,
    type: 'MapServer',
    category: 'aerials',
    critical: true,
  },
  aerial2024: {
    title: 'Aerial 2024',
    url: `${ARCGIS_ORGS.solanoTiles}/arcgis/rest/services/Aerial2024_WGS84/MapServer`,
    type: 'MapServer',
    category: 'aerials',
  },
  aerial2023: {
    title: 'Aerial 2023',
    url: `${ARCGIS_ORGS.solanoTiles}/arcgis/rest/services/Aerial2023_WGS84_ESRI_Aux/MapServer`,
    type: 'MapServer',
    category: 'aerials',
  },
  aerial2022: {
    title: 'Aerial 2022',
    url: `${ARCGIS_ORGS.solanoTiles}/arcgis/rest/services/Aerial2022_WGS84_ESRI_Aux/MapServer`,
    type: 'MapServer',
    category: 'aerials',
  },
  aerial2019: {
    title: 'Aerial 2019',
    url: `${ARCGIS_ORGS.solanoTiles}/arcgis/rest/services/Aerial2019_WGS84_ESRI_Aux/MapServer`,
    type: 'MapServer',
    category: 'aerials',
  },
  aerial2017: {
    title: 'Aerial 2017',
    url: `${ARCGIS_ORGS.solanoTiles}/arcgis/rest/services/Aerial2017_WGS84_ESRI_Aux/MapServer`,
    type: 'MapServer',
    category: 'aerials',
  },
  aerial2015: {
    title: 'Aerial 2015',
    url: `${ARCGIS_ORGS.solanoTiles}/arcgis/rest/services/Aerial2015_WGS84_ESRI_Aux/MapServer`,
    type: 'MapServer',
    category: 'aerials',
  },
  aerial2008: {
    title: 'Aerial 2008',
    url: `${ARCGIS_ORGS.solanoTiles}/arcgis/rest/services/Aerial2008_WGS84_ESRI_Aux/MapServer`,
    type: 'MapServer',
    category: 'aerials',
  },
  aerial2004: {
    title: 'Aerial 2004',
    url: `${ARCGIS_ORGS.solanoTiles}/arcgis/rest/services/Aerial2004_WGS84_ESRI_Aux/MapServer`,
    type: 'MapServer',
    category: 'aerials',
  },

  // ============== INFRASTRUCTURE ==============
  garbageServiceAreas: {
    title: 'Garbage Service Areas',
    url: `${ARCGIS_ORGS.solanoCounty}/arcgis/rest/services/Garbage_Service_Areas/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'infrastructure',
  },
  fireStations: {
    title: 'Fire Stations',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Fire_Stations/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'infrastructure',
  },
  fireResponseBoundary: {
    title: 'Fire Response Boundary',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/FireResponse_Boundary/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'infrastructure',
  },
  schools: {
    title: 'Schools',
    url: `${ARCGIS_ORGS.solanoCounty}/ArcGIS/rest/services/Schools/FeatureServer/0`,
    type: 'FeatureServer',
    category: 'infrastructure',
  },
};

/**
 * Get all critical layers (used for validation tests)
 */
export function getCriticalLayers(): LayerDefinition[] {
  return Object.values(LAYER_CATALOG).filter((l) => l.critical);
}

/**
 * Get layers by category
 */
export function getLayersByCategory(
  category: LayerDefinition['category']
): LayerDefinition[] {
  return Object.values(LAYER_CATALOG).filter((l) => l.category === category);
}

/**
 * Get a layer by key
 */
export function getLayer(key: keyof typeof LAYER_CATALOG): LayerDefinition {
  const layer = LAYER_CATALOG[key];
  if (!layer) {
    throw new Error(`Layer not found: ${key}`);
  }
  return layer;
}
