/**
 * Coordinate Utilities
 *
 * Helper functions for coordinate transformations and spatial operations.
 */

import proj4 from 'proj4';

// Define common coordinate reference systems
// WGS84 (EPSG:4326) - standard lat/lon used by GPS
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

// NAD83 California State Plane Zone 2 (EPSG:2226) - feet
// Used by many California county GIS systems
proj4.defs(
  'EPSG:2226',
  '+proj=lcc +lat_1=39.83333333333334 +lat_2=38.33333333333334 +lat_0=37.66666666666666 +lon_0=-122 +x_0=2000000.0001016 +y_0=500000.0001016001 +datum=NAD83 +units=us-ft +no_defs'
);

// Web Mercator (EPSG:3857) - used by web maps
proj4.defs(
  'EPSG:3857',
  '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs'
);

export interface Point {
  latitude: number;
  longitude: number;
}

export interface ProjectedPoint {
  x: number;
  y: number;
}

/**
 * Convert WGS84 coordinates to State Plane
 */
export function toStatePlane(point: Point): ProjectedPoint {
  const [x, y] = proj4('EPSG:4326', 'EPSG:2226', [point.longitude, point.latitude]);
  return { x: x!, y: y! };
}

/**
 * Convert State Plane coordinates to WGS84
 */
export function toWGS84(point: ProjectedPoint): Point {
  const [longitude, latitude] = proj4('EPSG:2226', 'EPSG:4326', [point.x, point.y]);
  return { latitude: latitude!, longitude: longitude! };
}

/**
 * Convert WGS84 coordinates to Web Mercator
 */
export function toWebMercator(point: Point): ProjectedPoint {
  const [x, y] = proj4('EPSG:4326', 'EPSG:3857', [point.longitude, point.latitude]);
  return { x: x!, y: y! };
}

/**
 * Format ArcGIS geometry JSON for point queries
 */
export function formatPointGeometry(point: Point): string {
  return JSON.stringify({
    x: point.longitude,
    y: point.latitude,
    spatialReference: { wkid: 4326 },
  });
}

/**
 * Validate that coordinates are within Solano County bounds
 * Approximate bounding box for Solano County
 */
export function isInSolanoCounty(point: Point): boolean {
  const bounds = {
    minLat: 38.03,
    maxLat: 38.54,
    minLon: -122.41,
    maxLon: -121.59,
  };

  return (
    point.latitude >= bounds.minLat &&
    point.latitude <= bounds.maxLat &&
    point.longitude >= bounds.minLon &&
    point.longitude <= bounds.maxLon
  );
}

/**
 * Calculate distance between two points in meters (Haversine formula)
 */
export function distanceMeters(point1: Point, point2: Point): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = toRadians(point2.latitude - point1.latitude);
  const dLon = toRadians(point2.longitude - point1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.latitude)) *
      Math.cos(toRadians(point2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
