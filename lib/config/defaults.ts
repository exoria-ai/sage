/**
 * Default values and constants
 *
 * Named constants for all magic numbers used throughout the codebase.
 * Grouped by functional area for easy discovery.
 */

// =============================================================================
// Map Rendering Defaults
// =============================================================================

/** Default map image dimensions (pixels) */
export const MAP_DEFAULTS = {
  /** Default width for rendered map images */
  width: 1200,
  /** Default height for rendered map images */
  height: 800,
  /** Default zoom level for parcel-focused views */
  zoom: 17,
  /** Zoom level for property highlighting */
  highlightZoom: 18,
  /** Zoom level for center-only views (no highlight) */
  centerOnlyZoom: 15,
  /** County overview zoom level */
  countyZoom: 10,
  /** Standard tile size for web map tiles */
  tileSize: 256,
} as const;

/** Buffer visualization defaults */
export const BUFFER_DEFAULTS = {
  /** Default buffer radius in feet */
  radiusFeet: 300,
  /** Common buffer radii for notification purposes */
  commonRadii: [300, 500, 1000] as const,
} as const;

// =============================================================================
// Geographic Constants
// =============================================================================

/** Web Mercator projection constant (half Earth circumference in meters) */
export const WEB_MERCATOR_HALF_CIRCUMFERENCE = 20037508.34;

/** Earth radius in feet (for distance calculations) */
export const EARTH_RADIUS_FEET = 20902231;

/** Solano County geographic extent (WGS84) */
export const SOLANO_COUNTY_EXTENT = {
  xmin: -122.409,
  ymin: 38.031,
  xmax: -121.592,
  ymax: 38.538,
} as const;

/** Solano County center point (WGS84) */
export const SOLANO_COUNTY_CENTER = {
  longitude: -122.0,
  latitude: 38.27,
} as const;

/** Default map center for Solano County views */
export const DEFAULT_MAP_CENTER = {
  longitude: -121.972606,
  latitude: 38.256397,
} as const;

// =============================================================================
// Map Styling
// =============================================================================

/** RGBA color values for map features */
export const MAP_COLORS = {
  /** Parcel highlight fill (yellow, semi-transparent) */
  highlightFill: [255, 255, 0, 0.3] as const,
  /** Parcel highlight outline (orange) */
  highlightOutline: [255, 165, 0] as const,
  /** Route line (blue) */
  routeLine: [0, 100, 255, 0.9] as const,
  /** Route origin marker (green) */
  originMarker: [34, 197, 94] as const,
  /** Route destination marker (red) */
  destinationMarker: [239, 68, 68] as const,
  /** White outline for markers */
  markerOutline: [255, 255, 255] as const,
  /** Buffer zone fill (cyan, semi-transparent) */
  bufferFill: [0, 255, 255, 0.15] as const,
  /** Buffer zone outline (cyan) */
  bufferOutline: [0, 200, 200] as const,
} as const;

/** Line and symbol widths */
export const MAP_STROKE_WIDTHS = {
  /** Parcel highlight outline width */
  highlightOutline: 3,
  /** Route line width */
  routeLine: 5,
  /** Marker outline width */
  markerOutline: 2,
  /** Buffer zone outline width */
  bufferOutline: 2,
} as const;

/** Symbol sizes */
export const MAP_SYMBOL_SIZES = {
  /** Route endpoint marker size */
  routeMarker: 14,
} as const;

/** View padding for map animations (pixels) */
export const MAP_VIEW_PADDING = {
  top: 80,
  bottom: 50,
  left: 50,
  right: 50,
} as const;

// =============================================================================
// API and Network
// =============================================================================

/** HTTP request timeouts (milliseconds) */
export const TIMEOUTS = {
  /** Default API request timeout */
  default: 30000,
  /** Token refresh buffer before expiry */
  tokenRefreshBuffer: 300000, // 5 minutes
} as const;

/** Pagination and limits */
export const LIMITS = {
  /** Maximum parcels returned in buffer queries */
  maxBufferParcels: 250,
  /** Default sample parcels in search results */
  defaultSampleParcels: 5,
  /** Maximum nearby POI results */
  maxNearbyResults: 10,
  /** Default nearby search radius (feet) - 1 mile */
  defaultNearbyRadius: 5280,
} as const;

// =============================================================================
// Scraper Defaults
// =============================================================================

/** Web scraping configuration */
export const SCRAPER_DEFAULTS = {
  /** Delay between requests (milliseconds) */
  delayMs: 750,
  /** Maximum retry attempts */
  maxRetries: 3,
  /** Retry delay multiplier */
  retryDelayMs: 1000,
} as const;
