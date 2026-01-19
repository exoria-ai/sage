# boundaryOperator

**Module:** `@arcgis/core/geometry/operators/boundaryOperator`

## Import

```javascript
import * as boundaryOperator from "@arcgis/core/geometry/operators/boundaryOperator.js";
```

```javascript
// CDN
const boundaryOperator = await $arcgis.import("@arcgis/core/geometry/operators/boundaryOperator.js");
```

**Since:** 4.31

## Overview

Calculates the topological boundary of a 2D geometry.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Calculate the boundary of a polygon
const boundaryGeometry = boundaryOperator.execute(polygon);
```

