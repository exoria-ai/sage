# geodesicUtils

**Module:** `@arcgis/core/geometry/support/geodesicUtils`

## Import

```javascript
import * as geodesicUtils from "@arcgis/core/geometry/support/geodesicUtils.js";
```

```javascript
// CDN
const geodesicUtils = await $arcgis.import("@arcgis/core/geometry/support/geodesicUtils.js");
```

**Since:** 4.12

## Overview

This class performs geodetic computations for Earth and 70+ non-Earth spheroids. Methods include geodesic length, area, point-distance and point-to-point computations.

## See Also

- Geometry

## Property Details

### `geodesicAreas`

### `geodesicDensify`

### `geodesicDistance`

### `geodesicLengths`

### `pointFromDistance`

### `GeodesicDistanceResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// Display the area of the Bermuda Triangle.
const MIAMI    = { lat: 25.775278, lon: -80.208889 };  // Florida
const HAMILTON = { lat: 32.293, lon: -64.782 };        // Bermuda
const SANJUAN  = { lat: 18.406389, lon:  -66.063889 }; // Puerto Rico
const polygon = new Polygon({
  rings: [[
    [MIAMI.lon, MIAMI.lat],
    [HAMILTON.lon, HAMILTON.lat],
    [SANJUAN.lon, SANJUAN.lat],
    [MIAMI.lon, MIAMI.lat]
  ]]
});
const areas = geodesicUtils.geodesicAreas([polygon], "square-kilometers");
const area = Math.round(areas[0]);
console.log("Area: ", area, " km²"); // Area: 1150498 km²
```

```javascript
// Densify the polygon representing Bermuda Triangle with maximum segment size of 100km.
const MIAMI    = { lat: 25.775278, lon: -80.208889 };  // Florida
const HAMILTON = { lat: 32.293, lon: -64.782 };        // Bermuda
const SANJUAN  = { lat: 18.406389, lon:  -66.063889 }; // Puerto Rico
const polygon = new Polygon({
  rings: [[
    [MIAMI.lon, MIAMI.lat],
    [HAMILTON.lon, HAMILTON.lat],
    [SANJUAN.lon, SANJUAN.lat],
    [MIAMI.lon, MIAMI.lat]
  ]]
});
const densifiedPolygon = geodesicUtils.geodesicDensify(polygon, 100000);
const vertexCountBefore = polygon.rings[0].length;
const vertexCountAfter = densifiedPolygon.rings[0].length;
console.log("Before: ", vertexCountBefore, ", After: ", vertexCountAfter); // Before: 4, After: 51
```

```javascript
// Display the distance and direction between Los Angeles and New York City.
const LA = {
  latitude: 34.05,
  longitude: -118.25
};
const NY = {
  latitude: 40.7127,
  longitude: -74.0059
};
const join = geodesicUtils.geodesicDistance(
  new Point({ x: LA.longitude, y: LA.latitude }),
  new Point({ x: NY.longitude, y: NY.latitude }),
  "kilometers"
);
const { distance, azimuth } = join;
console.log("Distance: ", distance, ", Direction: ", azimuth);
```

```javascript
// Display the perimeter of the Bermuda Triangle.
const MIAMI    = { lat: 25.775278, lon: -80.208889 };  // Florida
const HAMILTON = { lat: 32.293, lon: -64.782 };        // Bermuda
const SANJUAN  = { lat: 18.406389, lon:  -66.063889 }; // Puerto Rico
const polygon = new Polygon({
  rings: [[
    [MIAMI.lon, MIAMI.lat],
    [HAMILTON.lon, HAMILTON.lat],
    [SANJUAN.lon, SANJUAN.lat],
    [MIAMI.lon, MIAMI.lat]
  ]]
});
const perimeters = geodesicUtils.geodesicLengths([polygon], "kilometers");
const perimeter = Math.round(perimeters[0]);
console.log("Perimeter: ", perimeter, " km"); // Perimeter: 4879 km
```

```javascript
// Display the location of a point 10km East of Los Angeles.
const LA = {
  latitude: 34.05,
  longitude: -118.25
};
const destination = geodesicUtils.pointFromDistance(
  new Point({ x: LA.longitude, y: LA.latitude }),
  10000,
  90
);
const { latitude, longitude } = destination;
console.log("Latitude: ", latitude, ", Longitude: ", longitude);
```

