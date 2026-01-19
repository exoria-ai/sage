# ApplicationProperties

**Module:** `@arcgis/core/webmap/ApplicationProperties`

## Import

```javascript
import ApplicationProperties from "@arcgis/core/webmap/ApplicationProperties.js";
```

```javascript
// CDN
const ApplicationProperties = await $arcgis.import("@arcgis/core/webmap/ApplicationProperties.js");
```

**Since:** 4.14

## Property Details

### `ApplicationProperties`

### `declaredClass`
- **Type:** `Inherited`

### `viewing`

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

