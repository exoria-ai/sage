# OutputQuantizationParameters

**Module:** `@arcgis/core/rest/knowledgeGraph/OutputQuantizationParameters`

## Import

```javascript
import OutputQuantizationParameters from "@arcgis/core/rest/knowledgeGraph/OutputQuantizationParameters.js";
```

```javascript
// CDN
const OutputQuantizationParameters = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/OutputQuantizationParameters.js");
```

**Since:** 4.25

## See Also

- GraphQueryStreaming

## Property Details

### `OutputQuantizationParameters`

### `declaredClass`
- **Type:** `Inherited`

### `extent`

### `quantizeMode`

### `tolerance`

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
//sample implementation of an output quantization parameter

//query entities within a bounding box
const query = "MATCH (n) WHERE esri.graph.ST_Intersects($param_filter_geom, n.geometry) RETURN n"

KnowledgeGraphModule.executeQueryStreaming(
  knowledgeGraph,
  {
    openCypherQuery: query,
    bindParameters: {
      param_filter_geom: new Polygon({
        rings: [
          [
            [-89, -89],
            [89, -89],
            [89, 89],
            [-89, 89],
            [-89, -89],
          ],
        ],
      }),
    },
    outputQuantizationParameters: {
      extent: {
        xmax: 30,
        xmin: 20,
        ymax: 30,
        ymin: 20,
      },
      tolerance: 0.001,
      quantizeMode: "view",
    }
   }
  }
);
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

