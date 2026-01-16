# Nano Banana Pro Visual Asset Prompts

## Style Reference

Based on the infographic examples (tube amplifier, coffee machine), the target style should be:
- **Clean technical illustration** with labeled components
- **Color-coded flows** (use consistent colors for data paths vs knowledge paths)
- **Professional but approachable** — not overly sterile
- **Clear text labels** with descriptions
- **Subtle background texture** (slightly off-white/cream)
- **Bold section headers**

---

## Asset 1: SAGE Architecture Overview

**Purpose**: Main architecture diagram for Context section  
**Dimensions**: 16:9 (1920x1080) for video  
**Style**: Technical flow diagram similar to coffee machine infographic

**Prompt**:
```
Technical infographic diagram titled "SAGE: Solano Agent for Geographic Enquiry - Architecture"

Three horizontal layers connected by flowing arrows:

TOP LAYER - "SKILL LAYER (The Brain)" with brain icon
- Contains cards labeled: "Jurisdiction Routing", "Prop 13 Knowledge", "Zoning Codes", "Contacts"
- Subtitle: "Organizational knowledge loaded on-demand"
- Color: Warm orange (#e07020) accents

MIDDLE LAYER - "MCP SERVER (The Hands)" with hands/tools icon  
- Contains tool icons labeled: "geocode", "get_zoning", "get_flood_zone", "get_parcels", "buffer", "intersect"
- Subtitle: "Direct access to GIS operations"
- Color: Deep blue (#1e3a5f) accents

BOTTOM LAYER - "DATA SOURCES" with database icons
- Four boxes: "Solano County GIS", "FEMA NFHL", "CAL FIRE FHSZ", "Census"
- Subtitle: "Real-time queries to authoritative sources"
- Color: Green (#2d8a4e) accents

Arrows flow: Knowledge down from skill layer, queries down to data, results back up
Style: Clean technical illustration, cream/off-white background, professional infographic
Include small legend showing arrow colors: "Knowledge Flow" (orange), "Data Flow" (blue)
```

---

## Asset 2: Query Flow Diagram

**Purpose**: Show how a single query flows through the system  
**Dimensions**: 16:9 (1920x1080)  
**Style**: Horizontal process flow

**Prompt**:
```
Technical process flow diagram titled "How SAGE Answers a Property Question"

Horizontal flow from left to right with numbered steps:

1. USER QUESTION (speech bubble icon)
   "What's the zoning at 123 Main St, Fairfield?"
   
2. GEOCODE (location pin icon)
   "Convert address to coordinates + APN"
   Small label: "37.7749, -122.0194"

3. JURISDICTION CHECK (map boundary icon)  
   "City or Unincorporated?"
   Decision diamond with two paths
   
4. QUERY CORRECT LAYER (database icon)
   "Route to appropriate zoning source"
   Shows: "City Zoning" or "County Zoning"

5. LOAD CONTEXT (book/brain icon)
   "Pull relevant knowledge"
   Shows: "Zoning codes", "Contacts"

6. RESPONSE (document icon)
   "Interpreted answer with caveats"
   
Style: Clean technical illustration with icons at each step
Colors: Steps 1-2 blue, Step 3 orange (decision point), Steps 4-5 blue, Step 6 green
Arrows connecting each step, curved professional flow
Cream/off-white background
```

---

## Asset 3: Knowledge Progressive Disclosure

**Purpose**: Explain how knowledge loads efficiently  
**Dimensions**: 16:9 (1920x1080)  
**Style**: Layered pyramid or iceberg concept

**Prompt**:
```
Technical infographic titled "Progressive Knowledge Loading"

Vertical layered diagram showing three levels, widest at bottom:

TOP (smallest, always visible): "SYSTEM PROMPT"
- Icon: Always-on indicator
- Text: "Core principles, disclaimers (~500 tokens)"
- Note: "Always present in every conversation"
- Color: Light orange

MIDDLE: "TOOL DESCRIPTIONS"  
- Icon: Tool/wrench icons
- Text: "When to use, routing logic, key fields (~2,000 tokens)"
- Note: "Available at decision time"
- Color: Medium orange

BOTTOM (largest): "REFERENCE MATERIAL"
- Icon: Library/book icons
- Text: "Detailed codes, regulations, contacts (10,000+ tokens available)"
- Note: "Loaded only when needed"
- Color: Deep blue

Side annotation showing: "Token efficiency: Only load what you need"

Style: Clean layered diagram, professional technical illustration
Show token counts getting larger as you go down
Subtle glow/highlight on currently-needed layer
```

---

## Asset 4: Jurisdiction Problem Visualization

**Purpose**: Illustrate the mailing address ≠ jurisdiction problem  
**Dimensions**: 16:9 (1920x1080)  
**Style**: Simplified map concept

**Prompt**:
```
Stylized map infographic titled "The Jurisdiction Problem"

Simplified outline of Solano County showing:
- 7 shaded areas labeled as cities: Fairfield, Vacaville, Vallejo, Benicia, Dixon, Rio Vista, Suisun City
- Large unshaded areas labeled "Unincorporated Solano County"

KEY ILLUSTRATION:
- A location pin placed OUTSIDE Fairfield city boundary but near it
- Label on pin: "2500 Cordelia Road"
- Address label: "Mailing Address: Fairfield, CA 94534"
- Large X mark through "Fairfield" 
- Correction arrow pointing to: "Actually: Unincorporated County"

Callout box: "Mailing address ≠ Legal jurisdiction"
- "USPS uses nearest city name"
- "County zoning applies, not city"
- "Different contacts, different rules"

Two phones showing:
- Wrong call: "Fairfield Planning" (red X)
- Right call: "Solano County Planning" (green check)

Style: Clean cartographic illustration, not too detailed
Colors: Cities in shades of blue, unincorporated in cream/tan
Highlight the problem location in orange
```

---

## Asset 5: Observability Dashboard Concept

**Purpose**: Show production monitoring approach  
**Dimensions**: 16:9 (1920x1080)  
**Style**: Dashboard/analytics mockup

**Prompt**:
```
Analytics dashboard mockup titled "SAGE Observability - Raindrop"

Dashboard layout with multiple panels:

TOP LEFT: "Query Volume" 
- Line chart showing queries over time
- Upward trend

TOP RIGHT: "Query Types"
- Pie/donut chart showing: Zoning (40%), Flood (25%), Parcel (20%), Other (15%)

MIDDLE LEFT: "Tool Call Traces"
- Waterfall/timeline showing:
  - geocode_address (45ms)
  - check_city_boundary (120ms)  
  - get_zoning (230ms)
  - load_context (15ms)

MIDDLE RIGHT: "Custom Signals"
- List with status indicators:
  - "jurisdiction_confusion" - 2 incidents (yellow)
  - "missing_disclaimer" - 0 incidents (green)
  - "successful_lookup" - 847 (green)

BOTTOM: "Recent Interactions"
- Table rows showing timestamp, query, status

Style: Modern analytics dashboard, dark mode optional
Clean data visualization, professional SaaS aesthetic
Raindrop branding subtle in corner
```

---

## Asset 6: Before/After Comparison

**Purpose**: Show value proposition for Results section  
**Dimensions**: 16:9 (1920x1080)  
**Style**: Split comparison

**Prompt**:
```
Split comparison infographic titled "GIS Workflow: Before & After SAGE"

LEFT SIDE (Before) - Red/orange tint:
Header: "Traditional Workflow"
- Icon: Person at computer looking frustrated
- Steps listed:
  1. "Receive question from resident"
  2. "Open ArcGIS, navigate to correct layer"
  3. "Remember which fields matter"  
  4. "Write query, handle pagination"
  5. "Interpret results, add context"
  6. "Draft response with caveats"
- Clock icon: "15-30 minutes per query"
- Note: "Requires trained GIS staff"

RIGHT SIDE (After) - Green/blue tint:
Header: "With SAGE"
- Icon: Person collaborating with AI assistant
- Steps listed:
  1. "Ask question in plain English"
  2. "Agent handles routing, queries, interpretation"
  3. "Review and send response"
- Clock icon: "2-3 minutes per query"  
- Note: "Staff focuses on complex analysis"

CENTER: Large arrow pointing from left to right
Text: "Same accuracy, 10x faster"

Bottom banner: "GIS analysts handle the hard problems. SAGE handles the repetitive ones."

Style: Clean split-screen comparison
Professional corporate infographic style
Clear visual contrast between before (cluttered) and after (streamlined)
```

---

## Asset 7: Title Card / Intro

**Purpose**: Opening frame  
**Dimensions**: 16:9 (1920x1080)  
**Style**: Clean, professional

**Prompt**:
```
Professional title card for technical presentation

Center: "SAGE"
Subtitle: "Solano Agent for Geographic Enquiry"

Below: "Agentic AI for County GIS Operations"

Small icons across bottom representing:
- Map/location pin (GIS)
- Brain/circuit (AI)
- Building columns (Government)
- Chart (Analytics)

Bottom: "IT Analyst Principal - GIS | Technical Demonstration"

Style: Clean, modern, professional
Color scheme: Deep blue background, white text, orange accents
Subtle topographic map pattern in background (very light)
```

---

## Production Notes

### Prompt Tips for Nano Banana Pro
- Be specific about layout (horizontal/vertical, left-to-right)
- Specify colors with hex codes for consistency
- Reference "technical infographic" or "process flow diagram" style
- Request "clean illustration" to avoid overly busy designs
- Include text that should appear ON the graphic

### Consistency Checklist
- [ ] All assets use same color palette
- [ ] Typography style consistent (headers, labels)
- [ ] Icons from same family/style
- [ ] Background treatment consistent
- [ ] Professional tone throughout

### Export Formats
- PNG at 1920x1080 for video
- Keep source files for potential edits
- Export 2x resolution if available for quality

---

*These prompts are starting points — iterate based on initial outputs to refine style consistency.*
