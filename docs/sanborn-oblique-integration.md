# Sanborn Oblique Imagery Integration Research

> Research conducted: January 20, 2026
> Status: Research complete, implementation pending

---

## Questions & Technical Challenges

### High Priority

#### 1. Omega/Phi/Kappa → Heading/Pitch/Roll Conversion
The photogrammetric angles (omega, phi, kappa) used by Sanborn follow aerial survey conventions, while ESRI's OIC uses (heading, pitch, roll) in a navigation reference frame. The conversion is **not** simply radians-to-degrees:
- Omega/phi/kappa are rotations applied in a specific order around specific axes
- The `isFlipped` flag in Sanborn data suggests camera orientation varies
- Getting this wrong means measurements and click-to-location will be broken

**Questions:**
- What rotation order does Sanborn use? (ω-φ-κ is typical but need to confirm)
- How does `isFlipped: true` affect the transformation?
- Can we validate by comparing footprint polygons from Sanborn vs our calculation?

#### 2. COG Rendering in OrientedImageryLayer
Sanborn serves 50-75MB Cloud Optimized GeoTIFFs. Their viewer uses a custom `CogImage` JavaScript class with byte-range requests.

**Questions:**
- Does OrientedImageryLayer natively support COG URLs, or does it expect a tile service?
- If not native, can we use geotiff.js as an intermediary?
- Would a server-side tile proxy (converting COG → PNG tiles on demand) be needed?
- What's the latency/UX impact of loading large COGs vs pre-tiled imagery?

#### 3. Dynamic Feature Source Updates
We want to query FindFootprints on map click and display results in OrientedImageryLayer.

**Questions:**
- Can OrientedImageryLayer's `source` property be updated dynamically after creation?
- Does OrientedImageryViewer widget handle layer source changes gracefully?
- Should we create a new layer per query, or maintain a single layer with accumulating features?

### Medium Priority

#### 4. State Plane Projection Performance
Every interaction requires EPSG:6418 ↔ WGS84 conversion.

**Questions:**
- Is ESRI's client-side projection engine fast enough for real-time use?
- Should we do projection server-side in the FindFootprints proxy?
- Can we cache the projection transformation?

#### 5. Multi-Year Dataset Handling
Sanborn has 2022, 2023, and 2024 imagery with different dataset IDs.

**Questions:**
- Should users select a year, or show all available years?
- How do we handle the UI when multiple years have coverage for the same location?
- Are there differences in camera calibration between years that affect the OIC schema?

#### 6. Measurement Tool Accuracy
ESRI's OrientedImageryViewer includes height/distance measurement tools that require the `Accuracy` field.

**Questions:**
- What accuracy values should we use? (Currently hardcoded `"0.5,0.5,1,1,1,1,1,1"`)
- Does Sanborn provide actual accuracy/uncertainty metadata anywhere?
- Do measurements require the `surfaceModelUrl` (DEM) data to work correctly?

### Lower Priority / Nice to Have

#### 7. Integration with Existing Parcel Workflow
When a user looks up a parcel in SAGE, could we automatically show oblique views?

**Questions:**
- What's the best UX? Automatic panel? Button to open obliques?
- Should oblique imagery be a separate "mode" or integrated into the main map?

#### 8. Fallback to Sanborn Viewer
If our integration has issues, we could link out to Sanborn's viewer.

**Questions:**
- Can we construct a deep link to Sanborn's viewer for a specific location?
- What URL parameters does their viewer accept?

#### 9. API Stability / Terms of Service
We're using undocumented APIs discovered through reverse engineering.

**Questions:**
- Is Solano County aware we're accessing this data directly?
- Could Sanborn block or rate-limit our access?
- Should we coordinate with County GIS staff about this integration?

---

## Executive Summary

Solano County has Sanborn oblique aerial imagery with a dedicated viewer at https://obliqueanalyst.sanborn.com/Solano_County/. This research documents how the imagery API works and how it could be integrated into SAGE using ESRI's `OrientedImageryLayer`.

**Key Finding:** The Sanborn imagery API is **publicly accessible** with CORS enabled, and the data format is **fully compatible** with ESRI's OrientedImageryLayer schema.

---

## Part 1: Sanborn API Documentation

### 1.1 Overview

Sanborn provides oblique aerial imagery captured with a 5-camera system:
- **Nadir (Color)**: Straight-down view (13470 x 8670 pixels, 82mm focal length)
- **North (Fwd)**: Forward-facing oblique (10300 x 7700 pixels, 123mm focal length)
- **South (Bwd)**: Backward-facing oblique
- **East (Left)**: Left-facing oblique
- **West (Right)**: Right-facing oblique

### 1.2 Available Datasets

| Dataset ID | Year | Tile Service Path |
|------------|------|-------------------|
| `312022434_Solano_County_2022` | 2022 | `geo_caches` |
| `312022434_Solano_County_2023` | 2023 | `geo_caches2` |
| `20231072_Solano_County_CA_2024` | 2024 | `geo_caches2` |

### 1.3 API Endpoints

#### 1.3.1 Tile Mosaic Service (Nadir Views)

For displaying nadir imagery in a slippy map:

```
GET https://services.sanborn.com/geo_caches2/{dataset_id}/3in_Mosaics/{z}/{x}/{y}.png
```

**Example:**
```
https://services.sanborn.com/geo_caches2/20231072_Solano_County_CA_2024/3in_Mosaics/15/5280/12600.png
```

**Notes:**
- Standard XYZ tile scheme
- Coordinate system: EPSG:6418 (California State Plane Zone 2, NAD83)
- No authentication required
- Returns 204 (No Content) for tiles outside coverage area

#### 1.3.2 FindFootprints API

Retrieves all available oblique views for a given coordinate:

```
GET https://obliqueanalyst.sanborn.com/Solano_County/FindFootprints?x={x}&y={y}&a={azimuth}&c={collection}
```

**Parameters:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| `x` | X coordinate (State Plane feet) | `6543837` |
| `y` | Y coordinate (State Plane feet) | `1853895` |
| `a` | View azimuth (optional, for filtering) | `null` or empty |
| `c` | Collection year (optional) | `2024` or empty for all |

**Response:** JSON with array of footprints (gzip compressed)

```json
{
  "footprints": [
    {
      "camera": {
        "cameraID": "Color",
        "pixelSize": 0.0052,
        "imageWidth": 13470,
        "imageHeight": 8670,
        "focalLength": 82.0,
        "xp": 0.0, "yp": 0.0,
        "k1": 0.0, "k2": 0.0, "k3": 0.0,
        "p1": 0.0, "p2": 0.0
      },
      "eo": {
        "fileName": "312022434_Solano_County_2023/2023/cog_images/20230209_B_ANCN_04520_Color.tif",
        "shotID": "20230209_B_ANCN_04520_Color",
        "cameraX": 6543593.566,
        "cameraY": 1854318.576,
        "cameraZ": 4101.286,
        "omega": -0.0004749,
        "phi": -0.0015221,
        "kappa": 3.12722049,
        "isFlipped": true,
        "flightDate": "February 9, 2023"
      },
      "imageUrl": "https://services.sanborn.com/Obliques/312022434_Solano_County_2023/2023/cog_images/20230209_B_ANCN_04520_Color.tif",
      "surfaceModelUrl": "https://services.sanborn.com/Obliques/312022434_Solano_County_2023/2023/cog_images/20230209_B_ANCN_04520_Color.json",
      "shotID": "20230209_B_ANCN_04520_Color",
      "collectionName": "2023",
      "lowerLeftX": 6541861.307,
      "lowerLeftY": 1853232.539,
      "upperLeftX": 6541885.375,
      "upperLeftY": 1855455.231,
      "upperRightX": 6545351.458,
      "upperRightY": 1855408.647,
      "lowerRightX": 6545323.972,
      "lowerRightY": 1853171.429,
      "aspect": "Nadir",
      "isNadirView": true,
      "viewAzimuth": 0.0
    }
    // ... more footprints for N, E, S, W views
  ]
}
```

#### 1.3.3 Oblique Image Service (COG Files)

Full-resolution Cloud Optimized GeoTIFF images:

```
GET https://services.sanborn.com/Obliques/{dataset_id}/{year}/cog_images/{image_name}.tif
```

**Example:**
```
https://services.sanborn.com/Obliques/312022434_Solano_County_2023/2023/cog_images/20230209_B_ANCN_04520_Color.tif
```

**Headers returned:**
```
HTTP/2 200
content-type: image/tiff
access-control-allow-origin: *
access-control-allow-methods: GET
access-control-allow-headers: *
```

**Notes:**
- Files are Cloud Optimized GeoTIFFs (COG) with internal JPEG compression
- Supports HTTP Range requests for efficient tile access
- CORS enabled for browser access
- File sizes: ~50-75 MB per image

#### 1.3.4 Surface Model Service

Digital elevation model for height calculations:

```
GET https://services.sanborn.com/Obliques/{dataset_id}/{year}/cog_images/{image_name}.json
```

### 1.4 Coordinate System

- **EPSG:6418**: NAD83(2011) / California zone 2 (ftUS)
- **Proj4**: `+proj=lcc +lat_1=39.83 +lat_2=38.33 +lat_0=37.66666666666666 +lon_0=-122 +x_0=2000000.0001016 +y_0=500000.0001016 +ellps=GRS80 +units=us-ft +no_defs`
- **Bounds (feet)**: X: 6,415,811 to 6,702,986 | Y: 1,738,720 to 1,977,723

### 1.5 Camera Parameters Explained

| Parameter | Description | Units |
|-----------|-------------|-------|
| `cameraX/Y/Z` | Camera position at capture | State Plane feet |
| `omega` | Roll angle (rotation around flight line) | Radians |
| `phi` | Pitch angle (rotation around cross-track axis) | Radians |
| `kappa` | Yaw angle (rotation around vertical axis) | Radians |
| `focalLength` | Camera focal length | Millimeters |
| `pixelSize` | Sensor pixel pitch | Millimeters |
| `k1, k2, k3` | Radial lens distortion coefficients | - |
| `p1, p2` | Tangential lens distortion coefficients | - |

---

## Part 2: ESRI OrientedImageryLayer Compatibility

### 2.1 What is OrientedImageryLayer?

ESRI's `OrientedImageryLayer` (introduced in ArcGIS JS SDK 4.28) is designed specifically for non-nadir imagery including:
- Oblique aerial photography
- 360° imagery
- Street-level imagery
- Inspection imagery

It includes the `OrientedImageryViewer` widget for viewing and navigating oblique images with built-in measurement tools.

### 2.2 OIC Schema Field Mapping

| Sanborn Field | ESRI OIC Field | Conversion |
|---------------|----------------|------------|
| `cameraX, cameraY, cameraZ` | Camera location Point | Reproject to WGS84 |
| `omega` | `CamRoll` | `omega * (180/π)` |
| `phi` | `CamPitch` | `90 - phi * (180/π)` |
| `kappa` | `CamHeading` | `kappa * (180/π)` clockwise from north |
| `focalLength`, `pixelSize`, `imageWidth` | `HFOV` | `2 * atan((imageWidth * pixelSize / 2) / focalLength) * (180/π)` |
| `focalLength`, `pixelSize`, `imageHeight` | `VFOV` | `2 * atan((imageHeight * pixelSize / 2) / focalLength) * (180/π)` |
| `cameraZ` (feet) | `AvgHtAG` | `cameraZ * 0.3048` (convert to meters) |
| `aspect` | `OIType` | Map: Nadir→"nadir", N/E/S/W→"oblique" |
| `imageUrl` | Image path | Direct URL (imagePathPrefix not needed) |

### 2.3 Calculated Values

**Horizontal Field of View (HFOV):**
- Nadir camera: `2 * atan((13470 * 0.0052 / 2) / 82) ≈ 46.3°`
- Oblique camera: `2 * atan((10300 * 0.0052 / 2) / 123) ≈ 24.3°`

**Vertical Field of View (VFOV):**
- Nadir camera: `2 * atan((8670 * 0.0052 / 2) / 82) ≈ 30.7°`
- Oblique camera: `2 * atan((7700 * 0.0052 / 2) / 123) ≈ 18.5°`

### 2.4 Additional OIC Fields Required

For measurement tools to work, the `Accuracy` field must be populated:
```
"0.5,0.5,1,1,1,1,1,1"
```
(8 comma-separated values for camera calibration uncertainty)

---

## Part 3: Existing SAGE Map Architecture

### 3.1 Current Implementation

SAGE's interactive map is located at:
- **Page**: `app/map/page.tsx`
- **Component**: `app/components/map/MapContainer.tsx`
- **Config**: `lib/esri/webmaps.ts`

Key features:
- Uses ESRI ArcGIS JS SDK 4.34
- Loads Web Maps from ArcGIS Online by portal item ID
- Supports URL parameters for center, zoom, APN highlight, address highlight, routing
- Includes LayerList, Legend, BasemapGallery, Search, and Identify widgets
- Supports vector tile / feature layer pairing for optimized display

### 3.2 Integration Points

The OrientedImageryLayer could be added:
1. As a new layer type in Web Maps
2. As a dynamic layer created client-side
3. As a separate "Oblique Imagery" view mode

---

## Part 4: Proposed Integration Architecture

### 4.1 Option A: Client-Side Dynamic Layer (Recommended)

Create an OrientedImageryLayer dynamically by:
1. Querying Sanborn's FindFootprints API when user clicks a location
2. Converting the response to OIC feature format
3. Creating a client-side OrientedImageryLayer with the `source` property

**Pros:**
- No need to publish a Feature Service
- Real-time data from Sanborn
- Simpler deployment

**Cons:**
- Requires coordinate conversion in browser
- More complex client-side code

### 4.2 Option B: Proxy Feature Service

Create a server-side endpoint that:
1. Proxies requests to Sanborn's FindFootprints API
2. Transforms responses to OIC GeoJSON format
3. Serves as a pseudo-Feature Service for OrientedImageryLayer

**Pros:**
- Cleaner client-side code
- Can cache/optimize responses
- Could pre-index all imagery for faster queries

**Cons:**
- More server infrastructure
- Need to maintain coordinate transformation

### 4.3 Option C: Published OIC Feature Service

Create a hosted Feature Service in ArcGIS Online:
1. One-time bulk import of all Sanborn footprints
2. Transform coordinates and camera parameters
3. Publish as Oriented Imagery Catalog

**Pros:**
- Standard ESRI workflow
- Full OIC tooling support
- Works with ArcGIS Pro

**Cons:**
- Requires manual updates when new imagery is captured
- More setup effort
- ArcGIS Online storage costs

### 4.4 Recommended Approach

**Phase 1: Proof of Concept**
- Add OrientedImageryLayer to existing MapContainer
- Hardcode a few footprints from FindFootprints response
- Verify COG images load and measurements work

**Phase 2: Dynamic Integration**
- Add API route to proxy/transform FindFootprints requests
- Wire up click handler to load oblique imagery for clicked location
- Add OrientedImageryViewer widget to UI

**Phase 3: Polish**
- Add year/collection selector
- Add "Open in Sanborn viewer" link for fallback
- Handle edge cases (no imagery, multiple collections)

---

## Part 5: Implementation Notes

### 5.1 Required Imports

```typescript
import OrientedImageryLayer from "@arcgis/core/layers/OrientedImageryLayer";
import OrientedImageryViewer from "@arcgis/core/widgets/OrientedImageryViewer";
import * as imageToWorld from "@arcgis/core/layers/orientedImagery/transformations/imageToWorld";
import * as worldToImage from "@arcgis/core/layers/orientedImagery/transformations/worldToImage";
```

### 5.2 Sample Conversion Function

```typescript
interface SanbornFootprint {
  camera: {
    pixelSize: number;
    imageWidth: number;
    imageHeight: number;
    focalLength: number;
  };
  eo: {
    cameraX: number;
    cameraY: number;
    cameraZ: number;
    omega: number;
    phi: number;
    kappa: number;
  };
  imageUrl: string;
  aspect: string;
  shotID: string;
}

function convertToOIC(footprint: SanbornFootprint) {
  const { camera, eo } = footprint;
  const RAD_TO_DEG = 180 / Math.PI;

  // Calculate FOV
  const sensorWidth = camera.imageWidth * camera.pixelSize;
  const sensorHeight = camera.imageHeight * camera.pixelSize;
  const hfov = 2 * Math.atan(sensorWidth / 2 / camera.focalLength) * RAD_TO_DEG;
  const vfov = 2 * Math.atan(sensorHeight / 2 / camera.focalLength) * RAD_TO_DEG;

  // Convert angles (omega/phi/kappa to heading/pitch/roll)
  // Note: This is simplified - actual conversion depends on coordinate system conventions
  const camHeading = eo.kappa * RAD_TO_DEG;
  const camPitch = 90 - (eo.phi * RAD_TO_DEG);
  const camRoll = eo.omega * RAD_TO_DEG;

  // Convert height from feet to meters
  const avgHtAG = eo.cameraZ * 0.3048;

  return {
    attributes: {
      Name: footprint.shotID,
      ImagePath: footprint.imageUrl,
      CamHeading: camHeading,
      CamPitch: camPitch,
      CamRoll: camRoll,
      HFOV: hfov,
      VFOV: vfov,
      AvgHtAG: avgHtAG,
      OIType: footprint.aspect === 'Nadir' ? 'nadir' : 'oblique',
      Accuracy: '0.5,0.5,1,1,1,1,1,1',
    },
    geometry: {
      // Camera location - needs reprojection from State Plane to WGS84
      type: 'point',
      x: eo.cameraX, // TODO: reproject
      y: eo.cameraY, // TODO: reproject
      spatialReference: { wkid: 6418 }
    }
  };
}
```

### 5.3 Coordinate Transformation

Use ESRI's projection module or proj4js:

```typescript
import * as projection from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Point from "@arcgis/core/geometry/Point";

// Load projection engine
await projection.load();

// Transform point from State Plane to WGS84
const statePlanePoint = new Point({
  x: 6543837,
  y: 1853895,
  spatialReference: new SpatialReference({ wkid: 6418 })
});

const wgs84Point = projection.project(
  statePlanePoint,
  SpatialReference.WGS84
) as Point;
```

---

## Part 6: Reference Links

### Sanborn
- Oblique Analyst (Solano): https://obliqueanalyst.sanborn.com/Solano_County/
- Sanborn Oblique Imagery: https://sanborn.com/oblique-imagery/
- Sanborn GeoServe: https://sanborn.com/geoserve/

### ESRI Documentation
- OrientedImageryLayer API: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-OrientedImageryLayer.html
- OrientedImageryViewer Widget: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-OrientedImageryViewer.html
- OIC Schema (GitHub): https://github.com/Esri/oriented-imagery
- Creating an OIC: https://doc.arcgis.com/en/imagery/workflows/tutorials/creating-an-oriented-imagery-catalog.htm

### Solano County GIS
- ReGIS Apps Portal: https://regis.solanocounty.com/apps/
- County GIS Portal: https://solanocountygis.com/portal/

---

## Appendix A: Sample API Responses

### FindFootprints Response (Full)

See `/tmp/footprints.json` for complete response saved during research.

### Tile Valid Ranges (2024 Dataset)

Tested valid tile coordinates for `20231072_Solano_County_CA_2024`:

| Zoom | X Range | Y Range |
|------|---------|---------|
| 0 | 0 | 0 |
| 5 | 5 | 12 |
| 10 | 164-165 | 393-394 |
| 12 | 658-663 | 1574-1579 |
| 15 | 5278+ | 12598+ |

---

## Appendix B: Files Created During Research

- `/tmp/sanborn_tiles/` - Downloaded tile samples at various zoom levels
- `/tmp/sanborn_obliques/` - Partial COG file downloads (first 512KB for structure analysis)
- `/tmp/footprints.json` - Full FindFootprints API response
- `/tmp/sanborn_config.txt` - Extracted viewer configuration
- `/tmp/sanborn_app.js` - Sanborn viewer application JavaScript
