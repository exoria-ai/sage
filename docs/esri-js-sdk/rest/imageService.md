# imageService

**Module:** `@arcgis/core/rest/imageService`

## Import

```javascript
import * as imageService from "@arcgis/core/rest/imageService.js";
```

```javascript
// CDN
const imageService = await $arcgis.import("@arcgis/core/rest/imageService.js");
```

**Since:** 4.19

## Overview

Performs various operations on an image service resource: Identify the content of an image service for the input location and mosaic rule. Compute histograms based on the provided ImageHistogramParameters. Compute statistics and histograms for the provided ImageHistogramParameters.

## See Also

- ArcGIS REST API - Compute Angles
- ArcGIS REST API - Compute Pixel Location

## Property Details

### `computeAngles`

### `computeHistograms`

### `computePixelSpaceLocations`

### `computeStatisticsHistograms`

### `findImages`

### `getImageUrl`

### `getSamples`

### `identify`

### `imageToMap`

### `imageToMapMultiray`

### `mapToImage`

### `measureAreaAndPerimeter`

### `measureAreaFromImage`

### `measureDistanceAndAngle`

### `measureHeight`

### `measureLengthFromImage`

### `measurePointOrCentroid`

### `queryBoundary`

### `queryGPSInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
// get all sample points along a polyline
// at the specified sample distance and pixel size
const param = {
  geometry: polyline
  returnFirstValueOnly: false,
  // resolution - unit of the view's spatial reference
  pixelSize: {
    x:12,
    y:12,
    spatialReference: view.spatialReference
  },
  interpolation: "nearest",
  // unit of the geometry's spatial reference is used
  sampleDistance: 30,
  outFields: ["*"]
};
imageService.getSamples(url, param).then((results) => {
  // use the getSamples results as needed.
  console.log(results);
})
.catch(function(error){
  console.log(error)
})
```

