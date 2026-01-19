# Path

**Module:** `@arcgis/core/rest/knowledgeGraph/Path`

## Import

```javascript
import Path from "@arcgis/core/rest/knowledgeGraph/Path.js";
```

```javascript
// CDN
const Path = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/Path.js");
```

**Since:** 4.25

## Property Details

### `Path`

### `declaredClass`
- **Type:** `Inherited`

### `path`

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
KnowledgeGraphModule.executeQuery(
 knowledgeGraph, //graph
 {
   //query returning path from `a` to `c` with any intermediary entity
   openCypherQuery: "MATCH q = (a)-->()-->(c) RETURN q LIMIT 1",
  }).then((queryResult) => {
    //do something with the result
   //console.log(queryResult.ResultRows)
});
```

```javascript
//sample output from the above query
[{
 "declaredClass": "esri.rest.knowledgeGraph.Path",
 "path": [
     {// entity `a`
      "declaredClass": "esri.rest.knowledgeGraph.Entity",
      "properties": {
       "name": "ABC Contractors",
       "CompanyType": "Construction",
     },
     "typeName": "Company",
     "id": "C1234"
   },
   { //relationship `a-b`
     "declaredClass": "esri.rest.Relationship.Relationship",
     "originID": "C1234",
     "destinationID": "S444",
     "properties": {
        "contract_expiration_date": "2025-05-26",
        "contact_person": "Jon Doe"
     },
     "typeName": "supplied_by",
     "id": "SB001"
   },
   { //entity `b`
    "declaredClass": "esri.rest.knowledgeGraph.Entity",
     "properties": {
       "objectid": 1,
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
       "Employee_Count": 400,
       "Name": "Quality Metal Supply",
     },
     "typeName": "Supplier",
     "id": "S444",
   },
   { //relationship `b-c`
     "declaredClass": "esri.rest.Relationship.Relationship",
     "originID": "S444",
     "destinationID": "P789",
     "properties": {
       "frequency": "2 weeks",
       "quantity": 125000,
     },
     "typeName": "buys_part",
     "id": "BP456"
   },
   {// entity `c`
     "declaredClass": "esri.rest.knowledgeGraph.Entity",
     "properties": {
       "Name": "steel plate",
       "width": "15cm",
       "height": "10cm"
     },
     "typeName": "Part",
     "id": "P789"
   }
 ]
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

