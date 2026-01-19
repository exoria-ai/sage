# imageToWorld

**Module:** `@arcgis/core/layers/orientedImagery/transformations/imageToWorld`

## Import

```javascript
import * as imageToWorld from "@arcgis/core/layers/orientedImagery/transformations/imageToWorld.js";
```

```javascript
// CDN
const imageToWorld = await $arcgis.import("@arcgis/core/layers/orientedImagery/transformations/imageToWorld.js");
```

**Since:** 4.31

## Overview

Provides the utility function to convert image coordinates to geographic coordinates. This function is currently utilized in the Oriented Imagery widget to extract geographic world locations in the map-image location tool and for constructing the current footprint generated for the images displayed in the oriented imagery widget.

## See Also

- OrientedImageryLayer
- OrientedImageryViewer
- Sample - Creating an OrientedImageryLayer

## Property Details

### `imageToWorld`

### `ImageToWorldProperties`

### `PixelLocation`

### `UpdateElevationProps`

### `UpdateElevationPropsWithConstant`

### `UpdateElevationPropsWithSampler`


## Method Details

### `Method Details()`


## Examples

```javascript
const pixel = {
   x: 2601.062988,
   y: 1297.00708,
   };

const properties: {
   affineTransformations: [2015.5, 1, 0, 1511.5, 0, -1],
   averageElevation: 0,
   cameraLocation: new Point({
     x: -13045995.27,
     y: 4036379.178,
     z: 1.549999952,
     spatialReference: SpatialReference.WebMercator,
   }),
   cameraPitch: 90,
   cameraRoll: 0,
   farDistance: 30,
   horizontalFieldOfView: 65.47045135,
   imageHeight: 3024,
   imageWidth: 4032,
   rotationMatrix: [
     -0.6710996455056446, 4.539564596921633e-17, -0.7413671599161904,
     -0.7413671599161904, -4.1093001638870556e-17, 0.6710996455056446,
      0, 1, 6.123233995736766e-17
    ],
   verticalFieldOfView: 46.39718246,
},

const groundLocation = imageToWorld(pixel, properties);
console.log(imageLocation);
```

