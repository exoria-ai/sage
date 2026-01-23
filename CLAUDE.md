# SAGE Development

AI-powered GIS assistant for Solano County. MCP server with 40+ tools hosted on Vercel.

## Quick Commands

```bash
npm run build        # ALWAYS run before committing (catches TS errors)
npm run dev          # Start local Next.js server with Turbopack (localhost:3000)
npm run clean        # Clear .next cache if builds fail with missing module errors
npm run rebuild      # Clean + build in one command
npx vitest run       # Run unit tests
npm run typecheck    # Fast type check (tsc --noEmit)
```

## Dev Server Cache Issues

If `npm run build` fails with "Cannot find module './XXX.js'" errors, run `npm run clean` or `npm run rebuild`. This happens when Next.js cache gets corrupted from rapid file edits. Turbopack (`npm run dev`) is more resilient than webpack but production builds still use webpack.

## Critical Patterns

- **Path aliases**: Use `@/` for all imports (never `../../`)
- **Config centralization**: URLs in `lib/config/endpoints.ts`, constants in `lib/config/defaults.ts`
- **APNs**: Lenient parsing accepts any 9-10 digit input regardless of separator placement. Use `parseAPN()` from `@/lib/utils/apn`. See `docs/sage/APN_FORMAT.md` for details.
- **Tool architecture**: Definition (schema + handler) in `lib/tools/definitions/`, business logic in `lib/tools/`

## Dual MCP Server

Changes must be made to BOTH servers:
- **Dev**: `scripts/mcp-dev-server.ts` (local stdio transport)
- **Prod**: `app/api/mcp/route.ts` (Vercel HTTP endpoint)

The prod route auto-registers from `lib/tools/definitions/index.ts`. Dev server requires manual updates.

## Adding/Modifying Tools

1. **Implementation**: `lib/tools/new-tool.ts` (pure business logic)
2. **Definition**: `lib/tools/definitions/new-tool.ts` (Zod schema + MCP handler)
3. **Register**: Export from `lib/tools/definitions/index.ts`
4. **Document**: Update `app/page.tsx` - this is the homepage and often forgotten!
5. **Test**: `npm run build` must pass

## Before Pushing

1. `npm run build` - Must pass (Vercel auto-deploys on push to main)
2. **Update `app/page.tsx`** if tool schemas/descriptions changed (easy to forget!)
3. Run relevant tests: `npx vitest run` or `npx tsx scripts/test-*.ts`

## Related Repositories

- **sage-plugin** (`~/Development/sage-plugin`) - Claude Code plugin that packages the SAGE skill and MCP server for easy installation. Documents how to use the tools.

## Key Documentation

Located in `docs/` - load on demand, not by default:

### Architecture
- `docs/sage/SAGE_GIS_EXPANSION_SPEC.md` - Interactive map architecture spec. Parts are implemented (WebMap presets, layer controls), other parts are aspirational (drawing tools, advanced analysis). Compare against actual code.
- `docs/sage/MAP_RENDERING.md` - Static map composition (capture_map_view tool)
- `docs/sage/SOLANO_GIS_LAYERS.md` - Layer catalog and discovery patterns
- `docs/interview/SOLANO-COUNTY-INTERVIEW-INTEL-UPDATED.md` - County org structure, GIS division, key staff

### ESRI API Reference (comprehensive coverage)
- `docs/esri-js-sdk/` - ArcGIS Maps SDK for JavaScript (complete)
- `docs/esri-rest-api/` - ESRI REST API reference (complete)

## Data Sources

- **Solano ArcGIS**: Public REST services (parcels, addresses, zoning, districts)
- **FEMA NFHL**: Flood hazard zones
- **CAL FIRE**: Fire hazard severity zones
- **Local SQLite**: `data/budget.db`, `data/county-code.db`, `data/general_plan.db`

## Error Response Pattern

Tools return structured responses, not exceptions:
```typescript
{
  success: boolean;
  data?: any;
  error_type?: 'INVALID_INPUT' | 'NO_RESULTS' | 'QUERY_ERROR';
  message?: string;
  suggestion?: string;
}
```

## Testing

- Unit tests: `lib/tools/*.test.ts` (mock external services)
- Integration tests: `scripts/test-*.ts` (live queries)
- Test output: `test-output/` for map rendering artifacts
