# ageUtils

**Module:** `@arcgis/core/smartMapping/statistics/support/ageUtils`

## Import

```javascript
import * as ageUtils from "@arcgis/core/smartMapping/statistics/support/ageUtils.js";
```

```javascript
// CDN
const ageUtils = await $arcgis.import("@arcgis/core/smartMapping/statistics/support/ageUtils.js");
```

**Since:** 4.13

## Overview

Provides utility functions for generating Arcade expressions intended for use in an age renderer.

## See Also

- colorRendererCreator.createAgeRenderer
- sizeRendererCreator.createAgeRenderer

## Property Details

### `getAgeExpressions`

### `AgeExpressionsResult`


## Method Details

### `Method Details()`


## Examples

```javascript
const ageExpressions = ageUtils.getAgeExpressions({
  layer: featureLayer,
  startTime: "Created_Date",
  endTime: Date.now(),
  unit: "days"
});

console.log(`value expression: ${ageExpressions.valueExpression}`);
```

