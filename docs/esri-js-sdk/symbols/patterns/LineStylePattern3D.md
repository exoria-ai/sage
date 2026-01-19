# LineStylePattern3D

**Module:** `@arcgis/core/symbols/patterns/LineStylePattern3D`

## Import

```javascript
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
```

```javascript
// CDN
const LineStylePattern3D = await $arcgis.import("@arcgis/core/symbols/patterns/LineStylePattern3D.js");
```

**Since:** 4.22

## See Also

- Sample - 3D hiking map with line patterns
- Sample - Line markers and label placement
- LineSymbol3DLayer
- FillSymbol3DLayer.outline

## Property Details

### `LineStylePattern3D`

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
  type: "line-3d",  // autocasts as new LineSymbol3D()
  symbolLayers: [{
    type: "line",  // autocasts as new LineSymbol3DLayer()
    material: { color: "red" },
    pattern: {  // autocasts as new LineStylePattern3D()
      type: "style",
      style: "dash"
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

