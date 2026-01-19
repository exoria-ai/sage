# MeshLocalVertexSpace

**Module:** `@arcgis/core/geometry/support/MeshLocalVertexSpace`

## Import

```javascript
import MeshLocalVertexSpace from "@arcgis/core/geometry/support/MeshLocalVertexSpace.js";
```

```javascript
// CDN
const MeshLocalVertexSpace = await $arcgis.import("@arcgis/core/geometry/support/MeshLocalVertexSpace.js");
```

**Since:** 4.27

## See Also

- Mesh

## Property Details

### `MeshLocalVertexSpace`

### `declaredClass`
- **Type:** `Inherited`

### `origin`

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

