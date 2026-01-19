# classBreaks

**Module:** `@arcgis/core/smartMapping/statistics/classBreaks`

## Import

```javascript
import classBreaks from "@arcgis/core/smartMapping/statistics/classBreaks.js";
```

```javascript
// CDN
const classBreaks = await $arcgis.import("@arcgis/core/smartMapping/statistics/classBreaks.js");
```

**Since:** 4.2

## Overview

Function for generating class breaks for an input field in a FeatureLayer based on a given classification method and normalization type. Known Limitations SceneLayers must have the supportsRenderer and supportsLayerQuery capabilities enabled unless a predefined statistics object is provided to the statistics parameter of the method. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method. You cannot generate statistics using SQL expressions for client-side FeatureLayers in a SceneView.

## Property Details

### `classBreaks`

### `ClassBreak`

### `ClassBreaksResult`


## Method Details

### `Method Details()`


## Examples

```javascript
classBreaks({
  layer: featureLayer,
  field: "COL_DEG",
  normalizationField: "TOT_POP",
  classificationMethod: "quantile",
  numClasses: 5
}).then(function(response){
  // class break infos that may be passed to the
  // constructor of a ClassBreaksRenderer
  let breakInfos = response.classBreakInfos;
});
```

