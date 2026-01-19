# geodeticLengthOperator

**Module:** `@arcgis/core/geometry/operators/geodeticLengthOperator`

## Import

```javascript
import * as geodeticLengthOperator from "@arcgis/core/geometry/operators/geodeticLengthOperator.js";
```

```javascript
// CDN
const geodeticLengthOperator = await $arcgis.import("@arcgis/core/geometry/operators/geodeticLengthOperator.js");
```

**Since:** 4.31

## Overview

Returns the geodetic length of a 2D geometry. Notes Verify that isLoaded() returns true before using this module. Use load() to load this module's dependencies.

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
if (!geodeticLengthOperator.isLoaded()) {
  await geodeticLengthOperator.load();
}

// Calculate the geodetic length of a polyline
const length = geodeticLengthOperator.execute(polyline);
```

