# GraphQueryStreamingResult

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphQueryStreamingResult`

## Import

```javascript
import GraphQueryStreamingResult from "@arcgis/core/rest/knowledgeGraph/GraphQueryStreamingResult.js";
```

```javascript
// CDN
const GraphQueryStreamingResult = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphQueryStreamingResult.js");
```

**Since:** 4.25

## See Also

- knowledgeGraphService.executeSearchStreaming()
- knowledgeGraphService.executeQueryStreaming()

## Property Details

### `GraphQueryStreamingResult`

### `declaredClass`
- **Type:** `Inherited`

### `resultRowsStream`

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
// sample executeSearchStreaming that would return a GraphQueryStreamingResult
KnowledgeGraphModule.executeSearchStreaming(
  knowledgeGraph,
  {
    searchQuery: "solar",
    typeCategoryFilter: "entity",
    returnSearchContext: false,
    start: 1, // index of the first record to return
    num: 200, // return 200 records.
    namedTypesFilter: ["Company", "Supplier", "Part"],
    idsFilter: ["{9D2D6AFD-41F1-49A4-8412-CACCC9906E88}",
                      "{25WNN24S-41F1-49A4-8412-ANIWN9906E88}",
                      "{NS51HE8D-41F1-49A4-8412-5HNIRH9906E8}"]
  }
).then((streamingSearchResult)=>{
  // the result of a streaming search is a readableStream which requires decoding.
  readStream(streamingSearchResult)
})
```

```javascript
// the returned readable stream before decoding
{
  resultsRowsStream: {
    locked: true
  }
}
```

```javascript
// sample streaming query using bind parameters
// to search for entities with a the `name` property that matches a specific string
// or have their geometry within a bounding box.
// get all parts bought by each supplier.
// query returns both the supplier and the part it buys.
const query = `MATCH (s:Supplier)-[:buys_part]-(p:Part) RETURN s,p`;

KnowledgeGraphModule.executeQueryStreaming(knowledgeGraph, query})
.then((streamingQueryResult)=>{
  // streaming query returns a readableStream which must be read to access the returned graph data
  readStream(streamingQueryResult);
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
      console.log(`Chunk returned in: ${(Date.now() - time) / 1000} seconds`, value);
      // use the results
      // list the parts bought by each supplier
      let supplierParts = {};
      // each element of the result array will contain one supplier and one part it buys
      for (var v in value){
        let supplier = value[v][0].properties.Name
        let part = value [v][1].properties.Name
        if(!(supplier in supplierParts)){
          supplierParts[supplier] = [];
        }
        // collect parts by supplier that buys them
        supplierParts[supplier].push(part);
        console.log(supplierParts);
        // result printed to the console: {Supplier 1:[Part1], Supplier 3:[Part2, Part3]}
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
// sample result of streaming search result chunk read and printed to the console.
// the reader will continue to return chunks until the stream is complete
// and all matching results are returned

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
    "id": "{25WNN24S-41F1-49A4-8412-ANIWN9906E88}"
  }],
  [{
    "declaredClass": "esri.rest.knowledgeGraph.Entity",
    "properties": {
      "Name": "Quality Solar Supply",
      "Supplier_code": "158B",
      "City": "New Orleans",
    },
    "typeName": "Supplier",
    "id": "{GE5G1E8D-41F1-49A4-8412-QNG5EG48SG8S}"
  }],
  [{
    "declaredClass": "esri.rest.knowledgeGraph.Entity",
    "properties": {
      "Name": "Solar panel",
      "panel_type": "Polycrystalline",
      "price_per_unit": 400
    },
    "typeName": "Part",
    "id": "{9D2D6AFD-41F1-49A4-8412-CACCC9906E88}",
  }]
]
```

```javascript
// example of result decoding.
// execute streaming query on a knowledge graph
kgModule.executeQueryStreaming(
  kg,
  {
    openCypherQuery: "MATCH (n) RETURN n LIMIT 500",
  }
).then((streamingQueryResult) => {
  readStream(streamingQueryResult);
})

//read the ReadableStream result
const readStream = async (streamingQueryResult) => {
  let time = Date.now();
  // create new stream reader
  let reader = streamingQueryResult.resultRowsStream.getReader();
  try {
  // while the stream is returning data
    while (true) {
      const { done, value } = await reader.read();
      // the stream has finished retrieving all matching records from the database
      if (done) {
        console.log("Client Query stream completed");
        break;
      }
      // do something with the result records returned in each chunk
      console.log(
        `Client Query Result at Time ${Date.now() - time}:`,
        value
      );
    }
    // if stream is aborted by user return message, otherwise throw error
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Request aborted as expected");
    } else {
      throw err;
    }
  }
};
```

