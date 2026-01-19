# RasterPresetRenderer

**Module:** `@arcgis/core/renderers/support/RasterPresetRenderer`

## Import

```javascript
import RasterPresetRenderer from "@arcgis/core/renderers/support/RasterPresetRenderer.js";
```

```javascript
// CDN
const RasterPresetRenderer = await $arcgis.import("@arcgis/core/renderers/support/RasterPresetRenderer.js");
```

**Since:** 4.31

## See Also

- ImageryLayer
- ImageryTileLayer

## Property Details

### `RasterPresetRenderer`

### `bandIds`

### `declaredClass`
- **Type:** `Inherited`

### `name`

### `renderer`

### `value`

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

### `method()`

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

