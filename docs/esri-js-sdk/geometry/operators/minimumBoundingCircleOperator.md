# minimumBoundingCircleOperator

**Module:** `@arcgis/core/geometry/operators/minimumBoundingCircleOperator`

## Import

```javascript
import * as minimumBoundingCircleOperator from "@arcgis/core/geometry/operators/minimumBoundingCircleOperator.js";
```

```javascript
// CDN
const minimumBoundingCircleOperator = await $arcgis.import("@arcgis/core/geometry/operators/minimumBoundingCircleOperator.js");
```

**Since:** 4.31

## Overview

Create a minimum bounding circle for the input geometry. The output is a polygon with a single closed circular segment containing curves. Implements the Welzl's algorithm using greedy heuristic with expected O(n) time complexity. Note If curves are not needed, then densify the output geometry.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Perform the minimum bounding circle operation
const minimumBoundingCircle = minimumBoundingCircleOperator.execute(polygon);
```

