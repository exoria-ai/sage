#!/usr/bin/env npx tsx
/**
 * Practical Query Tests for County Code MCP
 *
 * Tests realistic user questions that the LLM would need to answer:
 * 1. "Can I build a winery on A-40 land?"
 * 2. "What permits do I need for an ADU?"
 * 3. "What's the definition of a small winery?"
 * 4. "Can I have chickens on my rural residential property?"
 */

import {
  getCountyCodeSections,
  searchCountyCode,
} from '../lib/tools/county-code';

console.log('='.repeat(70));
console.log('Practical Query Tests - Simulating Real User Questions');
console.log('='.repeat(70));
console.log('');

async function testWineryPermits() {
  console.log('Q: "Can I build a winery on A-40 zoned land?"');
  console.log('-'.repeat(50));

  // Step 1: Search for winery in zoning code
  const search = await searchCountyCode({ query: 'winery', chapter: '28' });
  console.log(`Search found ${search.total_matches} matches for "winery"`);

  // Step 2: Get the agricultural district allowed uses table
  const section = await getCountyCodeSections({ section_ids: ['28.21.20'] });

  if (section.success && section.sections?.[0]) {
    const text = section.sections[0].text;

    // Extract winery-related rows from the table
    const lines = text.split('\n');
    const wineryLines = lines.filter(line =>
      line.toLowerCase().includes('winery') && line.includes('|')
    );

    console.log('\nWinery permit requirements from Table 28.21A:');
    wineryLines.forEach(line => {
      console.log(`  ${line.trim()}`);
    });

    // Check for small winery specifically
    const smallWinery = wineryLines.find(l => l.toLowerCase().includes('small'));
    if (smallWinery && smallWinery.includes('| A |')) {
      console.log('\n✓ Answer: Small wineries (≤20,000 gal/yr) with 25%+ on-site grapes are ALLOWED BY RIGHT (A) in A-40');
    } else if (smallWinery) {
      console.log('\n→ Small winery permit type:', smallWinery);
    }
  }

  console.log('');
}

async function testADURequirements() {
  console.log('Q: "What are the requirements for building an ADU?"');
  console.log('-'.repeat(50));

  // Step 1: Get the ADU definition
  const defSection = await getCountyCodeSections({ section_ids: ['28.01'] });

  if (defSection.success && defSection.sections?.[0]) {
    const text = defSection.sections[0].text;

    // Find ADU definition
    const aduStart = text.indexOf('Accessory dwelling unit.');
    if (aduStart > 0) {
      const aduEnd = text.indexOf('.', aduStart + 50);
      const aduDef = text.slice(aduStart, aduEnd + 1);
      console.log('Definition from 28.01:');
      console.log(`  ${aduDef.slice(0, 300)}...`);
    }
  }

  // Step 2: Search for ADU in residential district
  const search = await searchCountyCode({ query: 'accessory dwelling', chapter: '28' });
  console.log(`\nFound ${search.total_matches} sections mentioning ADUs`);

  // Step 3: Check residential district for ADU permits
  const rrSection = await getCountyCodeSections({ section_ids: ['28.31.20'] });
  if (rrSection.success && rrSection.sections?.[0]) {
    const text = rrSection.sections[0].text;
    if (text.includes('Accessory dwelling') || text.includes('ADU')) {
      console.log('✓ ADU provisions found in Rural Residential district (28.31.20)');
    }
  }

  console.log('');
}

async function testWineryDefinition() {
  console.log('Q: "What\'s the definition of a small vs large winery?"');
  console.log('-'.repeat(50));

  const defSection = await getCountyCodeSections({ section_ids: ['28.01'] });

  if (defSection.success && defSection.sections?.[0]) {
    const text = defSection.sections[0].text;

    // Find winery definitions
    const wineryTypes = ['Winery.', 'Winery, small.', 'Winery, medium:', 'Winery, large.'];

    wineryTypes.forEach(type => {
      const start = text.indexOf(type);
      if (start > 0) {
        // Find the end of this definition (next definition or period after 50 chars)
        let end = text.indexOf('Winery', start + type.length);
        if (end < 0 || end > start + 500) {
          end = start + 300;
        }
        const def = text.slice(start, end).trim();
        console.log(`\n${def}`);
      }
    });
  }

  console.log('');
}

async function testChickensRuralResidential() {
  console.log('Q: "Can I have chickens on my R-R-5 property?"');
  console.log('-'.repeat(50));

  // Get rural residential allowed uses
  const section = await getCountyCodeSections({ section_ids: ['28.31.20'] });

  if (section.success && section.sections?.[0]) {
    const text = section.sections[0].text;

    // Look for fowl/poultry/chicken mentions
    const lines = text.split('\n');
    const fowlLines = lines.filter(line =>
      (line.toLowerCase().includes('fowl') ||
        line.toLowerCase().includes('poultry') ||
        line.toLowerCase().includes('chicken')) &&
      line.includes('|')
    );

    if (fowlLines.length > 0) {
      console.log('Fowl/Poultry provisions in R-R district:');
      fowlLines.forEach(line => {
        console.log(`  ${line.trim()}`);
      });
    }

    // Also check for animal-related categories
    const animalLines = lines.filter(line =>
      line.toLowerCase().includes('animal') && line.includes('|')
    );

    if (animalLines.length > 0) {
      console.log('\nAnimal-related uses:');
      animalLines.slice(0, 5).forEach(line => {
        console.log(`  ${line.trim()}`);
      });
    }
  }

  // Check definitions for crowing fowl
  const defSection = await getCountyCodeSections({ section_ids: ['28.01'] });
  if (defSection.success && defSection.sections?.[0]) {
    const text = defSection.sections[0].text;
    const crowingStart = text.indexOf('Crowing Fowl.');
    if (crowingStart > 0) {
      const crowingEnd = text.indexOf('.', crowingStart + 20);
      console.log('\nDefinition of Crowing Fowl:');
      console.log(`  ${text.slice(crowingStart, crowingEnd + 1)}`);
    }
  }

  console.log('');
}

async function testSlaughterhousePermits() {
  console.log('Q: "What permit do I need for a small slaughterhouse on agricultural land?"');
  console.log('-'.repeat(50));

  const section = await getCountyCodeSections({ section_ids: ['28.21.20'] });

  if (section.success && section.sections?.[0]) {
    const text = section.sections[0].text;

    const lines = text.split('\n');
    const slaughterLines = lines.filter(line =>
      line.toLowerCase().includes('slaughter') && line.includes('|')
    );

    if (slaughterLines.length > 0) {
      console.log('Slaughterhouse permit requirements:');
      slaughterLines.forEach(line => {
        console.log(`  ${line.trim()}`);
      });
    }
  }

  // Get definition
  const defSection = await getCountyCodeSections({ section_ids: ['28.01'] });
  if (defSection.success && defSection.sections?.[0]) {
    const text = defSection.sections[0].text;
    const smallStart = text.indexOf('Slaughterhouse, small.');
    if (smallStart > 0) {
      const smallEnd = text.indexOf('.', smallStart + 30);
      console.log('\nDefinition:');
      console.log(`  ${text.slice(smallStart, smallEnd + 1)}`);
    }
  }

  console.log('');
}

async function testFarmStandRequirements() {
  console.log('Q: "Can I have a farm stand to sell produce?"');
  console.log('-'.repeat(50));

  // Search for farm stand
  const search = await searchCountyCode({ query: 'farm stand', chapter: '28' });
  console.log(`Found ${search.total_matches} mentions of "farm stand"`);

  if (search.results && search.results.length > 0) {
    console.log('\nRelevant sections:');
    search.results.slice(0, 3).forEach(r => {
      console.log(`  ${r.id}: ${r.title}`);
    });
  }

  // Get definition
  const defSection = await getCountyCodeSections({ section_ids: ['28.01'] });
  if (defSection.success && defSection.sections?.[0]) {
    const text = defSection.sections[0].text;
    const start = text.indexOf('Farm Stand.');
    if (start > 0) {
      const end = text.indexOf('Farmers Market', start);
      const def = text.slice(start, end > start ? end : start + 500);
      console.log('\nDefinition from 28.01:');
      console.log(`  ${def.slice(0, 400)}...`);
    }
  }

  // Check agricultural district for permit requirements
  const agSection = await getCountyCodeSections({ section_ids: ['28.21.20'] });
  if (agSection.success && agSection.sections?.[0]) {
    const text = agSection.sections[0].text;
    const lines = text.split('\n');
    const farmStandLines = lines.filter(line =>
      line.toLowerCase().includes('farm stand') ||
      line.toLowerCase().includes('roadside stand')
    );

    if (farmStandLines.length > 0) {
      console.log('\nFarm Stand in allowed uses table:');
      farmStandLines.forEach(line => {
        if (line.includes('|')) {
          console.log(`  ${line.trim()}`);
        }
      });
    }
  }

  console.log('');
}

async function runAllTests() {
  try {
    await testWineryPermits();
    await testADURequirements();
    await testWineryDefinition();
    await testChickensRuralResidential();
    await testSlaughterhousePermits();
    await testFarmStandRequirements();

    console.log('='.repeat(70));
    console.log('All practical query tests completed');
    console.log('='.repeat(70));
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

runAllTests();
