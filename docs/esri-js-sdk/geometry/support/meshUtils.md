# meshUtils

**Module:** `@arcgis/core/geometry/support/meshUtils`

## Import

```javascript
import * as meshUtils from "@arcgis/core/geometry/support/meshUtils.js";
```

```javascript
// CDN
const meshUtils = await $arcgis.import("@arcgis/core/geometry/support/meshUtils.js");
```

**Since:** 4.7

## Overview

Various utilities and convenience functions for working with Mesh objects.

## See Also

- Sample - Low poly terrain using mesh geometry

## Property Details

### `convertVertexSpace`

### `createElevationSampler`

### `createFromElevation`

### `georeference`

### `merge`

### `ungeoreference`

### `VertexAttributes`


## Method Details

### `Method Details()`


## Examples

```javascript
// convert cartesian model data to a mesh with absolute coordinates in WebMercator
const converted = convertVertexSpace(
  new Mesh({
    vertexSpace: new MeshLocalVertexSpace({ origin: location }),
    vertexAttributes,
    spatialReference: SpatialReference.WebMercator
  }),
  new MeshGeoreferencedVertexSpace()
);
```

```javascript
// convert a georeferenced WebMercator mesh to a mesh with a local tangent coordinate frame
// at the center of the mesh
const center = mesh.extent.center;
const origin = [center.x, center.y, center.z];
const converted = await convertVertexSpace(mesh, new MeshLocalVertexSpace({ origin }));
```

```javascript
// convert an existing mesh to absolute coordinates and place a graphic on the highest vertex
const converted = await convertVertexSpace(mesh, new MeshGeoreferencedVertexSpace());
const position = converted.vertexAttributes.position;

const highestPoint = new Point({ x: 0, y: 0, z: 0, spatialReference: converted.spatialReference });

for (let i = 0; i < position.length; i += 3) {
  if (position[2] > highestPoint.z) {
    highestPoint.x = position[0];
    highestPoint.y = position[1];
    highestPoint.z = position[2];
  }
}

view.graphics.add(new Graphic({ geometry: highestPoint }));
```

```javascript
// Create a mesh by sampling the ground
meshUtils.createFromElevation(map.ground, extent)
    .then(function(mesh) {
      // Do something with the mesh
    });

// Create a mesh by sampling the ground surface currently in view
meshUtils.createFromElevation(view.groundView.elevationSampler, view.extent)
    .then(function(mesh) {
      // Do something with the mesh
    });
```

```javascript
const geoVertexAttributes = meshUtils.georeference(vertexAttributes, location);
const mesh = new Mesh({
  vertexAttributes: geoVertexAttributes,
  spatialReference: location.spatialReference
});
```

```javascript
const mergedMesh = meshUtils.merge([mesh1, mesh2]);
```

