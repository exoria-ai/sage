# shapePreservingProjectOperator

**Module:** `@arcgis/core/geometry/operators/shapePreservingProjectOperator`

## Import

```javascript
import * as shapePreservingProjectOperator from "@arcgis/core/geometry/operators/shapePreservingProjectOperator.js";
```

```javascript
// CDN
const shapePreservingProjectOperator = await $arcgis.import("@arcgis/core/geometry/operators/shapePreservingProjectOperator.js");
```

**Since:** 4.32

## Overview

Transforms 2D geometry segment end points and interior points, thus preserving the geographic location of the segment interior and more accurately maintaining its original shape. A maximum offset deviation parameter controls how much the result of the projection is allowed to deviate from the true preserved shape. Projecting your data between coordinate systems sometimes requires transforming between geographic coordinate systems. Geographic transformations are used to transform coordinates between spatial references that have different geographic coordinate systems, and thus different datums. Using the most suitable transformation ensures the best possible accuracy when converting geometries from one spatial reference to another. The geographicTransformationUtils module provides the getTransformation() and getTransformations() methods which return the default geographic transformation for the given projection or a list of suitable geographic transformations. Notes Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

## See Also

- projectOperator
- Spatial References
- Coordinate systems, map projections, and transformations
- Geographic datum transformations
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
if (!shapePreservingProjectOperator.isLoaded()) {
  await shapePreservingProjectOperator.load();
}

// Project a geometry to a different spatial reference while preserving its shape.
const geometry = shapePreservingProjectOperator.execute(polyline, spatialReference);
```

