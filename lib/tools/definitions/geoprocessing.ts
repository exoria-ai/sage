/**
 * Geoprocessing Tool Definitions
 *
 * Tools for server-side GIS processing using Modal + GeoPandas.
 * These tools call serverless functions for heavy geoprocessing operations.
 */

import { z } from 'zod';
import { defineTool, ToolResponse } from '../types';

// Modal endpoint URLs
// After deployment, endpoints will be: https://aimachinedream--sage-gis-tools-[function-name].modal.run
const MODAL_BASE_URL = process.env.MODAL_GIS_ENDPOINT || 'https://aimachinedream--sage-gis-tools';
const DISSOLVE_ENDPOINT = `${MODAL_BASE_URL}-dissolve-and-store-api.modal.run`;
const INSPECT_ENDPOINT = `${MODAL_BASE_URL}-inspect-layer.modal.run`;

/**
 * Known Solano County shapefile downloads
 */
const SOLANO_DOWNLOADS = {
  parcels: 'https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root/Parcels_Public_Aumentum_GIS/Parcels_Public_Aumentum_Shapefiles.zip',
  roads: 'https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root/Road_Centerlines_GIS/Road_Centerlines_Shapefiles.zip',
  addresses: 'https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root/Address_Pts_GIS/Address_Pts_Shapefiles.zip',
  cityBoundary: 'https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root/CityBoundary_GIS/CityBoundary_Shapefiles.zip',
  countyBoundary: 'https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root/County_Boundary_GIS/County_Boundary_Shapefiles.zip',
  generalPlan: 'https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root//SolanoCountyUnincorporated_GeneralPlan2008_GIS/SolanoCountyUnincorporated_GeneralPlan2008_Shapefiles.zip',
  zoning: 'https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root//SolanoCountyUnincorporatedZoning_GIS/SolanoCountyUnincorporatedZoning_Shapefiles.zip',
  supervisorDistricts: 'https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root/BOS_District_Boundaries_2021_SolanoCounty_GIS/BOS_District_Boundaries_2021_SolanoCounty_Shapefiles.zip',
} as const;

/**
 * Dissolve Layer Tool
 *
 * Dissolves a shapefile by an attribute field to create simplified boundaries.
 */
export const dissolveLayerTool = defineTool({
  name: 'dissolve_layer',
  description: `Dissolve a shapefile by an attribute field to create simplified boundary polygons.

**PURPOSE**: Create derived boundary layers from parcel or other polygon data.
For example, create school district boundaries by dissolving parcels on the school district field.

**HOW IT WORKS**:
1. Downloads zipped shapefile from URL
2. Dissolves (merges) all polygons that share the same attribute value
3. Simplifies geometry for smaller file size
4. Returns URL to GeoJSON result

**INPUT OPTIONS**:
- input_url: Direct URL to a zipped shapefile, OR
- dataset: Shorthand for known Solano County datasets:
  - "parcels" - Parcel data with assessment info (f_school, desc_fire, fund_water, etc.)
  - "zoning" - Unincorporated zoning districts
  - "generalPlan" - General plan designations

**COMMON DISSOLVE FIELDS** (for parcels dataset):
- f_school / d_school: School districts (code / description)
- fund_fire / desc_fire: Fire districts
- fund_water / desc_water: Water districts
- wa_status: Williamson Act status (agricultural preserves)
- sitecity: City name (creates city boundaries from parcels)
- use_desc: Land use description

**EXAMPLE**: Create school district boundaries
  dissolve_layer({
    dataset: "parcels",
    dissolve_field: "f_school",
    output_name: "school_districts"
  })

**OUTPUT**: URL to GeoJSON file that can be:
- Viewed in geojson.io
- Uploaded to ArcGIS Online
- Used in render_map additionalLayers`,

  schema: {
    input_url: z.string().url().optional()
      .describe('Direct URL to zipped shapefile (.zip containing .shp files)'),
    dataset: z.enum(['parcels', 'roads', 'addresses', 'cityBoundary', 'countyBoundary', 'generalPlan', 'zoning', 'supervisorDistricts']).optional()
      .describe('Shorthand for known Solano County datasets'),
    dissolve_field: z.string()
      .describe('Field name to dissolve by (e.g., "f_school", "desc_fire", "wa_status")'),
    output_name: z.string().optional()
      .describe('Custom name for output file (default: auto-generated)'),
    simplify_tolerance: z.number().optional()
      .describe('Geometry simplification in degrees (default: 0.0001 ≈ 10m). Set to 0 for no simplification.'),
    output_fields: z.array(z.string()).optional()
      .describe('Additional fields to include in output (default: dissolve field only)'),
  },

  handler: async ({ input_url, dataset, dissolve_field, output_name, simplify_tolerance, output_fields }): Promise<ToolResponse> => {
    // Resolve input URL
    const url = input_url || (dataset ? SOLANO_DOWNLOADS[dataset] : null);

    if (!url) {
      return {
        content: [{
          type: 'text',
          text: `Error: Must provide either input_url or dataset.

Available datasets:
${Object.entries(SOLANO_DOWNLOADS).map(([key, val]) => `- ${key}: ${val.split('/').pop()}`).join('\n')}`,
        }],
      };
    }

    try {
      const response = await fetch(DISSOLVE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input_url: url,
          dissolve_field,
          output_name,
          simplify_tolerance: simplify_tolerance ?? 0.0001,
          output_fields,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          content: [{
            type: 'text',
            text: `Geoprocessing failed (${response.status}): ${errorText}`,
          }],
        };
      }

      const result = await response.json();

      // Check for field not found error
      if (result.error) {
        let errorMsg = `Error: ${result.error}`;
        if (result.available_fields) {
          errorMsg += `\n\nAvailable fields:\n${result.available_fields.join(', ')}`;
        }
        if (result.sample_values) {
          errorMsg += '\n\nSample values for some fields:';
          for (const [field, values] of Object.entries(result.sample_values)) {
            errorMsg += `\n  ${field}: ${(values as string[]).join(', ')}`;
          }
        }
        return { content: [{ type: 'text', text: errorMsg }] };
      }

      // Success
      const stats = result.stats || {};
      const uniqueValues = stats.unique_values?.slice(0, 20) || [];
      const moreCount = (stats.unique_count || 0) - uniqueValues.length;

      return {
        content: [{
          type: 'text',
          text: `**Dissolve completed successfully**

**Output URL:** ${result.output_url}

**Statistics:**
- Input features: ${stats.input_features?.toLocaleString() || 'unknown'}
- Output features: ${stats.output_features?.toLocaleString() || 'unknown'}
- Dissolve field: ${stats.dissolve_field}

**Unique values:** ${uniqueValues.join(', ')}${moreCount > 0 ? ` ... and ${moreCount} more` : ''}

**Next steps:**
- View in browser: Open ${result.output_url} in geojson.io
- Upload to AGOL: Add as new hosted feature layer
- Use in map: Add to render_map via additionalLayers`,
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Geoprocessing request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        }],
      };
    }
  },
});

/**
 * Inspect Layer Tool
 *
 * Inspect a shapefile to see available fields and identify dissolve candidates.
 */
export const inspectLayerTool = defineTool({
  name: 'inspect_layer',
  description: `Inspect a shapefile to see available fields, data types, and identify good dissolve candidates.

Use this BEFORE dissolve_layer to understand what fields are available.

**EXAMPLE**:
  inspect_layer({ dataset: "parcels" })

Returns field names, types, unique value counts, and recommendations for dissolve operations.`,

  schema: {
    input_url: z.string().url().optional()
      .describe('Direct URL to zipped shapefile'),
    dataset: z.enum(['parcels', 'roads', 'addresses', 'cityBoundary', 'countyBoundary', 'generalPlan', 'zoning', 'supervisorDistricts']).optional()
      .describe('Shorthand for known Solano County datasets'),
  },

  handler: async ({ input_url, dataset }): Promise<ToolResponse> => {
    const url = input_url || (dataset ? SOLANO_DOWNLOADS[dataset] : null);

    if (!url) {
      return {
        content: [{
          type: 'text',
          text: 'Error: Must provide either input_url or dataset.',
        }],
      };
    }

    try {
      const response = await fetch(INSPECT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_url: url }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          content: [{
            type: 'text',
            text: `Inspect failed (${response.status}): ${errorText}`,
          }],
        };
      }

      const result = await response.json();

      if (result.error) {
        return { content: [{ type: 'text', text: `Error: ${result.error}` }] };
      }

      // Format output
      let output = `**Layer Inspection**

**Overview:**
- Features: ${result.feature_count?.toLocaleString()}
- CRS: ${result.crs}
- Geometry: ${result.geometry_type}

**Recommended dissolve fields:** ${result.dissolve_candidates?.join(', ') || 'None found'}

**All fields:**
`;

      // Group fields by dissolve suitability
      const fields = result.fields || {};
      const goodFields: string[] = [];
      const otherFields: string[] = [];

      for (const [name, info] of Object.entries(fields) as [string, { unique_count: number; dtype: string; sample_values: unknown[] }][]) {
        const line = `- **${name}** (${info.dtype}): ${info.unique_count} unique values`;
        if (info.unique_count > 1 && info.unique_count <= 100) {
          goodFields.push(`${line}\n  Sample: ${info.sample_values?.slice(0, 5).join(', ')}`);
        } else {
          otherFields.push(line);
        }
      }

      if (goodFields.length > 0) {
        output += '\n*Good for dissolve:*\n' + goodFields.join('\n') + '\n';
      }
      if (otherFields.length > 0) {
        output += '\n*Other fields:*\n' + otherFields.slice(0, 20).join('\n');
        if (otherFields.length > 20) {
          output += `\n... and ${otherFields.length - 20} more fields`;
        }
      }

      return { content: [{ type: 'text', text: output }] };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Inspect request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        }],
      };
    }
  },
});

/** All geoprocessing tools */
export const geoprocessingTools = [dissolveLayerTool, inspectLayerTool];
