# OffsetParameters

**Module:** `@arcgis/core/rest/support/OffsetParameters`

## Import

```javascript
import OffsetParameters from "@arcgis/core/rest/support/OffsetParameters.js";
```

```javascript
// CDN
const OffsetParameters = await $arcgis.import("@arcgis/core/rest/support/OffsetParameters.js");
```

**Since:** 4.0

## See Also

- geometryService.offset()
- ArcGIS REST API - Offset

## Property Details

### `OffsetParameters`

### `bevelRatio`

### `declaredClass`
- **Type:** `Inherited`

### `geometries`

### `offsetDistance`

### `offsetHow`

### `offsetUnit`

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

