/**
 * Get Fire Hazard Zone Tool
 *
 * Queries CAL FIRE Fire Hazard Severity Zone (FHSZ) designation.
 */

import { calFireClient } from '../services/arcgis.js';
import { parseAPN } from '../utils/apn.js';
import { getCoordinatesFromAPN } from '../utils/parcel-lookup.js';

// CAL FIRE FHSZ layers
// Layer 0: SRA (State Responsibility Area)
// Layer 1: LRA (Local Responsibility Area)
const FHSZ_SRA_LAYER = '0';
const FHSZ_LRA_LAYER = '1';

interface FireHazardResult {
  success: boolean;
  fire_hazard?: {
    severity: 'Moderate' | 'High' | 'Very High' | 'Non-FHSZ' | 'Unknown';
    responsibility_area: 'SRA' | 'LRA' | 'FRA' | 'Unknown';
    responsibility_description: string;
    description: string;
  };
  requirements?: {
    defensible_space: string;
    building_standards: string;
    vegetation_management: string;
    disclosure_required: boolean;
  };
  context?: {
    hazard_vs_risk_note: string;
    additional_info: string;
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
 * Parse FHSZ severity from attribute value
 */
function parseSeverity(value: unknown): 'Moderate' | 'High' | 'Very High' | 'Non-FHSZ' | 'Unknown' {
  if (value === null || value === undefined) return 'Unknown';

  const str = String(value).toUpperCase();

  if (str.includes('VERY HIGH') || str === 'VHFHSZ' || str === '3' || str === 'VERY_HIGH') {
    return 'Very High';
  }
  if (str.includes('HIGH') || str === 'HFHSZ' || str === '2') {
    return 'High';
  }
  if (str.includes('MODERATE') || str === 'MFHSZ' || str === '1') {
    return 'Moderate';
  }
  if (str.includes('NON') || str === 'NON-FHSZ' || str === '0' || str === 'NONE') {
    return 'Non-FHSZ';
  }

  return 'Unknown';
}

/**
 * Get requirements based on severity and responsibility area
 */
function getRequirements(severity: string, responsibilityArea: string): {
  defensible_space: string;
  building_standards: string;
  vegetation_management: string;
  disclosure_required: boolean;
} {
  const inSRA = responsibilityArea === 'SRA';

  if (severity === 'Very High') {
    return {
      defensible_space: '100 feet required (PRC 4291). Zone 0 (0-5ft) must be ember-resistant with no combustible materials.',
      building_standards: 'Chapter 7A building standards required for new construction: Class A roof, enclosed eaves, ember-resistant vents, ignition-resistant exterior.',
      vegetation_management: 'Annual vegetation clearing required. Remove dead plants, debris, and ladder fuels. Maintain defensible space year-round.',
      disclosure_required: true,
    };
  }

  if (severity === 'High') {
    return {
      defensible_space: inSRA
        ? '100 feet required (PRC 4291). Maintain lean, clean, green zones around structures.'
        : '100 feet recommended. Check with local fire district for specific requirements.',
      building_standards: 'Enhanced building standards may apply. Chapter 7A recommended for new construction.',
      vegetation_management: 'Regular vegetation management required. Clear dead vegetation and maintain fuel breaks.',
      disclosure_required: true,
    };
  }

  if (severity === 'Moderate') {
    return {
      defensible_space: inSRA
        ? '100 feet required (PRC 4291). Standard fire-safe landscaping recommended.'
        : '30-100 feet recommended depending on local requirements.',
      building_standards: 'Standard building codes apply. Fire-resistant materials recommended.',
      vegetation_management: 'Maintain clear space around structures. Remove accumulated debris.',
      disclosure_required: inSRA,
    };
  }

  // Non-FHSZ or Unknown
  return {
    defensible_space: 'Local requirements may apply. Check with your fire district.',
    building_standards: 'Standard building codes apply.',
    vegetation_management: 'General fire-safe practices recommended.',
    disclosure_required: false,
  };
}

export async function getFireHazardZone(args: {
  apn?: string;
  latitude?: number;
  longitude?: number;
}): Promise<FireHazardResult> {
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

    // Query both SRA and LRA layers
    let severity: 'Moderate' | 'High' | 'Very High' | 'Non-FHSZ' | 'Unknown' = 'Unknown';
    let responsibilityArea: 'SRA' | 'LRA' | 'FRA' | 'Unknown' = 'Unknown';
    let responsibilityDescription = '';

    // Try SRA layer first
    try {
      const sraFeatures = await calFireClient.queryByPoint(
        FHSZ_SRA_LAYER,
        lat,
        lon,
        '*'
      );

      if (sraFeatures.length > 0) {
        const attrs = sraFeatures[0]!.attributes;
        severity = parseSeverity(attrs['HAZ_CLASS'] || attrs['SRA22_2'] || attrs['HAZ_CODE']);
        responsibilityArea = 'SRA';
        responsibilityDescription = 'State Responsibility Area - CAL FIRE has primary fire protection responsibility';
      }
    } catch (sraError) {
      console.error('SRA query failed:', sraError);
    }

    // If not in SRA, try LRA layer
    if (responsibilityArea === 'Unknown') {
      try {
        const lraFeatures = await calFireClient.queryByPoint(
          FHSZ_LRA_LAYER,
          lat,
          lon,
          '*'
        );

        if (lraFeatures.length > 0) {
          const attrs = lraFeatures[0]!.attributes;
          severity = parseSeverity(attrs['HAZ_CLASS'] || attrs['LRA22_2'] || attrs['HAZ_CODE']);
          responsibilityArea = 'LRA';
          responsibilityDescription = 'Local Responsibility Area - Local fire district has primary fire protection responsibility';
        }
      } catch (lraError) {
        console.error('LRA query failed:', lraError);
      }
    }

    // If still no data, location may be in urban area or FRA
    if (responsibilityArea === 'Unknown') {
      return {
        success: true,
        fire_hazard: {
          severity: 'Non-FHSZ',
          responsibility_area: 'Unknown',
          responsibility_description: 'Location may be in urban area (LRA with no FHSZ) or Federal Responsibility Area',
          description: 'No Fire Hazard Severity Zone designation found for this location',
        },
        requirements: getRequirements('Non-FHSZ', 'Unknown'),
        context: {
          hazard_vs_risk_note: 'Fire Hazard Severity Zones map potential fire behavior (hazard), not probability of fire (risk). Areas without FHSZ designation may still have fire risk.',
          additional_info: 'Check with your local fire district for specific requirements and fire protection services.',
        },
        location: { latitude: lat, longitude: lon },
      };
    }

    const requirements = getRequirements(severity, responsibilityArea);

    // Build severity description
    let severityDescription = '';
    switch (severity) {
      case 'Very High':
        severityDescription = 'Very High Fire Hazard Severity Zone (VHFHSZ) - Extreme fire behavior potential with high intensity, rapid spread, and significant ember production';
        break;
      case 'High':
        severityDescription = 'High Fire Hazard Severity Zone (HFHSZ) - Significant fire behavior potential with moderate to high intensity';
        break;
      case 'Moderate':
        severityDescription = 'Moderate Fire Hazard Severity Zone (MFHSZ) - Lower intensity fire behavior potential';
        break;
      case 'Non-FHSZ':
        severityDescription = 'Not designated as a Fire Hazard Severity Zone';
        break;
      default:
        severityDescription = 'Fire hazard severity could not be determined';
    }

    return {
      success: true,
      fire_hazard: {
        severity,
        responsibility_area: responsibilityArea,
        responsibility_description: responsibilityDescription,
        description: severityDescription,
      },
      requirements,
      context: {
        hazard_vs_risk_note: 'IMPORTANT: Fire Hazard Severity Zones map potential fire BEHAVIOR (hazard) based on terrain, vegetation, and weather - NOT the probability of fire occurring (risk). A remote Very High hazard area may have lower risk than a Moderate hazard area near ignition sources.',
        additional_info: responsibilityArea === 'SRA'
          ? 'In SRA, CAL FIRE provides fire protection. PRC 4291 defensible space requirements are enforced. Contact CAL FIRE or your local fire safe council for assistance.'
          : 'In LRA, your local fire district provides fire protection. Contact them for specific requirements and inspection schedules.',
      },
      location: { latitude: lat, longitude: lon },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to retrieve fire hazard zone: ${errorMessage}`,
      suggestion: 'The CAL FIRE service may be temporarily unavailable. Try again in a few moments.',
    };
  }
}
