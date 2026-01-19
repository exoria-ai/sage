# geodeticDensifyOperator

**Module:** `@arcgis/core/geometry/operators/geodeticDensifyOperator`

## Import

```javascript
import * as geodeticDensifyOperator from "@arcgis/core/geometry/operators/geodeticDensifyOperator.js";
```

```javascript
// CDN
const geodeticDensifyOperator = await $arcgis.import("@arcgis/core/geometry/operators/geodeticDensifyOperator.js");
```

**Since:** 4.31

## Overview

Densifies line segments by length in a 2D plane, making them run along specified geodetic curves. There are no segments longer than the specified maximum segment length. Notes If you have an area of interest such as a visible extent, clip the input geometries before densifying to limit the amount of segments produced. Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

## See Also

- isLoaded

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`

### `isLoaded`

### `load`


## Method Details

### `Method Details()`


## Examples

```javascript
if (!geodeticDensifyOperator.isLoaded()) {
  await geodeticDensifyOperator.load();
}

// Densify a polyline geometry
const densifiedPolyline = geodeticDensifyOperator.execute(polyline, 100);
```

