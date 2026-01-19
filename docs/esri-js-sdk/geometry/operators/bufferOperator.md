# bufferOperator

**Module:** `@arcgis/core/geometry/operators/bufferOperator`

## Import

```javascript
import * as bufferOperator from "@arcgis/core/geometry/operators/bufferOperator.js";
```

```javascript
// CDN
const bufferOperator = await $arcgis.import("@arcgis/core/geometry/operators/bufferOperator.js");
```

**Since:** 4.31

## Overview

Creates planar buffers around 2D geometries. A planar buffer calculates the area around a geometry using the straight line distance between points based on a flat, two-dimensional surface. This is suitable for rendering smaller areas within a projected coordinate system where the curvature of the Earth can be ignored, such as when all features are contained in one UTM zone. Planar buffers can introduce distortions and inaccuracies when applied over larger areas.

## See Also

- How Buffer (Analysis) works
- Sample - Geometry operator - using a worker for analysis

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Buffer a polyline geometry
const bufferGeometry = bufferOperator.execute(polyline, 1000);
```

