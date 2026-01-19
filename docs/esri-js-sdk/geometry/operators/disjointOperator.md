# disjointOperator

**Module:** `@arcgis/core/geometry/operators/disjointOperator`

## Import

```javascript
import * as disjointOperator from "@arcgis/core/geometry/operators/disjointOperator.js";
```

```javascript
// CDN
const disjointOperator = await $arcgis.import("@arcgis/core/geometry/operators/disjointOperator.js");
```

**Since:** 4.31

## Overview

Performs a relational operation to determine if one 2D geometry is disjoint (doesn't intersect in any way) with another 2D geometry. This operator can be used with non-simple geometries.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Returns true if a geometry is not contained in another.
// Operates the opposite of contains.
const isDisjointed = disjointOperator.execute(polygon1, polygon2);
```

