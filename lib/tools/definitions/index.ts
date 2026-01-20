/**
 * Tool Definitions Index
 *
 * Aggregates all MCP tool definitions for registration.
 */

import { ToolDefinition } from '../types';

// Import tool groups
import { gisCoreTools } from './gis-core';
import { contextTools } from './context';
import { searchTools } from './search';
import { countyCodeTools } from './county-code';
import { budgetTools } from './budget';
import { generalPlanTools } from './general-plan';
import { orgChartTools } from './org-chart';
import { directionsTools } from './directions';
import { renderMapTools } from './render-map';
import { imageGenerationTools } from './image-generation';
import { interactiveMapTools } from './interactive-map';
import { gisLayersTools } from './gis-layers';
import { geoprocessingTools } from './geoprocessing';

// Re-export individual tool groups for granular imports
export * from './gis-core';
export * from './context';
export * from './search';
export * from './county-code';
export * from './budget';
export * from './general-plan';
export * from './org-chart';
export * from './directions';
export * from './render-map';
export * from './image-generation';
export * from './interactive-map';
export * from './gis-layers';
export * from './geoprocessing';

/**
 * All tool definitions for MCP registration.
 * Tools are grouped by category for organization.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allTools: ToolDefinition<any>[] = [
  // Core GIS tools
  ...gisCoreTools,

  // Context and reference
  ...contextTools,

  // Search tools
  ...searchTools,

  // County code tools
  ...countyCodeTools,

  // Budget tools
  ...budgetTools,

  // General plan tools
  ...generalPlanTools,

  // Org chart tools
  ...orgChartTools,

  // Directions tools
  ...directionsTools,

  // Map rendering
  ...renderMapTools,

  // Interactive map
  ...interactiveMapTools,

  // Image generation
  ...imageGenerationTools,

  // GIS layers discovery
  ...gisLayersTools,

  // Geoprocessing (Modal + GeoPandas)
  ...geoprocessingTools,
];

/**
 * Get tool count for logging/diagnostics
 */
export function getToolStats() {
  return {
    total: allTools.length,
    byCategory: {
      gisCore: gisCoreTools.length,
      context: contextTools.length,
      search: searchTools.length,
      countyCode: countyCodeTools.length,
      budget: budgetTools.length,
      generalPlan: generalPlanTools.length,
      orgChart: orgChartTools.length,
      directions: directionsTools.length,
      renderMap: renderMapTools.length,
      interactiveMap: interactiveMapTools.length,
      imageGeneration: imageGenerationTools.length,
      gisLayers: gisLayersTools.length,
      geoprocessing: geoprocessingTools.length,
    },
  };
}
