/**
 * County Code Tool Definitions
 *
 * Tools for accessing Solano County Code sections.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import {
  getCountyCodeSections,
  listCountyCodeChapters,
  listCountyCodeSections,
  searchCountyCode,
} from '../county-code';

export const getCountyCodeSectionsTool = defineTool({
  name: 'get_county_code_sections',
  description: `Retrieve the full text of specific sections from the Solano County Code.

WHEN TO USE THIS TOOL:
- User asks about subdivision requirements, procedures, or definitions
- User asks about zoning regulations, allowed uses, or permit requirements
- User needs exact legal language from the county code
- User asks "what does the code say about..." something specific
- You need to cite specific regulations in your response

STRATEGY - Batch multiple sections in one call:
If a user asks about "subdivision exemptions", retrieve sections 26-15, 26-15.1, and 26-15.2 together.
If discussing zoning, retrieve the relevant district section (e.g., 28.21.20 for Agricultural districts).

CURRENTLY AVAILABLE:
- Chapter 19: Parks, Recreation and Other Public Property (31 sections)
  - Article I: Parks, Playgrounds and Recreation Fund
  - Article II: In General (definitions, enforcement, boating, swimming, vehicles, pets, prohibited acts)
  - Article III: Camping or Squatting
  - Article IV: Use of Public Property
- Chapter 23: Refuse and Garbage (28 sections)
  - Articles I-VII: Definitions, storage, collections, disposal sites, fees, appeals, enforcement
- Chapter 24: Roads, Streets and Other Public Property (16 sections)
  - Article I: Encroachments (permits for work on county roads)
  - Article II: Terminal Access Routes
  - Article III: Working of Prisoners on Public Works
  - Article IV: Travel Reduction Requirements
- Chapter 26: Subdivisions (41 sections)
  - Sections 26-11 through 26-15.3: Authority, purpose, application, exemptions, fees
  - Sections 26-21 through 26-21.32: All subdivision-related definitions
- Chapter 26.5: Underground Utilities (10 sections)
  - Underground utility district establishment, requirements, responsibilities
- Chapter 28: Zoning Regulations (166 sections)
  - Article I (28.01-28.05): General provisions, definitions
  - Article II (28.10-28.69): Districts and allowed uses
    - 28.21.x: Agricultural (A-40, A-80, A-20, A-160) districts
    - 28.22.x: Suisun Marsh Agricultural district
    - 28.23.x: Suisun Valley Agricultural district
    - 28.31.x: Rural Residential (R-R-5, R-R-10) districts
    - 28.32.x: Residential-Traditional Community district
    - 28.41.x: Commercial (C) district
    - 28.61.x: Park (P) district
  - Article III (28.70-28.82): Land Use Regulations (specific use requirements)
    - 28.71: Agricultural uses
    - 28.72: Residential uses (including ADUs)
    - 28.73: Recreation, education, public assembly
    - 28.74: Retail and office uses
    - 28.75: Tourist uses (agritourism, vacation rentals)
    - 28.76: Commercial services
    - 28.80-28.82: Wind energy, wireless facilities, cannabis
  - Article IV (28.90-28.99): Site Development Standards
    - 28.91: Architectural standards
    - 28.94: Parking requirements
    - 28.96: Signs
    - 28.97: Yards and setbacks
  - Article V (28.100-28.119): Operations (permits, procedures)
    - 28.101: Administrative Permit (AP)
    - 28.106: Use Permit (MUP/UP)
    - 28.107: Variance
    - 28.112: Appeals
- Chapter 30: Address Numbering System (9 sections)
  - Articles I-V: System description, numbering, road naming, road signs, penalties
- Chapter 31: Grading, Drainage, Land Leveling, and Erosion Control (22 sections)
  - Article I: Title, Purpose and General Provisions (definitions, appeals, fees)
  - Article II: Procedure (permit requirements, exemptions, minor/major permits)
  - Article III: Design Principles and Standards
  - Article IV: Implementation and Enforcement

SECTION ID FORMAT: "26-11", "28.21.20", "28.01" (chapter-section or chapter.section.subsection)

OUTPUT: Full section text with title, chapter info. For allowed uses sections, includes
markdown tables showing permit requirements (A/AP/MUP/UP) by zoning district.

TIP: If unsure which sections to retrieve, use search_county_code first to find relevant sections.`,
  schema: {
    section_ids: z.array(z.string()).describe('Array of section IDs to retrieve (e.g., ["26-11", "26-21.3"])'),
  },
  handler: async ({ section_ids }) => {
    const result = await getCountyCodeSections({ section_ids });
    return jsonResponse(result);
  },
});

export const listCountyCodeChaptersTool = defineTool({
  name: 'list_county_code_chapters',
  description: `List all available chapters in the Solano County Code database.

WHEN TO USE:
- To discover what county code content is available
- When user asks broadly about "the county code" without specifics
- To provide overview of code coverage

Returns chapter numbers, titles, and counts of articles/sections.`,
  schema: {},
  handler: async () => {
    const result = await listCountyCodeChapters();
    return jsonResponse(result);
  },
});

export const listCountyCodeSectionsTool = defineTool({
  name: 'list_county_code_sections',
  description: `List all sections within a specific chapter of the Solano County Code.

WHEN TO USE:
- User wants to browse what's in a chapter
- You need to find the right section ID before retrieving full text
- User asks "what sections cover [topic]" within a known chapter

Returns section IDs and titles (not full text - use get_county_code_sections for that).`,
  schema: {
    chapter: z.string().describe('Chapter number (e.g., "26" for Subdivisions)'),
  },
  handler: async ({ chapter }) => {
    const result = await listCountyCodeSections({ chapter });
    return jsonResponse(result);
  },
});

export const searchCountyCodeTool = defineTool({
  name: 'search_county_code',
  description: `Search the Solano County Code by keyword.

WHEN TO USE:
- User asks about a topic but you don't know which sections cover it
- Need to find relevant sections before retrieving full text
- User uses terminology that might appear in multiple sections

STRATEGY:
1. Search for key terms from the user's question
2. Review the matching section titles and snippets
3. Use get_county_code_sections to retrieve full text of relevant sections

Returns matching sections with snippets showing context around matches.
Title matches are ranked higher than text matches.`,
  schema: {
    query: z.string().describe('Search term (e.g., "lot line adjustment", "parcel map", "exemption")'),
    chapter: z.string().optional().describe('Limit search to specific chapter'),
    max_results: z.number().optional().describe('Maximum results to return (default: 10)'),
  },
  handler: async ({ query, chapter, max_results }) => {
    const result = await searchCountyCode({ query, chapter, max_results });
    return jsonResponse(result);
  },
});

/** All county code tools */
export const countyCodeTools = [
  getCountyCodeSectionsTool,
  listCountyCodeChaptersTool,
  listCountyCodeSectionsTool,
  searchCountyCodeTool,
];
