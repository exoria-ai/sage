# differenceOperator

**Module:** `@arcgis/core/geometry/operators/differenceOperator`

## Import

```javascript
import * as differenceOperator from "@arcgis/core/geometry/operators/differenceOperator.js";
```

```javascript
// CDN
const differenceOperator = await $arcgis.import("@arcgis/core/geometry/operators/differenceOperator.js");
```

**Since:** 4.31

## Overview

Performs a topological difference operation on 2D geometries.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Creates a new geometry based on the difference of two polygons
const difference = differenceOperator.execute(polygon1, polygon2);
```

