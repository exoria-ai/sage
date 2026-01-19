# geodesicBufferOperator

**Module:** `@arcgis/core/geometry/operators/geodesicBufferOperator`

## Import

```javascript
import * as geodesicBufferOperator from "@arcgis/core/geometry/operators/geodesicBufferOperator.js";
```

```javascript
// CDN
const geodesicBufferOperator = await $arcgis.import("@arcgis/core/geometry/operators/geodesicBufferOperator.js");
```

**Since:** 4.31

## Overview

Geodesically buffer 2D geometries. A geodesic buffer creates an area around a geometry by calculating the shortest distance between points on the curved surface of the Earth, minimizing the distortion caused by map projections. This results in a more accurate buffer when applied over larger geographic areas such as those covering multiple UTM zones, or when using global scales. Notes Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

## See Also

- Sample - Geometry operator - geodesic buffers
- isLoaded

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`

### `isLoaded`

### `load`


## Method Details

### `Method Details()`


## Examples

```javascript
if (!geodesicBufferOperator.isLoaded()) {
  await geodesicBufferOperator.load();
}

// Calculate the buffer of a polyline geometry
const bufferGeometry = geodesicBufferOperator.execute(polyline, 100);
```

