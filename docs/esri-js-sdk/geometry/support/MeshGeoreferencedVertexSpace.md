# MeshGeoreferencedVertexSpace

**Module:** `@arcgis/core/geometry/support/MeshGeoreferencedVertexSpace`

## Import

```javascript
import MeshGeoreferencedVertexSpace from "@arcgis/core/geometry/support/MeshGeoreferencedVertexSpace.js";
```

```javascript
// CDN
const MeshGeoreferencedVertexSpace = await $arcgis.import("@arcgis/core/geometry/support/MeshGeoreferencedVertexSpace.js");
```

**Since:** 4.27

## See Also

- Mesh

## Property Details

### `MeshGeoreferencedVertexSpace`

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

