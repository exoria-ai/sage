# type

**Module:** `@arcgis/core/smartMapping/renderers/type`

## Import

```javascript
import * as typeRendererCreator from "@arcgis/core/smartMapping/renderers/type.js";
```

```javascript
// CDN
const typeRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/type.js");
```

**Since:** 4.4

## Overview

This object contains helper methods for generating data-driven visualizations with unique types (or categories) based on a field value from features in a Layer. The createRenderer() method generates a Renderer object that may be applied directly to the layer used to generate it. This renderer contains unique values with colors best suited to the view's background. Known Limitations SceneLayers must have the supportsRenderer and supportsLayerQuery capabilities enabled unless a predefined statistics object is provided to the statistics parameter of the method. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method. Generating renderers and visual variables using SQL expressions is currently restricted to feature services hosted on ArcGIS Online.

## See Also

- Styles and data visualization

## Property Details

### `createPCClassRenderer`

### `createRenderer`

### `PCClassRendererResult`

### `RendererResult`

### `UniqueValueInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
let layer = new PointCloudLayer({
  url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/BARNEGAT_BAY_LiDAR_UTM/SceneServer"
});

let params = {
  layer: layer,
  field: "CLASS_CODE"
};

// when the promise resolves, apply the renderer to the layer
typeRendererCreator.createPCClassRenderer(params)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

```javascript
let layer = new FeatureLayer({
  portalItem: { id: "5ce5374a461e45bab714b43ffedf151d" }
});

// visualization based on categorical field
let typeParams = {
  layer: layer,
  view: view,
  field: "Party"
};

// when the promise resolves, apply the visual variables to the renderer
typeRendererCreator.createRenderer(typeParams)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

```javascript
let layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// visualization based off Arcade expression
let typeParams = {
  layer: layer,
  valueExpression: "IIF($feature.DEMOCRAT > $feature.REPUBLICAN, 'Democrat', 'Republican', 'Tied')",
  view: view,
  valueExpressionTitle: "Election Winner"
};

// when the promise resolves, apply the visual variables to the renderer
typeRendererCreator.createRenderer(typeParams)
  .then(function(response){
    layer.renderer = renderer;
  });
```

