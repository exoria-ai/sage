# utils

**Module:** `@arcgis/core/renderers/support/utils`

## Import

```javascript
import * as rendererUtils from "@arcgis/core/renderers/support/utils.js";
```

```javascript
// CDN
const rendererUtils = await $arcgis.import("@arcgis/core/renderers/support/utils.js");
```

**Since:** 4.28

## Overview

Various utilities for accessing renderer colors that match to fields, Arcade expressions, or values.

## Property Details

### `getColorsForRendererValues`

### `getColorsFromRenderer`

### `FieldToValueColorMap`

### `ValueToColorMap`


## Method Details

### `Method Details()`


## Examples

```javascript
const fieldToValueColorMap = await rendererUtils.getColorsForRendererValues(renderer);
// Loop through the returned fieldToValueColorMap to access the fields and their matching ValueToColorMap object.
for (const expressionOrField in Object.fromEntries(fieldToValueColorMap)) {
  const valueToColorMap = fieldToValueColorMap.get(expressionOrField);
}
```

```javascript
const fieldToColorMap = await rendererUtils.getColorsFromRenderer(renderer);
// Loop through the returned fieldToColorMap to access the fields and their matching color.
for (const field in Object.fromEntries(fieldToColorMap)) {
  const color = fieldToColorMap.get(field);
}
```

