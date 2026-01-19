# color

**Module:** `@arcgis/core/smartMapping/symbology/color`

## Import

```javascript
import * as colorSchemes from "@arcgis/core/smartMapping/symbology/color.js";
```

```javascript
// CDN
const colorSchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/color.js");
```

**Since:** 4.2

## Overview

Object containing helper methods for generating optimal symbols for data-driven color visualizations. The getSchemes() method is used to generate symbol properties best suited to the given geometry type and basemap.

## Property Details

### `cloneScheme`

### `flipColors`

### `getMatchingSchemes`

### `getSchemeByName`

### `getSchemes`

### `getSchemesByTag`

### `getThemes`

### `ColorScheme`

### `ColorSchemeForMesh`

### `ColorSchemeForPoint`

### `ColorSchemeForPolygon`

### `ColorSchemeForPolyline`

### `ColorSchemes`

### `Theme`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
let colorScheme = primaryScheme.clone();
```

```javascript
// reverses the order of colors in a primary scheme
// obtained from the getSchemes() method
let flippedScheme = colorSchemes.flipColors(primaryScheme);
```

```javascript
// Returns the Red Extremes 1 scheme
const redExtremesScheme = colorSchemes.getSchemeByName({
  basemapTheme: "light",
  geometryType: featureLayer.geometryType,
  theme: "extremes",
  name: "Red Extremes 1"
});
```

```javascript
// gets the primary scheme for the features of the given geometry type and basemap
let schemes = colorSchemes.getSchemes({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType,
  theme: "extremes"
});

// the best default scheme for the layer, basemap, and theme
let primaryScheme = schemes.primaryScheme;
```

```javascript
// Returns all the red color schemes that are color-blind friendly
let schemes = colorSchemes.getSchemesByTag({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType,
  theme: "extremes",
  includedTags: [ "reds", "colorblind-friendly" ]
});
```

