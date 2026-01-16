/**
 * ArcGIS REST API Service
 *
 * Client for querying Solano County GIS and other ArcGIS services.
 */

import axios, { type AxiosInstance } from 'axios';

// Solano County ArcGIS endpoints
export const ENDPOINTS = {
  // Solano County ArcGIS Online
  SOLANO_AGOL: 'https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services',

  // Solano County ArcGIS Server
  SOLANO_SERVER: 'https://solanocountygis.com/server/rest/services',

  // FEMA National Flood Hazard Layer
  FEMA_NFHL: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer',

  // CAL FIRE Fire Hazard Severity Zones
  CALFIRE_FHSZ: 'https://services.gis.ca.gov/arcgis/rest/services/Environment/Fire_Severity_Zones/MapServer',
} as const;

// Layer IDs for Solano County services
export const LAYERS = {
  ADDRESS_POINTS: 'Address_Points/FeatureServer/0',
  PARCELS: 'Parcels_Public_Aumentum/FeatureServer/0',
  ZONING_COUNTY: 'Zoning/FeatureServer/0',
  CITY_BOUNDARIES: 'City_Boundaries/FeatureServer/0',
  BOS_DISTRICTS: 'BOS_Districts/FeatureServer/0',
} as const;

interface QueryParams {
  where?: string;
  geometry?: string;
  geometryType?: 'esriGeometryPoint' | 'esriGeometryPolygon' | 'esriGeometryEnvelope';
  spatialRel?: 'esriSpatialRelIntersects' | 'esriSpatialRelContains' | 'esriSpatialRelWithin';
  outFields?: string;
  returnGeometry?: boolean;
  f?: 'json' | 'geojson';
  outSR?: string;
}

interface ArcGISFeature {
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
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 30000,
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  /**
   * Query a feature layer
   */
  async query(layerPath: string, params: QueryParams): Promise<ArcGISQueryResponse> {
    const queryParams = {
      where: params.where ?? '1=1',
      geometry: params.geometry,
      geometryType: params.geometryType,
      spatialRel: params.spatialRel ?? 'esriSpatialRelIntersects',
      outFields: params.outFields ?? '*',
      returnGeometry: params.returnGeometry ?? true,
      f: params.f ?? 'json',
      outSR: params.outSR ?? '4326', // WGS84
    };

    const response = await this.client.get<ArcGISQueryResponse>(
      `${layerPath}/query`,
      { params: queryParams }
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
