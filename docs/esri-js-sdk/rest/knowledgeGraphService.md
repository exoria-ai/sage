# knowledgeGraphService

**Module:** `@arcgis/core/rest/knowledgeGraphService`

## Import

```javascript
import * as knowledgeGraphService from "@arcgis/core/rest/knowledgeGraphService.js";
```

```javascript
// CDN
const knowledgeGraphService = await $arcgis.import("@arcgis/core/rest/knowledgeGraphService.js");
```

```javascript
// CDN
const knowledgeGraphModule = await $arcgis.import("@arcgis/core/rest/knowledgeGraphService.js");
```

**Since:** 4.25

## Overview

A knowledge graph service is associated with several resources. One resource is a knowledge graph, which contains entities and relationships. Another resource is the data model that defines the entity types and relationship types in the graph. A third resource is the service definition which outlines the capabilities of the service. A knowledge graph service allows users to query both the knowledge graph and the data model. Entities and relationships can be added, updated or deleted from the knowledge graph using executeApplyEdits(). To visualize knowledge graph data on map, see knowledge graph layer. Known Limitations KnowledgeGraphService capabilities in version 4.26 of the SDK for Javascript are only supported against ArcGIS Enterprise version 11.1 and later. KnowledgeGraphService capabilities in version 4.25 of the SDK for Javascript are supported on ArcGIS Enterprise version 11.0 and earlier.

## See Also

- Sample - Search a knowledge graph
- Sample - Query a knowledge graph
- Sample - Edit knowledge graph data
- Sample - Work with KnowledgeGraphLayer
- KnowledgeGraphLayer
- Get started with ArcGIS Knowledge Server
- Hosted Knowledge Graph Service
- Get started with ArcGIS Knowledge (ArcGIS Pro)
- Sample - Edit knowledge graph data
- ArcGIS REST APIs - Apply Edits (Graph)
- GraphApplyEdits
- GraphApplyEditsResult
- Sample - Query a knowledge graph
- GraphQuery
- GraphQueryResult
- ArcGIS REST API - Query (Graph)
- Sample - Query a knowledge graph
- GraphQueryStreaming
- GraphQueryStreamingResult
- ArcGIS REST API - Query (Graph)
- Sample - Search a knowledge graph
- GraphSearch
- GraphQueryResult
- ArcGIS REST API - Search (Graph)
- Sample - Search a knowledge graph
- GraphSearchStreaming
- GraphQueryStreamingResult

## Property Details

### `executeAddGraphFieldIndex`

### `executeAddGraphProperties`

### `executeAddNamedTypes`

### `executeApplyEdits`

### `executeDeleteGraphFieldIndex`

### `executeDeleteGraphProperty`

### `executeDeleteNamedType`

### `executeFindPaths`

### `executeFindPathsAsynchronous`

### `executeQuery`

### `executeQueryStreaming`

### `executeSearch`

### `executeSearchStreaming`

### `executeUpdateGraphProperty`

### `executeUpdateNamedType`

### `executeUpdateSearchIndex`

### `fetchAllClientDataKeys`

### `fetchAsynchronousFindPathsResultData`

### `fetchClientDataAtKeys`

### `fetchKnowledgeGraph`

### `refreshDataModel`

### `CIMFilteredFindPathsError`

### `CIMFilteredFindPathsResultJSON`

### `CIMFilteredFindPathsResultPaths`

### `CIMFilteredFindPathsStatistics`

### `UpdateGraphProperties`

### `UpdateNamedType`


## Method Details

### `Method Details()`


## Examples

```javascript
const knowledgeGraphModule = await $arcgis.import("@arcgis/core/rest/knowledgeGraphService.js");
let knowledgeGraph;
// define url to knowledge graph service
const url = "https://myHostName.domain.com/server/rest/services/Hosted/myServiceName/KnowledgeGraphServer";
// fetch knowledge graph
KnowledgeGraphModule.fetchKnowledgeGraph(url)
  .then((kg) => {
    // do something with result
    knowledgeGraph = kg;
    console.log(knowledgeGraph);
});
```

```javascript
const knowledgeGraphModule = await $arcgis.import("@arcgis/core/rest/knowledgeGraphService.js");

// use fetchKnowledgeGraph() to retrieve the knowledge graph
// define the new entity type
const newEntityType = {
  type: "entity",
  name: "Person",
  properties: [
    {
      name: "nameProp",
      alias: "Name",
      fieldType: "esriFieldTypeString",
      role: "esriGraphPropertyRegular",
    },
  ],
};

// define a new relationship type
const newRelationshipType = {
  type: "relationship",
  name: "knows",
  properties: [
    {
      name: "dateMet",
      fieldType: "esriFieldTypeTimestampOffset",
      role: "esriGraphPropertyRegular",
    },
  ],
  endPoints: [
    {
      originEntityType: "Person",
      destinationEntityType: "Person",
    },
  ],
};

// add the new types, update the data model and get the updated graph.
knowledgeGraphModule.executeAddNamedTypes(graph,
  {
    newEntityTypes: [newEntityType],
    newRelationshipTypes: [newRelationshipType]
  }).then((response) => {
        graph = response.updatedKnowledgeGraph;
  })
```

```javascript
// sample executeApplyEdits() to add a new entity to the `Supplier` entity type
const newEntity = new Entity({
  typeName: "Supplier",
  properties: {
    Name: "Supplier 5",
    EmployeeCount: 681
  }
});
KnowledgeGraphModule.executeApplyEdits(
  graph, {
      entityAdds: [newEntity]
    })
    .then((editResult) => {
      console.log("Graph Add Result", editResult);
    });
});
```

```javascript
// Basic example results of adding one entity to the `Supplier` entity type
{
  editResults:[{
    adds:[
    {
      id: "{A1W5F4A8S-41F1-49A4-8412-ANIWN9906E88}",
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
//update existing records
const updateEntity = new Entity({
  typeName: "Supplier",
  // update the EmployeeCount from 681 to 685
  properties: {
    Name: "Supplier 5",
    EmployeeCount: 685
  },
  id:"{A1W5F4A8S-41F1-49A4-8412-ANIWN9906E88}" //id of entity already in knowledge graph
});
const updateRelationship = new Relationship({
  typeName: "buys_part",
  properties: {
    quantity: 5000
  },
  // origin and destination entities must already exist in the graph
  originId: "{AN4E4G85-41F1-49A4-8412-CACCC9906E88}",
  destinationId: "{9D2D6AFD-41F1-49A4-8412-1DGR8E5D6S1G4}"
});
KnowledgeGraphModule.executeApplyEdits(
  graph, {
      entityUpdates: [updateEntity],
      relationshipUpdates: [updateRelationship]
    })
    .then((editResult) => {
      console.log("Graph Update Result", editResult);
    });
});
```

```javascript
//delete existing records
KnowledgeGraphModule.executeApplyEdits(
  graph, {
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
      //delete all relationships connected to the deleted entities.
      options:{
        cascadeDelete: true
      }
    })
    .then((editResult) => {
      console.log("Graph Delete Result", editResult);
    });
});
```

