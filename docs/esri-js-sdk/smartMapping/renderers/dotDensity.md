# dotDensity

**Module:** `@arcgis/core/smartMapping/renderers/dotDensity`

## Import

```javascript
import * as dotDensityRendererCreator from "@arcgis/core/smartMapping/renderers/dotDensity.js";
```

```javascript
// CDN
const dotDensityRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/dotDensity.js");
```

**Since:** 4.12

## Overview

This object contains a helper method for generating a dot density visualization. The createRenderer() method uses the view's background to determine the most appropriate dot color for each attribute. It also queries the layer for spatial statistics to determine an appropriate dot value for the given scale. The starting dot value isn't necessarily what will work best for your data. Rather, it is a suggestion that should give you a good starting point for authoring a dot density renderer. Known Limitations DotDensityRenderer is currently not supported in 3D SceneViews. Only layers with polygon geometries are supported.

## See Also

- Sample - Generate a predominance visualization
- ArcGIS Blog: Creating a predominance visualization with Arcade
- ArcGIS Blog: Map Multiple Attributes at Once using Predominance
- Styles and data visualization

## Property Details

### `createRenderer`

### `RendererResult`


## Method Details

### `Method Details()`


## Examples

```javascript
const layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/USA_County_Crops_2007/FeatureServer/0"
});

// will create a visualization of predominant crop by U.S. county

const params = {
  layer: layer,
  view: view,
  attributes: [{
    field: "M217_07",
    label: "Vegetables"
  }, {
    field: "M188_07",
    label: "Cotton"
  }, {
    field: "M172_07",
    label: "Wheat"
  }, {
    field: "M193_07",
    label: "Soybeans"
  }, {
    field: "M163_07",
    label: "Corn"
  }]
};

// when the promise resolves, apply the renderer to the layer
dotDensityRendererCreator.createRenderer(params)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

