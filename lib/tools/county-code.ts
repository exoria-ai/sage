/**
 * County Code Lookup Tool
 *
 * Retrieves sections from the Solano County Code.
 * Supports batch retrieval of multiple sections to minimize round trips.
 */

import { promises as fs } from 'fs';
import * as path from 'path';

// Types for the county code data structure
interface CodeSection {
  id: string;
  title: string;
  text: string;
  ordinances: string[];
}

interface CodeArticle {
  id: string;
  title: string;
  sections: CodeSection[];
}

interface CodeChapter {
  chapter: string;
  title: string;
  articles: CodeArticle[];
}

interface CountyCodeResult {
  success: boolean;
  sections?: Array<{
    id: string;
    title: string;
    text: string;
    chapter: string;
    chapter_title: string;
    article: string;
    article_title: string;
    ordinances: string[];
  }>;
  not_found?: string[];
  error_type?: string;
  message?: string;
  suggestion?: string;
}

interface ListChaptersResult {
  success: boolean;
  chapters?: Array<{
    chapter: string;
    title: string;
    article_count: number;
    section_count: number;
  }>;
  error_type?: string;
  message?: string;
}

interface ListSectionsResult {
  success: boolean;
  chapter?: string;
  chapter_title?: string;
  sections?: Array<{
    id: string;
    title: string;
    article: string;
    article_title: string;
  }>;
  error_type?: string;
  message?: string;
  suggestion?: string;
}

// Cache for loaded chapters
const chapterCache = new Map<string, CodeChapter>();

// Build section index for fast lookups
const sectionIndex = new Map<string, {
  section: CodeSection;
  chapter: CodeChapter;
  article: CodeArticle;
}>();

/**
 * Get the data directory path
 */
function getDataDir(): string {
  // In production (Vercel), use process.cwd()
  // In development, resolve relative to this file
  return path.join(process.cwd(), 'data', 'codes', 'solano');
}

/**
 * Load a chapter from disk and cache it
 */
async function loadChapter(chapterNum: string): Promise<CodeChapter | null> {
  // Check cache first
  if (chapterCache.has(chapterNum)) {
    return chapterCache.get(chapterNum)!;
  }

  const dataDir = getDataDir();
  const files = await fs.readdir(dataDir);

  // Find file matching chapter number
  const chapterFile = files.find(f =>
    f.startsWith(`chapter-${chapterNum}-`) && f.endsWith('.json')
  );

  if (!chapterFile) {
    return null;
  }

  const filePath = path.join(dataDir, chapterFile);
  const content = await fs.readFile(filePath, 'utf-8');
  const chapter: CodeChapter = JSON.parse(content);

  // Cache the chapter
  chapterCache.set(chapterNum, chapter);

  // Index all sections
  for (const article of chapter.articles) {
    for (const section of article.sections) {
      sectionIndex.set(section.id.toLowerCase(), {
        section,
        chapter,
        article,
      });
    }
  }

  return chapter;
}

/**
 * Ensure all available chapters are loaded
 */
async function loadAllChapters(): Promise<void> {
  const dataDir = getDataDir();

  try {
    const files = await fs.readdir(dataDir);
    const chapterFiles = files.filter(f => f.startsWith('chapter-') && f.endsWith('.json'));

    for (const file of chapterFiles) {
      // Extract chapter number from filename (e.g., "chapter-26-subdivisions.json" -> "26", "chapter-26.5-..." -> "26.5")
      const match = file.match(/^chapter-([\d.]+)-/);
      if (match) {
        await loadChapter(match[1]!);
      }
    }
  } catch {
    // Directory may not exist yet
  }
}

/**
 * Normalize a section ID for lookup
 * Handles formats like "26-11", "26-11.1", "Section 26-11"
 */
function normalizeSectionId(id: string): string {
  // Remove "Section" prefix if present
  let normalized = id.replace(/^section\s+/i, '');
  // Remove any extra whitespace
  normalized = normalized.trim().toLowerCase();
  return normalized;
}

/**
 * Get sections from the county code
 */
export async function getCountyCodeSections(args: {
  section_ids: string[];
}): Promise<CountyCodeResult> {
  const { section_ids } = args;

  if (!section_ids || section_ids.length === 0) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'At least one section ID is required',
      suggestion: 'Provide section IDs like "26-11" or "26-21.3"',
    };
  }

  // Limit to prevent abuse
  if (section_ids.length > 20) {
    return {
      success: false,
      error_type: 'TOO_MANY_SECTIONS',
      message: 'Maximum 20 sections can be retrieved at once',
      suggestion: 'Break your request into smaller batches',
    };
  }

  try {
    // Ensure chapters are loaded
    await loadAllChapters();

    const found: CountyCodeResult['sections'] = [];
    const notFound: string[] = [];

    for (const rawId of section_ids) {
      const normalizedId = normalizeSectionId(rawId);
      const indexed = sectionIndex.get(normalizedId);

      if (indexed) {
        found.push({
          id: indexed.section.id,
          title: indexed.section.title,
          text: indexed.section.text,
          chapter: indexed.chapter.chapter,
          chapter_title: indexed.chapter.title,
          article: indexed.article.id,
          article_title: indexed.article.title,
          ordinances: indexed.section.ordinances,
        });
      } else {
        // Try to load the chapter if not already loaded
        const chapterMatch = normalizedId.match(/^(\d+)-/);
        if (chapterMatch) {
          await loadChapter(chapterMatch[1]!);
          // Try again after loading
          const retryIndexed = sectionIndex.get(normalizedId);
          if (retryIndexed) {
            found.push({
              id: retryIndexed.section.id,
              title: retryIndexed.section.title,
              text: retryIndexed.section.text,
              chapter: retryIndexed.chapter.chapter,
              chapter_title: retryIndexed.chapter.title,
              article: retryIndexed.article.id,
              article_title: retryIndexed.article.title,
              ordinances: retryIndexed.section.ordinances,
            });
            continue;
          }
        }
        notFound.push(rawId);
      }
    }

    if (found.length === 0) {
      return {
        success: false,
        error_type: 'SECTIONS_NOT_FOUND',
        message: `None of the requested sections were found: ${notFound.join(', ')}`,
        suggestion: 'Use list_county_code_sections to see available sections, or check section ID format',
      };
    }

    return {
      success: true,
      sections: found,
      not_found: notFound.length > 0 ? notFound : undefined,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'READ_ERROR',
      message: `Failed to read county code: ${errorMessage}`,
      suggestion: 'The county code data may not be available',
    };
  }
}

/**
 * List available chapters
 */
export async function listCountyCodeChapters(): Promise<ListChaptersResult> {
  try {
    await loadAllChapters();

    const chapters: ListChaptersResult['chapters'] = [];

    for (const [_, chapter] of chapterCache) {
      let sectionCount = 0;
      for (const article of chapter.articles) {
        sectionCount += article.sections.length;
      }

      chapters.push({
        chapter: chapter.chapter,
        title: chapter.title,
        article_count: chapter.articles.length,
        section_count: sectionCount,
      });
    }

    // Sort by chapter number
    chapters.sort((a, b) => parseInt(a.chapter) - parseInt(b.chapter));

    return {
      success: true,
      chapters,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'READ_ERROR',
      message: `Failed to list chapters: ${errorMessage}`,
    };
  }
}

/**
 * List sections in a chapter
 */
export async function listCountyCodeSections(args: {
  chapter: string;
}): Promise<ListSectionsResult> {
  const { chapter: chapterNum } = args;

  if (!chapterNum) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Chapter number is required',
      suggestion: 'Provide a chapter number like "26"',
    };
  }

  try {
    const chapter = await loadChapter(chapterNum);

    if (!chapter) {
      return {
        success: false,
        error_type: 'CHAPTER_NOT_FOUND',
        message: `Chapter ${chapterNum} not found`,
        suggestion: 'Use list_county_code_chapters to see available chapters',
      };
    }

    const sections: ListSectionsResult['sections'] = [];

    for (const article of chapter.articles) {
      for (const section of article.sections) {
        sections.push({
          id: section.id,
          title: section.title,
          article: article.id,
          article_title: article.title,
        });
      }
    }

    return {
      success: true,
      chapter: chapter.chapter,
      chapter_title: chapter.title,
      sections,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'READ_ERROR',
      message: `Failed to list sections: ${errorMessage}`,
    };
  }
}

/**
 * Search county code by keyword
 */
export async function searchCountyCode(args: {
  query: string;
  chapter?: string;
  max_results?: number;
}): Promise<{
  success: boolean;
  results?: Array<{
    id: string;
    title: string;
    chapter: string;
    chapter_title: string;
    snippet: string;
    match_type: 'title' | 'text';
  }>;
  total_matches?: number;
  error_type?: string;
  message?: string;
}> {
  const { query, chapter: chapterFilter, max_results = 10 } = args;

  if (!query || query.length < 2) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Search query must be at least 2 characters',
    };
  }

  try {
    await loadAllChapters();

    const results: Array<{
      id: string;
      title: string;
      chapter: string;
      chapter_title: string;
      snippet: string;
      match_type: 'title' | 'text';
    }> = [];

    const queryLower = query.toLowerCase();

    for (const [_, indexed] of sectionIndex) {
      // Filter by chapter if specified
      if (chapterFilter && indexed.chapter.chapter !== chapterFilter) {
        continue;
      }

      const titleLower = indexed.section.title.toLowerCase();
      const textLower = indexed.section.text.toLowerCase();

      let matchType: 'title' | 'text' | null = null;
      let snippet = '';

      if (titleLower.includes(queryLower)) {
        matchType = 'title';
        snippet = indexed.section.title;
      } else if (textLower.includes(queryLower)) {
        matchType = 'text';
        // Extract snippet around the match
        const matchIndex = textLower.indexOf(queryLower);
        const start = Math.max(0, matchIndex - 50);
        const end = Math.min(indexed.section.text.length, matchIndex + query.length + 50);
        snippet = (start > 0 ? '...' : '') +
                  indexed.section.text.slice(start, end) +
                  (end < indexed.section.text.length ? '...' : '');
      }

      if (matchType) {
        results.push({
          id: indexed.section.id,
          title: indexed.section.title,
          chapter: indexed.chapter.chapter,
          chapter_title: indexed.chapter.title,
          snippet,
          match_type: matchType,
        });
      }
    }

    // Sort: title matches first, then by section ID
    results.sort((a, b) => {
      if (a.match_type !== b.match_type) {
        return a.match_type === 'title' ? -1 : 1;
      }
      return a.id.localeCompare(b.id);
    });

    const totalMatches = results.length;
    const limitedResults = results.slice(0, max_results);

    return {
      success: true,
      results: limitedResults,
      total_matches: totalMatches,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'SEARCH_ERROR',
      message: `Search failed: ${errorMessage}`,
    };
  }
}
