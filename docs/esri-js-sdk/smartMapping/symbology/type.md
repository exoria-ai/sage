# type

**Module:** `@arcgis/core/smartMapping/symbology/type`

## Import

```javascript
import * as typeSchemes from "@arcgis/core/smartMapping/symbology/type.js";
```

```javascript
// CDN
const typeSchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/type.js");
```

**Since:** 4.4

## Overview

Object containing helper methods for getting optimal symbol themes used to create data-driven visualizations of unique values or types. The getSchemes() method is used to generate symbol properties best suited to the given basemap.

## Property Details

### `cloneScheme`

### `getSchemeByName`

### `getSchemes`

### `getSchemesByTag`

### `getThemes`

### `PointCloudClassScheme`

### `TypeScheme`

### `TypeSchemeForMesh`

### `TypeSchemeForPoint`

### `TypeSchemeForPolygon`

### `TypeSchemeForPolyline`

### `TypeSchemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
let typeScheme = primaryScheme.clone();
```

```javascript
// Returns the Pastel Dreams scheme
let galaxyBerriesScheme = typeSchemes.getSchemeByName({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType,
  name: "Pastel Dreams"
});
```

```javascript
// gets the primary scheme for the features of the given geometry type and basemap
let schemes = typeSchemes.getSchemes({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});

// the best default scheme for the layer and basemap
let primaryScheme = schemes.primaryScheme;
```

```javascript
// Returns all the red type schemes that are subdued
let schemes = typeSchemes.getSchemesByTag({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType,
  includedTags: [ "types", "subdued" ]
});
```

