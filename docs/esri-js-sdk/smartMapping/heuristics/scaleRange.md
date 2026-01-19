# scaleRange

**Module:** `@arcgis/core/smartMapping/heuristics/scaleRange`

## Import

```javascript
import scaleRange from "@arcgis/core/smartMapping/heuristics/scaleRange.js";
```

```javascript
// CDN
const scaleRange = await $arcgis.import("@arcgis/core/smartMapping/heuristics/scaleRange.js");
```

**Since:** 4.12

## Overview

Function for determining suggested min and max scale ranges for an input layer. Known Limitations Input SceneLayers must meet the following conditions: SceneLayers without the supportsRenderer and supportsLayerQuery capabilities enabled, unless a predefined statistics object is passed to the statistics parameter of the method in conjunction with the layer. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method.

## Property Details

### `scaleRange`

### `ScaleRangeResult`


## Method Details

### `Method Details()`


## Examples

```javascript
scaleRange({
  layer: featureLayer,
  view: view
}).then(function(response){
  // apply the suggested scale range to the input layer
  featureLayer.minScale = response.minScale;
  featureLayer.maxScale = response.maxScale;

  view.map.add(featureLayer);
});
```

