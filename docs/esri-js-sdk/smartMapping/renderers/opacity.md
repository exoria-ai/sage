# opacity

**Module:** `@arcgis/core/smartMapping/renderers/opacity`

## Import

```javascript
import * as opacityVariableCreator from "@arcgis/core/smartMapping/renderers/opacity.js";
```

```javascript
// CDN
const opacityVariableCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/opacity.js");
```

**Since:** 4.6

## Overview

This object contains a helper method for generating data-driven visualizations with continuous opacity based on data returned from a field value or expression in a Layer. The createVisualVariable() method generates an opacity visual variable with default alpha values that are optimally mapped to data values based on the statistics of the indicated field. Known Limitations SceneLayers must have the supportsRenderer and supportsLayerQuery capabilities enabled unless a predefined statistics object is provided to the statistics parameter of the method. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method. You cannot generate renderers and visual variables using SQL expressions for client-side FeatureLayers in a SceneView.

## See Also

- Styles and data visualization

## Property Details

### `createVisualVariable`

### `VisualVariableResult`


## Method Details

### `Method Details()`


## Examples

```javascript
let layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// visualization based on field and normalization field
let params = {
  layer: layer,
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY"
};

// when the promise resolves, apply the visual variable to the renderer
opacityVariableCreator.createVisualVariable(params)
  .then(function(response){
    let renderer = layer.renderer.clone();
    renderer.visualVariables = [ response.visualVariable ];
    layer.renderer = renderer;
  });
```

```javascript
let layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// visualization based off Arcade expression
let params = {
  layer: layer,
  valueExpression: "($feature.POP_POVERTY / $feature.TOTPOP_CY) * 100",
  view: view,
  valueExpressionTitle: "% of people living in poverty"
};

// when the promise resolves, apply the visual variable to the renderer
opacityVariableCreator.createVisualVariable(params)
  .then(function(response){
    let renderer = layer.renderer.clone();
    renderer.visualVariables = [ response.visualVariable ];
    layer.renderer = renderer;
  });
```

