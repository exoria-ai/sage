/**
 * Render Map Tool
 *
 * Generates static map images using:
 * - CARTO Voyager tiles OR Solano aerial tiles for basemap
 * - Solano County AumentumPublic MapServer/export for parcel overlays
 * - Sharp for compositing
 */

import sharp from 'sharp';
import { parseAPN } from '@/lib/utils/apn';

const TILE_SIZE = 256;

// Solano County MapServer endpoints
const AUMENTUM_MAPSERVER = 'https://solanocountygis.com/server/rest/services/Aumentum/AumentumPublic/MapServer';
const AERIAL_TILES = 'https://tiles.arcgis.com/tiles/SCn6czzcqKAFwdGU/arcgis/rest/services/Aerial2025_WGS84/MapServer/tile';

interface BufferOptions {
  apn?: string;           // Source parcel for buffer
  latitude?: number;      // Or source point lat
  longitude?: number;     // Or source point lon
  radius_feet: number;    // Buffer radius
  show_ring?: boolean;    // Draw the buffer circle (default: true)
  highlight_parcels?: boolean; // Highlight parcels in buffer (default: true)
}

interface MapOptions {
  center?: { latitude: number; longitude: number };
  apn?: string;
  apns?: string[];  // Multiple APNs for search result visualization
  bbox?: { xmin: number; ymin: number; xmax: number; ymax: number };
  width?: number;
  height?: number;
  zoom?: number;
  showParcel?: boolean;
  format?: 'png' | 'jpg';
  basemap?: 'streets' | 'aerial';
  highlightApn?: string;  // Specific APN to highlight differently
  buffer?: BufferOptions; // Buffer visualization options
}

interface RenderMapResult {
  success: boolean;
  imageBase64?: string;
  mimeType?: string;
  center?: { latitude: number; longitude: number };
  width?: number;
  height?: number;
  zoom?: number;
  error_type?: string;
  message?: string;
  suggestion?: string;
}

// Default settings
const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 800;
const DEFAULT_ZOOM = 17;

/**
 * Convert WGS84 to Web Mercator
 */
function toWebMercator(lon: number, lat: number): { x: number; y: number } {
  const x = lon * 20037508.34 / 180;
  let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  return { x, y };
}

/**
 * Convert longitude to tile X coordinate
 */
function lon2tile(lon: number, zoom: number): number {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}

/**
 * Convert latitude to tile Y coordinate
 */
function lat2tile(lat: number, zoom: number): number {
  return Math.floor(
    ((1 -
      Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  );
}

/**
 * Convert lon/lat to pixel coordinates within the tile grid
 */
function lonLatToPixel(
  lon: number,
  lat: number,
  zoom: number,
  originTileX: number,
  originTileY: number
): [number, number] {
  const x = ((lon + 180) / 360) * Math.pow(2, zoom) * TILE_SIZE - originTileX * TILE_SIZE;
  const latRad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
      Math.pow(2, zoom) *
      TILE_SIZE -
    originTileY * TILE_SIZE;
  return [Math.round(x), Math.round(y)];
}

/**
 * Fetch a single map tile from CARTO's Voyager basemap
 */
async function fetchCartoTile(x: number, y: number, z: number): Promise<Buffer> {
  const url = `https://basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}@2x.png`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'SAGE-GIS/1.0 (Solano County GIS Assistant)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch CARTO tile: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Fetch aerial tile from Solano County
 */
async function fetchAerialTile(x: number, y: number, z: number): Promise<Buffer> {
  // Solano aerial tiles use TMS format: /tile/{z}/{y}/{x}
  const url = `${AERIAL_TILES}/${z}/${y}/${x}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'SAGE-GIS/1.0 (Solano County GIS Assistant)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch aerial tile: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Get parcel extent from APN (fast, no geometry)
 */
async function getParcelExtent(apn: string): Promise<{
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  centerLat: number;
  centerLon: number;
} | null> {
  const parsed = parseAPN(apn);
  if (!parsed) return null;

  try {
    const url = `${AUMENTUM_MAPSERVER}/2/query`;
    // parcelid field has no dashes - use numeric format
    const params = new URLSearchParams({
      where: `parcelid='${parsed.numeric}'`,
      returnExtentOnly: 'true',
      outSR: '4326',
      f: 'json',
    });

    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    if (!data.extent) {
      // Fallback: try with formatted APN (some layers may use dashes)
      const params2 = new URLSearchParams({
        where: `parcelid='${parsed.formatted}'`,
        returnExtentOnly: 'true',
        outSR: '4326',
        f: 'json',
      });
      const response2 = await fetch(`${url}?${params2.toString()}`);
      const data2 = await response2.json();
      if (!data2.extent) return null;

      return {
        xmin: data2.extent.xmin,
        ymin: data2.extent.ymin,
        xmax: data2.extent.xmax,
        ymax: data2.extent.ymax,
        centerLat: (data2.extent.ymin + data2.extent.ymax) / 2,
        centerLon: (data2.extent.xmin + data2.extent.xmax) / 2,
      };
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
 * Fetch parcel boundary overlay from MapServer/export
 * Returns a transparent PNG with all parcel lines in view (green, like Solano's viewer)
 */
async function fetchParcelBoundaries(
  bbox: { xmin: number; ymin: number; xmax: number; ymax: number },
  width: number,
  height: number
): Promise<Buffer | null> {
  try {
    // Convert bbox to Web Mercator for MapServer
    const min = toWebMercator(bbox.xmin, bbox.ymin);
    const max = toWebMercator(bbox.xmax, bbox.ymax);

    // Use dynamicLayers to style parcels with green outlines (matching Solano's viewer)
    const dynamicLayers = [{
      id: 102,
      source: { type: 'mapLayer', mapLayerId: 2 },
      drawingInfo: {
        renderer: {
          type: 'simple',
          symbol: {
            type: 'esriSFS',
            style: 'esriSFSNull',  // No fill
            outline: {
              type: 'esriSLS',
              style: 'esriSLSSolid',
              color: [34, 197, 94, 255],  // Green (#22C55E)
              width: 1.5
            }
          }
        },
        showLabels: false
      }
    }];

    const params = new URLSearchParams({
      bbox: `${min.x},${min.y},${max.x},${max.y}`,
      bboxSR: '3857',
      size: `${width},${height}`,
      format: 'png32',
      transparent: 'true',
      dynamicLayers: JSON.stringify(dynamicLayers),
      layers: 'dynamic',
      f: 'image',
    });

    const url = `${AUMENTUM_MAPSERVER}/export?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`MapServer parcel boundaries failed: ${response.status}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Failed to fetch parcel boundaries:', error);
    return null;
  }
}

/**
 * Fetch highlighted parcel overlay from MapServer/export
 * Returns a transparent PNG with specific parcels highlighted in blue
 */
async function fetchHighlightedParcels(
  bbox: { xmin: number; ymin: number; xmax: number; ymax: number },
  width: number,
  height: number,
  apns: string[]
): Promise<Buffer | null> {
  try {
    // parcelid field has no dashes - use numeric format
    const whereClause = apns.map(apn => {
      const parsed = parseAPN(apn);
      return parsed ? `parcelid='${parsed.numeric}'` : null;
    }).filter(Boolean).join(' OR ');

    if (!whereClause) return null;

    // Convert bbox to Web Mercator for MapServer
    const min = toWebMercator(bbox.xmin, bbox.ymin);
    const max = toWebMercator(bbox.xmax, bbox.ymax);

    const dynamicLayers = [{
      id: 103,
      source: { type: 'mapLayer', mapLayerId: 2 },
      definitionExpression: whereClause,
      drawingInfo: {
        renderer: {
          type: 'simple',
          symbol: {
            type: 'esriSFS',
            style: 'esriSFSSolid',
            color: [59, 130, 246, 77],  // Blue with 30% opacity
            outline: {
              type: 'esriSLS',
              style: 'esriSLSSolid',
              color: [59, 130, 246, 255],  // Solid blue
              width: 3
            }
          }
        },
        showLabels: false
      }
    }];

    const params = new URLSearchParams({
      bbox: `${min.x},${min.y},${max.x},${max.y}`,
      bboxSR: '3857',
      size: `${width},${height}`,
      format: 'png32',
      transparent: 'true',
      dynamicLayers: JSON.stringify(dynamicLayers),
      layers: 'dynamic',
      f: 'image',
    });

    const url = `${AUMENTUM_MAPSERVER}/export?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`MapServer highlight failed: ${response.status}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Failed to fetch highlighted parcels:', error);
    return null;
  }
}

/**
 * Generate center marker SVG
 */
function generateMarkerSvg(width: number, height: number): string {
  const cx = width / 2;
  const cy = height / 2;
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="8" fill="#DC2626" stroke="white" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="white"/>
  </svg>`;
}

/**
 * Generate north arrow SVG overlay
 */
function generateNorthArrowSvg(width: number, height: number): string {
  const x = width - 40;
  const y = height - 50;
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(${x}, ${y})">
      <circle cx="15" cy="15" r="14" fill="white" fill-opacity="0.9"/>
      <path d="M15 4 L12 18 L15 14 L18 18 Z" fill="#374151"/>
      <text x="15" y="28" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#374151">N</text>
    </g>
  </svg>`;
}

/**
 * Generate disclaimer watermark SVG overlay
 */
function generateWatermarkSvg(width: number, height: number): string {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(8, 8)">
      <rect x="0" y="0" width="140" height="24" rx="4" fill="white" fill-opacity="0.9"/>
      <text x="8" y="16" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">SAGE - Solano County GIS</text>
    </g>
  </svg>`;
}

/**
 * Generate buffer ring SVG overlay
 * Draws a dashed circle around the center point with radius label
 */
function generateBufferRingSvg(
  width: number,
  height: number,
  centerX: number,
  centerY: number,
  radiusPixels: number,
  radiusFeet: number
): string {
  // Format radius label
  const label = radiusFeet >= 5280
    ? `${(radiusFeet / 5280).toFixed(2)} mi`
    : `${radiusFeet} ft`;

  // Calculate label position (top of circle)
  const labelY = centerY - radiusPixels - 8;
  const labelX = centerX;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Buffer ring - dashed orange circle -->
    <circle
      cx="${centerX}"
      cy="${centerY}"
      r="${radiusPixels}"
      fill="none"
      stroke="#F97316"
      stroke-width="2.5"
      stroke-dasharray="8,4"
      opacity="0.9"
    />
    <!-- Radius label background -->
    <rect
      x="${labelX - 30}"
      y="${labelY - 12}"
      width="60"
      height="18"
      rx="3"
      fill="white"
      fill-opacity="0.9"
    />
    <!-- Radius label text -->
    <text
      x="${labelX}"
      y="${labelY}"
      text-anchor="middle"
      font-family="Arial, sans-serif"
      font-size="11"
      font-weight="bold"
      fill="#F97316"
    >${label} buffer</text>
  </svg>`;
}

/**
 * Fetch source parcel overlay (highlighted in orange/red for buffer visualization)
 */
async function fetchSourceParcelOverlay(
  bbox: { xmin: number; ymin: number; xmax: number; ymax: number },
  width: number,
  height: number,
  apn: string
): Promise<Buffer | null> {
  try {
    const parsed = parseAPN(apn);
    if (!parsed) return null;

    // parcelid field has no dashes - use numeric format
    const whereClause = `parcelid='${parsed.numeric}'`;

    // Convert bbox to Web Mercator for MapServer
    const min = toWebMercator(bbox.xmin, bbox.ymin);
    const max = toWebMercator(bbox.xmax, bbox.ymax);

    const dynamicLayers = [{
      id: 104,
      source: { type: 'mapLayer', mapLayerId: 2 },
      definitionExpression: whereClause,
      drawingInfo: {
        renderer: {
          type: 'simple',
          symbol: {
            type: 'esriSFS',
            style: 'esriSFSSolid',
            color: [249, 115, 22, 100],  // Orange with 40% opacity (#F97316)
            outline: {
              type: 'esriSLS',
              style: 'esriSLSSolid',
              color: [234, 88, 12, 255],  // Darker orange (#EA580C)
              width: 3
            }
          }
        },
        showLabels: false
      }
    }];

    const params = new URLSearchParams({
      bbox: `${min.x},${min.y},${max.x},${max.y}`,
      bboxSR: '3857',
      size: `${width},${height}`,
      format: 'png32',
      transparent: 'true',
      dynamicLayers: JSON.stringify(dynamicLayers),
      layers: 'dynamic',
      f: 'image',
    });

    const url = `${AUMENTUM_MAPSERVER}/export?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`MapServer source parcel overlay failed: ${response.status}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Failed to fetch source parcel overlay:', error);
    return null;
  }
}

/**
 * Fetch buffer parcels overlay - highlights all parcels within a buffer envelope
 * Renders parcels that intersect the buffer area with blue highlight
 */
async function fetchBufferParcelsOverlay(
  mapBbox: { xmin: number; ymin: number; xmax: number; ymax: number },
  width: number,
  height: number,
  centerLat: number,
  centerLon: number,
  radiusFeet: number,
  excludeApn?: string
): Promise<Buffer | null> {
  try {
    // Convert radius to degrees (approximate for Solano County latitude)
    // 1 degree lat ≈ 364,000 feet, 1 degree lon ≈ 288,000 feet at 38°
    const radiusDegreesLat = radiusFeet / 364000;
    const radiusDegreesLon = radiusFeet / 288000;

    // Create a buffer envelope around the center point (in WGS84)
    const bufferEnvelope = {
      xmin: centerLon - radiusDegreesLon,
      ymin: centerLat - radiusDegreesLat,
      xmax: centerLon + radiusDegreesLon,
      ymax: centerLat + radiusDegreesLat,
    };

    // Convert both bboxes to Web Mercator
    const mapMin = toWebMercator(mapBbox.xmin, mapBbox.ymin);
    const mapMax = toWebMercator(mapBbox.xmax, mapBbox.ymax);
    const bufferMin = toWebMercator(bufferEnvelope.xmin, bufferEnvelope.ymin);
    const bufferMax = toWebMercator(bufferEnvelope.xmax, bufferEnvelope.ymax);

    // Build WHERE clause to exclude source parcel if provided
    let whereClause = '1=1';
    if (excludeApn) {
      const parsed = parseAPN(excludeApn);
      if (parsed) {
        whereClause = `parcelid <> '${parsed.numeric}'`;
      }
    }

    // Style for buffer parcels - blue highlight
    const dynamicLayers = [{
      id: 105,
      source: { type: 'mapLayer', mapLayerId: 2 },
      definitionExpression: whereClause,
      drawingInfo: {
        renderer: {
          type: 'simple',
          symbol: {
            type: 'esriSFS',
            style: 'esriSFSSolid',
            color: [59, 130, 246, 60],  // Blue with ~25% opacity
            outline: {
              type: 'esriSLS',
              style: 'esriSLSSolid',
              color: [59, 130, 246, 200],  // Blue outline
              width: 2
            }
          }
        },
        showLabels: false
      }
    }];

    // Use the buffer envelope as a geometry filter
    // MapServer will only render parcels that intersect this envelope
    const geometryParam = JSON.stringify({
      xmin: bufferMin.x,
      ymin: bufferMin.y,
      xmax: bufferMax.x,
      ymax: bufferMax.y,
      spatialReference: { wkid: 3857 }
    });

    const params = new URLSearchParams({
      bbox: `${mapMin.x},${mapMin.y},${mapMax.x},${mapMax.y}`,
      bboxSR: '3857',
      size: `${width},${height}`,
      format: 'png32',
      transparent: 'true',
      dynamicLayers: JSON.stringify(dynamicLayers),
      layers: 'dynamic',
      // Spatial filter: only parcels intersecting the buffer envelope
      layerDefs: JSON.stringify({ 2: whereClause }),
      // Use geometry parameter to spatially filter
      geometry: geometryParam,
      geometryType: 'esriGeometryEnvelope',
      spatialRel: 'esriSpatialRelIntersects',
      f: 'image',
    });

    const url = `${AUMENTUM_MAPSERVER}/export?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`MapServer buffer parcels overlay failed: ${response.status}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Failed to fetch buffer parcels overlay:', error);
    return null;
  }
}

/**
 * Calculate zoom level that fits a buffer radius within the image
 */
function calculateZoomForBuffer(radiusFeet: number, width: number, height: number): number {
  // We want the buffer circle to fit comfortably with some margin
  // Use 70% of the smaller dimension for the diameter
  const marginFactor = 0.7;
  const availablePixels = Math.min(width, height) * marginFactor;
  const diameterFeet = radiusFeet * 2;

  // Target: diameterFeet should span availablePixels
  // feetPerPixel = diameterFeet / availablePixels
  const targetFeetPerPixel = diameterFeet / availablePixels;

  // At zoom z, meters per pixel = 156543.03 * cos(lat) / 2^z
  // At 38° latitude (cos(38°) ≈ 0.788): meters per pixel = 123,356 / 2^z
  // In feet: 123,356 * 3.28084 = 404,612 feet per pixel at zoom 0
  const latFactor = 404612; // feet per pixel at zoom 0, 38° latitude

  const zoom = Math.log2(latFactor / targetFeetPerPixel);

  // Clamp to reasonable range (13 = county scale, 19 = building scale)
  return Math.max(13, Math.min(19, Math.round(zoom)));
}

/**
 * Convert feet to pixels at a given zoom level and latitude
 */
function feetToPixels(feet: number, zoom: number, latitude: number = 38.25): number {
  // At zoom z, meters per pixel = 156543.03 * cos(lat) / 2^z
  // Convert to feet: feet per pixel = metersPerPixel * 3.28084
  const metersPerPixel = (156543.03 * Math.cos((latitude * Math.PI) / 180)) / Math.pow(2, zoom);
  const feetPerPixel = metersPerPixel * 3.28084;
  return feet / feetPerPixel;
}

/**
 * Convert pixel coordinates back to lon/lat (inverse of lonLatToPixel)
 */
function pixelToLonLat(
  px: number,
  py: number,
  zoom: number,
  originTileX: number,
  originTileY: number
): { lon: number; lat: number } {
  // Convert pixel to tile-space coordinate
  const tileX = originTileX + px / TILE_SIZE;
  const tileY = originTileY + py / TILE_SIZE;

  // Convert tile coordinates to lon/lat
  const n = Math.pow(2, zoom);
  const lon = (tileX / n) * 360 - 180;
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * tileY) / n)));
  const lat = latRad * 180 / Math.PI;

  return { lon, lat };
}

/**
 * Calculate the exact bbox for an extracted region based on tile math
 * This ensures the bbox matches exactly what was extracted from tiles
 */
function calculateExtractedBbox(
  extractLeft: number,
  extractTop: number,
  extractWidth: number,
  extractHeight: number,
  zoom: number,
  startTileX: number,
  startTileY: number,
  tileSize: number
): { xmin: number; ymin: number; xmax: number; ymax: number } {
  // Scale pixel coordinates to 256px tile space (our coordinate functions use 256)
  const scaleFactor = 256 / tileSize;
  const left256 = extractLeft * scaleFactor;
  const top256 = extractTop * scaleFactor;
  const right256 = (extractLeft + extractWidth) * scaleFactor;
  const bottom256 = (extractTop + extractHeight) * scaleFactor;

  // Convert corners to lon/lat
  const topLeft = pixelToLonLat(left256, top256, zoom, startTileX, startTileY);
  const bottomRight = pixelToLonLat(right256, bottom256, zoom, startTileX, startTileY);

  return {
    xmin: topLeft.lon,
    ymin: bottomRight.lat,  // bottom is higher Y pixel = lower latitude
    xmax: bottomRight.lon,
    ymax: topLeft.lat,      // top is lower Y pixel = higher latitude
  };
}

/**
 * Generate a static map image
 */
export async function renderMap(args: MapOptions): Promise<RenderMapResult> {
  const {
    center,
    apn,
    apns,
    bbox,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    zoom: requestedZoom,
    showParcel = true,
    format = 'png',
    basemap = 'aerial',
    highlightApn,
    buffer,
  } = args;

  // Determine center and parcel info
  let lat: number | undefined;
  let lon: number | undefined;
  let zoom = requestedZoom || DEFAULT_ZOOM;
  let parcelApns: string[] = [];

  // Buffer visualization state
  let bufferSourceApn: string | undefined;
  let bufferRadiusFeet: number | undefined;
  let bufferCenterLat: number | undefined;
  let bufferCenterLon: number | undefined;

  // Handle buffer option - this takes priority for centering
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

    // Auto-calculate zoom to fit buffer if not specified
    if (!requestedZoom) {
      zoom = calculateZoomForBuffer(bufferRadiusFeet, width, height);
    }
  }

  // Collect APNs to display (but not source parcel if buffer mode)
  if (apn && apn !== bufferSourceApn) parcelApns.push(apn);
  if (apns) parcelApns.push(...apns.filter(a => a !== bufferSourceApn));
  if (highlightApn && !parcelApns.includes(highlightApn) && highlightApn !== bufferSourceApn) {
    parcelApns.push(highlightApn);
  }

  // Determine map center (if not already set by buffer)
  if (!buffer) {
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
    } else if (center) {
      lat = center.latitude;
      lon = center.longitude;
    } else if (bbox) {
      lat = (bbox.ymin + bbox.ymax) / 2;
      lon = (bbox.xmin + bbox.xmax) / 2;
      // Auto-calculate zoom from bbox
      const lonSpan = bbox.xmax - bbox.xmin;
      const latSpan = bbox.ymax - bbox.ymin;
      const maxSpan = Math.max(lonSpan, latSpan);
      if (maxSpan > 0.01) zoom = 15;
      else if (maxSpan > 0.005) zoom = 16;
      else if (maxSpan > 0.002) zoom = 17;
      else zoom = 18;
    } else {
      return {
        success: false,
        error_type: 'INVALID_INPUT',
        message: 'Must provide either center coordinates, APN, bbox, or buffer',
        suggestion: 'Provide at least one location parameter',
      };
    }
  }

  // Final validation that we have coordinates
  if (lat === undefined || lon === undefined) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Could not determine map center coordinates',
      suggestion: 'Provide center, APN, bbox, or buffer parameters',
    };
  }

  try {
    // Calculate tile range needed to cover the image
    const centerTileX = lon2tile(lon, zoom);
    const centerTileY = lat2tile(lat, zoom);

    // CARTO uses @2x tiles (512px), aerial uses standard 256px tiles
    const tileSize = basemap === 'aerial' ? 256 : 512;
    const tilesNeededX = Math.ceil(width / tileSize) + 1;
    const tilesNeededY = Math.ceil(height / tileSize) + 1;

    const startTileX = centerTileX - Math.floor(tilesNeededX / 2);
    const startTileY = centerTileY - Math.floor(tilesNeededY / 2);
    const endTileX = startTileX + tilesNeededX;
    const endTileY = startTileY + tilesNeededY;

    // Choose tile fetcher based on basemap
    const fetchTile = basemap === 'aerial' ? fetchAerialTile : fetchCartoTile;

    // Fetch all tiles in parallel
    const tilePromises: Promise<{ x: number; y: number; buffer: Buffer }>[] = [];
    for (let y = startTileY; y <= endTileY; y++) {
      for (let x = startTileX; x <= endTileX; x++) {
        tilePromises.push(
          fetchTile(x, y, zoom)
            .then((buffer) => ({ x, y, buffer }))
            .catch(() => {
              // Return a gray placeholder for failed tiles
              return sharp({
                create: { width: tileSize, height: tileSize, channels: 4, background: { r: 200, g: 200, b: 200, alpha: 1 } }
              }).png().toBuffer().then(buffer => ({ x, y, buffer }));
            })
        );
      }
    }

    const tiles = await Promise.all(tilePromises);

    // Calculate total canvas size for all tiles
    const canvasWidth = (endTileX - startTileX + 1) * tileSize;
    const canvasHeight = (endTileY - startTileY + 1) * tileSize;

    // Composite all tiles onto a canvas
    const compositeInputs = tiles.map((tile) => ({
      input: tile.buffer,
      left: (tile.x - startTileX) * tileSize,
      top: (tile.y - startTileY) * tileSize,
    }));

    // Create base image from tiles
    const compositeBuffer = await sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: { r: 245, g: 245, b: 245, alpha: 1 },
      },
    })
      .composite(compositeInputs)
      .png()
      .toBuffer();

    // Calculate the pixel position of the center point
    // lonLatToPixel uses 256px base, scale appropriately for tile size
    const [centerPx256, centerPy256] = lonLatToPixel(lon, lat, zoom, startTileX, startTileY);
    const scaleFactor = tileSize / 256;
    const centerPx = centerPx256 * scaleFactor;
    const centerPy = centerPy256 * scaleFactor;

    // Extract the region centered on the target location
    const extractLeft = Math.max(0, Math.round(centerPx - width / 2));
    const extractTop = Math.max(0, Math.round(centerPy - height / 2));
    const extractWidth = Math.min(width, canvasWidth - extractLeft);
    const extractHeight = Math.min(height, canvasHeight - extractTop);

    const baseBuffer = await sharp(compositeBuffer)
      .extract({
        left: extractLeft,
        top: extractTop,
        width: extractWidth,
        height: extractHeight,
      })
      .png()
      .toBuffer();

    // Use actual extracted dimensions for overlays
    const actualWidth = extractWidth;
    const actualHeight = extractHeight;

    // Build overlay array
    const overlays: { input: Buffer; top: number; left: number }[] = [];

    // Calculate exact bbox for the extracted region using tile math
    // This ensures MapServer overlay aligns perfectly with the basemap
    const mapBbox = calculateExtractedBbox(
      extractLeft,
      extractTop,
      extractWidth,
      extractHeight,
      zoom,
      startTileX,
      startTileY,
      tileSize
    );

    // Always show parcel boundaries (green lines like Solano's viewer)
    if (showParcel) {
      const parcelBoundaries = await fetchParcelBoundaries(mapBbox, actualWidth, actualHeight);
      if (parcelBoundaries) {
        overlays.push({ input: parcelBoundaries, top: 0, left: 0 });
      }
    }

    // Buffer visualization overlays
    if (buffer && bufferRadiusFeet && bufferCenterLat !== undefined && bufferCenterLon !== undefined) {
      // Calculate buffer center position in the extracted image
      // The buffer center should be at the image center since we centered on it
      const bufferCenterX = actualWidth / 2;
      const bufferCenterY = actualHeight / 2;

      // Calculate buffer radius in pixels
      const radiusPixels = feetToPixels(bufferRadiusFeet, zoom, bufferCenterLat);

      // Add source parcel highlight (orange) if APN provided
      if (bufferSourceApn) {
        const sourceOverlay = await fetchSourceParcelOverlay(mapBbox, actualWidth, actualHeight, bufferSourceApn);
        if (sourceOverlay) {
          overlays.push({ input: sourceOverlay, top: 0, left: 0 });
        }
      }

      // Highlight parcels within buffer (blue) if requested
      if (buffer.highlight_parcels !== false) {
        // Use spatial query to highlight parcels in the buffer area
        const bufferOverlay = await fetchBufferParcelsOverlay(
          mapBbox,
          actualWidth,
          actualHeight,
          bufferCenterLat,
          bufferCenterLon,
          bufferRadiusFeet,
          bufferSourceApn  // Exclude source parcel from blue highlight
        );
        if (bufferOverlay) {
          overlays.push({ input: bufferOverlay, top: 0, left: 0 });
        }
      }

      // Add buffer ring SVG if requested
      if (buffer.show_ring !== false) {
        const bufferRingSvg = generateBufferRingSvg(
          actualWidth,
          actualHeight,
          bufferCenterX,
          bufferCenterY,
          radiusPixels,
          bufferRadiusFeet
        );
        overlays.push({ input: Buffer.from(bufferRingSvg), top: 0, left: 0 });
      }
    } else {
      // Non-buffer mode: highlight specific parcels in blue if APNs provided
      if (parcelApns.length > 0) {
        const highlightOverlay = await fetchHighlightedParcels(mapBbox, actualWidth, actualHeight, parcelApns);
        if (highlightOverlay) {
          overlays.push({ input: highlightOverlay, top: 0, left: 0 });
        }
      }

      // Add center marker if no specific parcels highlighted and not in buffer mode
      if (parcelApns.length === 0) {
        const markerSvg = generateMarkerSvg(actualWidth, actualHeight);
        overlays.push({ input: Buffer.from(markerSvg), top: 0, left: 0 });
      }
    }

    // Add north arrow
    const northArrowSvg = generateNorthArrowSvg(actualWidth, actualHeight);
    overlays.push({ input: Buffer.from(northArrowSvg), top: 0, left: 0 });

    // Add watermark
    const watermarkSvg = generateWatermarkSvg(actualWidth, actualHeight);
    overlays.push({ input: Buffer.from(watermarkSvg), top: 0, left: 0 });

    // Composite all overlays
    const finalImage = sharp(baseBuffer).composite(overlays);

    // Convert to requested format
    let outputBuffer: Buffer;
    let mimeType: string;

    if (format === 'jpg') {
      outputBuffer = await finalImage.jpeg({ quality: 85 }).toBuffer();
      mimeType = 'image/jpeg';
    } else {
      outputBuffer = await finalImage.png().toBuffer();
      mimeType = 'image/png';
    }

    const base64 = outputBuffer.toString('base64');

    return {
      success: true,
      imageBase64: base64,
      mimeType,
      center: { latitude: lat, longitude: lon },
      width: actualWidth,
      height: actualHeight,
      zoom,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'RENDER_ERROR',
      message: `Failed to render map: ${errorMessage}`,
      suggestion: 'Try again or use different coordinates.',
    };
  }
}
