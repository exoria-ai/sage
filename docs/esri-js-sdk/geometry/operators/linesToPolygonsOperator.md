# linesToPolygonsOperator

**Module:** `@arcgis/core/geometry/operators/linesToPolygonsOperator`

## Import

```javascript
import * as linesToPolygonsOperator from "@arcgis/core/geometry/operators/linesToPolygonsOperator.js";
```

```javascript
// CDN
const linesToPolygonsOperator = await $arcgis.import("@arcgis/core/geometry/operators/linesToPolygonsOperator.js");
```

**Since:** 4.31

## Overview

Performs the topological operation of breaking the input set of 2D polygons and polylines into segments and rebuilding a new set of polygons from the non-intersecting areas.

## Property Details

### `supportsCurves`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Perform the lines to polygons operation
const polygons = linesToPolygonsOperator.executeMany([polyline1, polyline2]);
```

