# Jurisdiction Routing in Solano County

## Incorporated Cities

Solano County contains **7 incorporated cities**:

| City | Population (approx) | Key Characteristics |
|------|---------------------|---------------------|
| **Benicia** | 28,000 | Historic waterfront, industrial area |
| **Dixon** | 21,000 | Agricultural community, I-80 corridor |
| **Fairfield** | 119,000 | County seat, Travis AFB adjacent |
| **Rio Vista** | 10,000 | Delta community, wind energy |
| **Suisun City** | 29,000 | Waterfront redevelopment, train depot |
| **Vacaville** | 103,000 | Retail hub, outlet shopping |
| **Vallejo** | 121,000 | Former Mare Island, ferry to SF |

## Critical Rule: Mailing Address ≠ Jurisdiction

⚠️ **This is the #1 source of confusion in Solano County GIS work.**

The US Postal Service assigns mailing addresses based on the **nearest post office**, not legal boundaries. A property with a "Fairfield, CA" mailing address may actually be in:
- Unincorporated Solano County
- Suisun City
- Or even Vacaville (near boundaries)

### Examples of Common Confusion

| Mailing Address | Actual Jurisdiction | Why |
|-----------------|---------------------|-----|
| "Fairfield, CA 94533" | Often unincorporated | Rural areas around Fairfield use Fairfield address |
| "Vacaville, CA 95688" | Sometimes Dixon | Boundary areas near I-80 |
| "Vallejo, CA 94589" | Sometimes unincorporated | American Canyon area before incorporation |

### How to Verify Jurisdiction

1. **Use the `get_zoning` tool** — it automatically routes to the correct jurisdiction
2. **Check coordinates** against city boundary layers
3. **Never trust the mailing address alone**

## Unincorporated Solano County

Areas outside the 7 cities are **unincorporated** and governed by:
- **Solano County Board of Supervisors** (5 districts)
- **Solano County Planning Department** (land use)
- **Solano County Building Division** (permits)

### Common Unincorporated Areas

- Green Valley / Suisun Valley (wine country)
- Elmira
- Birds Landing
- Collinsville
- Rural areas between cities
- Travis AFB (federal jurisdiction, special case)

## Why Jurisdiction Matters

| Topic | City Jurisdiction | County Jurisdiction |
|-------|-------------------|---------------------|
| **Zoning** | City zoning code | County zoning code |
| **Building Permits** | City building dept | County building division |
| **Planning Applications** | City planning | County planning |
| **Code Enforcement** | City code compliance | County code compliance |
| **ADU Rules** | City ADU ordinance + state law | County ADU ordinance + state law |
| **Contact for Questions** | City hall | County departments |

## Routing Logic for Tools

When a tool needs to determine jurisdiction:

```
1. Get coordinates (from address or APN)
2. Query city boundary layer
3. If point intersects a city polygon → use city data/rules
4. If no intersection → unincorporated county → use county data/rules
```

The `get_zoning` tool implements this automatically.
