# worldToImage

**Module:** `@arcgis/core/layers/orientedImagery/transformations/worldToImage`

## Import

```javascript
import * as worldToImage from "@arcgis/core/layers/orientedImagery/transformations/worldToImage.js";
```

```javascript
// CDN
const worldToImage = await $arcgis.import("@arcgis/core/layers/orientedImagery/transformations/worldToImage.js");
```

**Since:** 4.31

## Overview

Provides the utility function to convert geographic coordinates to image coordinates. This function is currently utilized in the Oriented Imagery widget to extract image coordinates for the map-image location tool and for constructing the current footprint generated for the images displayed in the oriented imagery widget.

## See Also

- OrientedImageryLayer
- OrientedImageryViewer
- Sample - Creating an OrientedImageryLayer

## Property Details

### `worldToImage`

### `PixelLocation`

### `WorldToImageProperties`


## Method Details

### `Method Details()`


## Examples

```javascript
const point = new Point({
   x: -13045967.713,
   y: 4036342.97,
   z: 0,
   spatialReference: SpatialReference.WebMercator,
});

const properties = {
   affineTransformations: [2015.5, 1, 0, 1511.5, 0, -1],
   cameraLocation: new Point({
     x: -13045995.27,
     y: 4036379.178,
     z: 1.549999952,
     spatialReference: SpatialReference.WebMercator,
     }),
   horizontalFieldOfView: 65.47045135,
   imageHeight: 3024,
   imageWidth: 4032,
   rotationMatrix: [
     -0.6710996455056446, 4.539564596921633e-17, -0.7413671599161904,
     -0.7413671599161904, -4.1093001638870556e-17, 0.6710996455056446,
      0, 1, 6.123233995736766e-17
    ],
   verticalFieldOfView: 46.39718246,
};

const imageLocation = worldToImage(point, properties);

console.log(imageLocation);
```

