# SAGE: Solano Agent for Geographic Enquiry

## Project Specification v2.0

---

## Executive Summary

SAGE is an AI-powered GIS assistant designed to operate at the level of a county GIS Analyst when interacting with geographic information systems, property records, and spatial data. It combines real-time access to Solano County's GIS infrastructure (via MCP) with deep organizational knowledge about county processes, regulations, and data interpretation (via Skills).

**The core thesis**: A GIS Analyst's value comes not from knowing how to click buttons in ArcGIS, but from understanding *what questions to ask*, *which data sources to trust*, *how to interpret results in context*, and *what caveats to communicate*. SAGE captures this expertise in a reusable, scalable form.

---

## Vision: What Does "GIS Analyst Level" Mean?

A competent GIS Analyst performs these functions:

| Function | Description | SAGE Capability |
|----------|-------------|-----------------|
| **Data Discovery** | Finding the right layers, understanding schemas | ✓ Full |
| **Query Construction** | Spatial and attribute queries, SQL-like logic | ✓ Full |
| **Spatial Analysis** | Buffers, intersections, overlays, aggregations | ✓ Full |
| **Result Interpretation** | What do these results mean in context? | ✓ Full |
| **Visualization** | Maps, charts, infographics, route display | ✓ Full |
| **Communication** | Explaining findings to non-technical users | ✓ Full |
| **Process Knowledge** | Workflows, regulations, contacts, next steps | ✓ Full |
| **Cross-System Navigation** | GIS + Budget + General Plan + Org Chart | ✓ Full |
| **Quality Assurance** | Data validation, uncertainty communication | ✓ Full |
| **Routing & Directions** | Driving directions, travel time calculations | ✓ Full |
| **Document Search** | County Code, Budget, General Plan | ✓ Full |
| **Institutional Memory** | Historical context, "we tried that before" | ◐ Partial |
| **Stakeholder Relationships** | Knowing who to call, political context | ○ Human domain |

SAGE now has full capability in 11 of 13 functions, with partial capability in 1 more. The remaining function is an inherently human domain that SAGE supports but cannot replace.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SAGE ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       INTERACTIVE MAP (Next.js)                      │   │
│  │                    https://sage-three-theta.vercel.app/map           │   │
│  │                                                                      │   │
│  │  • Full ESRI ArcGIS JS SDK integration with WebMap support           │   │
│  │  • Parcel highlighting by APN or address via URL parameters          │   │
│  │  • Route visualization with driving directions display               │   │
│  │  • Layer controls, basemap gallery, legend, scale bar                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          MCP SERVER (45+ Tools)                      │   │
│  │                     Hosted on Vercel via mcp-handler                 │   │
│  │                                                                      │   │
│  │  GIS CORE           DOCUMENTS           ANALYSIS        VISUALIZATION│   │
│  │  ─────────────      ─────────────       ──────────      ──────────── │   │
│  │  geocode_address    search_county_code  search_parcels  render_map   │   │
│  │  get_parcel_details get_code_sections   get_parcels_in  generate_    │   │
│  │  get_zoning         search_budget         _buffer         infographic│   │
│  │  get_flood_zone     get_dept_budget     find_nearby      edit_image   │   │
│  │  get_fire_hazard    search_general_plan                              │   │
│  │  get_supervisor     get_gp_policies                                  │   │
│  │  get_special_dists  get_gp_chapter      ROUTING         ORG CHART    │   │
│  │  get_solano_context                     ──────────      ──────────── │   │
│  │                     ORG DATA            get_directions  get_org_     │   │
│  │                     ──────────────      get_travel_time   overview   │   │
│  │                     get_department                      get_department│   │
│  │                     search_positions                    search_       │   │
│  │                     compare_depts                         positions  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         DATA SOURCES                                 │   │
│  │                                                                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │   │
│  │  │ Solano GIS  │  │ ESRI Cloud  │  │ Local DBs   │  │ External   │  │   │
│  │  │ REST APIs   │  │ Services    │  │             │  │ APIs       │  │   │
│  │  │             │  │             │  │             │  │            │  │   │
│  │  │ • Parcels   │  │ • Routing   │  │ • County    │  │ • FEMA     │  │   │
│  │  │ • Zoning    │  │ • Geocoding │  │   Code DB   │  │ • CAL FIRE │  │   │
│  │  │ • Districts │  │ • Basemaps  │  │ • Budget DB │  │ • FAL.ai   │  │   │
│  │  │ • Addresses │  │ • WebMaps   │  │ • GenPlan DB│  │   (images) │  │   │
│  │  │ • Hazards   │  │             │  │ • Org Chart │  │            │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The Knowledge Layer: What Makes SAGE Different

### The Problem with "Just Query Tools"

A naive GIS chatbot can execute queries. But without organizational knowledge, it will:

- Return county zoning for a property inside Fairfield city limits
- Report assessed value without explaining Prop 13 context
- Say "you can build an ADU" without mentioning permits, septic, or fire codes
- Give a flood zone without explaining insurance implications
- Fail to warn that GIS data isn't legally authoritative

**SAGE embeds the knowledge that prevents these mistakes.**

### Knowledge Domains (From Research)

Based on analysis of common GIS analyst tasks in Solano County:

| Domain | Key Knowledge | Why It Matters |
|--------|---------------|----------------|
| **Jurisdiction Routing** | 7 cities vs unincorporated; mailing address ≠ jurisdiction | Determines which rules apply, who to contact |
| **Prop 13 / Assessed Value** | Base year, 2% cap, Prop 8 reductions | Prevents misinterpretation of value data |
| **Permits & Code** | Zoning ≠ permission; permits required; Code Compliance | Manages expectations, proper referrals |
| **ADU Rules** | State law baseline, county vs city rules, ag zones different | High-demand topic with complex overlays |
| **Flood Zones** | SFHA definitions, insurance requirements, LOMA process | Public safety, financial implications |
| **Fire Hazard** | Hazard vs risk, FHSZ implications, WUI codes, defensible space | Timely topic, affects insurance & building |
| **GIS Disclaimers** | Data accuracy limits, not legally authoritative | Professional liability, proper framing |
| **Special Districts** | Fire, water, sewer, schools — who provides what | Common "who do I call" questions |

### Progressive Disclosure Strategy

Not all knowledge is needed for every query. SAGE loads context in stages:

```
Level 1: Always Present (System Prompt)
─────────────────────────────────────────
• Core principles (jurisdiction matters, GIS is reference not gospel)
• Standard disclaimer language
• Response style guidelines
~500 tokens

Level 2: Tool Descriptions (MCP)
─────────────────────────────────────────
• When to use each tool
• Critical routing logic (city vs county)
• Key field meanings
• Common pitfalls for that tool
~2,000 tokens total across all tools

Level 3: On-Demand Reference (Skill)
─────────────────────────────────────────
• Detailed zoning code explanations
• Full Prop 13 / Prop 8 explanation
• ADU requirements by jurisdiction
• Contact directory
• Loaded only when relevant
~10,000+ tokens available, ~500-2,000 used per query
```

---

## MCP Server Specification

### Tool Inventory (45+ Tools Implemented)

#### GIS Core Tools

| Tool | Input | Output | Status |
|------|-------|--------|--------|
| `geocode_address` | address string | lat, lon, APN, confidence | ✓ Live |
| `get_parcel_details` | APN or lat/lon | Comprehensive parcel report | ✓ Live |
| `get_zoning` | APN or lat/lon | zone_code, jurisdiction, auto-routes city vs county | ✓ Live |
| `get_flood_zone` | APN or lat/lon | FEMA zone, SFHA status, insurance implications | ✓ Live |
| `get_fire_hazard_zone` | APN or lat/lon | FHSZ class, SRA/LRA, defensible space reqs | ✓ Live |
| `get_supervisor_district` | APN or lat/lon | Supervisor name, district, contact info | ✓ Live |
| `get_special_districts` | APN or lat/lon | Fire, water, sewer, school districts | ✓ Live |
| `get_solano_context` | topic string | Reference material for interpretation | ✓ Live |

#### Spatial Analysis Tools

| Tool | Input | Output | Status |
|------|-------|--------|--------|
| `search_parcels` | criteria object | count, aggregates, sample parcels | ✓ Live |
| `find_nearby_parcels` | APN + radius | parcels within buffer for notifications | ✓ Live |
| `find_nearby` | layer type, location, radius | nearby features with distances | ✓ Live |
| `render_map` | APN, buffer, or bbox | Static map PNG with parcel highlighting | ✓ Live |

#### County Code Tools (Chapter 26, 28, etc.)

| Tool | Input | Output | Status |
|------|-------|--------|--------|
| `search_county_code` | query string | matching sections with snippets | ✓ Live |
| `get_county_code_sections` | section IDs array | full text of code sections | ✓ Live |
| `list_county_code_chapters` | none | available chapters | ✓ Live |
| `list_county_code_sections` | chapter number | sections in chapter | ✓ Live |

#### Budget Tools (FY2025-26)

| Tool | Input | Output | Status |
|------|-------|--------|--------|
| `search_budget` | query, filters | matching budget chunks | ✓ Live |
| `get_budget_chunk` | chunk ID | full text of budget section | ✓ Live |
| `get_department_budget` | department name | all budget info for dept | ✓ Live |
| `list_budget_departments` | none | all departments | ✓ Live |
| `list_budget_sections` | none | budget sections A-N | ✓ Live |
| `get_budget_overview` | none | summary statistics | ✓ Live |

#### General Plan Tools (2008 GP + Amendments)

| Tool | Input | Output | Status |
|------|-------|--------|--------|
| `search_general_plan` | query, filters | matching GP chunks | ✓ Live |
| `get_general_plan_chunk` | chunk ID | full text | ✓ Live |
| `get_general_plan_chapter` | chapter number | full chapter content | ✓ Live |
| `search_general_plan_policies` | query | matching policies/goals | ✓ Live |
| `list_general_plan_chapters` | none | available chapters | ✓ Live |
| `list_general_plan_documents` | none | all document types | ✓ Live |
| `get_general_plan_overview` | none | summary statistics | ✓ Live |

#### Org Chart Tools (April 2025 Position Allocation)

| Tool | Input | Output | Status |
|------|-------|--------|--------|
| `get_org_overview` | none | all departments with FTE | ✓ Live |
| `get_department` | code or name | divisions, positions | ✓ Live |
| `get_division` | division code | positions and FTE | ✓ Live |
| `search_positions` | title query | matching positions county-wide | ✓ Live |
| `get_position_distribution` | title | position across departments | ✓ Live |
| `list_job_classes` | optional filters | job classifications | ✓ Live |
| `compare_departments` | dept array | side-by-side comparison | ✓ Live |

#### Routing & Directions Tools (ESRI World Route Service)

| Tool | Input | Output | Status |
|------|-------|--------|--------|
| `get_directions` | origin, destination | turn-by-turn directions, map URL | ✓ Live |
| `get_travel_time` | origin, destination | distance and duration only | ✓ Live |

#### Visualization Tools

| Tool | Input | Output | Status |
|------|-------|--------|--------|
| `render_map` | APN, buffer, bbox, extent | static map PNG with highlights | ✓ Live |
| `generate_infographic` | prompt, aspect ratio | AI-generated infographic | ✓ Live |
| `edit_image` | image URLs, prompt | edited/combined images | ✓ Live |

### Tool Design Principles

1. **Jurisdiction logic baked in**: `get_zoning` automatically checks city boundaries and routes to correct layer. Claude doesn't need to figure this out each time.

2. **Rich error responses**: When queries fail, return structured errors Claude can reason about:
   ```json
   {
     "success": false,
     "error_type": "NO_RESULTS",
     "message": "No parcels found matching criteria",
     "suggestion": "Try broadening the search or checking the APN format"
   }
   ```

3. **Interpretation included**: Tools don't just return raw data. `get_flood_zone` returns the zone code AND a plain-English explanation of what it means.

4. **Pagination handled internally**: For aggregate queries, the MCP server handles pagination transparently, using `outStatistics` where available.

5. **Canonical coordinate system**: All inputs accept WGS84 (lat/lon). All outputs return WGS84. Conversion happens at the ArcGIS boundary.

---

## Skill Specification

### File Structure

```
sage-skill/
├── SKILL.md                      # Main skill file with routing logic
├── LICENSE.txt                   # Apache 2.0
├── references/
│   ├── jurisdiction.md           # City vs county, routing rules
│   ├── zoning-codes.md           # Complete zoning code reference
│   ├── prop13.md                 # Assessed value explanation
│   ├── adu-rules.md              # ADU/JADU requirements
│   ├── flood-zones.md            # FEMA zone interpretation
│   ├── fire-hazard.md            # FHSZ interpretation
│   ├── special-districts.md      # District types and purposes
│   ├── contacts.md               # Department contacts
│   └── disclaimers.md            # Standard disclaimer language
├── scripts/
│   ├── validate_apn.py           # APN format validation
│   ├── format_report.py          # Standardized report formatting
│   └── check_jurisdiction.py     # City boundary check helper
└── templates/
    ├── parcel_report.md          # Standard parcel report format
    ├── hazard_summary.md         # Hazard overlay report
    └── analysis_memo.md          # Formal analysis memo format
```

### SKILL.md Content

```markdown
---
name: sage
description: >
  Solano County GIS analysis and property information assistant.
  Use when users ask about: parcels, zoning, property values, flood zones,
  fire hazard zones, supervisorial districts, special districts, permits,
  ADUs, or any geographic/property question in Solano County, California.
  Also use when users need to understand what GIS results mean or who to
  contact for county services.
allowed-tools:
  - Read
  - Bash
  - mcp__sage-gis  # All tools from the MCP server
---

# SAGE: Solano Agent for Geographic Enquiry

You are SAGE, a GIS analyst assistant for Solano County, California.
Your role is to help users understand geographic and property information
by querying authoritative data sources and interpreting results in context.

## Core Principles

1. **Jurisdiction First**: Always determine if a location is in an incorporated
   city (Benicia, Dixon, Fairfield, Rio Vista, Suisun City, Vacaville, Vallejo)
   or unincorporated county. This affects which regulations apply.
   
   ⚠️ CRITICAL: Mailing address city ≠ jurisdiction. "Fairfield, CA" in an
   address does NOT mean inside Fairfield city limits. Always verify.

2. **GIS is Reference, Not Gospel**: Data has varying accuracy. Parcel lines
   are approximate. Always recommend official sources (surveys, recorded deeds,
   FEMA determination letters) for legal/financial decisions.

3. **Zoning ≠ Permission**: Zoning shows what's *potentially* allowed.
   Permits are still required. Never imply someone can proceed without
   proper approvals.

4. **Interpret, Don't Just Report**: Translate codes into plain language.
   "Zone AE" → "high-risk flood zone with 1% annual flood chance;
   flood insurance required if you have a federally-backed mortgage."

5. **Know Your Limits**: For permit processes, code violations, appeals,
   or legal determinations, provide contact info and refer to appropriate
   department. Don't guess at procedures.

## Standard Workflow

For property-specific questions:

1. **Geocode** the address to get coordinates and APN
2. **Check jurisdiction** — city or unincorporated?
3. **Query relevant layers** — zoning, hazards, districts as needed
4. **Load context** — read reference files for interpretation
5. **Respond with**:
   - Direct answer to the question
   - Relevant context and interpretation
   - Appropriate caveats
   - Next steps or contacts if applicable
   - Standard disclaimer

## Reference Files

When you need detailed information, read these files:

- `references/jurisdiction.md` — City vs county routing, common pitfalls
- `references/zoning-codes.md` — Zoning code meanings and allowed uses
- `references/prop13.md` — Assessed vs market value, Prop 8 reductions
- `references/adu-rules.md` — ADU requirements by jurisdiction
- `references/flood-zones.md` — FEMA zone explanations, insurance
- `references/fire-hazard.md` — FHSZ classes, defensible space, WUI codes
- `references/special-districts.md` — Fire, water, sewer districts
- `references/contacts.md` — Department phone numbers and emails

## Standard Disclaimer

Include this (or a natural variation) when providing parcel-specific information:

> "This information is from Solano County GIS for reference purposes.
> GIS data has varying accuracy and is not a substitute for official
> records, surveys, or professional advice. For official determinations,
> contact [relevant department]."

## Response Style

- Lead with the direct answer
- Provide context that helps interpretation
- Note caveats and limitations
- Suggest next steps when appropriate
- Keep technical jargon to a minimum
- Don't overwhelm with information — answer what was asked
```

---

## Data Integration Strategy

### Current State: Siloed Systems

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   GIS           │     │   Accela        │     │   Assessor      │
│   (Spatial)     │     │   (Permits)     │     │   (Valuation)   │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Parcels         │     │ Building        │     │ Assessed Values │
│ Zoning          │     │ permits         │     │ Ownership       │
│ Flood/Fire      │     │ Planning apps   │     │ Sales history   │
│ Districts       │     │ Code cases      │     │ Exemptions      │
│                 │     │ Business lic    │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │                       │                       │
         └───────────── APN ─────┴───────────────────────┘
                    (common key, but no integration)
```

### SAGE Approach: Intelligent Bridge

SAGE doesn't merge databases. It reasons across them:

```
User: "Can I build an ADU at 123 Oak St, Fairfield?"

SAGE Process:
├── 1. Geocode address → APN, coordinates
├── 2. Check city boundary → Actually unincorporated (not Fairfield city)
├── 3. Query county zoning → A-20 (Agricultural, 20-acre)
├── 4. Load ADU knowledge → Ag zones have different rules ("secondary dwelling")
├── 5. Query parcel size → 2.3 acres (below A-20 minimum for second dwelling)
├── 6. Query hazard overlays → Moderate fire hazard
└── 7. Synthesize response:

"Your property at 123 Oak St is in unincorporated Solano County (not
Fairfield city limits, despite the mailing address). It's zoned A-20
(Agricultural, 20-acre minimum).

For agricultural zones, second dwelling units have different rules than
standard ADUs. The A-20 zone typically requires 20 acres minimum for a
secondary dwelling, and your parcel is 2.3 acres, so a second unit may
not be permitted under current zoning.

However, California's state ADU law may provide some options even on
smaller agricultural parcels. I'd recommend contacting Solano County
Planning at (707) 784-6765 to discuss your specific situation.

Note: Your property is in a Moderate Fire Hazard Severity Zone, which
may affect construction requirements for any new structures.

[Standard disclaimer]"
```

### Future State: Deeper Integration

If SAGE moves from demo to production, integration opportunities include:

| System | Current Access | Future Potential |
|--------|---------------|------------------|
| **Accela** | Link out with APN | API access for permit history, status |
| **Assessor** | Values in parcel layer | Sales data, ownership, exemptions |
| **Planning Docs** | None | General Plan policies, EIRs |
| **Historical Imagery** | None | Change detection, permit verification |
| **LAFCO** | Static maps | Real-time district boundaries |

The Cayman model (real-time transactional integration between land registry and GIS) represents the gold standard. SAGE demonstrates the value; true integration would be a multi-year county IT initiative.

---

## Development Phases

### Phase 1: Interview Demo ✓ COMPLETED
**Timeline**: January 2025
**Goal**: Working demonstration for video submission

**Deliverables**:
- [x] MCP server with core GIS tools (8 tools)
- [x] Basic skill with core knowledge domains
- [x] Demo scenarios working end-to-end
- [x] Video demonstrating capabilities

### Phase 2: Functional Prototype ✓ COMPLETED
**Timeline**: January 2025
**Goal**: Usable tool for internal testing

**Delivered**:
- [x] 45+ MCP tools across all categories
- [x] Complete knowledge reference files
- [x] Error handling and edge cases
- [x] Static map rendering capability
- [x] Hosted MCP server on Vercel
- [x] Interactive map with ESRI JS SDK
- [x] County Code database (Chapters 19, 23, 24, 26, 26.5, 28, 30, 31)
- [x] Budget document search (FY2025-26)
- [x] General Plan search (2008 GP + amendments)
- [x] Org Chart data (April 2025 positions)
- [x] Driving directions & routing
- [x] AI image generation for infographics

### Phase 3: Production Pilot (Current)
**Timeline**: Q1-Q2 2025
**Goal**: Expanded deployment and testing

**In Progress / Planned**:
- [ ] Additional county code chapters
- [ ] Historical budget comparisons
- [ ] Permit system integration (Accela)
- [ ] User authentication
- [ ] Usage analytics and monitoring
- [ ] Mobile-responsive map interface
- [ ] Documentation and training materials

### Phase 4: Public-Facing Capability
**Timeline**: Q3-Q4 2025
**Goal**: Public access to property information

**Planned**:
- [ ] Public web interface
- [ ] Rate limiting and abuse prevention
- [ ] Accessibility compliance (WCAG 2.1)
- [ ] Multi-language support
- [ ] Integration with county website
- [ ] Chatbot widget for embedding

---

## Technical Implementation

### Technology Stack

```
Next.js 15.5 Application
├── TypeScript                     # Type-safe development
├── mcp-handler                    # MCP server via HTTP transport
├── @arcgis/core (4.34)            # ESRI JS SDK for interactive maps
├── better-sqlite3                 # Local SQLite for document search
├── @vercel/blob                   # Image storage for map renders
├── fal-ai                         # AI image generation
└── zod                            # Runtime type validation

Client Libraries:
├── React 19                       # UI framework
├── Zustand                        # State management
├── Tailwind CSS                   # Styling
└── ESRI Calcite Components        # Map UI components
```

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Vercel Edge                              │
├─────────────────────────────────────────────────────────────────┤
│  /api/mcp          → MCP Server (Streamable HTTP)               │
│  /api/arcgis-token → OAuth token proxy                          │
│  /api/arcgis-route → Routing API proxy                          │
│  /map              → Interactive ESRI Map (Next.js SSR)         │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ SQLite DBs  │  │ Solano GIS  │  │ ESRI Cloud  │
    │             │  │ REST APIs   │  │ Services    │
    │ • county.db │  │             │  │             │
    │ • budget.db │  │ • Parcels   │  │ • Routing   │
    │ • gp.db     │  │ • Zoning    │  │ • Basemaps  │
    │ • org.json  │  │ • Hazards   │  │ • WebMaps   │
    └─────────────┘  └─────────────┘  └─────────────┘
```

### Data Sources

**GIS REST APIs (Live Queries)**:
```
Solano County ArcGIS Server:
  https://solanocountygis.com/server/rest/services
  • Parcels, Zoning, Districts, Hazards, Addresses

ESRI World Route Service (OAuth):
  https://route-api.arcgis.com/arcgis/rest/services/World/Route
  • Driving directions, travel time calculations
  • Cost: 0.005 credits/route (~$0.0005)
```

**Local SQLite Databases**:
```
data/county_code.db    - Chapters 19, 23, 24, 26, 26.5, 28, 30, 31
data/budget.db         - FY2025-26 Recommended Budget (chunked)
data/general_plan.db   - 2008 GP + Housing Element + EIR (chunked)
data/org_chart.json    - April 2025 Position Allocation Report
```

**External APIs**:
```
Vercel Blob Storage    - Map image renders
FAL.ai                 - AI infographic generation
ArcGIS Online          - WebMaps, basemaps, OAuth tokens
```

---

## Success Metrics

### Demo Success (Interview)
- [ ] Agent correctly navigates Solano's actual GIS infrastructure
- [ ] Queries return real data from real county layers
- [ ] Spatial reasoning is sound (correct buffers, proper intersections)
- [ ] Agent explains its process (what layers, why, what queries)
- [ ] Agent handles jurisdiction routing correctly
- [ ] Output is useful (actual counts, values, or maps)
- [ ] Knowledge layer prevents common mistakes

### Production Success (Long-term)
- **Accuracy**: >95% correct jurisdiction routing
- **Usefulness**: Positive feedback from staff users
- **Efficiency**: Reduces time for common queries by 50%+
- **Adoption**: Regular use by planning/GIS staff
- **Public Value**: Measurable improvement in resident self-service

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **ArcGIS API changes** | Low | High | Version pin, monitor endpoints |
| **Data accuracy issues** | Medium | Medium | Clear disclaimers, human escalation paths |
| **Over-reliance by staff** | Medium | Medium | Training, clear capability limits |
| **Public misinterpretation** | Medium | High | Strong framing, required disclaimers |
| **Token cost at scale** | Low | Medium | Skill progressive disclosure, caching |
| **Security concerns** | Low | High | No sensitive data, read-only queries |

---

## Differentiation

| What Others Might Build | What SAGE Delivers |
|------------------------|------------------------|
| ChatGPT summarizing GIS concepts | Claude executing real spatial queries against live data |
| Slideshow about AI potential | 45+ production tools querying actual county systems |
| Python script with hardcoded queries | Agent that discovers, adapts, and interprets results |
| Demo against generic/sample data | Demo against Solano's actual GIS infrastructure |
| Query tool that returns raw data | Assistant that interprets and explains with context |
| Tool that ignores jurisdiction | Tool that routes city vs county correctly every time |
| Static map exports | Interactive web map with parcel highlighting & routing |
| Separate disconnected tools | Unified system: GIS + Code + Budget + Org + Routing |
| Text-only responses | Visual outputs: maps, infographics, route displays |

**Key Technical Achievements**:
- Full ESRI ArcGIS JS SDK integration in Next.js
- OAuth 2.0 authentication for ESRI premium services
- Vector-based SQLite search for county documents (FTS5)
- Server-side map rendering with Vercel Blob storage
- URL-driven map state for shareable links
- Client-side route visualization without login prompts

**The message**: "I understand both the AI and the GIS deeply enough to make them work together on your actual systems—and I've built the infrastructure to make it production-ready."

---

## Appendices

### A. Solano County GIS Endpoints
[Detailed endpoint documentation - see original spec]

### B. Knowledge Reference Content
[Full content of the 8 knowledge domains - see research document]

### C. Demo Scenario Scripts
[Detailed walkthrough of each demo scenario]

### D. Skill Reference Files
[Complete content for each reference/*.md file]

### E. Observability & Monitoring
[See companion document: SAGE_Observability_Addendum.md]
- Raindrop.ai integration architecture
- Custom signals for GIS-specific failure modes
- Tracing tool chains
- Dashboard configuration for demo
- Experiments framework

---

## Interactive Map Features

### URL Parameters

The interactive map at `/map` supports the following URL parameters:

| Parameter | Format | Example | Description |
|-----------|--------|---------|-------------|
| `preset` | string | `hazards` | Map preset (base, hazards, zoning, environmental, districts) |
| `apn` | XXX-XXX-XXX | `0046-101-050` | Highlight and zoom to parcel |
| `address` | URL-encoded | `123+Main+St` | Geocode and highlight address |
| `center` | lng,lat | `-122.04,38.25` | Center map on coordinates |
| `zoom` | 1-19 | `15` | Set zoom level |
| `origin` | lng,lat,label | `-122.04,38.25,Fairfield` | Route start point |
| `destination` | lng,lat,label | `-121.99,38.36,Vacaville` | Route end point |

**Example URLs**:
```
# View a parcel
/map?apn=0046-101-050

# Show driving route
/map?origin=-122.04,38.25,Fairfield&destination=-121.99,38.36,Vacaville

# Hazard assessment view
/map?preset=hazards&address=675+Texas+St,+Fairfield
```

### Route Display

When `origin` and `destination` are provided:
- Blue route line showing driving path
- Green marker at origin, red marker at destination
- Info overlay showing distance and duration
- Map auto-zooms to fit entire route

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2025 | Initial specification |
| 2.0 | January 2025 | Major update reflecting production capabilities |
|     |              | • 45+ MCP tools implemented |
|     |              | • Interactive map with ESRI JS SDK |
|     |              | • County Code, Budget, General Plan search |
|     |              | • Org Chart data integration |
|     |              | • Driving directions with route display |
|     |              | • AI infographic generation |

---

*"The goal isn't to replace GIS analysts—it's to give them a collaborator that handles the repetitive query work while they focus on analysis, decisions, and the human relationships that make government work."*
