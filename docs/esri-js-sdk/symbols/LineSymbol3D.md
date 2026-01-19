# LineSymbol3D

**Module:** `@arcgis/core/symbols/LineSymbol3D`

## Import

```javascript
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
```

```javascript
// CDN
const LineSymbol3D = await $arcgis.import("@arcgis/core/symbols/LineSymbol3D.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Renderer
- Graphic
- ArcGIS blog - Working with icons, lines, and fill symbols
- ArcGIS blog - Working with objects, paths, and extrusion
- ArcGIS blog - Using attributes to represent real-world sizes of features

## Property Details

### `LineSymbol3D`

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
  type: "line-3d",  // autocasts as new LineSymbol3D()
  symbolLayers: [{
    type: "path",  // autocasts as new PathSymbol3DLayer()
    profile: "circle",
    width: 10,    // width of the tube in meters
    material: { color: [ 128,128,128 ] }
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

