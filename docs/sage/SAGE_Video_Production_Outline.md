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
| **Technical Depth** | Real MCP server code, actual ArcGIS REST queries, Claude reasoning, RAG systems |
| **Use of GIS Tools** | Live queries against Solano County's actual GIS infrastructure |
| **Analysis/Output Quality** | Useful results: counts, values, interpretations, maps, infographics, proper caveats |
| **Communication** | Clear narrative arc, plain-English explanations, AI-generated visual aids |
| **Relevance to Role** | Solano-specific scenarios, jurisdiction routing, county code lookups, budget analysis, Principal-level judgment |

---

## What SAGE Actually Does (Current Implementation)

SAGE has evolved significantly beyond the original plan. The current implementation includes **25 MCP tools** across 5 categories:

### GIS & Property Tools (12 tools)
- `geocode_address` - Convert address to coordinates and APN
- `get_parcel_details` - Property info, assessed values, ownership
- `get_zoning` - Zoning with automatic jurisdiction routing
- `get_flood_zone` - FEMA flood zone designation
- `get_fire_hazard_zone` - CAL FIRE FHSZ classification
- `get_supervisor_district` - Board of Supervisors district
- `get_special_districts` - Fire, water, school districts
- `get_nearby` - Find schools, parks, fire stations within radius
- `search_parcels` - Search parcels by criteria with aggregations
- `get_parcels_in_buffer` - Parcels within radius (notification lists)
- `render_map` - Generate static map images with parcel highlighting

### County Code Tools (4 tools)
- `get_county_code_sections` - Full text of specific code sections
- `list_county_code_chapters` - Available chapters (26 Subdivisions, 28 Zoning)
- `list_county_code_sections` - Sections within a chapter
- `search_county_code` - Keyword search across code

### Budget Tools (6 tools)
- `search_budget` - Semantic RAG search of FY25-26 Recommended Budget
- `get_budget_chunk` - Retrieve full budget chunk by ID
- `list_budget_departments` - All county departments
- `list_budget_sections` - Budget sections A-N
- `get_department_budget` - Department-specific budget details
- `get_budget_overview` - Document statistics

### Visualization Tools (2 tools)
- `generate_infographic` - AI image generation via fal.ai Nano Banana Pro
- `edit_image` - Edit/combine multiple images

### Knowledge Tools (1 tool)
- `get_solano_context` - Retrieve reference materials on demand

---

## Visual Theme & Assets

### Aesthetic Direction
**Style**: Clean technical/professional with warm accent colors
**Inspiration**: The tube amplifier and coffee machine infographics — detailed, labeled, color-coded flows
**Color Palette**:
- Primary: Deep blue (#1e3a5f)
- Accent: Warm orange (#e07020)
- Background: Light gray/off-white
- Success: Green (#2d8a4e)
- Text: Near-black (#1a1a1a)

### AI-Generated Infographics (via generate_infographic tool)

| Asset | Purpose | Prompt Concept |
|-------|---------|----------------|
| **Architecture Diagram** | Context section | "Technical diagram showing SAGE architecture: Skill layer with brain icon connecting to MCP Server with 25 tools, connecting to external data sources (ArcGIS, County Code, Budget). Clean lines, blue and orange color scheme, labeled components." |
| **Query Flow Diagram** | Demo section | "Flowchart showing: User Question → Geocode → Jurisdiction Check → Zoning Query → Knowledge Load → Response. Arrows connecting each step, icons for each stage." |
| **Knowledge Layer Infographic** | Context section | "Diagram showing progressive disclosure: System Prompt at top, Tool Descriptions in middle, On-Demand References at bottom. Stacked layers with decreasing opacity." |
| **Tool Categories Wheel** | Overview | "Circular diagram with 5 segments: GIS Tools (12), County Code (4), Budget (6), Visualization (2), Knowledge (1). Each segment color-coded." |

### Screen Recording Segments

| Segment | Duration | What to Show |
|---------|----------|--------------|
| **Code walkthrough** | 60-90 sec | MCP server in `scripts/mcp-dev-server.ts`, tool implementations in `lib/tools/` |
| **Agent interaction** | 4-5 min | Claude Code running real queries demonstrating multiple tool categories |
| **Map generation** | 30-60 sec | `render_map` creating parcel maps, buffer visualizations |
| **Infographic generation** | 30-60 sec | Live `generate_infographic` creating a diagram |
| **GIS data verification** | 30 sec | Quick ArcGIS Online showing the actual data SAGE queried |

---

## Video Structure

### SEGMENT 1: Context (1:30-2:00)
**Purpose**: Frame the problem, establish credibility, introduce approach

#### 1A: The Problem (0:00-0:45)
**Narration**:
> "Every day, Solano County GIS staff answer dozens of spatial questions: What's the zoning at this address? Is this property in a flood zone? Who's my supervisor? Each question requires knowing which layer to query, understanding the schema, writing the correct query, and — critically — interpreting the results in context.
>
> But there's more than just GIS data. Staff also need to reference county code regulations, understand budget allocations, and create visualizations for reports. What if an AI agent could handle all of this?"

**Visuals**:
- [AI Generated] Infographic showing common questions across different domains (GIS, Code, Budget)
- Quick montage of ArcGIS REST interface / query screens
- Transition to SAGE logo/title card

#### 1B: The Solution Architecture (0:45-1:30)
**Narration**:
> "I built SAGE — Solano Agent for Geographic Enquiry. It combines three components:
>
> First, an MCP server — Model Context Protocol — with 25 tools that give Claude direct access to Solano County's GIS, the county code database, the FY25-26 budget, and AI image generation.
>
> Second, a Skill that provides organizational knowledge: jurisdiction routing, data interpretation, regulatory context. This is the brain that knows what the results mean.
>
> Third, RAG systems — Retrieval Augmented Generation — for both county code and budget documents, so Claude can cite specific sections and figures.
>
> Together, they create an agent that doesn't just query data — it understands it."

**Visuals**:
- [AI Generated] Architecture diagram showing:
  - SKILL LAYER (brain icon) → Knowledge cards flowing down
  - MCP SERVER (25 tools icon) → Tool categories connecting to data sources
  - DATA SOURCES → Solano GIS, County Code, Budget, fal.ai
- Animated arrows showing data flow
- Color coding: Blue for data, Orange for knowledge, Green for output

#### 1C: Why This Matters (1:30-2:00)
**Narration**:
> "The key insight is that a GIS analyst's value isn't knowing which buttons to click — it's understanding what questions to ask, which data sources to trust, and what caveats to communicate. SAGE captures that expertise in a reusable, scalable form.
>
> Let me show you how it works against Solano County's actual infrastructure."

**Visuals**:
- [AI Generated] "GIS Analyst Functions" infographic showing which SAGE can do
- Transition to screen recording

---

### SEGMENT 2: Technical Demonstration (6:00-8:00)

**Strategic approach**: Focus on 3 demos that showcase different capabilities. Don't try to show everything — let the architecture overview mention other tools exist.

#### 2A: Quick Code Overview (1:00-1:30)
**Purpose**: Establish technical credibility without drowning in code

**Narration**:
> "Here's the MCP server structure. We have 25 tools — but I won't bore you with all of them. The key insight is in the tool descriptions.
>
> Notice this isn't just documentation — it's prompt engineering. I've baked jurisdiction routing logic directly into the descriptions so Claude knows when to check city boundaries first.
>
> Let me show you this in action."

**Screen Recording**:
- VS Code showing:
  - `scripts/mcp-dev-server.ts` - main MCP server
  - One tool definition with rich description (highlight the jurisdiction logic)
- Keep it FAST — 60 seconds max

**Key Code to Highlight**:
```typescript
// Tool description example (from scripts/mcp-dev-server.ts)
{
  name: "get_zoning",
  description: `Query zoning for a location.
    CRITICAL: Automatically routes to correct authority:
    - First checks city boundaries
    - If inside city → queries city zoning layer
    - If unincorporated → queries county zoning
    WATCH OUT: Mailing address ≠ jurisdiction.
    A "Fairfield, CA" address may be unincorporated county.`
}
```

#### 2B: Demo 1 — Jurisdiction Routing + Map (2:00-2:30)
**Purpose**: Show the key differentiator — organizational knowledge baked in

**Narration**:
> "Here's the scenario that shows why organizational knowledge matters. I'll ask about an address with 'Fairfield' in it — but watch what happens."

**Query**: "What's the zoning at 2500 Cordelia Road, Fairfield, CA? Show me a map."

**Screen Recording** (Claude Code):
- Show the query being entered
- Highlight Claude's tool calls (geocode → zoning → map)
- Show the result with map image

**Expected Response** (paraphrase):
> "Although your mailing address says 'Fairfield,' this property is actually in unincorporated Solano County — not within Fairfield city limits.
>
> The county zoning is A-20 (Agricultural, 20-acre minimum). For zoning questions about unincorporated areas, contact Solano County Resource Management at (707) 784-6765.
>
> [Map image showing parcel]"

**Narration overlay**:
> "See how it caught the jurisdiction mismatch and generated a map? A naive query tool would have either failed or returned the wrong data. SAGE's knowledge layer caught this common mistake."

#### 2C: Demo 2 — Multi-Hazard Property Report (2:00-2:30)
**Purpose**: Show multi-step GIS analysis with interpretation

**Narration**:
> "Now let's look at something with real public safety implications — a property hazard report."

**Query**: "What hazards affect 123 Main St, Vacaville? What should I know before buying this property?"

**Screen Recording**:
- Show multi-tool query running
- Flood zone, fire hazard, maybe supervisor district
- Show the synthesized response with practical advice

**Expected Response**:
> "Property hazard assessment:
> - **Flood Zone**: Zone X (minimal risk, outside SFHA)
> - **Fire Hazard**: Moderate FHSZ
> - **Supervisor**: District 4 (John Vasquez)
>
> For this property: No special flood insurance required for mortgages. Standard fire-safe practices apply. [Appropriate disclaimers and contacts]"

**Narration overlay**:
> "The agent didn't just return data codes — it explained what they mean for someone making a real decision. That's the difference between data and insight."

#### 2D: Demo 3 — County Code Lookup (2:00-2:30)
**Purpose**: Show RAG capability, demonstrate breadth beyond pure GIS

**Narration**:
> "SAGE goes beyond GIS data. It can also search the county code — the actual regulations."

**Query**: "What uses are allowed in the A-40 agricultural zone? Can I build an ADU?"

**Screen Recording**:
- Show Claude searching county code
- Retrieving relevant sections
- Synthesizing answer with citations

**Expected Response**:
> "According to Solano County Code Chapter 28, A-40 (General Agriculture) allows:
> - Agricultural uses (permitted by right)
> - Single-family dwelling (with Administrative Permit)
> - Secondary dwelling (different from ADU rules in residential zones)
>
> Note: Agricultural zones use 'secondary dwelling' provisions, not standard ADU rules. Contact County Planning at (707) 784-6765 for your specific situation."

**Narration overlay**:
> "The agent cited the specific code section and caught the ADU nuance — a common source of confusion. This is how a real analyst would respond."

**OPTIONAL DEMO** (if time permits or as backup):

#### 2E: Budget or Infographic Demo (1:00-1:30)
**Use if**: One of the above demos has issues, or you're running short and want variety.

**Budget Query**: "What's the Sheriff's budget for FY25-26?"
- Shows RAG across a 700-page document
- Quick, impressive, different data domain

**OR Infographic Query**: "Generate a diagram showing SAGE's architecture."
- Shows AI image generation capability
- Visual wow factor
- Mention rate limiting for cost control

---

### SEGMENT 3: Results & Explanation (2:00-3:00)

#### 3A: What We Built — Technical Summary (0:45-1:00)
**Narration**:
> "So what did we build?
>
> An MCP server with 25 tools that gives Claude direct access to:
> - Solano County's GIS infrastructure — parcels, zoning, flood zones, fire hazard, districts
> - The county code — full text of Chapters 26 and 28 with keyword search
> - The FY25-26 budget — semantic search across the entire document
> - AI image generation — for maps, infographics, and visualizations
>
> A Skill that provides organizational knowledge — jurisdiction routing, data interpretation, regulatory context, contacts.
>
> The result is an agent that doesn't just query data — it understands what it means in context."

**Visuals**:
- [AI Generated] Summary infographic showing the five tool categories with counts
- Architecture diagram callback

#### 3B: Production Considerations (0:30-0:45)
**Narration**:
> "Building the agent is one thing. Operating it is another.
>
> Key considerations for production deployment:
> - Rate limiting on AI image generation to control costs
> - Reference data that can be updated independently of code
> - Comprehensive disclaimers that GIS data is for reference only
> - Clear routing to appropriate departments for official determinations
>
> This isn't a toy demo — it's infrastructure that could actually be deployed."

**Visuals**:
- Quick scroll through reference files in `sage-skill/references/`
- Highlight disclaimer text

#### 3C: Relevance & Future (0:45-1:00)
**Narration**:
> "This isn't about replacing GIS analysts. It's about giving them a collaborator for repetitive lookup work while they focus on analysis, decisions, and the human relationships that make government work.
>
> The same infrastructure could power:
> - Internal tools for staff to quickly research properties
> - Public-facing chatbots for common questions
> - Automated report generation with maps and citations
>
> The foundation is here. The question is what we build on it."

**Visuals**:
- [AI Generated] Before/After comparison:
  - Before: Staff manually searching GIS, code, budget documents
  - After: Staff focusing on complex analysis while SAGE handles lookups
- Fade to title card / contact info

---

## Production Notes

### Recording Setup
- **Screen capture**: OBS or similar, 1080p minimum, 60fps
- **Audio**: External mic, quiet room, consistent levels
- **IDE**: VS Code with `scripts/` and `lib/` folders visible
- **Browser**: ArcGIS tabs pre-loaded for verification
- **Agent interface**: Claude Code terminal

### Key Files to Show
```
sage/
├── scripts/
│   └── mcp-dev-server.ts      # Main MCP server (25 tools)
├── lib/
│   └── tools/
│       ├── gis.ts             # GIS query functions
│       ├── county-code.ts     # County code search
│       ├── budget-rag.ts      # Budget RAG system
│       └── image-generation.ts # fal.ai integration
├── sage-skill/
│   ├── SKILL.md               # Main skill prompt
│   └── references/            # On-demand knowledge
└── data/
    ├── codes/solano/          # County code JSON
    └── budget/                # Budget embeddings
```

### Editing Priorities

| Priority | Task |
|----------|------|
| **High** | Screen recording (demos must work flawlessly) |
| **High** | AI-generated visuals (architecture, flow diagrams) |
| **High** | Audio recording (clear, professional) |
| **Medium** | Transitions and timing polish |
| **Medium** | Callouts/highlights on screen recordings |
| **Lower** | Background music (subtle, optional) |

### Pre-Recording Checklist
- [ ] MCP server running (`bun run scripts/mcp-dev-server.ts`)
- [ ] All 5 demo queries verified working
- [ ] AI infographic generation tested (check rate limit status)
- [ ] Reference files present in `sage-skill/references/`
- [ ] Script rehearsed for timing
- [ ] Screen recording software tested
- [ ] Audio levels checked

---

## Demo Query Bank

**Primary demos (in order):**

| # | Demo | Primary Query | Backup Query |
|---|------|---------------|--------------|
| 1 | Jurisdiction + Map | "What's the zoning at 2500 Cordelia Road, Fairfield, CA? Show me a map." | "What's the zoning at 1234 Suisun Valley Road?" |
| 2 | Hazard Report | "What hazards affect 123 Main St, Vacaville? What should I know before buying?" | "Is 456 Oak St, Dixon in a flood zone or fire hazard area?" |
| 3 | County Code | "What uses are allowed in A-40 zoning? Can I build an ADU?" | "What are the setback requirements for R-R-5?" |

**Optional/backup demos:**

| Demo | Query | When to Use |
|------|-------|-------------|
| Budget | "What's the Sheriff's budget for FY25-26?" | If county code demo has issues |
| Infographic | "Generate a diagram showing SAGE's architecture." | If you want visual variety |
| Simple lookup | "What's the APN for 675 Texas Street, Fairfield?" | Quick fallback if running short |

---

## Key Messages to Reinforce

1. **"Not just queries — understanding"**: SAGE interprets, not just returns data
2. **"25 tools across 5 domains"**: GIS, County Code, Budget, Visualization, Knowledge
3. **"Real infrastructure, real data"**: Not mocked — actual Solano County systems
4. **"Production-ready thinking"**: Rate limiting, disclaimers, clear department routing
5. **"Principal-level judgment"**: Knowing when to refer, what caveats matter, how to communicate

---

## Script Polish Notes

### Phrases to Use
- "Let me show you..."
- "Notice how..."
- "This is the key insight..."
- "What makes this different is..."
- "The agent didn't just return data — it..."

### Phrases to Avoid
- "Um", "Uh", "So basically"
- Over-explaining (let the demo speak)
- Apologizing for limitations
- Technical jargon without context

### Tone
- Confident but not arrogant
- Technical but accessible
- Demonstrating, not lecturing
- Enthusiastic about the possibilities

---

*"The goal is to make the evaluators think: this person understands both the technology and the organization deeply enough to make something that would actually work here."*
