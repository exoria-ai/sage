/**
 * Centralized Configuration
 *
 * Single entry point for all configuration values:
 * - endpoints: External service URLs
 * - defaults: Numeric constants and default values
 * - env: Environment variable access with validation
 *
 * @example
 * ```ts
 * import { SOLANO_SERVICES, MAP_DEFAULTS, env } from '@/lib/config';
 *
 * const parcelsUrl = SOLANO_SERVICES.parcels;
 * const defaultZoom = MAP_DEFAULTS.zoom;
 * const isDev = env.isDevelopment;
 * ```
 */

// Re-export all endpoints
export {
  // Base URLs
  SOLANO_AGOL_BASE,
  SOLANO_SERVER_BASE,
  // Solano services
  SOLANO_SERVICES,
  SOLANO_MAPSERVER,
  // City zoning
  CITY_ZONING_SERVICES,
  // Hazard services
  FEMA_FLOOD_SERVICE,
  CALFIRE_FHSZ_SERVICE,
  HAZARD_SERVICES,
  // ESRI platform
  ESRI_ROUTE_SERVICE,
  ESRI_TOKEN_ENDPOINT,
  ESRI_JS_ASSETS,
  // Basemaps
  SOLANO_AERIAL_TILES,
  CARTO_VOYAGER_TILES,
  BASEMAP_TILES,
  // Web maps
  WEBMAP_IDS,
} from './endpoints';

// Re-export all defaults
export {
  // Map rendering
  MAP_DEFAULTS,
  BUFFER_DEFAULTS,
  // Geographic constants
  WEB_MERCATOR_HALF_CIRCUMFERENCE,
  EARTH_RADIUS_FEET,
  SOLANO_COUNTY_EXTENT,
  SOLANO_COUNTY_CENTER,
  DEFAULT_MAP_CENTER,
  // Styling
  MAP_COLORS,
  MAP_STROKE_WIDTHS,
  MAP_SYMBOL_SIZES,
  MAP_VIEW_PADDING,
  // API
  TIMEOUTS,
  LIMITS,
  // Scraper
  SCRAPER_DEFAULTS,
} from './defaults';

// Re-export environment
export { env, validateEnvironment, validateArcGISAuth } from './env';
