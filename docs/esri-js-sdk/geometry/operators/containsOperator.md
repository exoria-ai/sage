# containsOperator

**Module:** `@arcgis/core/geometry/operators/containsOperator`

## Import

```javascript
import * as containsOperator from "@arcgis/core/geometry/operators/containsOperator.js";
```

```javascript
// CDN
const containsOperator = await $arcgis.import("@arcgis/core/geometry/operators/containsOperator.js");
```

**Since:** 4.31

## Overview

Performs a relational operation to determine if one 2D geometry contains another 2D geometry. Geometry A contains geometry B, when B is the intersection of A and B. A contains B is equivalent to B within A. Geometry B can be non-simple geometry.

## Property Details

### `supportsCurves`

### `accelerateGeometry`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Returns true if one geometry contains another
const isContained = containsOperator.execute(polygon1, polygon2);
```

