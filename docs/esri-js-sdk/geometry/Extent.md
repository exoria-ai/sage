# Extent

**Module:** `@arcgis/core/geometry/Extent`

## Import

```javascript
import Extent from "@arcgis/core/geometry/Extent.js";
```

```javascript
// CDN
const Extent = await $arcgis.import("@arcgis/core/geometry/Extent.js");
```

**Since:** 4.0

## See Also

- MapView
- Camera

## Property Details

### `Extent`

### `cache`
- **Type:** `Inherited`

### `center`

### `declaredClass`
- **Type:** `Inherited`

### `extent`
- **Type:** `Inherited`

### `hasM`

### `hasZ`

### `height`

### `mmax`

### `mmin`

### `spatialReference`
- **Type:** `Inherited`

### `type`

### `width`

### `xmax`

### `xmin`

### `ymax`

### `ymin`

### `zmax`

### `zmin`

### `addHandles`
- **Type:** `Inherited`

### `centerAt`

### `clone`

### `contains`

### `equals`

### `expand`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `intersection`

### `intersects`

### `normalize`

### `offset`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`

### `union`


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

