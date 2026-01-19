# predominance

**Module:** `@arcgis/core/smartMapping/renderers/predominance`

## Import

```javascript
import * as predominanceRendererCreator from "@arcgis/core/smartMapping/renderers/predominance.js";
```

```javascript
// CDN
const predominanceRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/predominance.js");
```

**Since:** 4.9

## Overview

This object contains a helper method for generating a predominance visualization. Visualizing predominance involves coloring a layer's features based on which attribute among a set of competing numeric attributes wins or beats the others in total count. Common applications of this include visualizing election results, survey results, and demographic majorities. For example, suppose you have a layer of U.S. counties with fields containing the total sales of various crops: wheat, soybeans, corn, cotton, and vegetables. You can use the createRenderer() method in this module to generate a default visualization depicting the winner, or most predominant crop, in each county. The example below depicts the predominant decade in which homes were constructed based on a city's block groups. Known Limitations Currently, 3D symbols can only be generated for layers with a point geometry type. SceneLayers must have the supportsRenderer and supportsLayerQuery capabilities enabled unless a predefined statistics object is provided to the statistics parameter of the method. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method.

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
  fields: [{
    name: "M217_07",
    label: "Vegetables"
  }, {
    name: "M188_07",
    label: "Cotton"
  }, {
    name: "M172_07",
    label: "Wheat"
  }, {
    name: "M193_07",
    label: "Soybeans"
  }, {
    name: "M163_07",
    label: "Corn"
  }],
  includeOpacityInfo: true
};

// when the promise resolves, apply the renderer to the layer
predominanceRendererCreator.createRenderer(params)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

