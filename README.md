# SAGE - Solano Agent for Geographic Enquiry

An AI-powered GIS assistant designed to operate at the level of a county GIS Analyst for Solano County, California.

## Overview

SAGE helps county staff and the public interact with geographic and property information systems through an intelligent agent interface. It captures a GIS Analyst's expertise in a reusable, scalable form—not just the ability to query systems, but the organizational knowledge about when to use which data sources, how to interpret results, and what caveats to communicate.

## Features

- **Property Information Lookup**: Geocoding, parcel details, ownership, assessed values
- **Zoning Queries**: Automatic jurisdiction routing (city vs. county)
- **Hazard Zone Information**: FEMA flood zones, CAL FIRE fire hazard severity zones
- **Spatial Analysis**: Buffer queries, intersections, aggregations
- **Contextual Interpretation**: Not just data, but what it means

## Architecture

SAGE consists of two main components:

### MCP Server (`src/mcp-server/`)
Provides Claude with tools to query GIS data:
- Geocoding and address lookup
- Parcel information queries
- Zoning layer queries with jurisdiction routing
- FEMA and CAL FIRE hazard zone queries
- Board of Supervisors district lookup

### Skill (`sage-skill/`)
Provides domain expertise and organizational knowledge:
- Jurisdiction routing rules
- Zoning code interpretation
- Prop 13 assessment explanation
- Flood and fire zone implications
- Standard disclaimers and contacts

## Data Sources

- **Solano County ArcGIS**: Parcels, addresses, zoning, districts
- **FEMA NFHL**: National Flood Hazard Layer
- **CAL FIRE**: Fire Hazard Severity Zones

## Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Configure with Claude

Add to your Claude Code MCP configuration:

```json
{
  "mcpServers": {
    "sage-gis": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/sage"
    }
  }
}
```

## Project Structure

```
sage/
├── src/
│   ├── index.ts                 # Entry point
│   └── mcp-server/
│       ├── index.ts             # MCP server setup
│       ├── tools/               # Tool definitions and handlers
│       ├── services/            # External API clients
│       └── utils/               # Utilities (coordinates, APN parsing)
├── sage-skill/
│   ├── SKILL.md                 # Main skill file
│   ├── references/              # Domain knowledge files
│   └── templates/               # Report templates
├── docs/                        # Reference documentation
└── package.json
```

## Key Concepts

### Jurisdiction Routing
Mailing address ≠ legal jurisdiction. SAGE automatically determines if a location is in one of 7 cities or unincorporated county, then routes to the appropriate data source.

### Prop 13 Interpretation
Assessed values in California are limited by Proposition 13. SAGE explains why assessed value differs from market value.

### Hazard Zone Context
SAGE doesn't just return zone codes—it explains implications for insurance, building requirements, and next steps.

## License

MIT

## Author

Exoria AI
