# size

**Module:** `@arcgis/core/smartMapping/symbology/size`

## Import

```javascript
import * as sizeSchemes from "@arcgis/core/smartMapping/symbology/size.js";
```

```javascript
// CDN
const sizeSchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/size.js");
```

**Since:** 4.2

## Overview

Object containing helper methods for generating optimal symbols for data-driven size visualizations. The getSchemes() method is used to generate symbol properties best suited to the given geometry type and basemap.

## Property Details

### `cloneScheme`

### `getSchemes`

### `getThemes`

### `SizeScheme`

### `SizeSchemeForPoint`

### `SizeSchemeForPolygon`

### `SizeSchemeForPolyline`

### `SizeSchemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
let sizeScheme = primaryScheme.clone();
```

```javascript
// gets the primary scheme for the features of the given geometry type and basemap
let schemes = sizeSchemes.getSchemes({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});

// the best default scheme for the layer and basemap
let primaryScheme = schemes.primaryScheme;
```

