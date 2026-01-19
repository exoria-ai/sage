# GraphQuery

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphQuery`

## Import

```javascript
import GraphQuery from "@arcgis/core/rest/knowledgeGraph/GraphQuery.js";
```

```javascript
// CDN
const GraphQuery = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphQuery.js");
```

**Since:** 4.25

## See Also

- Sample - Query an knowledge graph
- knowledgeGraphService.executeQuery()
- knowledgeGraphService.executeQueryStreaming()

## Property Details

### `GraphQuery`

### `declaredClass`
- **Type:** `Inherited`

### `openCypherQuery`

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
//typical use case
KnowledgeGraphModule.executeQuery(
 knowledgeGraph, //graph
 { //queryArguments
   openCypherQuery: "MATCH (n) RETURN n LIMIT 1", //query
  }).then((queryResult) => {
    //do something with the result
});
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

