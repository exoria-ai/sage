# summaryStatisticsForAge

**Module:** `@arcgis/core/smartMapping/statistics/summaryStatisticsForAge`

## Import

```javascript
import summaryStatisticsForAge from "@arcgis/core/smartMapping/statistics/summaryStatisticsForAge.js";
```

```javascript
// CDN
const summaryStatisticsForAge = await $arcgis.import("@arcgis/core/smartMapping/statistics/summaryStatisticsForAge.js");
```

**Since:** 4.13

## Overview

Function for generating statistics for the age of features in a layer based on a given start time and end time.

## See Also

- colorRendererCreator.createAgeRenderer
- sizeRendererCreator.createAgeRenderer

## Property Details

### `summaryStatisticsForAge`


## Method Details

### `Method Details()`


## Examples

```javascript
summaryStatisticsForAge({
  layer: featureLayer,
  startTime: "Created_Date",
  endTime: Date.now(),
  unit: "days",
  view: mapView
}).then(function(stats){
  console.log(`Average age of open incidents in days: ${stats.avg}`);
});
```

