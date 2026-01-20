/**
 * Geocode Address Tool
 *
 * Converts a street address to coordinates and APN.
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
  error_type?: string;
  message?: string;
  suggestion?: string;
}

export async function geocodeAddress(args: { address: string }): Promise<GeocodeResult> {
  const { address } = args;

  if (!address || address.trim().length === 0) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Address is required',
      suggestion: 'Provide a street address including city and state (e.g., "123 Main St, Fairfield, CA")',
    };
  }

  try {
    // Parse address to extract components for query
    // Field names from SOLANO_GIS_LAYERS.md: fulladdress, add_number, st_name, apn, lat, long, post_comm, post_code
    const cleanedAddress = address.trim().toUpperCase();

    // Normalize street types: "STREET" -> "ST", "ROAD" -> "RD", etc.
    // The fulladdress field uses abbreviated types (ST, RD, DR, etc.)
    const streetTypeMap: Record<string, string> = {
      'STREET': 'ST', 'AVENUE': 'AVE', 'DRIVE': 'DR', 'ROAD': 'RD',
      'LANE': 'LN', 'COURT': 'CT', 'CIRCLE': 'CIR', 'BOULEVARD': 'BLVD',
      'PLACE': 'PL', 'WAY': 'WAY', 'TERRACE': 'TER', 'PARKWAY': 'PKWY',
    };

    let normalizedAddress = cleanedAddress;
    for (const [full, abbrev] of Object.entries(streetTypeMap)) {
      // Replace full street type with abbreviated (word boundary aware)
      normalizedAddress = normalizedAddress.replace(new RegExp(`\\b${full}\\b`, 'g'), abbrev);
    }

    // Try to extract street number and name for better matching
    // Updated regex to handle multi-word street names (greedy match up to city/comma)
    const streetMatch = normalizedAddress.match(/^(\d+)\s+(.+?)(?:\s*,\s*|\s+(?:FAIRFIELD|VACAVILLE|VALLEJO|BENICIA|DIXON|RIO VISTA|SUISUN CITY|SUISUN|SOLANO))/i);

    let whereClause: string;
    if (streetMatch) {
      const [, streetNum, streetRaw] = streetMatch;
      // Remove trailing street type for st_name matching, but keep it flexible
      const streetName = streetRaw?.trim()
        .replace(/'/g, "''")
        .replace(/\s+(ST|AVE|DR|RD|LN|CT|WAY|BLVD|CIR|PL|TER|PKWY)\.?$/i, '')
        .trim();

      // Query by street number and partial street name
      // Also try fulladdress as fallback for better coverage
      whereClause = `(add_number = ${streetNum} AND UPPER(st_name) LIKE '%${streetName}%') OR UPPER(fulladdress) LIKE '%${streetNum} ${streetName}%'`;
    } else {
      // Fallback: search by full address text (use normalized version)
      whereClause = `UPPER(fulladdress) LIKE '%${normalizedAddress.replace(/'/g, "''").substring(0, 50)}%'`;
    }

    const features = await solanoClient.queryByAttribute(
      LAYERS.ADDRESS_POINTS,
      whereClause,
      'fulladdress,add_number,st_name,st_postyp,apn,lat,long,post_comm,post_code'
    );

    if (features.length === 0) {
      return {
        success: false,
        error_type: 'NO_RESULTS',
        message: `No address found matching "${address}"`,
        suggestion: 'Check spelling and try including the city name. Addresses must be within Solano County.',
      };
    }

    // Use the first (best) match
    const feature = features[0]!;
    const attrs = feature.attributes;

    // Get coordinates from attributes (lat, long fields)
    let latitude: number;
    let longitude: number;

    if (attrs['lat'] !== undefined && attrs['long'] !== undefined) {
      latitude = Number(attrs['lat']);
      longitude = Number(attrs['long']);
    } else if (feature.geometry && feature.geometry.y !== undefined && feature.geometry.x !== undefined) {
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

    // Format APN with dashes if not already formatted
    // APNs can be 9 or 10 digits: XXX-XXX-XXX or XXX-XXX-XXXX
    let apn = String(attrs['apn'] || '');
    if (apn && !apn.includes('-') && (apn.length === 9 || apn.length === 10)) {
      apn = `${apn.substring(0, 3)}-${apn.substring(3, 6)}-${apn.substring(6)}`;
    }

    // Build street address from components
    const streetNum = attrs['add_number'] || '';
    const streetName = attrs['st_name'] || '';
    const streetType = attrs['st_postyp'] || '';
    const streetAddr = `${streetNum} ${streetName} ${streetType}`.trim();

    return {
      success: true,
      address: {
        input: address,
        normalized: String(attrs['fulladdress'] || ''),
        street: streetAddr,
        city: String(attrs['post_comm'] || ''),
        zip: String(attrs['post_code'] || ''),
      },
      location: {
        latitude,
        longitude,
      },
      apn: apn || undefined,
      confidence: features.length === 1 ? 1.0 : 0.8,
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
