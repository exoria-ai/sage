# unionOperator

**Module:** `@arcgis/core/geometry/operators/unionOperator`

## Import

```javascript
import * as unionOperator from "@arcgis/core/geometry/operators/unionOperator.js";
```

```javascript
// CDN
const unionOperator = await $arcgis.import("@arcgis/core/geometry/operators/unionOperator.js");
```

**Since:** 4.31

## Overview

Perform a topological union (dissolve) operation on 2D geometries.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Return the union of two polygons
const union = unionOperator.execute(polygon1, polygon2);
```

