# relationship

**Module:** `@arcgis/core/smartMapping/symbology/relationship`

## Import

```javascript
import * as relationshipSchemes from "@arcgis/core/smartMapping/symbology/relationship.js";
```

```javascript
// CDN
const relationshipSchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/relationship.js");
```

**Since:** 4.9

## Overview

Object containing helper methods for getting optimal symbol schemes used to create relationship (bivariate choropleth) visualizations. The getSchemes() returns color schemes best suited to the given basemap for this visualization style.

## Property Details

### `cloneScheme`

### `getSchemeByName`

### `getSchemes`

### `getSchemesByTag`

### `getThemes`

### `RelationshipScheme`

### `RelationshipSchemeForMesh`

### `RelationshipSchemeForPoint`

### `RelationshipSchemeForPolygon`

### `RelationshipSchemeForPolyline`

### `RelationshipSchemes`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
const relationshipScheme = primaryScheme.clone();
```

```javascript
// Returns the Blueberry Parfait scheme
let blueberryScheme = relationshipSchemes.getSchemeByName({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType,
  name: "Blueberry Parfait"
});
```

```javascript
// gets the primary scheme for the features of the given geometry type and basemap
const schemes = relationshipSchemes.getSchemes({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType
});

// the best default scheme for the layer and basemap
const primaryScheme = schemes.primaryScheme;
```

```javascript
let schemes = relationshipSchemes.getSchemesByTag({
  basemap: map.basemap,
  geometryType: featureLayer.geometryType,
  includedTags: [ "tritanopia" ],
  excludedTags: [ "grayscale" ]
});
```

