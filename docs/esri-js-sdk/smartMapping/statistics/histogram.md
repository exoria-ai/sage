# histogram

**Module:** `@arcgis/core/smartMapping/statistics/histogram`

## Import

```javascript
import histogram from "@arcgis/core/smartMapping/statistics/histogram.js";
```

```javascript
// CDN
const histogram = await $arcgis.import("@arcgis/core/smartMapping/statistics/histogram.js");
```

**Since:** 4.2

## Overview

Generates a histogram based on data in a Layer for a given field. The returned object can be used for displaying a histogram in the UI within visualization authoring applications and analytical apps that query and display statistics. Known Limitations SceneLayers must have the supportsRenderer and supportsLayerQuery capabilities enabled unless a predefined statistics object is provided to the statistics parameter of the method. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method. You cannot generate statistics using SQL expressions for client-side FeatureLayers in a SceneView. The normalizationType parameter only normalizes data returned by a field. It does not apply to values returned from a valueExpression or sqlExpression.

## Property Details

### `histogram`


## Method Details

### `Method Details()`


## Examples

```javascript
histogram({
  layer: featureLayer,
  valueExpression: "( ($feature.POP2020 - $feature.POP2010) / $feature.POP2010 ) * 100"
  view: mapView,
  numBins: 30
}).then(function(histogramResult){
  colorSlider.histogram = histogramResult;
});
```

```javascript
histogram({
  layer: featureLayer,
  field: "Population",
  normalizationType: "natural-log",
  sqlWhere: "Population > 0",
  numBins: 100
}).then(function(histogramResult){
  const histogramWidget = Histogram.fromHistogramResult(histogramResult);
});
```

