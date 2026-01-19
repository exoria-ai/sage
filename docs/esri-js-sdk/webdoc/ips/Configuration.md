# Configuration

**Module:** `@arcgis/core/webdoc/ips/Configuration`

## Import

```javascript
import Configuration from "@arcgis/core/webdoc/ips/Configuration.js";
```

```javascript
// CDN
const Configuration = await $arcgis.import("@arcgis/core/webdoc/ips/Configuration.js");
```

**Since:** 4.33

## Property Details

### `Configuration`

### `appleIPS`

### `declaredClass`
- **Type:** `Inherited`

### `gnss`

### `pathSnapping`

### `smoothing`

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

