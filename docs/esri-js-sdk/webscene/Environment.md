# Environment

**Module:** `@arcgis/core/webscene/Environment`

## Import

```javascript
import Environment from "@arcgis/core/webscene/Environment.js";
```

```javascript
// CDN
const Environment = await $arcgis.import("@arcgis/core/webscene/Environment.js");
```

**Since:** 4.0

## See Also

- InitialViewProperties
- Slide

## Property Details

### `Environment`

### `atmosphereEnabled`

### `background`

### `declaredClass`
- **Type:** `Inherited`

### `lighting`

### `starsEnabled`

### `weather`

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

