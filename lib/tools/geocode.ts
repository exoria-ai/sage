/**
 * Geocode Address Tool
 *
 * Converts a street address to coordinates and APN.
 * Designed to handle imprecise LLM-generated addresses with multiple fallback strategies.
 */

import { solanoClient, LAYERS } from '@/lib/services/arcgis';

interface GeocodeResult {
  success: boolean;
  address?: {
    input: string;
    normalized: string;
    street: string;
    city: string;
    zip: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  apn?: string;
  confidence?: number;
  match_type?: 'exact' | 'nearby_number' | 'street_only' | 'fuzzy';
  alternatives?: Array<{
    address: string;
    apn: string;
    distance_from_requested?: number;
  }>;
  error_type?: string;
  message?: string;
  suggestion?: string;
}

interface AddressFeature {
  attributes: Record<string, unknown>;
  geometry?: { x?: number; y?: number };
}

// Street type normalization map
const STREET_TYPE_MAP: Record<string, string> = {
  'STREET': 'ST', 'AVENUE': 'AVE', 'DRIVE': 'DR', 'ROAD': 'RD',
  'LANE': 'LN', 'COURT': 'CT', 'CIRCLE': 'CIR', 'BOULEVARD': 'BLVD',
  'PLACE': 'PL', 'WAY': 'WAY', 'TERRACE': 'TER', 'PARKWAY': 'PKWY',
  'HIGHWAY': 'HWY', 'FREEWAY': 'FWY',
};

// Directional prefix normalization
const DIRECTIONAL_MAP: Record<string, string> = {
  'NORTH': 'N', 'SOUTH': 'S', 'EAST': 'E', 'WEST': 'W',
  'NORTHEAST': 'NE', 'NORTHWEST': 'NW', 'SOUTHEAST': 'SE', 'SOUTHWEST': 'SW',
};

/**
 * Normalize an address string for matching.
 * Handles street types, directional prefixes, and common variations.
 */
function normalizeAddress(address: string): string {
  let normalized = address.trim().toUpperCase();

  // Normalize street types
  for (const [full, abbrev] of Object.entries(STREET_TYPE_MAP)) {
    normalized = normalized.replace(new RegExp(`\\b${full}\\b`, 'g'), abbrev);
  }

  // Normalize directional prefixes
  for (const [full, abbrev] of Object.entries(DIRECTIONAL_MAP)) {
    normalized = normalized.replace(new RegExp(`\\b${full}\\b`, 'g'), abbrev);
  }

  return normalized;
}

/**
 * Extract street number and name from an address string.
 * Returns null if unable to parse.
 */
function parseAddress(address: string): { streetNum: number; streetName: string; direction?: string; city?: string } | null {
  const normalized = normalizeAddress(address);

  // City names in Solano County (order matters - longer names first)
  const cities = [
    'SUISUN CITY', 'RIO VISTA', 'FAIRFIELD', 'VACAVILLE', 'VALLEJO',
    'BENICIA', 'DIXON', 'SUISUN', 'SOLANO', 'TRAVIS AFB',
  ];

  // Try to match: NUMBER [DIRECTION] STREET_NAME [, CITY]
  const cityPattern = cities.join('|');
  const withCityMatch = normalized.match(
    new RegExp(`^(\\d+)\\s+(.+?)(?:\\s*,\\s*|\\s+)(${cityPattern})`, 'i')
  );

  let rawStreet: string | undefined;
  let num: string | undefined;
  let city: string | undefined;

  if (withCityMatch) {
    [, num, rawStreet, city] = withCityMatch;
  } else {
    // Try without city - just number and street
    const noCityMatch = normalized.match(/^(\d+)\s+(.+?)(?:\s*,|$)/);
    if (noCityMatch) {
      [, num, rawStreet] = noCityMatch;
    }
  }

  if (!num || !rawStreet) return null;

  // Clean up the street name
  let streetName = rawStreet.trim()
    .replace(/\s+(ST|AVE|DR|RD|LN|CT|WAY|BLVD|CIR|PL|TER|PKWY|HWY|FWY)\.?$/i, '')
    .trim();

  // Extract directional prefix (N, S, E, W, NE, NW, SE, SW)
  let direction: string | undefined;
  const dirMatch = streetName.match(/^(N|S|E|W|NE|NW|SE|SW)\s+(.+)$/i);
  if (dirMatch) {
    direction = dirMatch[1]!.toUpperCase();
    streetName = dirMatch[2]!.trim();
  }

  return {
    streetNum: parseInt(num, 10),
    streetName,
    direction,
    city,
  };
}

/**
 * Query address points with a WHERE clause.
 */
async function queryAddresses(whereClause: string, limit: number = 10): Promise<AddressFeature[]> {
  return solanoClient.queryByAttribute(
    LAYERS.ADDRESS_POINTS,
    whereClause,
    'fulladdress,add_number,st_predir,st_name,st_postyp,apn,lat,long,post_comm,post_code'
  );
}

/**
 * Map abbreviated direction back to full word for st_predir matching.
 */
function expandDirection(abbrev: string): string {
  const map: Record<string, string> = {
    'N': 'NORTH', 'S': 'SOUTH', 'E': 'EAST', 'W': 'WEST',
    'NE': 'NORTHEAST', 'NW': 'NORTHWEST', 'SE': 'SOUTHEAST', 'SW': 'SOUTHWEST',
  };
  return map[abbrev.toUpperCase()] || abbrev;
}

/**
 * Build a result from an address feature.
 */
function buildResult(
  feature: AddressFeature,
  input: string,
  matchType: 'exact' | 'nearby_number' | 'street_only' | 'fuzzy',
  confidence: number,
  alternatives?: GeocodeResult['alternatives']
): GeocodeResult {
  const attrs = feature.attributes;

  // Get coordinates
  let latitude: number;
  let longitude: number;

  if (attrs['lat'] !== undefined && attrs['long'] !== undefined) {
    latitude = Number(attrs['lat']);
    longitude = Number(attrs['long']);
  } else if (feature.geometry?.y !== undefined && feature.geometry?.x !== undefined) {
    latitude = feature.geometry.y;
    longitude = feature.geometry.x;
  } else {
    return {
      success: false,
      error_type: 'GEOMETRY_ERROR',
      message: 'Address found but coordinates unavailable',
      suggestion: 'Try using the APN directly if known',
    };
  }

  // Format APN
  let apn = String(attrs['apn'] || '');
  if (apn && !apn.includes('-') && (apn.length === 9 || apn.length === 10)) {
    apn = `${apn.substring(0, 3)}-${apn.substring(3, 6)}-${apn.substring(6)}`;
  }

  // Build street address
  const streetNum = attrs['add_number'] || '';
  const streetName = attrs['st_name'] || '';
  const streetType = attrs['st_postyp'] || '';
  const streetAddr = `${streetNum} ${streetName} ${streetType}`.trim();

  return {
    success: true,
    address: {
      input,
      normalized: String(attrs['fulladdress'] || ''),
      street: streetAddr,
      city: String(attrs['post_comm'] || ''),
      zip: String(attrs['post_code'] || ''),
    },
    location: { latitude, longitude },
    apn: apn || undefined,
    confidence,
    match_type: matchType,
    alternatives,
  };
}

/**
 * Geocode an address with multiple fallback strategies.
 *
 * Strategy order:
 * 1. Exact match on street number + street name
 * 2. Nearby street numbers (±100) on same street
 * 3. Street name only (return closest to requested number)
 * 4. Fuzzy fulladdress search
 */
export async function geocodeAddress(args: { address: string }): Promise<GeocodeResult> {
  const { address } = args;

  if (!address || address.trim().length === 0) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Address is required',
      suggestion: 'Provide a street address (e.g., "123 Main St, Fairfield")',
    };
  }

  try {
    const parsed = parseAddress(address);

    if (parsed) {
      const { streetNum, streetName, direction } = parsed;
      const escapedStreet = streetName.replace(/'/g, "''");

      // Build direction clause if present (st_predir uses full words like 'NORTH')
      const dirClause = direction ? ` AND UPPER(st_predir) = '${expandDirection(direction)}'` : '';

      // Strategy 1: Exact match (with direction if specified)
      const exactWhere = `add_number = ${streetNum} AND UPPER(st_name) LIKE '%${escapedStreet}%'${dirClause}`;
      const exactMatches = await queryAddresses(exactWhere, 5);

      if (exactMatches.length > 0) {
        return buildResult(exactMatches[0]!, address, 'exact', 1.0);
      }

      // Strategy 1b: Try without direction constraint (maybe user got direction wrong)
      if (direction) {
        const exactNoDirWhere = `add_number = ${streetNum} AND UPPER(st_name) LIKE '%${escapedStreet}%'`;
        const exactNoDirMatches = await queryAddresses(exactNoDirWhere, 5);
        if (exactNoDirMatches.length > 0) {
          const result = buildResult(exactNoDirMatches[0]!, address, 'exact', 0.9);
          if (result.success) {
            result.suggestion = `Matched without directional prefix constraint`;
          }
          return result;
        }
      }

      // Strategy 2: Nearby street numbers (±100)
      const nearbyWhere = `add_number >= ${streetNum - 100} AND add_number <= ${streetNum + 100} AND UPPER(st_name) LIKE '%${escapedStreet}%'${dirClause}`;
      const nearbyMatches = await queryAddresses(nearbyWhere, 20);

      if (nearbyMatches.length > 0) {
        // Sort by distance from requested number
        nearbyMatches.sort((a, b) => {
          const aDist = Math.abs(Number(a.attributes['add_number']) - streetNum);
          const bDist = Math.abs(Number(b.attributes['add_number']) - streetNum);
          return aDist - bDist;
        });

        const closest = nearbyMatches[0]!;
        const closestNum = Number(closest.attributes['add_number']);
        const distance = Math.abs(closestNum - streetNum);

        // Build alternatives list
        const alternatives = nearbyMatches.slice(0, 5).map(f => ({
          address: String(f.attributes['fulladdress'] || ''),
          apn: String(f.attributes['apn'] || ''),
          distance_from_requested: Math.abs(Number(f.attributes['add_number']) - streetNum),
        }));

        // Confidence decreases with distance
        const confidence = Math.max(0.5, 1 - (distance / 200));

        const result = buildResult(closest, address, 'nearby_number', confidence, alternatives);
        if (result.success) {
          result.suggestion = `Requested ${streetNum}, matched ${closestNum} (${distance} ${distance === 1 ? 'number' : 'numbers'} away)`;
        }
        return result;
      }

      // Strategy 3: Street name only (any number on that street)
      const streetOnlyWhere = `UPPER(st_name) LIKE '%${escapedStreet}%'`;
      const streetMatches = await queryAddresses(streetOnlyWhere, 50);

      if (streetMatches.length > 0) {
        // Sort by distance from requested number
        streetMatches.sort((a, b) => {
          const aDist = Math.abs(Number(a.attributes['add_number']) - streetNum);
          const bDist = Math.abs(Number(b.attributes['add_number']) - streetNum);
          return aDist - bDist;
        });

        const closest = streetMatches[0]!;
        const closestNum = Number(closest.attributes['add_number']);

        // Get address range on this street
        const numbers = streetMatches.map(f => Number(f.attributes['add_number']));
        const minNum = Math.min(...numbers);
        const maxNum = Math.max(...numbers);

        const alternatives = streetMatches.slice(0, 5).map(f => ({
          address: String(f.attributes['fulladdress'] || ''),
          apn: String(f.attributes['apn'] || ''),
          distance_from_requested: Math.abs(Number(f.attributes['add_number']) - streetNum),
        }));

        const result = buildResult(closest, address, 'street_only', 0.4, alternatives);
        if (result.success) {
          result.suggestion = `Address ${streetNum} not found on ${streetName}. Range is ${minNum}-${maxNum}. Showing closest: ${closestNum}`;
        }
        return result;
      }
    }

    // Strategy 4: Fuzzy fulladdress search
    const normalized = normalizeAddress(address);
    const fuzzyWhere = `UPPER(fulladdress) LIKE '%${normalized.replace(/'/g, "''").substring(0, 50)}%'`;
    const fuzzyMatches = await queryAddresses(fuzzyWhere, 10);

    if (fuzzyMatches.length > 0) {
      const alternatives = fuzzyMatches.slice(0, 5).map(f => ({
        address: String(f.attributes['fulladdress'] || ''),
        apn: String(f.attributes['apn'] || ''),
      }));

      return buildResult(fuzzyMatches[0]!, address, 'fuzzy', 0.3, alternatives);
    }

    // No matches found
    return {
      success: false,
      error_type: 'NO_RESULTS',
      message: `No address found matching "${address}"`,
      suggestion: 'Try searching with just the street name, or verify the address exists in Solano County.',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to geocode address: ${errorMessage}`,
      suggestion: 'The GIS service may be temporarily unavailable. Try again in a few moments.',
    };
  }
}
