# pieChart

**Module:** `@arcgis/core/smartMapping/symbology/pieChart`

## Import

```javascript
import * as pieChartSchemes from "@arcgis/core/smartMapping/symbology/pieChart.js";
```

```javascript
// CDN
const pieChartSchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/pieChart.js");
```

**Since:** 4.24

## Overview

Object containing helper methods for getting optimal color schemes used to create pie chart visualizations. The getSchemes() returns color schemes best suited to the given basemap for this visualization style.

## Property Details

### `cloneScheme`

### `getSchemeByName`

### `getSchemes`

### `getSchemesByTag`

### `getThemes`

### `PieChartScheme`

### `PieChartSchemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
const pieChartScheme = primaryScheme.clone();
```

```javascript
// Returns the Flower Field scheme
let flowerFieldScheme = pieChartSchemes.getSchemeByName({
  name: "Flower Field",
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});
```

```javascript
// gets the primary scheme for the features of the given geometry type and basemap
const { primaryScheme, secondarySchemes } = pieChartSchemes.getSchemes({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});

// primaryScheme is the suggested default scheme for the layer and basemap
```

```javascript
let schemes = pieChartSchemes.getSchemesByTag({
  includedTags: [ "types", "reds" ],
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});
```

