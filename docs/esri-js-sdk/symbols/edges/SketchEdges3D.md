# SketchEdges3D

**Module:** `@arcgis/core/symbols/edges/SketchEdges3D`

## Import

```javascript
import SketchEdges3D from "@arcgis/core/symbols/edges/SketchEdges3D.js";
```

```javascript
// CDN
const SketchEdges3D = await $arcgis.import("@arcgis/core/symbols/edges/SketchEdges3D.js");
```

**Since:** 4.7

## Property Details

### `SketchEdges3D`

### `color`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `extensionLength`
- **Type:** `Inherited`

### `size`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let symbol = {
  type: "mesh-3d", // autocasts as new MeshSymbol3D()
  symbolLayers: [{
    type: "fill", // autocasts as new FillSymbol3DLayer()
    material: {
      color: [244, 247, 134]
    },
    edges: {
      type: "sketch", // autocasts as new SketchEdges3D()
      color: [50, 50, 50, 0.5],
      size: 1.5,
      extensionLength: 2
    }
  }]
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

