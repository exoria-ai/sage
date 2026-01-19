# CIMFilteredFindPathsPathFilter

**Module:** `@arcgis/core/rest/knowledgeGraph/toolService/findPaths/CIMFilteredFindPathsPathFilter`

## Import

```javascript
import CIMFilteredFindPathsPathFilter from "@arcgis/core/rest/knowledgeGraph/toolService/findPaths/CIMFilteredFindPathsPathFilter.js";
```

```javascript
// CDN
const CIMFilteredFindPathsPathFilter = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/toolService/findPaths/CIMFilteredFindPathsPathFilter.js");
```

**Since:** 4.32

## Property Details

### `CIMFilteredFindPathsPathFilter`

### `declaredClass`
- **Type:** `Inherited`

### `filterType`

### `iD`

### `itemType`

### `itemTypeName`

### `propertyFilterPredicate`

### `type`

### `addHandles`
- **Type:** `Inherited`

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

