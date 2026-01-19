# PrintParameters

**Module:** `@arcgis/core/rest/support/PrintParameters`

## Import

```javascript
import PrintParameters from "@arcgis/core/rest/support/PrintParameters.js";
```

```javascript
// CDN
const PrintParameters = await $arcgis.import("@arcgis/core/rest/support/PrintParameters.js");
```

**Since:** 4.20

## Property Details

### `PrintParameters`

### `declaredClass`
- **Type:** `Inherited`

### `extraParameters`

### `outSpatialReference`

### `template`

### `view`

### `addHandles`
- **Type:** `Inherited`

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

