# PointCloudReturnFilter

**Module:** `@arcgis/core/layers/pointCloudFilters/PointCloudReturnFilter`

## Import

```javascript
import PointCloudReturnFilter from "@arcgis/core/layers/pointCloudFilters/PointCloudReturnFilter.js";
```

```javascript
// CDN
const PointCloudReturnFilter = await $arcgis.import("@arcgis/core/layers/pointCloudFilters/PointCloudReturnFilter.js");
```

**Since:** 4.10

## See Also

- Sample - Filter points in a PointCloudLayer

## Property Details

### `PointCloudReturnFilter`

### `declaredClass`
- **Type:** `Inherited`

### `field`
- **Type:** `Inherited`

### `includedReturns`

### `type`

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
const pointCloudLayer = new PointCloudLayer({
 ...,
 filters: [{
   type: "return",
   field: "RETURNS",
   includedReturns: ["firstOfMany", "single"]
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

