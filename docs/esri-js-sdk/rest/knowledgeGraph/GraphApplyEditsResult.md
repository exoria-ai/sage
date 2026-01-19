# GraphApplyEditsResult

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphApplyEditsResult`

## Import

```javascript
import GraphApplyEditsResult from "@arcgis/core/rest/knowledgeGraph/GraphApplyEditsResult.js";
```

```javascript
// CDN
const GraphApplyEditsResult = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphApplyEditsResult.js");
```

**Since:** 4.25

## See Also

- GraphApplyEdits

## Property Details

### `GraphApplyEditsResult`

### `cascadeProvenanceDeleteResults`

### `cascadeRelationshipDeleteResults`

### `declaredClass`
- **Type:** `Inherited`

### `editResults`

### `error`

### `hasError`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `CascadeProvenanceDeleteResults`

### `CascadeRelationshipDeleteResults`

### `NamedObjectCascadeRelationshipDeleteResults`

### `NamedObjectEditResults`

### `editResultsObject`


## Method Details

### `Method Details()`


## Examples

```javascript
// sample executeApplyEdits() to add a new entity
const newEntity = new Entity({
  typeName: "Supplier",
  properties: {
    Name: "Supplier 5",
    EmployeeCount: 681
  }
})

KnowledgeGraphModule.executeApplyEdits(graph, {
  entityAdds: [newEntity],
})
.then((editResult) => {
  console.log("Graph Add Result", editResult);
});
```

```javascript
// Results of adding one entity to the `Supplier` entity type
{
  editResults:[{
    adds:[
    {
      id: "{AN4E4G85-41F1-49A4-8412-CACCC9906E88}",
      error: {errorCode: 0, errorMessage: ""}
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
// example results of a complex executeApplyEdits that involved
// adding, updating and deleting multiple types.
{
  editResults:[{
    adds:[
    {
      id: "{AN4E4G85-41F1-49A4-8412-CACCC9906E88}",
      error: {errorCode: 0, errorMessage: ""}
    }],
    deletes:[],
    typeName: "Supplier",
    updates:[]
  },{
    adds:[{
      id: "{ANWIFHSAS-AW6F-G9W4-8412-A1A8W4F1A5S6F}",
      error: {errorCode: 0, errorMessage: ""}
    }],
    deletes:[{
      id: "{AN4E4G85-Q15F4-49A4-8412-A1W8F4S6A5S4}",
      error: {errorCode: 0, errorMessage: ""}
    },{
      id: "{AF15W4F8S-A1W5-A1W8F-G1E8-AF1W5F4S8F4W}",
      error: {errorCode: 0, errorMessage: ""}
    }],
    typeName: "Part",
    updates:[{
      id: "{2WS8F4SA-41F1-S1E8-8412-F2G5S4D8GE1S}",
      error: {errorCode: 0, errorMessage: ""}
    }]
  }],
  hasError: false,
  error: undefined
}
```

```javascript
// example of an error message due to misspelled entity type
{
  editResults:[],
  hasError: true,
  error: {
    errorCode: 112020,
    errorMessage: "The Entity/Relationship type definition, Suppplier, was not found."
  }
}
```

```javascript
cascadeProvenanceDeleteResults:[{
    id: "{FB74F4DD-CBD7-4C94-BA89-0C044ECCC273}",
    error: {errorCode: 0, errorMessage: ""}
  }]
```

```javascript
cascadeRelationshipDeleteResults:[{
    typeName: "supplies",
    cascadeRelationshipDeletes: [
      {
        id: "{FB74F4DD-CBD7-4C94-BA89-0C044ECCC273}",
        error: {errorCode: 0, errorMessage: ""}
        originId: "{AN4E4G85-41F1-49A4-8412-CACCC9906E88}",
        destinationId: "{2WS8F4SA-41F1-S1E8-8412-F2G5S4D8GE1S}"
      }
    ]
  }]
```

