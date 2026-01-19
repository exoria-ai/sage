# BufferParameters

**Module:** `@arcgis/core/rest/support/BufferParameters`

## Import

```javascript
import BufferParameters from "@arcgis/core/rest/support/BufferParameters.js";
```

```javascript
// CDN
const BufferParameters = await $arcgis.import("@arcgis/core/rest/support/BufferParameters.js");
```

**Since:** 4.20

## See Also

- geometryService.buffer()
- ArcGIS REST API - Buffer

## Property Details

### `BufferParameters`

### `bufferSpatialReference`

### `declaredClass`
- **Type:** `Inherited`

### `distances`

### `geodesic`

### `geometries`

### `outSpatialReference`

### `unionResults`

### `unit`

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

