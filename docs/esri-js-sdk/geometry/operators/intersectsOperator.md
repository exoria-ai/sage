# intersectsOperator

**Module:** `@arcgis/core/geometry/operators/intersectsOperator`

## Import

```javascript
import * as intersectsOperator from "@arcgis/core/geometry/operators/intersectsOperator.js";
```

```javascript
// CDN
const intersectsOperator = await $arcgis.import("@arcgis/core/geometry/operators/intersectsOperator.js");
```

**Since:** 4.31

## Overview

Performs a relational operation to determine if one 2D geometry intersects another 2D geometry. Intersect is same as not disjoint. This operator can be used with non-simple geometries.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Returns true if two geometries intersect
const isIntersecting = intersectsOperator.execute(polyline1, polyline2);
```

