# offsetOperator

**Module:** `@arcgis/core/geometry/operators/offsetOperator`

## Import

```javascript
import * as offsetOperator from "@arcgis/core/geometry/operators/offsetOperator.js";
```

```javascript
// CDN
const offsetOperator = await $arcgis.import("@arcgis/core/geometry/operators/offsetOperator.js");
```

**Since:** 4.31

## Overview

Offset 2D geometries. The offset operation creates a geometry that is a constant distance from an input polyline or polygon. It is similar to buffering, but produces a one-sided result. Point and multipoint geometries are not supported. The offset distance can be positive or negative, and it will have the following effects based on the input geometry types. This is also dependent on the input polygon being Esri simple. Geometry type positive offset negative offset Polyline To the right To the left Extent Expands Contracts Polygon exterior ring (Esri simple) Expands exterior Contracts exterior Polygon interior ring (Esri simple) Contracts interior Expands interior If the input polygon is not simple, then the offset geometry will be produced to the right or left as though the ring were a polyline and dependent on the ring's orientation. For a simple polygon, the orientation of outer rings is clockwise and for inner rings it is counter clockwise. So the right side of a simple polygon is always its inside. The miter limit is multiplied by the offset distance and the result determines how far a mitered offset intersection can be from the input curve before it is beveled. Join types The join type controls how corners in the offset geometry are represented. Inner corners are always mitered. The following join types are supported: Round - a circular arc that is tangent to the ends of both offset line segments. Miter - the offset line segments are extended to their intersection point forming a sharp angle, unless that extension exceeds the miterLimit, in which case the result is a bevel. Bevel - the offset line segments are not extended; their endpoints are joined by a straight line. Square - same as miter for minor arcs greater than 90 degrees. For all other minor arcs, the offset line segments are extended by an extra distance before their endpoints are joined.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create an offset polygon.
const offsetPolygon = offsetOperator.execute(polygon, 100);
```

