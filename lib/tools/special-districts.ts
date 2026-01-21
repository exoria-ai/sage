/**
 * Get Special Districts Tool
 *
 * Returns all special districts covering a location:
 * fire, water, sewer, school, garbage, etc.
 */

import { solanoClient, ENDPOINTS, LAYERS } from '@/lib/services/arcgis';
import { parseAPN } from '@/lib/utils/apn';
import { getCoordinatesFromAPN } from '@/lib/utils/parcel-lookup';

// Additional district layers from SOLANO_GIS_LAYERS.md
const DISTRICT_LAYERS = {
  WATER: 'Water_Districts/FeatureServer/0',
  GARBAGE: 'Garbage_Service_Areas/FeatureServer/0',
  FIRE_RESPONSE: 'FireResponse_Boundary/FeatureServer/0',
  CEMETERY: 'Cemetery_Districts/FeatureServer/0',
  RECLAMATION: 'Reclamation_Districts_LMA_Flood_Protection/FeatureServer/0',
  GSA: 'GSA_Boundaries_Solano/FeatureServer/0',
} as const;

interface DistrictInfo {
  type: string;
  name: string;
  code?: string;
  description?: string;
  contact?: string;
}

interface SpecialDistrictsResult {
  success: boolean;
  location?: {
    apn?: string;
    latitude: number;
    longitude: number;
  };
  districts?: {
    fire?: DistrictInfo;
    water?: DistrictInfo;
    sewer?: DistrictInfo;
    garbage?: DistrictInfo;
    school?: DistrictInfo;
    supervisor?: DistrictInfo;
    cemetery?: DistrictInfo;
    reclamation?: DistrictInfo;
    groundwater?: DistrictInfo;
  };
  summary?: string;
  error_type?: string;
  message?: string;
  suggestion?: string;
}

/**
 * Query a district layer by point
 */
async function queryDistrictLayer(
  layerPath: string,
  lat: number,
  lon: number,
  nameField: string,
  codeField?: string
): Promise<{ name: string; code?: string } | null> {
  try {
    const features = await solanoClient.queryByPoint(layerPath, lat, lon, '*');
    if (features.length === 0) return null;

    const feature = features[0];
    if (!feature) return null;

    const attrs = feature.attributes;
    return {
      name: String(attrs[nameField] ?? 'Unknown'),
      code: codeField ? String(attrs[codeField] ?? '') : undefined,
    };
  } catch {
    // Layer might not exist or be accessible
    return null;
  }
}

/**
 * Get districts from parcel layer attributes (already has some district info)
 */
async function getParcelDistricts(
  apn: string
): Promise<{
  fire?: DistrictInfo;
  water?: DistrictInfo;
  school?: DistrictInfo;
} | null> {
  const parsed = parseAPN(apn);
  if (!parsed) return null;

  // parcelid field uses no dashes (numeric format)
  const features = await solanoClient.queryByAttribute(
    LAYERS.PARCELS,
    `parcelid = '${parsed.numeric}'`,
    'fund_fire,desc_fire,fund_water,desc_water,f_school,d_school'
  );

  if (features.length === 0) return null;

  const feature = features[0];
  if (!feature) return null;

  const attrs = feature.attributes;
  const result: {
    fire?: DistrictInfo;
    water?: DistrictInfo;
    school?: DistrictInfo;
  } = {};

  if (attrs.desc_fire) {
    result.fire = {
      type: 'Fire District',
      name: String(attrs.desc_fire),
      code: String(attrs.fund_fire ?? ''),
    };
  }

  if (attrs.desc_water) {
    result.water = {
      type: 'Water District',
      name: String(attrs.desc_water),
      code: String(attrs.fund_water ?? ''),
    };
  }

  if (attrs.d_school) {
    result.school = {
      type: 'School District',
      name: String(attrs.d_school),
      code: String(attrs.f_school ?? ''),
    };
  }

  return result;
}

/**
 * Get all special districts for a location
 */
export async function getSpecialDistricts(args: {
  apn?: string;
  latitude?: number;
  longitude?: number;
}): Promise<SpecialDistrictsResult> {
  const { apn, latitude, longitude } = args;

  // Need either APN or coordinates
  if (!apn && (latitude === undefined || longitude === undefined)) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Either APN or coordinates (latitude/longitude) required',
      suggestion: 'Provide an APN like "0030-251-020" or lat/lon coordinates',
    };
  }

  let lat: number;
  let lon: number;
  let resolvedAPN: string | undefined;

  // Get coordinates
  if (apn) {
    const coords = await getCoordinatesFromAPN(apn);
    if (!coords) {
      return {
        success: false,
        error_type: 'APN_NOT_FOUND',
        message: `Could not find parcel with APN "${apn}"`,
        suggestion: 'Verify the APN format (XXX-XXX-XXX) or use coordinates instead',
      };
    }
    lat = coords.latitude;
    lon = coords.longitude;
    resolvedAPN = apn;
  } else {
    lat = latitude!;
    lon = longitude!;
  }

  try {
    // Query all district layers in parallel
    const [
      parcelDistricts,
      supervisorResult,
      garbageResult,
      waterResult,
      fireResponseResult,
      cemeteryResult,
      reclamationResult,
      gsaResult,
    ] = await Promise.all([
      resolvedAPN ? getParcelDistricts(resolvedAPN) : Promise.resolve(null),
      queryDistrictLayer(LAYERS.BOS_DISTRICTS, lat, lon, 'name', 'district'),
      queryDistrictLayer(DISTRICT_LAYERS.GARBAGE, lat, lon, 'service_pr'),  // Field: service_pr
      queryDistrictLayer(DISTRICT_LAYERS.WATER, lat, lon, 'Name'),
      queryDistrictLayer(DISTRICT_LAYERS.FIRE_RESPONSE, lat, lon, 'dispname'),  // Field: dispname
      queryDistrictLayer(DISTRICT_LAYERS.CEMETERY, lat, lon, 'cemetery_d'),  // Field: cemetery_d
      queryDistrictLayer(DISTRICT_LAYERS.RECLAMATION, lat, lon, 'Name'),
      queryDistrictLayer(DISTRICT_LAYERS.GSA, lat, lon, 'GSA_Name'),
    ]);

    const districts: SpecialDistrictsResult['districts'] = {};

    // Fire district - prefer parcel layer, fallback to fire response
    if (parcelDistricts?.fire) {
      districts.fire = parcelDistricts.fire;
    } else if (fireResponseResult) {
      districts.fire = {
        type: 'Fire Response Area',
        name: fireResponseResult.name,
      };
    }

    // Water district - prefer parcel layer, fallback to water districts layer
    if (parcelDistricts?.water) {
      districts.water = parcelDistricts.water;
    } else if (waterResult) {
      districts.water = {
        type: 'Water District',
        name: waterResult.name,
      };
    }

    // School district from parcel
    if (parcelDistricts?.school) {
      districts.school = parcelDistricts.school;
    }

    // Supervisor district
    if (supervisorResult) {
      districts.supervisor = {
        type: 'Board of Supervisors District',
        name: `District ${supervisorResult.code} - ${supervisorResult.name}`,
        code: supervisorResult.code,
      };
    }

    // Garbage service
    if (garbageResult) {
      districts.garbage = {
        type: 'Garbage Service Area',
        name: garbageResult.name,
      };
    }

    // Cemetery district
    if (cemeteryResult) {
      districts.cemetery = {
        type: 'Cemetery District',
        name: cemeteryResult.name,
      };
    }

    // Reclamation/flood protection
    if (reclamationResult) {
      districts.reclamation = {
        type: 'Reclamation/Flood Protection District',
        name: reclamationResult.name,
      };
    }

    // Groundwater Sustainability Agency
    if (gsaResult) {
      districts.groundwater = {
        type: 'Groundwater Sustainability Agency',
        name: gsaResult.name,
      };
    }

    // Build summary
    const districtNames = Object.values(districts)
      .filter(Boolean)
      .map((d) => d!.type)
      .join(', ');

    return {
      success: true,
      location: {
        apn: resolvedAPN,
        latitude: lat,
        longitude: lon,
      },
      districts,
      summary: `Found ${Object.keys(districts).length} districts: ${districtNames}`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to query districts: ${errorMessage}`,
      suggestion: 'Try again or verify the location',
    };
  }
}
