# MeshSymbol3D

**Module:** `@arcgis/core/symbols/MeshSymbol3D`

## Import

```javascript
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
```

```javascript
// CDN
const MeshSymbol3D = await $arcgis.import("@arcgis/core/symbols/MeshSymbol3D.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - SceneLayer
- SimpleRenderer
- UniqueValueRenderer
- Graphic

## Property Details

### `MeshSymbol3D`

### `declaredClass`
- **Type:** `Inherited`

### `styleOrigin`
- **Type:** `Inherited`

### `symbolLayers`

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
  type: "mesh-3d",  // autocasts as new MeshSymbol3D()
  symbolLayers: [{
    type: "fill",  // autocasts as new FillSymbol3DLayer()
    material: { color: "green" }
  }]
};
sceneLayer.renderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: symbol
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
// Creates a deep clone of the graphic's symbol
let symLyr = graphic.symbol.clone();
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

