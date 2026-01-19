# LOD

**Module:** `@arcgis/core/layers/support/LOD`

## Import

```javascript
import LOD from "@arcgis/core/layers/support/LOD.js";
```

```javascript
// CDN
const LOD = await $arcgis.import("@arcgis/core/layers/support/LOD.js");
```

**Since:** 4.0

## See Also

- ElevationLayer
- TileLayer

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `level`

### `levelValue`

### `resolution`

### `scale`

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

