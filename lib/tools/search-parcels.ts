/**
 * Search Parcels Tool
 *
 * Search for parcels matching criteria with aggregations.
 * Enables queries like "all agricultural parcels in District 3"
 */

import { solanoClient, LAYERS, ENDPOINTS } from '@/lib/services/arcgis';

interface SearchCriteria {
  zoning?: string;          // e.g., "A-40", "R-1", "C-2"
  use_code?: string;        // Property use code
  use_description?: string; // e.g., "SINGLE FAMILY RESIDENCE"
  min_acres?: number;
  max_acres?: number;
  min_value?: number;       // Total assessed value
  max_value?: number;
  year_built_after?: number;
  year_built_before?: number;
  has_pool?: boolean;
  has_solar?: boolean;
  city?: string;            // e.g., "FAIRFIELD", "VALLEJO"
  supervisor_district?: number; // 1-5
  williamson_act?: boolean;
}

interface SearchResult {
  success: boolean;
  total_count?: number;
  sample_parcels?: Array<{
    apn: string;
    address: string;
    acres: number;
    use_description: string;
    assessed_value: number;
  }>;
  aggregations?: {
    total_acres?: number;
    avg_acres?: number;
    total_value?: number;
    avg_value?: number;
    by_use?: Array<{ use: string; count: number }>;
  };
  where_clause?: string;
  error_type?: string;
  message?: string;
  suggestion?: string;
}

/**
 * Build WHERE clause from search criteria
 */
function buildWhereClause(criteria: SearchCriteria): string {
  const conditions: string[] = [];

  if (criteria.zoning) {
    // Match zone1, zone2, or zone3
    const zone = criteria.zoning.toUpperCase();
    conditions.push(`(zone1 LIKE '%${zone}%' OR zone2 LIKE '%${zone}%' OR zone3 LIKE '%${zone}%')`);
  }

  if (criteria.use_code) {
    conditions.push(`usecode = '${criteria.use_code}'`);
  }

  if (criteria.use_description) {
    conditions.push(`use_desc LIKE '%${criteria.use_description.toUpperCase()}%'`);
  }

  if (criteria.min_acres !== undefined) {
    conditions.push(`acres >= ${criteria.min_acres}`);
  }

  if (criteria.max_acres !== undefined) {
    conditions.push(`acres <= ${criteria.max_acres}`);
  }

  if (criteria.min_value !== undefined) {
    conditions.push(`(valland + valimp) >= ${criteria.min_value}`);
  }

  if (criteria.max_value !== undefined) {
    conditions.push(`(valland + valimp) <= ${criteria.max_value}`);
  }

  if (criteria.year_built_after !== undefined) {
    conditions.push(`yrbuilt >= ${criteria.year_built_after}`);
  }

  if (criteria.year_built_before !== undefined) {
    conditions.push(`yrbuilt <= ${criteria.year_built_before}`);
  }

  if (criteria.has_pool === true) {
    conditions.push(`pool = 'YES'`);
  } else if (criteria.has_pool === false) {
    conditions.push(`(pool IS NULL OR pool = 'NO')`);
  }

  if (criteria.has_solar === true) {
    conditions.push(`solar = 'YES'`);
  } else if (criteria.has_solar === false) {
    conditions.push(`(solar IS NULL OR solar = 'NO')`);
  }

  if (criteria.city) {
    conditions.push(`tac_city LIKE '%${criteria.city.toUpperCase()}%'`);
  }

  if (criteria.williamson_act === true) {
    conditions.push(`wa = 'YES'`);
  } else if (criteria.williamson_act === false) {
    conditions.push(`(wa IS NULL OR wa = 'NO')`);
  }

  // Default to all parcels if no criteria
  return conditions.length > 0 ? conditions.join(' AND ') : '1=1';
}

/**
 * Get count using outStatistics
 */
async function getCount(whereClause: string): Promise<number> {
  const url = `${ENDPOINTS.SOLANO_AGOL}/${LAYERS.PARCELS}/query`;
  const params = new URLSearchParams({
    where: whereClause,
    returnCountOnly: 'true',
    f: 'json',
  });

  const response = await fetch(`${url}?${params.toString()}`);
  const data = await response.json();
  return data.count ?? 0;
}

/**
 * Get aggregations using outStatistics
 */
async function getAggregations(whereClause: string): Promise<SearchResult['aggregations']> {
  const url = `${ENDPOINTS.SOLANO_AGOL}/${LAYERS.PARCELS}/query`;

  // Get sum/avg of acres and values
  const statsParams = new URLSearchParams({
    where: whereClause,
    outStatistics: JSON.stringify([
      { statisticType: 'sum', onStatisticField: 'acres', outStatisticFieldName: 'total_acres' },
      { statisticType: 'avg', onStatisticField: 'acres', outStatisticFieldName: 'avg_acres' },
      { statisticType: 'sum', onStatisticField: 'valland', outStatisticFieldName: 'total_land' },
      { statisticType: 'sum', onStatisticField: 'valimp', outStatisticFieldName: 'total_imp' },
    ]),
    f: 'json',
  });

  const statsResponse = await fetch(`${url}?${statsParams.toString()}`);
  const statsData = await statsResponse.json();

  let totalAcres = 0;
  let avgAcres = 0;
  let totalValue = 0;

  if (statsData.features && statsData.features.length > 0) {
    const attrs = statsData.features[0].attributes;
    totalAcres = attrs.total_acres ?? 0;
    avgAcres = attrs.avg_acres ?? 0;
    totalValue = (attrs.total_land ?? 0) + (attrs.total_imp ?? 0);
  }

  // Get counts by use_desc
  const groupParams = new URLSearchParams({
    where: whereClause,
    groupByFieldsForStatistics: 'use_desc',
    outStatistics: JSON.stringify([
      { statisticType: 'count', onStatisticField: 'parcelid', outStatisticFieldName: 'count' },
    ]),
    orderByFields: 'count DESC',
    f: 'json',
  });

  const groupResponse = await fetch(`${url}?${groupParams.toString()}`);
  const groupData = await groupResponse.json();

  const byUse: Array<{ use: string; count: number }> = [];
  if (groupData.features) {
    for (const feature of groupData.features.slice(0, 10)) {
      // Top 10
      byUse.push({
        use: feature.attributes.use_desc ?? 'Unknown',
        count: feature.attributes.count ?? 0,
      });
    }
  }

  return {
    total_acres: Math.round(totalAcres * 100) / 100,
    avg_acres: Math.round(avgAcres * 100) / 100,
    total_value: totalValue,
    avg_value: Math.round(totalValue / Math.max(1, byUse.reduce((sum, u) => sum + u.count, 0))),
    by_use: byUse,
  };
}

/**
 * Get sample parcels
 */
async function getSampleParcels(
  whereClause: string,
  limit: number = 5
): Promise<SearchResult['sample_parcels']> {
  const features = await solanoClient.queryByAttribute(
    LAYERS.PARCELS,
    whereClause,
    'parcelid,p_address,sitecity,acres,use_desc,valland,valimp'
  );

  return features.slice(0, limit).map((f) => ({
    apn: String(f.attributes.parcelid ?? ''),
    address: `${f.attributes.p_address ?? ''}, ${f.attributes.sitecity ?? ''}`.trim(),
    acres: Number(f.attributes.acres ?? 0),
    use_description: String(f.attributes.use_desc ?? 'Unknown'),
    assessed_value: (Number(f.attributes.valland ?? 0) + Number(f.attributes.valimp ?? 0)),
  }));
}

/**
 * Search parcels with criteria and return aggregations
 */
export async function searchParcels(args: {
  criteria: SearchCriteria;
  include_samples?: boolean;
  sample_limit?: number;
}): Promise<SearchResult> {
  const { criteria, include_samples = true, sample_limit = 5 } = args;

  // Validate at least one criterion is provided
  if (Object.keys(criteria).length === 0) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'At least one search criterion is required',
      suggestion: 'Provide criteria like zoning, use_description, min_acres, city, etc.',
    };
  }

  try {
    const whereClause = buildWhereClause(criteria);

    // Get count, aggregations, and samples in parallel
    const [totalCount, aggregations, sampleParcels] = await Promise.all([
      getCount(whereClause),
      getAggregations(whereClause),
      include_samples ? getSampleParcels(whereClause, sample_limit) : Promise.resolve([]),
    ]);

    if (totalCount === 0) {
      return {
        success: true,
        total_count: 0,
        where_clause: whereClause,
        message: 'No parcels found matching the criteria',
        suggestion: 'Try broadening your search or checking the criteria values',
      };
    }

    return {
      success: true,
      total_count: totalCount,
      sample_parcels: sampleParcels,
      aggregations,
      where_clause: whereClause,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'QUERY_ERROR',
      message: `Failed to search parcels: ${errorMessage}`,
      suggestion: 'Check the criteria format and try again',
    };
  }
}
