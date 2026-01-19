# PortalRating

**Module:** `@arcgis/core/portal/PortalRating`

## Import

```javascript
import PortalRating from "@arcgis/core/portal/PortalRating.js";
```

```javascript
// CDN
const PortalRating = await $arcgis.import("@arcgis/core/portal/PortalRating.js");
```

**Since:** 4.2

## Property Details

### `created`

### `declaredClass`
- **Type:** `Inherited`

### `rating`

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

