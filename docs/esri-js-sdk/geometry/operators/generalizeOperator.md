# generalizeOperator

**Module:** `@arcgis/core/geometry/operators/generalizeOperator`

## Import

```javascript
import * as generalizeOperator from "@arcgis/core/geometry/operators/generalizeOperator.js";
```

```javascript
// CDN
const generalizeOperator = await $arcgis.import("@arcgis/core/geometry/operators/generalizeOperator.js");
```

**Since:** 4.31

## Overview

Generalizes 2D geometries using Douglas-Peucker algorithm.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Generalize a polyline geometry
const generalizedPolyline = generalizeOperator.execute(polyline, 10);
```

