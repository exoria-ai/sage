# centroidOperator

**Module:** `@arcgis/core/geometry/operators/centroidOperator`

## Import

```javascript
import * as centroidOperator from "@arcgis/core/geometry/operators/centroidOperator.js";
```

```javascript
// CDN
const centroidOperator = await $arcgis.import("@arcgis/core/geometry/operators/centroidOperator.js");
```

**Since:** 4.31

## Overview

Calculates the centroid for a 2D geometry. The centroid represents the geometric center of mass, where the mass is equally distributed at each point/vertex of the geometry. For example, the centroid of a straight line is the midpoint. The centroid of a point is the point itself. It is not guaranteed to be within or on the geometry. The centroid of a donut polygon is the center of the hole, which is outside the polygon. The centroid of a curved polyline is not located on the line itself, but will be some distance away from it.

## See Also

- labelPointOperator
- Sample - Geometry operator - centroid analysis
- Centroid - wikipedia

## Property Details

### `supportsCurves`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Return the centroid of a polygon
const centroid = centroidOperator.execute(polygon);
console.log(`x: ${centroid.x}, y: ${centroid.y}`);
```

