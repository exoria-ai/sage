# GeographicTransformationStep

**Module:** `@arcgis/core/geometry/operators/support/GeographicTransformationStep`

## Import

```javascript
import GeographicTransformationStep from "@arcgis/core/geometry/operators/support/GeographicTransformationStep.js";
```

```javascript
// CDN
const GeographicTransformationStep = await $arcgis.import("@arcgis/core/geometry/operators/support/GeographicTransformationStep.js");
```

**Since:** 4.32

## Overview

Represents a step in the process of transforming coordinates from one geographic coordinate system to another. A geographic transformation step can be constructed from a well-known ID (wkid) or a well known text (wkt) that represents a geographic datum transformation.

## See Also

- GeographicTransformation
- Spatial References
- Coordinate systems, map projections, and transformations
- Geographic datum transformations
- About geographic transformations
- Sample - Client-side projection

## Property Details

### `GeographicTransformationStep`

### `declaredClass`
- **Type:** `Inherited`

### `isInverse`

### `wkid`

### `wkt`

### `addHandles`
- **Type:** `Inherited`

### `getInverse`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a geographic transformation step for Tokyo_To_WGS_1984_2001 using its wkid
let geoStep = new GeographicTransformationStep({ wkid: 108106 });
```

```javascript
// Create a geographic transformation step for NAD_1927_To_WGS_1984_1
// using its well known text or wkt
let wkt = "GEOGTRAN[\"NAD_1927_To_WGS_1984_1\",GEOGCS[\"GCS_North_American_1927\",DATUM[\"D_North_American_1927\",SPHEROID[\"Clarke_1866\",6378206.4,294.9786982]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],METHOD[\"Geocentric_Translation\"],PARAMETER[\"X_Axis_Translation\",-3.0],PARAMETER[\"Y_Axis_Translation\",142.0],PARAMETER[\"Z_Axis_Translation\",183.0]]";

let geoStep = new GeographicTransformationStep({ wkt });
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

```javascript
// Get the inverse of the geographic transformation step for Tokyo_To_WGS_1984_2001 using its wkid
let geoStep = new GeographicTransformationStep({ wkid: 108106 });

let inverse = geoStep.getInverse();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

