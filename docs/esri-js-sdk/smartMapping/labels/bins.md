# bins

**Module:** `@arcgis/core/smartMapping/labels/bins`

## Import

```javascript
import * as binLabelCreator from "@arcgis/core/smartMapping/labels/bins.js";
```

```javascript
// CDN
const binLabelCreator = await $arcgis.import("@arcgis/core/smartMapping/labels/bins.js");
```

**Since:** 4.27

## Overview

This object contains a helper method for generating default labels to be set on a layer's binning configuration. The default label is based on the FeatureReductionBinning.renderer. In most cases the default label configuration will be the total number of features in the bin. This value will be rounded and formatted (e.g. instead of 2385, the bin label will display 2.4k). This includes secondary labeling schemes you can experiment with using on your bins. This module only applies to layers with a point geometry type.

## See Also

- FeatureReductionBinning.labelingInfo

## Property Details

### `getLabelSchemes`

### `Scheme`

### `Schemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// Sets a suggested label scheme for the binning config based on its renderer
const { primaryScheme } = await binLabelCreator.getLabelSchemes({
  layer: featureLayer
});

const featureReduction = featureLayer.featureReduction.clone();
featureReduction.labelingInfo = primaryScheme.labelingInfo;
featureLayer.featureReduction = featureReduction;
```

