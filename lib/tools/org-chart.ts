/**
 * Org Chart MCP Tools
 *
 * Provides efficient access to county organizational structure,
 * departments, divisions, and position allocations.
 *
 * Design principles:
 * - Token-efficient: Minimal output by default, expand on request
 * - Fast lookups: In-memory caching and indexed access
 * - Flexible queries: Multiple search/filter patterns
 */

import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Types
interface Position {
  title: string;
  fte: number;
  ltFte: number;
  ltExpDate?: string;
  jobCode?: string;
  grade?: string;
}

interface Division {
  code: string;
  name: string;
  positions: Position[];
  totalFte: number;
  ltFte: number;
}

interface Department {
  code: string;
  name: string;
  divisions: Division[];
  totalFte: number;
  ltFte: number;
}

interface JobClass {
  jobCode: string;
  title: string;
  salaryPlan: string;
  grade: string;
  flsa: string;
  eeo4: string;
}

interface OrgChart {
  asOf: string;
  generatedAt: string;
  stats: {
    departments: number;
    divisions: number;
    uniquePositionTitles: number;
    totalFte: number;
    totalLtFte: number;
    jobClassifications: number;
  };
  departments: Department[];
  jobClassifications: JobClass[];
}

// Cache
let orgChartCache: OrgChart | null = null;
let deptIndex: Map<string, Department> | null = null;
let positionIndex: Map<string, Array<{ pos: Position; dept: Department; div: Division }>> | null = null;

/**
 * Load and index org chart data
 */
function loadOrgChart(): OrgChart {
  if (orgChartCache) return orgChartCache;

  const dataPath = path.join(process.cwd(), 'data/hr/org-chart.json');
  if (!existsSync(dataPath)) {
    throw new Error(`Org chart not found at ${dataPath}. Run: npx tsx scripts/parse-hr-data.ts`);
  }

  orgChartCache = JSON.parse(readFileSync(dataPath, 'utf-8')) as OrgChart;

  // Build department index (by code and normalized name)
  deptIndex = new Map();
  for (const dept of orgChartCache.departments) {
    deptIndex.set(dept.code, dept);
    deptIndex.set(dept.name.toLowerCase(), dept);
  }

  // Build position index (by normalized title)
  positionIndex = new Map();
  for (const dept of orgChartCache.departments) {
    for (const div of dept.divisions) {
      for (const pos of div.positions) {
        const key = pos.title.toLowerCase();
        const entry = { pos, dept, div };
        const existing = positionIndex.get(key);
        if (existing) {
          existing.push(entry);
        } else {
          positionIndex.set(key, [entry]);
        }
      }
    }
  }

  return orgChartCache;
}

function getDeptIndex(): Map<string, Department> {
  loadOrgChart();
  return deptIndex!;
}

function getPositionIndex(): Map<string, Array<{ pos: Position; dept: Department; div: Division }>> {
  loadOrgChart();
  return positionIndex!;
}

// ============================================================================
// MCP Tool: get_org_overview
// ============================================================================

/**
 * Get high-level org chart stats and department list.
 * Compact output for initial orientation.
 */
export async function getOrgOverview(): Promise<{
  asOf: string;
  totalFte: number;
  ltFte: number;
  departmentCount: number;
  divisionCount: number;
  departments: Array<{
    code: string;
    name: string;
    fte: number;
    divs: number;
  }>;
}> {
  const data = loadOrgChart();

  return {
    asOf: data.asOf,
    totalFte: Math.round(data.stats.totalFte * 10) / 10,
    ltFte: data.stats.totalLtFte,
    departmentCount: data.stats.departments,
    divisionCount: data.stats.divisions,
    departments: data.departments
      .map(d => ({
        code: d.code,
        name: d.name,
        fte: d.totalFte,
        divs: d.divisions.length,
      }))
      .sort((a, b) => b.fte - a.fte),
  };
}

// ============================================================================
// MCP Tool: get_department
// ============================================================================

/**
 * Get department details with optional position breakdown.
 *
 * @param code_or_name - Department code (e.g., "7500") or partial name (e.g., "sheriff")
 * @param include_positions - If true, include full position list (more tokens)
 */
export async function getDepartment(params: {
  code_or_name: string;
  include_positions?: boolean;
}): Promise<{
  success: boolean;
  department?: {
    code: string;
    name: string;
    totalFte: number;
    ltFte: number;
    divisions: Array<{
      code: string;
      name: string;
      fte: number;
      positionCount: number;
      positions?: Array<{
        title: string;
        fte: number;
        grade?: string;
      }>;
    }>;
    // Aggregated position summary (always included, token-efficient)
    topPositions: Array<{
      title: string;
      fte: number;
      grade?: string;
    }>;
  };
  error?: string;
}> {
  const index = getDeptIndex();
  const key = params.code_or_name.toLowerCase();

  // Try exact match first
  let dept = index.get(key) || index.get(params.code_or_name);

  // Try partial name match
  if (!dept) {
    for (const [k, v] of index) {
      if (k.includes(key)) {
        dept = v;
        break;
      }
    }
  }

  if (!dept) {
    return { success: false, error: `Department not found: ${params.code_or_name}` };
  }

  // Aggregate positions across divisions
  const positionMap = new Map<string, { fte: number; grade?: string }>();
  for (const div of dept.divisions) {
    for (const pos of div.positions) {
      const existing = positionMap.get(pos.title);
      if (existing) {
        existing.fte += pos.fte;
      } else {
        positionMap.set(pos.title, { fte: pos.fte, grade: pos.grade });
      }
    }
  }

  const topPositions = Array.from(positionMap.entries())
    .map(([title, data]) => ({ title, ...data }))
    .sort((a, b) => b.fte - a.fte)
    .slice(0, 15);  // Top 15 positions

  return {
    success: true,
    department: {
      code: dept.code,
      name: dept.name,
      totalFte: dept.totalFte,
      ltFte: dept.ltFte,
      divisions: dept.divisions.map(d => ({
        code: d.code,
        name: d.name,
        fte: d.totalFte,
        positionCount: d.positions.length,
        ...(params.include_positions ? {
          positions: d.positions.map(p => ({
            title: p.title,
            fte: p.fte,
            grade: p.grade,
          }))
        } : {}),
      })),
      topPositions,
    },
  };
}

// ============================================================================
// MCP Tool: search_positions
// ============================================================================

/**
 * Search positions by title across all departments.
 * Returns aggregated FTE counts and distribution.
 *
 * @param query - Position title to search (e.g., "social worker", "analyst")
 * @param department - Optional department filter
 * @param limit - Max results (default 20)
 */
export async function searchPositions(params: {
  query: string;
  department?: string;
  limit?: number;
}): Promise<{
  query: string;
  totalMatches: number;
  totalFte: number;
  results: Array<{
    title: string;
    fte: number;
    ltFte: number;
    grade?: string;
    department: string;
    division: string;
  }>;
}> {
  const data = loadOrgChart();
  const queryLower = params.query.toLowerCase();
  const limit = params.limit || 20;

  const results: Array<{
    title: string;
    fte: number;
    ltFte: number;
    grade?: string;
    department: string;
    division: string;
    score: number;
  }> = [];

  for (const dept of data.departments) {
    // Department filter
    if (params.department) {
      const deptLower = params.department.toLowerCase();
      if (!dept.code.includes(deptLower) && !dept.name.toLowerCase().includes(deptLower)) {
        continue;
      }
    }

    for (const div of dept.divisions) {
      for (const pos of div.positions) {
        const titleLower = pos.title.toLowerCase();

        // Score matching
        let score = 0;
        if (titleLower === queryLower) {
          score = 1.0;
        } else if (titleLower.includes(queryLower)) {
          score = 0.8;
        } else {
          // Word overlap
          const queryWords = queryLower.split(/\s+/);
          const titleWords = titleLower.split(/\s+/);
          const matches = queryWords.filter(w => titleWords.some(tw => tw.includes(w)));
          if (matches.length > 0) {
            score = 0.5 * (matches.length / queryWords.length);
          }
        }

        if (score > 0) {
          results.push({
            title: pos.title,
            fte: pos.fte,
            ltFte: pos.ltFte,
            grade: pos.grade,
            department: dept.name,
            division: div.name,
            score,
          });
        }
      }
    }
  }

  // Sort by score then FTE
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.fte - a.fte;
  });

  const totalFte = results.reduce((sum, r) => sum + r.fte, 0);

  return {
    query: params.query,
    totalMatches: results.length,
    totalFte: Math.round(totalFte * 10) / 10,
    results: results.slice(0, limit).map(({ score, ...rest }) => rest),
  };
}

// ============================================================================
// MCP Tool: get_position_distribution
// ============================================================================

/**
 * Get distribution of a position title across departments.
 * Useful for understanding where a job class is allocated.
 *
 * @param title - Exact or partial position title
 */
export async function getPositionDistribution(params: {
  title: string;
}): Promise<{
  title: string;
  totalFte: number;
  totalLtFte: number;
  byDepartment: Array<{
    department: string;
    fte: number;
    divisions: Array<{ name: string; fte: number }>;
  }>;
}> {
  const data = loadOrgChart();
  const titleLower = params.title.toLowerCase();

  // Group by department
  const deptMap = new Map<string, {
    fte: number;
    divisions: Map<string, number>;
  }>();

  let totalFte = 0;
  let totalLtFte = 0;

  for (const dept of data.departments) {
    for (const div of dept.divisions) {
      for (const pos of div.positions) {
        if (pos.title.toLowerCase().includes(titleLower)) {
          totalFte += pos.fte;
          totalLtFte += pos.ltFte;

          const existing = deptMap.get(dept.name);
          if (existing) {
            existing.fte += pos.fte;
            const divFte = existing.divisions.get(div.name) || 0;
            existing.divisions.set(div.name, divFte + pos.fte);
          } else {
            const divisions = new Map<string, number>();
            divisions.set(div.name, pos.fte);
            deptMap.set(dept.name, { fte: pos.fte, divisions });
          }
        }
      }
    }
  }

  const byDepartment = Array.from(deptMap.entries())
    .map(([department, data]) => ({
      department,
      fte: data.fte,
      divisions: Array.from(data.divisions.entries())
        .map(([name, fte]) => ({ name, fte }))
        .sort((a, b) => b.fte - a.fte),
    }))
    .sort((a, b) => b.fte - a.fte);

  return {
    title: params.title,
    totalFte: Math.round(totalFte * 10) / 10,
    totalLtFte: Math.round(totalLtFte * 10) / 10,
    byDepartment,
  };
}

// ============================================================================
// MCP Tool: get_division
// ============================================================================

/**
 * Get details for a specific division by code.
 *
 * @param code - Division code (e.g., "7501")
 */
export async function getDivision(params: {
  code: string;
}): Promise<{
  success: boolean;
  division?: {
    code: string;
    name: string;
    fte: number;
    ltFte: number;
    department: { code: string; name: string };
    positions: Array<{
      title: string;
      fte: number;
      ltFte: number;
      grade?: string;
    }>;
  };
  error?: string;
}> {
  const data = loadOrgChart();

  for (const dept of data.departments) {
    for (const div of dept.divisions) {
      if (div.code === params.code) {
        return {
          success: true,
          division: {
            code: div.code,
            name: div.name,
            fte: div.totalFte,
            ltFte: div.ltFte,
            department: { code: dept.code, name: dept.name },
            positions: div.positions
              .map(p => ({
                title: p.title,
                fte: p.fte,
                ltFte: p.ltFte,
                grade: p.grade,
              }))
              .sort((a, b) => b.fte - a.fte),
          },
        };
      }
    }
  }

  return { success: false, error: `Division not found: ${params.code}` };
}

// ============================================================================
// MCP Tool: list_job_classes
// ============================================================================

/**
 * List job classifications, optionally filtered.
 *
 * @param search - Search by title or job code
 * @param grade - Filter by grade
 * @param limit - Max results (default 50)
 */
export async function listJobClasses(params?: {
  search?: string;
  grade?: string;
  limit?: number;
}): Promise<{
  total: number;
  results: Array<{
    jobCode: string;
    title: string;
    grade: string;
    flsa: string;
  }>;
}> {
  const data = loadOrgChart();
  const limit = params?.limit || 50;

  let classes = data.jobClassifications;

  if (params?.grade) {
    classes = classes.filter(c => c.grade === params.grade);
  }

  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    classes = classes.filter(c =>
      c.title.toLowerCase().includes(searchLower) ||
      c.jobCode.includes(searchLower)
    );
  }

  return {
    total: classes.length,
    results: classes.slice(0, limit).map(c => ({
      jobCode: c.jobCode,
      title: c.title,
      grade: c.grade,
      flsa: c.flsa,
    })),
  };
}

// ============================================================================
// MCP Tool: compare_departments
// ============================================================================

/**
 * Compare staffing between departments.
 * Useful for cross-department analysis.
 *
 * @param departments - List of department codes or names to compare
 */
export async function compareDepartments(params: {
  departments: string[];
}): Promise<{
  comparison: Array<{
    code: string;
    name: string;
    totalFte: number;
    ltFte: number;
    divisionCount: number;
    topPositions: Array<{ title: string; fte: number }>;
  }>;
}> {
  const index = getDeptIndex();
  const results: Array<{
    code: string;
    name: string;
    totalFte: number;
    ltFte: number;
    divisionCount: number;
    topPositions: Array<{ title: string; fte: number }>;
  }> = [];

  for (const query of params.departments) {
    const key = query.toLowerCase();
    let dept = index.get(key) || index.get(query);

    // Try partial match
    if (!dept) {
      for (const [k, v] of index) {
        if (k.includes(key)) {
          dept = v;
          break;
        }
      }
    }

    if (dept) {
      // Aggregate positions
      const posMap = new Map<string, number>();
      for (const div of dept.divisions) {
        for (const pos of div.positions) {
          posMap.set(pos.title, (posMap.get(pos.title) || 0) + pos.fte);
        }
      }

      const topPositions = Array.from(posMap.entries())
        .map(([title, fte]) => ({ title, fte }))
        .sort((a, b) => b.fte - a.fte)
        .slice(0, 5);

      results.push({
        code: dept.code,
        name: dept.name,
        totalFte: dept.totalFte,
        ltFte: dept.ltFte,
        divisionCount: dept.divisions.length,
        topPositions,
      });
    }
  }

  return { comparison: results };
}
