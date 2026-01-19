# SAGE - Solano Agent for Geographic Enquiry

An AI-powered GIS assistant designed to operate at the level of a county GIS Analyst for Solano County, California.

## Overview

SAGE helps county staff and the public interact with geographic and property information systems through an intelligent agent interface. It captures a GIS Analyst's expertise in a reusable, scalable form—not just the ability to query systems, but the organizational knowledge about when to use which data sources, how to interpret results, and what caveats to communicate.

## Features

### Core GIS Capabilities
- **Property Information**: Geocoding, parcel details, ownership, assessed values
- **Zoning Queries**: Automatic jurisdiction routing (city vs. county)
- **Hazard Zones**: FEMA flood zones, CAL FIRE fire hazard severity zones
- **Spatial Analysis**: Buffer queries, nearby POI search, parcel aggregations
- **Map Rendering**: Static maps with parcel overlays, buffer visualization, county/city boundaries
- **Special Districts**: Fire, water, school, and other service district lookups
- **Routing & Directions**: Turn-by-turn driving directions and travel time estimates
- **Interactive Map**: Browser-based ESRI map at `/map` with layer controls

### Extended Capabilities
- **County Code Lookup**: Search and retrieve Solano County Code sections (multiple chapters)
- **General Plan**: Search 2008 General Plan including chapters, EIR, and amendments
- **Budget Intelligence**: Semantic search of FY2025-26 budget document with RAG
- **Org Chart & Staffing**: Department structure, position allocation, job classifications
- **Infographic Generation**: AI-powered visualization and diagram creation

## Architecture

SAGE consists of two main components:

### MCP Server (`scripts/mcp-dev-server.ts`)
Provides Claude with 40+ tools across multiple categories:

**GIS Tools (14 tools)**
- `geocode_address` - Convert address to coordinates and APN
- `get_parcel_details` - Comprehensive property information
- `get_zoning` - Zoning with automatic jurisdiction routing
- `get_flood_zone` - FEMA flood zone designation
- `get_fire_hazard_zone` - CAL FIRE FHSZ classification
- `get_supervisor_district` - Board of Supervisors district
- `get_special_districts` - All service districts for a location
- `get_nearby` - Find nearby schools, parks, fire stations, etc.
- `search_parcels` - Search parcels by criteria with aggregations
- `get_parcels_in_buffer` - Parcels within radius (notification lists)
- `render_map` - Generate static map images
- `get_solano_context` - Retrieve reference materials
- `get_directions` - Turn-by-turn driving directions
- `get_travel_time` - Distance and travel time between locations

**County Code Tools (4 tools)**
- `get_county_code_sections` - Retrieve full text of code sections
- `list_county_code_chapters` - List available chapters
- `list_county_code_sections` - List sections in a chapter
- `search_county_code` - Keyword search across code

**General Plan Tools (7 tools)**
- `search_general_plan` - Search all General Plan documents
- `get_general_plan_chunk` - Retrieve full text of a chunk
- `list_general_plan_chapters` - List all chapters
- `list_general_plan_documents` - List document types
- `get_general_plan_chapter` - Get all content from a chapter
- `get_general_plan_overview` - Collection stats and metadata
- `search_general_plan_policies` - Search policies and goals

**Budget Tools (6 tools)**
- `search_budget` - Semantic search of budget document
- `get_budget_chunk` - Retrieve full chunk by ID
- `list_budget_departments` - List all departments
- `list_budget_sections` - List budget sections A-N
- `get_department_budget` - All budget info for a department
- `get_budget_overview` - Document metadata and statistics

**Org Chart Tools (7 tools)**
- `get_org_overview` - County org chart with departments and FTE
- `get_department` - Department details with divisions and positions
- `search_positions` - Search position titles across departments
- `get_position_distribution` - Where a job class is allocated
- `get_division` - Division details by code
- `list_job_classes` - Search job classifications
- `compare_departments` - Side-by-side staffing comparison

**Image Tools (2 tools)**
- `generate_infographic` - AI image generation for visualizations
- `edit_image` - AI image editing and combining

### Skill (`sage-skill/`)
Provides domain expertise and organizational knowledge:
- Jurisdiction routing rules
- Zoning code interpretation
- Prop 13 assessment explanation
- Flood and fire zone implications
- County organizational structure
- Geographic orientation
- Standard disclaimers and contacts

## Data Sources

### Live Query Services
- **Solano County ArcGIS**: Parcels, addresses, zoning, districts
- **FEMA NFHL**: National Flood Hazard Layer
- **CAL FIRE**: Fire Hazard Severity Zones

### Embedded Data
- **County Code Database**: SQLite with Chapters 26 (Subdivisions) and 28 (Zoning)
- **Budget Embeddings**: FY2025-26 budget with OpenAI embeddings in sqlite-vec
- **Reference Files**: Markdown knowledge base for interpretation

## Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation

```bash
npm install
```

### Environment Variables

Create `.env.local` with:
```
OPENAI_API_KEY=sk-...          # For budget semantic search
FAL_API_KEY=...                # For infographic generation (optional)
ARCGIS_CLIENT_ID=...           # For routing/directions (optional)
ARCGIS_CLIENT_SECRET=...       # For routing/directions (optional)
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Configure with Claude Code

Add the MCP server to your Claude Code configuration:

```bash
claude mcp add sage-dev -- npx tsx /path/to/sage/scripts/mcp-dev-server.ts
```

Or add to `~/.claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "sage-dev": {
      "command": "npx",
      "args": ["tsx", "/path/to/sage/scripts/mcp-dev-server.ts"],
      "env": {
        "OPENAI_API_KEY": "sk-...",
        "FAL_API_KEY": "..."
      }
    }
  }
}
```

## Project Structure

```
sage/
├── app/
│   ├── api/mcp/                 # MCP HTTP endpoint
│   ├── components/map/          # Interactive map component
│   ├── map/                     # /map page
│   └── page.tsx                 # Home page
├── lib/
│   ├── config/                  # Centralized configuration
│   │   ├── endpoints.ts         # All external service URLs
│   │   ├── defaults.ts          # Numeric constants
│   │   └── env.ts               # Environment validation
│   ├── tools/                   # MCP tool implementations
│   │   ├── geocode.ts
│   │   ├── parcel.ts
│   │   ├── zoning.ts
│   │   ├── directions.ts        # Routing & directions
│   │   ├── render-map.ts
│   │   ├── county-code.ts
│   │   ├── general-plan.ts
│   │   ├── budget.ts
│   │   ├── org-chart.ts
│   │   └── ...
│   ├── esri/                    # ESRI/ArcGIS integration
│   └── services/                # ArcGIS REST client
├── sage-skill/
│   ├── SKILL.md                 # Main skill file
│   └── references/              # Domain knowledge files
├── data/
│   ├── county-code.db           # County code SQLite database
│   ├── budget.db                # Budget RAG embeddings
│   └── general_plan.db          # General Plan embeddings
├── docs/
│   ├── sage/                    # Project documentation
│   ├── claude-code/             # Claude Code reference
│   ├── esri-js-sdk/             # ESRI JS SDK docs (976 pages)
│   └── external-apis/           # Third-party API docs
└── scripts/
    └── mcp-dev-server.ts        # Development MCP server
```

## Key Concepts

### Jurisdiction Routing
Mailing address ≠ legal jurisdiction. SAGE automatically determines if a location is in one of 7 cities or unincorporated county, then routes to the appropriate data source.

### Prop 13 Interpretation
Assessed values in California are limited by Proposition 13. SAGE explains why assessed value differs from market value.

### Hazard Zone Context
SAGE doesn't just return zone codes—it explains implications for insurance, building requirements, and next steps.

### Progressive Disclosure
Knowledge is loaded on-demand to manage context. Core principles are always present; detailed references are loaded when relevant.

## API Rate Limits

- **Infographic Generation**: ~66 images/day ($10 budget at $0.15/image)
- **GIS Queries**: No limits (queries public ArcGIS services)
- **Budget Search**: No limits (local embeddings)

## License

MIT

## Author

Exoria AI
