# find

**Module:** `@arcgis/core/rest/find`

## Import

```javascript
import * as find from "@arcgis/core/rest/find.js";
```

```javascript
// CDN
const find = await $arcgis.import("@arcgis/core/rest/find.js");
```

**Since:** 4.19

## Overview

Search a map service exposed by the ArcGIS Server REST API based on a string value. The search can be conducted on a single field of a single layer, on many fields of a layer, or on many fields of many layers. Use FindParameters to set the parameters of the method. The result will be an instance of FindResult. Known Limitations The find operation is currently not supported if attempting to be used: in a 3D SceneView with dynamic layers

## See Also

- FindParameters
- FindResult
- Sample - Find

## Property Details

### `find`


## Method Details

### `Method Details()`


## Examples

```javascript
let parameters = new FindParameters({
  layerIds: [0],
  searchFields: ["areaname"],
  outSpatialReference: { wkid: 4326 },
  returnGeometry: true
});
find(url, parameters).then(function(results){
  // Results contain FindResults of search
});
```

