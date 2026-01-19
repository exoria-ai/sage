# geodeticUtilsOperator

**Module:** `@arcgis/core/geometry/operators/geodeticUtilsOperator`

## Import

```javascript
import * as geodeticUtilsOperator from "@arcgis/core/geometry/operators/geodeticUtilsOperator.js";
```

```javascript
// CDN
const geodeticUtilsOperator = await $arcgis.import("@arcgis/core/geometry/operators/geodeticUtilsOperator.js");
```

**Since:** 4.34

## Overview

A set of utilities for working with geodetic calculations. Notes Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

## See Also

- isLoaded

## Property Details

### `calculateDistanceAndAzimuth`

### `isLoaded`

### `load`

### `pointFromDistance`

### `CalculateDistanceAndAzimuthResult`


## Method Details

### `Method Details()`


## Examples

```javascript
if (!geodeticUtilsOperator.isLoaded()) {
  await geodeticUtilsOperator.load();
}

const distanceAndAzimuthResult = geodeticUtilsOperator.calculateDistanceAndAzimuth(
  new Point({ x: -118.805, y: 34.027, spatialReference: { wkid: 4326 } }),
  new Point({ x: -118.802, y: 34.029, spatialReference: { wkid: 4326 } })
);
```

```javascript
if (!geodeticUtilsOperator.isLoaded()) {
  await geodeticUtilsOperator.load();
}

const point = geodeticUtilsOperator.pointFromDistance(
  new Point({ x: -118.805, y: 34.027, spatialReference: { wkid: 4326 } }),
  350,
  45
);
```

