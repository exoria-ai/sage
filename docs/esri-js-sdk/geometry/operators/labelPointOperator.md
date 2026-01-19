# labelPointOperator

**Module:** `@arcgis/core/geometry/operators/labelPointOperator`

## Import

```javascript
import * as labelPointOperator from "@arcgis/core/geometry/operators/labelPointOperator.js";
```

```javascript
// CDN
const labelPointOperator = await $arcgis.import("@arcgis/core/geometry/operators/labelPointOperator.js");
```

**Since:** 4.31

## Overview

Calculates a label point for the given 2D geometries. The point is guaranteed to be on the interior of the geometry. It can be used to place a label on a feature and help to ensure readability on the map. Based on the input geometry type, the label point is defined as follows: Extent - the center of the extent. Multipoint - the point which is closest to the center of the geometry's envelope. Point - the point itself. Polygon - a point near the centroid of the ring with greatest area. Polyline - a vertex near the middle of the longest segment.

## See Also

- Sample - Geometry operator - centroid analysis

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Perform the label point operation
const labelPoint = labelPointOperator.execute(polygon);
```

