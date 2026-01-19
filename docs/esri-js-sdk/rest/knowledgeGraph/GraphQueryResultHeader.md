# GraphQueryResultHeader

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphQueryResultHeader`

## Import

```javascript
import GraphQueryResultHeader from "@arcgis/core/rest/knowledgeGraph/GraphQueryResultHeader.js";
```

```javascript
// CDN
const GraphQueryResultHeader = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphQueryResultHeader.js");
```

**Since:** 4.32

## Property Details

### `GraphQueryResultHeader`

### `declaredClass`
- **Type:** `Inherited`

### `exceededTransferLimit`

### `headerKeys`

### `outSpatialReference`

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

