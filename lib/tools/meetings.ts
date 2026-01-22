/**
 * Meeting minutes search tools for MCP.
 *
 * Provides search and retrieval of committee/board meeting content.
 * Currently supports ReGIS (Regional GIS Consortium) meetings.
 */

import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Types
interface MeetingChunk {
  id: string;
  meeting_id: string;
  committee: string;
  meeting_date: string;
  document_type: 'agenda' | 'minutes';
  item_number: string;
  item_title: string;
  chunk_type: string;
  text: string;
  page_start: number;
  page_end: number;
  attendees: string[];
  action_taken: string | null;
}

interface SearchResult extends MeetingChunk {
  similarity_score: number;
}

interface MeetingsData {
  committee: string;
  description: string;
  source_url: string;
  total_meetings: number;
  total_chunks: number;
  date_range: {
    earliest: string | null;
    latest: string | null;
  };
  chunks: MeetingChunk[];
}

// Cache for loaded meeting data
let meetingsDataCache: MeetingsData | null = null;

/**
 * Load meetings data from JSON file.
 */
function loadMeetingsData(): MeetingsData {
  if (meetingsDataCache) {
    return meetingsDataCache;
  }

  const dataPath = path.join(process.cwd(), 'data/meetings/regis/regis-meetings.json');

  if (!existsSync(dataPath)) {
    throw new Error(`Meetings data not found at ${dataPath}. Run parse-meeting-docs.py first.`);
  }

  const content = readFileSync(dataPath, 'utf-8');
  meetingsDataCache = JSON.parse(content) as MeetingsData;

  return meetingsDataCache;
}

/**
 * Search meeting minutes using keyword matching with weighted scoring.
 */
export async function searchMeetingMinutes(params: {
  query: string;
  top_k?: number;
  committee?: string;
  document_type?: 'agenda' | 'minutes';
  date_from?: string;
  date_to?: string;
}): Promise<{
  success: boolean;
  query: string;
  total_results: number;
  results: Array<{
    id: string;
    meeting_id: string;
    meeting_date: string;
    document_type: string;
    item_number: string;
    item_title: string;
    chunk_type: string;
    score: number;
    text_preview: string;
  }>;
}> {
  const { query, top_k = 5, committee, document_type, date_from, date_to } = params;

  const data = loadMeetingsData();
  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 2);

  if (keywords.length === 0) {
    return {
      success: true,
      query,
      total_results: 0,
      results: [],
    };
  }

  const results: SearchResult[] = [];

  for (const chunk of data.chunks) {
    // Apply filters
    if (committee && !chunk.committee.toLowerCase().includes(committee.toLowerCase())) {
      continue;
    }
    if (document_type && chunk.document_type !== document_type) {
      continue;
    }
    if (date_from && chunk.meeting_date < date_from) {
      continue;
    }
    if (date_to && chunk.meeting_date > date_to) {
      continue;
    }

    const textLower = chunk.text.toLowerCase();
    const titleLower = chunk.item_title.toLowerCase();
    const chunkTypeLower = chunk.chunk_type.toLowerCase();

    // Score calculation with weighted matches
    let score = 0;

    for (const kw of keywords) {
      // Item title match is most valuable
      if (titleLower.includes(kw)) {
        score += 3.0;
      }
      // Chunk type match (attendance, discussion, etc.)
      if (chunkTypeLower.includes(kw)) {
        score += 2.0;
      }
      // Text content match
      if (textLower.includes(kw)) {
        score += 1.0;
      }
    }

    if (score > 0) {
      results.push({
        ...chunk,
        similarity_score: Math.min(score / (keywords.length * 3), 1.0)
      });
    }
  }

  // Sort by score descending, then by date descending
  results.sort((a, b) => {
    if (b.similarity_score !== a.similarity_score) {
      return b.similarity_score - a.similarity_score;
    }
    return b.meeting_date.localeCompare(a.meeting_date);
  });

  const topResults = results.slice(0, top_k);

  return {
    success: true,
    query,
    total_results: results.length,
    results: topResults.map(r => ({
      id: r.id,
      meeting_id: r.meeting_id,
      meeting_date: r.meeting_date,
      document_type: r.document_type,
      item_number: r.item_number,
      item_title: r.item_title,
      chunk_type: r.chunk_type,
      score: Math.round(r.similarity_score * 100) / 100,
      text_preview: r.text.slice(0, 500).replace(/\n/g, ' ') + (r.text.length > 500 ? '...' : ''),
    })),
  };
}

/**
 * Get full text of a specific meeting chunk.
 */
export async function getMeetingChunk(params: {
  chunk_id: string;
}): Promise<{
  success: boolean;
  chunk: MeetingChunk | null;
  error?: string;
}> {
  const { chunk_id } = params;

  try {
    const data = loadMeetingsData();
    const chunk = data.chunks.find(c => c.id === chunk_id);

    if (!chunk) {
      return {
        success: false,
        chunk: null,
        error: `Chunk not found: ${chunk_id}`,
      };
    }

    return {
      success: true,
      chunk,
    };
  } catch (error) {
    return {
      success: false,
      chunk: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * List all meetings, optionally filtered by year or committee.
 */
export async function listMeetings(params: {
  committee?: string;
  year?: number;
}): Promise<{
  success: boolean;
  meetings: Array<{
    meeting_id: string;
    meeting_date: string;
    committee: string;
    has_agenda: boolean;
    has_minutes: boolean;
    chunk_count: number;
  }>;
  count: number;
}> {
  const { committee, year } = params;

  const data = loadMeetingsData();
  const meetingMap = new Map<string, {
    meeting_id: string;
    meeting_date: string;
    committee: string;
    has_agenda: boolean;
    has_minutes: boolean;
    chunk_count: number;
  }>();

  for (const chunk of data.chunks) {
    // Apply filters
    if (committee && !chunk.committee.toLowerCase().includes(committee.toLowerCase())) {
      continue;
    }
    if (year && !chunk.meeting_date.startsWith(year.toString())) {
      continue;
    }

    const existing = meetingMap.get(chunk.meeting_id);
    if (existing) {
      existing.chunk_count++;
      if (chunk.document_type === 'agenda') existing.has_agenda = true;
      if (chunk.document_type === 'minutes') existing.has_minutes = true;
    } else {
      meetingMap.set(chunk.meeting_id, {
        meeting_id: chunk.meeting_id,
        meeting_date: chunk.meeting_date,
        committee: chunk.committee,
        has_agenda: chunk.document_type === 'agenda',
        has_minutes: chunk.document_type === 'minutes',
        chunk_count: 1,
      });
    }
  }

  const meetings = Array.from(meetingMap.values())
    .sort((a, b) => b.meeting_date.localeCompare(a.meeting_date));

  return {
    success: true,
    meetings,
    count: meetings.length,
  };
}

/**
 * Get all content for a specific meeting.
 */
export async function getMeeting(params: {
  meeting_id: string;
  document_type?: 'agenda' | 'minutes';
}): Promise<{
  success: boolean;
  meeting_id: string;
  meeting_date: string | null;
  committee: string | null;
  chunk_count: number;
  chunks: Array<{
    id: string;
    document_type: string;
    item_number: string;
    item_title: string;
    chunk_type: string;
    text: string;
    attendees: string[];
  }>;
}> {
  const { meeting_id, document_type } = params;

  const data = loadMeetingsData();

  const chunks = data.chunks.filter(chunk => {
    if (chunk.meeting_id !== meeting_id) return false;
    if (document_type && chunk.document_type !== document_type) return false;
    return true;
  });

  // Sort by document type (agenda first), then item number
  chunks.sort((a, b) => {
    if (a.document_type !== b.document_type) {
      return a.document_type === 'agenda' ? -1 : 1;
    }
    return parseInt(a.item_number) - parseInt(b.item_number);
  });

  const firstChunk = chunks[0];

  return {
    success: true,
    meeting_id,
    meeting_date: firstChunk?.meeting_date ?? null,
    committee: firstChunk?.committee ?? null,
    chunk_count: chunks.length,
    chunks: chunks.map(c => ({
      id: c.id,
      document_type: c.document_type,
      item_number: c.item_number,
      item_title: c.item_title,
      chunk_type: c.chunk_type,
      text: c.text,
      attendees: c.attendees,
    })),
  };
}

/**
 * Get meetings overview and statistics.
 */
export async function getMeetingsOverview(): Promise<{
  success: boolean;
  committee: string;
  description: string;
  source_url: string;
  total_meetings: number;
  total_chunks: number;
  date_range: {
    earliest: string | null;
    latest: string | null;
  };
  chunks_by_document_type: Record<string, number>;
  chunks_by_chunk_type: Record<string, number>;
  meetings_by_year: Record<string, number>;
}> {
  const data = loadMeetingsData();

  const chunksByDocType: Record<string, number> = {};
  const chunksByChunkType: Record<string, number> = {};
  const meetingsByYear: Record<string, number> = {};
  const seenMeetings = new Set<string>();

  for (const chunk of data.chunks) {
    // Count by document type
    chunksByDocType[chunk.document_type] = (chunksByDocType[chunk.document_type] || 0) + 1;

    // Count by chunk type
    chunksByChunkType[chunk.chunk_type] = (chunksByChunkType[chunk.chunk_type] || 0) + 1;

    // Count meetings by year
    if (!seenMeetings.has(chunk.meeting_id)) {
      seenMeetings.add(chunk.meeting_id);
      const year = chunk.meeting_date.substring(0, 4);
      meetingsByYear[year] = (meetingsByYear[year] || 0) + 1;
    }
  }

  return {
    success: true,
    committee: data.committee,
    description: data.description,
    source_url: data.source_url,
    total_meetings: data.total_meetings,
    total_chunks: data.total_chunks,
    date_range: data.date_range,
    chunks_by_document_type: chunksByDocType,
    chunks_by_chunk_type: chunksByChunkType,
    meetings_by_year: meetingsByYear,
  };
}
