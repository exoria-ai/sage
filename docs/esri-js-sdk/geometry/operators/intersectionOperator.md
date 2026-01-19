# intersectionOperator

**Module:** `@arcgis/core/geometry/operators/intersectionOperator`

## Import

```javascript
import * as intersectionOperator from "@arcgis/core/geometry/operators/intersectionOperator.js";
```

```javascript
// CDN
const intersectionOperator = await $arcgis.import("@arcgis/core/geometry/operators/intersectionOperator.js");
```

**Since:** 4.31

## Overview

Create new geometries using the topological intersection of 2D geometries.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Creates a new geometry based on the intersection of two polygons
const intersection = intersectionOperator.execute(polygon1, polygon2);
```

