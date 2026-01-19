# StylePattern3D

**Module:** `@arcgis/core/symbols/patterns/StylePattern3D`

## Import

```javascript
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";
```

```javascript
// CDN
const StylePattern3D = await $arcgis.import("@arcgis/core/symbols/patterns/StylePattern3D.js");
```

**Since:** 4.17

## See Also

- FillSymbol3DLayer
- Urban visualization with polygon patterns

## Property Details

### `StylePattern3D`

### `declaredClass`
- **Type:** `Inherited`

### `style`

### `type`

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
const symbol = {
  type: "polygon-3d",  // autocasts as new PolygonSymbol3D()
  symbolLayers: [{
    type: "fill",  // autocasts as new FillSymbol3DLayer()
    material: { color: "red" },
    outline: { color: "red" },
    pattern: {
      type: "style",
      style: "cross"
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

