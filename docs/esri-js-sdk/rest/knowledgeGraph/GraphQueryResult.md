# GraphQueryResult

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphQueryResult`

## Import

```javascript
import GraphQueryResult from "@arcgis/core/rest/knowledgeGraph/GraphQueryResult.js";
```

```javascript
// CDN
const GraphQueryResult = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphQueryResult.js");
```

**Since:** 4.25

## See Also

- knowledgeGraphService.executeQuery()
- knowledgeGraphService.executeSearch()

## Property Details

### `GraphQueryResult`

### `declaredClass`
- **Type:** `Inherited`

### `resultRows`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `GraphAnyValue`


## Method Details

### `Method Details()`


## Examples

```javascript
// Example of GraphQueryResult.resultRows returned from a
// `MATCH (n:Supplier)-[r]->(m) RETURN [n.id, n.geometry, n, r, m], {var1: n}`
// query on a knowledge graph that contains supply chain information
KnowledgeGraphModule.executeQuery(
 knowledgeGraph, //graph
 { //searchArguments
   openCypherQuery: "MATCH (n:Supplier)-[r]->(m) RETURN [n.id, n.geometry, n, r, m], {var1: n}",
  }).then((queryResult) => {
    //do something with the result
   console.log(queryResult)
});
```

```javascript
//sample result of the above query
"resultRows": [
 [ //array of result types that meet query criteria
   [ //single return type that matches query return format.
     1111,
     "Point",
     {  //Supplier Entity
       "properties": {
         "Name": "Queen City Steel",
       },
       "typeName": "Supplier",
       "id": "1111"
     },
     { // 'supplies' relationship between Supplier and Plant
       "destinationId": "1111",
       "originId": "1236",
       "properties": {
         "material_supplied": "steel"
       },
       "typeName": "supplies",
       "id": "A268",
     },
     { //destination entity of 'supplies' for supplier 1111
       "properties": {
         "Name": "Sky Manufacturing",
       },
       "typeName": "Plant",
       "id": "1236"
     }
   ],
   {  // anonymous object returned by the `{var1:n}` query parameter
     "properties": {
       "var1": { //the entity (n) returned in the var1 object
         "properties": {
           "Name": "Queen City Steel",
       },
         "typeName": "Supplier",
         "id": "1111"
       }
     }
   }
 ]
]
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

