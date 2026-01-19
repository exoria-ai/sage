# ShadowCastViewModel

**Module:** `@arcgis/core/widgets/ShadowCast/ShadowCastViewModel`

## Import

```javascript
import ShadowCastViewModel from "@arcgis/core/widgets/ShadowCast/ShadowCastViewModel.js";
```

```javascript
// CDN
const ShadowCastViewModel = await $arcgis.import("@arcgis/core/widgets/ShadowCast/ShadowCastViewModel.js");
```

**Since:** 4.21

## See Also

- ShadowCast
- Shadow Cast component
- Sample - Shadow cast
- Programming patterns: Widget viewModel pattern

## Property Details

### `ShadowCastViewModel`

### `date`

### `declaredClass`
- **Type:** `Inherited`

### `discreteOptions`

### `durationOptions`

### `endTimeOfDay`

### `startTimeOfDay`

### `state`

### `thresholdOptions`

### `utcOffset`

### `view`

### `visualizationType`

### `addHandles`
- **Type:** `Inherited`

### `getDuration`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `start`

### `stop`


## Method Details

### `Method Details()`


## Examples

```javascript
widget.viewModel.date = new Date('June 1, 2021');
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

