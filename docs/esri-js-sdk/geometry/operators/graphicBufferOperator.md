# graphicBufferOperator

**Module:** `@arcgis/core/geometry/operators/graphicBufferOperator`

## Import

```javascript
import * as graphicBufferOperator from "@arcgis/core/geometry/operators/graphicBufferOperator.js";
```

```javascript
// CDN
const graphicBufferOperator = await $arcgis.import("@arcgis/core/geometry/operators/graphicBufferOperator.js");
```

**Since:** 4.31

## Overview

Creates planar buffers around 2D geometries using graphical joins and caps.

## Property Details

### `supportsCurves`

### `executeMany`


## Method Details

### `Method Details()`


## Examples

```javascript
// Buffer two polylines with different distances and buffer styles.
const buffers = graphicBufferOperator.executeMany(
  [polyline1, polyline2],
  [1000, 1500],
  "square",
  "round",
  10,
);
```

