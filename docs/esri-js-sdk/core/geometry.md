# geometry

**Module:** `@arcgis/core/geometry`

## Import

```javascript
import * as geometry from "@arcgis/core/geometry.js";
```

```javascript
// CDN
const geometry = await $arcgis.import("@arcgis/core/geometry.js");
```

```javascript
import Point from "@arcgis/core/geometry/Point.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
```

**Since:** 4.6

## Overview

A convenience module for importing Geometry classes when developing with TypeScript. For example, rather than importing geometries one at a time like this: import Point from "@arcgis/core/geometry/Point.js"; import Polygon from "@arcgis/core/geometry/Polygon.js"; import Polyline from "@arcgis/core/geometry/Polyline.js"; You can use this module to import them on a single line: import { Point, Polygon, Polyline } from "@arcgis/core/geometry.js"; This module also allows you to implement type guards on geometries, making your code smarter. import { GeometryUnion } from "@arcgis/core/unionTypes.js"; function logGeometry(geometry: Geometry): void { if (geometry.type === "point") { // new at 4.6, the compiler knows the geometry is a Point instance console.log("point coords: ", geometry.x, geometry.y, geometry.z); } else { // the compiler knows the geometry must be a `Extent | Polygon | Multipoint | Polyline` console.log("The value is a geometry, but isn't a point.") } }

## Property Details

### `Extent`

### `Geometry`

### `Multipoint`

### `Point`

### `Polygon`

### `Polyline`

### `SpatialReference`


## Examples

```javascript
import Point from "@arcgis/core/geometry/Point.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
```

```javascript
import { Point, Polygon, Polyline } from "@arcgis/core/geometry.js";
```

```javascript
import { GeometryUnion } from "@arcgis/core/unionTypes.js";

function logGeometry(geometry: Geometry): void {
  if (geometry.type === "point") {
    // new at 4.6, the compiler knows the geometry is a Point instance
    console.log("point coords: ", geometry.x, geometry.y, geometry.z);
  }
  else {
    // the compiler knows the geometry must be a `Extent | Polygon | Multipoint | Polyline`
    console.log("The value is a geometry, but isn't a point.")
  }
}
```

