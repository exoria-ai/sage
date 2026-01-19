# SceneModification

**Module:** `@arcgis/core/layers/support/SceneModification`

## Import

```javascript
import SceneModification from "@arcgis/core/layers/support/SceneModification.js";
```

```javascript
// CDN
const SceneModification = await $arcgis.import("@arcgis/core/layers/support/SceneModification.js");
```

**Since:** 4.16

## See Also

- Sample - Integrated mesh modification
- IntegratedMeshLayer
- IntegratedMesh3DTilesLayer
- SceneModifications
- IntegratedMeshLayer
- IntegratedMesh3DTilesLayer

## Property Details

### `SceneModification`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `type`

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

