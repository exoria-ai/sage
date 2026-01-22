/**
 * Capture Map View Tool
 *
 * Generates map snapshots for AI spatial analysis using ESRI's Export Web Map Task.
 * This tool is designed for the AI to visually assess geographic context, verify
 * spatial relationships, and understand the layout of features.
 *
 * Key features:
 * - Vector tile parcels with APN labels at appropriate zoom levels
 * - Configurable layers (aerial imagery, boundaries, hazards)
 * - Highlight and buffer visualization for specific parcels
 * - Rich metadata for spatial context (extent, scale, layers shown)
 *
 * For user-facing interactive maps, use get_interactive_map_url instead.
 */

import { parseAPN } from '@/lib/utils/apn';
import {
  SOLANO_SERVICES,
  SOLANO_AGOL_BASE,
  MAP_DEFAULTS,
  SOLANO_COUNTY_EXTENT,
} from '@/lib/config';

// =============================================================================
// Types
// =============================================================================

interface BufferOptions {
  apn?: string;
  latitude?: number;
  longitude?: number;
  radius_feet: number;
  show_ring?: boolean;
  highlight_parcels?: boolean;
}

interface BoundaryOptions {
  showCounty?: boolean;
  showCities?: boolean;
  countyFill?: boolean;
  cityFill?: boolean;
}

/** Layer visibility options - all default to service behavior if not specified */
interface LayerOptions {
  parcels?: boolean;
  addressPoints?: boolean;
  cityBoundary?: boolean;
  countyBoundary?: boolean;
  aerial2025?: boolean;
  garbageAreas?: boolean;
}

/** Additional map service layer configuration */
export interface AdditionalMapService {
  /** URL to the map service (MapServer or FeatureServer) */
  url: string;
  /** Display title for the layer */
  title?: string;
  /** Layer opacity (0-1, default: 1) */
  opacity?: number;
  /** Layer type - auto-detected if not specified */
  layerType?: 'ArcGISTiledMapServiceLayer' | 'ArcGISMapServiceLayer' | 'ArcGISFeatureLayer';
  /** Optional definition expression to filter features */
  where?: string;
}

/** Configuration for using a layer's extent as the map extent */
export interface ExtentLayerConfig {
  /** URL to the layer (FeatureServer or MapServer) */
  url: string;
  /** Optional where clause to filter features for extent calculation */
  where?: string;
  /** Padding around the extent as a percentage (0-1, default: 0.1 = 10%) */
  padding?: number;
}

type BasemapType = 'topographic' | 'imagery' | 'imagery-hybrid' | 'navigation';

/** Layout template options for print output */
type LayoutTemplate = 'MAP_ONLY' | 'Letter ANSI A Landscape' | 'A4 Landscape';

/** Layout options when using a template with marginalia */
interface LayoutOptions {
  /** Title text for the map */
  title?: string;
  /** Author attribution */
  author?: string;
  /** Scale bar unit: 'Feet', 'Miles', 'Meters', 'Kilometers' */
  scalebarUnit?: 'Feet' | 'Miles' | 'Meters' | 'Kilometers';
}

interface MapOptions {
  center?: { latitude: number; longitude: number };
  apn?: string;
  apns?: string[];
  bbox?: { xmin: number; ymin: number; xmax: number; ymax: number };
  width?: number;
  height?: number;
  zoom?: number;
  showParcel?: boolean;
  format?: 'png' | 'jpg';
  basemap?: BasemapType;
  highlightApn?: string;
  buffer?: BufferOptions;
  boundaries?: BoundaryOptions;
  extent?: 'county';
  layers?: LayerOptions;
  /** Additional map services to overlay (rendered in order provided) */
  additionalLayers?: AdditionalMapService[];
  /** Use a layer's extent as the map extent */
  extentLayer?: ExtentLayerConfig;
  /** Layout template - 'MAP_ONLY' for just the map, or a template with scale bar/title */
  layout?: LayoutTemplate;
  /** Options for layout templates with marginalia */
  layoutOptions?: LayoutOptions;
}

/** Spatial context metadata for AI analysis */
interface SpatialContext {
  /** Bounding box of the map view in WGS84 */
  extent: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
  /** Approximate map scale (e.g., "1:5000") */
  scale: string;
  /** List of layers visible in the map */
  layersShown: string[];
  /** APNs that are highlighted on the map */
  highlightedApns?: string[];
  /** Buffer info if a buffer is shown */
  buffer?: {
    centerApn?: string;
    radiusFeet: number;
  };
  /** Approximate area shown in the map */
  approximateArea: string;
  /** Layout template used (if not MAP_ONLY, includes scale bar) */
  layout?: string;
  /** Whether a scale bar is included in the output */
  hasScaleBar?: boolean;
}

interface CaptureMapResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  mimeType?: string;
  center?: { latitude: number; longitude: number };
  width?: number;
  height?: number;
  zoom?: number;
  /** Rich spatial context for AI analysis */
  context?: SpatialContext;
  error_type?: string;
  message?: string;
  suggestion?: string;
}

// =============================================================================
// Constants
// =============================================================================

const PRINT_SERVICE_URL =
  'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute';

const DEFAULT_WIDTH = MAP_DEFAULTS.width;
const DEFAULT_HEIGHT = MAP_DEFAULTS.height;
const DEFAULT_ZOOM = MAP_DEFAULTS.zoom;

// Layer URLs - these match the WebMap's configured layers
const LAYER_URLS = {
  parcels: `${SOLANO_AGOL_BASE}/Parcels_Public_Aumentum/FeatureServer/0`,
  // Vector tile layer includes APN labels at appropriate zoom levels
  parcelsVectorTile: 'https://vectortileservices7.arcgis.com/KbDaBCmcuKbyQfck/arcgis/rest/services/Parcels_Public_Aumentum_Vector_Tile/VectorTileServer',
  addressPoints: `${SOLANO_AGOL_BASE}/Address_Points/FeatureServer/0`,
  cityBoundary: SOLANO_SERVICES.cityBoundary,
  countyBoundary: `${SOLANO_AGOL_BASE}/County_Boundary/FeatureServer/1`,
  garbageAreas: `${SOLANO_AGOL_BASE}/Garbage_Service_Areas/FeatureServer/0`,
  aerial2025: 'https://tiles.arcgis.com/tiles/SCn6czzcqKAFwdGU/arcgis/rest/services/Aerial2025_WGS84/MapServer',
};

// Basemap layer configuration type
interface BasemapLayerConfig {
  id: string;
  url?: string;
  styleUrl?: string;
  visibility: boolean;
  opacity: number;
  layerType: string;
  type?: string;
}

interface BasemapConfig {
  title: string;
  baseMapLayers: BasemapLayerConfig[];
}

// Basemap configurations
// Names match what users see in ArcGIS Online basemap gallery
const BASEMAPS: Record<BasemapType, BasemapConfig> = {
  // World Topographic Map + World Hillshade
  topographic: {
    title: 'Topographic',
    baseMapLayers: [
      {
        id: 'World_Hillshade',
        url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',
        visibility: true,
        opacity: 1,
        layerType: 'ArcGISTiledMapServiceLayer',
      },
      {
        id: 'World_Topo_Map',
        type: 'VectorTileLayer',
        visibility: true,
        opacity: 1,
        layerType: 'VectorTileLayer',
        styleUrl: 'https://cdn.arcgis.com/sharing/rest/content/items/7dc6cea0b1764a1f9af2e679f642f0f5/resources/styles/root.json',
      },
    ],
  },
  // World Imagery
  imagery: {
    title: 'Imagery',
    baseMapLayers: [
      {
        id: 'World_Imagery',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        visibility: true,
        opacity: 1,
        layerType: 'ArcGISTiledMapServiceLayer',
      },
    ],
  },
  // World Imagery + Hybrid Reference Layer
  'imagery-hybrid': {
    title: 'Imagery Hybrid',
    baseMapLayers: [
      {
        id: 'World_Imagery',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        visibility: true,
        opacity: 1,
        layerType: 'ArcGISTiledMapServiceLayer',
      },
      {
        id: 'Hybrid_Reference_Layer',
        type: 'VectorTileLayer',
        visibility: true,
        opacity: 1,
        layerType: 'VectorTileLayer',
        styleUrl: 'https://cdn.arcgis.com/sharing/rest/content/items/30d6b8271e1849cd9c3042060001f425/resources/styles/root.json',
      },
    ],
  },
  // World Navigation Map
  navigation: {
    title: 'Navigation',
    baseMapLayers: [
      {
        id: 'World_Navigation_Map',
        type: 'VectorTileLayer',
        visibility: true,
        opacity: 1,
        layerType: 'VectorTileLayer',
        styleUrl: 'https://cdn.arcgis.com/sharing/rest/content/items/63c47b7177f946b49902c24129b87252/resources/styles/root.json',
      },
    ],
  },
};

// Symbol definitions - ONLY for graphics layers (highlights, buffers, markers)
// Operational layers use map service default symbology
const SYMBOLS = {
  // Highlight symbol for selected/focused parcels
  highlightFill: {
    type: 'esriSFS',
    style: 'esriSFSSolid',
    color: [59, 130, 246, 77], // Blue 30% opacity
    outline: {
      type: 'esriSLS',
      style: 'esriSLSSolid',
      color: [59, 130, 246, 255],
      width: 3,
    },
  },
  // Buffer source parcel (orange)
  bufferSource: {
    type: 'esriSFS',
    style: 'esriSFSSolid',
    color: [249, 115, 22, 100], // Orange 40% opacity
    outline: {
      type: 'esriSLS',
      style: 'esriSLSSolid',
      color: [234, 88, 12, 255],
      width: 3,
    },
  },
  // Buffer ring (dashed circle)
  bufferRing: {
    type: 'esriSLS',
    style: 'esriSLSDash',
    color: [249, 115, 22, 230], // Orange
    width: 2.5,
  },
  // Center marker (for coordinate-based maps without parcel highlight)
  centerMarker: {
    type: 'esriSMS',
    style: 'esriSMSCircle',
    color: [220, 38, 38, 255], // Red
    size: 12,
    outline: {
      type: 'esriSLS',
      style: 'esriSLSSolid',
      color: [255, 255, 255, 255],
      width: 2,
    },
  },
};

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Convert APN to 10-digit parcelid format
 * Database format: BBBPPPNNNN where NNN0 = parcel number with trailing 0
 * Example: 008-013-001 → 0080130010 (001 becomes 0010)
 */
function apnToParcelId(apn: string): string | null {
  const parsed = parseAPN(apn);
  if (!parsed) return null;

  // Parcel numbers in the database have a trailing 0
  // 001 → 0010, 123 → 1230, etc.
  const parcelPadded = parsed.parcel.padStart(3, '0') + '0';
  return `${parsed.mapBook}${parsed.page}${parcelPadded}`;
}

/**
 * Get parcel extent from APN
 */
async function getParcelExtent(apn: string): Promise<{
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  centerLat: number;
  centerLon: number;
} | null> {
  const parcelId = apnToParcelId(apn);
  if (!parcelId) return null;

  try {
    const params = new URLSearchParams({
      where: `parcelid='${parcelId}'`,
      returnExtentOnly: 'true',
      outSR: '4326',
      f: 'json',
    });

    const response = await fetch(`${LAYER_URLS.parcels}/query?${params}`);
    const data = await response.json();

    if (!data.extent) {
      return null;
    }

    return {
      xmin: data.extent.xmin,
      ymin: data.extent.ymin,
      xmax: data.extent.xmax,
      ymax: data.extent.ymax,
      centerLat: (data.extent.ymin + data.extent.ymax) / 2,
      centerLon: (data.extent.xmin + data.extent.xmax) / 2,
    };
  } catch {
    return null;
  }
}

/**
 * Get combined extent of multiple parcels from their APNs
 */
async function getMultiParcelExtent(apns: string[]): Promise<{
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  centerLat: number;
  centerLon: number;
} | null> {
  const whereClause = buildApnWhereClause(apns);
  if (!whereClause) return null;

  try {
    const params = new URLSearchParams({
      where: whereClause,
      returnExtentOnly: 'true',
      outSR: '4326',
      f: 'json',
    });

    const response = await fetch(`${LAYER_URLS.parcels}/query?${params}`);
    const data = await response.json();

    if (!data.extent) return null;

    return {
      xmin: data.extent.xmin,
      ymin: data.extent.ymin,
      xmax: data.extent.xmax,
      ymax: data.extent.ymax,
      centerLat: (data.extent.ymin + data.extent.ymax) / 2,
      centerLon: (data.extent.xmin + data.extent.xmax) / 2,
    };
  } catch {
    return null;
  }
}

/**
 * Calculate bounding box from center and zoom
 */
function calculateBboxFromCenter(
  lat: number,
  lon: number,
  zoom: number,
  width: number,
  height: number
): { xmin: number; ymin: number; xmax: number; ymax: number } {
  // At zoom z, degrees per pixel = 360 / (256 * 2^z) * cos(lat)
  const degreesPerPixelX = 360 / (256 * Math.pow(2, zoom));
  const degreesPerPixelY = degreesPerPixelX * Math.cos((lat * Math.PI) / 180);

  const halfWidth = (width / 2) * degreesPerPixelX;
  const halfHeight = (height / 2) * degreesPerPixelY;

  return {
    xmin: lon - halfWidth,
    ymin: lat - halfHeight,
    xmax: lon + halfWidth,
    ymax: lat + halfHeight,
  };
}

/**
 * Calculate zoom to fit bbox
 */
function calculateZoomForBbox(
  bbox: { xmin: number; ymin: number; xmax: number; ymax: number },
  width: number,
  height: number,
  padding: number = 0.1
): number {
  const lonSpan = (bbox.xmax - bbox.xmin) * (1 + padding * 2);
  const latSpan = (bbox.ymax - bbox.ymin) * (1 + padding * 2);
  const latCenter = (bbox.ymin + bbox.ymax) / 2;

  const zoomX = Math.log2((360 * width) / (lonSpan * 256));
  const zoomY = Math.log2((360 * height * Math.cos((latCenter * Math.PI) / 180)) / (latSpan * 256));

  return Math.max(8, Math.min(19, Math.floor(Math.min(zoomX, zoomY))));
}

/**
 * Calculate zoom to fit buffer
 */
function calculateZoomForBuffer(
  radiusFeet: number,
  width: number,
  height: number
): number {
  // Convert feet to degrees (approximate at 38° lat)
  const radiusDegreesLat = radiusFeet / 364000;
  const radiusDegreesLon = radiusFeet / 288000;

  const bbox = {
    xmin: -radiusDegreesLon,
    ymin: -radiusDegreesLat,
    xmax: radiusDegreesLon,
    ymax: radiusDegreesLat,
  };

  return calculateZoomForBbox(bbox, width * 0.7, height * 0.7, 0);
}

/**
 * Build WHERE clause for APN filter using parcelid field
 */
function buildApnWhereClause(apns: string[]): string {
  return apns
    .map((apn) => {
      const parcelId = apnToParcelId(apn);
      return parcelId ? `parcelid='${parcelId}'` : null;
    })
    .filter(Boolean)
    .join(' OR ');
}

/**
 * Query the extent of a layer from its service
 */
async function getLayerExtent(
  url: string,
  where?: string
): Promise<{
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  centerLat: number;
  centerLon: number;
} | null> {
  try {
    // Determine if this is a FeatureServer or MapServer
    const isFeatureServer = url.includes('/FeatureServer');

    if (isFeatureServer) {
      // For FeatureServer, use query with returnExtentOnly
      const params = new URLSearchParams({
        where: where || '1=1',
        returnExtentOnly: 'true',
        outSR: '4326',
        f: 'json',
      });

      const response = await fetch(`${url}/query?${params}`);
      const data = await response.json();

      if (data.extent) {
        return {
          xmin: data.extent.xmin,
          ymin: data.extent.ymin,
          xmax: data.extent.xmax,
          ymax: data.extent.ymax,
          centerLat: (data.extent.ymin + data.extent.ymax) / 2,
          centerLon: (data.extent.xmin + data.extent.xmax) / 2,
        };
      }
    } else {
      // For MapServer, get the full extent from the service info
      const response = await fetch(`${url}?f=json`);
      const data = await response.json();

      // MapServer returns fullExtent
      if (data.fullExtent) {
        // If extent is not in WGS84, we need to get it in 4326
        if (data.fullExtent.spatialReference?.wkid !== 4326) {
          // Query with outSR to get extent in WGS84
          const extentParams = new URLSearchParams({
            f: 'json',
            outSR: '4326',
          });

          // Try to get extent from first layer if available
          const layerResponse = await fetch(`${url}/0?f=json`);
          const layerData = await layerResponse.json();

          if (layerData.extent) {
            return {
              xmin: layerData.extent.xmin,
              ymin: layerData.extent.ymin,
              xmax: layerData.extent.xmax,
              ymax: layerData.extent.ymax,
              centerLat: (layerData.extent.ymin + layerData.extent.ymax) / 2,
              centerLon: (layerData.extent.xmin + layerData.extent.xmax) / 2,
            };
          }
        } else {
          return {
            xmin: data.fullExtent.xmin,
            ymin: data.fullExtent.ymin,
            xmax: data.fullExtent.xmax,
            ymax: data.fullExtent.ymax,
            centerLat: (data.fullExtent.ymin + data.fullExtent.ymax) / 2,
            centerLon: (data.fullExtent.xmin + data.fullExtent.xmax) / 2,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching layer extent:', error);
    return null;
  }
}

/**
 * Auto-detect layer type from URL
 */
function detectLayerType(url: string): 'ArcGISTiledMapServiceLayer' | 'ArcGISMapServiceLayer' | 'ArcGISFeatureLayer' {
  if (url.includes('/FeatureServer')) {
    return 'ArcGISFeatureLayer';
  } else if (url.includes('/tiles/') || url.includes('Tile')) {
    return 'ArcGISTiledMapServiceLayer';
  } else {
    return 'ArcGISMapServiceLayer';
  }
}

/**
 * Create a circle geometry for buffer ring
 */
function createCircleGeometry(
  centerLon: number,
  centerLat: number,
  radiusFeet: number,
  numPoints: number = 64
): { rings: number[][][] } {
  // Convert feet to degrees
  const radiusDegreesLat = radiusFeet / 364000;
  const radiusDegreesLon = radiusFeet / 288000;

  const ring: number[][] = [];
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = centerLon + radiusDegreesLon * Math.cos(angle);
    const y = centerLat + radiusDegreesLat * Math.sin(angle);
    ring.push([x, y]);
  }

  return { rings: [ring] };
}

// =============================================================================
// WebMap JSON Builder
// =============================================================================

interface WebMapJson {
  mapOptions: {
    extent: {
      xmin: number;
      ymin: number;
      xmax: number;
      ymax: number;
      spatialReference: { wkid: number };
    };
  };
  operationalLayers: Array<{
    id: string;
    title: string;
    url?: string;
    styleUrl?: string; // For VectorTileLayer
    visibility: boolean;
    opacity: number;
    layerType: string;
    layerDefinition?: {
      definitionExpression?: string;
      drawingInfo?: {
        renderer: {
          type: string;
          symbol: unknown;
        };
      };
    };
    featureCollection?: {
      layers: Array<{
        layerDefinition: {
          geometryType: string;
          drawingInfo: {
            renderer: {
              type: string;
              symbol: unknown;
            };
          };
        };
        featureSet: {
          geometryType: string;
          features: Array<{
            geometry: unknown;
          }>;
        };
      }>;
    };
  }>;
  baseMap: {
    title: string;
    baseMapLayers: Array<{
      id: string;
      url?: string;
      styleUrl?: string;
      visibility: boolean;
      opacity: number;
      layerType: string;
      type?: string;
    }>;
  };
  exportOptions: {
    outputSize: [number, number];
    dpi: number;
  };
}

function buildWebMapJson(options: {
  bbox: { xmin: number; ymin: number; xmax: number; ymax: number };
  width: number;
  height: number;
  basemap: BasemapType;
  layers: LayerOptions;
  highlightApns?: string[];
  bufferSourceApn?: string;
  bufferRing?: { centerLon: number; centerLat: number; radiusFeet: number };
  centerMarker?: { lon: number; lat: number };
  boundaries?: BoundaryOptions;
  zoom: number;
  additionalLayers?: AdditionalMapService[];
}): WebMapJson {
  const {
    bbox,
    width,
    height,
    basemap,
    layers,
    highlightApns,
    bufferSourceApn,
    bufferRing,
    centerMarker,
    boundaries,
    zoom,
    additionalLayers,
  } = options;

  const operationalLayers: WebMapJson['operationalLayers'] = [];

  // ==========================================================================
  // Operational Layers - use map service default symbology (no drawingInfo)
  // ==========================================================================

  // 1. 2025 Aerial imagery (as operational layer, on top of basemap)
  if (layers.aerial2025) {
    operationalLayers.push({
      id: 'aerial-2025',
      title: 'Aerial 2025',
      url: LAYER_URLS.aerial2025,
      visibility: true,
      opacity: 1,
      layerType: 'ArcGISTiledMapServiceLayer',
    });
  }

  // 2. Garbage Service Areas (if enabled)
  if (layers.garbageAreas) {
    operationalLayers.push({
      id: 'garbage-areas',
      title: 'Garbage Service Areas',
      url: LAYER_URLS.garbageAreas,
      visibility: true,
      opacity: 0.6,
      layerType: 'ArcGISFeatureLayer',
      // No layerDefinition.drawingInfo - use service default symbology
    });
  }

  // 3. Parcel boundaries with labels (vector tile layer)
  // Vector tiles include APN labels at zoom >= 16
  if (layers.parcels !== false && zoom >= 14) {
    operationalLayers.push({
      id: 'parcels',
      title: 'Parcels',
      layerType: 'VectorTileLayer',
      styleUrl: `${LAYER_URLS.parcelsVectorTile}/resources/styles/root.json`,
      visibility: true,
      opacity: 1,
    });
  }

  // 4. City boundaries (if enabled via boundaries option)
  if (boundaries?.showCities || layers.cityBoundary) {
    operationalLayers.push({
      id: 'city-boundaries',
      title: 'City Boundaries',
      url: LAYER_URLS.cityBoundary,
      visibility: true,
      opacity: 0.8,
      layerType: 'ArcGISFeatureLayer',
      // No layerDefinition.drawingInfo - use service default symbology
    });
  }

  // 5. County boundary (if enabled via boundaries or layers option)
  if (boundaries?.showCounty || layers.countyBoundary) {
    operationalLayers.push({
      id: 'county-boundary',
      title: 'County Boundary',
      url: LAYER_URLS.countyBoundary,
      visibility: true,
      opacity: 1,
      layerType: 'ArcGISFeatureLayer',
      // No layerDefinition.drawingInfo - use service default symbology
    });
  }

  // 6. Address points (if enabled)
  if (layers.addressPoints) {
    operationalLayers.push({
      id: 'address-points',
      title: 'Address Points',
      url: LAYER_URLS.addressPoints,
      visibility: true,
      opacity: 1,
      layerType: 'ArcGISFeatureLayer',
      // No layerDefinition.drawingInfo - use service default symbology
    });
  }

  // ==========================================================================
  // Additional Map Services - user-specified layers (rendered in order)
  // ==========================================================================

  if (additionalLayers && additionalLayers.length > 0) {
    additionalLayers.forEach((layer, index) => {
      const layerType = layer.layerType || detectLayerType(layer.url);
      const layerConfig: WebMapJson['operationalLayers'][0] = {
        id: `additional-layer-${index}`,
        title: layer.title || `Layer ${index + 1}`,
        url: layer.url,
        visibility: true,
        opacity: layer.opacity ?? 1,
        layerType,
      };

      // Add definition expression if provided
      if (layer.where) {
        layerConfig.layerDefinition = {
          definitionExpression: layer.where,
        };
      }

      operationalLayers.push(layerConfig);
    });
  }

  // ==========================================================================
  // Graphics Layers - custom symbology for highlights/buffers/markers
  // ==========================================================================

  // 7. Highlighted parcels (custom blue fill - this is a graphics overlay)
  if (highlightApns && highlightApns.length > 0) {
    const whereClause = buildApnWhereClause(highlightApns);
    if (whereClause) {
      operationalLayers.push({
        id: 'parcels-highlight',
        title: 'Highlighted Parcels',
        url: LAYER_URLS.parcels,
        visibility: true,
        opacity: 1,
        layerType: 'ArcGISFeatureLayer',
        layerDefinition: {
          definitionExpression: whereClause,
          drawingInfo: {
            renderer: {
              type: 'simple',
              symbol: SYMBOLS.highlightFill,
            },
          },
        },
      });
    }
  }

  // 8. Buffer source parcel (custom orange highlight)
  if (bufferSourceApn) {
    const parcelId = apnToParcelId(bufferSourceApn);
    if (parcelId) {
      operationalLayers.push({
        id: 'buffer-source',
        title: 'Buffer Source',
        url: LAYER_URLS.parcels,
        visibility: true,
        opacity: 1,
        layerType: 'ArcGISFeatureLayer',
        layerDefinition: {
          definitionExpression: `parcelid='${parcelId}'`,
          drawingInfo: {
            renderer: {
              type: 'simple',
              symbol: SYMBOLS.bufferSource,
            },
          },
        },
      });
    }
  }

  // 9. Buffer ring (custom dashed circle)
  if (bufferRing) {
    const circleGeom = createCircleGeometry(
      bufferRing.centerLon,
      bufferRing.centerLat,
      bufferRing.radiusFeet
    );
    operationalLayers.push({
      id: 'buffer-ring',
      title: 'Buffer Ring',
      visibility: true,
      opacity: 1,
      layerType: 'ArcGISFeatureLayer',
      featureCollection: {
        layers: [
          {
            layerDefinition: {
              geometryType: 'esriGeometryPolygon',
              drawingInfo: {
                renderer: {
                  type: 'simple',
                  symbol: {
                    type: 'esriSFS',
                    style: 'esriSFSNull',
                    outline: SYMBOLS.bufferRing,
                  },
                },
              },
            },
            featureSet: {
              geometryType: 'esriGeometryPolygon',
              features: [
                {
                  geometry: {
                    ...circleGeom,
                    spatialReference: { wkid: 4326 },
                  },
                },
              ],
            },
          },
        ],
      },
    });
  }

  // 10. Center marker (when no parcels highlighted)
  if (centerMarker) {
    operationalLayers.push({
      id: 'center-marker',
      title: 'Center Marker',
      visibility: true,
      opacity: 1,
      layerType: 'ArcGISFeatureLayer',
      featureCollection: {
        layers: [
          {
            layerDefinition: {
              geometryType: 'esriGeometryPoint',
              drawingInfo: {
                renderer: {
                  type: 'simple',
                  symbol: SYMBOLS.centerMarker,
                },
              },
            },
            featureSet: {
              geometryType: 'esriGeometryPoint',
              features: [
                {
                  geometry: {
                    x: centerMarker.lon,
                    y: centerMarker.lat,
                    spatialReference: { wkid: 4326 },
                  },
                },
              ],
            },
          },
        ],
      },
    });
  }

  return {
    mapOptions: {
      extent: {
        xmin: bbox.xmin,
        ymin: bbox.ymin,
        xmax: bbox.xmax,
        ymax: bbox.ymax,
        spatialReference: { wkid: 4326 },
      },
    },
    operationalLayers,
    baseMap: BASEMAPS[basemap] || BASEMAPS.topographic,
    exportOptions: {
      outputSize: [width, height],
      dpi: 96,
    },
  };
}

// =============================================================================
// Export Function
// =============================================================================

async function exportWebMap(
  webMapJson: WebMapJson,
  layout: LayoutTemplate = 'MAP_ONLY',
  layoutOptions?: LayoutOptions
): Promise<{
  success: boolean;
  imageUrl?: string;
  error?: string;
}> {
  try {
    const params = new URLSearchParams({
      Web_Map_as_JSON: JSON.stringify(webMapJson),
      Format: 'PNG32',
      Layout_Template: layout,
      f: 'json',
    });

    // Add layout options if using a template with marginalia
    if (layout !== 'MAP_ONLY' && layoutOptions) {
      const options: Record<string, unknown> = {};
      if (layoutOptions.title) options.titleText = layoutOptions.title;
      if (layoutOptions.author) options.authorText = layoutOptions.author;
      if (layoutOptions.scalebarUnit) {
        options.scaleBarOptions = {
          metricUnit: layoutOptions.scalebarUnit === 'Meters' ? 'esriMeters' :
                      layoutOptions.scalebarUnit === 'Kilometers' ? 'esriKilometers' : undefined,
          metricLabel: layoutOptions.scalebarUnit === 'Meters' ? 'm' :
                       layoutOptions.scalebarUnit === 'Kilometers' ? 'km' : undefined,
          nonMetricUnit: layoutOptions.scalebarUnit === 'Feet' ? 'esriFeet' :
                         layoutOptions.scalebarUnit === 'Miles' ? 'esriMiles' : undefined,
          nonMetricLabel: layoutOptions.scalebarUnit === 'Feet' ? 'ft' :
                          layoutOptions.scalebarUnit === 'Miles' ? 'mi' : undefined,
        };
      }
      if (Object.keys(options).length > 0) {
        params.set('Layout_Options', JSON.stringify(options));
      }
    }

    const response = await fetch(PRINT_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error.message || 'Print service error',
      };
    }

    if (data.results?.[0]?.value?.url) {
      return {
        success: true,
        imageUrl: data.results[0].value.url,
      };
    }

    return {
      success: false,
      error: 'No image URL in response',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch image and convert to base64
 */
async function fetchImageAsBase64(url: string): Promise<{
  success: boolean;
  base64?: string;
  error?: string;
}> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` };
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return { success: true, base64 };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// =============================================================================
// Main Export
// =============================================================================

/**
 * Calculate approximate map scale based on zoom level and latitude
 */
function calculateScale(zoom: number, latitude: number): string {
  // At zoom 0, the entire world (360°) fits in 256 pixels
  // Each zoom level doubles the resolution
  // Scale = ground distance / map distance
  // Ground distance per pixel = (circumference of earth * cos(lat)) / (256 * 2^zoom)
  const earthCircumference = 40075016.686; // meters
  const metersPerPixel = (earthCircumference * Math.cos(latitude * Math.PI / 180)) / (256 * Math.pow(2, zoom));

  // Assuming 96 DPI display, 1 inch = 0.0254 meters
  const metersPerInch = 0.0254;
  const pixelsPerInch = 96;
  const scale = Math.round(metersPerPixel * pixelsPerInch / metersPerInch);

  // Round to nice numbers
  if (scale >= 1000000) return `1:${Math.round(scale / 1000000)}M`;
  if (scale >= 1000) return `1:${Math.round(scale / 1000)}K`;
  return `1:${scale}`;
}

/**
 * Calculate approximate area shown in the map
 */
function calculateApproximateArea(bbox: { xmin: number; ymin: number; xmax: number; ymax: number }): string {
  const latCenter = (bbox.ymin + bbox.ymax) / 2;

  // Convert degrees to approximate distances
  const lonDist = (bbox.xmax - bbox.xmin) * 111320 * Math.cos(latCenter * Math.PI / 180); // meters
  const latDist = (bbox.ymax - bbox.ymin) * 110540; // meters

  const areaSqMeters = lonDist * latDist;
  const areaSqMiles = areaSqMeters / 2589988;
  const areaAcres = areaSqMeters / 4046.86;

  if (areaSqMiles >= 1) {
    return `~${areaSqMiles.toFixed(1)} sq miles`;
  } else if (areaAcres >= 10) {
    return `~${Math.round(areaAcres)} acres`;
  } else {
    return `~${areaAcres.toFixed(1)} acres`;
  }
}

export async function captureMapView(args: MapOptions): Promise<CaptureMapResult> {
  const {
    center,
    apn,
    apns,
    bbox: inputBbox,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    zoom: requestedZoom,
    format = 'png',
    basemap = 'topographic',
    highlightApn,
    buffer,
    boundaries,
    extent,
    layers = {},
    additionalLayers,
    extentLayer,
    layout = 'MAP_ONLY',
    layoutOptions,
  } = args;

  // Determine center and zoom
  let lat: number | undefined;
  let lon: number | undefined;
  let zoom = requestedZoom || DEFAULT_ZOOM;
  let parcelApns: string[] = [];
  let extentLayerBbox: { xmin: number; ymin: number; xmax: number; ymax: number } | undefined;

  // Handle extentLayer option - use a layer's extent to set the map extent
  if (extentLayer) {
    const layerExtent = await getLayerExtent(extentLayer.url, extentLayer.where);
    if (!layerExtent) {
      return {
        success: false,
        error_type: 'LAYER_EXTENT_ERROR',
        message: `Could not get extent from layer "${extentLayer.url}"`,
        suggestion: 'Verify the layer URL is accessible and valid',
      };
    }

    // Apply padding if specified
    const padding = extentLayer.padding ?? 0.1;
    const xSpan = layerExtent.xmax - layerExtent.xmin;
    const ySpan = layerExtent.ymax - layerExtent.ymin;

    extentLayerBbox = {
      xmin: layerExtent.xmin - xSpan * padding,
      ymin: layerExtent.ymin - ySpan * padding,
      xmax: layerExtent.xmax + xSpan * padding,
      ymax: layerExtent.ymax + ySpan * padding,
    };

    lat = layerExtent.centerLat;
    lon = layerExtent.centerLon;

    if (!requestedZoom) {
      zoom = calculateZoomForBbox(extentLayerBbox, width, height, 0);
    }
  }

  // Handle extent option - zoom to full county
  if (extent === 'county' && !extentLayer) {
    lat = (SOLANO_COUNTY_EXTENT.ymin + SOLANO_COUNTY_EXTENT.ymax) / 2;
    lon = (SOLANO_COUNTY_EXTENT.xmin + SOLANO_COUNTY_EXTENT.xmax) / 2;
    if (!requestedZoom) {
      zoom = calculateZoomForBbox(SOLANO_COUNTY_EXTENT, width, height, 0.15);
    }
  }

  // Buffer visualization state
  let bufferSourceApn: string | undefined;
  let bufferRadiusFeet: number | undefined;
  let bufferCenterLat: number | undefined;
  let bufferCenterLon: number | undefined;

  // Handle buffer option
  if (buffer) {
    bufferRadiusFeet = buffer.radius_feet;

    if (buffer.apn) {
      const parcelExtent = await getParcelExtent(buffer.apn);
      if (!parcelExtent) {
        return {
          success: false,
          error_type: 'APN_NOT_FOUND',
          message: `Could not find buffer source parcel with APN "${buffer.apn}"`,
          suggestion: 'Verify the APN format or provide coordinates instead',
        };
      }
      bufferSourceApn = buffer.apn;
      bufferCenterLat = parcelExtent.centerLat;
      bufferCenterLon = parcelExtent.centerLon;
      lat = bufferCenterLat;
      lon = bufferCenterLon;
    } else if (buffer.latitude !== undefined && buffer.longitude !== undefined) {
      bufferCenterLat = buffer.latitude;
      bufferCenterLon = buffer.longitude;
      lat = bufferCenterLat;
      lon = bufferCenterLon;
    } else {
      return {
        success: false,
        error_type: 'INVALID_INPUT',
        message: 'Buffer requires either apn or latitude/longitude',
        suggestion: 'Provide buffer.apn or buffer.latitude and buffer.longitude',
      };
    }

    if (!requestedZoom) {
      zoom = calculateZoomForBuffer(bufferRadiusFeet, width, height);
    }
  }

  // Collect APNs to highlight
  if (apn && apn !== bufferSourceApn) parcelApns.push(apn);
  if (apns) parcelApns.push(...apns.filter((a) => a !== bufferSourceApn));
  if (highlightApn && !parcelApns.includes(highlightApn) && highlightApn !== bufferSourceApn) {
    parcelApns.push(highlightApn);
  }

  // Determine map center
  if (!buffer && !extent && !extentLayer) {
    if (apn) {
      const parcelExtent = await getParcelExtent(apn);
      if (!parcelExtent) {
        return {
          success: false,
          error_type: 'APN_NOT_FOUND',
          message: `Could not find parcel with APN "${apn}"`,
          suggestion: 'Verify the APN format or provide coordinates instead',
        };
      }
      lat = parcelExtent.centerLat;
      lon = parcelExtent.centerLon;
    } else if (apns && apns.length > 0) {
      // Get combined extent of all parcels
      const combinedExtent = await getMultiParcelExtent(apns);
      if (!combinedExtent) {
        return {
          success: false,
          error_type: 'APN_NOT_FOUND',
          message: `Could not find parcels with APNs "${apns.join(', ')}"`,
          suggestion: 'Verify the APN formats',
        };
      }
      lat = combinedExtent.centerLat;
      lon = combinedExtent.centerLon;

      // Calculate zoom to fit all parcels (unless explicitly specified)
      if (!requestedZoom) {
        zoom = calculateZoomForBbox(combinedExtent, width, height, 0.15);
      }
    } else if (center) {
      lat = center.latitude;
      lon = center.longitude;
    } else if (inputBbox) {
      lat = (inputBbox.ymin + inputBbox.ymax) / 2;
      lon = (inputBbox.xmin + inputBbox.xmax) / 2;
      if (!requestedZoom) {
        zoom = calculateZoomForBbox(inputBbox, width, height, 0.1);
      }
    } else {
      return {
        success: false,
        error_type: 'INVALID_INPUT',
        message: 'Must provide either center coordinates, APN, apns, bbox, or buffer',
        suggestion: 'Provide at least one location parameter',
      };
    }
  }

  if (lat === undefined || lon === undefined) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Could not determine map center coordinates',
      suggestion: 'Provide center, APN, bbox, or buffer parameters',
    };
  }

  // Calculate bounding box from center and zoom
  // Priority: extentLayerBbox > inputBbox > calculated from center
  const bbox = extentLayerBbox || inputBbox || calculateBboxFromCenter(lat, lon, zoom, width, height);

  // Build WebMap JSON
  const webMapJson = buildWebMapJson({
    bbox,
    width,
    height,
    basemap,
    layers,
    highlightApns: parcelApns.length > 0 ? parcelApns : undefined,
    bufferSourceApn: buffer ? bufferSourceApn : undefined,
    bufferRing:
      buffer && buffer.show_ring !== false && bufferCenterLon && bufferCenterLat && bufferRadiusFeet
        ? { centerLon: bufferCenterLon, centerLat: bufferCenterLat, radiusFeet: bufferRadiusFeet }
        : undefined,
    centerMarker:
      !buffer && !extentLayer && parcelApns.length === 0 ? { lon, lat } : undefined,
    boundaries,
    zoom,
    additionalLayers,
  });

  // Export the map
  const exportResult = await exportWebMap(webMapJson, layout, layoutOptions);
  if (!exportResult.success || !exportResult.imageUrl) {
    return {
      success: false,
      error_type: 'RENDER_ERROR',
      message: `Failed to render map: ${exportResult.error}`,
      suggestion: 'Try again or use different parameters',
    };
  }

  // Fetch the image and convert to base64
  const imageResult = await fetchImageAsBase64(exportResult.imageUrl);
  if (!imageResult.success || !imageResult.base64) {
    return {
      success: false,
      error_type: 'RENDER_ERROR',
      message: `Failed to fetch rendered image: ${imageResult.error}`,
      suggestion: 'Try again',
    };
  }

  // Build list of layers shown
  const layersShown: string[] = [];
  if (layers.aerial2025) layersShown.push('aerial2025');
  if (layers.garbageAreas) layersShown.push('garbageAreas');
  if (layers.parcels !== false && zoom >= 14) layersShown.push('parcels (with labels)');
  if (boundaries?.showCities || layers.cityBoundary) layersShown.push('cityBoundary');
  if (boundaries?.showCounty || layers.countyBoundary) layersShown.push('countyBoundary');
  if (layers.addressPoints) layersShown.push('addressPoints');
  if (additionalLayers) {
    additionalLayers.forEach(l => layersShown.push(l.title || 'additional layer'));
  }
  layersShown.push(`basemap: ${basemap}`);

  // Build spatial context
  const context: SpatialContext = {
    extent: bbox,
    scale: calculateScale(zoom, lat),
    layersShown,
    approximateArea: calculateApproximateArea(bbox),
  };

  if (parcelApns.length > 0) {
    context.highlightedApns = parcelApns;
  }

  if (buffer && bufferRadiusFeet) {
    context.buffer = {
      centerApn: bufferSourceApn,
      radiusFeet: bufferRadiusFeet,
    };
  }

  // Add layout info
  if (layout !== 'MAP_ONLY') {
    context.layout = layout;
    context.hasScaleBar = true;
  }

  return {
    success: true,
    imageUrl: exportResult.imageUrl,
    imageBase64: imageResult.base64,
    mimeType: format === 'jpg' ? 'image/jpeg' : 'image/png',
    center: { latitude: lat, longitude: lon },
    width,
    height,
    zoom,
    context,
  };
}
