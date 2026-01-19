# PortalFolder

**Module:** `@arcgis/core/portal/PortalFolder`

## Import

```javascript
import PortalFolder from "@arcgis/core/portal/PortalFolder.js";
```

```javascript
// CDN
const PortalFolder = await $arcgis.import("@arcgis/core/portal/PortalFolder.js");
```

**Since:** 4.0

## See Also

- Portal
- PortalUser
- ArcGIS Organization portals
- Rest API: Create Folder
- Rest API: Delete Folder

## Property Details

### `created`

### `declaredClass`
- **Type:** `Inherited`

### `id`

### `portal`

### `title`

### `url`

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

