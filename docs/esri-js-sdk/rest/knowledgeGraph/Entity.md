# Entity

**Module:** `@arcgis/core/rest/knowledgeGraph/Entity`

## Import

```javascript
import Entity from "@arcgis/core/rest/knowledgeGraph/Entity.js";
```

```javascript
// CDN
const Entity = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/Entity.js");
```

```javascript
// CDN
const [knowledgeGraphModule, Entity] = await $arcgis.import([
   "@arcgis/core/rest/knowledgeGraphService.js",
   "@arcgis/core/rest/knowledgeGraph/Entity.js",
]);
```

**Since:** 4.25

## See Also

- Relationship
- EntityType

## Property Details

### `Entity`

### `declaredClass`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `properties`
- **Type:** `Inherited`

### `typeName`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
//create a new entity
const [knowledgeGraphModule, Entity] = await $arcgis.import([
   "@arcgis/core/rest/knowledgeGraphService.js",
   "@arcgis/core/rest/knowledgeGraph/Entity.js",
]);
const newEntity = new Entity({
  typeName: "Supplier",
  properties: {
    Name: "Supplier 5",
    EmployeeCount: 681
  }
});
```

```javascript
//searches for 'solar' in the properties of all entities in a knowledge graph
const KnowledgeGraphModule = await $arcgis.import(
  "@arcgis/core/rest/knowledgeGraphService.js"
);
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
//example of a return from the above search, printed to the console.
{
 resultRows: [{
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
  "id": ""{9D2D6AFD-41F1-49A4-8412-CACCC9906E88}","
 }]
}
```

```javascript
// create a new entity object
const newEntity = new Entity({
    typeName: "Supplier",
    properties: {
      Name: "Supplier 5",
      EmployeeCount: 681
    }
s});
```

```javascript
//example of properties structure that includes geometry
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
  "Address": "123 Broadway, New York, New York",
  "EnergyType": "solar"
}
```

```javascript
//two entities of different entity types with different properties
[{
  "declaredClass": "esri.rest.knowledgeGraph.Entity",
  "properties": {
    "Name": "Suncommon",
    "Employee_Count": 400,
    "energyType": "solar"
  },
  "typeName": "Company",
  "id": "1256"
},
{
  "declaredClass": "esri.rest.knowledgeGraph.Entity",
  "properties": {
    "Name": "Empire State Building",
    "height": 1454,
    "heightUnits": "feet",
    "city": "New York"
  },
  "typeName": "Building",
  "id": "B7889541"
}]
```

