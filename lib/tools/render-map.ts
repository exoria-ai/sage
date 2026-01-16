/**
 * Render Map Tool
 *
 * Generates static map images using CARTO tiles and Sharp compositing.
 * Based on the CivSnap/Worcester approach.
 */

import sharp from 'sharp';
import { LAYERS } from '@/lib/services/arcgis';
import { parseAPN } from '@/lib/utils/apn';

const TILE_SIZE = 256;

interface MapOptions {
  center?: { latitude: number; longitude: number };
  apn?: string;
  bbox?: { xmin: number; ymin: number; xmax: number; ymax: number };
  width?: number;
  height?: number;
  zoom?: number;
  showParcel?: boolean;
  format?: 'png' | 'jpg';
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
async function fetchTile(x: number, y: number, z: number): Promise<Buffer> {
  const url = `https://basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}@2x.png`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'SAGE-GIS/1.0 (Solano County GIS Assistant)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tile: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Generate SVG path from polygon coordinates
 */
function coordsToSvgPath(
  coords: number[][],
  zoom: number,
  originTileX: number,
  originTileY: number
): string {
  const points = coords.map((coord) => {
    const [px, py] = lonLatToPixel(coord[0]!, coord[1]!, zoom, originTileX, originTileY);
    return `${px},${py}`;
  });
  return `M ${points.join(' L ')} Z`;
}

/**
 * Generate SVG for parcel geometry overlay
 */
function generateParcelSvg(
  width: number,
  height: number,
  zoom: number,
  originTileX: number,
  originTileY: number,
  parcelRings: number[][][]
): string {
  let paths = '';

  for (const ring of parcelRings) {
    const pathD = coordsToSvgPath(ring, zoom, originTileX, originTileY);
    paths += `<path d="${pathD}" fill="#3B82F6" fill-opacity="0.2" stroke="#3B82F6" stroke-width="3"/>`;
  }

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
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
 * Get parcel geometry from APN
 */
async function getParcelGeometry(apn: string): Promise<{
  center: { latitude: number; longitude: number };
  rings: number[][][];
} | null> {
  const parsed = parseAPN(apn);
  if (!parsed) return null;

  try {
    const url = `https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services/${LAYERS.PARCELS}/query`;
    const params = new URLSearchParams({
      where: `APN = '${parsed.raw}' OR APN = '${parsed.formatted}'`,
      outFields: 'APN',
      returnGeometry: 'true',
      outSR: '4326',
      f: 'json',
    });

    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      return null;
    }

    const feature = data.features[0];
    const geometry = feature.geometry;

    if (!geometry || !geometry.rings) {
      return null;
    }

    // Calculate centroid
    let sumX = 0, sumY = 0, count = 0;
    for (const ring of geometry.rings) {
      for (const coord of ring) {
        sumX += coord[0];
        sumY += coord[1];
        count++;
      }
    }

    return {
      center: { latitude: sumY / count, longitude: sumX / count },
      rings: geometry.rings,
    };
  } catch {
    return null;
  }
}

/**
 * Generate a static map image
 */
export async function renderMap(args: MapOptions): Promise<RenderMapResult> {
  const {
    center,
    apn,
    bbox,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    zoom: requestedZoom,
    showParcel = true,
    format = 'png',
  } = args;

  // Determine center and parcel geometry
  let lat: number;
  let lon: number;
  let zoom = requestedZoom || DEFAULT_ZOOM;
  let parcelRings: number[][][] | null = null;

  if (apn) {
    const parcelData = await getParcelGeometry(apn);
    if (!parcelData) {
      return {
        success: false,
        error_type: 'APN_NOT_FOUND',
        message: `Could not find parcel with APN "${apn}"`,
        suggestion: 'Verify the APN format or provide coordinates instead',
      };
    }
    lat = parcelData.center.latitude;
    lon = parcelData.center.longitude;
    if (showParcel) {
      parcelRings = parcelData.rings;
    }
  } else if (center) {
    lat = center.latitude;
    lon = center.longitude;
  } else if (bbox) {
    lat = (bbox.ymin + bbox.ymax) / 2;
    lon = (bbox.xmin + bbox.xmax) / 2;
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

    // Fetch all tiles in parallel
    const tilePromises: Promise<{ x: number; y: number; buffer: Buffer }>[] = [];
    for (let y = startTileY; y <= endTileY; y++) {
      for (let x = startTileX; x <= endTileX; x++) {
        tilePromises.push(
          fetchTile(x, y, zoom).then((buffer) => ({ x, y, buffer }))
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

    // Recalculate origin for the extracted region
    const extractedOriginX = startTileX + extractLeft / 512;
    const extractedOriginY = startTileY + extractTop / 512;

    // Use actual extracted dimensions for overlays
    const actualWidth = extractWidth;
    const actualHeight = extractHeight;

    // Build overlay array
    const overlays: { input: Buffer; top: number; left: number }[] = [];

    // Add parcel geometry overlay if available
    if (parcelRings) {
      const parcelSvg = generateParcelSvg(
        actualWidth,
        actualHeight,
        zoom,
        extractedOriginX,
        extractedOriginY,
        parcelRings
      );
      overlays.push({ input: Buffer.from(parcelSvg), top: 0, left: 0 });
    } else {
      // Add center marker if no parcel
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
