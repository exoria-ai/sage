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
} from '../lib/tools/meetings';

async function main() {
  console.log('='.repeat(60));
  console.log('Testing Meeting Minutes Tools');
  console.log('='.repeat(60));

  // Test 1: Overview
  console.log('\n1. getMeetingsOverview()');
  const overview = await getMeetingsOverview();
  console.log(`   Committee: ${overview.committee}`);
  console.log(`   Total meetings: ${overview.total_meetings}`);
  console.log(`   Total chunks: ${overview.total_chunks}`);
  console.log(`   Date range: ${overview.date_range.earliest} to ${overview.date_range.latest}`);
  console.log('   Meetings by year:', overview.meetings_by_year);

  // Test 2: List meetings
  console.log('\n2. listMeetings({ year: 2024 })');
  const meetings2024 = await listMeetings({ year: 2024 });
  console.log(`   Found ${meetings2024.count} meetings in 2024`);
  if (meetings2024.meetings.length > 0) {
    console.log(`   First: ${meetings2024.meetings[0].meeting_id}`);
    console.log(`   Has agenda: ${meetings2024.meetings[0].has_agenda}, Has minutes: ${meetings2024.meetings[0].has_minutes}`);
  }

  // Test 3: Search
  console.log('\n3. searchMeetingMinutes({ query: "aerial imagery" })');
  const searchResults = await searchMeetingMinutes({ query: 'aerial imagery', top_k: 3 });
  console.log(`   Total results: ${searchResults.total_results}`);
  for (const result of searchResults.results) {
    console.log(`   - ${result.meeting_date}: "${result.item_title}" (score: ${result.score})`);
    console.log(`     Preview: ${result.text_preview.slice(0, 100)}...`);
  }

  // Test 4: Search with date filter
  console.log('\n4. searchMeetingMinutes({ query: "parcel", date_from: "2025-01-01" })');
  const searchRecent = await searchMeetingMinutes({
    query: 'parcel',
    date_from: '2025-01-01',
    top_k: 3
  });
  console.log(`   Total results: ${searchRecent.total_results}`);
  for (const result of searchRecent.results) {
    console.log(`   - ${result.meeting_date}: score ${result.score}`);
  }

  // Test 5: Get specific meeting
  console.log('\n5. getMeeting({ meeting_id: "regis-2026-01-21" })');
  const meeting = await getMeeting({ meeting_id: 'regis-2026-01-21' });
  console.log(`   Date: ${meeting.meeting_date}`);
  console.log(`   Chunks: ${meeting.chunk_count}`);
  for (const chunk of meeting.chunks.slice(0, 3)) {
    console.log(`   - Item ${chunk.item_number}: ${chunk.item_title} (${chunk.document_type})`);
  }

  // Test 6: Get chunk by ID
  if (searchResults.results.length > 0) {
    const chunkId = searchResults.results[0].id;
    console.log(`\n6. getMeetingChunk({ chunk_id: "${chunkId}" })`);
    const chunk = await getMeetingChunk({ chunk_id: chunkId });
    if (chunk.success && chunk.chunk) {
      console.log(`   Date: ${chunk.chunk.meeting_date}`);
      console.log(`   Type: ${chunk.chunk.document_type}`);
      console.log(`   Text length: ${chunk.chunk.text.length} chars`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('All tests passed!');
  console.log('='.repeat(60));
}

main().catch(console.error);
