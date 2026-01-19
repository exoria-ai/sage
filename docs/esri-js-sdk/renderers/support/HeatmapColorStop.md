# HeatmapColorStop

**Module:** `@arcgis/core/renderers/support/HeatmapColorStop`

## Import

```javascript
import HeatmapColorStop from "@arcgis/core/renderers/support/HeatmapColorStop.js";
```

```javascript
// CDN
const HeatmapColorStop = await $arcgis.import("@arcgis/core/renderers/support/HeatmapColorStop.js");
```

**Since:** 4.8

## See Also

- HeatmapRenderer

## Property Details

### `HeatmapColorStop`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `ratio`

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

