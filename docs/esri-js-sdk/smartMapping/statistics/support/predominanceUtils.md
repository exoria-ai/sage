# predominanceUtils

**Module:** `@arcgis/core/smartMapping/statistics/support/predominanceUtils`

## Import

```javascript
import * as predominanceUtils from "@arcgis/core/smartMapping/statistics/support/predominanceUtils.js";
```

```javascript
// CDN
const predominanceUtils = await $arcgis.import("@arcgis/core/smartMapping/statistics/support/predominanceUtils.js");
```

**Since:** 4.23

## Overview

Provides utility functions for generating Arcade and SQL expressions intended for use in an predominance renderer.

## See Also

- predominance renderer

## Property Details

### `getPredominanceExpressions`

### `OpacityExpressionInfo`

### `PredominantExpressions`

### `SQLExpressionInfo`

### `SizeExpressionInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
const predominanceExpressions = predominanceUtils.getPredominanceExpressions({
  layer: featureLayer,
  fields: ["Corn", "Wheat", "Soybeans", "Vegetables", "Cotton"]
});

console.log(`value expression for getting the predominant category from the given fields: ${predominanceExpressions.predominantCategory.valueExpression}`);
```

