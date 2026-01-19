# geodesicProximityOperator

**Module:** `@arcgis/core/geometry/operators/geodesicProximityOperator`

## Import

```javascript
import * as geodesicProximityOperator from "@arcgis/core/geometry/operators/geodesicProximityOperator.js";
```

```javascript
// CDN
const geodesicProximityOperator = await $arcgis.import("@arcgis/core/geometry/operators/geodesicProximityOperator.js");
```

**Since:** 4.31

## Overview

Finds closest vertices of a 2D geometry using geodesic distance. Notes Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

## See Also

- isLoaded

## Property Details

### `supportsCurves`

### `getNearestCoordinate`

### `getNearestVertex`

### `getNearestVertices`

### `isLoaded`

### `load`

### `ProximityResult`


## Method Details

### `Method Details()`


## Examples

```javascript
if (!geodesicProximityOperator.isLoaded()) {
  await geodesicProximityOperator.load();
}

// Calculate the nearest coordinate on a polyline to the given point
const result = geodesicProximityOperator.getNearestCoordinate(polyline, point);
```

```javascript
if (!geodesicProximityOperator.isLoaded()) {
  await geodesicProximityOperator.load();
}

// Calculate the nearest vertex on a polyline to the given point
const result = geodesicProximityOperator.getNearestVertex(polyline, point);
```

```javascript
if (!geodesicProximityOperator.isLoaded()) {
  await geodesicProximityOperator.load();
}

// Calculate the nearest vertices on a polyline to the given point
const result = geodesicProximityOperator.getNearestVertices(polyline, point, 100, 5);
```

