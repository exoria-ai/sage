# SketchTooltipOptions

**Module:** `@arcgis/core/views/interactive/sketch/SketchTooltipOptions`

## Import

```javascript
import SketchTooltipOptions from "@arcgis/core/views/interactive/sketch/SketchTooltipOptions.js";
```

```javascript
// CDN
const SketchTooltipOptions = await $arcgis.import("@arcgis/core/views/interactive/sketch/SketchTooltipOptions.js");
```

**Since:** 4.24

## See Also

- Sketch
- SketchViewModel
- SketchLabelOptions
- SketchValueOptions
- Editor
- Sample - Sketch in 3D
- Sample - Edit features in 3D with the Editor widget

## Property Details

### `SketchTooltipOptions`

### `declaredClass`
- **Type:** `Inherited`

### `enabled`

### `helpMessage`

### `helpMessageIcon`

### `inputEnabled`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `VisibleElements`


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

