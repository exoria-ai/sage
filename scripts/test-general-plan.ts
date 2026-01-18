#!/usr/bin/env npx tsx
/**
 * Test script for General Plan search tools.
 *
 * Usage:
 *   npx tsx scripts/test-general-plan.ts
 */

import {
  searchGeneralPlan,
  getGeneralPlanChunk,
  listGeneralPlanChapters,
  listGeneralPlanDocuments,
  getGeneralPlanChapter,
  getGeneralPlanOverview,
  searchGeneralPlanPolicies,
} from '../lib/tools/general-plan';

async function main() {
  console.log('='.repeat(60));
  console.log('Testing General Plan Tools');
  console.log('='.repeat(60));
  console.log();

  // Test 1: Overview
  console.log('1. Get General Plan Overview');
  console.log('-'.repeat(40));
  const overview = await getGeneralPlanOverview();
  console.log(`   Collection: ${overview.collection}`);
  console.log(`   Total chunks: ${overview.total_chunks}`);
  console.log(`   Document types:`, overview.chunks_by_document_type);
  console.log(`   Chunk types:`, overview.chunks_by_chunk_type);
  console.log(`   Chapters: ${overview.chapters.length}`);
  console.log();

  // Test 2: List chapters
  console.log('2. List Chapters');
  console.log('-'.repeat(40));
  const chapters = await listGeneralPlanChapters();
  for (const ch of chapters.chapters) {
    console.log(`   Chapter ${ch.chapter_number}: ${ch.title} (${ch.chunk_count} chunks)`);
  }
  console.log();

  // Test 3: List documents
  console.log('3. List Document Types');
  console.log('-'.repeat(40));
  const docs = await listGeneralPlanDocuments();
  for (const doc of docs.documents) {
    console.log(`   ${doc.document_type}: ${doc.chunk_count} chunks, ${doc.titles.length} unique documents`);
  }
  console.log();

  // Test 4: Search for ADU
  console.log('4. Search: "accessory dwelling unit ADU"');
  console.log('-'.repeat(40));
  const aduSearch = await searchGeneralPlan({ query: 'accessory dwelling unit ADU', top_k: 3 });
  console.log(`   Found ${aduSearch.total_results} results`);
  for (const r of aduSearch.results) {
    console.log(`   - [${r.score}] ${r.document_title} (${r.chunk_type})`);
    console.log(`     ${r.text_preview.slice(0, 100)}...`);
  }
  console.log();

  // Test 5: Search for agricultural preservation
  console.log('5. Search: "agricultural preservation farmland"');
  console.log('-'.repeat(40));
  const agSearch = await searchGeneralPlan({ query: 'agricultural preservation farmland', top_k: 3, document_type: 'chapter' });
  console.log(`   Found ${agSearch.total_results} results (chapters only)`);
  for (const r of agSearch.results) {
    console.log(`   - [${r.score}] Chapter ${r.chapter}: ${r.section_title || 'General'}`);
  }
  console.log();

  // Test 6: Search policies
  console.log('6. Search Policies: "housing density"');
  console.log('-'.repeat(40));
  const policySearch = await searchGeneralPlanPolicies({ query: 'housing density', top_k: 3 });
  console.log(`   Found ${policySearch.total_results} policy chunks`);
  for (const r of policySearch.results) {
    console.log(`   - [${r.score}] ${r.document_title}`);
    console.log(`     ${r.text_preview.slice(0, 150)}...`);
  }
  console.log();

  // Test 7: Get a specific chunk
  if (aduSearch.results.length > 0) {
    console.log('7. Get Specific Chunk');
    console.log('-'.repeat(40));
    const chunkId = aduSearch.results[0]!.id;
    const chunk = await getGeneralPlanChunk({ chunk_id: chunkId });
    if (chunk.success && chunk.chunk) {
      console.log(`   ID: ${chunk.chunk.id}`);
      console.log(`   Document: ${chunk.chunk.document_title}`);
      console.log(`   Pages: ${chunk.chunk.page_start}-${chunk.chunk.page_end}`);
      console.log(`   Type: ${chunk.chunk.chunk_type}`);
      console.log(`   Keywords: ${chunk.chunk.keywords.join(', ')}`);
      console.log(`   Text length: ${chunk.chunk.text.length} chars`);
    }
    console.log();
  }

  // Test 8: Get chapter content
  console.log('8. Get Chapter 2 (Land Use) - summary');
  console.log('-'.repeat(40));
  const ch2 = await getGeneralPlanChapter({ chapter: '2', include_tables: false });
  console.log(`   Title: ${ch2.title}`);
  console.log(`   Total chunks: ${ch2.chunk_count}`);
  console.log(`   First 3 sections:`);
  for (const c of ch2.chunks.slice(0, 3)) {
    console.log(`   - Pages ${c.pages}: ${c.section_title || 'Untitled'} (${c.chunk_type})`);
  }
  console.log();

  // Test 9: Search for flood
  console.log('9. Search: "flood hazard zone"');
  console.log('-'.repeat(40));
  const floodSearch = await searchGeneralPlan({ query: 'flood hazard zone', top_k: 3 });
  console.log(`   Found ${floodSearch.total_results} results`);
  for (const r of floodSearch.results) {
    console.log(`   - [${r.score}] ${r.document_title} (Ch. ${r.chapter || 'N/A'})`);
  }
  console.log();

  // Test 10: Search for Suisun
  console.log('10. Search: "Suisun Marsh protection"');
  console.log('-'.repeat(40));
  const suisunSearch = await searchGeneralPlan({ query: 'Suisun Marsh protection', top_k: 3 });
  console.log(`   Found ${suisunSearch.total_results} results`);
  for (const r of suisunSearch.results) {
    console.log(`   - [${r.score}] ${r.document_title}`);
  }
  console.log();

  console.log('='.repeat(60));
  console.log('All tests completed!');
  console.log('='.repeat(60));
}

main().catch(console.error);
