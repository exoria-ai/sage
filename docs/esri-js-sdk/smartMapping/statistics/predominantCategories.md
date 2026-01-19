# predominantCategories

**Module:** `@arcgis/core/smartMapping/statistics/predominantCategories`

## Import

```javascript
import predominantCategories from "@arcgis/core/smartMapping/statistics/predominantCategories.js";
```

```javascript
// CDN
const predominantCategories = await $arcgis.import("@arcgis/core/smartMapping/statistics/predominantCategories.js");
```

**Since:** 4.13

## Overview

Function for generating category statistics for a predominance renderer.

## Property Details

### `predominantCategories`

### `PredominantCategoriesResult`


## Method Details

### `Method Details()`


## Examples

```javascript
predominantCategories({
  layer: featureLayer,
  fields: [ "corn_acres", "cotton_acres", "wheat_acres", "soybeans_acres", "vegetables_acres" ],
  view: mapView
}).then(function(stats){
  console.log(stats.predominantCategoryInfos);
});
```

