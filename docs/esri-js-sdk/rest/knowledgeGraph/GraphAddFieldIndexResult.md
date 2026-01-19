# GraphAddFieldIndexResult

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphAddFieldIndexResult`

## Import

```javascript
import GraphAddFieldIndexResult from "@arcgis/core/rest/knowledgeGraph/GraphAddFieldIndexResult.js";
```

```javascript
// CDN
const GraphAddFieldIndexResult = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphAddFieldIndexResult.js");
```

**Since:** 4.33

## Property Details

### `GraphAddFieldIndexResult`

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

