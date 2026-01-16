# SAGE: Solano Agent for Geographic Enquiry

## Project Specification v1.0

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
| **Visualization** | Maps, charts, summary tables | ◐ Partial |
| **Communication** | Explaining findings to non-technical users | ✓ Full |
| **Process Knowledge** | Workflows, regulations, contacts, next steps | ✓ Full |
| **Cross-System Navigation** | GIS + Permits + Assessor + Planning | ◐ Partial (linked) |
| **Quality Assurance** | Data validation, uncertainty communication | ✓ Full |
| **Institutional Memory** | Historical context, "we tried that before" | ○ Future |
| **Stakeholder Relationships** | Knowing who to call, political context | ○ Human domain |

SAGE targets full capability in 7 of 11 functions, with partial capability in 2 more. The remaining 2 are inherently human domains that SAGE supports but cannot replace.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SAGE ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         SKILL LAYER                                  │   │
│  │                  "The Organizational Brain"                          │   │
│  │                                                                      │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                 │   │
│  │  │ SKILL.md     │ │ references/  │ │ scripts/     │                 │   │
│  │  │              │ │              │ │              │                 │   │
│  │  │ • When to    │ │ • Zoning     │ │ • Validation │                 │   │
│  │  │   use tools  │ │   codes      │ │ • Formatting │                 │   │
│  │  │ • How to     │ │ • Prop 13    │ │ • Geocoding  │                 │   │
│  │  │   interpret  │ │ • Flood/Fire │ │   helpers    │                 │   │
│  │  │ • Caveats    │ │ • Districts  │ │              │                 │   │
│  │  │ • Contacts   │ │ • ADU rules  │ │              │                 │   │
│  │  └──────────────┘ └──────────────┘ └──────────────┘                 │   │
│  │                                                                      │   │
│  │  Loaded on-demand via progressive disclosure                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          MCP SERVER                                  │   │
│  │                     "The Operational Hands"                          │   │
│  │                                                                      │   │
│  │  DISCOVERY          QUERY              ANALYSIS         OUTPUT       │   │
│  │  ────────────       ─────────────      ──────────       ──────────   │   │
│  │  list_services      query_parcels      buffer           render_map   │   │
│  │  describe_layer     query_location     intersect        export_csv   │   │
│  │  sample_records     get_zoning         aggregate        format_report│   │
│  │                     get_flood_zone     calculate_area                │   │
│  │                     get_fire_hazard                                  │   │
│  │                     get_parcel_details                               │   │
│  │                     get_supervisor                                   │   │
│  │                     get_special_districts                            │   │
│  │                     search_parcels                                   │   │
│  │                     get_nearby                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      EXTERNAL DATA SOURCES                           │   │
│  │                                                                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │   │
│  │  │ Solano      │  │ Solano      │  │ State/Fed   │  │ Linked     │  │   │
│  │  │ County GIS  │  │ ReGIS       │  │ Services    │  │ Systems    │  │   │
│  │  │             │  │ Portal      │  │             │  │            │  │   │
│  │  │ • Parcels   │  │ • Downloads │  │ • FEMA NFHL │  │ • Accela   │  │   │
│  │  │ • Zoning    │  │ • Metadata  │  │ • CAL FIRE  │  │   (portal) │  │   │
│  │  │ • Districts │  │             │  │ • Census    │  │ • Assessor │  │   │
│  │  │ • Addresses │  │             │  │             │  │   (portal) │  │   │
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

### Tool Inventory

#### Tier 1: Core Tools (Demo-Ready)

| Tool | Input | Output | Notes |
|------|-------|--------|-------|
| `geocode_address` | address string | lat, lon, APN, confidence | Foundation for everything |
| `get_parcel_details` | APN or lat/lon | Comprehensive parcel report | Single call for "tell me about this property" |
| `get_zoning` | lat, lon | zone_code, description, jurisdiction, interpretation | Auto-routes city vs county |
| `get_flood_zone` | lat, lon | FEMA zone, SFHA status, plain-English explanation | Includes insurance implications |
| `get_fire_hazard_zone` | lat, lon | FHSZ class, SRA/LRA, requirements triggered | Includes defensible space, WUI info |
| `get_supervisor` | lat, lon or district | Supervisor name, district, contact, meeting schedule | Civic engagement |
| `get_solano_context` | topic string | Detailed reference material | Knowledge retrieval from skill |

#### Tier 2: Analysis Tools (Makes Demo Impressive)

| Tool | Input | Output | Notes |
|------|-------|--------|-------|
| `search_parcels` | criteria object | count, aggregates, sample APNs | Enables "all ag parcels in District 3" |
| `buffer_intersect` | layer, geometry, distance | features within buffer | Enables "parcels within 500ft of parks" |
| `get_special_districts` | lat, lon | all districts covering location | Fire, water, sewer, school, etc. |
| `get_nearby` | layer, lat, lon, radius, limit | nearby features with distances | Schools, parks, fire stations |
| `render_map` | layers, bbox, highlights | PNG or URL | Visual output |

#### Tier 3: Extended Tools (Production)

| Tool | Input | Output | Notes |
|------|-------|--------|-------|
| `get_general_plan` | lat, lon | GP designation, description | Planning context |
| `get_hazard_overlays` | lat, lon | All hazards in one call | Flood, fire, fault, dam, airport |
| `get_permit_link` | APN | Accela search URL | Bridge to permit system |
| `compare_parcels` | APN array, fields | Side-by-side comparison | Analyst workflow |
| `export_analysis` | query results, format | CSV, GeoJSON, or report | Data export |

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

### Phase 1: Interview Demo (Current)
**Timeline**: 5 days  
**Goal**: Working demonstration for video submission

**Deliverables**:
- [ ] MCP server with Tier 1 tools (6-7 tools)
- [ ] Basic skill with core knowledge domains
- [ ] 4 demo scenarios working end-to-end
- [ ] **Raindrop observability integration** (see Observability Addendum)
- [ ] 10-12 minute video demonstrating capabilities

**Demo Scenarios**:
1. Simple lookup with jurisdiction routing
2. Spatial analysis (parcels near parks)
3. Aggregation by district
4. Hazard overlay query

**Observability for Demo**:
- [ ] Basic interaction tracking with `begin()` / `finish()`
- [ ] Properties: query_type, jurisdiction, tools_used, success
- [ ] 2-3 custom signals defined (jurisdiction_confusion, missing_disclaimer)
- [ ] Dashboard screenshots/screenshare in video

### Phase 2: Functional Prototype
**Timeline**: 2-4 weeks post-interview  
**Goal**: Usable tool for internal testing

**Additions**:
- [ ] Tier 2 tools (analysis, special districts)
- [ ] Complete knowledge reference files
- [ ] Error handling and edge cases
- [ ] Map rendering capability
- [ ] Hosted MCP server (Cloudflare Workers)
- [ ] Full tool tracing with `withTool()`
- [ ] Skill reference tracing with `withSpan()`

### Phase 3: Production Pilot
**Timeline**: 2-3 months  
**Goal**: Limited deployment for staff testing

**Additions**:
- [ ] Tier 3 tools (extended analysis)
- [ ] Integration with county authentication
- [ ] Complete Raindrop signal library
- [ ] A/B experiments framework
- [ ] Alert configuration (Slack integration)
- [ ] User feedback instrumentation
- [ ] Documentation and training materials

### Phase 4: Public-Facing Capability
**Timeline**: 6+ months  
**Goal**: Public access to property information

**Additions**:
- [ ] Public interface (web or chatbot)
- [ ] Rate limiting and abuse prevention
- [ ] Accessibility compliance
- [ ] Multi-language support consideration
- [ ] Integration with county website

---

## Technical Implementation

### MCP Server Stack

```
TypeScript / Node.js
├── @modelcontextprotocol/sdk     # MCP server framework
├── axios                          # HTTP client for ArcGIS REST
├── @turf/turf                     # Client-side spatial operations
├── proj4                          # Coordinate transformations
├── raindrop-ai                    # Agent observability (see Observability Addendum)
└── sharp (optional)               # Map image processing
```

### Deployment Options

| Option | Pros | Cons | Recommended For |
|--------|------|------|-----------------|
| **Local (stdio)** | Simple, no hosting | User must install | Development, demo |
| **Cloudflare Workers** | Fast, free tier, easy deploy | V8 runtime limits | Production pilot |
| **Vercel** | Full Node.js, familiar | Slower cold starts | Complex processing |
| **County Infrastructure** | Full control, internal | IT overhead | Long-term production |

### Data Sources

**Primary (Query via REST)**:
```
Solano County ArcGIS Server:
  https://solanocountygis.com/server/rest/services

Solano ArcGIS Online:
  https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services
```

**Federal/State (Query via REST)**:
```
FEMA NFHL:
  https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer

CAL FIRE FHSZ:
  https://services.gis.ca.gov/.../Fire_Severity_Zones/MapServer
```

**Downloadable (For Analysis)**:
```
ReGIS Data Downloads:
  https://regis.solanocounty.com/apps/
  
  - Parcels (with assessed values)
  - Address Points
  - City/County Boundaries
  - Zoning
  - BOS Districts
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

| What Others Might Build | What SAGE Demonstrates |
|------------------------|------------------------|
| ChatGPT summarizing GIS concepts | Claude executing real spatial queries |
| Slideshow about AI potential | Working agent against live county data |
| Python script with hardcoded queries | Agent that discovers and adapts |
| Demo against generic/sample data | Demo against Solano's actual infrastructure |
| Query tool that returns raw data | Assistant that interprets and explains |
| Tool that ignores jurisdiction | Tool that routes correctly every time |
| "It works on my machine" demo | Production observability with failure mode detection |

**The message**: "I understand both the AI and the GIS deeply enough to make them work together on your actual systems—and I understand the organizational knowledge that makes the difference between a demo and a useful tool."

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

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial specification |

---

*"The goal isn't to replace GIS analysts—it's to give them a collaborator that handles the repetitive query work while they focus on analysis, decisions, and the human relationships that make government work."*
