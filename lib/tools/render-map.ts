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
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;
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
    const params = new URLSearchParams({
      where: `parcelid='${parsed.raw}'`,
      returnExtentOnly: 'true',
      outSR: '4326',
      f: 'json',
    });

    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    if (!data.extent) {
      // Try with formatted APN
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
 * Fetch parcel overlay from MapServer/export
 * Returns a transparent PNG with parcel lines
 */
async function fetchParcelOverlay(
  bbox: { xmin: number; ymin: number; xmax: number; ymax: number },
  width: number,
  height: number,
  highlightApns?: string[]
): Promise<Buffer | null> {
  try {
    // Convert bbox to Web Mercator for MapServer
    const min = toWebMercator(bbox.xmin, bbox.ymin);
    const max = toWebMercator(bbox.xmax, bbox.ymax);

    const params = new URLSearchParams({
      bbox: `${min.x},${min.y},${max.x},${max.y}`,
      bboxSR: '3857',
      size: `${width},${height}`,
      format: 'png32',
      transparent: 'true',
      layers: 'show:2',  // Parcels layer
      f: 'image',
    });

    // If we have specific APNs to highlight, use dynamicLayers
    if (highlightApns && highlightApns.length > 0) {
      const whereClause = highlightApns.map(apn => {
        const parsed = parseAPN(apn);
        return parsed ? `parcelid='${parsed.raw}'` : null;
      }).filter(Boolean).join(' OR ');

      if (whereClause) {
        const dynamicLayers = [{
          id: 102,  // Custom ID for our dynamic layer
          source: { type: 'mapLayer', mapLayerId: 2 },
          definitionExpression: whereClause,
          drawingInfo: {
            renderer: {
              type: 'simple',
              symbol: {
                type: 'esriSFS',
                style: 'esriSFSSolid',
                color: [59, 130, 246, 51],  // Blue with 20% opacity
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
        params.set('dynamicLayers', JSON.stringify(dynamicLayers));
        params.set('layers', 'dynamic');
      }
    }

    const url = `${AUMENTUM_MAPSERVER}/export?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`MapServer export failed: ${response.status}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Failed to fetch parcel overlay:', error);
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
 * Calculate bbox from center and dimensions at a given zoom
 */
function calculateBboxFromCenter(
  lat: number,
  lon: number,
  width: number,
  height: number,
  zoom: number
): { xmin: number; ymin: number; xmax: number; ymax: number } {
  // At zoom level z, the world is 2^z tiles, each 256px
  // Degrees per pixel = 360 / (256 * 2^z)
  const degreesPerPixel = 360 / (256 * Math.pow(2, zoom));

  // Latitude is more complex due to Mercator projection
  const latRadians = lat * Math.PI / 180;
  const metersPerPixelY = 156543.03392 * Math.cos(latRadians) / Math.pow(2, zoom);
  const degreesPerPixelY = metersPerPixelY / 111319.9;  // ~111km per degree

  const halfWidthDeg = (width / 2) * degreesPerPixel;
  const halfHeightDeg = (height / 2) * degreesPerPixelY;

  return {
    xmin: lon - halfWidthDeg,
    ymin: lat - halfHeightDeg,
    xmax: lon + halfWidthDeg,
    ymax: lat + halfHeightDeg,
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
    basemap = 'streets',
    highlightApn,
  } = args;

  // Determine center and parcel info
  let lat: number;
  let lon: number;
  let zoom = requestedZoom || DEFAULT_ZOOM;
  let parcelApns: string[] = [];

  // Collect APNs to display
  if (apn) parcelApns.push(apn);
  if (apns) parcelApns.push(...apns);
  if (highlightApn && !parcelApns.includes(highlightApn)) {
    parcelApns.push(highlightApn);
  }

  // Determine map center
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
      message: 'Must provide either center coordinates, APN, or bbox',
      suggestion: 'Provide at least one location parameter',
    };
  }

  try {
    // Calculate tile range needed to cover the image
    const centerTileX = lon2tile(lon, zoom);
    const centerTileY = lat2tile(lat, zoom);

    // Using @2x tiles (512px), so we need fewer tiles
    const tilesNeededX = Math.ceil(width / 512) + 1;
    const tilesNeededY = Math.ceil(height / 512) + 1;

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
                create: { width: 512, height: 512, channels: 4, background: { r: 200, g: 200, b: 200, alpha: 1 } }
              }).png().toBuffer().then(buffer => ({ x, y, buffer }));
            })
        );
      }
    }

    const tiles = await Promise.all(tilePromises);

    // Calculate total canvas size for all tiles (using @2x tiles = 512px each)
    const canvasWidth = (endTileX - startTileX + 1) * 512;
    const canvasHeight = (endTileY - startTileY + 1) * 512;

    // Composite all tiles onto a canvas
    const compositeInputs = tiles.map((tile) => ({
      input: tile.buffer,
      left: (tile.x - startTileX) * 512,
      top: (tile.y - startTileY) * 512,
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

    // Calculate the pixel position of the center point (in 256-based space, then scale to 512)
    const [centerPx256, centerPy256] = lonLatToPixel(lon, lat, zoom, startTileX, startTileY);
    const centerPx = centerPx256 * 2; // Scale to 512px tile space
    const centerPy = centerPy256 * 2;

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

    // Calculate bbox for the extracted region
    const mapBbox = calculateBboxFromCenter(lat, lon, actualWidth, actualHeight, zoom);

    // Fetch parcel overlay from MapServer if we have APNs to show
    if (showParcel && parcelApns.length > 0) {
      const parcelOverlay = await fetchParcelOverlay(mapBbox, actualWidth, actualHeight, parcelApns);
      if (parcelOverlay) {
        overlays.push({ input: parcelOverlay, top: 0, left: 0 });
      }
    }

    // Add center marker if no parcels shown
    if (parcelApns.length === 0) {
      const markerSvg = generateMarkerSvg(actualWidth, actualHeight);
      overlays.push({ input: Buffer.from(markerSvg), top: 0, left: 0 });
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
