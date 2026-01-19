# pieChart

**Module:** `@arcgis/core/smartMapping/renderers/pieChart`

## Import

```javascript
import * as pieChartRendererCreator from "@arcgis/core/smartMapping/renderers/pieChart.js";
```

```javascript
// CDN
const pieChartRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/pieChart.js");
```

**Since:** 4.24

## Overview

This object contains a helper method for generating a pie chart for every feature. For example, suppose you have a layer of U.S. counties with fields containing the total sales of various crops: wheat, soybeans, corn, cotton, and vegetables. You can use the createRenderer() method in this module to generate a chart for each feature visualizing the proportion of each crop type for every county. Known Limitations Only supported in 2D MapView. Only supported in layers with point and polygon geometries.

## See Also

- PieChartRenderer

## Property Details

### `createRenderer`

### `createRendererForClustering`

### `ClusterRendererResult`

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
  }],
  includeSizeVariable: true,
  sizeOptimizationEnabled: true,
  shape: "donut"
};

// when the promise resolves, apply the renderer to the layer
const { renderer } = await pieChartRendererCreator.createRenderer(params);
layer.renderer = renderer;
```

```javascript
const { renderer, fields } = await pieChartRendererCreator.createRendererForClustering({
  layer,
  shape: "donut"
});

const featureReduction = {
  type: "cluster",
  renderer,
  fields
};

layer.featureReduction = featureReduction;
```

