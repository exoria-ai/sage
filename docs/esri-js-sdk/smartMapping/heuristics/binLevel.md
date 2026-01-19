# binLevel

**Module:** `@arcgis/core/smartMapping/heuristics/binLevel`

## Import

```javascript
import binLevel from "@arcgis/core/smartMapping/heuristics/binLevel.js";
```

```javascript
// CDN
const binLevel = await $arcgis.import("@arcgis/core/smartMapping/heuristics/binLevel.js");
```

**Since:** 4.25

## Overview

Function that suggests a fixedBinLevel in a FeatureReductionBinning visualization. Known Limitations This function is not intended for use in 3D SceneViews.

## Property Details

### `binLevel`


## Method Details

### `Method Details()`


## Examples

```javascript
const fixedBinLevel = await binLevel({ view });
layer.featureReduction = {
  type: "binning",
  fixedBinLevel,
  //  ...otherBinningProperties
};
```

