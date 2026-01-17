/**
 * Budget document search tools for MCP.
 *
 * Provides search and retrieval of budget document content.
 */

import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Types
interface BudgetChunk {
  id: string;
  document_id: string;
  fiscal_year: string;
  page_start: number;
  page_end: number;
  section_letter: string;
  section_name: string;
  department: string | null;
  budget_unit: string | null;
  fund: string | null;
  department_head: string | null;
  functional_area: string | null;
  subsection: string | null;
  chunk_type: string;
  text: string;
}

interface SearchResult extends BudgetChunk {
  similarity_score: number;
}

interface BudgetData {
  document_id: string;
  fiscal_year: string;
  document_type: string;
  total_chunks: number;
  chunks: BudgetChunk[];
}

// Cache for loaded budget data
let budgetDataCache: BudgetData | null = null;

/**
 * Load budget data from JSON file.
 */
function loadBudgetData(): BudgetData {
  if (budgetDataCache) {
    return budgetDataCache;
  }

  const dataPath = path.join(process.cwd(), 'data/budget/fy2025-26-recommended.json');

  if (!existsSync(dataPath)) {
    throw new Error(`Budget data not found at ${dataPath}. Run parse-budget-pdf.py first.`);
  }

  const content = readFileSync(dataPath, 'utf-8');
  budgetDataCache = JSON.parse(content) as BudgetData;

  return budgetDataCache;
}

/**
 * Search budget documents using keyword matching with weighted scoring.
 */
export async function searchBudget(params: {
  query: string;
  top_k?: number;
  department?: string;
  section?: string;
  chunk_type?: string;
}): Promise<{
  success: boolean;
  query: string;
  total_results: number;
  results: Array<{
    id: string;
    pages: string;
    section: string;
    department: string | null;
    subsection: string | null;
    chunk_type: string;
    score: number;
    text_preview: string;
  }>;
}> {
  const { query, top_k = 5, department, section, chunk_type } = params;

  const data = loadBudgetData();
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
    if (department && chunk.department &&
        !chunk.department.toLowerCase().includes(department.toLowerCase())) {
      continue;
    }
    if (section && chunk.section_letter !== section.toUpperCase()) {
      continue;
    }
    if (chunk_type && chunk.chunk_type !== chunk_type) {
      continue;
    }

    const textLower = chunk.text.toLowerCase();
    const deptLower = (chunk.department || '').toLowerCase();
    const sectionLower = (chunk.section_name || '').toLowerCase();
    const subsectionLower = (chunk.subsection || '').toLowerCase();

    // Score calculation with weighted matches
    let score = 0;

    for (const kw of keywords) {
      // Department name match is most valuable
      if (deptLower.includes(kw)) {
        score += 3.0;
      }
      // Subsection match (e.g., "budget summary")
      if (subsectionLower.includes(kw)) {
        score += 2.0;
      }
      // Section name match
      if (sectionLower.includes(kw)) {
        score += 1.5;
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
      pages: `${r.page_start}-${r.page_end}`,
      section: `${r.section_letter}. ${r.section_name}`,
      department: r.department,
      subsection: r.subsection,
      chunk_type: r.chunk_type,
      score: Math.round(r.similarity_score * 100) / 100,
      text_preview: r.text.slice(0, 500).replace(/\n/g, ' ') + (r.text.length > 500 ? '...' : ''),
    })),
  };
}

/**
 * Get full text of a specific budget chunk.
 */
export async function getBudgetChunk(params: {
  chunk_id: string;
}): Promise<{
  success: boolean;
  chunk: BudgetChunk | null;
  error?: string;
}> {
  const { chunk_id } = params;

  try {
    const data = loadBudgetData();
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
 * List all departments in the budget.
 */
export async function listBudgetDepartments(): Promise<{
  success: boolean;
  departments: string[];
  count: number;
}> {
  const data = loadBudgetData();
  const departments = new Set<string>();

  for (const chunk of data.chunks) {
    if (chunk.department) {
      departments.add(chunk.department);
    }
  }

  const sorted = Array.from(departments).sort();

  return {
    success: true,
    departments: sorted,
    count: sorted.length,
  };
}

/**
 * List all sections in the budget document.
 */
export async function listBudgetSections(): Promise<{
  success: boolean;
  sections: Array<{
    letter: string;
    name: string;
    chunk_count: number;
  }>;
}> {
  const data = loadBudgetData();
  const sections = new Map<string, { name: string; count: number }>();

  for (const chunk of data.chunks) {
    if (chunk.section_letter) {
      const existing = sections.get(chunk.section_letter);
      if (existing) {
        existing.count++;
      } else {
        sections.set(chunk.section_letter, {
          name: chunk.section_name,
          count: 1
        });
      }
    }
  }

  return {
    success: true,
    sections: Array.from(sections.entries())
      .map(([letter, { name, count }]) => ({
        letter,
        name,
        chunk_count: count
      }))
      .sort((a, b) => a.letter.localeCompare(b.letter)),
  };
}

/**
 * Get all chunks for a specific department.
 */
export async function getDepartmentBudget(params: {
  department: string;
  include_narrative?: boolean;
  include_tables?: boolean;
}): Promise<{
  success: boolean;
  department: string;
  chunk_count: number;
  chunks: Array<{
    id: string;
    pages: string;
    subsection: string | null;
    chunk_type: string;
    text: string;
  }>;
}> {
  const { department, include_narrative = true, include_tables = true } = params;

  const data = loadBudgetData();

  const chunks = data.chunks.filter(chunk => {
    if (!chunk.department) return false;
    if (!chunk.department.toLowerCase().includes(department.toLowerCase())) return false;

    if (!include_narrative && chunk.chunk_type === 'narrative') return false;
    if (!include_tables && chunk.chunk_type === 'table') return false;

    return true;
  });

  // Sort by page number
  chunks.sort((a, b) => a.page_start - b.page_start);

  return {
    success: true,
    department,
    chunk_count: chunks.length,
    chunks: chunks.map(c => ({
      id: c.id,
      pages: `${c.page_start}-${c.page_end}`,
      subsection: c.subsection,
      chunk_type: c.chunk_type,
      text: c.text,
    })),
  };
}

/**
 * Get budget document statistics and overview.
 */
export async function getBudgetOverview(): Promise<{
  success: boolean;
  document_id: string;
  fiscal_year: string;
  total_chunks: number;
  chunks_by_section: Record<string, number>;
  chunks_by_type: Record<string, number>;
  department_count: number;
  sections: Array<{ letter: string; name: string }>;
}> {
  const data = loadBudgetData();

  const chunksBySection: Record<string, number> = {};
  const chunksByType: Record<string, number> = {};
  const departments = new Set<string>();
  const sections = new Map<string, string>();

  for (const chunk of data.chunks) {
    // Count by section
    const sectionKey = chunk.section_name || 'Unknown';
    chunksBySection[sectionKey] = (chunksBySection[sectionKey] || 0) + 1;

    // Count by type
    chunksByType[chunk.chunk_type] = (chunksByType[chunk.chunk_type] || 0) + 1;

    // Track departments
    if (chunk.department) {
      departments.add(chunk.department);
    }

    // Track sections
    if (chunk.section_letter && chunk.section_name) {
      sections.set(chunk.section_letter, chunk.section_name);
    }
  }

  return {
    success: true,
    document_id: data.document_id,
    fiscal_year: data.fiscal_year,
    total_chunks: data.total_chunks,
    chunks_by_section: chunksBySection,
    chunks_by_type: chunksByType,
    department_count: departments.size,
    sections: Array.from(sections.entries())
      .map(([letter, name]) => ({ letter, name }))
      .sort((a, b) => a.letter.localeCompare(b.letter)),
  };
}
