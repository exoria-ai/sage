# integrateOperator

**Module:** `@arcgis/core/geometry/operators/integrateOperator`

## Import

```javascript
import * as integrateOperator from "@arcgis/core/geometry/operators/integrateOperator.js";
```

```javascript
// CDN
const integrateOperator = await $arcgis.import("@arcgis/core/geometry/operators/integrateOperator.js");
```

**Since:** 4.31

## Overview

Performs an Integration operation on a set of 2D geometries. This operator cleans up topological inconsistencies in the set. It inserts vertices where segments intersect other segments or points. It removes slivers and collapses close vertices. As a result of the operation, the geometries in the integrated set intersect only at vertices and there are no points that are closer than spatial reference tolerance in the XY plane.

## Property Details

### `supportsCurves`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Integrate a set of geometries
const result = integrateOperator.executeMany(geometries);
```

