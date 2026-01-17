/**
 * Get Parcels in Buffer Tool
 *
 * Spatial query to find all parcels within a specified radius of a location.
 * Commonly used for property owner notification requirements (e.g., 300ft radius
 * notifications for discretionary permits).
 */

import { solanoClient, ENDPOINTS, LAYERS } from '@/lib/services/arcgis';
import { parseAPN } from '@/lib/utils/apn';

// Earth radius in feet for distance calculations
const EARTH_RADIUS_FEET = 20902231;

/**
 * Calculate distance between two points in feet using Haversine formula
 */
function calculateDistanceFeet(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_FEET * c;
}

/**
 * Get coordinates and geometry from APN
 */
async function getParcelGeometry(apn: string): Promise<{
  centroid: { lat: number; lon: number };
  rings: number[][][];
} | null> {
  const parsed = parseAPN(apn);
  if (!parsed) return null;

  const features = await solanoClient.queryByAttribute(
    LAYERS.PARCELS,
    `parcelid = '${parsed.numeric}'`,
    '*'
  );

  if (features.length === 0) return null;

  const feature = features[0];
  if (!feature) return null;

  const geometry = feature.geometry;
  if (!geometry?.rings) return null;

  // Calculate centroid
  let sumX = 0,
    sumY = 0,
    count = 0;
  for (const ring of geometry.rings) {
    for (const coord of ring) {
      sumX += coord[0] ?? 0;
      sumY += coord[1] ?? 0;
      count++;
    }
  }

  return {
    centroid: {
      lat: sumY / count,
      lon: sumX / count,
    },
    rings: geometry.rings,
  };
}

/**
 * Calculate bounding box that contains a buffer around parcel geometry
 */
function getBufferedBbox(
  rings: number[][][],
  bufferFeet: number
): { xmin: number; ymin: number; xmax: number; ymax: number } {
  let xmin = Infinity,
    ymin = Infinity,
    xmax = -Infinity,
    ymax = -Infinity;

  for (const ring of rings) {
    for (const coord of ring) {
      const x = coord[0] ?? 0;
      const y = coord[1] ?? 0;
      xmin = Math.min(xmin, x);
      ymin = Math.min(ymin, y);
      xmax = Math.max(xmax, x);
      ymax = Math.max(ymax, y);
    }
  }

  // Convert buffer feet to degrees (approximate)
  // At this latitude: 1 degree lat ≈ 364,000 feet, 1 degree lon ≈ 288,000 feet
  const latDelta = bufferFeet / 364000;
  const lonDelta = bufferFeet / 288000;

  return {
    xmin: xmin - lonDelta,
    ymin: ymin - latDelta,
    xmax: xmax + lonDelta,
    ymax: ymax + latDelta,
  };
}

/**
 * Calculate minimum distance from a point to a polygon (defined by rings)
 */
function distanceToPolygon(lat: number, lon: number, rings: number[][][]): number {
  let minDistance = Infinity;

  for (const ring of rings) {
    for (let i = 0; i < ring.length - 1; i++) {
      const p1 = ring[i]!;
      const p2 = ring[i + 1]!;

      // Calculate distance to line segment
      const dist = distanceToLineSegment(lon, lat, p1[0]!, p1[1]!, p2[0]!, p2[1]!);
      minDistance = Math.min(minDistance, dist);
    }
  }

  return minDistance;
}

/**
 * Calculate distance from point (px, py) to line segment (x1,y1)-(x2,y2)
 * Returns distance in feet
 */
function distanceToLineSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0 && dy === 0) {
    // Segment is a point
    return calculateDistanceFeet(py, px, y1, x1);
  }

  // Calculate projection parameter
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));

  // Find closest point on segment
  const closestX = x1 + t * dx;
  const closestY = y1 + t * dy;

  return calculateDistanceFeet(py, px, closestY, closestX);
}

interface BufferParcel {
  apn: string;
  situs_address: string;
  owner_name: string;
  mailing_address?: string;
  city: string;
  acreage: number;
  distance_feet: number;
  centroid: {
    latitude: number;
    longitude: number;
  };
}

interface BufferResult {
  success: boolean;
  source?: {
    apn?: string;
    latitude: number;
    longitude: number;
  };
  buffer_feet?: number;
  total_parcels?: number;
  parcels_returned?: number;
  truncated?: boolean;
  parcels?: BufferParcel[];
  error_type?: string;
  message?: string;
  suggestion?: string;
}

// Maximum parcels to return in text response to avoid context exhaustion
const MAX_PARCELS_RETURNED = 250;

/**
 * Get all parcels within a buffer radius of a location or parcel
 */
export async function getParcelsInBuffer(args: {
  apn?: string;
  latitude?: number;
  longitude?: number;
  radius_feet?: number;
  include_source?: boolean;
}): Promise<BufferResult> {
  const { apn, latitude, longitude, radius_feet = 300, include_source = false } = args;

  // Validate input - need either APN or coordinates
  if (!apn && (latitude === undefined || longitude === undefined)) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Either APN or coordinates (latitude/longitude) are required',
      suggestion: 'Provide an APN like "0030-251-020" or lat/lon coordinates',
    };
  }

  let sourceLat: number;
  let sourceLon: number;
  let sourceRings: number[][][] | undefined;
  let sourceApn: string | undefined;

  // Get source location
  if (apn) {
    const geometry = await getParcelGeometry(apn);
    if (!geometry) {
      return {
        success: false,
        error_type: 'APN_NOT_FOUND',
        message: `Could not find parcel with APN "${apn}"`,
        suggestion: 'Verify the APN format (XXX-XXX-XXX) or use coordinates instead',
      };
    }
    sourceLat = geometry.centroid.lat;
    sourceLon = geometry.centroid.lon;
    sourceRings = geometry.rings;
    sourceApn = apn;
  } else {
    sourceLat = latitude!;
    sourceLon = longitude!;
  }

  try {
    // Build spatial query envelope
    let envelope;
    if (sourceRings) {
      // Use buffered bounding box of the source parcel
      const bbox = getBufferedBbox(sourceRings, radius_feet);
      envelope = {
        ...bbox,
        spatialReference: { wkid: 4326 },
      };
    } else {
      // Use simple buffer around point
      const latDelta = radius_feet / 364000;
      const lonDelta = radius_feet / 288000;
      envelope = {
        xmin: sourceLon - lonDelta,
        ymin: sourceLat - latDelta,
        xmax: sourceLon + lonDelta,
        ymax: sourceLat + latDelta,
        spatialReference: { wkid: 4326 },
      };
    }

    // Query parcels
    const url = `${ENDPOINTS.SOLANO_AGOL}/${LAYERS.PARCELS}/query`;
    const params = new URLSearchParams({
      geometry: JSON.stringify(envelope),
      geometryType: 'esriGeometryEnvelope',
      spatialRel: 'esriSpatialRelIntersects',
      inSR: '4326',
      outFields: '*',
      returnGeometry: 'true',
      outSR: '4326',
      f: 'json',
    });

    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    if (!data.features) {
      return {
        success: true,
        source: {
          apn: sourceApn,
          latitude: sourceLat,
          longitude: sourceLon,
        },
        buffer_feet: radius_feet,
        total_parcels: 0,
        parcels: [],
        message: `No parcels found within ${radius_feet} feet`,
      };
    }

    // Process results
    const parcels: BufferParcel[] = [];
    const parsedSourceApn = sourceApn ? parseAPN(sourceApn) : null;

    for (const feature of data.features) {
      const attrs = feature.attributes;
      const parcelId = String(attrs['parcelid'] || '');

      // Skip source parcel unless include_source is true
      if (!include_source && parsedSourceApn && parcelId === parsedSourceApn.numeric) {
        continue;
      }

      // Calculate distance
      let distanceFeet: number;

      // Get parcel centroid
      let parcelLat: number | undefined;
      let parcelLon: number | undefined;

      if (feature.geometry?.rings) {
        let sumX = 0,
          sumY = 0,
          count = 0;
        for (const ring of feature.geometry.rings) {
          for (const coord of ring) {
            sumX += coord[0];
            sumY += coord[1];
            count++;
          }
        }
        if (count > 0) {
          parcelLon = sumX / count;
          parcelLat = sumY / count;
        }
      }

      if (parcelLat === undefined || parcelLon === undefined) {
        continue; // Skip parcels without geometry
      }

      // Calculate distance from source
      if (sourceRings) {
        // Distance from parcel centroid to source parcel boundary
        distanceFeet = distanceToPolygon(parcelLat, parcelLon, sourceRings);
      } else {
        // Distance from parcel centroid to source point
        distanceFeet = calculateDistanceFeet(sourceLat, sourceLon, parcelLat, parcelLon);
      }

      // Skip if outside actual radius
      if (distanceFeet > radius_feet) continue;

      // Format APN
      let formattedAPN = parcelId;
      if (formattedAPN && !formattedAPN.includes('-') && formattedAPN.length >= 9) {
        formattedAPN = `${formattedAPN.substring(0, 3)}-${formattedAPN.substring(3, 6)}-${formattedAPN.substring(6)}`;
      }

      // Get owner info - may not be in public layer
      const ownerName = String(attrs['owner'] || attrs['ownername'] || 'Not Available');

      parcels.push({
        apn: formattedAPN,
        situs_address: String(attrs['p_address'] || ''),
        owner_name: ownerName,
        mailing_address: undefined, // Not typically in public layer
        city: String(attrs['sitecity'] || attrs['tac_city'] || ''),
        acreage: Math.round((Number(attrs['gis_acre'] || attrs['acres'] || 0)) * 1000) / 1000,
        distance_feet: Math.round(distanceFeet),
        centroid: {
          latitude: parcelLat,
          longitude: parcelLon,
        },
      });
    }

    // Sort by distance
    parcels.sort((a, b) => a.distance_feet - b.distance_feet);

    // Limit results to avoid context exhaustion
    const totalParcels = parcels.length;
    const truncated = totalParcels > MAX_PARCELS_RETURNED;
    const returnedParcels = truncated ? parcels.slice(0, MAX_PARCELS_RETURNED) : parcels;

    return {
      success: true,
      source: {
        apn: sourceApn,
        latitude: sourceLat,
        longitude: sourceLon,
      },
      buffer_feet: radius_feet,
      total_parcels: totalParcels,
      parcels_returned: returnedParcels.length,
      truncated,
      parcels: returnedParcels,
      ...(truncated && {
        message: `Results limited to ${MAX_PARCELS_RETURNED} parcels (${totalParcels} total found). Consider using a smaller radius or render_map for visualization.`,
      }),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to query parcels in buffer: ${errorMessage}`,
      suggestion: 'The GIS service may be temporarily unavailable. Try again in a few moments.',
    };
  }
}
