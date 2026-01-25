# SAGE: Executive Summary

**Solano Agent for Geographic Enquiry**

---

## The Challenge

Every government GIS shop faces the same problem: data lives everywhere. Parcels in the assessor system, zoning in planning, flood zones at FEMA, fire hazard at CalFire, the county code in one database, the general plan in another, the budget somewhere else.

When a resident asks "Can I rent my cabin as an Airbnb?"—that simple question touches property records, zoning, fire hazard zones, and regulatory code. No single database answers it. Today, answering requires a knowledgeable staff member who knows which systems to check and how to synthesize the results.

---

## The Insight

In the 1990s, GIS solved this problem for spatial data. The map became the integration layer. Location became the common key that linked systems never designed to talk to each other.

**The same approach works today.** AI can serve as the integration layer for all the other data, using natural language as the key. GIS already solved the integration problem once. It makes sense to solve it again from the same place.

| | GIS (1990s) | AI (2020s) |
|---|-------------|------------|
| **Problem** | Spatial data in silos | Operational data in silos |
| **Skeptic objection** | "Just use CAD" | "Just chat with GPT" |
| **Reality** | No common format | No connection to your data |
| **Solution** | Integration layer (the map) | Integration layer (the agent) |
| **Common key** | Location | Natural language |
| **Who benefits most** | Government | Government |

---

## What We Built

SAGE connects to Solano County's actual data infrastructure:

| Category | What's Integrated |
|----------|-------------------|
| **Property** | 152,000 parcels, assessor data, building characteristics |
| **Zoning** | County zoning + all 7 cities (Fairfield, Vacaville, Vallejo, Benicia, Dixon, Rio Vista, Suisun City) |
| **Hazards** | FEMA flood zones, CAL FIRE severity zones, earthquake faults |
| **Districts** | Fire, water, garbage, schools, supervisorial |
| **Regulatory** | County Code (8 chapters), General Plan (13 chapters) |
| **Administrative** | FY25-26 budget, org chart, 3,284 FTE positions |
| **Meetings** | Board of Supervisors minutes, ReGIS consortium minutes |

**Over 50 tools** give AI the context to answer questions no traditional system could handle.

---

## Key Capabilities Demonstrated

### 1. Multi-System Property Analysis
One question triggers queries across six data sources. The AI geocodes addresses, retrieves parcel details, checks zoning, queries flood zones, verifies fire hazard, and identifies service districts—synthesizing a complete picture.

**Critical insight:** The AI catches jurisdiction issues automatically. A "Fairfield" mailing address might be in unincorporated Solano County—a distinction that affects which regulations apply. The AI routes to the correct jurisdiction without manual intervention.

### 2. Regulatory Research
Questions about wineries, short-term rentals, or grading permits require navigating interconnected code sections. The AI traces cross-references, connects exemptions to definitions, and identifies when one activity (like "wedding receptions") triggers a separately defined permit process.

**Not search, synthesis.** The zoning code is 365 pages of dense recursive legalese. The AI interprets it in context.

### 3. Visual Map Interpretation
"Where exactly does the flood zone cross this 80-acre parcel?" Traditional queries return attributes—useless for understanding spatial variation across a large property.

SAGE requests maps and interprets them. The AI can see that 40% of a parcel falls within Zone AE while the remainder is Zone X, and explain what that means for development.

**Two years ago, this wasn't possible.** Multimodal AI is a fundamental capability shift.

### 4. Document Research
The county code, general plan, and budget are structured documents with internal hierarchy. SAGE preserves that structure—policies tagged separately from narrative, sections indexed for navigation.

Ask about minimum parcel sizes in agricultural areas and the AI finds actual acreage minimums by region (20 acres in Suisun Valley, 160 in Montezuma Hills) rather than aspirational language about "maintaining agricultural character."

### 5. Meeting Intelligence
Board of Supervisors and ReGIS consortium minutes provide up-to-date information that might be missing from other documents. The AI performs recursive agentic search—refining queries as it learns what information is available.

---

## The Interactive Map Companion

SAGE hands off to an interactive map with context preserved. AI does analysis; the map enables exploration by humans. They work together.

### Technical Architecture
- **One application, multiple configurations:** Parcels, Planning, Hazards presets share a single codebase
- **Vector tiles for performance:** 152,000 parcels render instantly, paired with hidden feature layers for interactivity
- **Tag-based configuration:** Layer behavior controlled by tags in layer names, not custom code

### Operational Benefits

| Traditional Workflow | Tag-Based Workflow |
|---------------------|-------------------|
| Analyst requests change | Analyst renames layer |
| Developer modifies code | Saves |
| QA tests | Done |
| Deploy to production | — |
| **Timeline: ~1 week, 3 people** | **Timeline: 30 seconds, 1 person** |

The person who understands the data controls how it behaves. Fewer bottlenecks, faster iteration.

---

## Development Timeline

**Built in 5 days.** Three years ago, this would have taken 12-24 months.

The tools I used:
- **MCP (Model Context Protocol):** Open standard for connecting AI to external tools—like ODBC for AI
- **ArcGIS JavaScript SDK + React:** Modern web mapping foundation
- **Structured data pipelines:** County code, general plan, and budget converted to AI-searchable formats

---

## What This Means

### For Staff
Every time someone re-researches the same zoning question is time not spent on complex projects that actually need human judgment. Every phone call that gets transferred three times because no single person has all the regulatory pieces—that's friction we can eliminate.

**Automation handles the repeatable. Humans handle the novel.**

### For the Organization
The barrier to building these tools is collapsing. Staff don't need computer science degrees. They need clear thinking about processes.

Your staff already know:
- What the data means
- What the edge cases are
- What "done right" looks like
- Which exceptions need human judgment

They have domain expertise. What they've lacked is a way to express that expertise in automation. AI can be the translator between "here's how I do this task" and "here's code that does this task."

The person who knows that "Fairfield address doesn't mean Fairfield jurisdiction" can now encode that knowledge into a tool. They don't need to become programmers. They need to clearly describe what they already know.

---

## Why Government

Government needs this more than the private sector—because we can't just rip and replace legacy systems. We have statutory requirements, public records obligations, interagency dependencies. We have to work with what we inherit.

That's actually an advantage for this approach. Integration-first thinking—meeting systems where they are, building bridges rather than replacements—that's not just technically sound. It's politically realistic.

GIS succeeded in government because it worked with existing infrastructure. AI integration will succeed the same way.

---

## Next Steps

SAGE is a working demonstration of what's possible when AI is connected to actual government data infrastructure. The architecture is replicable. The approach scales.

The question isn't whether AI will transform government GIS. The question is whether we'll lead that transformation or follow it.

---

*For technical implementation details, see the companion video demonstrations and architecture documentation.*
