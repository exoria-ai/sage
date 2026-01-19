/**
 * General Plan Tool Definitions
 *
 * Tools for accessing 2008 Solano County General Plan documents.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import {
  searchGeneralPlan,
  getGeneralPlanChunk,
  listGeneralPlanChapters,
  listGeneralPlanDocuments,
  getGeneralPlanChapter,
  getGeneralPlanOverview,
  searchGeneralPlanPolicies,
} from '../general-plan';

export const searchGeneralPlanTool = defineTool({
  name: 'search_general_plan',
  description: `Search the 2008 Solano County General Plan documents.

Use this tool when users ask about:
- Land use policies and designations
- Housing element requirements
- Agricultural preservation policies
- Transportation and circulation
- Public facilities and services
- Parks and recreation
- Environmental resources
- Public health and safety goals
- Economic development policies
- Suisun Marsh protections

INPUT:
- query: Search terms (required)
- top_k: Number of results (default: 5)
- document_type: Filter by type ("chapter", "appendix", "resolution", "eir")
- chapter: Filter by chapter number (e.g., "2" for Land Use)
- chunk_type: Filter by content type ("narrative", "table", "policy")

OUTPUT: Matching General Plan chunks with relevance scores.

CHAPTERS:
0: Title Page & TOC
1: Introduction
2: Land Use
3: Agriculture
4: Resources
5: Public Health & Safety
6: Economic Development
7: Transportation
8: Public Facilities
9: Housing Element
10: Parks & Recreation
11: Tri-City & County Plan
12: Suisun Marsh LPP`,
  schema: {
    query: z.string().describe('Search query'),
    top_k: z.number().optional().describe('Max results (default: 5)'),
    document_type: z.string().optional().describe('Filter by type: chapter, appendix, resolution, eir'),
    chapter: z.string().optional().describe('Filter by chapter number (e.g., "2", "9")'),
    chunk_type: z.string().optional().describe('Filter by content type: narrative, table, policy'),
  },
  handler: async ({ query, top_k, document_type, chapter, chunk_type }) => {
    const result = await searchGeneralPlan({ query, top_k, document_type, chapter, chunk_type });
    return jsonResponse(result);
  },
});

export const getGeneralPlanChunkTool = defineTool({
  name: 'get_general_plan_chunk',
  description: `Retrieve the full text of a specific General Plan chunk by ID.

Use after search_general_plan to get complete text of a result.`,
  schema: {
    chunk_id: z.string().describe('Chunk ID from search results'),
  },
  handler: async ({ chunk_id }) => {
    const result = await getGeneralPlanChunk({ chunk_id });
    return jsonResponse(result);
  },
});

export const listGeneralPlanChaptersTool = defineTool({
  name: 'list_general_plan_chapters',
  description: `List all chapters in the 2008 General Plan.

Returns chapter numbers, titles, and chunk counts for each chapter.`,
  schema: {},
  handler: async () => {
    const result = await listGeneralPlanChapters();
    return jsonResponse(result);
  },
});

export const listGeneralPlanDocumentsTool = defineTool({
  name: 'list_general_plan_documents',
  description: `List all document types in the General Plan collection.

Returns document types (chapters, appendices, resolutions, EIR) with titles and counts.
Use this to understand what documents are available for searching.`,
  schema: {},
  handler: async () => {
    const result = await listGeneralPlanDocuments();
    return jsonResponse(result);
  },
});

export const getGeneralPlanChapterTool = defineTool({
  name: 'get_general_plan_chapter',
  description: `Get all content from a specific General Plan chapter.

Returns all chunks for the specified chapter, sorted by page number.
Useful for reading an entire chapter or section.`,
  schema: {
    chapter: z.string().describe('Chapter number (e.g., "2" for Land Use, "9" for Housing)'),
    include_tables: z.boolean().optional().describe('Include table chunks (default: true)'),
  },
  handler: async ({ chapter, include_tables }) => {
    const result = await getGeneralPlanChapter({ chapter, include_tables });
    return jsonResponse(result);
  },
});

export const getGeneralPlanOverviewTool = defineTool({
  name: 'get_general_plan_overview',
  description: `Get overview statistics about the General Plan document collection.

Returns metadata, chapter list, appendix list, and chunk counts by type.
Use this to understand what's available before searching.`,
  schema: {},
  handler: async () => {
    const result = await getGeneralPlanOverview();
    return jsonResponse(result);
  },
});

export const searchGeneralPlanPoliciesTool = defineTool({
  name: 'search_general_plan_policies',
  description: `Search specifically for policies and goals in the General Plan.

Filters results to only policy/goal chunks for more targeted results.
Use when users ask about specific policies, goals, or implementation programs.

INPUT:
- query: Search terms (required)
- top_k: Number of results (default: 5)
- chapter: Filter by chapter number

OUTPUT: Matching policy chunks with relevance scores.`,
  schema: {
    query: z.string().describe('Search query for policies/goals'),
    top_k: z.number().optional().describe('Max results (default: 5)'),
    chapter: z.string().optional().describe('Filter by chapter number'),
  },
  handler: async ({ query, top_k, chapter }) => {
    const result = await searchGeneralPlanPolicies({ query, top_k, chapter });
    return jsonResponse(result);
  },
});

/** All general plan tools */
export const generalPlanTools = [
  searchGeneralPlanTool,
  getGeneralPlanChunkTool,
  listGeneralPlanChaptersTool,
  listGeneralPlanDocumentsTool,
  getGeneralPlanChapterTool,
  getGeneralPlanOverviewTool,
  searchGeneralPlanPoliciesTool,
];
