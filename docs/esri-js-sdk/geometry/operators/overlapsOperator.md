# overlapsOperator

**Module:** `@arcgis/core/geometry/operators/overlapsOperator`

## Import

```javascript
import * as overlapsOperator from "@arcgis/core/geometry/operators/overlapsOperator.js";
```

```javascript
// CDN
const overlapsOperator = await $arcgis.import("@arcgis/core/geometry/operators/overlapsOperator.js");
```

**Since:** 4.31

## Overview

Performs a relational operation to determine if two 2D geometries of the same dimension overlap.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Returns true if one geometry overlaps another,
// but is not contained or disjointed
const isOverlapping = overlapsOperator.execute(polygon1, polygon2);
```

