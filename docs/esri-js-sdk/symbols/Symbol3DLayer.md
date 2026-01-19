# Symbol3DLayer

**Module:** `@arcgis/core/symbols/Symbol3DLayer`

## Import

```javascript
import Symbol3DLayer from "@arcgis/core/symbols/Symbol3DLayer.js";
```

```javascript
// CDN
const Symbol3DLayer = await $arcgis.import("@arcgis/core/symbols/Symbol3DLayer.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Symbol3D
- Renderer
- Graphic
- ArcGIS blog - Working with icons, lines, and fill symbols
- ArcGIS blog - Working with objects, paths, and extrusion
- ArcGIS blog - Using attributes to represent real-world sizes of features

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

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

