# projection

**Module:** `@arcgis/core/geometry/projection`

## Import

```javascript
import * as projection from "@arcgis/core/geometry/projection.js";
```

```javascript
// CDN
const projection = await $arcgis.import("@arcgis/core/geometry/projection.js");
```

**Since:** 4.7

## Overview

A client-side projection engine for converting geometries from one SpatialReference to another. When projecting geometries the starting spatial reference must be specified on the input geometry. You can specify a specific geographic (datum) transformation for the project operation, or accept the default transformation if one is needed. Known Limitations The browser must support WebAssembly for the client-side engine to work. Currently, only equation-based geographic transformations are supported.

## See Also

- Spatial References
- Coordinate systems, map projections, and transformations
- Geographic datum transformations
- Sample - Client-side projection
- isLoaded

## Property Details

### `getTransformation`

### `getTransformations`

### `isLoaded`

### `load`

### `project`


## Method Details

### `Method Details()`


## Examples

```javascript
const cs1 = new SpatialReference({
  wkid: 4272 //PE_GCS_ED_1950
});

const cs2 = new SpatialReference({
  wkid: 4167
});

const extent = new Extent({
  xmin: -186.0,
  ymin: -42.0,
  xmax: -179.0,
  ymax: -38.0
});

const geogtrans = projection.getTransformations(cs1, cs2, extent);
geogtrans.forEach(function(geogtran, index) {
  geogtran.steps.forEach(function(step, index) {
    console.log("step wkid: ", step.wkid);
  });
});
```

```javascript
projection.load().then(function() {
  // the projection module is loaded. Geometries can be re-projected.

 // projects each polygon in the array
 // project() will use the spatial reference of the first geometry in the array
 // as an input spatial reference. It will use the default transformation
 // if one is required when converting from input spatial reference
 // to the output spatial reference
 let outSpatialReference = new SpatialReference({
   wkid: 53008 //Sphere_Sinusoidal projection
 });
 polygonGraphics.forEach(function(graphic) {
   graphic.geometry = projection.project(graphic.geometry, outSpatialReference);
 });
});
```

```javascript
// projects each polygon in the array
// project() will use the spatial reference of the first geometry in the array
// as an input spatial reference. It will use the default transformation
// if one is required when converting from input spatial reference
// to the output spatial reference
let outSpatialReference = new SpatialReference({
  wkid: 53008 //Sphere_Sinusoidal projection
});
polygonGraphics.forEach(function(graphic) {
  graphic.geometry = projection.project(graphic.geometry, outSpatialReference);
});
```

```javascript
let outSpatialReference = {
  wkid: 54044
};
// projects an array of points
let projectedPoints = projection.project(wgsPoints, outSpatialReference);
projectedPoints.forEach(function(point) {
  console.log(point.x, point.y);
});
```

