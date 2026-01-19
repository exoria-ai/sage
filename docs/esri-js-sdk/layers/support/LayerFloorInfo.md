# LayerFloorInfo

**Module:** `@arcgis/core/layers/support/LayerFloorInfo`

## Import

```javascript
import LayerFloorInfo from "@arcgis/core/layers/support/LayerFloorInfo.js";
```

```javascript
// CDN
const LayerFloorInfo = await $arcgis.import("@arcgis/core/layers/support/LayerFloorInfo.js");
```

**Since:** 4.19

## See Also

- FloorFilter
- FeatureLayer.floorInfo
- SceneLayer.floorInfo

## Property Details

### `LayerFloorInfo`

### `declaredClass`
- **Type:** `Inherited`

### `floorField`

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

