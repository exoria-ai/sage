# location

**Module:** `@arcgis/core/smartMapping/renderers/location`

## Import

```javascript
import * as locationRendererCreator from "@arcgis/core/smartMapping/renderers/location.js";
```

```javascript
// CDN
const locationRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/renderers/location.js");
```

**Since:** 4.2

## Overview

This object contains helper methods for generating location-only visualizations (not data-driven) in a Layer. The createRenderer() method generates a SimpleRenderer object that may be applied directly to the layer. This renderer contains a single symbol with a color optimally selected based on the background of the view.

## See Also

- Styles and data visualization

## Property Details

### `createRenderer`

### `RendererResult`


## Method Details

### `Method Details()`


## Examples

```javascript
let layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
});

// simple visualization to indicate features with a single symbol
let params = {
  layer: layer,
  view: view
};

// when the promise resolves, apply the renderer to the layer
locationRendererCreator.createRenderer(params)
  .then(function(response){
    layer.renderer = response.renderer;
  });
```

