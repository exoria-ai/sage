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
| **Technical Depth** | Real MCP server code, actual ArcGIS REST queries, Claude reasoning |
| **Use of GIS Tools** | Live queries against Solano County's actual GIS infrastructure |
| **Analysis/Output Quality** | Useful results: counts, values, interpretations, proper caveats |
| **Communication** | Clear narrative arc, plain-English explanations, visual aids |
| **Relevance to Role** | Solano-specific scenarios, jurisdiction routing, Principal-level judgment |

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

### Nano Banana Pro Assets to Create

| Asset | Purpose | Description |
|-------|---------|-------------|
| **Architecture Diagram** | Context section | SAGE architecture: Skill layer → MCP → Data Sources (similar to coffee machine flow) |
| **Query Flow Diagram** | Demo section | Visual showing: User Question → Geocode → Jurisdiction Check → Zoning Query → Knowledge Load → Response |
| **Knowledge Layer Infographic** | Context section | Progressive disclosure: System Prompt → Tool Descriptions → On-Demand References |
| **Jurisdiction Map Concept** | Demo section | Stylized Solano County showing 7 cities vs unincorporated (highlight the problem) |
| **Observability Dashboard Mockup** | Results section | Signals, traces, metrics visualization |
| **Before/After Comparison** | Results section | Traditional GIS workflow vs SAGE-assisted workflow |

### Screen Recording Segments

| Segment | Duration | What to Show |
|---------|----------|--------------|
| **Code walkthrough** | 60-90 sec | MCP server structure, key tool implementations |
| **Agent interaction** | 3-4 min | Claude Code or chat interface running real queries |
| **Raindrop dashboard** | 30-60 sec | Live traces, signals, interaction logs |
| **GIS data verification** | 30 sec | Quick ArcGIS Online showing the actual data SAGE queried |

---

## Video Structure

### SEGMENT 1: Context (1:30-2:00)
**Purpose**: Frame the problem, establish credibility, introduce approach

#### 1A: The Problem (0:00-0:45)
**Narration**:
> "Every day, Solano County GIS staff answer dozens of spatial questions: What's the zoning at this address? Is this property in a flood zone? Who's my supervisor? Each question requires knowing which layer to query, understanding the schema, writing the correct query, and — critically — interpreting the results in context.
>
> What if an AI agent could do this? Not just chat about GIS concepts, but actually navigate the county's ArcGIS infrastructure, execute real queries, and provide answers with the organizational knowledge that makes them useful?"

**Visuals**:
- [Nano Banana] Infographic showing common GIS questions with complexity indicators
- Quick montage of ArcGIS REST interface / query screens
- Transition to SAGE logo/title card

#### 1B: The Solution Architecture (0:45-1:30)
**Narration**:
> "I built SAGE — Solano Agent for Geographic Enquiry. It combines two components:
>
> First, an MCP server — Model Context Protocol — that gives Claude direct access to Solano County's GIS. Think of it as giving Claude hands to interact with ArcGIS REST APIs.
>
> Second, a Skill that provides organizational knowledge: jurisdiction routing, data interpretation, regulatory context. This is the brain that knows what the results mean.
>
> Together, they create an agent that doesn't just query data — it understands it."

**Visuals**:
- [Nano Banana] Architecture diagram showing:
  - SKILL LAYER (brain icon) → Knowledge cards flowing down
  - MCP SERVER (hands icon) → Tools connecting to data sources
  - EXTERNAL DATA → Solano GIS, State/Fed services
- Animated arrows showing data flow
- Color coding: Blue for data, Orange for knowledge

#### 1C: Why This Matters (1:30-2:00)
**Narration**:
> "The key insight is that a GIS analyst's value isn't knowing which buttons to click — it's understanding what questions to ask, which data sources to trust, and what caveats to communicate. SAGE captures that expertise in a reusable, scalable form.
>
> Let me show you how it works against Solano County's actual GIS infrastructure."

**Visuals**:
- [Nano Banana] "GIS Analyst Functions" infographic showing which SAGE can do
- Transition to screen recording

---

### SEGMENT 2: Technical Demonstration (6:00-8:00)

#### 2A: Quick Code Overview (1:00-1:30)
**Purpose**: Establish technical credibility without drowning in code

**Narration**:
> "Here's the MCP server structure. The key tools are geocode_address, get_zoning, get_flood_zone, and get_parcel_details. 
>
> Notice the tool descriptions — they're not just documentation, they're prompt engineering. I've baked jurisdiction routing logic directly into the descriptions so Claude knows when to check city boundaries first.
>
> Let me show you this in action."

**Screen Recording**:
- VS Code or editor showing:
  - `src/tools/` directory structure
  - One tool definition with rich description (highlight the jurisdiction logic)
  - Quick scroll through available tools
- Keep it FAST — 60-90 seconds max

**Key Code to Highlight**:
```typescript
// Tool description example (don't show full code, just this snippet)
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

#### 2B: Demo Scenario 1 — Jurisdiction Routing (2:00-2:30)
**Purpose**: Show the key differentiator

**Narration**:
> "Here's the scenario that shows why organizational knowledge matters. I'll ask about an address with 'Fairfield' in it — but watch what happens."

**Query**: "What's the zoning at 2500 Cordelia Road, Fairfield, CA?"

**Screen Recording** (Claude Code or chat interface):
- Show the query being entered
- Highlight Claude's reasoning:
  - "Let me geocode this address..."
  - "Checking city boundaries... this location is NOT within Fairfield city limits"
  - "This is unincorporated Solano County, so I'll query county zoning..."
- Show the result with proper context

**Expected Response** (paraphrase):
> "Although your mailing address says 'Fairfield,' this property is actually in unincorporated Solano County — not within Fairfield city limits. This is a common source of confusion.
>
> The county zoning is A-20 (Agricultural, 20-acre minimum). For zoning questions about unincorporated areas, contact Solano County Planning at (707) 784-6765, not the City of Fairfield.
>
> [GIS disclaimer]"

**Narration overlay**:
> "See how it caught the jurisdiction mismatch? A naive query tool would have either failed or returned the wrong data. SAGE's knowledge layer caught this common mistake."

**Visual Enhancement**:
- [Nano Banana] Simple map graphic showing the location OUTSIDE city boundary
- Or quick screenshot from ArcGIS Online showing the same

#### 2C: Demo Scenario 2 — Spatial Analysis (2:00-2:30)
**Purpose**: Show GIS tool proficiency, multi-step reasoning

**Narration**:
> "Now let's try something more complex — a spatial analysis that requires multiple steps."

**Query**: "How many residential parcels in Fairfield are within 500 feet of a park?"

**Screen Recording**:
- Show Claude's multi-step reasoning:
  1. "Querying parks in Fairfield..."
  2. "Creating 500-foot buffer around park geometries..."
  3. "Querying parcels intersecting the buffer..."
  4. "Filtering for residential use types..."
  5. "Found X parcels"
- Show the actual numbers returned

**Narration overlay**:
> "This is a multi-step spatial query that would normally require someone with GIS expertise. SAGE chained together the right operations automatically — parks layer, buffer, intersection, attribute filter."

**Visual Enhancement**:
- Brief switch to ArcGIS Online showing the actual parks layer
- Or [Nano Banana] diagram showing the buffer operation conceptually

#### 2D: Demo Scenario 3 — Aggregation + Interpretation (1:30-2:00)
**Purpose**: Show complex analysis with knowledge interpretation

**Narration**:
> "One more — this time with aggregation and interpretation."

**Query**: "What's the total assessed land value of agricultural parcels by supervisorial district?"

**Screen Recording**:
- Show Claude reasoning through it
- Output as a table:
  ```
  District 1: $XXX,XXX,XXX
  District 2: $XXX,XXX,XXX
  ...
  ```
- Show Claude adding context about Prop 13

**Expected Interpretation**:
> "Note: Assessed values in California reflect Proposition 13 rules — they're based on purchase price plus a maximum 2% annual increase, not current market value. Long-held properties may have assessed values well below market."

**Narration overlay**:
> "The agent didn't just return numbers — it loaded Prop 13 context from the knowledge layer to help interpret what those numbers mean. That's the difference between data and insight."

#### 2E: Demo Scenario 4 — Hazard Overlay (1:00-1:30)
**Purpose**: Show emergency management relevance

**Narration**:
> "Finally, let's look at something with real public safety implications."

**Query**: "Is 123 Main St, Vacaville in a high fire hazard zone? What about flood risk?"

**Screen Recording**:
- Show multi-hazard query
- FEMA flood zone result + interpretation
- CAL FIRE FHSZ result + implications (defensible space, building codes)
- Proper disclaimer and contacts

**Visual Enhancement**:
- Quick screenshot of actual FEMA or CAL FIRE data
- Shows SAGE is hitting real state/federal sources

---

### SEGMENT 3: Results & Explanation (2:00-3:00)

#### 3A: Observability — Production Thinking (0:45-1:00)
**Narration**:
> "Building the agent is one thing. Operating it is another. I've instrumented SAGE with Raindrop for production monitoring.
>
> Here you can see real interactions traced through tool calls, query distribution over time, and — most importantly — custom signals I've defined to catch domain-specific failures."

**Screen Recording**:
- Raindrop dashboard showing:
  - Interaction timeline with traces
  - Signal dashboard with custom signals
  - Query type breakdown
- Quick and visual — let the pretty charts speak

**Narration overlay**:
> "For example, I've set up a signal to detect when the agent might confuse city and county jurisdiction — a silent failure that traditional monitoring would never catch. This is how you'd operate an AI agent in production."

#### 3B: What We Built — Summary (0:45-1:00)
**Narration**:
> "So what did we build?
>
> An MCP server that gives Claude direct access to Solano County's GIS infrastructure — parcels, zoning, flood zones, fire hazard, districts.
>
> A Skill that provides organizational knowledge — jurisdiction routing, data interpretation, regulatory context, contacts.
>
> And observability that treats AI failures as seriously as we treat software errors.
>
> The result is an agent that doesn't just query data — it understands what it means in context."

**Visuals**:
- [Nano Banana] Summary infographic showing the three components
- Architecture diagram callback

#### 3C: Relevance & Future (0:30-0:45)
**Narration**:
> "This isn't about replacing GIS analysts. It's about giving them a collaborator for repetitive query work while they focus on analysis, decisions, and the human relationships that make government work.
>
> The same infrastructure could power public-facing tools — letting residents get property information without calling the office.
>
> The foundation is here. The question is what we build on it."

**Visuals**:
- [Nano Banana] Before/After comparison:
  - Before: Staff manually running queries
  - After: Staff focusing on complex analysis while SAGE handles lookups
- Fade to title card / contact info

---

## Production Notes

### Recording Setup
- **Screen capture**: OBS or similar, 1080p minimum, 60fps
- **Audio**: External mic, quiet room, consistent levels
- **IDE**: Clean VS Code with relevant extensions visible
- **Browser**: ArcGIS tabs pre-loaded, Raindrop dashboard ready
- **Agent interface**: Claude Code or appropriate chat interface

### Editing Priorities

| Priority | Task | Est. Time |
|----------|------|-----------|
| **High** | Screen recording (demos must work flawlessly) | 2-3 hours |
| **High** | Nano Banana Pro visuals creation | 2-3 hours |
| **High** | Audio recording (clear, professional) | 1-2 hours |
| **Medium** | Transitions and timing polish | 1-2 hours |
| **Medium** | Callouts/highlights on screen recordings | 1 hour |
| **Lower** | Background music (subtle, optional) | 30 min |

### Contingency
- Pre-record demo scenarios multiple times
- Have backup queries if primary ones fail
- Know exact timestamps for each segment to hit 10-12 min target

### Pre-Recording Checklist
- [ ] MCP server running and tested
- [ ] All demo queries verified working
- [ ] Raindrop dashboard populated with test data
- [ ] Nano Banana assets created and exported
- [ ] Script rehearsed for timing
- [ ] Screen recording software tested
- [ ] Audio levels checked

---

## Timeline to Deadline

**Today**: Finalize spec and outline  
**Day 1-2**: Build MCP server core tools  
**Day 3**: Complete skill, test demo scenarios  
**Day 4**: Create Nano Banana visuals, record screen demos  
**Day 5**: Record narration, edit video  
**Day 6**: Polish, review, upload  
**Day 7**: Buffer for fixes

---

## Key Messages to Reinforce

1. **"Not just queries — understanding"**: SAGE interprets, not just returns data
2. **"Organizational knowledge baked in"**: Jurisdiction routing, Prop 13 context, disclaimers
3. **"Real infrastructure, real data"**: Not mocked — actual Solano County GIS
4. **"Production-ready thinking"**: Observability, failure detection, operational maturity
5. **"Principal-level judgment"**: Knowing when to refer, what caveats matter, how to communicate

---

## Script Polish Notes

### Phrases to Use
- "Let me show you..."
- "Notice how..."
- "This is the key insight..."
- "What makes this different is..."

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

## Appendix: Demo Query Bank

**Backup queries if primary scenarios have issues:**

| Category | Query |
|----------|-------|
| Simple lookup | "What's the zoning at [address]?" |
| Jurisdiction | "Is [address] in city limits or unincorporated?" |
| Flood zone | "Is [address] in a flood zone? What does that mean?" |
| Fire hazard | "What fire hazard zone is [address] in?" |
| Supervisor | "Who is my supervisor for [address]?" |
| Parcels | "How many parcels in District 3?" |
| Spatial | "What's the nearest park to [address]?" |
| Aggregation | "What's the average parcel size in [city]?" |
| Complex | "Show me residential parcels over 1 acre in flood zones" |

---

*"The goal is to make the evaluators think: this person understands both the technology and the organization deeply enough to make something that would actually work here."*
