# alphaShapeOperator

**Module:** `@arcgis/core/geometry/operators/alphaShapeOperator`

## Import

```javascript
import * as alphaShapeOperator from "@arcgis/core/geometry/operators/alphaShapeOperator.js";
```

```javascript
// CDN
const alphaShapeOperator = await $arcgis.import("@arcgis/core/geometry/operators/alphaShapeOperator.js");
```

**Since:** 4.31

## Overview

Calculates the alpha shape of 2D points (concave hull). Alpha shapes are used to generalize bounding polygons containing sets of points or multipoints. Using this operator on other geometry types will produce results, however it is probably not what you are expecting.

## See Also

- Alpha shape - wikipedia

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`

### `ExecuteResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// Calculate the alpha shape of a multipoint geometry
const result = alphaShapeOperator.execute(geometry, 100);
```

