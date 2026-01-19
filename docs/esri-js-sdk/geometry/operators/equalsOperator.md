# equalsOperator

**Module:** `@arcgis/core/geometry/operators/equalsOperator`

## Import

```javascript
import * as equalsOperator from "@arcgis/core/geometry/operators/equalsOperator.js";
```

```javascript
// CDN
const equalsOperator = await $arcgis.import("@arcgis/core/geometry/operators/equalsOperator.js");
```

**Since:** 4.31

## Overview

Performs a relational operation to determine if two 2D geometries are topologically equal.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Returns true if two geometries are equal
const isEqual = equalOperator.execute(polyline1, polyline2);
```

