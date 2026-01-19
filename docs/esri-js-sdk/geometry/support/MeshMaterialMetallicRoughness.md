# MeshMaterialMetallicRoughness

**Module:** `@arcgis/core/geometry/support/MeshMaterialMetallicRoughness`

## Import

```javascript
import MeshMaterialMetallicRoughness from "@arcgis/core/geometry/support/MeshMaterialMetallicRoughness.js";
```

```javascript
// CDN
const MeshMaterialMetallicRoughness = await $arcgis.import("@arcgis/core/geometry/support/MeshMaterialMetallicRoughness.js");
```

**Since:** 4.15

## See Also

- MeshComponent
- MeshMaterial
- Sample - Low poly terrain using mesh geometry

## Property Details

### `MeshMaterialMetallicRoughness`

### `alphaCutoff`
- **Type:** `Inherited`

### `alphaMode`
- **Type:** `Inherited`

### `color`
- **Type:** `Inherited`

### `colorTexture`
- **Type:** `Inherited`

### `colorTextureTransform`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `doubleSided`
- **Type:** `Inherited`

### `emissiveColor`

### `emissiveTexture`

### `emissiveTextureTransform`

### `metallic`

### `metallicRoughnessTexture`

### `normalTexture`
- **Type:** `Inherited`

### `normalTextureTransform`
- **Type:** `Inherited`

### `occlusionTexture`

### `occlusionTextureTransform`

### `roughness`

### `addHandles`
- **Type:** `Inherited`

### `clone`
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

