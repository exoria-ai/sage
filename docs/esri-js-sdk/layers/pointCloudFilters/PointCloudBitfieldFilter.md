# PointCloudBitfieldFilter

**Module:** `@arcgis/core/layers/pointCloudFilters/PointCloudBitfieldFilter`

## Import

```javascript
import PointCloudBitfieldFilter from "@arcgis/core/layers/pointCloudFilters/PointCloudBitfieldFilter.js";
```

```javascript
// CDN
const PointCloudBitfieldFilter = await $arcgis.import("@arcgis/core/layers/pointCloudFilters/PointCloudBitfieldFilter.js");
```

**Since:** 4.10

## See Also

- Sample - Filter points in a PointCloudLayer

## Property Details

### `PointCloudBitfieldFilter`

### `declaredClass`
- **Type:** `Inherited`

### `field`
- **Type:** `Inherited`

### `requiredClearBits`

### `requiredSetBits`

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
 url: "https://tiles.arcgis.com/tiles/Imiq6naek6ZWdour/arcgis/rest/services/PointCloud_urban/SceneServer/",
 filters: [{
   type: "bitfield",
   field: "FLAGS",
   requiredSetBits: [6]
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

