# Map Rendering Architecture

This document describes how SAGE generates static map images using Solano County's GIS services.

---

## Overview

SAGE's `render_map` tool composites multiple layers to generate map images:

```
┌─────────────────────────────────────────────────────────┐
│                    Final Output                          │
├─────────────────────────────────────────────────────────┤
│  5. UI Overlays (north arrow, watermark)                │
│  4. Center marker (if no parcels highlighted)           │
│  3. Highlighted parcels (blue fill, specific APNs)      │
│  2. Parcel boundaries (green lines, all parcels)        │
│  1. Basemap (aerial imagery or street map)              │
└─────────────────────────────────────────────────────────┘
```

---

## Data Sources

### Basemap Tile Services

#### Aerial Imagery (Default)
Solano County's high-resolution aerial photography from ArcGIS Online.

**Service URL:** `https://tiles.arcgis.com/tiles/SCn6czzcqKAFwdGU/arcgis/rest/services`

| Year | Service Name | Coverage | Notes |
|------|--------------|----------|-------|
| **2025** | `Aerial2025_WGS84/MapServer` | Countywide | Current default |
| 2024 | `Aerial2024_WGS84/MapServer` | Urban areas | |
| 2023 | `Aerial2023_WGS84_ESRI_Aux/MapServer` | Urban areas | |
| 2022 | `Aerial2022_WGS84_ESRI_Aux/MapServer` | Countywide | |
| 2021 | `Aerial2021_WGS84_ESRI_Aux/MapServer` | Urban areas | |
| 2019 | `Aerial2019_WGS84_ESRI_Aux/MapServer` | Countywide | |
| 2017 | `Aerial2017_WGS84_ESRI_Aux/MapServer` | Countywide | |
| 2015 | `Aerial2015_WGS84_ESRI_Aux/MapServer` | Countywide | |
| 2008 | `Aerial2008_WGS84_ESRI_Aux/MapServer` | Countywide | |
| 2004 | `Aerial2004_WGS84_ESRI_Aux/MapServer` | Countywide | Oldest available |

**Tile Format:** TMS (z/y/x), 256x256 pixels, JPEG
**Zoom Levels:** 10-21 (minLOD to maxLOD)
**Spatial Reference:** Web Mercator (EPSG:3857)

**Tile URL Pattern:**
```
https://tiles.arcgis.com/tiles/SCn6czzcqKAFwdGU/arcgis/rest/services/Aerial2025_WGS84/MapServer/tile/{z}/{y}/{x}
```

#### Street Map (Alternative)
CARTO Voyager basemap for street-level context.

**Tile URL Pattern:**
```
https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png
```

**Tile Format:** 512x512 pixels (@2x retina), PNG

#### Other Available Basemaps

| Type | Service Name | Purpose |
|------|--------------|---------|
| **Hillshade** | `Hillshade_wgs84wmAuxSph_TileCache/MapServer` | Terrain shading |
| **DEM** | `DEM_wgs84wmAuxSph/MapServer` | Digital elevation |
| **nDSM** | `nDSM_wgs84wmAuxSph/MapServer` | Surface model (buildings) |
| **CIR** | `CIR_wgs84wmAuxSph_TileCache.../MapServer` | Color infrared (vegetation) |

---

### Vector Overlay Services

#### AumentumPublic MapServer

**Base URL:** `https://solanocountygis.com/server/rest/services/Aumentum/AumentumPublic/MapServer`

This is the primary service for parcel boundaries and other vector overlays.

**Available Layers:**

| Layer ID | Name | Purpose |
|----------|------|---------|
| 0 | Street Centerlines | Road network |
| 2 | Parcels | Property boundaries |
| 4 | Floodplains | Flood zones |
| 5 | City Boundary | Incorporated areas |
| 6 | County Boundary | County extent |

---

## MapServer Export API

The `/export` endpoint generates raster images from vector layers with custom styling.

### Basic Export Request

```
GET /MapServer/export?
  bbox={xmin},{ymin},{xmax},{ymax}
  &bboxSR=3857
  &size={width},{height}
  &format=png32
  &transparent=true
  &layers=show:2
  &f=image
```

### Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `bbox` | Bounding box (minX,minY,maxX,maxY) | `-13589000,4610000,-13585000,4614000` |
| `bboxSR` | Bbox spatial reference | `3857` (Web Mercator) |
| `size` | Output image size | `600,400` |
| `format` | Image format | `png32`, `png24`, `jpg` |
| `transparent` | Transparent background | `true` |
| `layers` | Layer visibility | `show:2` or `dynamic` |
| `dynamicLayers` | Custom layer styling | JSON array |
| `f` | Response format | `image` or `json` |

### Dynamic Layers for Custom Styling

The `dynamicLayers` parameter allows per-request customization of layer rendering.

#### Example: Green Parcel Outlines (All Parcels)

```json
[{
  "id": 102,
  "source": { "type": "mapLayer", "mapLayerId": 2 },
  "drawingInfo": {
    "renderer": {
      "type": "simple",
      "symbol": {
        "type": "esriSFS",
        "style": "esriSFSNull",
        "outline": {
          "type": "esriSLS",
          "style": "esriSLSSolid",
          "color": [34, 197, 94, 255],
          "width": 1.5
        }
      }
    }
  }
}]
```

#### Example: Blue Highlighted Parcels (Specific APNs)

```json
[{
  "id": 103,
  "source": { "type": "mapLayer", "mapLayerId": 2 },
  "definitionExpression": "parcelid='0030251020' OR parcelid='0030251021'",
  "drawingInfo": {
    "renderer": {
      "type": "simple",
      "symbol": {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [59, 130, 246, 77],
        "outline": {
          "type": "esriSLS",
          "style": "esriSLSSolid",
          "color": [59, 130, 246, 255],
          "width": 3
        }
      }
    }
  }
}]
```

### ESRI Symbol Types

#### Fill Symbols (esriSFS)

| Style | Description |
|-------|-------------|
| `esriSFSSolid` | Solid fill |
| `esriSFSNull` | No fill (outline only) |
| `esriSFSHorizontal` | Horizontal hatch |
| `esriSFSVertical` | Vertical hatch |
| `esriSFSForwardDiagonal` | Forward diagonal hatch |
| `esriSFSBackwardDiagonal` | Backward diagonal hatch |
| `esriSFSCross` | Cross hatch |
| `esriSFSDiagonalCross` | Diagonal cross hatch |

#### Line Symbols (esriSLS)

| Style | Description |
|-------|-------------|
| `esriSLSSolid` | Solid line |
| `esriSLSDash` | Dashed line |
| `esriSLSDot` | Dotted line |
| `esriSLSDashDot` | Dash-dot pattern |
| `esriSLSDashDotDot` | Dash-dot-dot pattern |
| `esriSLSNull` | No line |

#### Colors

Colors are RGBA arrays: `[R, G, B, A]` where each value is 0-255.

```javascript
[59, 130, 246, 255]   // Solid blue (#3B82F6)
[59, 130, 246, 77]    // 30% opacity blue
[34, 197, 94, 255]    // Green (#22C55E)
[220, 38, 38, 255]    // Red (#DC2626)
```

---

## Implementation: render_map Tool

### Tile Fetching

```typescript
// Calculate which tiles cover the viewport
const centerTileX = lon2tile(lon, zoom);
const centerTileY = lat2tile(lat, zoom);

// Aerial = 256px tiles, CARTO = 512px (@2x)
const tileSize = basemap === 'aerial' ? 256 : 512;
const tilesNeededX = Math.ceil(width / tileSize) + 1;
const tilesNeededY = Math.ceil(height / tileSize) + 1;
```

### Coordinate Conversion

```typescript
// WGS84 to Web Mercator
function toWebMercator(lon: number, lat: number): { x: number; y: number } {
  const x = lon * 20037508.34 / 180;
  let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  return { x, y };
}

// WGS84 to tile coordinates
function lon2tile(lon: number, zoom: number): number {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}

function lat2tile(lat: number, zoom: number): number {
  return Math.floor(
    ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
    Math.pow(2, zoom)
  );
}
```

### Compositing with Sharp

```typescript
import sharp from 'sharp';

// 1. Fetch and composite basemap tiles
const tileBuffers = await Promise.all(tilePromises);
const basemap = await sharp({ create: { width, height, channels: 4, background } })
  .composite(tileBuffers.map(tile => ({
    input: tile.buffer,
    left: (tile.x - startTileX) * tileSize,
    top: (tile.y - startTileY) * tileSize,
  })))
  .toBuffer();

// 2. Add vector overlays from MapServer
const parcelOverlay = await fetchParcelBoundaries(bbox, width, height);
const highlightOverlay = await fetchHighlightedParcels(bbox, width, height, apns);

// 3. Composite all layers
const final = await sharp(basemap)
  .composite([
    { input: parcelOverlay, top: 0, left: 0 },
    { input: highlightOverlay, top: 0, left: 0 },
    { input: markerSvg, top: 0, left: 0 },
    { input: northArrowSvg, top: 0, left: 0 },
    { input: watermarkSvg, top: 0, left: 0 },
  ])
  .png()
  .toBuffer();
```

---

## Output Storage

Generated maps are uploaded to Vercel Blob storage for permanent URLs.

```typescript
import { put } from '@vercel/blob';

const blob = await put(`maps/${apn}_${timestamp}.png`, imageBuffer, {
  access: 'public',
  contentType: 'image/png',
});

// Returns: https://xxxxx.public.blob.vercel-storage.com/maps/0030-251-020_1737012345678.png
```

---

## API Endpoints

### MCP Tool: render_map

```typescript
render_map({
  // Location (provide one)
  center: { latitude: 38.248, longitude: -122.041 },  // Recommended
  apn: "0030-251-020",           // Single parcel
  apns: ["0030-251-020", "..."], // Multiple parcels
  bbox: { xmin, ymin, xmax, ymax }, // Explicit bounds

  // Options
  width: 600,      // Default: 600
  height: 400,     // Default: 400
  zoom: 17,        // Default: 17 (1-19)
  format: 'png',   // 'png' or 'jpg'
  basemap: 'aerial' // 'aerial' (default) or 'streets'
})
```

### HTTP Endpoint: /api/map

```
GET /api/map?lat=38.248&lng=-122.041&zoom=17
GET /api/map?apn=0030-251-020
GET /api/map?apns=0030-251-020,0030-251-021&zoom=15
GET /api/map?apn=0030-251-020&basemap=streets&width=800&height=600
```

---

## Future Enhancements

### Historical Imagery Comparison
Add `year` parameter to show historical aerial from 2004-2025:
```typescript
render_map({ center, year: 2015 }) // Show 2015 imagery
```

### Additional Overlays
- Flood zones (layer 4)
- City boundaries (layer 5)
- Street centerlines (layer 0)
- Zoning boundaries
- Fire hazard zones

### Map Annotations
- Scale bar
- Coordinate labels
- Custom markers/labels
- Measurement tools

---

## References

- [ESRI MapServer REST API](https://developers.arcgis.com/rest/services-reference/enterprise/map-service/)
- [ESRI Symbol Objects](https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm)
- [Solano County GIS Portal](https://solanocountygis.com/portal)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)
