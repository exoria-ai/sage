/**
 * Meeting Minutes Tool Definitions
 *
 * Tools for accessing committee and board meeting minutes.
 * Currently supports ReGIS (Solano Regional GIS Consortium) meetings.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import {
  searchMeetingMinutes,
  getMeetingChunk,
  listMeetings,
  getMeeting,
  getMeetingsOverview,
} from '../meetings';

export const searchMeetingMinutesTool = defineTool({
  name: 'search_meeting_minutes',
  description: `Search committee and board meeting minutes.

Use this tool when users ask questions about:
- Past meeting discussions and decisions
- Topics covered in ReGIS (Regional GIS Consortium) meetings
- Attendance at meetings
- Action items and announcements from meetings
- GIS-related initiatives discussed in meetings

INPUT:
- query: Search terms (required)
- top_k: Number of results (default: 5)
- committee: Filter by committee name (e.g., "ReGIS")
- document_type: Filter by "agenda" or "minutes"
- date_from: Filter meetings on or after this date (YYYY-MM-DD)
- date_to: Filter meetings on or before this date (YYYY-MM-DD)

OUTPUT: Matching meeting content with relevance scores.`,
  schema: {
    query: z.string().describe('Search query'),
    top_k: z.number().optional().describe('Max results (default: 5)'),
    committee: z.string().optional().describe('Filter by committee name'),
    document_type: z.enum(['agenda', 'minutes']).optional().describe('Filter by document type'),
    date_from: z.string().optional().describe('Filter meetings on or after this date (YYYY-MM-DD)'),
    date_to: z.string().optional().describe('Filter meetings on or before this date (YYYY-MM-DD)'),
  },
  handler: async ({ query, top_k, committee, document_type, date_from, date_to }) => {
    const result = await searchMeetingMinutes({ query, top_k, committee, document_type, date_from, date_to });
    return jsonResponse(result);
  },
});

export const getMeetingChunkTool = defineTool({
  name: 'get_meeting_chunk',
  description: `Retrieve the full text of a specific meeting chunk by ID.

Use after search_meeting_minutes to get complete text of a result.`,
  schema: {
    chunk_id: z.string().describe('Chunk ID from search results'),
  },
  handler: async ({ chunk_id }) => {
    const result = await getMeetingChunk({ chunk_id });
    return jsonResponse(result);
  },
});

export const listMeetingsTool = defineTool({
  name: 'list_meetings',
  description: `List all available meetings with their dates and document availability.

Use to see what meetings are available for a committee or year.`,
  schema: {
    committee: z.string().optional().describe('Filter by committee name'),
    year: z.number().optional().describe('Filter by year (e.g., 2024)'),
  },
  handler: async ({ committee, year }) => {
    const result = await listMeetings({ committee, year });
    return jsonResponse(result);
  },
});

export const getMeetingTool = defineTool({
  name: 'get_meeting',
  description: `Get all content for a specific meeting by its ID.

Returns all agenda items and/or minutes for a single meeting.
Meeting IDs are in format: "regis-YYYY-MM-DD" (e.g., "regis-2024-01-17")`,
  schema: {
    meeting_id: z.string().describe('Meeting ID (e.g., "regis-2024-01-17")'),
    document_type: z.enum(['agenda', 'minutes']).optional().describe('Filter by document type'),
  },
  handler: async ({ meeting_id, document_type }) => {
    const result = await getMeeting({ meeting_id, document_type });
    return jsonResponse(result);
  },
});

export const getMeetingsOverviewTool = defineTool({
  name: 'get_meetings_overview',
  description: `Get overview statistics about available meeting minutes.

Returns committee info, total meetings, date range, and counts by type.`,
  schema: {},
  handler: async () => {
    const result = await getMeetingsOverview();
    return jsonResponse(result);
  },
});

/** All meetings tools */
export const meetingsTools = [
  searchMeetingMinutesTool,
  getMeetingChunkTool,
  listMeetingsTool,
  getMeetingTool,
  getMeetingsOverviewTool,
];
