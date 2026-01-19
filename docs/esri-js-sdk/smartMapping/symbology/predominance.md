# predominance

**Module:** `@arcgis/core/smartMapping/symbology/predominance`

## Import

```javascript
import * as predominanceSchemes from "@arcgis/core/smartMapping/symbology/predominance.js";
```

```javascript
// CDN
const predominanceSchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/predominance.js");
```

**Since:** 4.9

## Overview

Object containing helper methods for getting optimal symbol schemes used to create predominance visualizations. The getSchemes() returns color schemes best suited to the given basemap for this visualization style.

## Property Details

### `cloneScheme`

### `getSchemeByName`

### `getSchemes`

### `getSchemesByTag`

### `getThemes`

### `PredominanceScheme`

### `PredominanceSchemeForMesh`

### `PredominanceSchemeForPoint`

### `PredominanceSchemeForPolygon`

### `PredominanceSchemeForPolyline`

### `PredominanceSchemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
const predominanceScheme = primaryScheme.clone();
```

```javascript
// Returns the Flower Field scheme
let flowerFieldScheme = colorSchemes.getSchemeByName({
  name: "Flower Field",
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});
```

```javascript
// gets the primary scheme for the features of the given geometry type and basemap
const schemes = predominanceSchemes.getSchemes({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});

// the best default scheme for the layer and basemap
const primaryScheme = schemes.primaryScheme;
```

```javascript
let schemes = predominanceSchemes.getSchemesByTag({
  includedTags: [ "types" ],
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});
```

