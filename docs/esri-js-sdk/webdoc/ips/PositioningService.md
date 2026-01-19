# PositioningService

**Module:** `@arcgis/core/webdoc/ips/PositioningService`

## Import

```javascript
import PositioningService from "@arcgis/core/webdoc/ips/PositioningService.js";
```

```javascript
// CDN
const PositioningService = await $arcgis.import("@arcgis/core/webdoc/ips/PositioningService.js");
```

**Since:** 4.31

## Property Details

### `PositioningService`

### `declaredClass`
- **Type:** `Inherited`

### `portalItem`

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

