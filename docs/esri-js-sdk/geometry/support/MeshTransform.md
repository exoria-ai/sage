# MeshTransform

**Module:** `@arcgis/core/geometry/support/MeshTransform`

## Import

```javascript
import MeshTransform from "@arcgis/core/geometry/support/MeshTransform.js";
```

```javascript
// CDN
const MeshTransform = await $arcgis.import("@arcgis/core/geometry/support/MeshTransform.js");
```

**Since:** 4.27

## See Also

- Mesh

## Property Details

### `MeshTransform`

### `declaredClass`
- **Type:** `Inherited`

### `rotationAngle`

### `rotationAxis`

### `scale`

### `translation`

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

