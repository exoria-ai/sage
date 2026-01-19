# proximityOperator

**Module:** `@arcgis/core/geometry/operators/proximityOperator`

## Import

```javascript
import * as proximityOperator from "@arcgis/core/geometry/operators/proximityOperator.js";
```

```javascript
// CDN
const proximityOperator = await $arcgis.import("@arcgis/core/geometry/operators/proximityOperator.js");
```

**Since:** 4.31

## Overview

Find the closest vertices of the 2D geometry.

## Property Details

### `supportsCurves`

### `getNearestCoordinate`

### `getNearestVertex`

### `getNearestVertices`

### `ProximityResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// Return the nearest result on a polygon to the given point
const proximityResult = proximityOperator.getNearestCoordinate(polygon, point);
```

```javascript
// Return the nearest vertex on a polygon to the given point
const proximityResult = proximityOperator.getNearestVertex(polygon, point);
```

```javascript
// Return the nearest vertices on a polygon to the given point
const proximityResultsArray = proximityOperator.getNearestVertices(polygon, point, 100, 5);
```

