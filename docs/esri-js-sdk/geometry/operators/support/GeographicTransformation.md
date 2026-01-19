# GeographicTransformation

**Module:** `@arcgis/core/geometry/operators/support/GeographicTransformation`

## Import

```javascript
import GeographicTransformation from "@arcgis/core/geometry/operators/support/GeographicTransformation.js";
```

```javascript
// CDN
const GeographicTransformation = await $arcgis.import("@arcgis/core/geometry/operators/support/GeographicTransformation.js");
```

**Since:** 4.32

## Overview

Create a geographic transformation that can be used to project 2D geometries between different geographic coordinate systems to ensure that data is properly aligned within a map. These transformations are used to transform coordinates between spatial references that have different geographic coordinate systems, and thus different datums. A geographic transformation converts everything that needs to be changed including the units, prime meridian, and the ellipsoid. The transformation is defined by a series of steps, each of which is defined by a well-known text (WKT) string or a well-known ID (WKID). Using the most suitable transformation ensures the best possible accuracy when converting geometries from one spatial reference to another. The geographicTransformationUtils module provides the getTransformation() and getTransformations() methods which return the default geographic transformation for the given projection or a list of suitable geographic transformations. Known Limitations Currently, the client-side projectOperator only supports equation-based geographic transformations.

## See Also

- projectOperator
- shapePreservingProjectOperator
- Spatial References
- Coordinate systems, map projections, and transformations
- Geographic datum transformations
- Sample - Client-side projection

## Property Details

### `GeographicTransformation`

### `declaredClass`
- **Type:** `Inherited`

### `steps`

### `addHandles`
- **Type:** `Inherited`

### `getInverse`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

