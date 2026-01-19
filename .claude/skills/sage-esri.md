# SAGE ESRI/ArcGIS Patterns Skill

## Map Rendering Architecture

SAGE generates static map images using ESRI's Export Web Map Task, sending a WebMap JSON specification to a print service for server-side rendering.

### Core Flow

```
1. Build WebMap JSON (basemap + operational layers + graphics)
2. Send to ESRI Export Web Map Task
3. Receive rendered image (PNG/JPG)
4. Upload to Vercel Blob for URL access
5. Return image + URL to client
```

### WebMap JSON Structure

```typescript
interface WebMapJson {
  operationalLayers: OperationalLayer[];
  baseMap: {
    title: string;
    baseMapLayers: BasemapLayer[];
  };
  mapOptions: {
    extent: Extent;
    spatialReference: { wkid: number };
  };
  exportOptions: {
    dpi: number;
    outputSize: [number, number];
  };
}
```

## Basemap Configuration

SAGE supports four basemaps matching ArcGIS Online gallery names:

### Topographic (Default)
World Hillshade + World Topographic Map (vector tiles)
```typescript
{
  title: 'Topographic',
  baseMapLayers: [
    {
      id: 'World_Hillshade',
      url: 'https://services.arcgisonline.com/.../World_Hillshade/MapServer',
      layerType: 'ArcGISTiledMapServiceLayer',
    },
    {
      id: 'World_Topo_Map',
      type: 'VectorTileLayer',
      layerType: 'VectorTileLayer',
      styleUrl: 'https://cdn.arcgis.com/.../7dc6cea0b1764a1f9af2e679f642f0f5/resources/styles/root.json',
    },
  ],
}
```

### Imagery
World Imagery (satellite)
```typescript
{
  title: 'Imagery',
  baseMapLayers: [{
    id: 'World_Imagery',
    url: 'https://services.arcgisonline.com/.../World_Imagery/MapServer',
    layerType: 'ArcGISTiledMapServiceLayer',
  }],
}
```

### Imagery-Hybrid
World Imagery + Hybrid Reference Layer (roads/labels on satellite)
```typescript
{
  baseMapLayers: [
    { /* World_Imagery */ },
    {
      id: 'Hybrid_Reference_Layer',
      type: 'VectorTileLayer',
      styleUrl: 'https://cdn.arcgis.com/.../30d6b8271e1849cd9c3042060001f425/resources/styles/root.json',
    },
  ],
}
```

### Navigation
World Navigation Map
```typescript
{
  baseMapLayers: [{
    id: 'World_Navigation_Map',
    type: 'VectorTileLayer',
    styleUrl: 'https://cdn.arcgis.com/.../c50de463235e4161b206d000587af18b/resources/styles/root.json',
  }],
}
```

## Operational Layers

Operational layers sit on top of the basemap and use the map service's default symbology (no custom `drawingInfo` unless overriding).

### Adding a Feature Layer
```typescript
{
  id: 'parcels',
  url: LAYER_URLS.parcels,
  layerType: 'ArcGISFeatureLayer',
  visibility: true,
  opacity: 1,
  // No drawingInfo = use service defaults
}
```

### Layer Visibility Control
```typescript
interface LayerOptions {
  parcels?: boolean;        // Default: true when zoom >= 14
  aerial2025?: boolean;     // Solano high-res aerial (recommended when zoomed in)
  addressPoints?: boolean;  // Address point markers
  cityBoundary?: boolean;   // City boundaries
  countyBoundary?: boolean; // County outline
  garbageAreas?: boolean;   // Garbage service areas
}
```

## Graphics Layers

Graphics layers use custom symbology for highlights, buffers, and markers.

### Parcel Highlight
```typescript
{
  featureCollection: {
    layers: [{
      layerDefinition: {
        drawingInfo: {
          renderer: {
            type: 'simple',
            symbol: {
              type: 'esriSFS',
              style: 'esriSFSSolid',
              color: [255, 255, 0, 77],  // Yellow fill, semi-transparent
              outline: {
                type: 'esriSLS',
                style: 'esriSLSSolid',
                color: [255, 165, 0, 255],  // Orange outline
                width: 3,
              },
            },
          },
        },
      },
      featureSet: {
        geometryType: 'esriGeometryPolygon',
        features: [{ geometry: parcelGeometry }],
      },
    }],
  },
}
```

### Buffer Ring
```typescript
{
  symbol: {
    type: 'esriSFS',
    style: 'esriSFSNull',  // No fill
    outline: {
      type: 'esriSLS',
      style: 'esriSLSDash',
      color: [0, 200, 200, 255],  // Cyan dashed
      width: 2,
    },
  },
}
```

### Point Marker
```typescript
{
  symbol: {
    type: 'esriSMS',
    style: 'esriSMSCircle',
    color: [255, 0, 0, 255],
    size: 12,
    outline: {
      color: [255, 255, 255, 255],
      width: 2,
    },
  },
}
```

## Extent Calculation

### From Geometry + Padding
```typescript
function calculateExtent(geometry: Polygon | Point, paddingFeet: number): Extent {
  const paddingDegrees = paddingFeet / 364567.2;  // Approximate at this latitude
  return {
    xmin: geometry.xmin - paddingDegrees,
    ymin: geometry.ymin - paddingDegrees,
    xmax: geometry.xmax + paddingDegrees,
    ymax: geometry.ymax + paddingDegrees,
    spatialReference: { wkid: 4326 },
  };
}
```

### Aspect Ratio Adjustment
```typescript
// Adjust extent to match output image aspect ratio
const targetAspect = width / height;
const extentAspect = (xmax - xmin) / (ymax - ymin);

if (extentAspect > targetAspect) {
  // Too wide, expand height
  const center = (ymax + ymin) / 2;
  const newHeight = (xmax - xmin) / targetAspect;
  ymin = center - newHeight / 2;
  ymax = center + newHeight / 2;
} else {
  // Too tall, expand width
  const center = (xmax + xmin) / 2;
  const newWidth = (ymax - ymin) * targetAspect;
  xmin = center - newWidth / 2;
  xmax = center + newWidth / 2;
}
```

## Export Web Map Task

### Endpoint
```
https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute
```

### Request
```typescript
const params = new URLSearchParams({
  Web_Map_as_JSON: JSON.stringify(webMapJson),
  Format: format,  // 'PNG32' or 'JPG'
  f: 'json',
});

const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: params.toString(),
});
```

### Response
```typescript
interface ExportResponse {
  results: [{
    paramName: 'Output_File',
    value: { url: string };  // URL to rendered image
  }];
}
```

## Feature Service Queries

### Point-in-Polygon (Spatial Query)
```typescript
const params = new URLSearchParams({
  f: 'json',
  geometry: JSON.stringify({ x: longitude, y: latitude }),
  geometryType: 'esriGeometryPoint',
  spatialRel: 'esriSpatialRelIntersects',
  outFields: '*',
  returnGeometry: 'true',
});

const response = await fetch(`${serviceUrl}/query?${params}`);
```

### Attribute Query
```typescript
const params = new URLSearchParams({
  f: 'json',
  where: `APN = '${normalizedApn}'`,
  outFields: '*',
  returnGeometry: 'true',
});
```

### Buffer Query
```typescript
const params = new URLSearchParams({
  f: 'json',
  geometry: JSON.stringify(parcelGeometry),
  geometryType: 'esriGeometryPolygon',
  spatialRel: 'esriSpatialRelIntersects',
  distance: radiusFeet,
  units: 'esriSRUnit_Foot',
  outFields: 'APN,SITUS_ADDR,OWNER_NAME',
});
```

## Token Management

ESRI routing and some services require authentication:

```typescript
// lib/services/arcgis.ts
async function getArcGISToken(): Promise<string> {
  const response = await fetch('https://www.arcgis.com/sharing/rest/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.ARCGIS_API_KEY!,
      grant_type: 'client_credentials',
    }),
  });
  const data = await response.json();
  return data.access_token;
}
```

## Key Resources

### Documentation in `docs/`
- `docs/esri-js-sdk/` - Scraped ESRI JS SDK API docs
- `docs/esri-rest-api/` - ESRI REST API reference
- `docs/sage/SOLANO_GIS_LAYERS.md` - Solano County layer catalog
- `docs/sage/MAP_RENDERING.md` - Detailed map rendering docs

### External References
- ESRI REST API: https://developers.arcgis.com/rest/
- Export Web Map: https://developers.arcgis.com/rest/services-reference/export-web-map-task.htm
- Basemap styles: https://www.arcgis.com/home/group.html?id=3fce329a63a54e22a72fd6177f79ef2b
