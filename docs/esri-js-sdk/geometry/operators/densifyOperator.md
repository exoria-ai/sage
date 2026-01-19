# densifyOperator

**Module:** `@arcgis/core/geometry/operators/densifyOperator`

## Import

```javascript
import * as densifyOperator from "@arcgis/core/geometry/operators/densifyOperator.js";
```

```javascript
// CDN
const densifyOperator = await $arcgis.import("@arcgis/core/geometry/operators/densifyOperator.js");
```

**Since:** 4.31

## Overview

Densifies 2D geometries by length, deviation and/or angle in a 2D plane. The result geometry contains segments less than or equal to maxSegementLength, and it will not contain curves. The piecewise approximation of curves will be within the specified deviation from the original curve, and the angle between tangent segments does not exceed the specified value. If maxAngleInDegrees is not zero, vertices are added at points along the curve where the angle between tangent segments reaches this value. These vertices are then connected by straight-line segments. If maxSegmentLength is zero, only curves are affected and other geometries remain unchanged. The process always starts from the highest point on a segment, so equal segments will be densified in the same way. When the maxSegmentLength, maxDeviation, and maxAngleInDegrees parameters are all set to 0, curves are replaced with the line segments connecting the curve endpoints. Suggestion: to limit the number of segments that are produced, if you have an area of interest such as a visible extent, clip the input geometries before densifying.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Returns a densified polyline.
const densified = densifyOperator.execute(polyline, 100);
```

```javascript
// Returns a polyline where all curve segments have been densified.
if (polyline.curvePaths) {
  const densified = densifyOperator.execute(polyline, 0, { maxAngleInDegrees: 1 });
}
```

