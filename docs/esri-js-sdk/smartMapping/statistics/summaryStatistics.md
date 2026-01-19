# summaryStatistics

**Module:** `@arcgis/core/smartMapping/statistics/summaryStatistics`

## Import

```javascript
import summaryStatistics from "@arcgis/core/smartMapping/statistics/summaryStatistics.js";
```

```javascript
// CDN
const summaryStatistics = await $arcgis.import("@arcgis/core/smartMapping/statistics/summaryStatistics.js");
```

**Since:** 4.2

## Overview

Function for generating attribute statistics in a Layer based on values returned from a given field. Known Limitations SceneLayers must have the supportsRenderer and supportsLayerQuery capabilities enabled unless a predefined statistics object is provided to the statistics parameter of the method. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method. You cannot generate statistics using SQL expressions for client-side FeatureLayers in a SceneView. The normalizationType parameter only normalizes data returned by a field. It does not apply to values returned from a valueExpression or sqlExpression.

## Property Details

### `summaryStatistics`

### `OutStatisticType`

### `SummaryStatisticsResult`


## Method Details

### `Method Details()`


## Examples

```javascript
summaryStatistics({
  layer: featureLayer,
  valueExpression: "( ($feature.POP2020 - $feature.POP2010) / $feature.POP2010 ) * 100"
  view: mapView
}).then(function(stats){
  colorSlider.statistics = stats;
});
```

```javascript
summaryStatistics({
  layer: featureLayer,
  field: "Population",
  normalizationType: "natural-log",
  sqlWhere: "Population > 0",
  numBins: 100
}).then(function(stats){
  histogramWidget.average = stats.avg;
});
```

