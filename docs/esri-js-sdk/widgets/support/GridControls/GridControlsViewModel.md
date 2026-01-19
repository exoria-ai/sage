# GridControlsViewModel

**Module:** `@arcgis/core/widgets/support/GridControls/GridControlsViewModel`

## Import

```javascript
import GridControlsViewModel from "@arcgis/core/widgets/support/GridControls/GridControlsViewModel.js";
```

```javascript
// CDN
const GridControlsViewModel = await $arcgis.import("@arcgis/core/widgets/support/GridControls/GridControlsViewModel.js");
```

**Since:** 4.31

## See Also

- GridControls
- SnappingOptions
- SnappingControls
- Programming patterns: Widget viewModel pattern

## Property Details

### `GridControlsViewModel`

### `declaredClass`
- **Type:** `Inherited`

### `displayEnabled`

### `dynamicScaling`

### `effectiveSpacingAfterDynamicScaling`

### `gridColor`

### `gridControlsEnabled`

### `gridOutOfScale`

### `interactivePlacementState`

### `majorLineInterval`

### `numericSpacingInputShouldBeVisible`

### `placementDisabled`

### `rotateWithMap`

### `rotation`

### `snappingEnabled`

### `snappingOptions`

### `spacing`

### `unit`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `trySetDisplayEnabled`


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

