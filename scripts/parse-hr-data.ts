/**
 * Parse HR data files into a structured org chart JSON
 *
 * Input files:
 * - data/hr/SalaryListingasof1.4.26.txt - Job classifications with grades
 * - data/hr/Position_Allocation_Report.txt - Dept/Div/Position hierarchy
 *
 * Output:
 * - data/hr/org-chart.json
 */

import * as fs from 'fs';
import * as path from 'path';

// Types
interface JobClass {
  jobCode: string;
  title: string;
  salaryPlan: string;
  grade: string;
  flsa: string;
  eeo4: string;
}

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

// Parse salary listing to extract job classifications
function parseSalaryListing(content: string): Map<string, JobClass> {
  const jobClasses = new Map<string, JobClass>();
  const lines = content.split('\n');

  // Pattern: 6-digit job code at start of line
  // Format: JOBCODE JOB TITLE                    SAL PL/BU GRADE    FLSA    EEO4   STEP ...
  const jobLineRegex = /^(\d{6}[A-Z]?)\s+(.+?)\s{2,}(\d{2}[A-Z]?)\s+([A-Z0-9]+)\s+([NX])\s+(\d)/;

  for (const line of lines) {
    const match = line.match(jobLineRegex);
    if (match) {
      const [, jobCode, rawTitle, salaryPlan, grade, flsa, eeo4] = match;
      const title = rawTitle.trim();

      // Normalize title for lookup (lowercase, collapse spaces)
      const normalizedTitle = normalizeTitle(title);

      const jobClass: JobClass = {
        jobCode,
        title,
        salaryPlan,
        grade,
        flsa,
        eeo4
      };

      // Store by normalized title for matching
      jobClasses.set(normalizedTitle, jobClass);
    }
  }

  return jobClasses;
}

// Normalize title for matching between documents
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[\/\-]/g, ' ')
    .replace(/\s*\([^)]*\)\s*/g, ' ')  // Remove parenthetical suffixes like (C), (E)
    .replace(/\s+/g, ' ')
    .trim();
}

// Try to match a position title to a job classification
function findJobClass(posTitle: string, jobClasses: Map<string, JobClass>): JobClass | undefined {
  const normalized = normalizeTitle(posTitle);

  // Exact match
  if (jobClasses.has(normalized)) {
    return jobClasses.get(normalized);
  }

  // Try matching without common suffixes
  const withoutSuffix = normalized.replace(/\s+(i|ii|iii|iv|v|sr|senior|lead|supv|spvsing|supervising)$/, '');
  for (const [key, value] of jobClasses) {
    if (key.startsWith(withoutSuffix) || withoutSuffix.startsWith(key)) {
      return value;
    }
  }

  // Fuzzy match - find best partial match
  let bestMatch: JobClass | undefined;
  let bestScore = 0;

  for (const [key, value] of jobClasses) {
    const score = similarity(normalized, key);
    if (score > bestScore && score > 0.7) {
      bestScore = score;
      bestMatch = value;
    }
  }

  return bestMatch;
}

// Simple similarity score (Jaccard on words)
function similarity(a: string, b: string): number {
  const wordsA = new Set(a.split(' '));
  const wordsB = new Set(b.split(' '));
  const intersection = new Set([...wordsA].filter(x => wordsB.has(x)));
  const union = new Set([...wordsA, ...wordsB]);
  return intersection.size / union.size;
}

// Parse position allocation report
// The report has a hierarchical structure where some apparent "departments" are
// actually sub-units of larger departments. Real departments end with DEPARTMENT TOTAL.
function parsePositionAllocation(content: string, jobClasses: Map<string, JobClass>): Department[] {
  const departments: Department[] = [];
  const lines = content.split('\n');

  let currentDept: Department | null = null;
  let currentDiv: Division | null = null;
  let pendingSubUnits: Division[] = [];  // Sub-units to roll into next real dept

  // Patterns
  // Unit header: 4-digit code at start (may have leading space, may be dept or sub-unit)
  const unitHeaderRegex = /^\s?(\d{4})\s+(?:(\d{4})\s+)?(.+)$/;
  // Division line: indented 4-digit code
  const divLineRegex = /^\s+(\d{4})\s+([A-Za-z][A-Za-z\s\-&\/\(\)]+)$/;
  // Position line: indented text followed by numbers
  const positionRegex = /^\s{6,}([A-Za-z][A-Za-z\s\-\/&\(\)']+?)\s{2,}([\d,.]+)(?:\s+([\d,.]+))?(?:\s+(\d{1,2}\/\d{1,2}\/\d{4}))?$/;
  const divTotalRegex = /DIVISION TOTAL\s+([\d,.]+)(?:\s+([\d,.]+))?/;
  const deptTotalRegex = /DEPARTMENT TOTAL\s+([\d,.]+)(?:\s+([\d,.]+))?/;

  function parseNum(s: string): number {
    return parseFloat(s.replace(/,/g, ''));
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines, headers, and page markers
    if (!line.trim() ||
        line.includes('County of Solano') ||
        line.includes('Position Allocation') ||
        line.match(/Dept\.\s+Div\./) ||
        line.includes('Page No') ||
        line.includes('Position Title') ||
        line.match(/^\s+FTE\s/) ||
        line.includes('LT Exp Date') ||
        line.match(/^\s*\d+ of \d+\s*$/) ||
        line.match(/^\s*As of /) ||
        line.includes('LIMITED TERM TOTAL') ||
        line.includes('REGULAR FULL') ||
        line.includes('COUNTY TOTAL') ||
        line.includes('Note:')) {
      continue;
    }

    // Check for DEPARTMENT TOTAL - this finalizes a department
    const deptTotalMatch = line.match(deptTotalRegex);
    if (deptTotalMatch) {
      if (currentDept) {
        // Finish current division
        if (currentDiv) {
          currentDept.divisions.push(currentDiv);
          currentDiv = null;
        }
        // Add any pending sub-units as divisions
        for (const subUnit of pendingSubUnits) {
          currentDept.divisions.push(subUnit);
        }
        pendingSubUnits = [];

        currentDept.totalFte = parseNum(deptTotalMatch[1]);
        currentDept.ltFte = deptTotalMatch[2] ? parseNum(deptTotalMatch[2]) : 0;
        departments.push(currentDept);
        currentDept = null;
      }
      continue;
    }

    // Check for unit header (dept or sub-unit)
    const unitMatch = line.match(unitHeaderRegex);
    if (unitMatch) {
      const code1 = unitMatch[1];
      const code2 = unitMatch[2];  // Optional second code
      const name = unitMatch[3].trim();

      // If we have a current department without total, it means this is a sub-unit
      // belonging to that department. If we have no current dept, start a new one.
      if (currentDept) {
        // Save current division
        if (currentDiv) {
          currentDept.divisions.push(currentDiv);
        }
        // This is a sub-unit header, treat it as a new division
        currentDiv = {
          code: code2 || code1,
          name: name,
          positions: [],
          totalFte: 0,
          ltFte: 0
        };
      } else {
        // Start new department
        currentDept = {
          code: code1,
          name: name,
          divisions: [],
          totalFte: 0,
          ltFte: 0
        };
        if (code2) {
          // Has both dept and div code on same line
          currentDiv = {
            code: code2,
            name: name,
            positions: [],
            totalFte: 0,
            ltFte: 0
          };
        } else {
          currentDiv = null;
        }
      }
      continue;
    }

    // Check for division line (indented 4-digit code)
    const divMatch = line.match(divLineRegex);
    if (divMatch && currentDept) {
      if (currentDiv) {
        currentDept.divisions.push(currentDiv);
      }
      currentDiv = {
        code: divMatch[1],
        name: divMatch[2].trim(),
        positions: [],
        totalFte: 0,
        ltFte: 0
      };
      continue;
    }

    // Check for division total
    const divTotalMatch = line.match(divTotalRegex);
    if (divTotalMatch && currentDiv) {
      currentDiv.totalFte = parseNum(divTotalMatch[1]);
      currentDiv.ltFte = divTotalMatch[2] ? parseNum(divTotalMatch[2]) : 0;
      continue;
    }

    // Check for position line
    const posMatch = line.match(positionRegex);
    if (posMatch) {
      const title = posMatch[1].trim();

      // Skip if this looks like a date-only line or total line
      if (title.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) || title.includes('TOTAL')) {
        continue;
      }

      const fte = parseNum(posMatch[2]);
      const ltFte = posMatch[3] ? parseNum(posMatch[3]) : 0;
      const ltExpDate = posMatch[4];

      // Try to find matching job classification
      const jobClass = findJobClass(title, jobClasses);

      const position: Position = {
        title,
        fte,
        ltFte,
        ltExpDate,
        jobCode: jobClass?.jobCode,
        grade: jobClass?.grade
      };

      // Add to current division, creating one if needed
      if (!currentDiv && currentDept) {
        currentDiv = {
          code: currentDept.code,
          name: '(Main)',
          positions: [],
          totalFte: 0,
          ltFte: 0
        };
      }
      if (currentDiv) {
        currentDiv.positions.push(position);
      }
    }
  }

  // Handle any remaining department
  if (currentDept) {
    if (currentDiv) {
      currentDept.divisions.push(currentDiv);
    }
    departments.push(currentDept);
  }

  return departments;
}

// Main
async function main() {
  const dataDir = path.join(__dirname, '..', 'data', 'hr');

  console.log('Parsing HR data files...\n');

  // Read input files
  const salaryContent = fs.readFileSync(path.join(dataDir, 'SalaryListingasof1.4.26.txt'), 'utf-8');
  const positionContent = fs.readFileSync(path.join(dataDir, 'Position_Allocation_Report.txt'), 'utf-8');

  // Parse salary listing
  console.log('Parsing salary listing...');
  const jobClasses = parseSalaryListing(salaryContent);
  console.log(`  Found ${jobClasses.size} job classifications\n`);

  // Parse position allocation
  console.log('Parsing position allocation report...');
  const departments = parsePositionAllocation(positionContent, jobClasses);
  console.log(`  Found ${departments.length} departments\n`);

  // Calculate stats
  let totalDivisions = 0;
  let totalFte = 0;
  let totalLtFte = 0;
  const uniqueTitles = new Set<string>();

  for (const dept of departments) {
    totalDivisions += dept.divisions.length;
    totalFte += dept.totalFte;
    totalLtFte += dept.ltFte;
    for (const div of dept.divisions) {
      for (const pos of div.positions) {
        uniqueTitles.add(pos.title);
      }
    }
  }

  // Build output
  const orgChart: OrgChart = {
    asOf: '2025-04-29',
    generatedAt: new Date().toISOString(),
    stats: {
      departments: departments.length,
      divisions: totalDivisions,
      uniquePositionTitles: uniqueTitles.size,
      totalFte: totalFte,
      totalLtFte: totalLtFte,
      jobClassifications: jobClasses.size
    },
    departments,
    jobClassifications: Array.from(jobClasses.values())
  };

  // Write output
  const outputPath = path.join(dataDir, 'org-chart.json');
  fs.writeFileSync(outputPath, JSON.stringify(orgChart, null, 2));
  console.log(`Wrote ${outputPath}\n`);

  // Print summary
  console.log('Summary:');
  console.log(`  Departments: ${orgChart.stats.departments}`);
  console.log(`  Divisions: ${orgChart.stats.divisions}`);
  console.log(`  Unique position titles: ${orgChart.stats.uniquePositionTitles}`);
  console.log(`  Total FTE: ${orgChart.stats.totalFte}`);
  console.log(`  Limited-term FTE: ${orgChart.stats.totalLtFte}`);
  console.log(`  Job classifications: ${orgChart.stats.jobClassifications}`);

  // Print department breakdown
  console.log('\nDepartments:');
  for (const dept of departments) {
    console.log(`  ${dept.code} ${dept.name}: ${dept.totalFte} FTE (${dept.divisions.length} divisions)`);
  }

  // Validation
  console.log('\n--- Validation ---');

  // Check expected totals from report footer
  const expectedRegularFte = 3211.70;
  const expectedLtFte = 72.50;
  const expectedTotalFte = 3284.20;

  const actualTotalFte = Math.round(totalFte * 100) / 100;
  const actualLtFte = Math.round(totalLtFte * 100) / 100;

  if (Math.abs(actualTotalFte - expectedTotalFte) < 0.1) {
    console.log(`✓ Total FTE matches: ${actualTotalFte}`);
  } else {
    console.log(`✗ Total FTE mismatch: got ${actualTotalFte}, expected ${expectedTotalFte}`);
  }

  if (Math.abs(actualLtFte - expectedLtFte) < 0.1) {
    console.log(`✓ LT FTE matches: ${actualLtFte}`);
  } else {
    console.log(`✗ LT FTE mismatch: got ${actualLtFte}, expected ${expectedLtFte}`);
  }

  // Check job class match rate
  let positionsWithGrade = 0;
  let positionsWithoutGrade = 0;
  const unmatchedTitles = new Set<string>();

  for (const dept of departments) {
    for (const div of dept.divisions) {
      for (const pos of div.positions) {
        if (pos.grade) {
          positionsWithGrade++;
        } else {
          positionsWithoutGrade++;
          unmatchedTitles.add(pos.title);
        }
      }
    }
  }

  const matchRate = positionsWithGrade / (positionsWithGrade + positionsWithoutGrade) * 100;
  console.log(`\nJob classification match rate: ${matchRate.toFixed(1)}%`);
  console.log(`  Matched: ${positionsWithGrade}, Unmatched: ${positionsWithoutGrade}`);

  if (unmatchedTitles.size > 0 && unmatchedTitles.size <= 20) {
    console.log(`\nUnmatched titles:`);
    for (const title of Array.from(unmatchedTitles).sort()) {
      console.log(`  - ${title}`);
    }
  } else if (unmatchedTitles.size > 20) {
    console.log(`\nFirst 20 unmatched titles (of ${unmatchedTitles.size}):`);
    for (const title of Array.from(unmatchedTitles).sort().slice(0, 20)) {
      console.log(`  - ${title}`);
    }
  }
}

main().catch(console.error);
