# Tooltip

**Module:** `@arcgis/core/views/interactive/Tooltip`

## Import

```javascript
import Tooltip from "@arcgis/core/views/interactive/Tooltip.js";
```

```javascript
// CDN
const Tooltip = await $arcgis.import("@arcgis/core/views/interactive/Tooltip.js");
```

**Since:** 4.31

## See Also

- Sketch
- SketchViewModel
- SketchTooltipOptions
- SketchValueOptions
- Sample - Sketch in 3D
- Sample - Edit features in 3D with the Editor widget

## Property Details

### `Tooltip`

### `declaredClass`
- **Type:** `Inherited`

### `mode`

### `addHandles`
- **Type:** `Inherited`

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

