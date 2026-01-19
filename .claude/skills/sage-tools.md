# SAGE MCP Tools Skill

## Tool Architecture

SAGE uses a modular tool definition system. Each tool has two parts:

1. **Definition** (`lib/tools/definitions/*.ts`) - MCP-facing metadata and schema
2. **Implementation** (`lib/tools/*.ts`) - Core business logic

### Tool Definition Structure

```typescript
// lib/tools/definitions/example.ts
import { z } from 'zod';
import { defineTool, ToolResponse } from '../types';
import { doSomething } from '../example';  // Implementation

export const exampleTool = defineTool({
  name: 'example_tool',           // snake_case for MCP protocol
  description: `Tool description.  // Detailed LLM-facing docs

Use this when...
Returns...
Example: ...`,
  schema: {                        // Zod schema for inputs
    param1: z.string().describe('Description for LLM'),
    param2: z.number().optional(),
  },
  handler: async ({ param1, param2 }): Promise<ToolResponse> => {
    const result = await doSomething(param1, param2);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
});

// Export as array for aggregation
export const exampleTools = [exampleTool];
```

### Tool Registration

All tools are aggregated in `lib/tools/definitions/index.ts`:

```typescript
import { exampleTools } from './example';

export const allTools = [
  ...gisCoreTools,
  ...exampleTools,
  // ... other tool groups
];
```

The MCP route (`app/api/mcp/route.ts`) auto-registers all tools:

```typescript
for (const tool of allTools) {
  server.tool(tool.name, tool.description, tool.schema, tool.handler);
}
```

## Response Types

### Text Response
```typescript
return {
  content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
};
```

### Image Response (for maps)
```typescript
return {
  content: [
    {
      type: 'image',
      data: base64ImageData,
      mimeType: 'image/png',
      annotations: {
        audience: ['user'],
        priority: 1.0,
      },
    },
    {
      type: 'text',
      text: `Map URL: ${imageUrl}`,
    },
  ],
};
```

### Helper Function
```typescript
import { jsonResponse } from '../types';

return jsonResponse({ success: true, data: result });
```

## Tool Categories

### GIS Core (`gis-core.ts`)
- `geocode_address` - Address to APN/coordinates
- `get_parcel_details` - Property info by APN
- `get_zoning` - Zoning designation
- `get_flood_zone` - FEMA flood zone
- `get_fire_hazard_zone` - CAL FIRE FHSZ
- `get_supervisor_district` - BOS district
- `get_special_districts` - Fire, water, school districts

### Search (`search.ts`)
- `search_parcels` - Query parcels by criteria
- `get_parcels_in_buffer` - Notification list generation
- `get_nearby` - POI proximity search

### Documents
- `search_county_code`, `get_county_code_sections` - County Code
- `search_budget`, `get_department_budget` - FY Budget
- `search_general_plan`, `get_gp_policies` - General Plan

### Visualization
- `render_map` - Static map images
- `generate_infographic` - AI-generated visuals
- `edit_image` - Image editing

### Routing
- `get_directions` - Turn-by-turn directions
- `get_travel_time` - Distance/time only

## Writing Tool Descriptions

Tool descriptions are critical - they're the LLM's guide for when/how to use the tool.

### Good Description Pattern

```
**PURPOSE**: One-line summary of what this does.

WHEN TO USE:
- Scenario 1
- Scenario 2

INPUT:
- param1: What it means
- param2: What it means

OUTPUT:
- What the tool returns
- Important caveats

EXAMPLE:
  tool_name({ param1: "value" })
  → Expected result

NOTE: Important caveats or gotchas
```

### Description Tips

1. **Start with PURPOSE** - What problem does this solve?
2. **List inputs clearly** - Help LLM construct valid calls
3. **Show examples** - Concrete usage patterns
4. **Mention defaults** - Especially for optional params
5. **Warn about gotchas** - e.g., "APN format: XXX-XXX-XXX"

## Common Patterns

### APN Handling
```typescript
import { parseAPN, formatAPN } from '@/lib/utils/apn';

const normalized = parseAPN(inputApn);  // Strips dashes
const display = formatAPN(normalized);   // Adds dashes back
```

### Spatial Queries
```typescript
// Point-in-polygon query
const params = new URLSearchParams({
  f: 'json',
  geometry: JSON.stringify({ x: lon, y: lat }),
  geometryType: 'esriGeometryPoint',
  spatialRel: 'esriSpatialRelIntersects',
  outFields: '*',
});
```

### Feature Service Query
```typescript
const url = `${SOLANO_SERVICES.parcels}/query`;
const response = await fetch(`${url}?${params}`);
const data = await response.json();
const features = data.features || [];
```

## Testing Tools

### Unit Tests
Place in `lib/tools/*.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { geocodeAddress } from './geocode';

describe('geocodeAddress', () => {
  it('finds address', async () => {
    const result = await geocodeAddress('675 Texas St, Fairfield');
    expect(result.apn).toBeDefined();
  });
});
```

### Integration Tests
For complex tools like map rendering, use scripts:
```bash
npx tsx scripts/test-render-map.ts
```

## Adding a New Tool

1. Create implementation in `lib/tools/new-tool.ts`
2. Create definition in `lib/tools/definitions/new-tool.ts`
3. Export from `lib/tools/definitions/index.ts`
4. Add tests
5. Test via MCP endpoint or direct script
