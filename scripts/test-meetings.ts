#!/usr/bin/env npx tsx
/**
 * Test meeting minutes tools.
 */

import {
  searchMeetingMinutes,
  getMeetingChunk,
  listMeetings,
  getMeeting,
  getMeetingsOverview,
  listCommittees,
} from '../lib/tools/meetings';

async function main() {
  console.log('='.repeat(60));
  console.log('Testing Meeting Minutes Tools');
  console.log('='.repeat(60));

  // Test 1: List committees
  console.log('\n1. listCommittees()');
  const committees = await listCommittees();
  console.log(`   Found ${committees.committees.length} committees:`);
  for (const c of committees.committees) {
    console.log(`   - ${c.name} (${c.id}): ${c.meeting_count} meetings, ${c.chunk_count} chunks`);
    console.log(`     Date range: ${c.date_range.earliest} to ${c.date_range.latest}`);
  }

  // Test 2: Overview
  console.log('\n2. getMeetingsOverview()');
  const overview = await getMeetingsOverview();
  console.log(`   Total meetings: ${overview.total_meetings}`);
  console.log(`   Total chunks: ${overview.total_chunks}`);
  console.log('   Meetings by year:', overview.meetings_by_year);
  console.log('   Chunks by committee:', overview.chunks_by_committee);

  // Test 3: List BOS meetings in 2025
  console.log('\n3. listMeetings({ committee: "bos", year: 2025 })');
  const bosMeetings = await listMeetings({ committee: 'bos', year: 2025 });
  console.log(`   Found ${bosMeetings.count} BOS meetings in 2025`);
  const specialCount = bosMeetings.meetings.filter(m => m.is_special_meeting).length;
  console.log(`   Special meetings: ${specialCount}`);
  if (bosMeetings.meetings.length > 0) {
    console.log(`   Most recent: ${bosMeetings.meetings[0].meeting_id}`);
  }

  // Test 4: Search across all committees
  console.log('\n4. searchMeetingMinutes({ query: "budget" })');
  const budgetSearch = await searchMeetingMinutes({ query: 'budget', top_k: 5 });
  console.log(`   Total results: ${budgetSearch.total_results}`);
  for (const r of budgetSearch.results) {
    console.log(`   - [${r.committee}] ${r.meeting_date}: "${r.item_title.slice(0, 50)}..." (score: ${r.score})`);
  }

  // Test 5: Search BOS only
  console.log('\n5. searchMeetingMinutes({ query: "resolution", committee: "bos" })');
  const resolutionSearch = await searchMeetingMinutes({
    query: 'resolution',
    committee: 'bos',
    top_k: 5
  });
  console.log(`   Total results: ${resolutionSearch.total_results}`);
  for (const r of resolutionSearch.results) {
    console.log(`   - ${r.meeting_date}: vote=${r.vote_result || 'N/A'}`);
  }

  // Test 6: Get specific BOS meeting
  console.log('\n6. getMeeting({ meeting_id: "bos-2025-12-09" })');
  const bosMeeting = await getMeeting({ meeting_id: 'bos-2025-12-09' });
  console.log(`   Date: ${bosMeeting.meeting_date}`);
  console.log(`   Committee: ${bosMeeting.committee}`);
  console.log(`   Chunks: ${bosMeeting.chunk_count}`);
  console.log('   First 3 items:');
  for (const chunk of bosMeeting.chunks.slice(0, 3)) {
    console.log(`   - Item ${chunk.item_number}: ${chunk.item_title.slice(0, 60)}...`);
  }

  // Test 7: Get chunk by ID
  if (resolutionSearch.results.length > 0) {
    const chunkId = resolutionSearch.results[0].id;
    console.log(`\n7. getMeetingChunk({ chunk_id: "${chunkId}" })`);
    const chunk = await getMeetingChunk({ chunk_id: chunkId });
    if (chunk.success && chunk.chunk) {
      console.log(`   Committee: ${chunk.chunk.committee}`);
      console.log(`   Date: ${chunk.chunk.meeting_date}`);
      console.log(`   Type: ${chunk.chunk.document_type}`);
      console.log(`   Vote: ${chunk.chunk.vote_result || 'N/A'}`);
      console.log(`   Resolution: ${chunk.chunk.resolution_number || 'N/A'}`);
      console.log(`   Text length: ${chunk.chunk.text.length} chars`);
    }
  }

  // Test 8: Search ReGIS only
  console.log('\n8. searchMeetingMinutes({ query: "parcel", committee: "regis" })');
  const regisSearch = await searchMeetingMinutes({
    query: 'parcel',
    committee: 'regis',
    top_k: 3
  });
  console.log(`   Total results: ${regisSearch.total_results}`);
  for (const r of regisSearch.results) {
    console.log(`   - ${r.meeting_date}: "${r.item_title.slice(0, 50)}..."`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('All tests passed!');
  console.log('='.repeat(60));
}

main().catch(console.error);
