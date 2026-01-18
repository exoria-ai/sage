/**
 * Directions Tool
 *
 * Get driving directions between two locations using ESRI World Route Service.
 * Uses simple routing (0.005 credits per route) - essentially free.
 *
 * Requires OAuth 2.0 credentials:
 * - ARCGIS_CLIENT_ID
 * - ARCGIS_CLIENT_SECRET
 *
 * API Reference: https://developers.arcgis.com/rest/routing/route-service-direct/
 */

import { geocodeAddress } from './geocode';

// ESRI World Route Service endpoint
const ROUTE_SERVICE_URL =
  'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve';

// Token endpoint for OAuth 2.0 app authentication
const TOKEN_URL = 'https://www.arcgis.com/sharing/rest/oauth2/token';

// Cached token and expiry
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Get an access token using OAuth 2.0 client credentials flow
 */
async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.ARCGIS_CLIENT_ID;
  const clientSecret = process.env.ARCGIS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  // Return cached token if still valid (with 5 minute buffer)
  if (cachedToken && Date.now() < tokenExpiry - 300000) {
    return cachedToken;
  }

  try {
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    });

    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      console.error('OAuth token error:', data.error);
      return null;
    }

    cachedToken = data.access_token;
    // Token expires_in is in seconds, convert to milliseconds
    tokenExpiry = Date.now() + (data.expires_in * 1000);

    return cachedToken;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
}

interface Location {
  address?: string;
  apn?: string;
  latitude?: number;
  longitude?: number;
}

interface DirectionStep {
  instruction: string;
  distance_miles: number;
  distance_feet: number;
  time_minutes: number;
  maneuver_type?: string;
}

interface DirectionsResult {
  success: boolean;
  origin?: {
    address: string;
    latitude: number;
    longitude: number;
  };
  destination?: {
    address: string;
    latitude: number;
    longitude: number;
  };
  summary?: {
    total_distance_miles: number;
    total_time_minutes: number;
    total_time_text: string;
  };
  directions?: DirectionStep[];
  route_geometry?: {
    paths: number[][][];
    spatialReference: { wkid: number };
  };
  map_url?: string;
  error_type?: string;
  message?: string;
  suggestion?: string;
}

/**
 * Resolve a location to coordinates
 */
async function resolveLocation(
  location: Location
): Promise<{ address: string; lat: number; lon: number } | null> {
  // Direct coordinates
  if (location.latitude !== undefined && location.longitude !== undefined) {
    return {
      address: `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`,
      lat: location.latitude,
      lon: location.longitude,
    };
  }

  // Geocode address
  if (location.address) {
    const result = await geocodeAddress({ address: location.address });
    if (result.success && result.location) {
      return {
        address: result.address?.normalized || location.address,
        lat: result.location.latitude,
        lon: result.location.longitude,
      };
    }
    return null;
  }

  // TODO: Could add APN lookup here
  if (location.apn) {
    // For now, return null - would need to get parcel centroid
    return null;
  }

  return null;
}

/**
 * Format duration in minutes to human-readable text
 */
function formatDuration(minutes: number): string {
  if (minutes < 1) {
    return 'less than a minute';
  }
  if (minutes < 60) {
    const mins = Math.round(minutes);
    return `${mins} minute${mins !== 1 ? 's' : ''}`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (mins === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  return `${hours} hour${hours !== 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''}`;
}

/**
 * Get driving directions between two locations
 */
export async function getDirections(args: {
  origin: Location;
  destination: Location;
  return_geometry?: boolean;
}): Promise<DirectionsResult> {
  const { origin, destination, return_geometry = false } = args;

  // Get OAuth access token
  const token = await getAccessToken();
  if (!token) {
    return {
      success: false,
      error_type: 'CONFIGURATION_ERROR',
      message: 'ArcGIS OAuth credentials not configured or token fetch failed',
      suggestion:
        'Add ARCGIS_CLIENT_ID and ARCGIS_CLIENT_SECRET to your .env.local file.',
    };
  }

  // Resolve origin location
  const originResolved = await resolveLocation(origin);
  if (!originResolved) {
    return {
      success: false,
      error_type: 'ORIGIN_NOT_FOUND',
      message: 'Could not resolve origin location',
      suggestion: 'Provide a valid address or coordinates for the origin',
    };
  }

  // Resolve destination location
  const destResolved = await resolveLocation(destination);
  if (!destResolved) {
    return {
      success: false,
      error_type: 'DESTINATION_NOT_FOUND',
      message: 'Could not resolve destination location',
      suggestion: 'Provide a valid address or coordinates for the destination',
    };
  }

  try {
    // Build stops parameter: "lon1,lat1;lon2,lat2"
    const stops = `${originResolved.lon},${originResolved.lat};${destResolved.lon},${destResolved.lat}`;

    // Build request parameters
    const params = new URLSearchParams({
      f: 'json',
      token: token,
      stops: stops,
      returnDirections: 'true',
      directionsLanguage: 'en',
      returnRoutes: 'true',
      returnStops: 'false',
      returnBarriers: 'false',
      outSR: '4326',
    });

    // Use POST to avoid URL length issues with complex parameters
    const response = await fetch(ROUTE_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://sage-three-theta.vercel.app',
      },
      body: params.toString(),
    });
    const data = await response.json();

    // Check for errors
    if (data.error) {
      return {
        success: false,
        error_type: 'ROUTING_ERROR',
        message: data.error.message || 'Routing service error',
        suggestion: 'Check that both locations are accessible by road',
      };
    }

    // Parse route results
    if (!data.routes || !data.routes.features || data.routes.features.length === 0) {
      return {
        success: false,
        error_type: 'NO_ROUTE_FOUND',
        message: 'No route found between the locations',
        suggestion: 'Verify both locations are accessible by road',
      };
    }

    const route = data.routes.features[0];
    const routeAttrs = route.attributes || {};

    // Parse directions
    const directions: DirectionStep[] = [];
    if (data.directions && data.directions.length > 0) {
      const dirFeatures = data.directions[0].features || [];
      for (const step of dirFeatures) {
        const attrs = step.attributes || {};
        // Skip steps without meaningful instructions
        if (!attrs.text) continue;

        directions.push({
          instruction: attrs.text,
          distance_miles: Math.round((attrs.length || 0) * 1000) / 1000,
          distance_feet: Math.round((attrs.length || 0) * 5280),
          time_minutes: Math.round((attrs.time || 0) * 10) / 10,
          maneuver_type: attrs.maneuverType,
        });
      }
    }

    // Total distance and time
    const totalMiles = routeAttrs.Total_Miles || routeAttrs.Total_Length || 0;
    const totalMinutes = routeAttrs.Total_TravelTime || routeAttrs.Total_Time || 0;

    // Build map URL with route endpoints
    const mapBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    // For now, just link to the map centered between the two points
    const centerLat = (originResolved.lat + destResolved.lat) / 2;
    const centerLon = (originResolved.lon + destResolved.lon) / 2;
    const mapUrl = `${mapBaseUrl}/map?center=${centerLon},${centerLat}&zoom=12`;

    const result: DirectionsResult = {
      success: true,
      origin: {
        address: originResolved.address,
        latitude: originResolved.lat,
        longitude: originResolved.lon,
      },
      destination: {
        address: destResolved.address,
        latitude: destResolved.lat,
        longitude: destResolved.lon,
      },
      summary: {
        total_distance_miles: Math.round(totalMiles * 100) / 100,
        total_time_minutes: Math.round(totalMinutes * 10) / 10,
        total_time_text: formatDuration(totalMinutes),
      },
      directions,
      map_url: mapUrl,
    };

    // Include route geometry if requested
    if (return_geometry && route.geometry) {
      result.route_geometry = {
        paths: route.geometry.paths,
        spatialReference: { wkid: 4326 },
      };
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'REQUEST_ERROR',
      message: `Failed to get directions: ${errorMessage}`,
      suggestion: 'The routing service may be temporarily unavailable. Try again.',
    };
  }
}

/**
 * Get just travel time and distance (no turn-by-turn directions)
 * More efficient if you just need the summary
 */
export async function getTravelTime(args: {
  origin: Location;
  destination: Location;
}): Promise<{
  success: boolean;
  distance_miles?: number;
  time_minutes?: number;
  time_text?: string;
  error_type?: string;
  message?: string;
}> {
  const result = await getDirections({
    origin: args.origin,
    destination: args.destination,
    return_geometry: false,
  });

  if (!result.success) {
    return {
      success: false,
      error_type: result.error_type,
      message: result.message,
    };
  }

  return {
    success: true,
    distance_miles: result.summary?.total_distance_miles,
    time_minutes: result.summary?.total_time_minutes,
    time_text: result.summary?.total_time_text,
  };
}
