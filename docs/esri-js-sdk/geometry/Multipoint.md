# Multipoint

**Module:** `@arcgis/core/geometry/Multipoint`

## Import

```javascript
import Multipoint from "@arcgis/core/geometry/Multipoint.js";
```

```javascript
// CDN
const Multipoint = await $arcgis.import("@arcgis/core/geometry/Multipoint.js");
```

**Since:** 4.0

## See Also

- Point

## Property Details

### `Multipoint`

### `cache`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `extent`
- **Type:** `Inherited`

### `hasM`
- **Type:** `Inherited`

### `hasZ`
- **Type:** `Inherited`

### `points`

### `spatialReference`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `addPoint`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `getPoint`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `removePoint`

### `setPoint`

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

