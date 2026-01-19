# GraphSearchStreaming

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphSearchStreaming`

## Import

```javascript
import GraphSearchStreaming from "@arcgis/core/rest/knowledgeGraph/GraphSearchStreaming.js";
```

```javascript
// CDN
const GraphSearchStreaming = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphSearchStreaming.js");
```

**Since:** 4.25

## See Also

- Sample - Search a knowledge graph
- GraphQueryStreamingResult
- knowledgeGraphService.executeSearchStreaming

## Property Details

### `GraphSearchStreaming`

### `declaredClass`
- **Type:** `Inherited`

### `idsFilter`

### `namedTypesFilter`

### `num`

### `returnSearchContext`

### `searchQuery`
- **Type:** `Inherited`

### `start`

### `typeCategoryFilter`
- **Type:** `Inherited`

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
// example GraphSearchStreaming used in a executeSearchStreaming
KnowledgeGraphModule.executeSearchStreaming(
  knowledgeGraph,
  { // autocasts to new GraphSearchStreaming
    searchQuery: "solar",
    typeCategoryFilter: "both",
    returnSearchContext: false,
    start: 1, // index of first record to return
    num: 200, // return 200 records.
    namedTypesFilter: ["Company", "Supplier", "Part"],
    idsFilter: ["{G4E8G2S8D-2GS5-98S4-3S5D-S1DE7G45DS48}",
                     "{FNWI1G5W-1A5W-3A5W-8412-A1W5F4W8F7AS}",
                     "{9D2D6AFD-41F1-49A4-8412-CACCC9906E88}"]
  }
).then((streamingSearchResult)=>{
  // the result of a streaming search is a readableStream which requires decoding.
  readStream(streamingSearchResult)
})
```

```javascript
// a function to read the readable stream returned from the above query
const readStream = async (streamingQueryResult) => {
  let time = Date.now();
  let reader = streamingQueryResult.resultRowsStream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log(`Completed database requests: ${(Date.now() - time) / 1000} seconds`, value);
        break;
      }
      console.log(`Chunk returned in: ${(Date.now() - time) / 1000} seconds`, value)
    }
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Request aborted as expected");
    } else {
      throw err;
    }
  }
};
```

```javascript
// sample result of read streaming search result chunk printed to the console
"Streaming chunk returned in: 0.082 seconds"
[
  [{
    "declaredClass": "esri.rest.knowledgeGraph.Entity",
    "properties": {
      "Name": "Suncommon",
      "Employee_Count": 400,
      "energyType": "solar"
    },
    "typeName": "Company",
    "id": "{G4E8G2S8D-2GS5-98S4-3S5D-S1DE7G45DS48}"
  }],
  [{
    "declaredClass": "esri.rest.knowledgeGraph.Entity",
    "properties": {
      "Name": "Quality Solar Supply",
      "Supplier_code": "158B",
      "City": "New Orleans",
    },
    "typeName": "Supplier",
    "id": "{FNWI1G5W-1A5W-3A5W-8412-A1W5F4W8F7AS}"
  }],
  [{
    "declaredClass": "esri.rest.knowledgeGraph.Entity",
    "properties": {
      "Name": "Solar panel",
      "panel_type": "Polycrystalline",
      "price_per_unit": 400
    },
    "typeName": "Part",
    "id": "{9D2D6AFD-41F1-49A4-8412-CACCC9906E88}"
  }]
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

