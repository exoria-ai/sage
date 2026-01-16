/**
 * Get Parcel Details Tool
 *
 * Retrieves comprehensive property information for a parcel.
 */

import { solanoClient, LAYERS } from '@/lib/services/arcgis';
import { parseAPN } from '@/lib/utils/apn';

interface ParcelResult {
  success: boolean;
  parcel?: {
    apn: string;
    situs_address: string;
    city: string;
    zip: string;
    acreage: number;
    square_feet: number;
    legal_description?: string;
  };
  assessment?: {
    land_value: number;
    improvement_value: number;
    total_value: number;
    base_year?: number;
    tax_rate_area?: string;
  };
  owner?: {
    name: string;
    mailing_address?: string;
  };
  geometry?: {
    type: string;
    coordinates: number[][][];
  };
  error_type?: string;
  message?: string;
  suggestion?: string;
}

export async function getParcelDetails(args: {
  apn?: string;
  latitude?: number;
  longitude?: number;
}): Promise<ParcelResult> {
  const { apn, latitude, longitude } = args;

  // Validate input - need either APN or coordinates
  if (!apn && (latitude === undefined || longitude === undefined)) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Either APN or coordinates (latitude/longitude) are required',
      suggestion: 'Provide an APN (e.g., "123-456-789") or both latitude and longitude',
    };
  }

  try {
    let features;

    if (apn) {
      // Query by APN
      const parsed = parseAPN(apn);
      if (!parsed) {
        return {
          success: false,
          error_type: 'INVALID_APN',
          message: `Invalid APN format: "${apn}"`,
          suggestion: 'APN should be 9 digits, optionally with dashes (e.g., "123-456-789" or "123456789")',
        };
      }

      // From SOLANO_GIS_LAYERS.md: parcelid is the APN field (no dashes)
      const where = `parcelid = '${parsed.numeric}'`;

      features = await solanoClient.queryByAttribute(LAYERS.PARCELS, where, '*');
    } else {
      // Query by coordinates
      features = await solanoClient.queryByPoint(
        LAYERS.PARCELS,
        latitude!,
        longitude!,
        '*'
      );
    }

    if (features.length === 0) {
      return {
        success: false,
        error_type: 'NO_RESULTS',
        message: apn
          ? `No parcel found with APN "${apn}"`
          : `No parcel found at coordinates (${latitude}, ${longitude})`,
        suggestion: apn
          ? 'Verify the APN is correct. Try searching by address instead.'
          : 'Coordinates may be outside Solano County or in water/right-of-way.',
      };
    }

    const feature = features[0]!;
    const attrs = feature.attributes;

    // Field names from SOLANO_GIS_LAYERS.md:
    // parcelid, p_address, sitecity, acres, gis_acre, lotsize, valland, valimp, use_desc, yrbuilt, etc.

    // Format APN with dashes
    let formattedAPN = String(attrs['parcelid'] || '');
    if (formattedAPN && !formattedAPN.includes('-') && formattedAPN.length >= 9) {
      // APN format: first 3 + middle 3 + last digits
      formattedAPN = `${formattedAPN.substring(0, 3)}-${formattedAPN.substring(3, 6)}-${formattedAPN.substring(6)}`;
    }

    // Get acreage - prefer gis_acre, then acres, then calculate from lotsize
    const lotsize = Number(attrs['lotsize'] || 0);
    const acreage = Number(attrs['gis_acre'] || attrs['acres'] || (lotsize / 43560));

    // Build result
    const result: ParcelResult = {
      success: true,
      parcel: {
        apn: formattedAPN,
        situs_address: String(attrs['p_address'] || ''),
        city: String(attrs['sitecity'] || attrs['tac_city'] || ''),
        zip: '',  // Not in parcels layer
        acreage: Math.round(acreage * 1000) / 1000,
        square_feet: Math.round(lotsize),
        legal_description: undefined,  // Not commonly available
      },
      assessment: {
        land_value: Number(attrs['valland'] || 0),
        improvement_value: Number(attrs['valimp'] || 0),
        total_value: Number(attrs['valland'] || 0) + Number(attrs['valimp'] || 0) +
                     Number(attrs['valtv'] || 0) + Number(attrs['valfme'] || 0),
        base_year: attrs['rollyear'] ? Number(attrs['rollyear']) : undefined,
        tax_rate_area: attrs['tac'] ? String(attrs['tac']) : undefined,
      },
      owner: {
        name: 'Not Available',  // Owner info may not be in public layer
        mailing_address: undefined,
      },
    };

    // Add geometry if available
    if (feature.geometry && feature.geometry.rings) {
      result.geometry = {
        type: 'Polygon',
        coordinates: feature.geometry.rings,
      };
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to retrieve parcel details: ${errorMessage}`,
      suggestion: 'The GIS service may be temporarily unavailable. Try again in a few moments.',
    };
  }
}
