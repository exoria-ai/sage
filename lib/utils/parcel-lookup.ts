/**
 * Parcel Lookup Utility
 *
 * Shared function to get coordinates from APN.
 */

import { solanoClient, LAYERS } from '@/lib/services/arcgis';
import { parseAPN } from './apn';

/**
 * Get coordinates (centroid) from APN
 */
export async function getCoordinatesFromAPN(apn: string): Promise<{ latitude: number; longitude: number } | null> {
  const parsed = parseAPN(apn);
  if (!parsed) return null;

  try {
    // parcelid field uses no dashes
    const where = `parcelid = '${parsed.numeric}'`;
    const features = await solanoClient.queryByAttribute(LAYERS.PARCELS, where, 'parcelid');

    if (features.length > 0 && features[0]!.geometry) {
      const geom = features[0]!.geometry;
      // For polygons, use centroid (approximate with first ring center)
      if (geom.rings && geom.rings[0]) {
        const ring = geom.rings[0];
        let sumX = 0, sumY = 0;
        for (const coord of ring) {
          sumX += coord[0] ?? 0;
          sumY += coord[1] ?? 0;
        }
        return {
          longitude: sumX / ring.length,
          latitude: sumY / ring.length,
        };
      }
    }
    return null;
  } catch {
    return null;
  }
}
