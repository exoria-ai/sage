# SAGE Observability & Monitoring Addendum

## Why This Matters

AI agents fail differently than traditional software. A GIS query tool might return a 200 OK while:

- Routing a Fairfield address to county zoning instead of city zoning
- Confidently misinterpreting a flood zone designation
- Forgetting context from earlier in the conversation
- Providing outdated contact information
- Missing a critical caveat about data limitations

These are **silent failures** — invisible to traditional monitoring but potentially harmful to users making decisions based on the output.

**For the interview**: Demonstrating that you've thought through observability signals a mature understanding of production AI systems. The visual dashboards also add polish to the video demo.

---

## Raindrop Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SAGE WITH OBSERVABILITY                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   User Query                                                                │
│       │                                                                     │
│       ▼                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  SAGE Agent (Claude Code / MCP Client)                              │  │
│   │                                                                      │  │
│   │  ┌──────────────────┐                                               │  │
│   │  │ raindrop.begin() │ ◄─── Start interaction tracking               │  │
│   │  └────────┬─────────┘                                               │  │
│   │           │                                                          │  │
│   │           ▼                                                          │  │
│   │  ┌──────────────────────────────────────────────────────────────┐   │  │
│   │  │  MCP Tool Calls (traced with withTool)                       │   │  │
│   │  │                                                               │   │  │
│   │  │  geocode_address ──► get_zoning ──► get_flood_zone           │   │  │
│   │  │        │                  │                │                  │   │  │
│   │  │        ▼                  ▼                ▼                  │   │  │
│   │  │  [tool_span]        [tool_span]      [tool_span]             │   │  │
│   │  │                                                               │   │  │
│   │  └──────────────────────────────────────────────────────────────┘   │  │
│   │           │                                                          │  │
│   │           ▼                                                          │  │
│   │  ┌──────────────────────────────────────────────────────────────┐   │  │
│   │  │  Skill Reference Lookups (traced with withSpan)              │   │  │
│   │  │                                                               │   │  │
│   │  │  jurisdiction.md ──► zoning-codes.md ──► contacts.md         │   │  │
│   │  │                                                               │   │  │
│   │  └──────────────────────────────────────────────────────────────┘   │  │
│   │           │                                                          │  │
│   │           ▼                                                          │  │
│   │  ┌────────────────────┐                                             │  │
│   │  │ interaction.finish │ ◄─── Complete with output + properties      │  │
│   │  └────────────────────┘                                             │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│                              ▼                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                    Raindrop Analytics                               │  │
│   │                                                                      │  │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │  │
│   │  │ Interaction │  │   Traces    │  │   Signals   │  │   Alerts   │ │  │
│   │  │   Logs      │  │  (Tools +   │  │  (Custom +  │  │  (Slack +  │ │  │
│   │  │             │  │   Spans)    │  │   Default)  │  │   Daily)   │ │  │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation

### Basic Integration (TypeScript MCP Server)

```typescript
import { Raindrop } from "raindrop-ai";
import { randomUUID } from "crypto";

const raindrop = new Raindrop({ 
  writeKey: process.env.RAINDROP_WRITE_KEY,
  // Enable tracing for tool calls
});

// Wrap each MCP tool invocation
async function handleToolCall(
  toolName: string, 
  args: Record<string, any>,
  userId: string,
  convoId?: string
) {
  const eventId = randomUUID();
  
  // Start interaction
  const interaction = raindrop.begin({
    eventId,
    event: `tool_${toolName}`,
    userId,
    convoId,
    input: JSON.stringify(args),
    properties: {
      tool_name: toolName,
      // Add relevant context
    }
  });

  try {
    // Execute the actual tool
    const result = await interaction.withTool(
      { name: toolName },
      async () => {
        return await executeToolLogic(toolName, args);
      }
    );

    // Track success
    interaction.finish({
      output: JSON.stringify(result),
      properties: {
        success: "true",
        result_count: result.features?.length?.toString() || "0"
      }
    });

    return result;
  } catch (error) {
    // Track failure
    interaction.finish({
      output: error.message,
      properties: {
        success: "false",
        error_type: error.name
      }
    });
    throw error;
  }
}
```

### Tracking Full Agent Interactions

For Claude Code / full agent interactions, track the entire conversation turn:

```typescript
// When SAGE receives a user query
const interaction = raindrop.begin({
  eventId: randomUUID(),
  event: "sage_query",
  userId: userIdentifier, // Could be session ID for anonymous
  input: userQuery,
  convoId: conversationId,
  properties: {
    query_type: classifyQueryType(userQuery), // "zoning", "flood", "parcel", etc.
    contains_address: detectsAddress(userQuery).toString(),
    contains_apn: detectsAPN(userQuery).toString(),
  }
});

// ... agent processes query, calls tools, generates response ...

// When agent completes
interaction.finish({
  output: agentResponse,
  properties: {
    tools_used: toolsUsed.join(","),
    jurisdiction_detected: jurisdictionResult,
    skill_references_loaded: referencesLoaded.join(","),
    response_length: agentResponse.length.toString(),
    includes_disclaimer: includesDisclaimer(agentResponse).toString(),
  }
});
```

---

## Custom Signals for SAGE

### Domain-Specific Failure Modes

| Signal Name | Type | Description | Detection Method |
|-------------|------|-------------|------------------|
| `jurisdiction_confusion` | Negative | Agent confused city/county jurisdiction | Deep Search or keyword |
| `missing_disclaimer` | Negative | Response lacks required GIS disclaimer | Regex signal |
| `wrong_zoning_layer` | Negative | Queried county zoning for city parcel (or vice versa) | Instrumented |
| `stale_contact_info` | Negative | Provided outdated phone/email | User feedback |
| `prop13_misunderstanding` | Negative | Misexplained assessed vs market value | Deep Search |
| `successful_lookup` | Positive | User got the info they needed | Instrumented |
| `appropriate_referral` | Positive | Correctly referred to department for complex question | Deep Search |
| `hazard_warning_given` | Neutral | Response included flood/fire hazard info | Keyword signal |

### Raindrop Default Signals (Enable These)

| Signal | Why It Matters for SAGE |
|--------|------------------------|
| **Forgetting** | Agent forgets address from earlier in conversation |
| **Task Failure** | Query failed due to API error or bad input |
| **User Frustration** | User unhappy with response quality |
| **Laziness** | Agent gave vague response without querying data |

### Setting Up Custom Signals

**Jurisdiction Confusion (Deep Search)**:
```
Prompt: "Agent gave zoning information for the wrong jurisdiction - 
either gave county zoning for a property inside city limits, or 
city zoning for an unincorporated property"
```

**Missing Disclaimer (Regex)**:
```
Prompt: "Response about a specific property that doesn't include 
any mention of GIS data limitations, accuracy caveats, or 
recommendation to verify with official sources"
```

**Instrumented Signal (Code)**:
```typescript
// When we detect wrong layer was queried
raindrop.trackSignal({
  eventId: interaction.eventId,
  name: "wrong_zoning_layer",
  sentiment: "NEGATIVE",
  properties: {
    expected_layer: "fairfield_zoning",
    actual_layer: "county_zoning",
    address: userAddress
  }
});
```

---

## Properties to Track

Consistent properties across all events enable filtering and analysis:

### Required Properties

| Property | Type | Description |
|----------|------|-------------|
| `query_type` | string | "zoning", "flood", "fire", "parcel", "supervisor", "general" |
| `jurisdiction` | string | "Fairfield", "Unincorporated", etc. (when detected) |
| `tools_used` | string | Comma-separated list of MCP tools invoked |
| `success` | boolean | Whether query completed successfully |

### Recommended Properties

| Property | Type | Description |
|----------|------|-------------|
| `apn` | string | Parcel APN if identified |
| `coordinates` | string | "lat,lon" if geocoded |
| `skill_references` | string | Which reference files were loaded |
| `response_includes_map` | boolean | Whether a map was generated |
| `response_length` | number | Character count of response |
| `tool_call_count` | number | How many MCP tools were invoked |
| `error_type` | string | If failed, what kind of error |

### User Identification

For public-facing deployment, consider:

```typescript
raindrop.setUserDetails({
  userId: sessionId, // Anonymous session identifier
  traits: {
    plan: "public", // vs "staff" for internal users
    source: "web_widget", // or "claude_code", "api"
    // Don't track PII for public users
  }
});
```

---

## Tracing Tool Chains

SAGE queries often involve multiple tool calls. Tracing shows the full chain:

```typescript
const interaction = raindrop.begin({
  userId: "user_123",
  event: "property_lookup",
  input: "What's the zoning at 123 Oak St, Fairfield?"
});

// Each tool call is traced
await interaction.withTool({ name: "geocode_address" }, async () => {
  return await mcpClient.call("geocode_address", { address: "123 Oak St, Fairfield" });
});

await interaction.withTool({ name: "check_city_boundary" }, async () => {
  return await mcpClient.call("query_location", { layer: "city_boundaries", lat, lon });
});

await interaction.withTool({ name: "get_zoning" }, async () => {
  // This internally routes to correct layer based on jurisdiction
  return await mcpClient.call("get_zoning", { lat, lon });
});

// Skill reference loading is also traced
await interaction.withSpan({ name: "load_zoning_context" }, async () => {
  return await loadReference("references/zoning-codes.md");
});

interaction.finish({ output: finalResponse });
```

In Raindrop's trace view, this shows:
```
property_lookup
├── geocode_address (45ms)
├── check_city_boundary (120ms)
├── get_zoning (230ms)
└── load_zoning_context (15ms)
```

---

## Experiments

Once you have baseline data, use Raindrop Experiments to test improvements:

### Potential Experiments

| Experiment | Variants | Hypothesis |
|------------|----------|------------|
| Tool description verbosity | Minimal vs Detailed | Detailed descriptions improve routing accuracy |
| Disclaimer placement | Start vs End vs Inline | End placement has better user experience |
| Jurisdiction check timing | Pre-query vs In-tool | In-tool routing has fewer errors |
| Knowledge chunking | Single file vs Multi-file | Multi-file reduces irrelevant context |

### Setting Up an Experiment

```typescript
// Assign user to experiment variant
const variant = assignVariant(userId, "jurisdiction_check_timing");

interaction.setProperty("experiment", "jurisdiction_check_timing");
interaction.setProperty("variant", variant); // "pre_query" or "in_tool"

// Later, filter by experiment in Raindrop to compare signal rates
```

---

## Alerts

### Recommended Alert Configuration

| Alert | Trigger | Channel |
|-------|---------|---------|
| **Tool Error Spike** | >5% error rate in 1 hour | Slack immediate |
| **Jurisdiction Confusion** | >3 incidents/day | Daily digest |
| **Missing Disclaimer** | Any incident | Slack immediate (during pilot) |
| **User Frustration** | >2% of interactions | Daily digest |

### Daily Digest

Enable daily Slack summaries showing:
- Total queries handled
- Breakdown by query type
- Signal incidents
- Notable wins (successful complex queries)

---

## Dashboard Views for Demo Video

### What to Show

1. **Real-time interaction stream**: Queries flowing through as you demo
2. **Trace waterfall**: Tool call chain for a complex query
3. **Signal dashboard**: Custom signals you've defined
4. **Properties breakdown**: Query types, jurisdictions, success rates

### Narrative for Video

> "Beyond just building the agent, I've instrumented it with production monitoring. 
> Here you can see every interaction traced through its tool calls — when someone 
> asks about zoning, SAGE geocodes the address, checks the city boundary, routes 
> to the correct zoning layer, and loads contextual knowledge. 
>
> I've also defined custom signals for domain-specific failures — like detecting 
> when the agent might confuse city and county jurisdiction, or when it forgets 
> to include the required GIS data disclaimer. These would alert the team to 
> issues that traditional monitoring would miss entirely.
>
> This is how you'd operate an AI agent in production — not just hoping it works, 
> but measuring and improving systematically."

---

## Implementation Priority

### For Demo (Phase 1)
- [ ] Basic `begin()` / `finish()` around queries
- [ ] Properties: query_type, jurisdiction, tools_used, success
- [ ] 2-3 custom signals defined
- [ ] Show dashboard in video

### For Production (Phase 2+)
- [ ] Full tool tracing with `withTool()`
- [ ] Skill reference tracing with `withSpan()`
- [ ] Complete signal library
- [ ] Experiments framework
- [ ] Alert configuration
- [ ] User feedback instrumentation

---

## Cost Considerations

Raindrop pricing is usage-based. For a demo/pilot:
- Estimate ~100-1000 interactions during development
- Well within free/starter tier
- Production would need volume estimates

---

## Alternative: DIY Observability

If not using Raindrop, similar patterns with:
- **OpenTelemetry** + Jaeger/Honeycomb for tracing
- **Custom logging** to structured JSON
- **Postgres/BigQuery** for interaction storage
- **Grafana** for dashboards
- **PagerDuty/Slack** for alerts

Raindrop's advantage: purpose-built for AI agent failure modes, ready to go quickly.

---

*"The best AI monitoring isn't about catching errors — it's about catching the confident wrong answers that users would otherwise trust."*
