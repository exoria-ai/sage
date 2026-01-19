# PortalQueryParams

**Module:** `@arcgis/core/portal/PortalQueryParams`

## Import

```javascript
import PortalQueryParams from "@arcgis/core/portal/PortalQueryParams.js";
```

```javascript
// CDN
const PortalQueryParams = await $arcgis.import("@arcgis/core/portal/PortalQueryParams.js");
```

**Since:** 4.0

## See Also

- Portal.queryGroups()
- Portal.queryItems()
- Portal.queryUsers()
- PortalGroup.queryItems()
- PortalUser.queryFavorites()
- ArcGIS REST API Search Reference
- ArcGIS REST API Search Reference
- Rest API: Search
- Rest API: Group Search
- Rest API: User Search

## Property Details

### `PortalQueryParams`

### `categories`

### `declaredClass`
- **Type:** `Inherited`

### `extent`

### `filter`

### `num`

### `query`

### `sortField`

### `sortOrder`

### `start`

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
// Query items with categories tagged as 'Basemaps' OR 'Imagery' AND 'People' OR 'Environment'
// i.e. (Basemaps || Imagery) && (People || Environment)
params.categories = [["Basemaps", "Imagery"], ["People", "Environment"]];
```

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

