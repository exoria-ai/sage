/**
 * ArcGIS REST API Service
 *
 * Client for querying Solano County GIS and other ArcGIS services.
 */

import axios, { type AxiosInstance } from 'axios';
import {
  SOLANO_AGOL_BASE,
  FEMA_FLOOD_SERVICE,
  CALFIRE_FHSZ_SERVICE,
  TIMEOUTS,
} from '@/lib/config';

// Re-export endpoints for backwards compatibility
// TODO: Update consumers to import from @/lib/config directly
export const ENDPOINTS = {
  SOLANO_AGOL: SOLANO_AGOL_BASE,
  SOLANO_SERVER: 'https://solanocountygis.com/server/rest/services',
  FEMA_NFHL: FEMA_FLOOD_SERVICE,
  CALFIRE_FHSZ: CALFIRE_FHSZ_SERVICE,
} as const;

// Layer paths for Solano County services
export const LAYERS = {
  ADDRESS_POINTS: 'Address_Points/FeatureServer/0',
  PARCELS: 'Parcels_Public_Aumentum/FeatureServer/0',
  ZONING_COUNTY: 'SolanoCountyZoning_092322/FeatureServer/4',
  CITY_BOUNDARIES: 'CityBoundary/FeatureServer/2',
  BOS_DISTRICTS: 'BOS_District_Boundaries_2021/FeatureServer/0',
} as const;

interface QueryParams {
  where?: string;
  geometry?: string;
  geometryType?: 'esriGeometryPoint' | 'esriGeometryPolygon' | 'esriGeometryEnvelope';
  spatialRel?: 'esriSpatialRelIntersects' | 'esriSpatialRelContains' | 'esriSpatialRelWithin';
  inSR?: string;
  outFields?: string;
  returnGeometry?: boolean;
  f?: 'json' | 'geojson';
  outSR?: string;
}

export interface ArcGISFeature {
  attributes: Record<string, unknown>;
  geometry?: {
    x?: number;
    y?: number;
    rings?: number[][][];
    paths?: number[][][];
  };
}

interface ArcGISQueryResponse {
  features: ArcGISFeature[];
  exceededTransferLimit?: boolean;
  error?: {
    code: number;
    message: string;
  };
}

export class ArcGISClient {
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: TIMEOUTS.default,
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  /**
   * Query a feature layer
   */
  async query(layerPath: string, params: QueryParams): Promise<ArcGISQueryResponse> {
    // Build query string manually to handle JSON geometry properly
    const queryParts: string[] = [];

    queryParts.push(`where=${encodeURIComponent(params.where ?? '1=1')}`);

    if (params.geometry) {
      queryParts.push(`geometry=${encodeURIComponent(params.geometry)}`);
    }
    if (params.geometryType) {
      queryParts.push(`geometryType=${params.geometryType}`);
    }
    queryParts.push(`spatialRel=${params.spatialRel ?? 'esriSpatialRelIntersects'}`);
    queryParts.push(`inSR=${params.inSR ?? '4326'}`);
    queryParts.push(`outFields=${encodeURIComponent(params.outFields ?? '*')}`);
    queryParts.push(`returnGeometry=${params.returnGeometry ?? true}`);
    queryParts.push(`f=${params.f ?? 'json'}`);
    queryParts.push(`outSR=${params.outSR ?? '4326'}`);

    const queryString = queryParts.join('&');
    const response = await this.client.get<ArcGISQueryResponse>(
      `${layerPath}/query?${queryString}`
    );

    if (response.data.error) {
      throw new Error(`ArcGIS Error: ${response.data.error.message}`);
    }

    return response.data;
  }

  /**
   * Query by point location
   */
  async queryByPoint(
    layerPath: string,
    latitude: number,
    longitude: number,
    outFields = '*'
  ): Promise<ArcGISFeature[]> {
    const geometry = JSON.stringify({
      x: longitude,
      y: latitude,
      spatialReference: { wkid: 4326 },
    });

    const response = await this.query(layerPath, {
      geometry,
      geometryType: 'esriGeometryPoint',
      spatialRel: 'esriSpatialRelIntersects',
      outFields,
    });

    return response.features;
  }

  /**
   * Query by attribute
   */
  async queryByAttribute(
    layerPath: string,
    whereClause: string,
    outFields = '*'
  ): Promise<ArcGISFeature[]> {
    const response = await this.query(layerPath, {
      where: whereClause,
      outFields,
    });

    return response.features;
  }
}

// Pre-configured clients for common services
export const solanoClient = new ArcGISClient(ENDPOINTS.SOLANO_AGOL);
export const femaClient = new ArcGISClient(ENDPOINTS.FEMA_NFHL);
export const calFireClient = new ArcGISClient(ENDPOINTS.CALFIRE_FHSZ);
