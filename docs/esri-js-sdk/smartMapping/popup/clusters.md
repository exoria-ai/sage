# clusters

**Module:** `@arcgis/core/smartMapping/popup/clusters`

## Import

```javascript
import * as clusterPopupTemplateCreator from "@arcgis/core/smartMapping/popup/clusters.js";
```

```javascript
// CDN
const clusterPopupTemplateCreator = await $arcgis.import("@arcgis/core/smartMapping/popup/clusters.js");
```

**Since:** 4.16

## Overview

This object contains helper methods for generating popup templates to be set on a layer's FeatureReductionCluster. The suggested popup templates will include summary information about features in the cluster based on the layer's renderer. For example, in a layer visualizing population, the cluster popup template will include the number of features in the cluster and the average population of features in the cluster. For layers with a UniqueValueRenderer, the popup will include the predominant unique value info of features in the cluster. This module only applies to layers with a point geometry type.

## See Also

- FeatureReductionCluster.popupTemplate
- Sample - Point clustering - generate suggested configuration

## Property Details

### `getTemplates`


## Method Details

### `Method Details()`


## Examples

```javascript
// Sets a suggested popupTemplate on the layer's clusters
clusterPopupTemplateCreator.getTemplates({
  layer: featureLayer,
  renderer: featureLayer.renderer
}).then(function(popupTemplateResponse){
  const featureReduction = featureLayer.featureReduction.clone();
  featureReduction.popupTemplate = popupTemplateResponse.primaryTemplate.value;
  featureLayer.featureReduction = featureReduction;
}).catch(function(error){
  console.error(error);
});
```

