# SketchValueOptions

**Module:** `@arcgis/core/views/interactive/sketch/SketchValueOptions`

## Import

```javascript
import SketchValueOptions from "@arcgis/core/views/interactive/sketch/SketchValueOptions.js";
```

```javascript
// CDN
const SketchValueOptions = await $arcgis.import("@arcgis/core/views/interactive/sketch/SketchValueOptions.js");
```

**Since:** 4.29

## See Also

- Sketch
- SketchViewModel
- SketchLabelOptions
- SketchTooltipOptions
- Editor
- Sample - Sketch in 3D
- Sample - Edit features in 3D with the Editor widget

## Property Details

### `SketchValueOptions`

### `declaredClass`
- **Type:** `Inherited`

### `directionMode`

### `displayUnits`

### `inputUnits`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `Units`


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

