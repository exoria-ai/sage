# PortalItemResource

**Module:** `@arcgis/core/portal/PortalItemResource`

## Import

```javascript
import PortalItemResource from "@arcgis/core/portal/PortalItemResource.js";
```

```javascript
// CDN
const PortalItemResource = await $arcgis.import("@arcgis/core/portal/PortalItemResource.js");
```

**Since:** 4.16

## See Also

- PortalItem.fetchResources()
- ArcGIS REST API - Item Resource
- ArcGIS REST API - Item Resources
- ArcGIS REST API - Item Data
- ArcGIS REST API - Update Item

## Property Details

### `PortalItemResource`

### `declaredClass`
- **Type:** `Inherited`

### `path`

### `portalItem`

### `url`

### `addHandles`
- **Type:** `Inherited`

### `fetch`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `update`


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

