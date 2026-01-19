# colorRamps

**Module:** `@arcgis/core/smartMapping/raster/support/colorRamps`

## Import

```javascript
import * as rasterColorRamps from "@arcgis/core/smartMapping/raster/support/colorRamps.js";
```

```javascript
// CDN
const rasterColorRamps = await $arcgis.import("@arcgis/core/smartMapping/raster/support/colorRamps.js");
```

**Since:** 4.29

## Overview

This module provides convenience methods for querying color ramps (arrays of colors) used for raster renderers in the esri/smartMapping/raster/color/renderers modules.

## See Also

- Sample - ImageryTileLayer - shaded relief renderer
- names()
- AlgorithmicColorRamp.algorithm
- Sample - ImageryTileLayer - shaded relief renderer

## Property Details

### `all`

### `byName`

### `createColorRamp`

### `getColorRampName`

### `names`

### `ColorRamp`

### `ColorRampName`


## Method Details

### `Method Details()`


## Examples

```javascript
// returns all raster color ramps available in the JS API
const ramps = colorRamps.all();
```

```javascript
// Renders all color ramps as continuous color ramps in the body of the html
const ramps = colorRamps.all();

ramps.forEach( ramp => {
  const colorRamp = symbolUtils.renderColorRampPreviewHTML(ramp.colors, {
    align: "horizontal"
  });
  body.appendChild(colorRamp);
});
```

```javascript
// returns the colors of the Elevation #1 color ramp
const elevationRamp = colorRamps.byName("Elevation #1");
const colorRampElement = symbolUtils.renderColorRampPreviewHTML(elevationRamp.colors, {
  align: "horizontal"
});
body.appendChild(colorRampElement);
```

```javascript
// returns all color ramp names available in the JS API
const rampNames = colorRamps.names();
```

