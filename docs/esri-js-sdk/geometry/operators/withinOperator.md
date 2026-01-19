# withinOperator

**Module:** `@arcgis/core/geometry/operators/withinOperator`

## Import

```javascript
import * as withinOperator from "@arcgis/core/geometry/operators/withinOperator.js";
```

```javascript
// CDN
const withinOperator = await $arcgis.import("@arcgis/core/geometry/operators/withinOperator.js");
```

**Since:** 4.31

## Overview

Perform a relational operation to determine if one 2D geometry is within another 2D geometry. Geometry A is within geometry B, when A is the intersection of A and B. Geometry A can be non-simple geometry.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
Returns true if a geometry is completely within another
const isWithin = withinOperator.execute(polygon1, polygon2);
```

