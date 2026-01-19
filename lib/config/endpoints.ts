/**
 * Centralized ArcGIS and external service endpoints
 *
 * All external service URLs are defined here for:
 * - Single source of truth
 * - Easy environment-specific overrides
 * - Clear documentation of service dependencies
 */

// =============================================================================
// Solano County ArcGIS Online (AGOL) Services
// =============================================================================

/** Base URL for Solano County's ArcGIS Online hosted services */
export const SOLANO_AGOL_BASE =
  'https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services';

/** Solano County GIS Server (on-premise) */
export const SOLANO_SERVER_BASE =
  'https://solanocountygis.com/server/rest/services';

/** Solano County Feature Services */
export const SOLANO_SERVICES = {
  /** Parcel boundaries with Aumentum assessment data */
  parcels: `${SOLANO_AGOL_BASE}/Parcels_Public_Aumentum/FeatureServer/0`,

  /** Address points for geocoding */
  addressPoints: `${SOLANO_AGOL_BASE}/Address_Points/FeatureServer/0`,

  /** City boundary polygons */
  cityBoundary: `${SOLANO_AGOL_BASE}/CityBoundary/FeatureServer/2`,

  /** County boundary polygon */
  countyBoundary: `${SOLANO_AGOL_BASE}/County_Boundary/FeatureServer/1`,

  /** County zoning districts */
  countyZoning: `${SOLANO_AGOL_BASE}/SolanoCountyZoning_092322/FeatureServer/4`,

  /** Board of Supervisors district boundaries */
  supervisorDistricts: `${SOLANO_AGOL_BASE}/BOS_District_Boundaries_2021/FeatureServer/0`,
} as const;

/** Solano County MapServer for export/rendering */
export const SOLANO_MAPSERVER = {
  /** Aumentum public MapServer (parcels, assessment) */
  aumentum: `${SOLANO_SERVER_BASE}/Aumentum/AumentumPublic/MapServer`,
} as const;

// =============================================================================
// City Zoning Services
// =============================================================================

/** City-specific zoning FeatureServer endpoints */
export const CITY_ZONING_SERVICES = {
  benicia: `${SOLANO_AGOL_BASE}/CityOfBenicia_ZoningDistricts/FeatureServer/0`,
  dixon: `${SOLANO_AGOL_BASE}/CityOfDixon_ZoningDistricts/FeatureServer/0`,
  fairfield: `${SOLANO_AGOL_BASE}/Fairfield_Zoning/FeatureServer/0`,
  rioVista: `${SOLANO_AGOL_BASE}/CityOfRioVista_ZoningDistricts/FeatureServer/0`,
  suisunCity: `${SOLANO_AGOL_BASE}/CityOfSuisunCity_ZoningDistricts/FeatureServer/0`,
  vacaville: `${SOLANO_AGOL_BASE}/CityOfVacaville_ZoningDistricts/FeatureServer/0`,
  vallejo: `${SOLANO_AGOL_BASE}/CityOfVallejo_ZoningDistricts/FeatureServer/0`,
} as const;

// =============================================================================
// External Hazard Services
// =============================================================================

/** FEMA National Flood Hazard Layer */
export const FEMA_FLOOD_SERVICE =
  'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer';

/** CAL FIRE Fire Hazard Severity Zones */
export const CALFIRE_FHSZ_SERVICE =
  'https://services.gis.ca.gov/arcgis/rest/services/Environment/Fire_Severity_Zones/MapServer';

/** External hazard services grouped */
export const HAZARD_SERVICES = {
  femaFlood: FEMA_FLOOD_SERVICE,
  calFireFhsz: CALFIRE_FHSZ_SERVICE,
} as const;

// =============================================================================
// ESRI Platform Services
// =============================================================================

/** ESRI World Route Service for driving directions */
export const ESRI_ROUTE_SERVICE =
  'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World';

/** ESRI OAuth token endpoint */
export const ESRI_TOKEN_ENDPOINT =
  'https://www.arcgis.com/sharing/rest/oauth2/token';

/** ESRI JS SDK assets CDN */
export const ESRI_JS_ASSETS = 'https://js.arcgis.com/4.34/@arcgis/core/assets';

// =============================================================================
// Basemap Tile Services
// =============================================================================

/** Solano County 2025 aerial imagery tiles */
export const SOLANO_AERIAL_TILES =
  'https://tiles.arcgis.com/tiles/SCn6czzcqKAFwdGU/arcgis/rest/services/Aerial2025_WGS84/MapServer/tile';

/** CARTO Voyager basemap (street map) */
export const CARTO_VOYAGER_TILES =
  'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png';

/** Basemap tile services */
export const BASEMAP_TILES = {
  aerial: SOLANO_AERIAL_TILES,
  streets: CARTO_VOYAGER_TILES,
} as const;

// =============================================================================
// ArcGIS Online Web Map IDs
// =============================================================================

/** Pre-configured web map portal item IDs */
export const WEBMAP_IDS = {
  /** Base property research map */
  base: 'cec12b4c94ea4c62b32e1ebd340e8bac',
  // Future web maps:
  // hazards: '',
  // zoning: '',
  // environmental: '',
  // districts: '',
} as const;
