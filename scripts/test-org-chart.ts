/**
 * Test script for org chart MCP tools.
 *
 * Run with: npx tsx scripts/test-org-chart.ts
 */

import {
  getOrgOverview,
  getDepartment,
  searchPositions,
  getPositionDistribution,
  getDivision,
  listJobClasses,
  compareDepartments,
} from '../lib/tools/org-chart';

async function runTests() {
  console.log('Testing org chart MCP tools...\n');

  // Test 1: Overview (compact)
  console.log('--- Test 1: getOrgOverview ---');
  const overview = await getOrgOverview();
  console.log(`As of: ${overview.asOf}`);
  console.log(`Total FTE: ${overview.totalFte} (LT: ${overview.ltFte})`);
  console.log(`Departments: ${overview.departmentCount}, Divisions: ${overview.divisionCount}`);
  console.log('Top 5 by FTE:');
  overview.departments.slice(0, 5).forEach(d =>
    console.log(`  ${d.code} ${d.name}: ${d.fte} FTE`)
  );
  console.log();

  // Test 2: Get department (minimal)
  console.log('--- Test 2: getDepartment (minimal) ---');
  const sheriffMinimal = await getDepartment({ code_or_name: 'sheriff' });
  if (sheriffMinimal.success && sheriffMinimal.department) {
    const d = sheriffMinimal.department;
    console.log(`${d.name}: ${d.totalFte} FTE, ${d.divisions.length} divisions`);
    console.log('Top positions (aggregated):');
    d.topPositions.slice(0, 5).forEach(p =>
      console.log(`  ${p.title}: ${p.fte} FTE`)
    );
  }
  console.log();

  // Test 3: Get department (with positions)
  console.log('--- Test 3: getDepartment (with positions) ---');
  const libraryFull = await getDepartment({
    code_or_name: 'library',
    include_positions: true
  });
  if (libraryFull.success && libraryFull.department) {
    const d = libraryFull.department;
    console.log(`${d.name}: ${d.totalFte} FTE`);
    console.log(`First division positions:`);
    const firstDiv = d.divisions[0];
    if (firstDiv && firstDiv.positions) {
      firstDiv.positions.slice(0, 3).forEach(p =>
        console.log(`  ${p.title}: ${p.fte} FTE (Grade: ${p.grade || 'N/A'})`)
      );
    }
  }
  console.log();

  // Test 4: Search positions
  console.log('--- Test 4: searchPositions ---');
  const socialWorkers = await searchPositions({ query: 'social worker', limit: 5 });
  console.log(`"social worker": ${socialWorkers.totalMatches} matches, ${socialWorkers.totalFte} total FTE`);
  socialWorkers.results.forEach(r =>
    console.log(`  ${r.title}: ${r.fte} FTE (${r.department})`)
  );
  console.log();

  // Test 5: Search with department filter
  console.log('--- Test 5: searchPositions (filtered) ---');
  const daAttorneys = await searchPositions({
    query: 'attorney',
    department: 'district attorney',
    limit: 5
  });
  console.log(`"attorney" in DA: ${daAttorneys.totalMatches} matches`);
  daAttorneys.results.forEach(r =>
    console.log(`  ${r.title}: ${r.fte} FTE`)
  );
  console.log();

  // Test 6: Position distribution
  console.log('--- Test 6: getPositionDistribution ---');
  const officeAssist = await getPositionDistribution({ title: 'office assistant' });
  console.log(`"office assistant": ${officeAssist.totalFte} total FTE`);
  console.log('Top 3 departments:');
  officeAssist.byDepartment.slice(0, 3).forEach(d =>
    console.log(`  ${d.department}: ${d.fte} FTE (${d.divisions.length} divisions)`)
  );
  console.log();

  // Test 7: Get division
  console.log('--- Test 7: getDivision ---');
  const custody = await getDivision({ code: '6552' });
  if (custody.success && custody.division) {
    const d = custody.division;
    console.log(`${d.name}: ${d.fte} FTE (${d.department.name})`);
    console.log('Top 3 positions:');
    d.positions.slice(0, 3).forEach(p =>
      console.log(`  ${p.title}: ${p.fte} FTE`)
    );
  }
  console.log();

  // Test 8: List job classes
  console.log('--- Test 8: listJobClasses ---');
  const analysts = await listJobClasses({ search: 'analyst', limit: 5 });
  console.log(`"analyst" classes: ${analysts.total} total`);
  analysts.results.forEach(c =>
    console.log(`  ${c.jobCode} ${c.title}: Grade ${c.grade}`)
  );
  console.log();

  // Test 9: Compare departments
  console.log('--- Test 9: compareDepartments ---');
  const compare = await compareDepartments({
    departments: ['sheriff', 'probation', 'district attorney']
  });
  console.log('Public Safety Comparison:');
  compare.comparison.forEach(d => {
    console.log(`  ${d.name}: ${d.totalFte} FTE, ${d.divisionCount} divs`);
    console.log(`    Top: ${d.topPositions[0]?.title} (${d.topPositions[0]?.fte} FTE)`);
  });
  console.log();

  // Validation
  console.log('--- Validation ---');
  const expectedTotal = 3284.2;
  if (Math.abs(overview.totalFte - expectedTotal) < 0.1) {
    console.log(`✓ Total FTE matches: ${overview.totalFte}`);
  } else {
    console.log(`✗ Total FTE mismatch: ${overview.totalFte} vs expected ${expectedTotal}`);
  }

  const hss = overview.departments.find(d => d.name.includes('HEALTH & SOCIAL'));
  if (hss && hss.fte > 1400) {
    console.log(`✓ H&SS is largest: ${hss.fte} FTE`);
  }

  console.log('\n✓ All tests completed');
}

runTests().catch(console.error);
