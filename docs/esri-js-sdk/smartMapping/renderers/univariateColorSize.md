# univariateColorSize

**Module:** `@arcgis/core/smartMapping/renderers/univariateColorSize`

## Import

```javascript
import * as colorAndSizeRendererCreator from "@arcgis/core/smartMapping/renderers/univariateColorSize.js";
```

```javascript
// CDN
const colorAndSizeRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/univariateColorSize.js");
```

**Since:** 4.2

## Overview

This object contains helper methods for generating data-driven univariate visualizations using both continuous color and continuous size based on a single field value or expression from features in a Layer. The createContinuousRenderer() method generates a Renderer object that may be applied directly to a supported layer. This renderer contains a continuous color and size ramp with optimal colors based on the view's background and mapped to specific break values based on the statistics of the indicated field or expression. Alternately, you can use the createVisualVariable() method to generate a color and a size visual variable with default stops and colors that are optimally chosen based on the statistics of the indicated field. Since thematic size may be difficult to interpret on its own in 3D extrusions, adding a color ramp representing the same data helps effectively communicate the story of the visualization so it's more easily understood by the audience. Known Limitations Currently 3D symbols can only be generated for layers with a point geometry type. SceneLayers with mesh geometryType or SceneLayers without the supportsRenderer and supportsLayerQuery capabilities enabled are not supported unless a predefined statistics object is passed to the statistics parameter of the method in conjunction with the layer. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method. You cannot generate renderers and visual variables using SQL expressions for client-side FeatureLayers in a SceneView.

## See Also

- Styles and data visualization

## Property Details

### `createContinuousRenderer`

### `createVisualVariables`

### `ContinuousRendererResult`

### `VisualVariablesResult`


## Method Details

### `Method Details()`


## Examples

```javascript
const layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// color/size univariate visualization based on field and normalization field
const params = {
  layer: layer,
  view: view,
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY"
};

// when the promise resolves, apply the renderer to the layer
colorAndSizeRendererCreator.createContinuousRenderer(params)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

```javascript
const layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// above-and-below visualization based off Arcade expression
const params = {
  layer: layer,
  valueExpression: "(($feature.votes_2016 - $feature.votes_2012) / $feature.votes_2016) * 100",
  valueExpressionTitle: "Change in votes from 2012-2016",
  view: view,
  theme: "above-and-below",
  colorOptions: {
    isContinuous: false
  },
  symbolOptions: {
    symbolStyle: "arrow"
  }
};

// when the promise resolves, apply the renderer to the layer
colorAndSizeRendererCreator.createContinuousRenderer(params)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

```javascript
const layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// color/size univariate visualization based on field and normalization field
const params = {
  layer: layer,
  view: view,
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY",
  theme: "above"
};

// when the promise resolves, apply the visual variables to the renderer
colorAndSizeRendererCreator.createVisualVariables(params)
  .then(function(response){
    const renderer = layer.renderer.clone();
    renderer.visualVariables = [ response.color.visualVariable, ...response.size.visualVariables ];
    layer.renderer = renderer;
  });
```

```javascript
const layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// visualization based off an Arcade expression
const params = {
  layer: layer,
  view: view,
  valueExpression: "($feature.POP_POVERTY / $feature.TOTPOP_CY) * 100",
  sqlExpression: "( POP_POVERTY / TOTPOP_CY ) * 100"
};

// when the promise resolves, apply the visual variables to the renderer
colorAndSizeRendererCreator.createVisualVariables(params)
  .then(function(response){
    const renderer = layer.renderer.clone();
    renderer.visualVariables = [ response.color.visualVariable, ...response.size.visualVariables ];
    layer.renderer = renderer;
  });
```

