# geometryEngine

**Module:** `@arcgis/core/geometry/geometryEngine`

## Import

```javascript
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
```

```javascript
// CDN
const geometryEngine = await $arcgis.import("@arcgis/core/geometry/geometryEngine.js");
```

**Since:** 4.0

## Overview

A client-side geometry engine for testing, measuring, and analyzing the spatial relationship between two or more 2D geometries. If more than one geometry is required for any of the methods below, all geometries must have the same spatial reference for the methods to work as expected. Read the following blog series to learn more about GeometryEngine: ArcGIS Blog - GeometryEngine: Testing spatial relationships and editing ArcGIS Blog - GeometryEngine: Measurement ArcGIS Blog - GeometryEngine: Overlay analysis

## See Also

- Sample - Geodesic Buffers (2D & 3D)
- geometryEngineAsync
- projection
- geometryEngineAsync.buffer()
- geometryEngine.geodesicBuffer()
- geometryEngineAsync.geodesicBuffer()
- geometryEngineAsync.clip()
- geometryEngineAsync.contains()
- geometryEngineAsync.crosses()
- geometryEngineAsync.cut()
- geometryEngineAsync.densify()
- geodesicDensify()
- geometryEngineAsync.difference()
- geometryEngineAsync.disjoint()
- geometryEngineAsync.distance()
- geometryEngineAsync.equals()
- geometryEngineAsync.extendedSpatialReferenceInfo()
- Unit IDs
- geometryEngineAsync.flipHorizontal()
- geometryEngineAsync.flipVertical()
- geometryEngineAsync.generalize()
- geometryEngineAsync.geodesicArea()
- geometryEngineAsync.geodesicBuffer()
- geometryEngineAsync.geodesicDensify()
- geometryEngineAsync.geodesicLength()
- intersectLinesToPoints()
- geometryEngineAsync.intersect()
- intersect
- geometryEngineAsync.intersectLinesToPoints()
- geometryEngineAsync.intersects()
- geometryEngineAsync.isSimple()
- geometryEngineAsync.nearestCoordinate()
- geometryEngineAsync.nearestVertex()
- geometryEngineAsync.nearestVertices()
- geometryEngineAsync.offset()
- geometryEngineAsync.overlaps()
- geometryEngineAsync.planarArea()
- geometryEngineAsync.planarLength()
- geometryEngineAsync.relate()
- geometryEngineAsync.rotate()
- geometryEngineAsync.simplify()
- geometryEngineAsync.symmetricDifference()
- geometryEngineAsync.touches()
- geometryEngineAsync.union()
- geometryEngineAsync.within()
- geometryEngine.extendedSpatialReferenceInfo()

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

### `AreaUnits`

### `LinearUnits`

### `NearestPointResult`

### `SpatialReferenceInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
// Buffer point by 1000 feet
const ptBuff = geometryEngine.buffer(point, 1000, "feet");
```

```javascript
// returns a new geometry of a polygon clipped by the views extent
const clippedGeometry= geometryEngine.clip(boundaryPolygon, view.extent);
```

```javascript
// returns true or false for one geometry containing another
const isContained = geometryEngine.contains(boundaryPolygon, point);
```

```javascript
// returns true or false for one geometry containing another
const isContained = geometryEngine.contains(extent, boundaryPolygon);
```

```javascript
// returns the convex hull of a multipoint as a single polygon
const hull = geometryEngine.convexHull(multipoint);
```

```javascript
// returns the convex hull of an array of points as a single polygon
const [ hull ] = geometryEngine.convexHull([ pointA, pointB, pointC ], true);
```

