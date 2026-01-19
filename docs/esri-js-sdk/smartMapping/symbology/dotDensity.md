# dotDensity

**Module:** `@arcgis/core/smartMapping/symbology/dotDensity`

## Import

```javascript
import * as dotDensitySchemes from "@arcgis/core/smartMapping/symbology/dotDensity.js";
```

```javascript
// CDN
const dotDensitySchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/dotDensity.js");
```

**Since:** 4.12

## Overview

Object containing helper methods for getting optimal symbol schemes used to create dot density visualizations. The getSchemes() returns color schemes best suited to the given basemap for this visualization style.

## Property Details

### `cloneScheme`

### `getSchemeByName`

### `getSchemes`

### `getSchemesByTag`

### `DotDensityScheme`

### `DotDensitySchemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
const dotDensityScheme = primaryScheme.clone();
```

```javascript
// Returns the Galaxy Berries scheme
let galaxyBerriesScheme = dotDensitySchemes.getSchemeByName({
  basemap: map.basemap,
  numColors: 3,
  name: "Galaxy Berries"
});
```

```javascript
// gets the primary scheme for the features of the given geometry type and basemap
const schemes = dotDensitySchemes.getSchemes({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});

// the best default scheme for the layer and basemap
const primaryScheme = schemes.primaryScheme;
```

```javascript
// Returns all the red dot density schemes
let schemes = dotDensitySchemes.getSchemesByTag({
  basemap: map.basemap,
  numColors: 2,
  includedTags: [ "reds", "dot-density" ]
});
```

