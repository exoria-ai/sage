# uniqueValues

**Module:** `@arcgis/core/smartMapping/statistics/uniqueValues`

## Import

```javascript
import uniqueValues from "@arcgis/core/smartMapping/statistics/uniqueValues.js";
```

```javascript
// CDN
const uniqueValues = await $arcgis.import("@arcgis/core/smartMapping/statistics/uniqueValues.js");
```

**Since:** 4.4

## Overview

A function that queries for unique values from a field in a Layer. Known Limitations SceneLayers must have the supportsRenderer and supportsLayerQuery capabilities enabled unless a predefined statistics object is provided to the statistics parameter of the method. To check a SceneLayer's capabilities, use the getFieldUsageInfo() method. You cannot generate unique values using SQL expressions for client-side FeatureLayers in a SceneView.

## Property Details

### `uniqueValues`

### `UniqueValuesResult`


## Method Details

### `Method Details()`


## Examples

```javascript
let layer = new FeatureLayer({
  portalItem: { id: "5ce5374a461e45bab714b43ffedf151d" }
});

uniqueValues({
  layer: layer,
  field: "Candidate"
}).then(function(response){
  // prints each unique value and the count of features containing that value
  let infos = response.uniqueValueInfos;
  infos.forEach(function(info){
    console.log("CANDIDATE: ", info.value, " # OF CAMPAIGN STOPS: ", info.count);
  });
});
```

