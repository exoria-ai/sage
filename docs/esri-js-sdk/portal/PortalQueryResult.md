# PortalQueryResult

**Module:** `@arcgis/core/portal/PortalQueryResult`

## Import

```javascript
import PortalQueryResult from "@arcgis/core/portal/PortalQueryResult.js";
```

```javascript
// CDN
const PortalQueryResult = await $arcgis.import("@arcgis/core/portal/PortalQueryResult.js");
```

**Since:** 4.0

## See Also

- Portal.queryGroups()
- Portal.queryItems()
- PortalGroup.queryItems()

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `nextQueryParams`

### `queryParams`

### `results`

### `total`

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

