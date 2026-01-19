# location

**Module:** `@arcgis/core/smartMapping/symbology/location`

## Import

```javascript
import * as locationSchemes from "@arcgis/core/smartMapping/symbology/location.js";
```

```javascript
// CDN
const locationSchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/location.js");
```

**Since:** 4.2

## Overview

Object containing helper methods for generating optimal symbols for location-only visualizations. The getSchemes() method is used to generate symbol properties best suited to the given geometry type and basemap.

## Property Details

### `cloneScheme`

### `getSchemes`

### `getThemes`

### `LocationScheme`

### `LocationSchemeForMesh`

### `LocationSchemeForPoint`

### `LocationSchemeForPolygon`

### `LocationSchemeForPolyline`

### `LocationSchemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
let locationScheme = primaryScheme.clone();
```

```javascript
// gets the primary scheme for the features of the given geometry type and basemap
let schemes = locationSchemes.getSchemes({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});

// the best default scheme for the layer, basemap, and theme
let primaryScheme = schemes.primaryScheme;
```

