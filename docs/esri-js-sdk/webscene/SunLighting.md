# SunLighting

**Module:** `@arcgis/core/webscene/SunLighting`

## Import

```javascript
import SunLighting from "@arcgis/core/webscene/SunLighting.js";
```

```javascript
// CDN
const SunLighting = await $arcgis.import("@arcgis/core/webscene/SunLighting.js");
```

**Since:** 4.24

## See Also

- Environment

## Property Details

### `SunLighting`

### `date`

### `declaredClass`
- **Type:** `Inherited`

### `directShadowsEnabled`

### `displayUTCOffset`

### `type`

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

