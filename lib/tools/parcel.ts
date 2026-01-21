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
    acreage: number;
    lot_sqft: number;
    use_code?: string;
    use_description?: string;
    subdivision?: string;
    zoning?: {
      zone1?: string;
      zone2?: string;
      zone3?: string;
    };
  };
  building?: {
    year_built?: number;
    total_sqft?: number;
    first_floor_sqft?: number;
    second_floor_sqft?: number;
    third_floor_sqft?: number;
    other_sqft?: number;
    garage_sqft?: number;
    stories?: number;
    bedrooms?: number;
    bathrooms?: number;
    total_rooms?: number;
    fireplace_count?: number;
    hvac?: string;
    has_pool?: boolean;
    has_solar?: boolean;
  };
  assessment?: {
    roll_year?: number;
    land_value: number;
    improvement_value: number;
    trees_vines_value?: number;
    equipment_value?: number;
    total_value: number;
    tax_rate_area?: number;
    tax_city?: string;
  };
  williamson_act?: {
    enrolled: boolean;
    status?: string;
    contract_number?: string;
    prime_acres?: number;
    nonprime_acres?: number;
  };
  flags?: {
    government_owned?: boolean;
    homeowner_exemption?: string;
  };
  links?: {
    property_details?: string;
    tax_map?: string;
    tax_info?: string;
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
          suggestion: 'APN should be 9-10 digits, optionally with dashes (e.g., "123-456-789" or "003-025-1020")',
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

    // Helper to get non-empty string or undefined
    const str = (val: unknown): string | undefined => {
      const s = val != null ? String(val).trim() : '';
      return s && s !== 'null' ? s : undefined;
    };

    // Helper to get positive number or undefined
    const num = (val: unknown): number | undefined => {
      const n = Number(val);
      return n > 0 ? n : undefined;
    };

    // Format APN with dashes
    let formattedAPN = String(attrs['parcelid'] || '');
    if (formattedAPN && !formattedAPN.includes('-') && formattedAPN.length >= 9) {
      formattedAPN = `${formattedAPN.substring(0, 3)}-${formattedAPN.substring(3, 6)}-${formattedAPN.substring(6)}`;
    }

    // Get acreage - prefer gis_acre, then acres, then calculate from lotsize
    const lotsize = Number(attrs['lotsize'] || 0);
    const acreage = Number(attrs['gis_acre'] || attrs['acres'] || (lotsize / 43560));

    // Build zoning object if any zones exist
    const zone1 = str(attrs['zone1']);
    const zone2 = str(attrs['zone2']);
    const zone3 = str(attrs['zone3']);
    const zoning = (zone1 || zone2 || zone3) ? { zone1, zone2, zone3 } : undefined;

    // Build building info if any building data exists
    const yearBuilt = num(attrs['yrbuilt']);
    const totalArea = num(attrs['total_area']);
    const stories = num(attrs['stories']);
    const bedrooms = num(attrs['bedroom']);
    const bathrooms = num(attrs['bathroom']);
    const hasPool = attrs['pool'] === 'YES';
    const hasSolar = attrs['solar'] === 'YES';

    const building = (yearBuilt || totalArea || stories || bedrooms || bathrooms || hasPool || hasSolar) ? {
      year_built: yearBuilt,
      total_sqft: totalArea,
      first_floor_sqft: num(attrs['firs_floor']),
      second_floor_sqft: num(attrs['sec_floor']),
      third_floor_sqft: num(attrs['thir_floor']),
      other_sqft: num(attrs['other_area']),
      garage_sqft: num(attrs['garage']),
      stories,
      bedrooms,
      bathrooms,
      total_rooms: num(attrs['rooms']),
      fireplace_count: num(attrs['fireplc']),
      hvac: str(attrs['hvac']),
      has_pool: hasPool || undefined,
      has_solar: hasSolar || undefined,
    } : undefined;

    // Williamson Act info
    const waEnrolled = attrs['wa'] === 'YES';
    const williamsonAct = waEnrolled ? {
      enrolled: true,
      status: str(attrs['wa_status']),
      contract_number: str(attrs['wacontno']),
      prime_acres: num(attrs['wa_prime']),
      nonprime_acres: num(attrs['noprimacre']),
    } : undefined;

    // Flags
    const govtOwned = attrs['govt_owned'] === 'YES';
    const hotype = str(attrs['hotype']);
    const flags = (govtOwned || hotype) ? {
      government_owned: govtOwned || undefined,
      homeowner_exemption: hotype,
    } : undefined;

    // External links
    const propurl = str(attrs['propurl']);
    const taxmaplink = str(attrs['taxmaplink']);
    const taxinfo = str(attrs['taxinfo']);
    const links = (propurl || taxmaplink || taxinfo) ? {
      property_details: propurl,
      tax_map: taxmaplink,
      tax_info: taxinfo,
    } : undefined;

    // Build result
    const result: ParcelResult = {
      success: true,
      parcel: {
        apn: formattedAPN,
        situs_address: str(attrs['p_address']) || '',
        city: str(attrs['sitecity']) || str(attrs['tac_city']) || '',
        acreage: Math.round(acreage * 1000) / 1000,
        lot_sqft: Math.round(lotsize),
        use_code: str(attrs['usecode']),
        use_description: str(attrs['use_desc']),
        subdivision: str(attrs['subdiv']),
        zoning,
      },
      building,
      assessment: {
        roll_year: num(attrs['rollyear']),
        land_value: Number(attrs['valland'] || 0),
        improvement_value: Number(attrs['valimp'] || 0),
        trees_vines_value: num(attrs['valtv']),
        equipment_value: num(attrs['valfme']),
        total_value: Number(attrs['valland'] || 0) + Number(attrs['valimp'] || 0) +
                     Number(attrs['valtv'] || 0) + Number(attrs['valfme'] || 0),
        tax_rate_area: num(attrs['tac']),
        tax_city: str(attrs['tac_city']),
      },
      williamson_act: williamsonAct,
      flags,
      links,
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
