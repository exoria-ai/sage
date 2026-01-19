# KnowledgeGraph

**Module:** `@arcgis/core/rest/knowledgeGraph/KnowledgeGraph`

## Import

```javascript
import KnowledgeGraph from "@arcgis/core/rest/knowledgeGraph/KnowledgeGraph.js";
```

```javascript
// CDN
const KnowledgeGraph = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/KnowledgeGraph.js");
```

```javascript
// CDN
const KnowledgeGraphModule = await $arcgis.import("@arcgis/core/rest/knowledgeGraphService.js");
```

**Since:** 4.25

## See Also

- knowledgeGraphService.fetchKnowledgeGraph()
- Hosted Knowledge Graph Service

## Property Details

### `KnowledgeGraph`

### `dataModel`

### `declaredClass`
- **Type:** `Inherited`

### `serviceDefinition`

### `url`

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
//fetch the knowledge graph
const KnowledgeGraphModule = await $arcgis.import("@arcgis/core/rest/knowledgeGraphService.js");
const url = "https://<web server hostname>/server/rest/admin/services/<serviceName>/KnowledgeGraphServer";
KnowledgeGraphModule.fetchKnowledgeGraph(url)
 .then((kg) => {
    //do something with result
   console.log(kg)
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

