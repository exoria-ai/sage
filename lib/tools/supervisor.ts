/**
 * Get Supervisor District Tool
 *
 * Queries Solano County Board of Supervisors district information.
 */

import { solanoClient, LAYERS } from '@/lib/services/arcgis';
import { parseAPN } from '@/lib/utils/apn';
import { getCoordinatesFromAPN } from '@/lib/utils/parcel-lookup';

interface SupervisorResult {
  success: boolean;
  district?: {
    number: number;
    supervisor: string;
    email?: string;
    phone?: string;
    office_address?: string;
  };
  context?: {
    description: string;
    note: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  error_type?: string;
  message?: string;
  suggestion?: string;
}

// Current supervisor information (as of 2024 - should be kept updated)
const SUPERVISOR_INFO: Record<number, {
  name: string;
  email: string;
  phone: string;
  office: string;
}> = {
  1: {
    name: 'District 1 Supervisor', // Update with actual name
    email: 'district1@solanocounty.com',
    phone: '(707) 784-6100',
    office: '675 Texas Street, Suite 6500, Fairfield, CA 94533',
  },
  2: {
    name: 'District 2 Supervisor', // Update with actual name
    email: 'district2@solanocounty.com',
    phone: '(707) 784-6200',
    office: '675 Texas Street, Suite 6500, Fairfield, CA 94533',
  },
  3: {
    name: 'District 3 Supervisor', // Update with actual name
    email: 'district3@solanocounty.com',
    phone: '(707) 784-6300',
    office: '675 Texas Street, Suite 6500, Fairfield, CA 94533',
  },
  4: {
    name: 'District 4 Supervisor', // Update with actual name
    email: 'district4@solanocounty.com',
    phone: '(707) 784-6400',
    office: '675 Texas Street, Suite 6500, Fairfield, CA 94533',
  },
  5: {
    name: 'District 5 Supervisor', // Update with actual name
    email: 'district5@solanocounty.com',
    phone: '(707) 784-6500',
    office: '675 Texas Street, Suite 6500, Fairfield, CA 94533',
  },
};

export async function getSupervisorDistrict(args: {
  apn?: string;
  latitude?: number;
  longitude?: number;
}): Promise<SupervisorResult> {
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

    // Query BOS Districts layer
    const features = await solanoClient.queryByPoint(
      LAYERS.BOS_DISTRICTS,
      lat,
      lon,
      '*'
    );

    if (features.length === 0) {
      return {
        success: false,
        error_type: 'NO_DATA',
        message: 'No supervisor district found for this location',
        suggestion: 'Location may be outside Solano County boundaries or in an unmapped area.',
        location: { latitude: lat, longitude: lon },
      };
    }

    const feature = features[0]!;
    const attrs = feature.attributes;

    // Extract district number (field is 'district' according to SOLANO_GIS_LAYERS.md)
    const districtNum = Number(
      attrs['district'] ||
      attrs['DISTRICT'] ||
      attrs['DIST'] ||
      0
    );

    if (districtNum < 1 || districtNum > 5) {
      return {
        success: false,
        error_type: 'INVALID_DISTRICT',
        message: `Invalid district number returned: ${districtNum}`,
        suggestion: 'Contact Solano County for assistance.',
        location: { latitude: lat, longitude: lon },
      };
    }

    // Get supervisor info
    const info = SUPERVISOR_INFO[districtNum];

    // Try to get supervisor name from GIS data first (field is 'name' according to SOLANO_GIS_LAYERS.md)
    const supervisorName = String(
      attrs['name'] ||
      attrs['NAME'] ||
      attrs['SUPERVISOR_NAME'] ||
      info?.name ||
      `District ${districtNum} Supervisor`
    );

    return {
      success: true,
      district: {
        number: districtNum,
        supervisor: supervisorName,
        email: info?.email,
        phone: info?.phone,
        office_address: info?.office,
      },
      context: {
        description: 'The Solano County Board of Supervisors is the governing body for unincorporated areas and county-wide services. Each of the 5 supervisors represents a geographic district.',
        note: 'For issues within incorporated cities (Benicia, Dixon, Fairfield, Rio Vista, Suisun City, Vacaville, Vallejo), contact the respective City Council. The Board of Supervisors handles county-level matters and unincorporated areas.',
      },
      location: { latitude: lat, longitude: lon },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to retrieve supervisor district: ${errorMessage}`,
      suggestion: 'The GIS service may be temporarily unavailable. Try again in a few moments.',
    };
  }
}
