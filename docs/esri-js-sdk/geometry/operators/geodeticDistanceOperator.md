# geodeticDistanceOperator

**Module:** `@arcgis/core/geometry/operators/geodeticDistanceOperator`

## Import

```javascript
import * as geodeticDistanceOperator from "@arcgis/core/geometry/operators/geodeticDistanceOperator.js";
```

```javascript
// CDN
const geodeticDistanceOperator = await $arcgis.import("@arcgis/core/geometry/operators/geodeticDistanceOperator.js");
```

**Since:** 4.31

## Overview

Calculates the shortest geodetic distance between two 2D geometries. Notes Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

## See Also

- Blog - Geodesic or planar: which to use for distance analysis
- isLoaded

## Property Details

### `supportsCurves`

### `execute`

### `isLoaded`

### `load`


## Method Details

### `Method Details()`


## Examples

```javascript
if (!geodeticDistanceOperator.isLoaded()) {
  await geodeticDistanceOperator.load();
}

// Calculate the geodetic distance between two geometries
const distance = geodeticDistanceOperator.execute(polyline1, polyline2);
```

