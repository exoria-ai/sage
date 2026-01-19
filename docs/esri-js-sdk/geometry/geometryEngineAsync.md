# geometryEngineAsync

**Module:** `@arcgis/core/geometry/geometryEngineAsync`

## Import

```javascript
import * as geometryEngineAsync from "@arcgis/core/geometry/geometryEngineAsync.js";
```

```javascript
// CDN
const geometryEngineAsync = await $arcgis.import("@arcgis/core/geometry/geometryEngineAsync.js");
```

**Since:** 4.0

## Overview

An asynchronous client-side geometry engine for testing, measuring, and analyzing the spatial relationship between two or more 2D geometries. If more than one geometry is required for any of the methods below, all geometries must have the same spatial reference for the methods to work as expected. Read the following blog series to learn more about GeometryEngine: ArcGIS Blog - GeometryEngine: Testing spatial relationships and editing ArcGIS Blog - GeometryEngine: Measurement ArcGIS Blog - GeometryEngine: Overlay analysis

## See Also

- geometryEngine
- projection
- geometryEngine.buffer()
- geometryEngine.geodesicBuffer()
- geometryEngineAsync.geodesicBuffer()
- geometryEngine.clip()
- geometryEngine.contains()
- geometryEngine.convexHull()
- geometryEngine.crosses()
- geometryEngine.cut()
- geometryEngine.densify()
- geodesicDensify()
- geometryEngine.difference()
- geometryEngine.disjoint()
- geometryEngine.distance()
- geometryEngine.equals()
- geometryEngine.extendedSpatialReferenceInfo()
- geometryEngine.flipHorizontal()
- geometryEngine.flipVertical()
- geometryEngine.generalize()
- geometryEngine.geodesicArea()
- geometryEngine.geodesicBuffer()
- geometryEngine.buffer()
- geometryEngine.geodesicDensify()
- geometryEngine.geodesicLength()
- intersectLinesToPoints()
- geometryEngine.intersect()
- intersect
- geometryEngine.intersectLinesToPoints()
- geometryEngine.intersects()
- geometryEngine.isSimple()
- geometryEngine.nearestCoordinate()
- geometryEngine.nearestVertex()
- geometryEngine.nearestVertices()
- geometryEngine.offset()
- geometryEngine.overlaps()
- geometryEngine.planarArea()
- geometryEngine.planarLength()
- geometryEngine.relate()
- geometryEngine.rotate()
- geometryEngine.simplify()
- geometryEngine.symmetricDifference()
- geometryEngine.touches()
- geometryEngine.union()
- geometryEngine.within()
- geometryEngineAsync.extendedSpatialReferenceInfo()

## Property Details

### `buffer`

### `clip`

### `contains`

### `convexHull`

### `crosses`

### `cut`

### `densify`

### `difference`

### `disjoint`

### `distance`

### `equals`

### `extendedSpatialReferenceInfo`

### `flipHorizontal`

### `flipVertical`

### `generalize`

### `geodesicArea`

### `geodesicBuffer`

### `geodesicDensify`

### `geodesicLength`

### `intersect`

### `intersectLinesToPoints`

### `intersects`

### `isSimple`

### `nearestCoordinate`

### `nearestVertex`

### `nearestVertices`

### `offset`

### `overlaps`

### `planarArea`

### `planarLength`

### `relate`

### `rotate`

### `simplify`

### `symmetricDifference`

### `touches`

### `union`

### `within`

### `SpatialReferenceInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
const pointBuffer = await geometryEngineAsync.buffer(point, 1000, "feet");
```

```javascript
// returns a new geometry of a polygon clipped by the views extent
const clippedGeometry = await geometryEngineAsync.clip(boundaryPolygon, view.extent);
```

```javascript
// returns true or false for one geometry containing another
const isContained = await geometryEngineAsync.contains(extent, boundaryPolygon);
```

```javascript
// returns the convex hull of a multipoint as a single polygon
const hull = await geometryEngineAsync.convexHull(multipoint);
```

```javascript
// returns the convex hull of an array of points as a single polygon
const [ hull ] = await geometryEngineAsync.convexHull([ pointA, pointB, pointC ], true);
```

```javascript
// returns the convex hull for each input line geometry as three polygons
const hulls = await geometryEngineAsync.convexHull([ lineA, lineB, lineC ]);
```

