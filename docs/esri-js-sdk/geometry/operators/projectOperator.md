# projectOperator

**Module:** `@arcgis/core/geometry/operators/projectOperator`

## Import

```javascript
import * as projectOperator from "@arcgis/core/geometry/operators/projectOperator.js";
```

```javascript
// CDN
const projectOperator = await $arcgis.import("@arcgis/core/geometry/operators/projectOperator.js");
```

**Since:** 4.32

## Overview

Projects 2D geometries from one SpatialReference to another. You can specify a geographic (datum) transformation for this operation, accept the default transformation if one is needed, or set the area of interest. Projecting your data between coordinate systems sometimes requires transforming between geographic coordinate systems. Geographic transformations are used to transform coordinates between spatial references that have different geographic coordinate systems, and thus different datums. Using the most suitable transformation ensures the best possible accuracy when converting geometries from one spatial reference to another. The geographicTransformationUtils module provides methods which return the default geographic transformation for the given projection or a list of suitable geographic transformations. Known Limitations This operator currently only supports equation-based geographic transformations. The result geometry is not guaranteed to be simple. Apply the simplifyOperator to ensure the result is topologically simple. Projecting an Extent may return an Extent with a larger area than the input. Notes Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

## See Also

- Spatial References
- Coordinate systems, map projections, and transformations
- Geographic datum transformations
- Sample - Client-side projection
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
if (!projectOperator.isLoaded()) {
  await projectOperator.load();
}

const outSpatialReference = new SpatialReference({
  wkid: 53008 //Sphere_Sinusoidal projection
});

// Project a geometry to a different spatial reference
const geometry = projectOperator.execute(polygon, outSpatialReference);
```

