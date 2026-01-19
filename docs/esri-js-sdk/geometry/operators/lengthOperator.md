# lengthOperator

**Module:** `@arcgis/core/geometry/operators/lengthOperator`

## Import

```javascript
import * as lengthOperator from "@arcgis/core/geometry/operators/lengthOperator.js";
```

```javascript
// CDN
const lengthOperator = await $arcgis.import("@arcgis/core/geometry/operators/lengthOperator.js");
```

**Since:** 4.31

## Overview

Returns the planar length of a 2D geometry.

## Property Details

### `supportsCurves`

### `execute`


## Method Details

### `Method Details()`


## Examples

```javascript
// Calculate the length of a polyline
const length = lengthOperator.execute(polyline);
```

