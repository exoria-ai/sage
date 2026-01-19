# SAGE Architecture Skill

## Project Structure

```
sage/
├── app/                      # Next.js App Router
│   ├── api/
│   │   ├── mcp/route.ts     # MCP server endpoint (main entry point)
│   │   ├── map/route.ts     # Static map image API
│   │   ├── arcgis-token/    # ESRI OAuth token proxy
│   │   └── arcgis-route/    # ESRI routing proxy
│   ├── map/page.tsx         # Interactive map viewer
│   ├── page.tsx             # Homepage with tool documentation
│   └── components/          # React components
│       └── map/             # Map-specific components
├── lib/
│   ├── config/              # Centralized configuration
│   │   ├── endpoints.ts     # All external service URLs
│   │   ├── defaults.ts      # Magic numbers and constants
│   │   ├── env.ts           # Environment variable access
│   │   └── index.ts         # Re-exports
│   ├── tools/               # MCP tool implementations
│   │   ├── definitions/     # Tool metadata + handlers (MCP facing)
│   │   │   ├── index.ts     # Tool registration aggregator
│   │   │   ├── gis-core.ts  # Geocoding, parcels, zoning, hazards
│   │   │   ├── render-map.ts# Static map generation
│   │   │   └── ...          # Other tool groups
│   │   ├── types.ts         # ToolDefinition, ToolResponse types
│   │   ├── render-map.ts    # Core map rendering logic
│   │   ├── geocode.ts       # Address geocoding
│   │   └── ...              # Other tool logic
│   ├── services/            # External service clients
│   │   └── arcgis.ts        # ESRI token management
│   ├── stores/              # Zustand state management
│   └── utils/               # Shared utilities
│       └── apn.ts           # APN parsing/formatting
├── data/                    # Local SQLite databases
│   ├── budget.db            # FY2025-26 county budget
│   └── county-code.db       # Solano County Code
├── docs/                    # Reference documentation
│   ├── sage/                # SAGE-specific docs
│   ├── esri-js-sdk/         # Scraped ESRI JS SDK docs
│   ├── esri-rest-api/       # ESRI REST API docs
│   └── county_codes/        # County code source files
└── scripts/                 # Development scripts
    └── test-render-map.ts   # Map rendering test suite
```

## Key Patterns

### Configuration Centralization

All magic numbers and external URLs are centralized:

```typescript
// lib/config/endpoints.ts - All external service URLs
import { SOLANO_AGOL_BASE, SOLANO_SERVICES, HAZARD_SERVICES } from '@/lib/config';

// lib/config/defaults.ts - All constants
import { MAP_DEFAULTS, BUFFER_DEFAULTS, LIMITS } from '@/lib/config';
```

Never hardcode URLs or magic numbers in tool implementations.

### Path Aliases

Use `@/` for absolute imports from project root:
```typescript
import { parseAPN } from '@/lib/utils/apn';
import { MAP_DEFAULTS } from '@/lib/config';
```

### Error Handling

Tools return structured responses, not exceptions:
```typescript
if (!result.success) {
  return {
    content: [{ type: 'text', text: `Error: ${result.message}` }],
  };
}
```

### Testing

- Unit tests: `*.test.ts` files alongside source
- Integration tests: `scripts/test-*.ts` for end-to-end testing
- Run tests: `npx vitest` or `npx tsx scripts/test-render-map.ts`

## Data Sources

### Solano County GIS (Primary)
- Base URL: `https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services`
- Features: Parcels, addresses, zoning, districts, boundaries

### ESRI Cloud Services
- Routing: `https://route-api.arcgis.com/`
- Basemaps: ArcGIS Online portal items
- Requires API key via `ARCGIS_API_KEY` env var

### External APIs
- FEMA NFHL: Flood hazard zones
- CAL FIRE: Fire hazard severity zones
- FAL.ai: Image generation

### Local Databases
- SQLite databases in `data/` directory
- Budget, County Code, General Plan content

## Environment Variables

Required in `.env.local`:
```
ARCGIS_API_KEY=        # ESRI Developer API key
BLOB_READ_WRITE_TOKEN= # Vercel Blob storage
FAL_KEY=               # FAL.ai image generation
```

## Deployment

### Vercel Configuration
- Platform: Vercel
- Framework: Next.js 15 with App Router
- MCP endpoint: `/api/mcp` (via mcp-handler package)
- Production URL: `https://sage-three-theta.vercel.app`
- Dashboard: `https://vercel.com/ai-machine-dream/sage/deployments`

### Auto-Deploy
Vercel auto-deploys on every push to `main` branch (via GitHub integration).
Check deployment status at the dashboard if builds fail.

### Pre-commit Build Verification
**IMPORTANT**: Always verify the build passes locally before pushing:
```bash
npm run build
```

This runs TypeScript type checking and catches errors like:
- Type mismatches between tool definitions and implementations
- Missing imports after refactoring
- Schema/handler signature mismatches

If `npm run build` passes locally, the Vercel deploy should succeed.

### Common Build Failures
1. **Type mismatches**: e.g., basemap type `'aerial'` vs `'imagery'` after renaming
2. **Missing exports**: Forgot to export new tool from `lib/tools/definitions/index.ts`
3. **Import errors**: File moved but imports not updated

### Environment Variables
Set these in Vercel Dashboard → Settings → Environment Variables:
- `ARCGIS_API_KEY` - ESRI Developer API key
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage (auto-configured)
- `FAL_KEY` - FAL.ai image generation

### Homepage Documentation
**IMPORTANT**: When adding/modifying MCP tools, update the homepage (`app/page.tsx`):
- The homepage displays example usage for all tools
- Organized by category cards (GIS Core, Documents, Visualization, etc.)
- Serves as user-facing documentation at `https://sage-three-theta.vercel.app`
- Keep examples in sync with tool schemas and descriptions
