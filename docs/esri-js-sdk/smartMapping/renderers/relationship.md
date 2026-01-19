# relationship

**Module:** `@arcgis/core/smartMapping/renderers/relationship`

## Import

```javascript
import * as relationshipRendererCreator from "@arcgis/core/smartMapping/renderers/relationship.js";
```

```javascript
// CDN
const relationshipRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/relationship.js");
```

**Since:** 4.9

## Overview

This object contains a helper method for creating a renderer for exploring the relationship between two numeric attributes. This is commonly known as a bivariate choropleth visualization. This renderer classifies each variable in either 2, 3, or 4 classes along separate color ramps. One of those ramps is rotated 90 degrees and overlaid on the other to create a 2x2, 3x3, or 4x4 square grid. The x-axis indicates the range of values for one variable, and the y-axis indicates the range for the second variable. The squares running diagonal from the lower left corner to the upper right corner indicate features where the two variables may be related or in agreement with one another. The legend of a relationship renderer resembles a grid of two single-hue sequential color ramps overlaid on each other, forming a third hue along a diagonal line, which indicates where the two variables could potentially be related. The lower right and upper left corners indicate features where one field has high values and the other field low values and vice versa. The image below shows what this style looks like on a map of U.S. counties where the percent of the population diagnosed with Diabetes is compared to the percent of the population that is obese. While this visualization style was originally designed for 2D choropleth maps, it is particularly useful in 3D scenes where bivariate visualizations of color and size would not otherwise be possible since the size of features is reserved for real-world sizes of objects, such as buildings. Therefore, the relationship renderer becomes ideal for creating thematic bivariate visualizations of 3d object SceneLayers. Keep in mind that even if you observe a positive relationship between the two variables of interest, it doesn't mean they are statistically correlated. It also doesn't imply the presence of one variable influences the other. Therefore, this renderer should be used judiciously with some prior knowledge that two variables may likely be related. Known Limitations SceneLayers must have the supportsRenderer and supportsLayerQuery capabilities enabled unless a predefined statistics object is provided to the statistics parameter of the method. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method.

## See Also

- Samples - Generate a relationship visualization
- ArcGIS Blog - What is a Relationship Map?
- ArcGIS Blog - How to Make a Relationship Map in ArcGIS Online
- Bivariate Choropleth Maps: A How-to Guide
- Wikipedia - Bivariate map
- Styles and data visualization

## Property Details

### `createRenderer`

### `updateRenderer`

### `RendererResult`


## Method Details

### `Method Details()`


## Examples

```javascript
const layer = new FeatureLayer({
  url: "https://services.arcgis.com/..."
});

// will create a bivariate choropleth visualization exploring the relationship
// between the % of the population classified as obese, and the %
// of the population diagnosed with diabetes

const params = {
  layer: layer,
  view: view,
  field1: {
    field: "POP_Diabetes",
    normalizationField: "TOTAL_POP"
  },
  field2: {
    field: "POP_Obesity",
    normalizationField: "TOTAL_POP"
  },
  focus: "HH",
  defaultSymbolEnabled: false
};

// when the promise resolves, apply the renderer to the layer
relationshipRendererCreator.createRenderer(params)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

