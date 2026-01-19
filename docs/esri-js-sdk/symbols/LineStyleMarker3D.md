# LineStyleMarker3D

**Module:** `@arcgis/core/symbols/LineStyleMarker3D`

## Import

```javascript
import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";
```

```javascript
// CDN
const LineStyleMarker3D = await $arcgis.import("@arcgis/core/symbols/LineStyleMarker3D.js");
```

**Since:** 4.23

## See Also

- LineSymbol3DLayer
- Sample - Line markers and label placement
- Sample - Query Elevation (points)

## Property Details

### `LineStyleMarker3D`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `placement`

### `style`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const symbol = {
  type: "line-3d",  // autocasts as new LineSymbol3D()
  symbolLayers: [{
    type: "line",  // autocasts as new LineSymbol3DLayer()
    marker: {  // autocasts as new LineStyleMarker3D()
      type: "style",
      style: "x",
      color: "blue",
      placement: "begin"
    })
  }]
};
```

```javascript
const marker = new LineStyleMarker3D({
  color: new Color("red"),
  placement: "begin-end",
  style: "cross"
})
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

