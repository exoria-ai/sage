# GraphDataModelOperationResult

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphDataModelOperationResult`

## Import

```javascript
import GraphDataModelOperationResult from "@arcgis/core/rest/knowledgeGraph/GraphDataModelOperationResult.js";
```

```javascript
// CDN
const GraphDataModelOperationResult = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphDataModelOperationResult.js");
```

**Since:** 4.33

## Property Details

### `GraphDataModelOperationResult`

### `declaredClass`
- **Type:** `Inherited`

### `decoderError`

### `results`

### `resultsCount`

### `updatedKnowledgeGraph`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `ResultsObject`


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

