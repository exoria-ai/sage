# GraphApplyEdits

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphApplyEdits`

## Import

```javascript
import GraphApplyEdits from "@arcgis/core/rest/knowledgeGraph/GraphApplyEdits.js";
```

```javascript
// CDN
const GraphApplyEdits = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphApplyEdits.js");
```

**Since:** 4.25

## See Also

- Sample - Edit knowledge graph data
- ArcGIS REST APIs - Apply Edits (Graph)
- knowledgeGraphService.executeApplyEdits()
- GraphApplyEditsResult

## Property Details

### `GraphApplyEdits`

### `declaredClass`
- **Type:** `Inherited`

### `entityAdds`

### `entityDeletes`

### `entityUpdates`

### `options`

### `relationshipAdds`

### `relationshipDeletes`

### `relationshipUpdates`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `GraphNamedObjectDeletes`


## Method Details

### `Method Details()`


## Examples

```javascript
// add a new `Supplier` entity
const [knowledgeGraphModule, Entity, GraphApplyEdits] = await $arcgis.import([
  "@arcgis/core/rest/knowledgeGraphService.js",
  "@arcgis/core/rest/knowledgeGraph/Entity.js",
  "@arcgis/core/rest/knowledgeGraph/GraphApplyEdits.js"
]);
const newEntity = new Entity({
  typeName: "Supplier",
  properties: {
    Name: "Supplier 5",
    EmployeeCount: 681
  }
});

KnowledgeGraphModule.executeApplyEdits(
  graph,
  new GraphApplyEdits({
     entityAdds: [newEntity]
   })
).then((editResult) => {
   console.log("Graph Add Result", editResult);
});
```

```javascript
// add multiple new items
const newEntity = new Entity({
  typeName: "Supplier",
  properties: {
    Name: "Supplier 5",
    EmployeeCount: 681
  },
});

const newRelationship = new Relationship({
  typeName: "buys_part",
  properties: {
    quantity: 5000
  },
  // origin and destination entities must already exist in the graph
  originId: "{AN4E4G85-41F1-49A4-8412-CACCC9906E88}",
  destinationId: "{9D2D6AFD-41F1-49A4-8412-1DGR8E5D6S1G4}"
});

KnowledgeGraphModule.executeApplyEdits(graph, {
   entityAdds: [newEntity],
   relationshipAdds: [newRelationship]
})
.then((editResult) => {
  console.log("Graph Add Result", editResult);
});
```

```javascript
// update existing records
const updateEntity = new Entity({
  typeName: "Supplier",
  // update the EmployeeCount from 681 to 685
  properties: {
    Name: "Supplier 5",
    EmployeeCount: 685
  },
  id:"{G1E5G3D4-41F1-49A4-8412-1S5GE8S4D5S1G}" //id of entity already in knowledge graph
});

const updateRelationship = new Relationship({
  typeName: "buys_part",
  // update the quantity from 5000 to 5500
  properties: {
    quantity: 5500
  },
  id: "{MSIGESNG-A1F5-1A8F-3W5F-15A8W4F3S5F8W}" //id of relationship already in knowledge graph
});

KnowledgeGraphModule.executeApplyEdits(graph, {
   entityUpdates: [updateEntity],
   relationshipUpdates: [updateRelationships]
})
.then((editResult) => {
   console.log("Graph Update Result", editResult);
});
```

```javascript
// delete existing records
KnowledgeGraphModule.executeApplyEdits(graph, {
   entityDeletes: [{
     typeName: "Supplier",
     ids: ["{AMGIE541G-41F1-49A4-8412-CACCC9906E88}", "{HNWIGHE15-WH52-2GE6-1A5W-A1F8W4FS3A1S5}"]
   },{
     typeName: "Part",
     ids: ["{FNIW4GF1-ANFW-49A4-ANW7-GNWIGHAF4S51FS}"]
   }],
   relationshipDeletes: [{
     typeName: "Buys_part",
     ids: ["{MH4E54G8E-MF4W-1842-2S44-15AF5W8F4S2W8}"]
   }],
   // delete all relationships connected to the deleted entities.
   options:{
     cascadeDelete: true
   }
})
.then((editResult) => {
  console.log("Graph Delete Result", editResult);
});
```

```javascript
// Basic example results of adding one entity to the `Supplier` entity type
{
  editResults:[{
    adds:[
    {
      id: "{ANWIFLWF-ANFW-49A4-ANW7-GM51GN5G1878}",
      error: false
    }],
    deletes:[],
    typeName: "Supplier",
    updates:[]
  }],
  hasError: false,
  error: undefined
}
```

```javascript
//add a new `Supplier` entity
const newEntity = new Entity({
  typeName: "Supplier",
  properties: {
    Name: "Supplier 5",
    EmployeeCount: 681
  }
});

KnowledgeGraphModule.executeApplyEdits(
  graph, {
    entityAdds: [newEntity],
})
.then((editResult) => {
  console.log("Graph Add Result", editResult);
});
```

