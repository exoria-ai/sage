# SAGE GIS Processing Tools (Modal)

Serverless geoprocessing functions using GeoPandas, deployed on [Modal](https://modal.com).

## Why Modal?

- **No Docker required** - dependencies defined in Python code
- **GeoPandas + GDAL** - full geoprocessing stack in seconds
- **Pay per use** - ~$0.0001/second, pennies per operation
- **No license fees** - pure open source stack

## Setup

1. Install Modal CLI:
   ```bash
   pip install modal
   modal setup  # One-time auth
   ```

2. Create Vercel Blob secret (for storing output files):
   ```bash
   modal secret create vercel-blob BLOB_READ_WRITE_TOKEN=vercel_blob_xxx
   ```

3. Deploy:
   ```bash
   modal deploy modal_gis/dissolve.py
   ```

## Available Functions

### `dissolve_layer`
Dissolve a shapefile by an attribute field.

```python
# Direct Python call
from modal_gis.dissolve import dissolve_layer

result = dissolve_layer.remote(
    input_url="https://...Parcels_Public_Aumentum_Shapefiles.zip",
    dissolve_field="f_school",
    simplify_tolerance=0.0001,
)
```

### `dissolve_and_store`
Dissolve and upload result to Vercel Blob.

### `inspect_layer`
Inspect a shapefile to see available fields and dissolve candidates.

## Web Endpoints

After deployment, you'll get URLs like:
- `https://your-workspace--sage-gis-tools-dissolve-api.modal.run`
- `https://your-workspace--sage-gis-tools-dissolve-and-store-api.modal.run`
- `https://your-workspace--sage-gis-tools-inspect-layer.modal.run`

### Example API Call

```bash
curl -X POST https://your-workspace--sage-gis-tools-dissolve-api.modal.run \
  -H "Content-Type: application/json" \
  -d '{
    "input_url": "https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root/Parcels_Public_Aumentum_GIS/Parcels_Public_Aumentum_Shapefiles.zip",
    "dissolve_field": "f_school",
    "simplify_tolerance": 0.0001
  }'
```

## Testing Locally

```bash
modal run modal_gis/dissolve.py::test_dissolve
```

## Solano County Data Sources

| Dataset | URL | Good Dissolve Fields |
|---------|-----|---------------------|
| Parcels | `Parcels_Public_Aumentum_Shapefiles.zip` | f_school, desc_fire, fund_water, wa_status, sitecity, use_desc |
| Road Centerlines | `Road_Centerlines_Shapefiles.zip` | - |
| Zoning | `SolanoCountyUnincorporatedZoning_Shapefiles.zip` | ZONING (or similar) |

Base URL: `https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root/`

## Output Formats

- **GeoJSON** (default) - web-friendly, single file, WGS84
- Results uploaded to Vercel Blob get persistent URLs

## Integration with SAGE MCP

The web endpoints are called from the SAGE MCP `dissolve_layer` tool:

```typescript
// lib/tools/definitions/dissolve-layer.ts
const response = await fetch(MODAL_ENDPOINT, {
  method: 'POST',
  body: JSON.stringify({ input_url, dissolve_field, simplify_tolerance })
});
```
