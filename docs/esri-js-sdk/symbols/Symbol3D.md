# Symbol3D

**Module:** `@arcgis/core/symbols/Symbol3D`

## Import

```javascript
import Symbol3D from "@arcgis/core/symbols/Symbol3D.js";
```

```javascript
// CDN
const Symbol3D = await $arcgis.import("@arcgis/core/symbols/Symbol3D.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Renderer
- Graphic
- Symbol3DLayer
- Styles and data visualization
- ArcGIS blog - Working with icons, lines, and fill symbols
- ArcGIS blog - Working with objects, paths, and extrusion
- ArcGIS blog - Using attributes to represent real-world sizes of features

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `styleOrigin`

### `symbolLayers`

### `type`

### `addHandles`
- **Type:** `Inherited`

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

