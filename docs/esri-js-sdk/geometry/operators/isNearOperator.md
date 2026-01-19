# isNearOperator

**Module:** `@arcgis/core/geometry/operators/isNearOperator`

## Import

```javascript
import * as isNearOperator from "@arcgis/core/geometry/operators/isNearOperator.js";
```

```javascript
// CDN
const isNearOperator = await $arcgis.import("@arcgis/core/geometry/operators/isNearOperator.js");
```

**Since:** 4.31

## Overview

Performs a 2D relational operation that checks if two geometries are near each other.

## Property Details

### `supportsCurves`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Check if two geometries are near each other
const isNear = isNearOperator.execute(point, polyline, 100);
```

