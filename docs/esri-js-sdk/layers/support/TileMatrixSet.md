# TileMatrixSet

**Module:** `@arcgis/core/layers/support/TileMatrixSet`

## Import

```javascript
import TileMatrixSet from "@arcgis/core/layers/support/TileMatrixSet.js";
```

```javascript
// CDN
const TileMatrixSet = await $arcgis.import("@arcgis/core/layers/support/TileMatrixSet.js");
```

**Since:** 4.4

## Property Details

### `TileMatrixSet`

### `declaredClass`
- **Type:** `Inherited`

### `fullExtent`

### `id`

### `tileInfo`

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

