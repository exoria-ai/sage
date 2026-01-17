#!/usr/bin/env npx tsx
/**
 * Test script for County Code MCP tools
 *
 * Tests:
 * 1. listCountyCodeChapters - verify both chapters are available
 * 2. listCountyCodeSections - verify sections are listed correctly
 * 3. getCountyCodeSections - verify section retrieval
 * 4. searchCountyCode - verify search functionality
 * 5. Chapter 28 specific tests - zoning tables, definitions
 */

import {
  listCountyCodeChapters,
  listCountyCodeSections,
  getCountyCodeSections,
  searchCountyCode,
} from '../lib/tools/county-code';

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
  error?: string;
}

const results: TestResult[] = [];

function log(message: string) {
  console.log(message);
}

function logTest(name: string, passed: boolean, details?: string) {
  const status = passed ? '✓' : '✗';
  console.log(`${status} ${name}`);
  if (details) {
    console.log(`  ${details}`);
  }
  results.push({ name, passed, details });
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('County Code MCP Tools Test Suite');
  console.log('='.repeat(60));
  console.log('');

  // Test 1: List Chapters
  console.log('1. Testing listCountyCodeChapters()');
  console.log('-'.repeat(40));
  try {
    const chapters = await listCountyCodeChapters();

    if (!chapters.success) {
      logTest('List chapters', false, `Failed: ${chapters.message}`);
    } else {
      const chapterNums = chapters.chapters?.map(c => c.chapter) || [];
      const hasChapter26 = chapterNums.includes('26');
      const hasChapter28 = chapterNums.includes('28');

      logTest('Chapters loaded successfully', chapters.success);
      logTest('Chapter 26 (Subdivisions) available', hasChapter26);
      logTest('Chapter 28 (Zoning) available', hasChapter28);

      if (chapters.chapters) {
        for (const ch of chapters.chapters) {
          log(`  Chapter ${ch.chapter}: ${ch.title} (${ch.section_count} sections)`);
        }
      }
    }
  } catch (error) {
    logTest('List chapters', false, `Error: ${error}`);
  }
  console.log('');

  // Test 2: List Chapter 26 Sections
  console.log('2. Testing listCountyCodeSections({ chapter: "26" })');
  console.log('-'.repeat(40));
  try {
    const sections26 = await listCountyCodeSections({ chapter: '26' });

    logTest('Chapter 26 sections loaded', sections26.success);
    logTest('Has sections', (sections26.sections?.length || 0) > 0,
      `${sections26.sections?.length} sections found`);

    // Check for expected sections
    const sectionIds = sections26.sections?.map(s => s.id) || [];
    logTest('Has section 26-11 (Authority)', sectionIds.includes('26-11'));
    logTest('Has section 26-21 (Definitions)', sectionIds.includes('26-21'));
  } catch (error) {
    logTest('List Chapter 26 sections', false, `Error: ${error}`);
  }
  console.log('');

  // Test 3: List Chapter 28 Sections
  console.log('3. Testing listCountyCodeSections({ chapter: "28" })');
  console.log('-'.repeat(40));
  try {
    const sections28 = await listCountyCodeSections({ chapter: '28' });

    logTest('Chapter 28 sections loaded', sections28.success);
    logTest('Has sections', (sections28.sections?.length || 0) > 0,
      `${sections28.sections?.length} sections found`);

    // Check for expected sections
    const sectionIds = sections28.sections?.map(s => s.id) || [];
    logTest('Has section 28.01 (Definitions)', sectionIds.includes('28.01'));
    logTest('Has section 28.21.20 (Ag Districts Uses)', sectionIds.includes('28.21.20'));
    logTest('Has section 28.31.20 (Rural Residential Uses)', sectionIds.includes('28.31.20'));

    // Show first few sections
    log('  Sample sections:');
    sections28.sections?.slice(0, 5).forEach(s => {
      log(`    ${s.id}: ${s.title}`);
    });
  } catch (error) {
    logTest('List Chapter 28 sections', false, `Error: ${error}`);
  }
  console.log('');

  // Test 4: Get Specific Sections
  console.log('4. Testing getCountyCodeSections()');
  console.log('-'.repeat(40));
  try {
    // Test single section
    const single = await getCountyCodeSections({ section_ids: ['26-11'] });
    logTest('Single section retrieval', single.success);
    logTest('Section 26-11 has title', !!single.sections?.[0]?.title);
    logTest('Section 26-11 has text', !!single.sections?.[0]?.text);

    // Test batch retrieval
    const batch = await getCountyCodeSections({
      section_ids: ['26-11', '26-12', '28.01', '28.21.20']
    });
    logTest('Batch retrieval (4 sections)', batch.success);
    logTest('All 4 sections returned', batch.sections?.length === 4,
      `Got ${batch.sections?.length} sections`);

    // Test not found handling
    const notFound = await getCountyCodeSections({
      section_ids: ['99-99', '26-11']
    });
    logTest('Handles not found gracefully', notFound.success);
    logTest('Reports not found sections', notFound.not_found?.includes('99-99') ?? false);
  } catch (error) {
    logTest('Get sections', false, `Error: ${error}`);
  }
  console.log('');

  // Test 5: Search County Code
  console.log('5. Testing searchCountyCode()');
  console.log('-'.repeat(40));
  try {
    // Search Chapter 26
    const searchSubdiv = await searchCountyCode({ query: 'subdivision' });
    logTest('Search "subdivision"', searchSubdiv.success);
    logTest('Found matches', (searchSubdiv.total_matches || 0) > 0,
      `${searchSubdiv.total_matches} matches`);

    // Search Chapter 28
    const searchWinery = await searchCountyCode({ query: 'winery', chapter: '28' });
    logTest('Search "winery" in Chapter 28', searchWinery.success);
    logTest('Found winery matches', (searchWinery.total_matches || 0) > 0,
      `${searchWinery.total_matches} matches`);

    // Search for ADU
    const searchADU = await searchCountyCode({ query: 'accessory dwelling' });
    logTest('Search "accessory dwelling"', searchADU.success);
    logTest('Found ADU matches', (searchADU.total_matches || 0) > 0,
      `${searchADU.total_matches} matches`);

    // Show sample results
    if (searchWinery.results && searchWinery.results.length > 0) {
      log('  Sample winery search results:');
      searchWinery.results.slice(0, 3).forEach(r => {
        log(`    ${r.id}: ${r.title} (${r.match_type})`);
      });
    }
  } catch (error) {
    logTest('Search county code', false, `Error: ${error}`);
  }
  console.log('');

  // Test 6: Chapter 28 Zoning Table Content
  console.log('6. Testing Chapter 28 Zoning Tables');
  console.log('-'.repeat(40));
  try {
    const agSection = await getCountyCodeSections({ section_ids: ['28.21.20'] });

    if (agSection.success && agSection.sections?.[0]) {
      const text = agSection.sections[0].text;

      // Check for markdown table indicators
      const hasTableHeader = text.includes('| Use |');
      const hasZoneCodes = text.includes('A-40') && text.includes('A-80');
      const hasPermitTypes = text.includes('| A |') || text.includes('| MUP |') || text.includes('| AP |');
      const hasCropProduction = text.includes('Crop production');
      const hasWinery = text.includes('Winery');

      logTest('Section 28.21.20 has table headers', hasTableHeader);
      logTest('Table includes zone codes (A-40, A-80)', hasZoneCodes);
      logTest('Table includes permit types', hasPermitTypes);
      logTest('Table includes Crop production', hasCropProduction);
      logTest('Table includes Winery uses', hasWinery);

      log(`  Section text length: ${text.length} characters`);

      // Show a snippet of the table
      const tableStart = text.indexOf('| Use |');
      if (tableStart > 0) {
        const snippet = text.slice(tableStart, tableStart + 500);
        log('  Table snippet:');
        snippet.split('\n').slice(0, 8).forEach(line => {
          log(`    ${line}`);
        });
      }
    } else {
      logTest('Section 28.21.20 retrieval', false, 'Section not found');
    }
  } catch (error) {
    logTest('Zoning table content', false, `Error: ${error}`);
  }
  console.log('');

  // Test 7: Chapter 28 Definitions
  console.log('7. Testing Chapter 28 Definitions (28.01)');
  console.log('-'.repeat(40));
  try {
    const defSection = await getCountyCodeSections({ section_ids: ['28.01'] });

    if (defSection.success && defSection.sections?.[0]) {
      const text = defSection.sections[0].text;

      // Check for key definitions
      const hasAccessoryBuilding = text.includes('Accessory building');
      const hasADU = text.includes('Accessory dwelling unit');
      const hasWineryDef = text.includes('Winery') && text.includes('agricultural processing facility');
      const hasSlaughterhouse = text.includes('Slaughterhouse');
      const hasFarmStand = text.includes('Farm Stand');

      logTest('Has Accessory building definition', hasAccessoryBuilding);
      logTest('Has ADU definition', hasADU);
      logTest('Has Winery definition', hasWineryDef);
      logTest('Has Slaughterhouse definition', hasSlaughterhouse);
      logTest('Has Farm Stand definition', hasFarmStand);

      log(`  Definitions section length: ${text.length} characters`);
    } else {
      logTest('Section 28.01 retrieval', false, 'Section not found');
    }
  } catch (error) {
    logTest('Definitions content', false, `Error: ${error}`);
  }
  console.log('');

  // Test 8: Cross-chapter search
  console.log('8. Testing Cross-Chapter Search');
  console.log('-'.repeat(40));
  try {
    // Search term that should appear in both chapters
    const searchMap = await searchCountyCode({ query: 'parcel map' });
    logTest('Search "parcel map"', searchMap.success);

    // Check if results come from multiple chapters
    const chapters = new Set(searchMap.results?.map(r => r.chapter) || []);
    logTest('Found in Chapter 26', chapters.has('26'));

    if (searchMap.results && searchMap.results.length > 0) {
      log('  Results by chapter:');
      const byChapter: Record<string, number> = {};
      searchMap.results.forEach(r => {
        byChapter[r.chapter] = (byChapter[r.chapter] || 0) + 1;
      });
      Object.entries(byChapter).forEach(([ch, count]) => {
        log(`    Chapter ${ch}: ${count} matches`);
      });
    }
  } catch (error) {
    logTest('Cross-chapter search', false, `Error: ${error}`);
  }
  console.log('');

  // Summary
  console.log('='.repeat(60));
  console.log('Test Summary');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;

  console.log(`Passed: ${passed}/${total}`);
  console.log(`Failed: ${failed}/${total}`);

  if (failed > 0) {
    console.log('\nFailed tests:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  ✗ ${r.name}`);
      if (r.details) console.log(`    ${r.details}`);
    });
  }

  console.log('');
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
