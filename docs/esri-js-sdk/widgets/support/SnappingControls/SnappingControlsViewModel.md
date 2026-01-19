# SnappingControlsViewModel

**Module:** `@arcgis/core/widgets/support/SnappingControls/SnappingControlsViewModel`

## Import

```javascript
import SnappingControlsViewModel from "@arcgis/core/widgets/support/SnappingControls/SnappingControlsViewModel.js";
```

```javascript
// CDN
const SnappingControlsViewModel = await $arcgis.import("@arcgis/core/widgets/support/SnappingControls/SnappingControlsViewModel.js");
```

**Since:** 4.21

## See Also

- SnappingControls
- SnappingOptions
- Sketch

## Property Details

### `SnappingControlsViewModel`

### `declaredClass`
- **Type:** `Inherited`

### `snappingOptions`

### `state`

### `view`

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

