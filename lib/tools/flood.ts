/**
 * Get Flood Zone Tool
 *
 * Queries FEMA National Flood Hazard Layer (NFHL) for flood zone designation.
 */

import { femaClient } from '@/lib/services/arcgis';
import { parseAPN } from '@/lib/utils/apn';
import { getCoordinatesFromAPN } from '@/lib/utils/parcel-lookup';

// FEMA NFHL layer for flood zones
const NFHL_FLOOD_ZONES_LAYER = '28'; // S_FLD_HAZ_AR layer

interface FloodZoneResult {
  success: boolean;
  flood_zone?: {
    zone: string;
    zone_subtype?: string;
    description: string;
    risk_level: 'High' | 'Moderate' | 'Low' | 'Undetermined';
    sfha: boolean; // Special Flood Hazard Area
    base_flood_elevation?: number;
    bfe_unit?: string;
    static_bfe?: number;
  };
  insurance?: {
    required_for_mortgage: boolean;
    recommendation: string;
    notes: string;
  };
  fema_info?: {
    panel_number?: string;
    effective_date?: string;
    community?: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  error_type?: string;
  message?: string;
  suggestion?: string;
}

/**
 * Get flood zone description and risk level
 */
function getFloodZoneInfo(zone: string): {
  description: string;
  risk_level: 'High' | 'Moderate' | 'Low' | 'Undetermined';
  sfha: boolean;
  insurance_required: boolean;
  recommendation: string;
  notes: string;
} {
  const upperZone = zone.toUpperCase().trim();

  // High-risk zones (SFHA)
  if (upperZone === 'A' || upperZone.startsWith('A ')) {
    return {
      description: '1% annual chance flood (100-year), no Base Flood Elevation determined',
      risk_level: 'High',
      sfha: true,
      insurance_required: true,
      recommendation: 'Flood insurance required for federally-backed mortgages',
      notes: 'BFE must be determined by engineer or community for building permits',
    };
  }

  if (upperZone === 'AE' || upperZone.startsWith('AE ')) {
    return {
      description: '1% annual chance flood (100-year) with Base Flood Elevation determined',
      risk_level: 'High',
      sfha: true,
      insurance_required: true,
      recommendation: 'Flood insurance required for federally-backed mortgages',
      notes: 'New construction must elevate lowest floor to or above BFE',
    };
  }

  if (upperZone === 'AH') {
    return {
      description: '1% annual chance of shallow flooding (1-3 feet), ponding',
      risk_level: 'High',
      sfha: true,
      insurance_required: true,
      recommendation: 'Flood insurance required for federally-backed mortgages',
      notes: 'Areas of ponding with flood depths of 1 to 3 feet',
    };
  }

  if (upperZone === 'AO') {
    return {
      description: '1% annual chance of shallow flooding, sheet flow (1-3 feet)',
      risk_level: 'High',
      sfha: true,
      insurance_required: true,
      recommendation: 'Flood insurance required for federally-backed mortgages',
      notes: 'Areas of sheet flow flooding with depths of 1 to 3 feet',
    };
  }

  if (upperZone === 'AR') {
    return {
      description: 'Special flood hazard area due to levee system being restored',
      risk_level: 'High',
      sfha: true,
      insurance_required: true,
      recommendation: 'Flood insurance required; levee restoration in progress',
      notes: 'Area protected by levee system under restoration to provide 100-year protection',
    };
  }

  if (upperZone.startsWith('V') || upperZone === 'VE') {
    return {
      description: 'Coastal high hazard area with velocity (wave action)',
      risk_level: 'High',
      sfha: true,
      insurance_required: true,
      recommendation: 'Flood insurance required; strictest building requirements',
      notes: 'Coastal areas with wave action - requires elevated construction on pilings',
    };
  }

  // Moderate-risk zones
  if (upperZone === 'X' && zone.includes('SHADED')) {
    return {
      description: '0.2% annual chance flood (500-year) or 1% with average depth less than 1 foot',
      risk_level: 'Moderate',
      sfha: false,
      insurance_required: false,
      recommendation: 'Flood insurance recommended but not required',
      notes: 'Moderate flood risk - about 25% of flood claims come from this zone',
    };
  }

  if (upperZone === 'B') {
    return {
      description: '0.2% annual chance flood (500-year) - older map designation',
      risk_level: 'Moderate',
      sfha: false,
      insurance_required: false,
      recommendation: 'Flood insurance recommended but not required',
      notes: 'Zone B is an older designation equivalent to shaded Zone X',
    };
  }

  // Low-risk zones
  if (upperZone === 'X' || upperZone === 'X (UNSHADED)') {
    return {
      description: 'Minimal flood hazard - outside 500-year floodplain',
      risk_level: 'Low',
      sfha: false,
      insurance_required: false,
      recommendation: 'Flood insurance available at lower preferred rates',
      notes: 'Low risk but not no risk - flooding can occur anywhere',
    };
  }

  if (upperZone === 'C') {
    return {
      description: 'Minimal flood hazard - older map designation',
      risk_level: 'Low',
      sfha: false,
      insurance_required: false,
      recommendation: 'Flood insurance available at lower preferred rates',
      notes: 'Zone C is an older designation equivalent to unshaded Zone X',
    };
  }

  // Undetermined
  if (upperZone === 'D') {
    return {
      description: 'Flood hazard undetermined - no analysis performed',
      risk_level: 'Undetermined',
      sfha: false,
      insurance_required: false,
      recommendation: 'Flood insurance available; recommend obtaining flood study',
      notes: 'No detailed flood study has been performed for this area',
    };
  }

  // Default
  return {
    description: `Flood zone ${zone} - consult FEMA maps for details`,
    risk_level: 'Undetermined',
    sfha: upperZone.startsWith('A') || upperZone.startsWith('V'),
    insurance_required: upperZone.startsWith('A') || upperZone.startsWith('V'),
    recommendation: 'Contact local floodplain administrator for determination',
    notes: 'Zone designation may have special characteristics',
  };
}

export async function getFloodZone(args: {
  apn?: string;
  latitude?: number;
  longitude?: number;
}): Promise<FloodZoneResult> {
  const { apn, latitude, longitude } = args;

  // Validate input
  if (!apn && (latitude === undefined || longitude === undefined)) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Either APN or coordinates (latitude/longitude) are required',
      suggestion: 'Provide an APN or both latitude and longitude',
    };
  }

  try {
    // Get coordinates
    let lat: number;
    let lon: number;

    if (latitude !== undefined && longitude !== undefined) {
      lat = latitude;
      lon = longitude;
    } else if (apn) {
      const parsed = parseAPN(apn);
      if (!parsed) {
        return {
          success: false,
          error_type: 'INVALID_APN',
          message: `Invalid APN format: "${apn}"`,
          suggestion: 'APN should be 9-10 digits (e.g., "003-025-102" or "0030251020")',
        };
      }

      const coords = await getCoordinatesFromAPN(apn);
      if (!coords) {
        return {
          success: false,
          error_type: 'APN_NOT_FOUND',
          message: `Could not find parcel with APN "${apn}"`,
          suggestion: 'Verify the APN or provide coordinates instead',
        };
      }
      lat = coords.latitude;
      lon = coords.longitude;
    } else {
      return {
        success: false,
        error_type: 'INVALID_INPUT',
        message: 'No valid location provided',
        suggestion: 'Provide an APN or coordinates',
      };
    }

    // Query FEMA NFHL
    const features = await femaClient.queryByPoint(
      NFHL_FLOOD_ZONES_LAYER,
      lat,
      lon,
      '*'
    );

    if (features.length === 0) {
      return {
        success: false,
        error_type: 'NO_DATA',
        message: 'No FEMA flood zone data available for this location',
        suggestion: 'Location may be outside mapped areas or in Zone D (undetermined). Contact local floodplain administrator.',
        location: { latitude: lat, longitude: lon },
      };
    }

    const feature = features[0]!;
    const attrs = feature.attributes;

    // Extract flood zone
    const zone = String(attrs['FLD_ZONE'] || attrs['ZONE'] || attrs['SFHA_TF'] || 'Unknown');
    const zoneSubtype = attrs['ZONE_SUBTY'] ? String(attrs['ZONE_SUBTY']) : undefined;

    const zoneInfo = getFloodZoneInfo(zone);

    // Extract BFE if available
    let bfe: number | undefined;
    let staticBfe: number | undefined;
    if (attrs['STATIC_BFE']) {
      staticBfe = Number(attrs['STATIC_BFE']);
    }
    if (attrs['BFE_REVERT']) {
      bfe = Number(attrs['BFE_REVERT']);
    }

    return {
      success: true,
      flood_zone: {
        zone,
        zone_subtype: zoneSubtype,
        description: zoneInfo.description,
        risk_level: zoneInfo.risk_level,
        sfha: zoneInfo.sfha,
        base_flood_elevation: bfe,
        static_bfe: staticBfe,
        bfe_unit: (bfe || staticBfe) ? 'feet NAVD88' : undefined,
      },
      insurance: {
        required_for_mortgage: zoneInfo.insurance_required,
        recommendation: zoneInfo.recommendation,
        notes: zoneInfo.notes,
      },
      fema_info: {
        panel_number: attrs['DFIRM_ID'] ? String(attrs['DFIRM_ID']) : undefined,
        effective_date: attrs['EFF_DATE'] ? String(attrs['EFF_DATE']) : undefined,
        community: attrs['GNIS_NAME'] ? String(attrs['GNIS_NAME']) : undefined,
      },
      location: {
        latitude: lat,
        longitude: lon,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to retrieve flood zone: ${errorMessage}`,
      suggestion: 'The FEMA service may be temporarily unavailable. Try again in a few moments.',
    };
  }
}
