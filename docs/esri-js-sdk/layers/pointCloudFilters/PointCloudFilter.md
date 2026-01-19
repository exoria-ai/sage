# PointCloudFilter

**Module:** `@arcgis/core/layers/pointCloudFilters/PointCloudFilter`

## Import

```javascript
import PointCloudFilter from "@arcgis/core/layers/pointCloudFilters/PointCloudFilter.js";
```

```javascript
// CDN
const PointCloudFilter = await $arcgis.import("@arcgis/core/layers/pointCloudFilters/PointCloudFilter.js");
```

**Since:** 4.10

## See Also

- Sample - Filter points in a PointCloudLayer
- PointCloudLayer
- PointCloudReturnFilter
- PointCloudValueFilter

## Property Details

### `PointCloudFilter`

### `declaredClass`
- **Type:** `Inherited`

### `field`

### `type`

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
const pcLayer = new PointCloudLayer({
  ...,
  filters: [{
    type: "value",
    field: "CLASS_CODE",
    mode: "include",
    // values include ground(2) and building(6)
    values: [2, 6]
  }]
});
```

```javascript
const pointCloudLayer = new PointCloudLayer({
 ...,
 filters: [{
   type: "return",
   field: "RETURNS",
   values: ["firstOfMany", "single"]
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

