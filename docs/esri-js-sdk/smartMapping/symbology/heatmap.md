# heatmap

**Module:** `@arcgis/core/smartMapping/symbology/heatmap`

## Import

```javascript
import * as heatmapSchemes from "@arcgis/core/smartMapping/symbology/heatmap.js";
```

```javascript
// CDN
const heatmapSchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/heatmap.js");
```

**Since:** 4.11

## Overview

Object containing helper methods for generating optimal colors for heatmap visualizations. The getSchemes() method is used to get the heatmap color schemes best suited to the given basemap.

## Property Details

### `cloneScheme`

### `getSchemeByName`

### `getSchemes`

### `getSchemesByTag`

### `getThemes`

### `HeatmapScheme`

### `HeatmapSchemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
let heatmapScheme = primaryScheme.clone();
```

```javascript
// Returns the Heatmap 4 scheme
let heatmapScheme = heatmapSchemes.getSchemeByName({
  basemap: map.basemap,
  name: "Heatmap 4"
});
```

```javascript
// gets the primary scheme for the basemap
let schemes = heatmapSchemes.getSchemes({
  basemap: map.basemap
});

// the best default scheme for the layer, basemap, and theme
let primaryScheme = schemes.primaryScheme;
```

```javascript
// Returns all the heatmap schemes that look good in grayscale
let grayscaleSchemes = heatmapSchemes.getSchemesByTag({
  basemap: map.basemap,
  includedTags: [ "heatmap", "grayscale" ]
});
```

