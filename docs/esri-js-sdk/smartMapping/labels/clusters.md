# clusters

**Module:** `@arcgis/core/smartMapping/labels/clusters`

## Import

```javascript
import * as clusterLabelCreator from "@arcgis/core/smartMapping/labels/clusters.js";
```

```javascript
// CDN
const clusterLabelCreator = await $arcgis.import("@arcgis/core/smartMapping/labels/clusters.js");
```

**Since:** 4.16

## Overview

This object contains a helper method for generating default labels to be set on a layer's cluster configuration. The default label is based on the layer's renderer. In most cases the default label configuration will be the total number of features in the cluster. This value will be rounded and formatted (e.g. instead of 2385, the cluster label will display 2.4k). In some cases, such as renderers with a SizeVariable, the default label will display the average value of the attribute represented by the size variable. This includes secondary labeling schemes you can experiment with in your clusters. This module only applies to layers with a point geometry type.

## See Also

- FeatureReductionCluster.labelingInfo
- Sample - Point clustering - generate suggested configuration

## Property Details

### `getLabelSchemes`

### `Scheme`

### `Schemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// Sets suggested labels on the clusters based on the underlying renderer
clusterLabelCreator.getLabelSchemes({
  layer: featureLayer,
  view: view
}).then(function(labelSchemes){
  const featureReduction = featureLayer.featureReduction.clone();
  const { labelingInfo, clusterMinSize } = labelSchemes.primaryScheme;
  featureReduction.labelingInfo = labelingInfo;
  featureReduction.clusterMinSize = clusterMinSize;

  featureLayer.featureReduction = featureReduction;
}).catch(function(error){
  console.error(error);
});
```

