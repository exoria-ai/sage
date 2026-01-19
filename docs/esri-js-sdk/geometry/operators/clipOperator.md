# clipOperator

**Module:** `@arcgis/core/geometry/operators/clipOperator`

## Import

```javascript
import * as clipOperator from "@arcgis/core/geometry/operators/clipOperator.js";
```

```javascript
// CDN
const clipOperator = await $arcgis.import("@arcgis/core/geometry/operators/clipOperator.js");
```

**Since:** 4.31

## Overview

Clips geometries with a 2D extent.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// return a new geometry of a polygon clipped by the view's extent
const clippedGeometry = clipOperator.execute(polygon, view.extent);
```

