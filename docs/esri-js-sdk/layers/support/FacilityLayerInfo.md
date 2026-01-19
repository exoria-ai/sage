# FacilityLayerInfo

**Module:** `@arcgis/core/layers/support/FacilityLayerInfo`

## Import

```javascript
import FacilityLayerInfo from "@arcgis/core/layers/support/FacilityLayerInfo.js";
```

```javascript
// CDN
const FacilityLayerInfo = await $arcgis.import("@arcgis/core/layers/support/FacilityLayerInfo.js");
```

**Since:** 4.19

## See Also

- FloorFilter
- MapFloorInfo.facilityLayer

## Property Details

### `FacilityLayerInfo`

### `declaredClass`
- **Type:** `Inherited`

### `facilityIdField`

### `layerId`

### `nameField`

### `siteIdField`

### `sublayerId`

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

