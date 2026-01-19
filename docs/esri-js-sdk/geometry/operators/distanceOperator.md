# distanceOperator

**Module:** `@arcgis/core/geometry/operators/distanceOperator`

## Import

```javascript
import * as distanceOperator from "@arcgis/core/geometry/operators/distanceOperator.js";
```

```javascript
// CDN
const distanceOperator = await $arcgis.import("@arcgis/core/geometry/operators/distanceOperator.js");
```

**Since:** 4.31

## Overview

Calculates planar distance between 2D geometries.

## See Also

- Blog - Geodesic or planar: which to use for distance analysis

## Property Details

### `supportsCurves`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Calculate the planar distance between two points
const distance = distanceOperator.execute(point1, point2);
```

