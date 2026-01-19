# multiPartToSinglePartOperator

**Module:** `@arcgis/core/geometry/operators/multiPartToSinglePartOperator`

## Import

```javascript
import * as multiPartToSinglePartOperator from "@arcgis/core/geometry/operators/multiPartToSinglePartOperator.js";
```

```javascript
// CDN
const multiPartToSinglePartOperator = await $arcgis.import("@arcgis/core/geometry/operators/multiPartToSinglePartOperator.js");
```

**Since:** 4.31

## Overview

Convert multipart 2D geometries to single part geometries.

## Property Details

### `supportsCurves`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Convert multipart geometries to single part geometries
const singlePartGeometries = multiPartToSinglePartOperator.executeMany(multiPartGeometries);
```

