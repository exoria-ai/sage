# size

**Module:** `@arcgis/core/smartMapping/renderers/size`

## Import

```javascript
import * as sizeRendererCreator from "@arcgis/core/smartMapping/renderers/size.js";
```

```javascript
// CDN
const sizeRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/size.js");
```

**Since:** 4.2

## Overview

This object contains helper methods for generating data-driven visualizations with continuous size or class breaks based on a field value or expression from features in a Layer. The methods in this module generate renderer or visual variable objects that may be applied directly to a supported layer. The renderers specify how features should be visualized based on data values and the view's background. Known Limitations Currently, 3D symbols can only be generated for layers with a point geometry type. SceneLayers with mesh geometryType or SceneLayers without the supportsRenderer and supportsLayerQuery capabilities enabled are not supported unless a predefined statistics object is passed to the statistics parameter of the method in conjunction with the layer. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method. You cannot generate renderers and visual variables using SQL expressions for client-side FeatureLayers in a SceneView.

## See Also

- Styles and data visualization

## Property Details

### `createAgeRenderer`

### `createClassBreaksRenderer`

### `createContinuousRenderer`

### `createVisualVariables`

### `updateRendererWithReferenceSize`

### `updateRendererWithSpike`

### `AgeRendererResult`

### `ClassBreaksRendererResult`

### `ContinuousRendererResult`

### `VisualVariableResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// visualization based age of incidents closed passed their due date
// or the number of days an incident was overdue at the time of closure.
const ageParams = {
  layer,
  view,
  startTime: "Due_Date",
  endTime: "Closed_Date",
  unit: "days"
};

// when the promise resolves, apply the renderer to the layer
const { renderer } = await createAgeRenderer(sizeParams);
layer.renderer = renderer;
```

```javascript
// visualization based off current age of incident
const ageParams = {
  layer,
  view,
  startTime: "time",
  endTime: Date.now(),
  legendOptions: {
    title: "Time since earthquake struck"
  }
};

// when the promise resolves, apply the renderer to the layer
const { renderer } = await createAgeRenderer(sizeParams);
layer.renderer = renderer;
```

```javascript
// visualization based on field and normalization field
const sizeParams = {
  layer,
  view,
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY",
  classificationMethod: "quantile",
  numClasses: 4
};

// when the promise resolves, apply the renderer to the layer
const { renderer } = await createClassBreaksRenderer(sizeParams);
layer.renderer = renderer;
```

```javascript
// visualization based off Arcade expression
const sizeParams = {
  layer,
  classificationMethod: "equal-interval",
  valueExpression: "($feature.POP_POVERTY / $feature.TOTPOP_CY) * 100",
  view,
  legendOptions: {
    title: "% of people living in poverty"
  }
};

// when the promise resolves, apply the renderer to the layer
const { renderer } = await createClassBreaksRenderer(sizeParams);
layer.renderer = renderer;
```

```javascript
// visualization based on field and normalization field
const sizeParams = {
  layer,
  view,
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY"
};

// when the promise resolves, apply the renderer to the layer
const { renderer } = await createContinuousRenderer(sizeParams);
layer.renderer = renderer;
```

```javascript
// visualization based off Arcade expression
const sizeParams = {
  layer,
  valueExpression: "($feature.POP_POVERTY / $feature.TOTPOP_CY) * 100",
  view,
  legendOptions: {
    title: "% of people living in poverty"
  },
  theme: "above"
};

// when the promise resolves, apply the renderer to the layer
const { renderer } = await createContinuousRenderer(sizeParams);
layer.renderer = renderer;
```

