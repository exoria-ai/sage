/**
 * Budget document search utilities for MCP tools.
 *
 * Provides keyword-based and semantic search over parsed budget chunks.
 * Falls back to JSON search when vector database is unavailable.
 */

import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Types
export interface BudgetChunk {
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

export interface SearchResult extends BudgetChunk {
  similarity_score: number;
}

export interface BudgetData {
  document_id: string;
  fiscal_year: string;
  document_type: string;
  total_chunks: number;
  chunks: BudgetChunk[];
}

// Cache for loaded budget data
let budgetDataCache: BudgetData | null = null;
let budgetDataPath: string | null = null;

/**
 * Load budget data from JSON file.
 */
export function loadBudgetData(jsonPath?: string): BudgetData {
  const dataPath = jsonPath || path.join(process.cwd(), 'data/budget/fy2025-26-recommended.json');

  // Return cached data if available and path matches
  if (budgetDataCache && budgetDataPath === dataPath) {
    return budgetDataCache;
  }

  if (!existsSync(dataPath)) {
    throw new Error(`Budget data not found at ${dataPath}. Run parse-budget-pdf.py first.`);
  }

  const content = readFileSync(dataPath, 'utf-8');
  budgetDataCache = JSON.parse(content) as BudgetData;
  budgetDataPath = dataPath;

  return budgetDataCache;
}

/**
 * Search budget chunks using keyword matching with weighted scoring.
 */
export function searchBudget(
  query: string,
  options: {
    topK?: number;
    department?: string;
    sectionLetter?: string;
    chunkType?: string;
  } = {}
): SearchResult[] {
  const { topK = 5, department, sectionLetter, chunkType } = options;

  const data = loadBudgetData();
  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 2);

  if (keywords.length === 0) {
    return [];
  }

  const results: SearchResult[] = [];

  for (const chunk of data.chunks) {
    // Apply filters
    if (department && chunk.department &&
        !chunk.department.toLowerCase().includes(department.toLowerCase())) {
      continue;
    }
    if (sectionLetter && chunk.section_letter !== sectionLetter) {
      continue;
    }
    if (chunkType && chunk.chunk_type !== chunkType) {
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

  return results.slice(0, topK);
}

/**
 * Get a specific budget chunk by ID.
 */
export function getBudgetChunk(chunkId: string): BudgetChunk | null {
  const data = loadBudgetData();
  return data.chunks.find(c => c.id === chunkId) || null;
}

/**
 * List all departments in the budget.
 */
export function listDepartments(): string[] {
  const data = loadBudgetData();
  const departments = new Set<string>();

  for (const chunk of data.chunks) {
    if (chunk.department) {
      departments.add(chunk.department);
    }
  }

  return Array.from(departments).sort();
}

/**
 * List all sections in the budget.
 */
export function listSections(): Array<{ letter: string; name: string; chunkCount: number }> {
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

  return Array.from(sections.entries())
    .map(([letter, { name, count }]) => ({
      letter,
      name,
      chunkCount: count
    }))
    .sort((a, b) => a.letter.localeCompare(b.letter));
}

/**
 * Get budget chunks for a specific department.
 */
export function getDepartmentBudget(
  departmentName: string,
  options: { includeNarrative?: boolean; includeTables?: boolean } = {}
): BudgetChunk[] {
  const { includeNarrative = true, includeTables = true } = options;
  const data = loadBudgetData();

  const chunks = data.chunks.filter(chunk => {
    if (!chunk.department) return false;
    if (!chunk.department.toLowerCase().includes(departmentName.toLowerCase())) return false;

    if (!includeNarrative && chunk.chunk_type === 'narrative') return false;
    if (!includeTables && chunk.chunk_type === 'table') return false;

    return true;
  });

  // Sort by page number
  chunks.sort((a, b) => a.page_start - b.page_start);

  return chunks;
}

/**
 * Get budget summary statistics.
 */
export function getBudgetStats(): {
  documentId: string;
  fiscalYear: string;
  totalChunks: number;
  chunksBySection: Record<string, number>;
  chunksByType: Record<string, number>;
  departmentCount: number;
} {
  const data = loadBudgetData();

  const chunksBySection: Record<string, number> = {};
  const chunksByType: Record<string, number> = {};
  const departments = new Set<string>();

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
  }

  return {
    documentId: data.document_id,
    fiscalYear: data.fiscal_year,
    totalChunks: data.total_chunks,
    chunksBySection,
    chunksByType,
    departmentCount: departments.size
  };
}
