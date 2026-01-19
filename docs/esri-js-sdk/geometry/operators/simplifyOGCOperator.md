# simplifyOGCOperator

**Module:** `@arcgis/core/geometry/operators/simplifyOGCOperator`

## Import

```javascript
import * as simplifyOGCOperator from "@arcgis/core/geometry/operators/simplifyOGCOperator.js";
```

```javascript
// CDN
const simplifyOGCOperator = await $arcgis.import("@arcgis/core/geometry/operators/simplifyOGCOperator.js");
```

**Since:** 4.33

## Overview

Simplifies geometries to enforce topological correctness according to the OGC Simple Feature Access specification 1.2.1. This operator uses stricter rules than simplifyOperator.

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
const simplified = simplifyOGCOperator.execute(polyline);
console.log(simplifyOGCOperator.isSimple(simplified)); // true
```

```javascript
// returns true if given geometry is OGC simple
const simple = simplifyOGCOperator.isSimple(polyline);
console.log(simple); // true | false
```

