# FocusArea

**Module:** `@arcgis/core/effects/FocusArea`

## Import

```javascript
import FocusArea from "@arcgis/core/effects/FocusArea.js";
```

```javascript
// CDN
const FocusArea = await $arcgis.import("@arcgis/core/effects/FocusArea.js");
```

**Since:** 4.33

## See Also

- FocusAreas

## Property Details

### `FocusArea`

### `declaredClass`
- **Type:** `Inherited`

### `enabled`

### `geometries`

### `id`

### `outline`

### `title`

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

