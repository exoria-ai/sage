# Mesh

**Module:** `@arcgis/core/geometry/Mesh`

## Import

```javascript
import Mesh from "@arcgis/core/geometry/Mesh.js";
```

```javascript
// CDN
const Mesh = await $arcgis.import("@arcgis/core/geometry/Mesh.js");
```

**Since:** 4.7

## Inheritance

Extends: **to**

## See Also

- MeshComponent
- meshUtils
- Sample - Working with 3d mesh primitives
- Sample - Low poly terrain using mesh geometry

## Property Details

### `Mesh`

### `cache`
- **Type:** `Inherited`

### `components`

### `declaredClass`
- **Type:** `Inherited`

### `extent`

### `hasM`
- **Type:** `Inherited`

### `hasZ`
- **Type:** `Inherited`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `origin`

### `spatialReference`
- **Type:** `Inherited`

### `transform`

### `type`

### `vertexAttributes`

### `vertexSpace`

### `addComponent`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `centerAt`

### `clone`

### `createBox`

### `createCylinder`

### `createFromGLTF`

### `createFromPolygon`

### `createPlane`

### `createSphere`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `offset`

### `removeComponent`

### `removeHandles`
- **Type:** `Inherited`

### `rotate`

### `scale`

### `toBinaryGLTF`

### `toJSON`
- **Type:** `Inherited`

### `vertexAttributesChanged`

### `when`

### `CreateBoxParameters`

### `CreateCylinderParameters`

### `CreateFromGLTFParameters`

### `CreatePlaneParameters`

### `CreateSphereParameters`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a box mesh geometry
let mesh = Mesh.createBox(location, {
  size: {
    width: 100,
    height: 50,
    depth: 50
  },
  material: {
    color: "red"
  }
});

// Create a graphic and add it to the view
let graphic = new Graphic({
  geometry: mesh,
  symbol: {
    type: "mesh-3d",
    symbolLayers: [ { type: "fill" } ]
  }
});

view.graphics.add(graphic);
```

```javascript
// Create a mesh geometry representing a pyramid
let pyramidMesh = new Mesh({
  vertexAttributes: {
    // vertex positions for the Louvre pyramid, Paris
    position: [
      // vertex 0 - base of the pyramid, south
      2.336006, 48.860818, 0,

      // vertex 1 - base of the pyramid, east
      2.336172, 48.861114, 0,

      // vertex 2 - base of the pyramid, north
      2.335724, 48.861229, 0,

      // vertex 3 - base of the pyramid, west
      2.335563, 48.860922, 0,

      // vertex 4 - top of the pyramid
      2.335896, 48.861024, 21
    ]
  },
  // Add a single component with faces that index the vertices
  // so we only need to define them once
  components: [
    {
      faces: [
        0, 4, 3,
        0, 1, 4,
        1, 2, 4,
        2, 3, 4
      ]
    }
  ],
  // specify a spatial reference if the position of the vertices is not in WGS84
});

// add the mesh geometry to a graphic
let graphic = new Graphic({
  geometry: pyramidMesh,
  symbol: {
    type: "mesh-3d",
    symbolLayers: [ { type: "fill" } ]
  }
});

view.graphics.add(graphic);
```

```javascript
let mesh = new Mesh({ spatialReference: SpatialReference.WebMercator });

// Specify vertices for two triangles that make up a square
// around a provided point. Uv coordinates are setup to cover the square
// from (0, 0) to (1, 1) from corner to corner.
mesh.vertexAttributes = {
  position: [
    pt.x - 10, pt.y - 10, 100,
    pt.x + 10, pt.y - 10, 100,
    pt.x + 10, pt.y + 10, 100,

    pt.x - 10, pt.y - 10, 100,
    pt.x + 10, pt.y + 10, 100,
    pt.x - 10, pt.y + 10, 100
  ],
  uv: [
    0, 0,
    1, 0,
    1, 1,

    0, 0,
    1, 1,
    0, 1
  ]
};
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

```javascript
let mesh = Mesh.createBox(point, {
  size: {
    width: 10,
    height: 100,
    depth: 20
  },
  material: {
    color: "green"
  }
});
```

```javascript
let mesh = Mesh.createBox(point, {
  imageFace: "top",
  material: {
    colorTexture: new MeshTexture({ url: "./url-to-image.png" })
  }
});
```

