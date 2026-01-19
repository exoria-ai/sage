# autoCompleteOperator

**Module:** `@arcgis/core/geometry/operators/autoCompleteOperator`

## Import

```javascript
import * as autoCompleteOperator from "@arcgis/core/geometry/operators/autoCompleteOperator.js";
```

```javascript
// CDN
const autoCompleteOperator = await $arcgis.import("@arcgis/core/geometry/operators/autoCompleteOperator.js");
```

**Since:** 4.31

## Overview

Fills the closed gaps between 2D polygons using polygon boundaries and polylines as the boundary for creating new polygons.

## Property Details

### `supportsCurves`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Auto complete a set of polygons using polylines as boundaries
const result = autoCompleteOperator.execute(polygons, polylines);
```

