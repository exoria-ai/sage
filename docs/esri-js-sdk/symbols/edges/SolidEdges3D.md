# SolidEdges3D

**Module:** `@arcgis/core/symbols/edges/SolidEdges3D`

## Import

```javascript
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";
```

```javascript
// CDN
const SolidEdges3D = await $arcgis.import("@arcgis/core/symbols/edges/SolidEdges3D.js");
```

**Since:** 4.7

## See Also

- Sample: Extrude building footprints based on real world heights

## Property Details

### `SolidEdges3D`

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
      type: "solid", // autocasts as new SolidEdges3D()
      color: [50, 50, 50, 0.5],
      size: 1
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

