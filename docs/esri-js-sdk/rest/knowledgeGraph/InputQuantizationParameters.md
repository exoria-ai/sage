# InputQuantizationParameters

**Module:** `@arcgis/core/rest/knowledgeGraph/InputQuantizationParameters`

## Import

```javascript
import InputQuantizationParameters from "@arcgis/core/rest/knowledgeGraph/InputQuantizationParameters.js";
```

```javascript
// CDN
const InputQuantizationParameters = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/InputQuantizationParameters.js");
```

**Since:** 4.25

## See Also

- GraphQueryStreaming

## Property Details

### `InputQuantizationParameters`

### `declaredClass`
- **Type:** `Inherited`

### `mFalseOrigin`

### `mResolution`

### `xFalseOrigin`

### `xyResolution`

### `yFalseOrigin`

### `zFalseOrigin`

### `zResolution`

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
//sample implementation of an input quantization parameter
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
    inputQuantizationParameters: {
      xyResolution: 0.003,
      xFalseOrigin: 25,
      yFalseOrigin: 25,
      zResolution: 1,
      zFalseOrigin: 1,
      mResolution: 1,
      mFalseOrigin: 1,
    },
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

