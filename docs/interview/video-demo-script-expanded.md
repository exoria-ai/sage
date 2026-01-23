# Solano County GIS Interview - Video Demo Script (EXPANDED)

**Position:** IT Analyst (Principal) - GIS, Solano County DoIT  
**Video Deadline:** Noon PST, Monday January 26, 2026  
**Format:** Two videos, 10-12 minutes each  
**Total Target:** 20-24 minutes

---

## Strategic Framing

**What Stewart thinks he's getting:** A technical lead who can build things.

**What you're actually offering:** Someone who can make the whole team builders.

**The through-line:** Technology succeeds in government when it meets people where they are—not where a curriculum says they should be. This is true for GIS adoption in the 1990s, AI adoption in the 2020s, and staff development every single day.

---

# VIDEO 1: Agentic AI and GIS

**Target: 11-12 minutes**

---

## Part 1: Why AI Matters for Government (3-4 minutes)

### Opening Hook

> "I want to start with a question that's on every government technology leader's mind right now: How do we actually use AI?
>
> Not the hype. Not the demos from vendors. How do we take this technology and apply it to the real work of government—where we have dozens of legacy systems, limited budgets, and no ability to just start over?
>
> I think the answer is hiding in plain sight. We've solved this problem before."

### The GIS Precedent

> "In the 1990s, when GIS was emerging as an enterprise technology, the skeptics said: 'Why do you need a GIS? Just use the CAD files. Just query the database directly. The data already exists.'
>
> And they were right—the data did exist. It existed in the surveyor's CAD drawings. In the assessor's property database. In the planning department's paper zoning maps. In the utilities department's as-built drawings.
>
> The problem wasn't that the data didn't exist. The problem was that none of it was designed to work together. The surveyor's coordinate system didn't match planning's. The assessor's parcel IDs didn't link to utilities' service addresses. Everyone had data. No one had information."

### What GIS Actually Did

> "GIS didn't replace those systems. That's the key insight. The CAD files stayed. The databases stayed. The paper maps got scanned, but the originals stayed in the vault.
>
> What GIS provided was an integration layer. The map became a common language. Location became the key that linked everything together. For the first time, you could ask: 'Show me all the parcels within 500 feet of this water main that are zoned commercial and have permits pending.'
>
> That question touches four departments. Before GIS, answering it meant four phone calls, four different data formats, and someone manually correlating the results. After GIS, it was one query."

### The Same Problem, New Form

> "Today, we're facing the same challenge with AI. The question isn't 'Can AI answer questions?' Of course it can. The question is: 'Can AI answer questions about *our* data, *our* regulations, *our* jurisdiction?'
>
> And that requires integration. Look at what a simple property question might touch:"

**[SHOW TABLE - speak through it]**

| System | Owner | Format |
|--------|-------|--------|
| Parcels | County Assessor | ArcGIS Feature Service |
| City Zoning | 7 different cities | 7 different services |
| Flood Zones | FEMA | National Map Service |
| Fire Hazard | CAL FIRE | State GIS Service |
| County Code | County Counsel | HTML/PDF |
| General Plan | Planning | PDF chapters |
| Budget | CAO | PDF document |

> "Seven systems. Six different owners. At least four different data formats. No unified interface. No common data model.
>
> And this is just Solano County. Add in state and federal data sources, and you're looking at dozens of systems that were never designed to talk to each other.
>
> Sound familiar? It's exactly the same problem GIS solved for spatial data—now applied to operational data."

### AI as Integration Layer

> "Here's the insight: AI succeeds in government the same way GIS did—as an integration layer.
>
> The AI agent becomes the common interface. Natural language becomes the query that links everything together. You don't need to rebuild your legacy systems. You don't need a unified database. You need a layer that can reach into existing systems and synthesize answers.
>
> GIS used location as the common key. AI uses natural language."

**[SHOW COMPARISON TABLE]**

| | GIS (1990s) | AI (2020s) |
|---|-------------|-------------|
| **Problem** | Spatial data in silos | Operational data in silos |
| **Skeptic objection** | "Just use CAD" | "Just chat with GPT" |
| **Reality** | No common format | No connection to your data |
| **Solution** | Integration layer (the map) | Integration layer (the agent) |
| **Common key** | Location | Natural language |
| **Who benefits most** | Government | Government |

> "GIS succeeded in government because it met government where it was. It didn't demand that every department rebuild their systems. It integrated what already existed.
>
> AI will succeed the same way. And I'd argue government needs this even more than the private sector—because we can't just rip and replace legacy systems. We have to work with what we have."

### Technical Note: How This Works

> "For those interested in the technical architecture: I built this using something called MCP—Model Context Protocol. It's an open standard that lets AI agents connect to external tools and data sources in a structured way.
>
> Think of it like ODBC for AI. Just as ODBC let applications connect to any database without custom code for each one, MCP lets AI agents connect to any tool—GIS services, document databases, regulatory codes—through a common interface.
>
> But that's plumbing. What matters is what it enables."

---

## Part 2: SAGE - A Working Example (1-2 minutes)

### What I Built

> "To show you what this looks like in practice, I built something I call SAGE—Solano Agent for Geographic Enquiry. It's an AI assistant that's connected to Solano County's actual data infrastructure.
>
> Not sample data. Not a sandbox. Your real systems."

**[SHOW CAPABILITY SUMMARY]**

| Category | What's Integrated |
|----------|-------------------|
| **Property** | 152,000 parcels, assessor data, building characteristics |
| **Zoning** | County zoning + all 7 cities (Fairfield, Vacaville, Vallejo, Benicia, Dixon, Rio Vista, Suisun City) |
| **Hazards** | FEMA flood zones, CAL FIRE severity zones, earthquake faults |
| **Districts** | Fire, water, garbage, schools, supervisorial |
| **Regulatory** | County Code (8 chapters), General Plan (13 chapters) |
| **Administrative** | FY25-26 budget, org chart, 3,284 FTE positions |

> "40 different tools across 13 categories. The AI doesn't just retrieve data—it understands jurisdiction, routes queries to the right systems, and synthesizes answers from multiple sources.
>
> Let me show you what that looks like in practice."

---

## Part 3: Demonstrations (5-6 minutes)

### Demo 1: Multi-System Property Analysis

**Prompt:**
> "Tell me everything about 2500 Cordelia Road in Fairfield—zoning, hazards, services, assessed value."

**[RUN DEMO - Let it complete]**

**Narration while it runs:**
> "Watch what happens here. The AI is chaining tools—geocoding the address, retrieving parcel details, checking zoning, querying flood zones, checking fire hazard, identifying service districts.
>
> Six different data sources. One question."

**After results appear:**
> "Now here's the detail I want you to notice: the address says 'Fairfield,' but the AI identified this as unincorporated Solano County.
>
> That's not a trivial distinction. Mailing addresses use USPS city names, which don't match legal jurisdiction. A resident at this address would call the City of Fairfield about a zoning question—and be told 'we can't help you, you're in the county.'
>
> That confusion happens every day at planning counters across the country. The AI caught it automatically because jurisdiction routing is built into the tool design."

### Demo 2: Regulatory Research (The Winery Scenario)

**Setup:**
> "Let me show you something more complex. This is the kind of question that takes a new planner 30 minutes with the code open—or a phone call to someone senior."

**Prompt:**
> "I have 30 acres of vineyard zoned A-40 and want to build a winery. I'll grow at least 50% of my grapes on-site and produce about 50,000 gallons per year. What permits do I need? And what if I also want to host wedding receptions?"

**[RUN DEMO]**

**Narration:**
> "This question requires navigating multiple sections of the zoning code. The AI needs to:
>
> First, classify the winery by production volume—50,000 gallons makes this a 'medium winery' under the county's definitions.
>
> Second, verify the agricultural percentage meets minimum requirements—50% exceeds the 25% threshold.
>
> Third, find the correct permit type in the use tables—medium winery on A-40 land.
>
> But here's where it gets interesting: the question mentions 'wedding receptions.' A human planner would catch this. Would an AI?"

**After results:**
> "It caught it. 'Wedding receptions' isn't just an activity you do at a winery—it's a separately defined use called 'Special Events Facility' that requires its own permit process.
>
> This is institutional knowledge. The kind of thing you learn after getting burned once, or from a mentor who's been doing this for 20 years. Now it's encoded in tool descriptions and can be applied consistently every time."

### Demo 3: Short-Term Rental Eligibility

**Setup:**
> "Let me show you a different kind of complexity—questions where the answer depends on multiple factors that aren't obvious to the person asking."

**Prompt:**
> "Can I rent my cabin near Green Valley as an Airbnb?"

**[RUN DEMO]**

**Narration:**
> "This seems like a simple yes/no question. But it's not.
>
> Vacation house rentals in Solano County depend on multiple factors: fire hazard zone, structure type, road access, water and septic capacity. The AI needs to check each one."

**After results:**
> "Notice the fire hazard zone check. Properties in Very High Fire Hazard Severity Zones are prohibited from vacation rentals. Properties in High zones can qualify—but only if they meet specific California Building Code requirements, defensible space standards, and road access standards.
>
> The AI also checked structure type. ADUs, secondary dwellings, and employee housing can't be used as vacation rentals—even if they're otherwise eligible.
>
> This is multi-factor eligibility analysis. The kind of question where a resident calls planning and gets transferred three times because no single person has all the pieces. The AI synthesizes it in one query."

### Demo 4: Visual Map Interpretation

**Setup:**
> "This demo shows something different—the AI actually looking at maps, not just querying data."

**Prompt:**
> "Where exactly does the flood zone cross the 80-acre parcel at 4300 Suisun Valley Road?"

**[RUN DEMO]**

**Narration:**
> "This isn't just asking 'what's the flood zone?' That would return 'Zone A.' But the question is spatial—where on the parcel does the hazard apply?
>
> The AI captures a map view with the FEMA flood overlay, then interprets what it sees."

**After results:**
> "Look at this. The AI identified that Suisun Creek bisects the property north-south through the eastern third. It estimated 15-20 acres are in Zone A—the high-risk area—while the vineyard portions to the west are in Zone X.
>
> It then connected this to development implications: new structures in Zone A need base flood elevation determination, the existing estate buildings are partially in the flood zone, agricultural uses are less constrained than structures.
>
> This is visual interpretation, not just data lookup. The AI is analyzing where on the parcel the hazard applies—the kind of spatial reasoning that usually requires pulling up a map and looking at it yourself."

### Demo 5: Layer Discovery for Environmental Review (Optional)

**Setup:**
> "One more demo if we have time. This shows how the AI handles open-ended research questions."

**Prompt:**
> "I'm doing CEQA review for a proposed subdivision near Suisun Marsh. What environmental data layers should I be checking?"

**[RUN DEMO]**

**Narration:**
> "CEQA review requires checking multiple environmental constraints. A new planner might not know all the relevant data sources. An experienced planner knows—but might forget one under deadline pressure."

**After results:**
> "The AI suggested 13 environmental layers—wetlands, sensitive habitats, fault zones, flood zones, fire hazard, agricultural preserves.
>
> But notice this caveat: for the Suisun Marsh boundary, it noted that the county's layer is cartographic only—official boundaries require contacting BCDC, the Bay Conservation and Development Commission.
>
> That's not just data retrieval. That's institutional knowledge about data limitations. The kind of thing that prevents embarrassing mistakes."

---

## Part 4: The Bigger Picture (2-3 minutes)

### What This Means for Staff

> "I want to step back from the technical demos and talk about what this actually means for a GIS team.
>
> The tools I just showed you—they're not about replacing staff. They're about redirecting staff effort toward higher-value work.
>
> Every time someone re-researches the same zoning question is time not spent on complex projects that actually need human judgment. Every phone call that gets transferred three times because no single person has all the regulatory pieces—that's friction we can eliminate.
>
> Automation handles the repeatable. Humans handle the novel."

### The Skill Transfer Opportunity

> "But here's what I'm most excited about—and this connects to how I think about team development.
>
> Building these tools doesn't require a computer science degree. It requires clear thinking about processes.
>
> Your staff—the people who've been doing this work for years—they already know:
> - What the data means
> - What the edge cases are  
> - What 'done right' looks like
> - Which exceptions need human judgment
>
> They have the domain expertise. What they've lacked is a way to express that expertise in automation.
>
> That's changing. AI can now be the translator between 'here's how I do this task' and 'here's code that does this task.' The barrier used to be syntax—memorizing the right programming incantations. That barrier is dissolving.
>
> The person who knows that 'Fairfield address doesn't mean Fairfield jurisdiction' can now encode that knowledge into a tool. They don't need to become programmers. They need to clearly describe what they already know."

### Transition to Interactive Map

> "The AI handles questions. But sometimes people want to explore—toggle layers, zoom around, click on parcels and discover what's there.
>
> So SAGE can hand off to an interactive map with context already loaded. Let me show you how this works using the property we just looked at."

**Prompt:**
> "Can you show me this property on an interactive hazard map? I want to explore the flood boundaries myself and see if neighboring parcels have the same issues."

**[RUN DEMO - Show URL generation]**

**Narration:**
> "Watch what happens. The AI doesn't just generate a generic map link. It builds a URL with context:
>
> The parcel we were discussing is highlighted. The hazard preset is selected—so FEMA flood zones and fire severity layers are already loaded. The zoom level is set to show the parcel and its surroundings.
>
> When I click this link..."

**[OPEN MAP URL - Show interactive map with flood layers]**

> "The map opens with exactly what I asked for. The flood zone boundary is visible. I can click neighboring parcels to see if they have the same Zone A issue. I can toggle layers, zoom out to see the broader floodplain, switch to historical aerials.
>
> This is the handoff from AI analysis to self-service exploration. The AI got me started with the right context—now I can discover on my own."

**[END VIDEO 1 - TRANSITION]**

---

# VIDEO 2: Web GIS Application Development

**Target: 10-12 minutes**

---

## Part 1: Design Philosophy (2-3 minutes)

### Opening

> "The agent answers questions. But staff and the public also need self-service tools—the ability to explore without asking, to discover without knowing exactly what they're looking for.
>
> This is an interactive map viewer I built using ESRI's ArcGIS JavaScript SDK. I want to walk through not just what it does, but why I made the design decisions I made.
>
> Because the technical implementation is almost the easy part. The hard part is building something people will actually use."

### The Configuration Problem

> "Here's a challenge every GIS team faces: how do you build applications that non-technical staff can maintain?
>
> The traditional approach is to build something custom, document it thoroughly, and hope the documentation stays current. When something needs to change, you modify code, test it, deploy it.
>
> That creates a bottleneck. Every change flows through whoever knows the codebase. As staff turn over, knowledge is lost. Eventually you have an application that works but that no one fully understands—and everyone's afraid to touch.
>
> I wanted a different approach: configuration that lives in the platform, not the code."

---

## Part 2: Map Presets (1-2 minutes)

### The Concept

**[SHOW: Map with preset dropdown visible]**

> "Different users need different starting points. A resident checking their property doesn't need fire hazard zones on by default. A planner doing environmental review does.
>
> Rather than building separate applications—which multiplies maintenance burden—we use presets. One application, multiple configurations."

**[SHOW: Switch between presets]**

| Preset | Primary Audience | Default Layers |
|--------|------------------|----------------|
| **Parcels** | Public, property lookup | Parcels, addresses, aerial imagery |
| **Planning** | Staff, developers | Zoning (county + cities), general plan, sphere of influence |
| **Hazards** | Disclosure, insurance, CEQA | Fire severity, flood zones, faults, Travis AFB |

> "Same data. Same application. Different starting points for different tasks.
>
> And critically—adding or modifying a preset doesn't require code changes. It's configuration in ArcGIS Online."

---

## Part 3: The Tag-Based Configuration System (3-4 minutes)

### The Innovation

> "This is the design decision I'm most proud of.
>
> Layer behavior—how layers appear in the interface, whether they're radio buttons or checkboxes, how they interact with each other—is controlled by tags in the layer name itself."

**[SHOW: ArcGIS Online layer list with tagged names]**

> "Look at these layer names. See the brackets? Those aren't just labels—they're instructions to the application."

### [EXCLUSIVE] Tags

**[SHOW: Aerials group with radio buttons]**

> "The Aerials group is tagged `[EXCLUSIVE]`. That tells the application: these layers are mutually exclusive. Render them as radio buttons, not checkboxes. Only one can be visible at a time.
>
> Makes sense, right? You don't want 2025 imagery and 2008 imagery displayed simultaneously. One at a time."

**[DEMO: Toggle between aerial years]**

> "We have imagery back to 2004. Switch between years to see how an area developed over time. The interface enforces that only one is visible—not because of custom code, but because of how the layer is named."

### [VECTOR_TILE] Tags

**[SHOW: Parcels layer configuration]**

> "Here's a more technical example. Parcels are tagged `[VECTOR_TILE]`.
>
> Vector tiles are fast—they can render 152,000 parcels smoothly at any zoom level. But they're pre-rendered, which means you can't query them. You can't click on a vector tile parcel and get its attributes.
>
> So the system automatically pairs vector tile layers with a corresponding feature layer. The vector tile handles display. The feature layer handles queries. The user sees one 'Parcels' experience. Underneath, two layers are working together."

### Why This Matters

> "Here's why I think this approach matters for team sustainability.
>
> Traditional approach: GIS Analyst wants to change how aerials behave. They submit a ticket. A developer modifies code. Someone tests it. Someone deploys it. Three people involved, two weeks elapsed.
>
> Tag approach: GIS Analyst opens ArcGIS Online. Renames the layer group. Saves. Done. Thirty seconds, no code, no deployment.
>
> The person closest to the work has the power to modify the tool. That's how you build sustainable systems."

---

## Part 4: Smart Search (1-2 minutes)

### The User Experience Problem

**[SHOW: Current county parcel viewer with APN format instructions]**

> "I want to show you something from the current county parcel viewer. See this? A popup explaining how to format APN searches. 'Enter APN in format XXX-XXX-XXX with leading zeros.'
>
> That's not user-friendly. That's asking users to adapt to the system instead of the system adapting to users."

### The Solution

**[SHOW: SAGE map search box]**

> "This search box handles APNs however users type them."

**[DEMO: Type multiple formats]**

- `0037-040-110` (standard with dashes)
- `0037040110` (no dashes)  
- `037-040-110` (missing leading zero)
- `37 40 110` (spaces)
- `37-40-110` (short format)

> "Same parcel. Five different inputs. All work.
>
> The system normalizes the input rather than demanding users memorize a format. Small thing, but it's the accumulation of small things that determines whether people actually use a tool."

### Address Search

**[DEMO: Type partial address, show autocomplete]**

> "Addresses autocomplete against the county's address point layer. Start typing, see matches, select one, zoom to it.
>
> Again—meeting users where they are. People know their address. They don't necessarily know their APN."

---

## Part 5: Thoughtful Layer Organization (2 minutes)

### The Problem with Data-Source Organization

> "One more design principle: organize by function, not by data source.
>
> The instinct—especially for GIS professionals—is to organize layers by where the data comes from. 'FEMA Flood Zones.' 'CAL FIRE Hazard Severity.' 'CGS Fault Zones.'
>
> But users don't think that way. They don't know or care that flood data comes from FEMA. They're thinking: 'What hazards affect this property?'"

**[SHOW: Layer panel with functional groupings]**

| Group | Contents | Source (in metadata) |
|-------|----------|---------------------|
| **Flood Hazards** | FEMA zones, state floodplains | FEMA NFHL, DWR |
| **Fire Hazards** | Severity zones, responsibility areas | CAL FIRE |
| **Seismic Hazards** | Fault zones, liquefaction | CGS |
| **Aviation Hazards** | Travis AFB zones, wildlife hazard | DoD, FAA |

> "Layers grouped by what users are trying to understand, not by what agency published the data. The sources are still documented—in metadata, in the layer descriptions—but they don't drive the interface organization."

### Progressive Disclosure

**[DEMO: Expand and collapse layer groups]**

> "Groups start collapsed. Users expand what they need. This keeps the interface manageable even with dozens of available layers.
>
> It also teaches—people discover layers they didn't know existed by exploring related groups."

---

## Part 6: Technical Foundation (1-2 minutes)

### What's Under the Hood

> "A few technical notes for those interested in the implementation."

| Component | Technology | Why |
|-----------|------------|-----|
| **Framework** | ArcGIS JavaScript SDK 4.34 + React | Industry standard, excellent documentation, strong community |
| **State Management** | Zustand | Lightweight, bridges UI and AI tools cleanly |
| **Parcel Display** | Vector tile + feature layer hybrid | Performance at scale without sacrificing queryability |
| **Configuration** | Tag parsing from AGOL layer names | Non-technical staff can modify behavior |
| **Search** | Unified address + APN with format normalization | One search box, multiple input types |

### The Agent Connection

> "Remember: this map viewer isn't standalone. It's the visual complement to the AI assistant.
>
> The AI answers questions using natural language. When the answer is 'you should look at this location,' it hands off to this viewer with context already loaded—the right parcel highlighted, relevant layers enabled.
>
> Same data infrastructure. Different interfaces for different needs. That's the vision: unified data, multiple access patterns."

---

## Part 7: Closing - What This Represents (2-3 minutes)

### Not Replacement—Accessibility

> "I want to close by connecting these two videos back to a central principle.
>
> Nothing I've shown you replaces existing county systems. The Assessor's database still exists. The planning department's zoning maps still exist. The county code is still the county code.
>
> What I've built is an accessibility layer. Ways to reach information that already exists through interfaces that match how people actually think and work."

### The Team Development Vision

> "And here's what I think matters most for a Principal GIS role.
>
> The tools I showed you—they're useful on their own. But their real value is in what they represent: a philosophy of meeting users where they are.
>
> That applies to the public accessing county data. It applies to staff using GIS tools. And it applies to team development.
>
> The same principle—lower barriers, build bridges, translate between what people know and what systems need—that's how you grow a team's capabilities.
>
> Your analysts don't need to become computer scientists. They need tools and support that let them express the expertise they already have. My job, as I see it, isn't to build the next ten applications. It's to make the team capable of building the next hundred—at whatever technical level is appropriate for each person."

### The Government Context

> "One final thought. Government technology has constraints the private sector doesn't.
>
> We can't just rip and replace legacy systems. We have statutory requirements, public records obligations, interagency dependencies. We have to work with what we inherit.
>
> That's actually an advantage for this kind of approach. Integration-first thinking—meeting systems where they are, building bridges rather than replacements—that's not just technically sound. It's politically realistic.
>
> GIS succeeded in government because it worked with existing infrastructure. AI integration will succeed the same way. And team development will succeed the same way.
>
> Thank you for your time. I look forward to the conversation."

**[END VIDEO 2]**

---

# Appendix: Quick Reference

## Demo Prompts (Copy-Paste Ready)

| Demo | Prompt |
|------|--------|
| Property Analysis | "Tell me everything about 2500 Cordelia Road in Fairfield—zoning, hazards, services, assessed value." |
| Winery Permit | "I have 30 acres of vineyard zoned A-40 and want to build a winery. I'll grow at least 50% of my grapes on-site and produce about 50,000 gallons per year. What permits do I need? And what if I also want to host wedding receptions?" |
| Short-Term Rental | "Can I rent my cabin near Green Valley as an Airbnb?" |
| Visual Flood Analysis | "Where exactly does the flood zone cross the 80-acre parcel at 4300 Suisun Valley Road?" |
| CEQA Review (optional) | "I'm doing CEQA review for a proposed subdivision near Suisun Marsh. What environmental data layers should I be checking?" |
| Map Handoff | "Can you show me this property on an interactive hazard map? I want to explore the flood boundaries myself and see if neighboring parcels have the same issues." |

## Tag Reference

| Tag | Behavior | Use Case |
|-----|----------|----------|
| `[EXCLUSIVE]` | Radio buttons, only one visible | Aerials, basemaps, flood layers |
| `[VECTOR_TILE]` | Performance display, paired with feature layer | Parcels, roads |
| *(no tag)* | Standard checkbox toggle | Most layers |

## Map Presets

| Preset | Key Layers | Audience |
|--------|------------|----------|
| **Parcels** | Parcels, addresses, boundaries, 2025 aerial | General public |
| **Planning** | County + city zoning, general plan, SOI | Staff, developers |
| **Hazards** | Fire, flood, faults, Travis AFB | Disclosure, CEQA |

---

# Timing Guide (Expanded)

## Video 1: Agentic AI (Target: 11-12 minutes)

| Section | Content | Duration | Cumulative |
|---------|---------|----------|------------|
| 1.1 | Opening hook: "How do we use AI?" | 0:30 | 0:30 |
| 1.2 | The GIS precedent (1990s story) | 1:30 | 2:00 |
| 1.3 | What GIS actually did | 1:00 | 3:00 |
| 1.4 | The same problem, new form | 1:30 | 4:30 |
| 1.5 | AI as integration layer + MCP note | 1:00 | 5:30 |
| 2.1 | SAGE introduction | 1:00 | 6:30 |
| 3.1 | Demo: Property analysis | 1:30 | 8:00 |
| 3.2 | Demo: Winery permit | 1:30 | 9:30 |
| 3.3 | Demo: Short-term rental | 1:00 | 10:30 |
| 3.4 | Demo: Visual flood analysis | 1:00 | 11:30 |
| 3.5 | Demo: CEQA layers (optional) | 0:45 | 12:15 |
| 4.1 | What this means for staff | 1:00 | 13:15 |
| 4.2 | Skill transfer opportunity | 1:00 | 14:15 |
| 4.3 | Transition + map handoff (with live demo) | 1:30 | 15:45 |

**Note:** This runs ~16 minutes if fully delivered. Trim by:
- Shortening section 1.2 (GIS history)
- Cutting Demo 3.4 (visual flood) or 3.5 (CEQA)
- Tightening narration during demos

## Video 2: Web GIS (Target: 10-12 minutes)

| Section | Content | Duration | Cumulative |
|---------|---------|----------|------------|
| 1.1 | Opening: design philosophy | 1:00 | 1:00 |
| 1.2 | The configuration problem | 1:00 | 2:00 |
| 2.1 | Map presets concept + demo | 1:30 | 3:30 |
| 3.1 | Tag system introduction | 0:45 | 4:15 |
| 3.2 | [EXCLUSIVE] tags demo | 1:15 | 5:30 |
| 3.3 | [VECTOR_TILE] explanation | 1:00 | 6:30 |
| 3.4 | Why tags matter for sustainability | 1:00 | 7:30 |
| 4.1 | Smart search: APN formats | 1:00 | 8:30 |
| 4.2 | Address autocomplete | 0:30 | 9:00 |
| 5.1 | Layer organization philosophy | 1:30 | 10:30 |
| 6.1 | Technical foundation | 1:00 | 11:30 |
| 7.1 | Closing: accessibility layer | 1:00 | 12:30 |
| 7.2 | Team development vision | 1:00 | 13:30 |
| 7.3 | Government context + close | 1:00 | 14:30 |

**Note:** This runs ~14:30 if fully delivered. Trim by:
- Shortening technical foundation section
- Combining closing sections
- Moving faster through demos

---

# Key Messages Checklist

Before recording, verify you've communicated:

## Video 1
- [ ] Opening hook lands: "How do we actually use AI in government?"
- [ ] GIS/AI parallel clearly explained
- [ ] "Integration layer" concept established
- [ ] Government adoption context (can't rip-and-replace)
- [ ] MCP explained briefly as technical enabler (not the star)
- [ ] Jurisdiction routing demonstrated and explained
- [ ] Institutional knowledge encoding shown (winery/wedding)
- [ ] Multi-factor analysis shown (short-term rental eligibility)
- [ ] Visual spatial reasoning shown (flood zone interpretation)
- [ ] AI → Interactive Map handoff demonstrated (context preserved)
- [ ] Team development opportunity mentioned
- [ ] Clean handoff to Video 2

## Video 2
- [ ] Design philosophy: meet users where they are
- [ ] Configuration sustainability problem framed
- [ ] Tag system explained and demonstrated
- [ ] Non-technical maintenance emphasized
- [ ] Search flexibility demonstrated
- [ ] Functional organization (not data-source)
- [ ] AI ↔ Map connection reinforced
- [ ] Team development vision articulated
- [ ] Government constraints acknowledged as advantage

---

# Phrases to Use / Avoid

## Use
- "Let me show you..."
- "Notice what happened here..."
- "This is the key insight..."
- "Here's why this matters..."
- "The real value is..."
- "Same principle applies to..."
- "Meeting users where they are..."

## Avoid
- "Um," "uh," "so basically," "like"
- Over-explaining (let demos speak)
- Apologizing for limitations
- Jargon without context
- "To be honest" (implies you weren't before)
- "Obviously" (if it were obvious, you wouldn't say it)

## Phrases That Show Confidence Without Arrogance
- "I built this because..."
- "The design decision I'm most proud of..."
- "Here's what I think matters most..."
- "As I see it..."
- "My experience suggests..."

---

# Pre-Recording Checklist

## Technical Setup
- [ ] MCP server running and connected
- [ ] All demo prompts verified working (run each one)
- [ ] Interactive map loading correctly  
- [ ] All three presets working
- [ ] APN search formats tested (all 5 variations)
- [ ] Address autocomplete working
- [ ] Layer toggles functioning
- [ ] Screen recording: 1920x1080, 60fps
- [ ] Audio: External mic, quiet room, test recording
- [ ] Backup of all demo prompts in accessible location

## Content Prep
- [ ] Opening framing rehearsed (do it 3x out loud)
- [ ] Demo prompts ready to copy-paste (not type live)
- [ ] Transitions practiced
- [ ] Closing rehearsed (most important to land)
- [ ] Know which sections to cut if running long

## Backup Plans
- [ ] Alternative demo queries ready
- [ ] If MCP connection fails: have 30-second recovery script
- [ ] If demo gives unexpected result: narrate what happened, show value anyway
- [ ] Pre-recorded backup of critical demos (optional but recommended)

---

# Recording Day Workflow

1. **Before you start**
   - Close unnecessary applications
   - Turn off notifications (Slack, email, system)
   - Have water nearby
   - Warm up your voice (seriously—read something aloud)

2. **Recording approach**
   - Record in sections, not all at once
   - Pause between major sections (easier editing)
   - If you stumble, pause, restart that section
   - Don't try to be perfect—try to be clear

3. **After recording**
   - Light editing only (cuts, not polish)
   - Verify audio levels consistent
   - Check that demos are visible (not too small)
   - Upload to YouTube (Unlisted is fine)
   - Test the links before sending

4. **Submission**
   - Email to sbruce@solanocounty.gov
   - Subject: "Video Demonstration - Ryan Pream, IT Analyst Principal GIS"
   - Brief cover note (2-3 sentences max)
   - Include both video URLs
   - Submit by noon PST Monday January 26
