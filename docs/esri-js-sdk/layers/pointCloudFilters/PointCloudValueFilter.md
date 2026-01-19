# PointCloudValueFilter

**Module:** `@arcgis/core/layers/pointCloudFilters/PointCloudValueFilter`

## Import

```javascript
import PointCloudValueFilter from "@arcgis/core/layers/pointCloudFilters/PointCloudValueFilter.js";
```

```javascript
// CDN
const PointCloudValueFilter = await $arcgis.import("@arcgis/core/layers/pointCloudFilters/PointCloudValueFilter.js");
```

**Since:** 4.10

## See Also

- Sample - Filter points in a PointCloudLayer

## Property Details

### `PointCloudValueFilter`

### `declaredClass`
- **Type:** `Inherited`

### `field`
- **Type:** `Inherited`

### `mode`

### `type`

### `values`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const pcLayer = new PointCloudLayer({
  url: "https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/SONOMA_AREA1_LiDAR_RGB/SceneServer",
  filters: [{
    type: "value",
    field: "CLASS_CODE",
    mode: "include",
    // values includes high vegetation(5)
    values: [5]
  }]
});
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

