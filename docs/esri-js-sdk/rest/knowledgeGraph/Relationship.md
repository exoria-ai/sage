# Relationship

**Module:** `@arcgis/core/rest/knowledgeGraph/Relationship`

## Import

```javascript
import Relationship from "@arcgis/core/rest/knowledgeGraph/Relationship.js";
```

```javascript
// CDN
const Relationship = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/Relationship.js");
```

**Since:** 4.25

## See Also

- Entity

## Property Details

### `Relationship`

### `declaredClass`
- **Type:** `Inherited`

### `destinationId`

### `id`
- **Type:** `Inherited`

### `originId`

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
// sample creation of new Relationship object
const [knowledgeGraphModule, Relationship] = await $arcgis.import([
 "@arcgis/core/rest/knowledgeGraphService.js",
 "@arcgis/core/rest/knowledgeGraph/Relationship.js",
]);
const newRelationship = new Relationship({
  typeName: "buys_part",
  properties: {
    quantity: 5000
  },
  destinationId: "{HNEIS053-AW6F-G9W4-8412-MROEJHM25694}",
  originId: "{D1HRH4D3-1RE5-JTRH-1D5F-21TH8HRDHTRS}"
})
```

```javascript
// sample relationship returned as a result of a search or query on a knowledge graph
[{
 "declaredClass": "esri.rest.Relationship.Relationship",
 "originId": "1234",
 "destinationId": "5678",
 "properties": {
   "order_day": "Sunday",
   "quantity": 15000
 },
 "typeName": "buys_part",
 "id": "{ANWIFHSAS-AW6F-G9W4-8412-A1A8W4F1A5S6F}",
}]
```

```javascript
const newRelationship = new Relationship({
  typeName: "buys_part",
  properties: {
    quantity: 5000
  },
  destinationId: "{HNEIS053-AW6F-G9W4-8412-MROEJHM25694}",
  originId: "{D1HRH4D3-1RE5-JTRH-1D5F-21TH8HRDHTRS}"
});
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

```javascript
//two relationships of different relationship types with different properties
[{
  "declaredClass": "esri.rest.Relationship.Relationship",
  "properties": {
    "start_date": "2020-04-17",
    "employee_id": "4589",
    "office": "152 Building A"
  },
  "typeName": "Employed_by",
  "id": "B7889541"
},
{
  "declaredClass": "esri.rest.Relationship.Relationship",
  "properties": {
    "quantity": 125000,
    "frequency": "bi-weekly",
    "contact_person": "Betty White"
  },
  "typeName": "buys_part",
  "id": "B7889541"
}]
```

