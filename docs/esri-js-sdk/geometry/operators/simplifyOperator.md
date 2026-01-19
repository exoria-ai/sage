# simplifyOperator

**Module:** `@arcgis/core/geometry/operators/simplifyOperator`

## Import

```javascript
import * as simplifyOperator from "@arcgis/core/geometry/operators/simplifyOperator.js";
```

```javascript
// CDN
const simplifyOperator = await $arcgis.import("@arcgis/core/geometry/operators/simplifyOperator.js");
```

**Since:** 4.31

## Overview

Applies Esri (non-OGC) simplification to 2D geometries by removing unnecessary vertices while preserving the geometry shape. This makes them topologically legal with respect to their geometry type. This operator is less strict than simplifyOGCOperator.

## Property Details

### `supportsCurves`

### `execute`

### `executeMany`

### `isSimple`


## Method Details

### `Method Details()`


## Examples

```javascript
// Topologically simplifies a geometry
const simplified = simplifyOperator.execute(polyline);
console.log(simplifyOperator.isSimple(simplified)); // true
```

```javascript
// returns true if given geometry is simple
const simple = simplifyOperator.isSimple(polyline);
console.log(simple); // true | false
```

