# templates

**Module:** `@arcgis/core/smartMapping/popup/templates`

## Import

```javascript
import * as popupTemplateCreator from "@arcgis/core/smartMapping/popup/templates.js";
```

```javascript
// CDN
const popupTemplateCreator = await $arcgis.import("@arcgis/core/smartMapping/popup/templates.js");
```

**Since:** 4.16

## Overview

This object contains helper methods for generating popup templates to be set on a layer. The suggested popup templates will only include information in the popup related to the layer's renderer. For example, the popup template in the image below was generated based on a layer rendered with a predominance renderer coloring census tracks based on the decade in which the most homes were built. This provides a better default popup template than the traditional approach of providing a long table of unformatted values. Suggested default template based on renderer Traditional default

## See Also

- Sample - Generate a predominance visualization
- Sample - Generate a dot density visualization

## Property Details

### `getTemplates`

### `Template`

### `Templates`


## Method Details

### `Method Details()`


## Examples

```javascript
// Sets a suggested popupTemplate on the layer based on its renderer
popupTemplateCreator.getTemplates({
  layer: featureLayer,
  renderer: featureLayer.renderer
}).then(function(popupTemplateResponse){
  if ( popupTemplateResponse.primaryTemplate ){
    featureLayer.popupTemplate = popupTemplateResponse.primaryTemplate.value;
  }
}).catch(function(error){
  console.error(error);
});
```

