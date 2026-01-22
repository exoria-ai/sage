/**
 * Meeting minutes search tools for MCP.
 *
 * Provides search and retrieval of committee/board meeting content.
 * Currently supports:
 * - ReGIS (Regional GIS Consortium) meetings
 * - Board of Supervisors (BOS) meetings
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
  // ReGIS-specific
  attendees?: string[];
  action_taken?: string | null;
  // BOS-specific
  is_special_meeting?: boolean;
  vote_result?: string | null;
  resolution_number?: string | null;
}

interface SearchResult extends MeetingChunk {
  similarity_score: number;
}

interface MeetingsData {
  committee: string;
  committee_id?: string;
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

// Supported committees
type CommitteeId = 'regis' | 'bos';

const COMMITTEE_FILES: Record<CommitteeId, string> = {
  regis: 'data/meetings/regis/regis-meetings.json',
  bos: 'data/meetings/bos/bos-meetings.json',
};

const COMMITTEE_NAMES: Record<CommitteeId, string> = {
  regis: 'ReGIS Members',
  bos: 'Board of Supervisors',
};

// Cache for loaded meeting data
const meetingsDataCache: Map<CommitteeId, MeetingsData> = new Map();

/**
 * Load meetings data for a specific committee.
 */
function loadMeetingsData(committeeId: CommitteeId): MeetingsData {
  const cached = meetingsDataCache.get(committeeId);
  if (cached) {
    return cached;
  }

  const dataPath = path.join(process.cwd(), COMMITTEE_FILES[committeeId]);

  if (!existsSync(dataPath)) {
    throw new Error(`Meetings data not found at ${dataPath}. Run the appropriate parse script first.`);
  }

  const content = readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(content) as MeetingsData;
  meetingsDataCache.set(committeeId, data);

  return data;
}

/**
 * Load all meetings data from all committees.
 */
function loadAllMeetingsData(): MeetingsData[] {
  const allData: MeetingsData[] = [];

  for (const committeeId of Object.keys(COMMITTEE_FILES) as CommitteeId[]) {
    try {
      const data = loadMeetingsData(committeeId);
      allData.push(data);
    } catch {
      // Skip committees without data
    }
  }

  return allData;
}

/**
 * Resolve committee filter to committee IDs.
 */
function resolveCommitteeFilter(committee?: string): CommitteeId[] {
  if (!committee) {
    return Object.keys(COMMITTEE_FILES) as CommitteeId[];
  }

  const lowerCommittee = committee.toLowerCase();

  // Check for exact committee ID match
  if (lowerCommittee in COMMITTEE_FILES) {
    return [lowerCommittee as CommitteeId];
  }

  // Check for partial name match
  const matches: CommitteeId[] = [];
  for (const [id, name] of Object.entries(COMMITTEE_NAMES)) {
    if (name.toLowerCase().includes(lowerCommittee) || lowerCommittee.includes(id)) {
      matches.push(id as CommitteeId);
    }
  }

  return matches.length > 0 ? matches : Object.keys(COMMITTEE_FILES) as CommitteeId[];
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
    committee: string;
    meeting_date: string;
    document_type: string;
    item_number: string;
    item_title: string;
    chunk_type: string;
    score: number;
    text_preview: string;
    is_special_meeting?: boolean;
    vote_result?: string | null;
  }>;
}> {
  const { query, top_k = 10, committee, document_type, date_from, date_to } = params;

  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 2);

  if (keywords.length === 0) {
    return {
      success: true,
      query,
      total_results: 0,
      results: [],
    };
  }

  const committeeIds = resolveCommitteeFilter(committee);
  const results: SearchResult[] = [];

  for (const committeeId of committeeIds) {
    let data: MeetingsData;
    try {
      data = loadMeetingsData(committeeId);
    } catch {
      continue;
    }

    for (const chunk of data.chunks) {
      // Apply filters
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
      committee: r.committee,
      meeting_date: r.meeting_date,
      document_type: r.document_type,
      item_number: r.item_number,
      item_title: r.item_title,
      chunk_type: r.chunk_type,
      score: Math.round(r.similarity_score * 100) / 100,
      text_preview: r.text.slice(0, 500).replace(/\n/g, ' ') + (r.text.length > 500 ? '...' : ''),
      is_special_meeting: r.is_special_meeting,
      vote_result: r.vote_result,
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

  // Determine committee from chunk_id prefix
  let committeeId: CommitteeId | null = null;
  if (chunk_id.startsWith('regis-')) {
    committeeId = 'regis';
  } else if (chunk_id.startsWith('bos-')) {
    committeeId = 'bos';
  }

  if (!committeeId) {
    return {
      success: false,
      chunk: null,
      error: `Unknown committee in chunk_id: ${chunk_id}`,
    };
  }

  try {
    const data = loadMeetingsData(committeeId);
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
    is_special_meeting?: boolean;
  }>;
  count: number;
}> {
  const { committee, year } = params;

  const committeeIds = resolveCommitteeFilter(committee);
  const meetingMap = new Map<string, {
    meeting_id: string;
    meeting_date: string;
    committee: string;
    has_agenda: boolean;
    has_minutes: boolean;
    chunk_count: number;
    is_special_meeting?: boolean;
  }>();

  for (const committeeId of committeeIds) {
    let data: MeetingsData;
    try {
      data = loadMeetingsData(committeeId);
    } catch {
      continue;
    }

    for (const chunk of data.chunks) {
      // Apply year filter
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
          is_special_meeting: chunk.is_special_meeting,
        });
      }
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
    vote_result?: string | null;
    resolution_number?: string | null;
  }>;
}> {
  const { meeting_id, document_type } = params;

  // Determine committee from meeting_id prefix
  let committeeId: CommitteeId | null = null;
  if (meeting_id.startsWith('regis-')) {
    committeeId = 'regis';
  } else if (meeting_id.startsWith('bos-')) {
    committeeId = 'bos';
  }

  if (!committeeId) {
    return {
      success: false,
      meeting_id,
      meeting_date: null,
      committee: null,
      chunk_count: 0,
      chunks: [],
    };
  }

  let data: MeetingsData;
  try {
    data = loadMeetingsData(committeeId);
  } catch {
    return {
      success: false,
      meeting_id,
      meeting_date: null,
      committee: null,
      chunk_count: 0,
      chunks: [],
    };
  }

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
    // Try numeric sort, fall back to string sort
    const numA = parseInt(a.item_number.replace(/\D/g, '') || '0');
    const numB = parseInt(b.item_number.replace(/\D/g, '') || '0');
    return numA - numB;
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
      vote_result: c.vote_result,
      resolution_number: c.resolution_number,
    })),
  };
}

/**
 * Get meetings overview and statistics.
 */
export async function getMeetingsOverview(): Promise<{
  success: boolean;
  committees: Array<{
    committee_id: string;
    committee: string;
    description: string;
    source_url: string;
    total_meetings: number;
    total_chunks: number;
    date_range: {
      earliest: string | null;
      latest: string | null;
    };
  }>;
  total_meetings: number;
  total_chunks: number;
  chunks_by_committee: Record<string, number>;
  meetings_by_year: Record<string, number>;
}> {
  const allData = loadAllMeetingsData();

  const committees = allData.map(data => ({
    committee_id: data.committee_id || data.committee.toLowerCase().replace(/\s+/g, '-'),
    committee: data.committee,
    description: data.description,
    source_url: data.source_url,
    total_meetings: data.total_meetings,
    total_chunks: data.total_chunks,
    date_range: data.date_range,
  }));

  const chunksByCommittee: Record<string, number> = {};
  const meetingsByYear: Record<string, number> = {};
  const seenMeetings = new Set<string>();
  let totalChunks = 0;

  for (const data of allData) {
    chunksByCommittee[data.committee] = data.total_chunks;
    totalChunks += data.total_chunks;

    for (const chunk of data.chunks) {
      if (!seenMeetings.has(chunk.meeting_id)) {
        seenMeetings.add(chunk.meeting_id);
        const year = chunk.meeting_date.substring(0, 4);
        meetingsByYear[year] = (meetingsByYear[year] || 0) + 1;
      }
    }
  }

  return {
    success: true,
    committees,
    total_meetings: seenMeetings.size,
    total_chunks: totalChunks,
    chunks_by_committee: chunksByCommittee,
    meetings_by_year: meetingsByYear,
  };
}

/**
 * List available committees.
 */
export async function listCommittees(): Promise<{
  success: boolean;
  committees: Array<{
    id: string;
    name: string;
    meeting_count: number;
    chunk_count: number;
    date_range: {
      earliest: string | null;
      latest: string | null;
    };
  }>;
}> {
  const committees: Array<{
    id: string;
    name: string;
    meeting_count: number;
    chunk_count: number;
    date_range: {
      earliest: string | null;
      latest: string | null;
    };
  }> = [];

  for (const [id, file] of Object.entries(COMMITTEE_FILES)) {
    try {
      const data = loadMeetingsData(id as CommitteeId);
      committees.push({
        id,
        name: data.committee,
        meeting_count: data.total_meetings,
        chunk_count: data.total_chunks,
        date_range: data.date_range,
      });
    } catch {
      // Skip committees without data
    }
  }

  return {
    success: true,
    committees,
  };
}
