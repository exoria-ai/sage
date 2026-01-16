/**
 * Render Map Tool
 *
 * Generates map images using ArcGIS export map functionality.
 * Returns either a URL or base64-encoded image data.
 */

import axios from 'axios';

interface MapOptions {
  center?: { latitude: number; longitude: number };
  apn?: string;
  bbox?: { xmin: number; ymin: number; xmax: number; ymax: number };
  layers?: string[];
  width?: number;
  height?: number;
  highlightParcel?: boolean;
  format?: 'png' | 'jpg';
  returnBase64?: boolean;
}

interface RenderMapResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  mimeType?: string;
  width?: number;
  height?: number;
  extent?: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    spatialReference: { wkid: number };
  };
  error_type?: string;
  message?: string;
  suggestion?: string;
}

// Solano County map service URLs
const SOLANO_MAP_SERVICE = 'https://solanocountygis.com/server/rest/services/PublicAccess/ParcelMap/MapServer';
const SOLANO_PARCEL_LAYER = `${SOLANO_MAP_SERVICE}/0`;

// Default map settings
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;
const DEFAULT_BUFFER_METERS = 200; // Buffer around point/parcel

/**
 * Get parcel geometry and center for a given APN
 */
async function getParcelExtent(apn: string): Promise<{
  extent: { xmin: number; ymin: number; xmax: number; ymax: number };
  center: { x: number; y: number };
} | null> {
  // Normalize APN
  const normalizedAPN = apn.replace(/-/g, '');

  try {
    const params = new URLSearchParams({
      where: `APN = '${normalizedAPN}' OR APN = '${apn}'`,
      outFields: 'APN',
      returnGeometry: 'true',
      outSR: '4326',
      f: 'json',
    });

    const response = await axios.get(`${SOLANO_PARCEL_LAYER}/query?${params.toString()}`);
    const data = response.data;

    if (!data.features || data.features.length === 0) {
      return null;
    }

    const feature = data.features[0];
    const geometry = feature.geometry;

    if (!geometry || !geometry.rings) {
      return null;
    }

    // Calculate extent from rings
    let xmin = Infinity, ymin = Infinity, xmax = -Infinity, ymax = -Infinity;

    for (const ring of geometry.rings) {
      for (const coord of ring) {
        const [x, y] = coord;
        if (x < xmin) xmin = x;
        if (x > xmax) xmax = x;
        if (y < ymin) ymin = y;
        if (y > ymax) ymax = y;
      }
    }

    return {
      extent: { xmin, ymin, xmax, ymax },
      center: {
        x: (xmin + xmax) / 2,
        y: (ymin + ymax) / 2,
      },
    };
  } catch {
    return null;
  }
}

/**
 * Convert lat/lon point to bbox with buffer
 */
function pointToExtent(
  lat: number,
  lon: number,
  bufferMeters: number = DEFAULT_BUFFER_METERS
): { xmin: number; ymin: number; xmax: number; ymax: number } {
  // Approximate degrees per meter at this latitude
  const metersPerDegreeLat = 111320;
  const metersPerDegreeLon = 111320 * Math.cos((lat * Math.PI) / 180);

  const bufferLat = bufferMeters / metersPerDegreeLat;
  const bufferLon = bufferMeters / metersPerDegreeLon;

  return {
    xmin: lon - bufferLon,
    ymin: lat - bufferLat,
    xmax: lon + bufferLon,
    ymax: lat + bufferLat,
  };
}

/**
 * Expand an extent by a percentage
 */
function expandExtent(
  extent: { xmin: number; ymin: number; xmax: number; ymax: number },
  percentage: number = 0.2
): { xmin: number; ymin: number; xmax: number; ymax: number } {
  const width = extent.xmax - extent.xmin;
  const height = extent.ymax - extent.ymin;
  const bufferX = width * percentage;
  const bufferY = height * percentage;

  return {
    xmin: extent.xmin - bufferX,
    ymin: extent.ymin - bufferY,
    xmax: extent.xmax + bufferX,
    ymax: extent.ymax + bufferY,
  };
}

export async function renderMap(args: MapOptions): Promise<RenderMapResult> {
  const {
    center,
    apn,
    bbox,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    format = 'png',
    returnBase64 = false,
  } = args;

  // Determine extent
  let extent: { xmin: number; ymin: number; xmax: number; ymax: number };

  if (bbox) {
    extent = bbox;
  } else if (apn) {
    const parcelData = await getParcelExtent(apn);
    if (!parcelData) {
      return {
        success: false,
        error_type: 'APN_NOT_FOUND',
        message: `Could not find parcel with APN "${apn}"`,
        suggestion: 'Verify the APN format or provide coordinates instead',
      };
    }
    // Expand parcel extent by 50% to show context
    extent = expandExtent(parcelData.extent, 0.5);
  } else if (center) {
    extent = pointToExtent(center.latitude, center.longitude);
  } else {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Must provide either center coordinates, APN, or bbox',
      suggestion: 'Provide at least one location parameter',
    };
  }

  try {
    // Build export map URL
    const exportParams = new URLSearchParams({
      bbox: `${extent.xmin},${extent.ymin},${extent.xmax},${extent.ymax}`,
      bboxSR: '4326',
      imageSR: '4326',
      size: `${width},${height}`,
      format: format,
      transparent: 'true',
      f: 'json', // Get JSON response first to get the image URL
    });

    // Request the export
    const exportUrl = `${SOLANO_MAP_SERVICE}/export?${exportParams.toString()}`;
    const response = await axios.get(exportUrl);
    const data = response.data;

    if (data.error) {
      return {
        success: false,
        error_type: 'EXPORT_ERROR',
        message: data.error.message || 'Map export failed',
        suggestion: 'The map service may be temporarily unavailable',
      };
    }

    const imageUrl = data.href;

    if (!imageUrl) {
      return {
        success: false,
        error_type: 'NO_IMAGE',
        message: 'No image URL returned from map service',
        suggestion: 'Try with different parameters or try again later',
      };
    }

    // If base64 requested, fetch the image and encode it
    if (returnBase64) {
      try {
        const imageResponse = await axios.get(imageUrl, {
          responseType: 'arraybuffer',
        });
        const base64 = Buffer.from(imageResponse.data).toString('base64');
        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';

        return {
          success: true,
          imageBase64: base64,
          mimeType,
          width,
          height,
          extent: {
            ...extent,
            spatialReference: { wkid: 4326 },
          },
        };
      } catch (imgError) {
        // Fall back to URL if image fetch fails
        return {
          success: true,
          imageUrl,
          width,
          height,
          extent: {
            ...extent,
            spatialReference: { wkid: 4326 },
          },
        };
      }
    }

    return {
      success: true,
      imageUrl,
      width,
      height,
      extent: {
        ...extent,
        spatialReference: { wkid: 4326 },
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'REQUEST_ERROR',
      message: `Failed to render map: ${errorMessage}`,
      suggestion: 'The map service may be temporarily unavailable. Try again in a few moments.',
    };
  }
}
