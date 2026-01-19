# polygonOverlayOperator

**Module:** `@arcgis/core/geometry/operators/polygonOverlayOperator`

## Import

```javascript
import * as polygonOverlayOperator from "@arcgis/core/geometry/operators/polygonOverlayOperator.js";
```

```javascript
// CDN
const polygonOverlayOperator = await $arcgis.import("@arcgis/core/geometry/operators/polygonOverlayOperator.js");
```

**Since:** 4.31

## Overview

Performs an overlay operation on a set of 2D polygons in the XY plane. This operation produces similar results to the Union tool in Geoprocessing.

## Property Details

### `supportsCurves`

### `executeMany`

### `ExecuteManyResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// Overlay a set of polygons
const result = polygonOverlayOperator.executeMany(polygons);
```

