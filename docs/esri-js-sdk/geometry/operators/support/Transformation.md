# Transformation

**Module:** `@arcgis/core/geometry/operators/support/Transformation`

## Import

```javascript
import Transformation from "@arcgis/core/geometry/operators/support/Transformation.js";
```

```javascript
// CDN
const Transformation = await $arcgis.import("@arcgis/core/geometry/operators/support/Transformation.js");
```

**Since:** 4.31

## Overview

The Transformation class represents 2D transformations that can be applied to geometries using the affineTransformOperator. All transformations are applied in the spatial reference units of the input geometries.

## See Also

- setIdentity()
- Wikipedia - Identity Matrix

## Property Details

### `Transformation`

### `calculateErrors`

### `flipX`

### `flipY`

### `initializeFromControlPoints`

### `isIdentity`

### `rotate`

### `scale`

### `setIdentity`

### `setSwapCoordinates`

### `shear`

### `shift`

### `ErrorResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// Calculate the errors for a transformation
const errors = transformation.calculateErrors(inputPoints, outputPoints);
// Example returned object:
// { rms: 0.5, errorsOut: [0.1, 0.2, 0.3, 0.4, 0.5] }
```

```javascript
// Flip the x-coordinates of a geometry on the vertical axis
const transform = new Transformation();
transform.flipX(0, 10);
const result = affineTransformOperator.execute(polygon, transform);

// Flip the x-coordinates of a geometry on the vertical axis centered at the geometry's center
const centerX = polygon.extent.center.x;
transform.flipX(centerX, centerX);
const result = affineTransformOperator.execute(polygon, transform);
```

```javascript
// Flip the y-coordinates of a geometry on the vertical axis
transformation.flipY(0, 10);
const result = affineTransformOperator.execute(polygon, transform);

// Flip the y-coordinates of a geometry on the horizontal axis centered at the geometry's center
const centerY = polygon.extent.center.y;
transform.flipY(centerY, centerY);
const result = affineTransformOperator.execute(polygon, transform);
```

```javascript
// Initialize a transformation from control points
transformation.initializeFromControlPoints("conformal", inputPoints, outputPoints);
```

```javascript
// Rotate a geometry
transformation.rotate(90, 0, 0);
const result = affineTransformOperator.execute(polygon, transform);
```

```javascript
// Scale a geometry
transformation.scale(2, 2);
const result = affineTransformOperator.execute(polygon, transform);
```

