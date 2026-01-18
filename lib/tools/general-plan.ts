/**
 * General Plan document search tools for MCP.
 *
 * Provides search and retrieval of 2008 Solano County General Plan content,
 * including chapters, appendices, amendments (resolutions), and EIR documents.
 */

import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Types
interface GeneralPlanChunk {
  id: string;
  document_id: string;
  document_type: string; // "chapter", "appendix", "resolution", "eir", "diagram"
  document_title: string;
  chapter_number: string | null;
  page_start: number;
  page_end: number;
  section_title: string | null;
  subsection_title: string | null;
  chunk_type: string; // "narrative", "table", "policy", "goal", "toc"
  text: string;
  keywords: string[];
}

interface SearchResult extends GeneralPlanChunk {
  similarity_score: number;
}

interface GeneralPlanData {
  document_collection: string;
  description: string;
  total_chunks: number;
  document_types: Record<string, number>;
  chunks: GeneralPlanChunk[];
}

// Cache for loaded data
let generalPlanDataCache: GeneralPlanData | null = null;

/**
 * Load General Plan data from JSON file.
 */
function loadGeneralPlanData(): GeneralPlanData {
  if (generalPlanDataCache) {
    return generalPlanDataCache;
  }

  const dataPath = path.join(process.cwd(), 'data/general_plan_2008/general-plan-2008.json');

  if (!existsSync(dataPath)) {
    throw new Error(`General Plan data not found at ${dataPath}. Run parse-general-plan-pdfs.py first.`);
  }

  const content = readFileSync(dataPath, 'utf-8');
  generalPlanDataCache = JSON.parse(content) as GeneralPlanData;

  return generalPlanDataCache;
}

/**
 * Search General Plan documents using keyword matching with weighted scoring.
 */
export async function searchGeneralPlan(params: {
  query: string;
  top_k?: number;
  document_type?: string; // "chapter", "appendix", "resolution", "eir"
  chapter?: string; // Filter by chapter number
  chunk_type?: string; // "narrative", "table", "policy"
}): Promise<{
  success: boolean;
  query: string;
  total_results: number;
  results: Array<{
    id: string;
    document_title: string;
    document_type: string;
    chapter: string | null;
    pages: string;
    section_title: string | null;
    chunk_type: string;
    score: number;
    text_preview: string;
    keywords: string[];
  }>;
}> {
  const { query, top_k = 5, document_type, chapter, chunk_type } = params;

  const data = loadGeneralPlanData();
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
    if (document_type && chunk.document_type !== document_type) {
      continue;
    }
    if (chapter && chunk.chapter_number !== chapter) {
      continue;
    }
    if (chunk_type && chunk.chunk_type !== chunk_type) {
      continue;
    }

    const textLower = chunk.text.toLowerCase();
    const titleLower = (chunk.document_title || '').toLowerCase();
    const sectionLower = (chunk.section_title || '').toLowerCase();
    const chunkKeywords = chunk.keywords.map(k => k.toLowerCase());

    // Score calculation with weighted matches
    let score = 0;

    for (const kw of keywords) {
      // Keyword field match is most valuable (pre-extracted relevant terms)
      if (chunkKeywords.some(ck => ck.includes(kw))) {
        score += 3.0;
      }
      // Section title match
      if (sectionLower.includes(kw)) {
        score += 2.5;
      }
      // Document title match
      if (titleLower.includes(kw)) {
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

  // Sort by score descending
  results.sort((a, b) => b.similarity_score - a.similarity_score);

  const topResults = results.slice(0, top_k);

  return {
    success: true,
    query,
    total_results: results.length,
    results: topResults.map(r => ({
      id: r.id,
      document_title: r.document_title,
      document_type: r.document_type,
      chapter: r.chapter_number,
      pages: `${r.page_start}-${r.page_end}`,
      section_title: r.section_title,
      chunk_type: r.chunk_type,
      score: Math.round(r.similarity_score * 100) / 100,
      text_preview: r.text.slice(0, 500).replace(/\n/g, ' ') + (r.text.length > 500 ? '...' : ''),
      keywords: r.keywords,
    })),
  };
}

/**
 * Get full text of a specific General Plan chunk.
 */
export async function getGeneralPlanChunk(params: {
  chunk_id: string;
}): Promise<{
  success: boolean;
  chunk: GeneralPlanChunk | null;
  error?: string;
}> {
  const { chunk_id } = params;

  try {
    const data = loadGeneralPlanData();
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
 * List all chapters in the General Plan.
 */
export async function listGeneralPlanChapters(): Promise<{
  success: boolean;
  chapters: Array<{
    chapter_number: string;
    title: string;
    chunk_count: number;
  }>;
  count: number;
}> {
  const data = loadGeneralPlanData();
  const chapterMap = new Map<string, { title: string; count: number }>();

  for (const chunk of data.chunks) {
    if (chunk.document_type === 'chapter' && chunk.chapter_number) {
      const existing = chapterMap.get(chunk.chapter_number);
      if (existing) {
        existing.count++;
      } else {
        chapterMap.set(chunk.chapter_number, {
          title: chunk.document_title,
          count: 1
        });
      }
    }
  }

  const chapters = Array.from(chapterMap.entries())
    .map(([num, info]) => ({
      chapter_number: num,
      title: info.title,
      chunk_count: info.count,
    }))
    .sort((a, b) => {
      // Sort numerically, handling "0" as first
      const numA = parseInt(a.chapter_number) || 0;
      const numB = parseInt(b.chapter_number) || 0;
      return numA - numB;
    });

  return {
    success: true,
    chapters,
    count: chapters.length,
  };
}

/**
 * List all document types and their counts.
 */
export async function listGeneralPlanDocuments(): Promise<{
  success: boolean;
  documents: Array<{
    document_type: string;
    titles: string[];
    chunk_count: number;
  }>;
}> {
  const data = loadGeneralPlanData();
  const docMap = new Map<string, { titles: Set<string>; count: number }>();

  for (const chunk of data.chunks) {
    const existing = docMap.get(chunk.document_type);
    if (existing) {
      existing.titles.add(chunk.document_title);
      existing.count++;
    } else {
      docMap.set(chunk.document_type, {
        titles: new Set([chunk.document_title]),
        count: 1
      });
    }
  }

  const documents = Array.from(docMap.entries())
    .map(([type, info]) => ({
      document_type: type,
      titles: Array.from(info.titles).sort(),
      chunk_count: info.count,
    }))
    .sort((a, b) => b.chunk_count - a.chunk_count);

  return {
    success: true,
    documents,
  };
}

/**
 * Get all chunks for a specific chapter.
 */
export async function getGeneralPlanChapter(params: {
  chapter: string;
  include_tables?: boolean;
}): Promise<{
  success: boolean;
  chapter: string;
  title: string | null;
  chunk_count: number;
  chunks: Array<{
    id: string;
    pages: string;
    section_title: string | null;
    chunk_type: string;
    text: string;
    keywords: string[];
  }>;
}> {
  const { chapter, include_tables = true } = params;

  const data = loadGeneralPlanData();

  const chunks = data.chunks.filter(chunk => {
    if (chunk.document_type !== 'chapter') return false;
    if (chunk.chapter_number !== chapter) return false;
    if (!include_tables && chunk.chunk_type === 'table') return false;
    return true;
  });

  // Sort by page number
  chunks.sort((a, b) => a.page_start - b.page_start);

  const firstChunk = chunks[0];

  return {
    success: true,
    chapter,
    title: firstChunk?.document_title || null,
    chunk_count: chunks.length,
    chunks: chunks.map(c => ({
      id: c.id,
      pages: `${c.page_start}-${c.page_end}`,
      section_title: c.section_title,
      chunk_type: c.chunk_type,
      text: c.text,
      keywords: c.keywords,
    })),
  };
}

/**
 * Get General Plan collection statistics and overview.
 */
export async function getGeneralPlanOverview(): Promise<{
  success: boolean;
  collection: string;
  description: string;
  total_chunks: number;
  chunks_by_document_type: Record<string, number>;
  chunks_by_chunk_type: Record<string, number>;
  chapters: Array<{ number: string; title: string }>;
  appendices: Array<{ letter: string; title: string }>;
}> {
  const data = loadGeneralPlanData();

  const chunksByType: Record<string, number> = {};
  const chapters = new Map<string, string>();
  const appendices = new Map<string, string>();

  for (const chunk of data.chunks) {
    // Count by chunk type
    chunksByType[chunk.chunk_type] = (chunksByType[chunk.chunk_type] || 0) + 1;

    // Track chapters
    if (chunk.document_type === 'chapter' && chunk.chapter_number) {
      if (!chapters.has(chunk.chapter_number)) {
        chapters.set(chunk.chapter_number, chunk.document_title);
      }
    }

    // Track appendices
    if (chunk.document_type === 'appendix' && chunk.chapter_number) {
      if (!appendices.has(chunk.chapter_number)) {
        appendices.set(chunk.chapter_number, chunk.document_title);
      }
    }
  }

  return {
    success: true,
    collection: data.document_collection,
    description: data.description,
    total_chunks: data.total_chunks,
    chunks_by_document_type: data.document_types,
    chunks_by_chunk_type: chunksByType,
    chapters: Array.from(chapters.entries())
      .map(([num, title]) => ({ number: num, title }))
      .sort((a, b) => (parseInt(a.number) || 0) - (parseInt(b.number) || 0)),
    appendices: Array.from(appendices.entries())
      .map(([letter, title]) => ({ letter, title }))
      .sort((a, b) => a.letter.localeCompare(b.letter)),
  };
}

/**
 * Search for policies and goals in the General Plan.
 * Filters to only policy/goal chunks for more targeted results.
 */
export async function searchGeneralPlanPolicies(params: {
  query: string;
  top_k?: number;
  chapter?: string;
}): Promise<{
  success: boolean;
  query: string;
  total_results: number;
  results: Array<{
    id: string;
    document_title: string;
    chapter: string | null;
    pages: string;
    section_title: string | null;
    score: number;
    text_preview: string;
  }>;
}> {
  // Delegate to main search with chunk_type filter
  const result = await searchGeneralPlan({
    query: params.query,
    top_k: params.top_k,
    chapter: params.chapter,
    chunk_type: 'policy',
  });

  return {
    success: result.success,
    query: result.query,
    total_results: result.total_results,
    results: result.results.map(r => ({
      id: r.id,
      document_title: r.document_title,
      chapter: r.chapter,
      pages: r.pages,
      section_title: r.section_title,
      score: r.score,
      text_preview: r.text_preview,
    })),
  };
}
