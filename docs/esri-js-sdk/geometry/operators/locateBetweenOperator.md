# locateBetweenOperator

**Module:** `@arcgis/core/geometry/operators/locateBetweenOperator`

## Import

```javascript
import * as locateBetweenOperator from "@arcgis/core/geometry/operators/locateBetweenOperator.js";
```

```javascript
// CDN
const locateBetweenOperator = await $arcgis.import("@arcgis/core/geometry/operators/locateBetweenOperator.js");
```

**Since:** 4.31

## Overview

Performs an OGC locate between operation on M values for the given 2D geometries. Calculates the geometry between given M values. This can also be used for locate along operations, which is a variation of locate between when the start and end M values are equal. This is a linear referencing operation. Polygons and extents are not supported.

## Property Details

### `supportsCurves`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Perform the locate between operation
const geometries = locateBetweenOperator.executeMany([polyline1, polyline2], 100, 200);
```

