# sizeRange

**Module:** `@arcgis/core/smartMapping/heuristics/sizeRange`

## Import

```javascript
import sizeRange from "@arcgis/core/smartMapping/heuristics/sizeRange.js";
```

```javascript
// CDN
const sizeRange = await $arcgis.import("@arcgis/core/smartMapping/heuristics/sizeRange.js");
```

**Since:** 4.12

## Overview

Function for determining the suggested minSize and maxSize of a scale-dependent size visual variable. Known Limitations This function is not intended for use in 3D SceneViews.

## Property Details

### `sizeRange`

### `SizeRangeResult`


## Method Details

### `Method Details()`


## Examples

```javascript
sizeRange({
  layer: featureLayer,
  view: view
}).then(function(response){

  // update the minSize and maxSize of a size visual variable
  // on a layer's renderer to be scale-dependent
  const renderer = featureLayer.renderer.clone();
  const sizeVariable = renderer.visualVariables.filter( vv => vv.type === "size")[0].clone();
  sizeVariable.minSize = response.minSize;
  sizeVariable.maxSize = response.maxSize;

  renderer.visualVariables = [ sizeVariable ];
  featureLayer.renderer = renderer;
});
```

