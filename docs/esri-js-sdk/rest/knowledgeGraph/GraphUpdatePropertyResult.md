# GraphUpdatePropertyResult

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphUpdatePropertyResult`

## Import

```javascript
import GraphUpdatePropertyResult from "@arcgis/core/rest/knowledgeGraph/GraphUpdatePropertyResult.js";
```

```javascript
// CDN
const GraphUpdatePropertyResult = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphUpdatePropertyResult.js");
```

**Since:** 4.33

## Property Details

### `GraphUpdatePropertyResult`

### `declaredClass`
- **Type:** `Inherited`

### `decoderError`
- **Type:** `Inherited`

### `results`
- **Type:** `Inherited`

### `resultsCount`
- **Type:** `Inherited`

### `updatedKnowledgeGraph`
- **Type:** `Inherited`

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

