# geodeticAreaOperator

**Module:** `@arcgis/core/geometry/operators/geodeticAreaOperator`

## Import

```javascript
import * as geodeticAreaOperator from "@arcgis/core/geometry/operators/geodeticAreaOperator.js";
```

```javascript
// CDN
const geodeticAreaOperator = await $arcgis.import("@arcgis/core/geometry/operators/geodeticAreaOperator.js");
```

**Since:** 4.31

## Overview

Returns the geodetic area of a 2D geometry. Notes Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

## See Also

- isLoaded

## Property Details

### `supportsCurves`

### `execute`

### `isLoaded`

### `load`


## Method Details

### `Method Details()`


## Examples

```javascript
if (!geodeticAreaOperator.isLoaded()) {
  await geodeticAreaOperator.load();
}

// Calculate the geodetic area of a polygon.
const area = geodeticAreaOperator.execute(polygon);
```

