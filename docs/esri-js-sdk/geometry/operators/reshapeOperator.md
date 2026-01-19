# reshapeOperator

**Module:** `@arcgis/core/geometry/operators/reshapeOperator`

## Import

```javascript
import * as reshapeOperator from "@arcgis/core/geometry/operators/reshapeOperator.js";
```

```javascript
// CDN
const reshapeOperator = await $arcgis.import("@arcgis/core/geometry/operators/reshapeOperator.js");
```

**Since:** 4.31

## Overview

Reshape 2D polygons or polylines with a single path polyline.

## Property Details

### `supportsCurves`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Reshape a polygon geometry
const reshapedPolygon = reshapeOperator.execute(polygon, reshaperPolyline);
```

