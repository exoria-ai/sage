# color

**Module:** `@arcgis/core/smartMapping/renderers/color`

## Import

```javascript
import * as colorRendererCreator from "@arcgis/core/smartMapping/renderers/color.js";
```

```javascript
// CDN
const colorRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/color.js");
```

**Since:** 4.2

## Overview

This object contains helper methods for generating data-driven visualizations with continuous color or class breaks based on a field value or expression from features in a Layer. The methods in this module generate renderer or visual variable objects that may be applied directly to a supported layer. The renderers specify how features should be visualized based on data values and colors compatible with the view's background. Known Limitations SceneLayers must have the supportsRenderer and supportsLayerQuery capabilities enabled unless a predefined statistics object is provided to the statistics parameter of the method. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method. You cannot generate renderers and visual variables using SQL expressions for client-side FeatureLayers in a SceneView.

## See Also

- Styles and data visualization

## Property Details

### `createAgeRenderer`

### `createClassBreaksRenderer`

### `createContinuousRenderer`

### `createPCContinuousRenderer`

### `createPCTrueColorRenderer`

### `createVisualVariable`

### `AgeRendererResult`

### `ClassBreaksRendererResult`

### `ContinuousRendererResult`

### `PCContinuousRendererResult`

### `PCTrueColorRendererResult`

### `VisualVariableResult`


## Method Details

### `Method Details()`


## Examples

```javascript
const layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/311_Service_Requests_from_2015_50k/FeatureServer/0"
});

// visualization based age of incidents closed passed their due date
// or the number of days an incident was overdue at the time of closure.

const ageParams = {
  layer: layer,
  view: view,
  startTime: "Due_Date",
  endTime: "Closed_Date",
  unit: "days",
  theme: "above-and-below"
};

// when the promise resolves, apply the renderer to the layer
colorRendererCreator.createAgeRenderer(ageParams)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

```javascript
const layer = new CSVLayer({
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",
  copyright: "USGS Earthquakes"
});

// visualization based off current age of incident
const ageParams = {
  layer: layer,
  view: view,
  startTime: "time",
  endTime: Date.now(),
  legendOptions: {
    title: "Time since earthquake struck"
  }
};

// when the promise resolves, apply the renderer to the layer
colorRendererCreator.createAgeRenderer(ageParams)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

```javascript
let layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// visualization based on field and normalization field
let colorParams = {
  layer: layer,
  view: view,
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY",
  classificationMethod: "quantile",
  numClasses: 4
};

// when the promise resolves, apply the renderer to the layer
colorRendererCreator.createClassBreaksRenderer(colorParams)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

```javascript
let layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// visualization based off Arcade expression
let colorParams = {
  layer: layer,
  valueExpression: "($feature.POP_POVERTY / $feature.TOTPOP_CY) * 100",
  view: view,
  sqlWhere: "TOTPOP_CY > 0",
  legendOptions: {
    title: "% of people living in poverty"
  }
};

// when the promise resolves, apply the renderer to the layer
colorRendererCreator.createClassBreaksRenderer(colorParams)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

```javascript
let layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// visualization based on field and normalization field
let colorParams = {
  layer: layer,
  view: view,
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY",
  theme: "above-and-below"
};

// when the promise resolves, apply the renderer to the layer
colorRendererCreator.createContinuousRenderer(colorParams)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

```javascript
let layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// visualization based off Arcade expression
let colorParams = {
  layer: layer,
  valueExpression: "($feature.POP_POVERTY / $feature.TOTPOP_CY) * 100",
  view: view,
  sqlWhere: "TOTPOP_CY > 0",
  legendOptions: {
    title: "% of people living in poverty"
  }
};

// when the promise resolves, apply the renderer to the layer
colorRendererCreator.createContinuousRenderer(colorParams)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

