# Video 1 Transcript: SAGE AI + GIS Demo

**Video Title:** Agentic AI and GIS
**Duration:** ~12 minutes
**Topic:** Demonstrating how AI can serve as an integration layer for government GIS

---

## INTRO (0:00-1:10)

Every government GIS shop faces the same challenge. Data lives everywhere. Parcels in the assessor system, zoning in planning, flood zones at FEMA, fire hazard at CalFire, the county code in one database, the general plan in another, the budget somewhere else.

In the 90s, GIS solved this for spatial data. The map became the integration layer. Location became the common key that linked systems never designed to talk to each other.

Today AI can do the same for all the other data, using natural language as the key. GIS already solved the integration problem once. It makes sense to solve it again from the same place.

I built SAGE—the Solano Agent for Geographic Enquiry—to demonstrate this. It connects to Solano County's actual data infrastructure. 152,000 parcels. Zoning for the county and all seven cities. FEMA flood zones, CalFire severity zones, the county code, the general plan, the budget, meeting minutes.

I built over 50 tools that give AI the context to answer questions no traditional system could handle. Let me show you.

---

## DEMO 1: AIRBNB ELIGIBILITY (1:10-2:40)

Simple question. Can I rent my cabin as an Airbnb?

Notice SAGE stops and asks for the address. She can't answer without it. Regulations depend on location. A cabin in Fairfield City has different rules than one in unincorporated Solano County, even if the mailing address says Fairfield.

This is MCP—Model Context Protocol—a standard way to give AI external tools. I built over 50 for Solano County data. AI decides which to use based on the question.

I've asked SAGE to summarize her reasoning at the end of each query. Let's listen.

### [SAGE Voice]

> I started by geocoding your address to get coordinates and the parcel number, which revealed something important. Even though your mailing address says Fairfield, you're actually in unincorporated Solano County. That distinction matters because the county and city have completely different short-term rental rules. From there, I pulled zoning and fire hazard data in parallel, then dove into sections 28.75.30 and 28.72.40 of the county code to get the exact permit requirements. The fire hazard check was critical. Properties in very high zones are automatically disqualified from vacation rentals. So it's good news that yours came back clear.

---

## DEMO 2: AGRITOURISM PROFILE (2:40-4:00)

Now a harder question. What can I do with this property for agritourism?

No single database answers this. You need property records, zoning, hazard maps, and regulations governing wineries, farm stays, event venues.

Tools fetch data. AI figures out what agritourism means in Solano County zoning code—that hosting weddings requires a special events permit under section 28.75.

### [SAGE Voice]

> This query pulled together five different data systems in parallel. Parcel details from the assessor, zoning from county GIS, flood zones from FEMA, fire hazard from CalFire, and supervisor district boundaries. The ASV-20 zoning was the key finding. It's a special agricultural district created specifically for Suisun Valley that enables agritourism while protecting farmland. The trees and vines assessment caught my eye because it documents active agricultural production, which is required for agricultural homestays. Interestingly, vacation house rentals are explicitly prohibited in ASV-20, but the county offers agricultural homestays as an alternative that keeps owners engaged with visitors.

---

## DEMO 3: FLOOD ZONE VISUAL (4:00-5:10)

Where exactly does the flood zone cross this 80-acre parcel? Traditional query returns attribute data—useless on a property this size. Is it the whole thing? A corner? Where can I build?

SAGE requests a map and interprets it. Multimodal AI. It can see. Two years ago, this wasn't possible.

### [SAGE Voice]

> I overlaid FEMA's National Flood Hazard Layer directly onto the parcel using the map capture tool. The key insight is that while my earlier point query returned Zone X because it checked the parcel centroid, the reality is more nuanced. About 40% of this 80-acre property actually falls within Zone AE, the 1% annual chance floodplain. This is exactly why visual map analysis matters. A single point query can miss critical spatial variation across large parcels. For agritourism planning, this means the eastern portion has real constraints for permanent structures.

---

## DEMO 4: GRADING PERMIT (5:10-6:20)

Does my client need a grading permit?

Answers buried in Chapter 31 of the county code. Keyword search gives fragments. You find "grading" but miss the agricultural exemption three sections later.

I process the code by section. Preserved hierarchy. AI traces cross-references. Connects exemptions to definitions. Research assistant, not search engine.

### [SAGE Voice]

> I pulled sections 31-21 through 31-24 from the county's grading, drainage, land leveling, and erosion control chapter. The exemption structure has two tiers. Routine agricultural activities like plowing and irrigation work are broadly exempt, while land leveling for new agricultural production has specific thresholds. The 50 cubic yard and 8,000 square foot limits are the key numbers. Most small field leveling jobs will fit under the exemption, but anything substantial will need at least a minor permit. The slope requirements are also important. If the existing terrain exceeds 14% grade, the exemption requires a conservation plan from the Resource Conservation District.

---

## DEMO 5: GENERAL PLAN SUBDIVISION (6:20-7:30)

Does the general plan support subdivisions in agricultural areas?

General plans are hard. Language is aspirational. "Maintain agricultural character" doesn't give you minimum lot sizes.

I tagged policies separately from narrative. AG.P-31. AG.P-32. AI searches policies directly, finds actual acreage minimums by region. 20 acres in Suisun Valley, 160 in Montezuma Hills.

### [SAGE Voice]

> I searched the agriculture chapter of the general plan for policies on subdivision and parcel division. The framework is remarkably comprehensive. Policy AG.I-10 explicitly says to maintain large minimum parcel sizes, while AG.P-31 ties parcel size to specific agricultural regions through Table AG-3. What's interesting is the pre-1984 lot of record exception. The plan acknowledges some legacy parcels exist below current minimums but requires merging them with contiguous land before building. This prevents landowners from strategically keeping small parcels separate to circumvent the intent of agricultural preservation.

---

## DEMO 6: CEQA LAYERS (7:30-8:30)

I'm doing a review near Suisun Marsh. What layers should I check?

I built a metadata system of 126 key layers. The AI can quickly search through what is available, find information on the layer, and who maintains it. In addition to data on the layer, SAGE can pull up and visually inspect each layer alone or overlaid on other layers in the catalog.

### [SAGE Voice]

> I queried SAGE's GIS layer catalog across two categories—hazards and environmental—then cross-referenced with suggested layers for CEQA-related questions. The catalog contains 126 layers across 11 categories. For Suisun Marsh projects specifically, the critical layers are the BCDC protection plan boundaries and USFWS critical habitat, since the marsh supports multiple federally listed species. I also included CalEnviroScreen because SB 1000 requires environmental justice analysis in general plan updates, and CEQA increasingly considers cumulative pollution burden in disadvantaged communities.

---

## DEMO 7: GIS STAFFING & BUDGET (8:30-9:40)

What is the staffing and budget for the GIS division?

Same architecture works for organizational data. County budget is 500-plus pages. I converted the PDF into structured data, preserving tables while creating a well-structured index that allows SAGE to jump back and forth between different sections.

Ask about GIS staffing and AI pulls from org charts, position allocations, budget line items. Synthesizes a complete picture.

### [SAGE Voice]

> I queried three data sources in parallel. The org chart for division-level staffing detail, the position database for specific job titles, and the budget document for financial data. The GIS division has 5 FTE with a $2.7 million budget. Modest compared to Infrastructure's $25 million, but GIS operates as a shared service multiplier, enabling spatial analysis across all county departments. The position mix is interesting. One manager, one principal analyst, two journey-level analysts, and one cadastral mapping technician. That cadastral position suggests close integration with the assessor's parcel maintenance workflow.

---

## DEMO 8: MEETINGS (9:40-10:50)

Last demo—committees.

I pulled in the last few years of Board of Supervisors and ReGIS agendas and minutes. The goal here was to provide up-to-date information that might be missing from other documents. What is really powerful is the recursive agentic search that lets SAGE not simply search for a few keywords, but refine and improve the search as she learns more about what information is available.

### [SAGE Voice]

> I searched both Board of Supervisors and ReGIS meeting minutes from 2025. The board meetings mostly reference GIS indirectly through subdivision maps and planning items, while the real GIS project discussions happen at ReGIS—the regional GIS consortium that brings together county, cities, and special districts. The most significant findings were the new GIS governance structure announced in April, the countywide land use mapping app presented in October, and the ArcGIS Urban study for Suisun Valley winery buildout. The governance change is particularly notable. Creating formal steering and solutions committees suggests the county is elevating GIS from a technical service to a strategic planning function.

---

## CONCLUSION (10:50-12:00)

I built SAGE and an interactive mapping client in 5 days. Three years ago, this would have taken 12 to 24 months. I know because I've built systems like this before. Mapping, data integration, document retrieval, custom interfaces. It's a lot of work.

My assumption—AI reasons at a human level when you give it the right context. The zoning code is 365 pages of dense recursive legalese. I thought interpreting it would be beyond current AI. With careful structuring of the data, the results are impressive.

The fact that SAGE can construct, navigate, and visualize actual GIS maps opens up future possibilities. Beyond this demo, SAGE helped code herself and educated me on Solano's GIS. I have a far more comprehensive picture than I would have researching on my own.

I'd love to share what I've learned to help others build similar systems.

One more thing—SAGE hands off to the interactive map with context preserved. AI does analysis. Map enables exploration by humans. They work together.

In the next video, the map itself, and ideas on how we can improve GIS web mapping interfaces going forward.

---

*Transcript of demo video recorded January 2026 for Solano County IT Analyst Principal (GIS) position.*
