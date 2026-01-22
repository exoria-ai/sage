# Solano County GIS Interview - Video Demo Script

**Position:** IT Analyst (Principal) - GIS, Solano County DoIT  
**Video Deadline:** Noon PST, Monday January 26, 2026  
**Format:** Two videos, 10-12 minutes each  

---

## Video Structure

| Video | Title | Content |
|-------|-------|---------|
| **1** | Agentic AI and GIS | MCP/GIS parallel → SAGE demos → launches interactive map |
| **2** | Web GIS Application | Interactive map features, configuration system, technical implementation |

---

# VIDEO 1: Agentic AI and GIS

## Opening: The GIS Parallel (2-3 minutes)

### The "Just Use APIs" Critique

> "When I talk to developers about MCP — Model Context Protocol — they often say: 'Why bother? Just use APIs.'
>
> That critique assumes APIs exist, that they're consistent, and that someone will write custom integration code. But that's not how government works."

### There Is No "Government API"

> "There is no 'Government API.' There never will be.
>
> We have dozens of systems across multiple jurisdictions — county, cities, state, federal — built by different vendors in different decades, updated on different schedules. None of them were designed to work together."

**Show examples:**

| System | Source | Format |
|--------|--------|--------|
| Parcels | County Assessor | ArcGIS REST |
| City Zoning | 7 different cities | 7 different services |
| Flood Zones | FEMA | MapServer |
| Fire Hazard | CAL FIRE | State services |
| County Code | County Counsel | PDF/HTML |
| Budget | CAO | PDF |

### The GIS Precedent

> "This is exactly what people said about GIS in the 1990s: 'Why do you need a GIS? Just use the CAD files. Just use the database.'
>
> Before GIS, government spatial data was trapped in silos — paper maps, CAD drawings, tabular databases — none designed to work together.
>
> GIS didn't replace those systems. It integrated them. The map became the common language. Location became the key that linked everything."

### MCP Solves the Same Problem

> "MCP does for AI what GIS did for mapping.
>
> It doesn't replace existing systems. It integrates them. The agent becomes the common interface. Natural language becomes the query that links everything.
>
> GIS succeeded because it met government where it was — integrating existing data rather than demanding new systems. MCP succeeds for the same reason."

| | GIS (1990s) | MCP (2020s) |
|---|-------------|-------------|
| **Problem** | Spatial data in silos | Operational data in silos |
| **Skeptic objection** | "Just use CAD" | "Just use APIs" |
| **Integration layer** | The map | The agent |
| **Common key** | Location | Natural language |
| **Who benefits most** | Government | Government |

### Transition to Demo

> "Let me show you what this looks like in practice. I built SAGE — Solano Agent for Geographic Enquiry — an MCP server that integrates Solano County's actual infrastructure: 152,000 parcels, 7 city zoning services, FEMA flood data, CAL FIRE hazard zones, the county code, the General Plan, and the FY25-26 budget.
>
> 40 tools. 13 categories. Real data. Real queries."

---

## SAGE Demos (6-7 minutes)

### Demo 1: Multi-System Property Analysis

**Prompt:**
> "Tell me everything about 2500 Cordelia Road in Fairfield — zoning, hazards, who provides services, assessed value, the works."

**What Happens:**
- AI chains 6 tools: geocode → parcel → zoning → flood → fire → districts
- Catches that "Fairfield" address is actually unincorporated county
- Synthesizes comprehensive report

**Narration:**
> "Six different data sources — Assessor, GIS, FEMA, CAL FIRE, county districts — queried in sequence, synthesized into one answer. And notice: it caught that this 'Fairfield' address is actually in unincorporated Solano County. That's jurisdiction routing — knowing who to ask."

---

### Demo 2: Regulatory Research

**Prompt:**
> "I have 30 acres of vineyard on A-40 land and want to build a winery. If I grow 50% of my grapes on-site and produce 50,000 gallons per year, what permit do I need? What if I also want to host wedding receptions?"

**What AI Must Figure Out:**

| Step | Finding | Source |
|------|---------|--------|
| 1 | 50,000 gal = Medium Winery | §28.01 Definitions |
| 2 | 50% on-site > 25% minimum ✓ | §28.71.20 |
| 3 | Medium winery on A-40 = AP or MUP | Table 28.21A |
| 4 | "Wedding" = Special Events Facility | §28.01 Definitions |
| 5 | Requires separate permit | §28.73.30 |

**Narration:**
> "The AI recognized that 'wedding receptions' isn't just something you do at a winery — it's a separately defined use called 'special events facility' that requires its own permit. That's the kind of institutional knowledge that takes years to develop. Now it's encoded in tool descriptions."

---

### Demo 3: Permit Workflow

**Prompt:**
> "I'm preparing a permit application for 4300 Suisun Valley Road. What hazards affect this property? Generate a notification list of owners within 300 feet."

**What Happens:**
- Hazard check: Flood zone, fire hazard severity
- Buffer analysis: Find all parcels within 300ft
- Output: Owner names, addresses, distances
- Map: Subject parcel + buffer + neighbors

**Narration:**
> "In one query: hazard assessment and notification list. Five tools coordinated automatically. That's 15-20 minutes of staff time — done in 10 seconds."

---

### Demo 4: Visual Spatial Analysis

**Prompt:**
> "We got a complaint about APN 010-112-0530 — possible unpermitted construction. The Assessor shows no improvements. Can you check the aerial?"

**What AI Finds:**
- Assessor: $0 improvement value
- Aerial: 2-3 structures visible, ground disturbance, access roads

**Narration:**
> "The Assessor says no improvements. The aerial shows structures. That's a discrepancy worth investigating. The AI pre-screened this before anyone drives out for a site visit."

---

### Demo 5: Layer Discovery

**Prompt:**
> "I'm doing CEQA review for a subdivision near Suisun Marsh. What environmental layers should I check?"

**What AI Finds:**
- 13 environmental layers with regulatory context
- Notes that Suisun Marsh layer is "cartographic only — contact BCDC for official boundaries"

**Narration:**
> "The AI didn't just list layers — it explained what each one means for CEQA. That caveat about BCDC? That's institutional knowledge embedded in metadata."

---

### Demo 6: Handoff to Interactive Map

**Prompt:**
> "Show me an interactive map of this property so I can explore the area."

**What Happens:**
- AI generates interactive map URL
- Map opens with parcel highlighted, relevant layers loaded

**Narration:**
> "The AI answered the question. But sometimes you want to explore — toggle layers, zoom around, click on neighbors. So SAGE hands off to an interactive map with the right context already loaded.
>
> Let me show you that map viewer."

**[TRANSITION TO VIDEO 2]**

---

# VIDEO 2: Web GIS Application

## Opening (30 seconds)

> "The agent handles questions. But staff and the public also need self-service mapping — the ability to explore, toggle layers, compare aerials, click and discover.
>
> This is an interactive map viewer I built on ESRI's ArcGIS JavaScript SDK. Let me show you some of the design decisions."

---

## Map Presets (1-2 minutes)

### The Dropdown Selector

**Show:** Dropdown in top-right: `Parcels | Planning | Hazards`

> "Different users need different layer configurations. A property owner checking their parcel doesn't need fire hazard zones on by default. A planner doing CEQA review does.
>
> Instead of one cluttered map, we have presets that load the right layers for the task."

| Preset | Audience | Default Layers |
|--------|----------|----------------|
| **Parcels** | General public | Parcels, addresses, boundaries, aerials |
| **Planning** | Planners, developers | Zoning (county + 7 cities), general plan, sphere of influence |
| **Hazards** | Disclosure, insurance | Fire hazard, flood, earthquake faults, Travis AFB |

---

## Layer Configuration System (2-3 minutes)

### The [TAG] Convention

**Show:** Layer list with tags visible in ArcGIS Online

> "Here's something I'm proud of. Layer behavior is controlled by tags in the layer name itself — readable by non-technical staff in ArcGIS Online.
>
> No code changes needed. Rename a layer, change its behavior."

| Tag | Behavior |
|-----|----------|
| `[EXCLUSIVE]` | Radio buttons — only one layer in group visible at a time |
| `[VECTOR_TILE]` | High-performance display layer paired with queryable feature layer |
| *(no tag)* | Standard checkbox toggle |

### [EXCLUSIVE] Example: Aerials

**Show:** Aerials group with radio buttons

> "Aerials are exclusive — you only want one visible at a time. Adding `[EXCLUSIVE]` to the group name automatically renders these as radio buttons instead of checkboxes.
>
> We have imagery back to 2004. Toggle between years to see development over time."

**Demo:** Switch between Aerial 2025 → 2019 → 2008 → 2004

### [VECTOR_TILE] Example: Parcels

**Show:** Both Parcels [VECTOR_TILE] and Parcels layers

> "Vector tiles are fast — they handle 152,000 parcels smoothly. But they're not queryable.
>
> So we pair them: the vector tile for display, the feature layer for queries. The user sees one 'Parcels' experience, but underneath there are two layers working together."

---

## Smart Search (1-2 minutes)

### Flexible APN Handling

**Show:** Search box: "Search address or APN..."

> "Their current parcel viewer shows a popup explaining how to format APNs. That's a UX failure.
>
> This search handles APNs however users type them."

**Demo:** Type these and show they all work:
- `0037-040-110` (with dashes)
- `0037040110` (no dashes)
- `037-040-110` (missing leading zero)
- `37 40 110` (spaces)

> "Same parcel. Four different inputs. All work."

### Address Search

**Demo:** Type "675 Texas St" → autocomplete → select → zoom

> "Addresses autocomplete against the county's address point layer. Select one, zoom to it, parcel highlighted."

---

## Progressive Labeling (1 minute)

### Scale-Dependent Display

**Show:** Zoomed out view with only large parcel labels

> "At county scale, showing all 152,000 parcel labels would be unreadable. So labels appear progressively based on parcel size and zoom level.
>
> Large agricultural parcels label first. Residential parcels only label when you're zoomed in enough to read them."

**Demo:** Zoom from county → neighborhood scale, watch labels appear

> "This makes it easier to find parcel numbers for large land tracts without obliterating the map at neighborhood scale."

---

## Layer Groups and Organization (1-2 minutes)

### Logical Grouping

**Show:** Expanded layer panel

> "Layers are organized by function, not by data source. Users don't care that flood data comes from FEMA — they care about hazards."

| Group | Contents |
|-------|----------|
| Travis Air Force Base | Base boundary, Wildlife hazard zone |
| Fire Hazard Severity Zone | 2025 zones (expandable for historical) |
| Flood | FEMA zones, state floodplains (exclusive) |
| City Zoning | All 7 cities (expandable) |
| Aerials | 2004-2025 (exclusive radio buttons) |

### Data Source Attribution

**Show:** Footer or info panel

> "We still attribute sources — FEMA, CAL FIRE, Assessor — but in metadata, not layer names. Clean interface, proper documentation."

---

## Technical Highlights (1-2 minutes)

### What's Under the Hood

> "A few technical notes for those interested:"

| Feature | Implementation |
|---------|----------------|
| Framework | ArcGIS JavaScript SDK 4.34 + React |
| Parcel performance | Vector tiles + feature layer hybrid |
| Configuration | Tag-based from ArcGIS Online layer names |
| Search | Unified address + APN with format normalization |
| State management | Zustand (bridges UI and MCP tools) |

### The MCP Connection

> "Remember: this same map can be launched by the AI agent. The agent answers questions, then hands off to self-service exploration. Same data, same layers, different interface for different needs."

---

## Closing (30 seconds)

> "The goal isn't to replace existing county systems — it's to make them more accessible.
>
> An AI that understands jurisdiction and regulation. A map viewer that non-technical staff can configure. Both built on the county's actual infrastructure.
>
> That's how I think about GIS: not just managing data, but building tools that create value."

---

# Quick Reference

## Demo Prompts (Video 1)

| Demo | Prompt |
|------|--------|
| Property Analysis | "Tell me everything about 2500 Cordelia Road in Fairfield..." |
| Winery Permit | "I have 30 acres of vineyard on A-40 land and want to build a winery..." |
| Permit Workflow | "I'm preparing a permit application for 4300 Suisun Valley Road..." |
| Code Enforcement | "We got a complaint about APN 010-112-0530..." |
| CEQA Review | "I'm doing CEQA review for a subdivision near Suisun Marsh..." |
| Map Handoff | "Show me an interactive map of this property..." |

## Layer Configuration Tags

| Tag | Effect | Example |
|-----|--------|---------|
| `[EXCLUSIVE]` | Radio buttons (one visible) | Aerials, Flood layers |
| `[VECTOR_TILE]` | Performance display layer | Parcels |
| *(none)* | Standard checkbox | Most layers |

## Map Presets

| Preset | Key Layers ON |
|--------|---------------|
| Parcels | Parcels, Address Points, City/County Boundary, Aerial 2025 |
| Planning | County Zoning, City Zoning, General Plan, Sphere of Influence |
| Hazards | Fire Hazard, Flood, Earthquake Faults, Travis AFB, Wildlife Zone |

---

# Presentation Tips

## Phrases to Use
- "Let me show you..."
- "Notice how it caught..."
- "This is the key insight..."
- "The agent coordinated..."
- "No code changes needed..."

## Phrases to Avoid
- "Um", "Uh", "So basically"
- Over-explaining (let the demo speak)
- Apologizing for limitations
- Technical jargon without context

## Key Messages
1. **MCP = GIS for AI** — Integration layer for systems that weren't designed to work together
2. **Jurisdiction routing** — Knowing who to ask matters more than the query itself
3. **Configuration by naming** — Non-technical staff can manage layer behavior
4. **Agent → Map handoff** — AI answers questions, map enables exploration

---

# Pre-Recording Checklist

## Technical Setup
- [ ] MCP server running and connected
- [ ] All demo queries verified working
- [ ] Interactive map loading correctly
- [ ] All three presets working (Parcels, Planning, Hazards)
- [ ] APN search formats tested
- [ ] Screen recording: 1080p, 60fps
- [ ] Audio: External mic, quiet room

## Content Prep
- [ ] Opening framing rehearsed (GIS/MCP parallel)
- [ ] Demo prompts ready to paste
- [ ] Map handoff transition planned
- [ ] Layer configuration demo sequence planned

## Backup Plans
- [ ] Alternative demo queries ready
- [ ] Know which demos to skip if running long
- [ ] Fallback if MCP connection fails (pre-recorded segment?)

---

# Timing Guide

## Video 1: Agentic AI (Target: 10-11 minutes)

| Segment | Duration | Cumulative |
|---------|----------|------------|
| Opening: GIS/MCP parallel | 2:30 | 2:30 |
| Demo 1: Property Analysis | 1:30 | 4:00 |
| Demo 2: Winery Permit | 1:30 | 5:30 |
| Demo 3: Permit Workflow | 1:30 | 7:00 |
| Demo 4: Code Enforcement | 1:00 | 8:00 |
| Demo 5: CEQA Layers | 1:00 | 9:00 |
| Demo 6: Map Handoff | 1:00 | 10:00 |
| Transition to Video 2 | 0:30 | 10:30 |

## Video 2: Web GIS (Target: 8-10 minutes)

| Segment | Duration | Cumulative |
|---------|----------|------------|
| Opening | 0:30 | 0:30 |
| Map Presets | 1:30 | 2:00 |
| Layer Configuration [TAGS] | 2:30 | 4:30 |
| Smart Search | 1:30 | 6:00 |
| Progressive Labeling | 1:00 | 7:00 |
| Layer Organization | 1:30 | 8:30 |
| Technical Highlights | 1:00 | 9:30 |
| Closing | 0:30 | 10:00 |