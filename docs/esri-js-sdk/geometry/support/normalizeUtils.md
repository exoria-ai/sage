# normalizeUtils

**Module:** `@arcgis/core/geometry/support/normalizeUtils`

## Import

```javascript
import * as normalizeUtils from "@arcgis/core/geometry/support/normalizeUtils.js";
```

```javascript
// CDN
const normalizeUtils = await $arcgis.import("@arcgis/core/geometry/support/normalizeUtils.js");
```

**Since:** 4.3

## Overview

Provides a utility method that normalizes geometries that intersect the central meridian or fall outside the world extent so they stay within the coordinate system of the view. Support is limited to geometries in Web Mercator and WGS-84 spatial references.

## Property Details

### `getDenormalizedExtent`

### `normalizeCentralMeridian`


## Method Details

### `Method Details()`


## Examples

```javascript
// create an extent that goes over the dateline
// as the points are cross the dateline
const multipoint = new Multipoint({
  points: [
    [158.6082458495678, 59.91028747107214],
    [-145.98220825200923, 60.23981116998903]
  ]
});
const extent = normalizeUtils.getDenormalizedExtent(multipoint);
```

```javascript
// create a non-normalized line that crosses the dateline
const polyline = new Polyline({
  paths: [
    [170, 52.68],
    [190, 49.5]
  ]
});

normalizeUtils.normalizeCentralMeridian([polyline])
  .then(function(polylines){
    // returns a line representing the same geometry, but
    // now is normalized between -180 and 180 on the x-coordinate.
    // but represents the same feature
    const graphic = new Graphic({
      geometry: polylines[0],
      symbol: { type: "simple-line" }
    });
```

