# colorRamps

**Module:** `@arcgis/core/smartMapping/symbology/support/colorRamps`

## Import

```javascript
import * as colorRamps from "@arcgis/core/smartMapping/symbology/support/colorRamps.js";
```

```javascript
// CDN
const colorRamps = await $arcgis.import("@arcgis/core/smartMapping/symbology/support/colorRamps.js");
```

**Since:** 4.14

## Overview

This module provides convenience methods for querying color ramps (arrays of colors) used in the smart mapping color symbology module.

## See Also

- color

## Property Details

### `all`

### `byName`

### `byTag`

### `names`

### `ColorRamp`


## Method Details

### `Method Details()`


## Examples

```javascript
// returns all color ramps available in the JS API
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
// returns the colors of the Flower Field color ramp
const flowerFieldRamp = colorRamps.byName("Flower Field");
const colorRamp = symbolUtils.renderColorRampPreviewHTML(flowerFieldRamp.colors, {
  align: "horizontal"
});
body.appendChild(colorRamp);
```

```javascript
// returns all bright red color ramps available in the JS API
const ramps = colorRamps.byTag({
  includedTags: [ "reds", "bright" ]
});
```

```javascript
// returns all color ramp names available in the JS API
const rampNames = colorRamps.names();
```

