# polygonSlicerOperator

**Module:** `@arcgis/core/geometry/operators/polygonSlicerOperator`

## Import

```javascript
import * as polygonSlicerOperator from "@arcgis/core/geometry/operators/polygonSlicerOperator.js";
```

```javascript
// CDN
const polygonSlicerOperator = await $arcgis.import("@arcgis/core/geometry/operators/polygonSlicerOperator.js");
```

**Since:** 4.31

## Overview

Performs a topological operation for slicing a 2D polygon into smaller polygons.

## Property Details

### `supportsCurves`

### `findSlicesByArea`

### `recursiveSliceEqualArea`

### `sliceIntoStrips`


## Method Details

### `Method Details()`


## Examples

```javascript
// Find the slice positions for a polygon
const slicePositions = polygonSlicerOperator.findSlicesByArea(polygon, 3, 0);
```

```javascript
// Slice a polygon into equal area parts
const slicedPolygons = polygonSlicerOperator.recursiveSliceEqualArea(polygon, 3);
```

```javascript
// Slice a polygon into strips
const slicedPolygons = polygonSlicerOperator.sliceIntoStrips(polygon, [100, 200, 300]);
```

