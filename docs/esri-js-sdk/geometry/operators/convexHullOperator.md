# convexHullOperator

**Module:** `@arcgis/core/geometry/operators/convexHullOperator`

## Import

```javascript
import * as convexHullOperator from "@arcgis/core/geometry/operators/convexHullOperator.js";
```

```javascript
// CDN
const convexHullOperator = await $arcgis.import("@arcgis/core/geometry/operators/convexHullOperator.js");
```

**Since:** 4.31

## Overview

Calculates the convex hull of 2D geometries. A convex hull is the smallest convex polygon that encloses a group of geometries or vertices. The hull is typically a polygon but can also be a polyline or a point in degenerate cases.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`

### `isConvex`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a convex hull around a polygon.
const convexHull = convexHullOperator.execute(polygon);
```

