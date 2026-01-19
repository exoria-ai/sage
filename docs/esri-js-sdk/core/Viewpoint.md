# Viewpoint

**Module:** `@arcgis/core/Viewpoint`

## Import

```javascript
import Viewpoint from "@arcgis/core/Viewpoint.js";
```

```javascript
// CDN
const Viewpoint = await $arcgis.import("@arcgis/core/Viewpoint.js");
```

**Since:** 4.0

## See Also

- MapView
- Camera
- MapView.rotation

## Property Details

### `Viewpoint`

### `camera`

### `declaredClass`
- **Type:** `Inherited`

### `rotation`

### `scale`

### `targetGeometry`

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
// due north is rotated 90 degrees, pointing to the right side of the view
viewpoint.rotation = 90;
```

```javascript
// due north is rotated 180 degrees, pointing to the bottom of the view
viewpoint.rotation = 180;
```

```javascript
// due north is rotated 270 degrees, pointing to the left side of the view
viewpoint.rotation = 270;
```

```javascript
// due north is rotated 0 degrees, pointing to the top of the view (the default)
viewpoint.rotation = 0; // 360 or multiple of 360 (e.g. 720) works here as well.
```

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

