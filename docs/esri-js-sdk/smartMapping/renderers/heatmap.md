# heatmap

**Module:** `@arcgis/core/smartMapping/renderers/heatmap`

## Import

```javascript
import * as heatmapRendererCreator from "@arcgis/core/smartMapping/renderers/heatmap.js";
```

```javascript
// CDN
const heatmapRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/heatmap.js");
```

**Since:** 4.11

## Overview

This object contains a helper method for generating a HeatmapRenderer for a point Layer. It is important to note that the input layer must have features available in the input view for the createRenderer() method to generate a meaningful heatmap. Otherwise, the method will fail. Known Limitation Only layers with point geometries are supported.

## See Also

- Styles and data visualization
- Sample - Explore point data with a heatmap

## Property Details

### `createRenderer`

### `updateRenderer`

### `HeatmapRendererResult`


## Method Details

### `Method Details()`


## Examples

```javascript
let earthquakeLayer = new FeatureLayer({
  // url to a point dataset
});

// visualization based on field

let heatmapParams = {
  layer: earthquakeLayer,
  view: view,
  field: "magnitude"
};

// when the promise resolves, apply the renderer to the layer
heatmapRendererCreator.createRenderer(heatmapParams)
  .then(function(response){
    earthquakeLayer.renderer = response.renderer;
  });
```

```javascript
const renderer = heatmapRendererCreator.updateRenderer({
  renderer: layer.renderer
  fadeRatio: 0.7
});
layer.renderer = renderer;
```

