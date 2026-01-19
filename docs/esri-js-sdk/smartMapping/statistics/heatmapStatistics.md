# heatmapStatistics

**Module:** `@arcgis/core/smartMapping/statistics/heatmapStatistics`

## Import

```javascript
import heatmapStatistics from "@arcgis/core/smartMapping/statistics/heatmapStatistics.js";
```

```javascript
// CDN
const heatmapStatistics = await $arcgis.import("@arcgis/core/smartMapping/statistics/heatmapStatistics.js");
```

**Since:** 4.8

## Overview

Function for generating statistics from a Layer for a HeatmapRenderer visualization. It is important to note that the input layer must have features available in the input view for the heatmapStatistics() method to generate pixel intensity statistics. Known Limitations Only layers with point geometries are supported.

## Property Details

### `heatmapStatistics`

### `HeatmapStatisticsResult`


## Method Details

### `Method Details()`


## Examples

```javascript
heatmapStatistics({
  layer: featureLayer,
  view: mapView
}).then(function(stats){
  // `stats` contains statistics used to construct a heatmap renderer
});
```

