# MeshTextureTransform

**Module:** `@arcgis/core/geometry/support/MeshTextureTransform`

## Import

```javascript
import MeshTextureTransform from "@arcgis/core/geometry/support/MeshTextureTransform.js";
```

```javascript
// CDN
const MeshTextureTransform = await $arcgis.import("@arcgis/core/geometry/support/MeshTextureTransform.js");
```

**Since:** 4.27

## See Also

- MeshTexture
- MeshMaterial
- Mesh

## Property Details

### `MeshTextureTransform`

### `declaredClass`
- **Type:** `Inherited`

### `offset`

### `rotation`

### `scale`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


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

