/**
 * Get Nearby Tool
 *
 * Find nearby points of interest: schools, parks, fire stations, etc.
 */

import { ENDPOINTS } from '@/lib/services/arcgis';
import { getCoordinatesFromAPN } from '@/lib/utils/parcel-lookup';
import { EARTH_RADIUS_FEET, LIMITS } from '@/lib/config';

// Point of interest layers from SOLANO_GIS_LAYERS.md
const POI_LAYERS: Record<string, { path: string; nameField: string; typeField?: string }> = {
  school: {
    path: 'Schools/FeatureServer/0',
    nameField: 'name',
    typeField: 'type',
  },
  park: {
    path: 'ParksInSolanoCounty/FeatureServer/0',
    nameField: 'Name',
  },
  fire_station: {
    path: 'Fire_Stations/FeatureServer/0',
    nameField: 'Name',
  },
  hospital: {
    path: 'Hospitals/FeatureServer/0',
    nameField: 'Name',
  },
  library: {
    path: 'Libraries/FeatureServer/0',
    nameField: 'Name',
  },
  police: {
    path: 'Police_Stations/FeatureServer/0',
    nameField: 'Name',
  },
  transit: {
    path: 'Public_Transit_Stops/FeatureServer/0',
    nameField: 'StopName',
  },
  community_center: {
    path: 'Community_Centers/FeatureServer/0',
    nameField: 'Name',
  },
};

interface NearbyFeature {
  name: string;
  type?: string;
  distance_feet: number;
  distance_miles: number;
  latitude?: number;
  longitude?: number;
}

interface NearbyResult {
  success: boolean;
  location?: {
    apn?: string;
    latitude: number;
    longitude: number;
  };
  layer_type?: string;
  radius_feet?: number;
  features?: NearbyFeature[];
  total_found?: number;
  error_type?: string;
  message?: string;
  suggestion?: string;
}

// Note: EARTH_RADIUS_FEET imported from @/lib/config

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
 * Query nearby features using a buffer geometry
 */
async function queryNearby(
  layerPath: string,
  lat: number,
  lon: number,
  radiusFeet: number,
  nameField: string,
  typeField?: string
): Promise<NearbyFeature[]> {
  // Convert radius to degrees (approximate)
  // 1 degree latitude ≈ 364,000 feet
  // 1 degree longitude ≈ 288,000 feet at this latitude
  const latDelta = radiusFeet / 364000;
  const lonDelta = radiusFeet / 288000;

  // Create envelope for spatial query
  const envelope = {
    xmin: lon - lonDelta,
    ymin: lat - latDelta,
    xmax: lon + lonDelta,
    ymax: lat + latDelta,
    spatialReference: { wkid: 4326 },
  };

  const url = `${ENDPOINTS.SOLANO_AGOL}/${layerPath}/query`;
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

  if (!data.features) return [];

  const results: NearbyFeature[] = [];

  for (const feature of data.features) {
    // Get feature location
    let featureLat: number | undefined;
    let featureLon: number | undefined;

    if (feature.geometry) {
      if (feature.geometry.x !== undefined && feature.geometry.y !== undefined) {
        // Point geometry
        featureLon = feature.geometry.x;
        featureLat = feature.geometry.y;
      } else if (feature.geometry.rings) {
        // Polygon - use centroid
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
          featureLon = sumX / count;
          featureLat = sumY / count;
        }
      }
    }

    // Calculate distance
    let distanceFeet = 0;
    if (featureLat !== undefined && featureLon !== undefined) {
      distanceFeet = calculateDistanceFeet(lat, lon, featureLat, featureLon);

      // Skip if outside actual radius (envelope query catches corners)
      if (distanceFeet > radiusFeet) continue;
    }

    const attrs = feature.attributes;
    results.push({
      name: String(attrs[nameField] ?? 'Unknown'),
      type: typeField ? String(attrs[typeField] ?? '') : undefined,
      distance_feet: Math.round(distanceFeet),
      distance_miles: Math.round((distanceFeet / 5280) * 100) / 100,
      latitude: featureLat,
      longitude: featureLon,
    });
  }

  // Sort by distance
  results.sort((a, b) => a.distance_feet - b.distance_feet);

  return results;
}

/**
 * Get nearby points of interest
 */
export async function getNearby(args: {
  layer_type: string;
  apn?: string;
  latitude?: number;
  longitude?: number;
  radius_feet?: number;
  limit?: number;
}): Promise<NearbyResult> {
  const { layer_type, apn, latitude, longitude, radius_feet = 5280, limit = 10 } = args;

  // Validate layer type
  const layerType = layer_type.toLowerCase().replace(/[- ]/g, '_');
  const layerConfig = POI_LAYERS[layerType];

  if (!layerConfig) {
    return {
      success: false,
      error_type: 'INVALID_LAYER',
      message: `Unknown layer type: "${layer_type}"`,
      suggestion: `Available types: ${Object.keys(POI_LAYERS).join(', ')}`,
    };
  }

  // Need either APN or coordinates
  if (!apn && (latitude === undefined || longitude === undefined)) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Either APN or coordinates (latitude/longitude) required',
      suggestion: 'Provide an APN like "0030-251-020" or lat/lon coordinates',
    };
  }

  let lat: number;
  let lon: number;
  let resolvedAPN: string | undefined;

  // Get coordinates
  if (apn) {
    const coords = await getCoordinatesFromAPN(apn);
    if (!coords) {
      return {
        success: false,
        error_type: 'APN_NOT_FOUND',
        message: `Could not find parcel with APN "${apn}"`,
        suggestion: 'Verify the APN format (XXX-XXX-XXX) or use coordinates instead',
      };
    }
    lat = coords.latitude;
    lon = coords.longitude;
    resolvedAPN = apn;
  } else {
    lat = latitude!;
    lon = longitude!;
  }

  try {
    const features = await queryNearby(
      layerConfig.path,
      lat,
      lon,
      radius_feet,
      layerConfig.nameField,
      layerConfig.typeField
    );

    const limitedFeatures = features.slice(0, limit);

    if (limitedFeatures.length === 0) {
      return {
        success: true,
        location: {
          apn: resolvedAPN,
          latitude: lat,
          longitude: lon,
        },
        layer_type: layerType,
        radius_feet,
        features: [],
        total_found: 0,
        message: `No ${layerType.replace(/_/g, ' ')}s found within ${radius_feet} feet`,
        suggestion: 'Try increasing the search radius',
      };
    }

    return {
      success: true,
      location: {
        apn: resolvedAPN,
        latitude: lat,
        longitude: lon,
      },
      layer_type: layerType,
      radius_feet,
      features: limitedFeatures,
      total_found: features.length,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to query nearby features: ${errorMessage}`,
      suggestion: 'Try again or verify the location',
    };
  }
}
