/**
 * Get Zoning Tool
 *
 * Queries zoning designation with automatic jurisdiction routing.
 * Determines if location is in a city or unincorporated county,
 * then queries the appropriate zoning layer.
 */

import { solanoClient, LAYERS, ENDPOINTS } from '../services/arcgis.js';
import { ArcGISClient } from '../services/arcgis.js';
import { parseAPN } from '../utils/apn.js';

// City zoning layer endpoints - layer IDs verified against live services
const CITY_ZONING_LAYERS: Record<string, { baseUrl: string; layer: string }> = {
  'FAIRFIELD': {
    baseUrl: ENDPOINTS.SOLANO_AGOL,
    layer: 'City_of_Fairfield_Zoning/FeatureServer/3',  // Layer ID is 3
  },
  'VACAVILLE': {
    baseUrl: ENDPOINTS.SOLANO_AGOL,
    layer: 'City_of_Vacaville_Zoning/FeatureServer/0',
  },
  'VALLEJO': {
    baseUrl: ENDPOINTS.SOLANO_AGOL,
    layer: 'Vallejo_Zoning/FeatureServer/0',
  },
  'BENICIA': {
    baseUrl: ENDPOINTS.SOLANO_AGOL,
    layer: 'Benicia_Zoning/FeatureServer/0',
  },
  'DIXON': {
    baseUrl: ENDPOINTS.SOLANO_AGOL,
    layer: 'City_of_Dixon_Zoning/FeatureServer/0',
  },
  'SUISUN CITY': {
    baseUrl: ENDPOINTS.SOLANO_AGOL,
    layer: 'Suisun_City_Zoning/FeatureServer/0',
  },
  'RIO VISTA': {
    baseUrl: ENDPOINTS.SOLANO_AGOL,
    layer: 'City_of_Rio_Vista_Zoning/FeatureServer/0',
  },
};

interface ZoningResult {
  success: boolean;
  zoning?: {
    code: string;
    description: string;
    jurisdiction: string;
    jurisdiction_type: 'city' | 'county';
    permitted_uses_summary?: string;
    zoning_code_link?: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  error_type?: string;
  message?: string;
  suggestion?: string;
  notes?: string[];
}

interface CityBoundaryResult {
  inCity: boolean;
  cityName?: string;
}

/**
 * Check if coordinates fall within a city boundary
 */
async function checkCityBoundary(latitude: number, longitude: number): Promise<CityBoundaryResult> {
  try {
    // Field is 'name' (lowercase) according to SOLANO_GIS_LAYERS.md
    const features = await solanoClient.queryByPoint(
      LAYERS.CITY_BOUNDARIES,
      latitude,
      longitude,
      'name'
    );

    if (features.length > 0) {
      const attrs = features[0]!.attributes;
      const cityName = String(attrs['name'] || '').toUpperCase();
      return { inCity: true, cityName };
    }

    return { inCity: false };
  } catch (error) {
    // If city boundary check fails, assume unincorporated
    console.error('City boundary check failed:', error);
    return { inCity: false };
  }
}

/**
 * Get coordinates from APN
 */
async function getCoordinatesFromAPN(apn: string): Promise<{ latitude: number; longitude: number } | null> {
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

export async function getZoning(args: {
  apn?: string;
  latitude?: number;
  longitude?: number;
}): Promise<ZoningResult> {
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
          suggestion: 'APN should be 9 digits, optionally with dashes',
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

    // Check jurisdiction
    const cityCheck = await checkCityBoundary(lat, lon);
    const notes: string[] = [];

    let zoningCode: string | undefined;
    let zoningDesc: string | undefined;
    let jurisdiction: string;
    let jurisdictionType: 'city' | 'county';
    let zoningCodeLink: string | undefined;

    if (cityCheck.inCity && cityCheck.cityName) {
      // Query city zoning layer
      jurisdiction = cityCheck.cityName;
      jurisdictionType = 'city';

      const cityConfig = CITY_ZONING_LAYERS[cityCheck.cityName];

      if (cityConfig) {
        try {
          const cityClient = new ArcGISClient(cityConfig.baseUrl);
          const features = await cityClient.queryByPoint(
            cityConfig.layer,
            lat,
            lon,
            '*'
          );

          if (features.length > 0) {
            const attrs = features[0]!.attributes;
            // Different cities use different field names - try common variations
            // Fairfield uses 'zonedesc', county uses 'zone_abrev' and 'zone_name'
            zoningCode = String(
              attrs['zonedesc'] || attrs['ZONEDESC'] ||
              attrs['zone_abrev'] || attrs['ZONE_ABREV'] ||
              attrs['ZONING'] || attrs['ZONE'] ||
              'Unknown'
            );
            zoningDesc = String(
              attrs['zonedesc'] || attrs['ZONEDESC'] ||
              attrs['zone_name'] || attrs['ZONE_NAME'] ||
              attrs['LU_Category'] || attrs['DESCRIPTION'] ||
              zoningCode
            );
          }
        } catch (cityError) {
          notes.push(`Could not query ${cityCheck.cityName} zoning layer directly. Trying county layer.`);
        }
      }

      // If city layer failed or doesn't exist, try county layer
      if (!zoningCode || zoningCode === 'Unknown') {
        const features = await solanoClient.queryByPoint(
          LAYERS.ZONING_COUNTY,
          lat,
          lon,
          '*'
        );

        if (features.length > 0) {
          const attrs = features[0]!.attributes;
          // County layer uses 'zone_abrev' and 'zone_name' according to SOLANO_GIS_LAYERS.md
          zoningCode = String(attrs['zone_abrev'] || attrs['ZONE_ABREV'] || attrs['ZONING'] || 'Unknown');
          zoningDesc = String(attrs['zone_name'] || attrs['ZONE_NAME'] || attrs['DESCRIPTION'] || zoningCode);
          notes.push('Zoning from county layer - verify with city for authoritative information.');
        }
      }

      // Set link to city zoning code
      const cityLinks: Record<string, string> = {
        'FAIRFIELD': 'https://www.codepublishing.com/CA/Fairfield/',
        'VACAVILLE': 'https://www.codepublishing.com/CA/Vacaville/',
        'VALLEJO': 'https://library.municode.com/ca/vallejo',
        'BENICIA': 'https://www.codepublishing.com/CA/Benicia/',
        'DIXON': 'https://www.codepublishing.com/CA/Dixon/',
        'SUISUN CITY': 'https://www.codepublishing.com/CA/SuisunCity/',
        'RIO VISTA': 'https://www.codepublishing.com/CA/RioVista/',
      };
      zoningCodeLink = cityLinks[cityCheck.cityName];

    } else {
      // Query county zoning layer
      jurisdiction = 'Unincorporated Solano County';
      jurisdictionType = 'county';

      const features = await solanoClient.queryByPoint(
        LAYERS.ZONING_COUNTY,
        lat,
        lon,
        '*'
      );

      if (features.length > 0) {
        const attrs = features[0]!.attributes;
        zoningCode = String(attrs['ZONING'] || attrs['ZONE'] || attrs['ZONE_CODE'] || 'Unknown');
        zoningDesc = String(attrs['ZONE_DESC'] || attrs['DESCRIPTION'] || attrs['ZONE_NAME'] || '');
      }

      zoningCodeLink = 'https://www.solanocounty.com/depts/rm/planning/default.asp';
    }

    if (!zoningCode) {
      return {
        success: false,
        error_type: 'NO_ZONING_DATA',
        message: `No zoning data found for location in ${jurisdiction}`,
        suggestion: `Contact ${jurisdictionType === 'city' ? jurisdiction + ' Planning Department' : 'Solano County Resource Management'} for zoning information.`,
        notes: notes.length > 0 ? notes : undefined,
      };
    }

    // Add note about mailing address vs jurisdiction
    notes.push('Note: Mailing address city may differ from legal jurisdiction. This zoning is based on actual location within mapped boundaries.');

    return {
      success: true,
      zoning: {
        code: zoningCode,
        description: zoningDesc || zoningCode,
        jurisdiction,
        jurisdiction_type: jurisdictionType,
        permitted_uses_summary: getZoningSummary(zoningCode),
        zoning_code_link: zoningCodeLink,
      },
      location: {
        latitude: lat,
        longitude: lon,
      },
      notes,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to retrieve zoning: ${errorMessage}`,
      suggestion: 'The GIS service may be temporarily unavailable. Try again in a few moments.',
    };
  }
}

/**
 * Provide a brief summary of common zoning codes
 */
function getZoningSummary(code: string): string {
  const upperCode = code.toUpperCase();

  // Residential
  if (upperCode.startsWith('R-1') || upperCode === 'RS') {
    return 'Single-family residential';
  }
  if (upperCode.startsWith('R-2') || upperCode.startsWith('RD')) {
    return 'Two-family/duplex residential';
  }
  if (upperCode.startsWith('R-3') || upperCode.startsWith('RM')) {
    return 'Multi-family residential';
  }
  if (upperCode.startsWith('R-4') || upperCode.startsWith('RH')) {
    return 'High-density residential';
  }

  // Agricultural
  if (upperCode.startsWith('A-') || upperCode === 'AG' || upperCode.startsWith('AL')) {
    return 'Agricultural use';
  }
  if (upperCode.includes('40') && upperCode.startsWith('A')) {
    return 'Agricultural, 40-acre minimum lot size';
  }
  if (upperCode.includes('20') && upperCode.startsWith('A')) {
    return 'Agricultural, 20-acre minimum lot size';
  }

  // Commercial
  if (upperCode.startsWith('C-1') || upperCode === 'CN') {
    return 'Neighborhood commercial';
  }
  if (upperCode.startsWith('C-2') || upperCode === 'CG') {
    return 'General commercial';
  }
  if (upperCode.startsWith('C-3') || upperCode === 'CS') {
    return 'Service commercial';
  }

  // Industrial
  if (upperCode.startsWith('M-1') || upperCode === 'IL') {
    return 'Light industrial';
  }
  if (upperCode.startsWith('M-2') || upperCode === 'IG' || upperCode === 'IH') {
    return 'General/heavy industrial';
  }

  // Special
  if (upperCode.includes('PD') || upperCode.includes('PLANNED')) {
    return 'Planned development - see specific plan';
  }
  if (upperCode.includes('OS') || upperCode.includes('OPEN')) {
    return 'Open space';
  }
  if (upperCode.includes('PF') || upperCode.includes('PUBLIC')) {
    return 'Public facilities';
  }

  return 'See zoning code for permitted uses';
}
