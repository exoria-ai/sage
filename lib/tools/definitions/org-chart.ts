/**
 * Org Chart Tool Definitions
 *
 * Tools for accessing county organizational structure and staffing data.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import {
  getOrgOverview,
  getDepartment,
  searchPositions,
  getPositionDistribution,
  getDivision,
  listJobClasses,
  compareDepartments,
} from '../org-chart';

export const getOrgOverviewTool = defineTool({
  name: 'get_org_overview',
  description: `Get county org chart overview with department list.

Returns high-level stats and all departments sorted by FTE.
Use this first to orient before drilling into specific departments.

OUTPUT:
- asOf: Data date (April 2025)
- totalFte/ltFte: County-wide totals (3,284 FTE)
- departments: List with code, name, fte, division count`,
  schema: {},
  handler: async () => {
    const result = await getOrgOverview();
    return jsonResponse(result);
  },
});

export const getDepartmentTool = defineTool({
  name: 'get_department',
  description: `Get department details with divisions and top positions.

INPUT:
- code_or_name: Department code (e.g., "7500") or partial name (e.g., "sheriff", "health")
- include_positions: If true, include full position list per division (more tokens)

OUTPUT:
- Division breakdown with FTE
- Top 15 positions aggregated across divisions (always included)
- Full position list per division (if include_positions=true)`,
  schema: {
    code_or_name: z.string().describe('Department code or partial name'),
    include_positions: z.boolean().optional().describe('Include full position list (default: false)'),
  },
  handler: async ({ code_or_name, include_positions }) => {
    const result = await getDepartment({ code_or_name, include_positions });
    return jsonResponse(result);
  },
});

export const searchPositionsTool = defineTool({
  name: 'search_positions',
  description: `Search position titles across all departments.

INPUT:
- query: Position title to search (e.g., "social worker", "analyst", "clerk")
- department: Optional filter by department code/name
- limit: Max results (default: 20)

OUTPUT:
- Total matches and FTE
- Results with title, FTE, grade, department, division`,
  schema: {
    query: z.string().describe('Position title to search'),
    department: z.string().optional().describe('Filter by department'),
    limit: z.number().optional().describe('Max results (default: 20)'),
  },
  handler: async ({ query, department, limit }) => {
    const result = await searchPositions({ query, department, limit });
    return jsonResponse(result);
  },
});

export const getPositionDistributionTool = defineTool({
  name: 'get_position_distribution',
  description: `Get distribution of a position title across departments.

Shows where a job class is allocated county-wide.
Useful for understanding staffing patterns.

INPUT:
- title: Exact or partial position title

OUTPUT:
- Total FTE county-wide
- Breakdown by department with division details`,
  schema: {
    title: z.string().describe('Position title to find'),
  },
  handler: async ({ title }) => {
    const result = await getPositionDistribution({ title });
    return jsonResponse(result);
  },
});

export const getDivisionTool = defineTool({
  name: 'get_division',
  description: `Get details for a specific division by code.

INPUT:
- code: Division code (e.g., "7501", "6552")

OUTPUT:
- Division name, FTE, parent department
- All positions with FTE and grade`,
  schema: {
    code: z.string().describe('Division code'),
  },
  handler: async ({ code }) => {
    const result = await getDivision({ code });
    return jsonResponse(result);
  },
});

export const listJobClassesTool = defineTool({
  name: 'list_job_classes',
  description: `List job classifications with optional filtering.

INPUT:
- search: Search by title or job code
- grade: Filter by salary grade
- limit: Max results (default: 50)

OUTPUT:
- Job code, title, grade, FLSA status`,
  schema: {
    search: z.string().optional().describe('Search by title or job code'),
    grade: z.string().optional().describe('Filter by grade'),
    limit: z.number().optional().describe('Max results (default: 50)'),
  },
  handler: async ({ search, grade, limit }) => {
    const result = await listJobClasses({ search, grade, limit });
    return jsonResponse(result);
  },
});

export const compareDepartmentsTool = defineTool({
  name: 'compare_departments',
  description: `Compare staffing between multiple departments.

INPUT:
- departments: Array of department codes or names

OUTPUT:
- Side-by-side comparison with FTE, divisions, top positions`,
  schema: {
    departments: z.array(z.string()).describe('Department codes or names to compare'),
  },
  handler: async ({ departments }) => {
    const result = await compareDepartments({ departments });
    return jsonResponse(result);
  },
});

/** All org chart tools */
export const orgChartTools = [
  getOrgOverviewTool,
  getDepartmentTool,
  searchPositionsTool,
  getPositionDistributionTool,
  getDivisionTool,
  listJobClassesTool,
  compareDepartmentsTool,
];
