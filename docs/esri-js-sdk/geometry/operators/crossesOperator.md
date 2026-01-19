# crossesOperator

**Module:** `@arcgis/core/geometry/operators/crossesOperator`

## Import

```javascript
import * as crossesOperator from "@arcgis/core/geometry/operators/crossesOperator.js";
```

```javascript
// CDN
const crossesOperator = await $arcgis.import("@arcgis/core/geometry/operators/crossesOperator.js");
```

**Since:** 4.31

## Overview

Performs a relational operation to determine if one 2D geometry crosses another 2D geometry.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Returns true if a geometry crosses another geometry
const isCrossed = crossesOperator.execute(polygon, polyline);
```

