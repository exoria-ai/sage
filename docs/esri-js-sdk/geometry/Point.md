# Point

**Module:** `@arcgis/core/geometry/Point`

## Import

```javascript
import Point from "@arcgis/core/geometry/Point.js";
```

```javascript
// CDN
const Point = await $arcgis.import("@arcgis/core/geometry/Point.js");
```

**Since:** 4.0

## See Also

- Sample - Add graphics (MapView)
- Sample - Add graphics (SceneView)
- Multipoint

## Property Details

### `Point`

### `cache`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `extent`
- **Type:** `Inherited`

### `hasM`

### `hasZ`

### `latitude`

### `longitude`

### `m`

### `spatialReference`
- **Type:** `Inherited`

### `type`

### `x`

### `y`

### `z`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `copy`

### `distance`

### `equals`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `normalize`

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

