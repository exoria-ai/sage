# symmetricDifferenceOperator

**Module:** `@arcgis/core/geometry/operators/symmetricDifferenceOperator`

## Import

```javascript
import * as symmetricDifferenceOperator from "@arcgis/core/geometry/operators/symmetricDifferenceOperator.js";
```

```javascript
// CDN
const symmetricDifferenceOperator = await $arcgis.import("@arcgis/core/geometry/operators/symmetricDifferenceOperator.js");
```

**Since:** 4.31

## Overview

Returns the symmetric difference between 2D geometries, also known as exclusive OR, or XOR. The symmetric difference is the union of the geometries minus the intersection. This operation can be performed only on geometries that have same dimension (e.g. points with points, lines with lines, polygons with polygons or envelopes, etc). Otherwise, the output will be the input geometry of the higher topological dimension.

## See Also

- Wikipedia - Symmetric difference

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Calculate the symmetric difference of two polygons.
const differencePolygon = symmetricDifferenceOperator.execute(polygon1, polygon2);
```

