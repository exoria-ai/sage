/**
 * Budget Tool Definitions
 *
 * Tools for accessing FY2025-26 Recommended Budget document.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import {
  searchBudget,
  getBudgetChunk,
  listBudgetDepartments,
  listBudgetSections,
  getDepartmentBudget,
  getBudgetOverview,
} from '../budget';

export const searchBudgetTool = defineTool({
  name: 'search_budget',
  description: `Search the FY2025-26 Recommended Budget document.

Use this tool when users ask questions about:
- County department budgets and funding
- Staffing levels and positions
- Budget priorities and challenges
- Program accomplishments and workload
- Revenue sources and expenditures

INPUT:
- query: Search terms (required)
- top_k: Number of results (default: 5)
- department: Filter by department name
- section: Filter by section letter (A-N)
- chunk_type: Filter by type (narrative, table, summary)

OUTPUT: Matching budget document chunks with relevance scores.`,
  schema: {
    query: z.string().describe('Search query'),
    top_k: z.number().optional().describe('Max results (default: 5)'),
    department: z.string().optional().describe('Filter by department'),
    section: z.string().optional().describe('Filter by section (A-N)'),
    chunk_type: z.string().optional().describe('Filter by type: narrative, table, summary'),
  },
  handler: async ({ query, top_k, department, section, chunk_type }) => {
    const result = await searchBudget({ query, top_k, department, section, chunk_type });
    return jsonResponse(result);
  },
});

export const getBudgetChunkTool = defineTool({
  name: 'get_budget_chunk',
  description: `Retrieve the full text of a specific budget chunk by ID.

Use after search_budget to get complete text of a result.`,
  schema: {
    chunk_id: z.string().describe('Chunk ID from search results'),
  },
  handler: async ({ chunk_id }) => {
    const result = await getBudgetChunk({ chunk_id });
    return jsonResponse(result);
  },
});

export const listBudgetDepartmentsTool = defineTool({
  name: 'list_budget_departments',
  description: `List all departments in the budget document.

Returns a list of all department names for filtering searches.`,
  schema: {},
  handler: async () => {
    const result = await listBudgetDepartments();
    return jsonResponse(result);
  },
});

export const listBudgetSectionsTool = defineTool({
  name: 'list_budget_sections',
  description: `List all major sections in the budget document.

Sections are lettered A-N and cover different functional areas:
A. Budget Summary
B. Permanent Position Summary
C. County Statistical Profile
...etc.`,
  schema: {},
  handler: async () => {
    const result = await listBudgetSections();
    return jsonResponse(result);
  },
});

export const getDepartmentBudgetTool = defineTool({
  name: 'get_department_budget',
  description: `Get all budget information for a specific department.

Returns all chunks (narrative and tables) for a department.`,
  schema: {
    department: z.string().describe('Department name (partial match)'),
    include_narrative: z.boolean().optional().describe('Include narrative chunks (default: true)'),
    include_tables: z.boolean().optional().describe('Include table chunks (default: true)'),
  },
  handler: async ({ department, include_narrative, include_tables }) => {
    const result = await getDepartmentBudget({ department, include_narrative, include_tables });
    return jsonResponse(result);
  },
});

export const getBudgetOverviewTool = defineTool({
  name: 'get_budget_overview',
  description: `Get overview statistics about the budget document.

Returns document metadata, section list, and chunk counts.`,
  schema: {},
  handler: async () => {
    const result = await getBudgetOverview();
    return jsonResponse(result);
  },
});

/** All budget tools */
export const budgetTools = [
  searchBudgetTool,
  getBudgetChunkTool,
  listBudgetDepartmentsTool,
  listBudgetSectionsTool,
  getDepartmentBudgetTool,
  getBudgetOverviewTool,
];
