# ImageElement

**Module:** `@arcgis/core/layers/support/ImageElement`

## Import

```javascript
import ImageElement from "@arcgis/core/layers/support/ImageElement.js";
```

```javascript
// CDN
const ImageElement = await $arcgis.import("@arcgis/core/layers/support/ImageElement.js");
```

**Since:** 4.24

## See Also

- MediaLayer
- Sample - MediaLayer with images

## Property Details

### `ImageElement`

### `animationOptions`

### `content`

### `declaredClass`
- **Type:** `Inherited`

### `georeference`

### `image`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `opacity`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `removeHandles`
- **Type:** `Inherited`

### `when`

### `AnimationOptions`


## Method Details

### `Method Details()`


## Examples

```javascript
// add a new imageElement and use extent and rotation
// to place the element on the map.
const imageElement = new ImageElement({
  image: "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/neworleans1891.png",
  georeference: new ExtentAndRotationGeoreference({
    extent: new Extent({
      spatialReference: {
        wkid: 102100
      },
      xmin: -10047456.27662979,
      ymin: 3486722.2723874687,
      xmax: -10006982.870152846,
      ymax: 3514468.91365495
    })
  })
});
```

```javascript
imageElement.animationOptions = {
  playing: true,
  duration: 10,
  repeatType: "loop",
  repeatDelay: 0
};
```

```javascript
// create a new ExtentAndRotationGeoreference
const geoReference = new ExtentAndRotationGeoreference({
  extent: new Extent({
    spatialReference: {
      wkid: 102100
    },
    xmin: -10047456.27662979,
    ymin: 3486722.2723874687,
    xmax: -10006982.870152846,
    ymax: 3514468.91365495
  })
});
const imageElement = new ImageElement({
  image: "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/new-orleans/neworleans1891.png",
  georeference: geoReference
});
```

```javascript
// create a canvas image element by setting its corner points of the bounding box
const canvasElement = new ImageElement({
  image: canvas,
  georeference: new CornersGeoreference({
    bottomRight: new Point({
      x: -121.369,
      y: 45.061
    }),
    bottomLeft: new Point({
      x: -122.363,
      y: 45.061
    }),
    topRight: new Point({
      x: -121.369,
      y: 45.678
    }),
    topLeft: new Point({
      x: -122.363,
      y: 45.678
    })
  })
});
```

```javascript
// georeference an ImageElement, using ControlPointsGeoreference in the
// North American Datum 1927 spatial reference
const spatialReference = new SpatialReference({ wkid: 4267 });
const swCorner = {
    sourcePoint: { x: 80, y: 1732 },
    mapPoint: new Point({ x: -107.875, y: 37.875, spatialReference })
};

const nwCorner = {
    sourcePoint: { x: 75, y: 102 },
    mapPoint: new Point({ x: -107.875, y: 38, spatialReference })
};

const neCorner = {
   sourcePoint: { x: 1353, y: 99 },
   mapPoint: new Point({ x: -107.75, y: 38, spatialReference })
};

const seCorner = {
   sourcePoint: { x: 1361, y: 1721 },
   mapPoint: new Point({ x: -107.75, y: 37.875, spatialReference })
};

const controlPoints = [swCorner, nwCorner, neCorner, seCorner];

const georeference = new ControlPointsGeoreference({ controlPoints, width: 1991, height: 2500 });

const imageElement = new ImageElement({
    image: "https://jsapi.maps.arcgis.com/sharing/rest/content/items/1a3df04e7d734535a3a6a09dfec5a6b2/data",
    georeference
});
```

```javascript
// create an image element pointing url of the image file
const stHelen = new ImageElement({
  image: "https://ubatsukh.github.io/arcgis-js-api-demos/data/nasa/mount_st_helens.jpeg",
  georeference: new CornersGeoreference({
    extent: new Extent({
      spatialReference: {
        wkid: 102100
      },
      xmax: -13544247.66023844,
      xmin: -13659744.009977184,
      ymax: 5858405.227033072,
      ymin: 5767445.163373847
    })
  })
});
```

