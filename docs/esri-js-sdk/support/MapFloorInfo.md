# MapFloorInfo

**Module:** `@arcgis/core/support/MapFloorInfo`

## Import

```javascript
import MapFloorInfo from "@arcgis/core/support/MapFloorInfo.js";
```

```javascript
// CDN
const MapFloorInfo = await $arcgis.import("@arcgis/core/support/MapFloorInfo.js");
```

**Since:** 4.19

## See Also

- FloorFilter
- WebMap.floorInfo
- WebScene.floorInfo

## Property Details

### `MapFloorInfo`

### `declaredClass`
- **Type:** `Inherited`

### `facilityLayer`

### `levelLayer`

### `siteLayer`

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

