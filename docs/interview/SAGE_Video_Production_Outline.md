# SAGE Video Production Outline

## Topic 7: Agentic Artificial Intelligence and GIS

**Target Length**: 10-12 minutes
**Deadline**: Noon PST, Monday January 26, 2026
**Format**: YouTube (Public or Unlisted)

---

## Scoring Rubric Alignment

Every segment must address these criteria:

| Criteria | How We'll Demonstrate It |
|----------|-------------------------|
| **Technical Depth** | MCP server architecture, dual deployment (dev/prod), ArcGIS REST queries, embedded SQLite databases, serverless geoprocessing |
| **Use of GIS Tools** | Live queries against Solano County's actual GIS infrastructure, FEMA NFHL, CAL FIRE FHSZ, 7 city zoning services |
| **Analysis/Output Quality** | Property reports, hazard assessments, notification lists, buffer maps, regulatory citations |
| **Communication** | Clear narrative arc, plain-English explanations, visual architecture diagrams |
| **Relevance to Role** | Solano-specific scenarios, jurisdiction routing, county code lookups, budget analysis, Principal-level judgment |

---

## What SAGE Actually Does (Current Implementation)

SAGE is an MCP server with **40+ tools** across **13 categories**, plus an interactive web map and serverless geoprocessing:

### GIS & Property Tools (8 core + 2 search)
- `geocode_address` - Address → coordinates + APN
- `get_parcel_details` - Property info, assessed values, ownership (89 fields)
- `get_zoning` - Zoning with **automatic jurisdiction routing** (county + 7 cities)
- `get_flood_zone` - FEMA flood zone + insurance implications
- `get_fire_hazard_zone` - CAL FIRE FHSZ + defensible space requirements
- `get_supervisor_district` - Board of Supervisors district
- `get_special_districts` - Fire, water, school districts
- `get_nearby` - Schools, parks, fire stations within radius
- `search_parcels` - Query by zoning, use, acreage, value with aggregations
- `get_parcels_in_buffer` - Notification list generation (radius search)

### County Code Tools (4 tools)
- `search_county_code` - Full-text search across 8 chapters, 323 sections
- `get_county_code_sections` - Retrieve full text with proper formatting
- `list_county_code_chapters` - Browse available chapters
- `list_county_code_sections` - Browse sections within a chapter

### General Plan Tools (7 tools)
- `search_general_plan` - Semantic search across 1,345 chunks
- `search_general_plan_policies` - Policy-specific search (282 policies)
- `get_general_plan_chunk` - Retrieve chunk by ID
- `get_general_plan_chapter` - Full chapter content
- `list_general_plan_chapters` / `list_general_plan_documents` - Browse structure
- `get_general_plan_overview` - Document statistics

### Budget & Organization Tools (13 tools)
- `search_budget` - Semantic search of FY25-26 Recommended Budget
- `get_budget_chunk` / `get_department_budget` - Retrieve budget details
- `list_budget_departments` / `list_budget_sections` - Browse structure
- `get_org_overview` - County org chart (21 depts, 3,284 FTE)
- `get_department` / `get_division` - Department/division details
- `search_positions` - Search 399 job classifications
- `compare_departments` - Side-by-side department comparison

### Mapping & Visualization Tools (4 tools)
- `render_map` - Static map images with parcel highlighting, buffers, overlays
- `get_interactive_map_url` - Live map with presets (base, hazards, zoning, districts)
- `generate_infographic` - AI image generation
- `edit_image` - Image editing/compositing

### Routing Tools (2 tools)
- `get_directions` - Turn-by-turn directions
- `get_travel_time` - Distance and time estimates

### GIS Layer Discovery (5 tools)
- `list_gis_categories` / `list_gis_layers` - Browse 112 layers across 11 categories
- `search_gis_layers` / `find_layers_for_question` - Find relevant layers
- `get_gis_layer_details` - Field definitions, service URLs

### Geoprocessing Tools (3 tools)
- `dissolve_layer` - Create derived boundaries (school/fire/water districts)
- `inspect_layer` - Shapefile field inspection
- `get_solano_context` - Load reference materials on demand

---

## Technical Architecture

### Tech Stack
| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 + React 19 + TypeScript |
| MCP Protocol | @modelcontextprotocol/sdk 1.25 |
| Mapping | @arcgis/core 4.34 (ESRI ArcGIS JS SDK) |
| Databases | SQLite + sqlite-vec (embedded) |
| Geoprocessing | Modal (serverless Python/GeoPandas) |
| Deployment | Vercel (web + MCP HTTP) |
| State | Zustand (bridges UI and MCP tools) |
| Validation | Zod (runtime schema validation) |

### Dual MCP Server Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    SAGE MCP Server                          │
├─────────────────────────────────────────────────────────────┤
│  Development (stdio)          Production (HTTP)             │
│  scripts/mcp-dev-server.ts    app/api/mcp/route.ts         │
│  Local Claude Code            Vercel deployment             │
│  npx tsx scripts/...          sage-three-theta.vercel.app  │
├─────────────────────────────────────────────────────────────┤
│              Shared Tool Definitions                        │
│              lib/tools/definitions/*.ts                     │
│              (Zod schemas + handlers)                       │
├─────────────────────────────────────────────────────────────┤
│  Data Sources:                                              │
│  ├── Solano County AGOL (parcels, addresses, boundaries)   │
│  ├── 7 City Zoning Services (Benicia→Vallejo)              │
│  ├── FEMA NFHL (flood zones)                               │
│  ├── CAL FIRE FHSZ (fire hazard)                           │
│  ├── County Code SQLite (323 sections)                     │
│  ├── General Plan SQLite (1,345 chunks)                    │
│  ├── Budget SQLite (FY25-26)                               │
│  └── Modal (serverless geoprocessing)                      │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Patterns

| Pattern | Implementation |
|---------|----------------|
| **Jurisdiction Routing** | Auto-detects city vs. county by spatial query against 7 city boundaries |
| **Modular Tool Definitions** | Each category in its own file, aggregated at runtime |
| **Embedded Databases** | SQLite for county code, budget, general plan (zero external dependencies) |
| **Centralized Config** | `lib/config/endpoints.ts` for all service URLs |
| **Serverless Geoprocessing** | Modal + GeoPandas for dissolve operations |
| **State Bridge** | Zustand store lets MCP tools control interactive map |

---

## Video Structure

### SEGMENT 1: Context (1:30-2:00)
**Purpose**: Frame the problem, establish credibility, introduce approach

#### 1A: The Problem (0:00-0:45)
**Narration**:
> "Every day, county GIS staff answer dozens of spatial questions: What's the zoning here? Is this in a flood zone? Who's my supervisor? What does the county code say about ADUs?
>
> Each question requires knowing which layer to query, understanding the schema, writing the correct query — and critically, knowing which jurisdiction to ask. An address in 'Fairfield, CA' might actually be unincorporated county.
>
> What if an AI agent could handle all of this — not just the queries, but the judgment?"

**Visuals**:
- Quick montage: ArcGIS REST interface, county code PDF, budget document
- Transition to SAGE logo/landing page

#### 1B: The Solution Architecture (0:45-1:30)
**Narration**:
> "I built SAGE — Solano Agent for Geographic Enquiry. It's an MCP server — Model Context Protocol — that gives Claude direct access to Solano County's GIS infrastructure.
>
> 40 tools across 13 categories: property lookups, zoning with automatic jurisdiction routing, FEMA flood zones, CAL FIRE hazard severity, county code search, general plan policies, the FY25-26 budget, and even serverless geoprocessing.
>
> But tools alone aren't enough. SAGE also has organizational knowledge: which city handles which area, what Prop 13 means for assessed values, when to refer to Planning versus Resource Management.
>
> The result is an agent that doesn't just query data — it interprets it like an analyst would."

**Visuals**:
- Architecture diagram showing:
  - MCP Server (40+ tools) → Data Sources (AGOL, FEMA, CAL FIRE, SQLite)
  - Knowledge Layer → Jurisdiction routing, regulatory context, department contacts
  - Interactive Map → Presets for different workflows
- Show the SAGE landing page with "What can you ask?" examples

#### 1C: Why This Matters (1:30-2:00)
**Narration**:
> "The key insight: a GIS analyst's value isn't clicking buttons — it's knowing which questions to ask, which sources to trust, and what caveats matter.
>
> SAGE captures that expertise. Let me show you against Solano County's actual infrastructure — real data, real queries, real results."

**Visuals**:
- Transition to screen recording

---

### SEGMENT 2: Technical Demonstration (6:00-8:00)

**Strategic approach**: Three demos showcasing different capabilities. Quality over quantity.

#### 2A: Quick Architecture Tour (1:00-1:30)
**Purpose**: Establish technical credibility without drowning in code

**Narration**:
> "Here's the MCP server. 40 tools organized in 13 definition files — each category self-contained.
>
> The key is in the tool descriptions. This isn't just documentation — it's prompt engineering. The zoning tool explains jurisdiction routing directly in its description, so Claude knows to check city boundaries first.
>
> All tools use Zod for input validation. One definition works for both the local dev server and the production HTTP endpoint on Vercel.
>
> Let me show you this in action."

**Screen Recording** (60-90 seconds):
- VS Code showing:
  - `lib/tools/definitions/gis-core.ts` — tool definition pattern
  - `lib/config/endpoints.ts` — centralized service URLs
  - `app/api/mcp/route.ts` — production server (it's only 46 lines!)
- Highlight the Zod schema + description pattern

**Key Code to Highlight**:
```typescript
// lib/tools/definitions/gis-core.ts
export const getZoningTool = defineTool({
  name: 'get_zoning',
  description: `Query zoning for a location.
    CRITICAL: Automatically routes to correct authority:
    - First checks city boundaries (7 cities)
    - If inside city → queries that city's zoning layer
    - If unincorporated → queries county zoning
    WATCH OUT: Mailing address ≠ jurisdiction.`,
  schema: { apn: z.string().optional(), latitude: z.number().optional(), ... },
  handler: async (args) => { ... }
});
```

#### 2B: Demo 1 — Property Research with Jurisdiction Routing (2:00-2:30)
**Purpose**: Show the key differentiator — organizational knowledge baked in

**Narration**:
> "Let's start with the scenario that shows why organizational knowledge matters. I'll ask about a 'Fairfield' address — but watch what happens."

**Query**: "What's the zoning for 2500 Cordelia Road, Fairfield, CA? Include a map."

**Screen Recording** (Claude Code):
- Show the query being entered
- Watch Claude call: geocode → get_zoning → render_map
- Show the response with jurisdiction explanation and map

**Expected Response** (paraphrase):
> "Although your mailing address says 'Fairfield,' this property is actually in **unincorporated Solano County** — not within Fairfield city limits.
>
> **Zoning**: A-20 (General Agriculture, 20-acre minimum)
> **Permitted uses**: Agricultural, single-family with permit
> **Contact**: Solano County Resource Management, (707) 784-6765
>
> [Map showing parcel highlighted in orange]"

**Narration overlay**:
> "See that? It caught the jurisdiction mismatch. A naive tool would have queried Fairfield's zoning service and failed. SAGE checked the city boundary first and routed to county zoning."

#### 2C: Demo 2 — Hazard Assessment + Notification List (2:00-2:30)
**Purpose**: Show multi-tool analysis with real public safety implications

**Narration**:
> "Now let's look at something with real-world impact — preparing for a conditional use permit. We need hazard data and a notification list of nearby property owners."

**Query**: "I'm preparing a permit application for 4300 Suisun Valley Road. What hazards affect this property? And generate a notification list of owners within 300 feet."

**Screen Recording**:
- Watch Claude orchestrate multiple tools:
  - geocode_address → get coordinates
  - get_flood_zone → FEMA designation
  - get_fire_hazard_zone → CAL FIRE classification
  - get_parcels_in_buffer → notification list
  - render_map with buffer → visualization
- Show the comprehensive response

**Expected Response**:
> "**Hazard Assessment for 4300 Suisun Valley Road**:
> - **Flood Zone**: Zone X (minimal risk, outside SFHA, no flood insurance required)
> - **Fire Hazard**: Moderate FHSZ (SRA) — standard defensible space requirements
>
> **Notification List** (300ft radius): Found 8 neighboring parcels
> [Table with APN, owner name, mailing address]
>
> [Map showing subject parcel in orange, buffer circle, neighboring parcels]"

**Narration overlay**:
> "In one query, we got the hazard assessment and the notification list for the permit application. The agent coordinated five tools and synthesized a report that would have taken staff 15-20 minutes manually."

#### 2D: Demo 3 — Regulatory Research + Policy (2:00-2:30)
**Purpose**: Show county code and general plan integration

**Narration**:
> "SAGE goes beyond GIS. It can search the county code and general plan to answer regulatory questions."

**Query**: "What are the ADU rules in unincorporated Solano County? What does the county code say, and what's the General Plan policy on housing?"

**Screen Recording**:
- Watch Claude search county code and general plan:
  - search_county_code("ADU" or "accessory dwelling")
  - get_county_code_sections([relevant sections])
  - search_general_plan("accessory dwelling housing")
- Show synthesized response with citations

**Expected Response**:
> "**ADU Regulations in Unincorporated Solano County**:
>
> Per County Code Section 28.72.10, ADUs are allowed in:
> - Rural Residential (R-R-5, R-R-10): Permitted by right
> - Residential-Traditional Community: Permitted by right
>
> Note: Agricultural zones (A-20, A-40) use 'secondary dwelling' provisions under Section 28.72.40, which have different standards than standard ADU rules.
>
> **General Plan Context**: Housing Element Policy H.P-10 supports ADU development as infill housing strategy...
>
> For your specific parcel, contact County Planning: (707) 784-6765"

**Narration overlay**:
> "The agent found the relevant code sections, caught the agricultural zone distinction, and pulled General Plan policy for context — all with proper citations and the right department contact."

---

### SEGMENT 3: Results & Explanation (2:00-3:00)

#### 3A: Technical Summary (0:45-1:00)
**Narration**:
> "What did we build?
>
> An MCP server with 40 tools that gives Claude access to:
> - Solano County's GIS infrastructure — 152,000 parcels, 7 city zoning services, flood and fire hazard layers
> - The county code — 323 sections with full-text search
> - The 2008 General Plan — 1,345 searchable chunks, 282 policies
> - The FY25-26 budget — semantic search across the entire document
> - Serverless geoprocessing — dissolve operations via Modal
>
> Plus organizational knowledge: jurisdiction routing, Prop 13 context, regulatory interpretation, department contacts.
>
> The result is an agent that answers questions like an experienced analyst — not just returning data, but explaining what it means."

**Visuals**:
- Show SAGE landing page with tool categories
- Quick scroll through interactive map with layer list

#### 3B: Production Considerations (0:30-0:45)
**Narration**:
> "Building the agent is one thing. Operating it is another.
>
> This architecture is designed for real deployment:
> - Dual MCP servers: local dev for iteration, HTTP production for remote access
> - Embedded databases: no external dependencies, works offline
> - Centralized configuration: one file for all service URLs
> - Comprehensive disclaimers: GIS data is for reference, official determinations require department contact
>
> This isn't a demo — it's infrastructure."

**Visuals**:
- Quick shot of `lib/config/endpoints.ts`
- Show disclaimer text in a response

#### 3C: Relevance & Future (0:45-1:00)
**Narration**:
> "This isn't about replacing GIS analysts. It's about giving them a collaborator for the repetitive lookup work while they focus on analysis, complex cases, and the human relationships that make government work.
>
> The same infrastructure could power:
> - Internal staff tools for quick property research
> - Public-facing assistants for common questions
> - Automated report generation with maps and citations
>
> Agentic AI isn't magic — it's careful engineering. You give the model the right tools, the right knowledge, and the right guardrails. Then you let it work."

**Visuals**:
- Final shot of SAGE answering a query
- Fade to title card with contact info

---

## Production Notes

### Recording Setup
- **Screen capture**: OBS or similar, 1080p minimum, 60fps
- **Audio**: External mic, quiet room, consistent levels
- **IDE**: VS Code with `lib/tools/definitions/` visible
- **Claude Code**: Terminal ready with MCP server connected
- **Browser tabs**: SAGE landing page, interactive map

### Key Files to Show
```
sage/
├── app/
│   ├── api/mcp/route.ts          # Production MCP server (46 lines!)
│   └── components/map/           # Interactive map component
├── lib/
│   ├── config/
│   │   └── endpoints.ts          # All service URLs (single source of truth)
│   └── tools/
│       ├── definitions/
│       │   ├── index.ts          # Tool aggregation
│       │   ├── gis-core.ts       # Property/zoning tools
│       │   ├── county-code.ts    # County code tools
│       │   └── budget.ts         # Budget tools
│       ├── geocode.ts            # Implementation example
│       └── zoning.ts             # Jurisdiction routing logic
├── data/
│   ├── county-code.db            # Embedded county code
│   ├── general_plan.db           # Embedded general plan
│   └── budget.db                 # Embedded budget
└── modal_gis/
    └── dissolve.py               # Serverless geoprocessing
```

### Pre-Recording Checklist
- [ ] MCP server running (`npx tsx scripts/mcp-dev-server.ts`)
- [ ] All 3 demo queries verified working
- [ ] Interactive map loading correctly
- [ ] Script rehearsed for timing (aim for 10:30)
- [ ] Screen recording software tested
- [ ] Audio levels checked
- [ ] Backup queries identified

### Demo Query Bank

**Primary demos (in order):**

| # | Demo | Query | Shows |
|---|------|-------|-------|
| 1 | Jurisdiction Routing | "What's the zoning for 2500 Cordelia Road, Fairfield, CA? Include a map." | Jurisdiction detection, map rendering |
| 2 | Hazard + Buffer | "I'm preparing a permit for 4300 Suisun Valley Road. What hazards? Notification list within 300ft." | Multi-tool coordination, buffer analysis |
| 3 | Regulatory Research | "What are the ADU rules in unincorporated Solano County? County code and General Plan policy." | County code search, general plan, synthesis |

**Backup demos:**

| Demo | Query | When to Use |
|------|-------|-------------|
| Budget | "What's the Sheriff's Office budget for FY25-26? How many positions?" | If regulatory demo has issues |
| Parcel Search | "Find agricultural parcels over 20 acres zoned A-40" | Quick aggregation demo |
| Org Chart | "How many employees work for the county? Show me the largest departments." | If budget/org questions arise |
| Geoprocessing | "Create school district boundaries from parcel data" | If time permits, shows Modal |

---

## Key Messages to Reinforce

1. **"Not just queries — judgment"**: SAGE interprets results like an analyst would
2. **"40 tools, 13 categories"**: Comprehensive coverage of county operations
3. **"Real infrastructure, real data"**: Solano County's actual GIS, not mocked
4. **"Jurisdiction routing"**: The key differentiator — knowing who to ask
5. **"Production-ready"**: Dual deployment, embedded databases, proper disclaimers
6. **"Principal-level thinking"**: When to refer, what caveats matter, how to communicate

---

## Script Polish Notes

### Phrases to Use
- "Let me show you..."
- "Notice how it caught..."
- "This is the key insight..."
- "The agent coordinated..."
- "In a single query..."

### Phrases to Avoid
- "Um", "Uh", "So basically"
- Over-explaining (let the demo speak)
- Apologizing for limitations
- Technical jargon without context

### Tone
- Confident but not arrogant
- Technical but accessible
- Demonstrating, not lecturing
- Practical, not theoretical

---

## Timing Guide

| Segment | Target | Cumulative |
|---------|--------|------------|
| 1A: Problem | 0:45 | 0:45 |
| 1B: Architecture | 0:45 | 1:30 |
| 1C: Why It Matters | 0:30 | 2:00 |
| 2A: Code Tour | 1:15 | 3:15 |
| 2B: Demo 1 (Jurisdiction) | 2:15 | 5:30 |
| 2C: Demo 2 (Hazard+Buffer) | 2:15 | 7:45 |
| 2D: Demo 3 (Regulatory) | 2:15 | 10:00 |
| 3A: Technical Summary | 0:45 | 10:45 |
| 3B: Production Notes | 0:30 | 11:15 |
| 3C: Relevance | 0:45 | 12:00 |

**Target: 10:30-11:30** (leaves buffer for natural pacing)

---

*"The goal is to make the evaluators think: this person understands both the technology and the organization deeply enough to make something that would actually work here."*
