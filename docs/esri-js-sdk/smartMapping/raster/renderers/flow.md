# flow

**Module:** `@arcgis/core/smartMapping/raster/renderers/flow`

## Import

```javascript
import * as flowRendererCreator from "@arcgis/core/smartMapping/raster/renderers/flow.js";
```

```javascript
// CDN
const flowRendererCreator = await $arcgis.import("@arcgis/core/smartMapping/raster/renderers/flow.js");
```

**Since:** 4.23

## Overview

This object contains helper methods for generating a FlowRenderer for a Vector-UV or Vector-MagDir ImageryLayer or ImageryTileLayer. The createRenderer method in this module generates a renderer that may be applied directly to the input layer. Known Limitations FlowRenderer is only supported with ImageryTileLayer and ImageryLayer where the source type is Vector-UV or Vector-MagDir.

## Property Details

### `createRenderer`

### `FlowRendererResult`


## Method Details

### `Method Details()`


## Examples

```javascript
const { renderer } = await flowRendererCreator.createRenderer({
  layer,
  view,
  theme: "wave-front",
  flowRepresentation: "flow-to"
});

// renders animated wave-like lines on the raster
layer.renderer = renderer;
```

