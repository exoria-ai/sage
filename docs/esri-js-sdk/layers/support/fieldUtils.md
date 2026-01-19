# fieldUtils

**Module:** `@arcgis/core/layers/support/fieldUtils`

## Import

```javascript
import * as fieldUtils from "@arcgis/core/layers/support/fieldUtils.js";
```

```javascript
// CDN
const fieldUtils = await $arcgis.import("@arcgis/core/layers/support/fieldUtils.js");
```

**Since:** 4.11

## Overview

Convenience methods for getting field names used for feature layer labeling, elevation, editor tracking and time span.

## See Also

- Arcade - expression language

## Property Details

### `getDisplayFieldName`

### `getElevationFields`

### `getExpressionFields`

### `getFeatureEditFields`

### `getFeatureGeometryFields`

### `getLabelingFields`

### `getRendererFields`

### `getTimeFields`


## Method Details

### `Method Details()`


## Examples

```javascript
const windDirectionExpression = `
  $feature["WIND_DIRECT"];
  $feature["WIND_SPEED"];
  var DEG = $feature.WIND_DIRECT;
  var SPEED = $feature.WIND_SPEED;
  var DIR = When( SPEED == 0, "",
    (DEG < 22.5 && DEG >= 0) || DEG > 337.5, "N",
    DEG >= 22.5 && DEG < 67.5, "NE",
    DEG >= 67.5 && DEG < 112.5, "E",
    DEG >= 112.5 && DEG < 157.5, "SE",
    DEG >= 157.5 && DEG < 202.5, "S",
    DEG >= 202.5 && DEG < 247.5, "SW",
    DEG >= 247.5 && DEG < 292.5, "W",
    DEG >= 292.5 && DEG < 337.5, "NW", "" );
  return SPEED + " mph " + DIR;
`;

const labelExpressions = [
  "Round($feature.TEMP) + '° F';",
  "$feature.R_HUMIDITY + '% RH'",
  "$feature.STATION_NAME",
  windDirectionExpression
];

// Assume the layer has only requested the OBJECTID field
fieldUtils.getExpressionFields(layer, labelExpressions)
 .then(function(fieldNames){

  // fieldNames = ["R_HUMIDITY", "STATION_NAME", "TEMP", "WIND_DIRECT", "WIND_SPEED"]
  layer.outFields = fieldNames;

  // Do something else like a client-side query with those fields
 }).catch(function(error){
   console.error(error);
 });
```

```javascript
const rendererFields = fieldUtils.getRendererFields(layer.renderer, layer.fieldsIndex);
```

