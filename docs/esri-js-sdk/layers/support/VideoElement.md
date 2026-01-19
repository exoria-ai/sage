# VideoElement

**Module:** `@arcgis/core/layers/support/VideoElement`

## Import

```javascript
import VideoElement from "@arcgis/core/layers/support/VideoElement.js";
```

```javascript
// CDN
const VideoElement = await $arcgis.import("@arcgis/core/layers/support/VideoElement.js");
```

**Since:** 4.24

## See Also

- MediaLayer
- Sample - MediaLayer with video

## Property Details

### `VideoElement`

### `content`

### `declaredClass`
- **Type:** `Inherited`

### `georeference`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `opacity`

### `type`

### `video`

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


## Method Details

### `Method Details()`


## Examples

```javascript
// create a video element by setting video param to point to the video file url
// set the geographic location of the video file on the map using an extent
const element = new VideoElement({
  video: "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/videos/hurricanes_aerosol-aug.mp4",
  georeference: new ExtentAndRotationGeoreference({
    extent: new Extent({
      xmin: -150,
      ymin: 1,
      xmax: 20,
      ymax: 80,
      spatialReference: {
        wkid: 4326
      }
    })
  })
});
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
// create a video element by setting video param to point to the video file url
// set the geographic location of the video file on the map using an extent
const element = new VideoElement({
  video: "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/videos/hurricanes_aerosol-aug.mp4",
  georeference: new ExtentAndRotationGeoreference({
    extent: new Extent({
      xmin: -150,
      ymin: 1,
      xmax: 20,
      ymax: 80,
      spatialReference: {
        wkid: 4326
      }
    })
  })
});

// add the video element to the media layer
const layer = new MediaLayer({
  source: [element],
  title: "2017 Hurricanes and Aerosols Simulation",
  copyright: "NASA's Goddard Space Flight Center"
});
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

