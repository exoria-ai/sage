# PolygonSymbol3D

**Module:** `@arcgis/core/symbols/PolygonSymbol3D`

## Import

```javascript
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";
```

```javascript
// CDN
const PolygonSymbol3D = await $arcgis.import("@arcgis/core/symbols/PolygonSymbol3D.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Renderer
- Graphic
- Sample - Visualize features thematically with extrusion
- Sample - Extrude building footprints based on real world heights
- ArcGIS blog - Working with icons, lines, and fill symbols
- ArcGIS blog - Working with objects, paths, and extrusion
- ArcGIS blog - Using attributes to represent real-world sizes of features

## Property Details

### `PolygonSymbol3D`

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
  type: "polygon-3d",  // autocasts as new PolygonSymbol3D()
  symbolLayers: [{
    type: "extrude",   // autocasts as new ExtrudeSymbol3DLayer()
    size: 1000,        // Height of the extrusion in meters
    material: { color: "blue" }
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
const symbolLayer = graphic.symbol.clone();
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

