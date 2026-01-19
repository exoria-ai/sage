# geographicTransformationUtils

**Module:** `@arcgis/core/geometry/operators/support/geographicTransformationUtils`

## Import

```javascript
import * as geographicTransformationUtils from "@arcgis/core/geometry/operators/support/geographicTransformationUtils.js";
```

```javascript
// CDN
const geographicTransformationUtils = await $arcgis.import("@arcgis/core/geometry/operators/support/geographicTransformationUtils.js");
```

**Since:** 4.32

## Overview

A set of utilities for working with geographic transformations. Notes Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

## See Also

- isLoaded

## Property Details

### `getTransformation`

### `getTransformations`

### `isLoaded`

### `load`


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
  ymax: -38.0,
  spatialReference: cs1
});

if (!geographicTransformationUtils.isLoaded()) {
  await geographicTransformationUtils.load();
}

const geogtrans = projection.getTransformation(cs1, cs2, extent);
```

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
  ymax: -38.0,
  spatialReference: cs1
});

if (!geographicTransformationUtils.isLoaded()) {
  await geographicTransformationUtils.load();
}

const geogtrans = projection.getTransformations(cs1, cs2, extent);
geogtrans.forEach((geogtran, index) => {
  geogtran.steps.forEach((step, index) => {
    console.log("step wkid: ", step.wkid);
  });
});
```

