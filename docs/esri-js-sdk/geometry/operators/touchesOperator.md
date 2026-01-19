# touchesOperator

**Module:** `@arcgis/core/geometry/operators/touchesOperator`

## Import

```javascript
import * as touchesOperator from "@arcgis/core/geometry/operators/touchesOperator.js";
```

```javascript
// CDN
const touchesOperator = await $arcgis.import("@arcgis/core/geometry/operators/touchesOperator.js");
```

**Since:** 4.31

## Overview

Perform a relational operation to determine if one 2D geometry touches another 2D geometry.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Returns true if the line vertex touches the edge of the polygon
const isTouching = touchOperator.execute(polygon, line);
```

