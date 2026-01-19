# MeshComponent

**Module:** `@arcgis/core/geometry/support/MeshComponent`

## Import

```javascript
import MeshComponent from "@arcgis/core/geometry/support/MeshComponent.js";
```

```javascript
// CDN
const MeshComponent = await $arcgis.import("@arcgis/core/geometry/support/MeshComponent.js");
```

**Since:** 4.7

## See Also

- Mesh
- Mesh.createFromGLTF

## Property Details

### `MeshComponent`

### `declaredClass`
- **Type:** `Inherited`

### `faces`

### `material`

### `name`

### `shading`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
let component1 = new MeshComponent({
  // Indices refer to vertices specified in the mesh vertexAttributes.
  // Here we refer to 2 triangles composed of the first 6 vertices of the mesh.
  faces: [0, 1, 2, 3, 4, 5],

  material: {
    color: "green"
  }
});

let component2 = new MeshComponent({
  faces: [6, 7, 8, 9, 10, 11],

  material: {
    color: "red"
  },

  shading: "smooth"
});

let mesh = new Mesh({
  // ... specify vertex attributes

  components: [component1, component2]
});
```

```javascript
let mesh = new Mesh({
  vertexAttributes: {
    position: [
      2.336006, 48.860818, 0
      2.336172, 48.861114, 0
      2.335724, 48.861229, 0
      2.335563, 48.860922, 0
    ]
  },
  // Create two components so we can have separate materials
  // for the two triangles that we want to render.
  components: [
    {
      faces: [0, 1, 2],
      material: {
        color: "red"
      }
    },
    {
      faces: [0, 2, 3],
      material: {
        color: "green"
      }
    }
  ]
});
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
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

