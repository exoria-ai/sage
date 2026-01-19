# webgl

**Module:** `@arcgis/core/views/3d/webgl`

## Import

```javascript
import * as webgl from "@arcgis/core/views/3d/webgl.js";
```

```javascript
// CDN
const webgl = await $arcgis.import("@arcgis/core/views/3d/webgl.js");
```

**Since:** 4.29

## Overview

This module contains convenience functions and typings to work with RenderNode.

## See Also

- RenderNode

## Property Details

### `fromRenderCamera`

### `fromRenderCoordinates`

### `renderCoordinateTransformAt`

### `toRenderCamera`

### `toRenderCoordinates`

### `ConsumedNodes`

### `RenderNodeInput`

### `RenderNodeOutput`


## Method Details

### `Method Details()`


## Examples

```javascript
let cameraPositionGeographic = new Array(3);
webgl.fromRenderCoordinates(view,
  context.camera.eye, 0,
  cameraPositionGeographic, 0, SpatialReference.WGS84,
1);
```

```javascript
// places a tetrahedron in New York
let verticesLocal = [[10, 10, 10], [10, −10, −10], [−10, 10, −10], [−10, −10, 10]],
  transformation = new Array(16),
  geographicCoordinates = [
  //  lon     lat   elevation
      -74,   40.71,    10]

webgl.renderCoordinateTransformAt(view, geographicCoordinates, SpatialReference.WGS84, transformation);

let verticesGlobal = verticesLocal.map(function(vertexLocal) {
  // transform the coordinates with the computed transformation (using the syntax of glMatrix, see http://glmatrix.net)
  return vec3.transformMat4(new Array(3), vertexLocal, transformation);
});
```

```javascript
// A linear list of coordinate triples
let geographicCoordinates = [
  //  lon     lat   elevation
    -117.19, 34.05,   414,
     47.39,   8.51,   408];

// Allocate storage for the result
let renderCoordinates = new Array(6);

webgl.toRenderCoordinates(view,
  geographicCoordinates, 0, SpatialReference.WGS84,
  renderCoordinates, 0,
2);
```

```javascript
vec3 normal = 2.0 * texture(normalsTexture, uv).xyz - vec3(1.0);
```

```javascript
uint bits = uint(texelFetch(highlightTexture, uv, 0).r * 255.0);
bool isHighlit  = (bits & 1u) == 1u;
bool isOccluded = (bits & 3u) == 3u;
```

