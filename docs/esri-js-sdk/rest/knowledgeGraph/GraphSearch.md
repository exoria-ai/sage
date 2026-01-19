# GraphSearch

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphSearch`

## Import

```javascript
import GraphSearch from "@arcgis/core/rest/knowledgeGraph/GraphSearch.js";
```

```javascript
// CDN
const GraphSearch = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphSearch.js");
```

**Since:** 4.25

## See Also

- Sample - Search a knowledge graph
- knowledgeGraphService.executeSearch()
- knowledgeGraphService.executeSearchStreaming()

## Property Details

### `GraphSearch`

### `declaredClass`
- **Type:** `Inherited`

### `searchQuery`

### `typeCategoryFilter`

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
//searches for 'solar' in the properties of all entities in the knowledge graph
const knowledgeGraphModule = await $arcgis.import("@arcgis/core/rest/knowledgeGraphService.js");
KnowledgeGraphModule
   .executeSearch(kg, {
     searchQuery: "solar",
     typeCategoryFilter: "entity",
   })
   .then((queryResult) => {
     // do something with the search results
     console.log("Graph Search Result", queryResult);
   });
```

```javascript
//sample return from above search
[{
 "declaredClass": "esri.rest.knowledgeGraph.Entity",
 "properties": {
   "shape": {
     "declaredClass": "esri.geometry.Point",
     "cache": {},
     "hasM": false,
     "hasZ": false,
     "latitude": 53.589000000000009,
     "longitude": -0.9633,
     "type": "point",
     "extent": null,
     "spatialReference": {
       "wkid": 4326
     },
     "x": -0.9633,
     "y": 53.589000000000009
   },
   "Name": "Suncommon",
   "Employee_Count": 400,
   "energyType": "solar"
 },
 "typeName": "Company",
 "id": "156786"
}]
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

