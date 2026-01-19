# relateOperator

**Module:** `@arcgis/core/geometry/operators/relateOperator`

## Import

```javascript
import * as relateOperator from "@arcgis/core/geometry/operators/relateOperator.js";
```

```javascript
// CDN
const relateOperator = await $arcgis.import("@arcgis/core/geometry/operators/relateOperator.js");
```

**Since:** 4.31

## Overview

Performs a relational operation between two 2D geometries using the DE-9IM matrix encoded as a string. The DE-9IM matrix is a 3x3 matrix that describes the topological relationship between two geometries. See, http://en.wikipedia.org/wiki/DE-9IM.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`

### `isValidDE9IM`


## Method Details

### `Method Details()`


## Examples

```javascript
// Returns true if the polygon geometry completely
// contains the polyline based on the DE-9IM string
const isRelated = relateOperator.execute(polygon, polyline, "TTTFFTFFT");
```

