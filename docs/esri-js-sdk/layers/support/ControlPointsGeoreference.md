# ControlPointsGeoreference

**Module:** `@arcgis/core/layers/support/ControlPointsGeoreference`

## Import

```javascript
import ControlPointsGeoreference from "@arcgis/core/layers/support/ControlPointsGeoreference.js";
```

```javascript
// CDN
const ControlPointsGeoreference = await $arcgis.import("@arcgis/core/layers/support/ControlPointsGeoreference.js");
```

**Since:** 4.25

## See Also

- Sample - MediaLayer with control points
- ImageElement.georeference
- VideoElement.georeference

## Property Details

### `ControlPointsGeoreference`

### `controlPoints`

### `declaredClass`
- **Type:** `Inherited`

### `height`

### `type`

### `width`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toMap`

### `toSource`

### `ControlPoint`

### `SourcePoint`


## Method Details

### `Method Details()`


## Examples

```javascript
// the spatial reference for the MediaLayer, North American Datum 1927
const spatialReference = new SpatialReference({ wkid: 4267 });

// create an array of four control points composed of a sourcePoint, a point
// on the image element in pixels, and a mapPoint which is the location of the
// sourcePoint in map space
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

// georeference for the imageElement using the control points,
// image width, and image height
const georeference = new ControlPointsGeoreference({ controlPoints, width: 1991, height: 2500 });

const imageElement = new ImageElement({
    image: "https://jsapi.maps.arcgis.com/sharing/rest/content/items/1a3df04e7d734535a3a6a09dfec5a6b2/data",
    georeference
});

// create a MediaLayer using the georeferenced ImageElement
const mediaLayer = new MediaLayer({
    source: [imageElement],
    title: "Geologic Map of the Telluride Quadrangle, Southwestern Colorado",
    copyright: "Wilbur S Burbank and Robert G. Luedke, 1966",
    opacity: 0.5,
    spatialReference
});
```

```javascript
const swCorner = {
    sourcePoint: { x: 80, y: 1732 },
    mapPoint: new Point({ x: -107.875, y: 37.875, spatialReference })
};

const neCorner = {
   sourcePoint: { x: 1353, y: 99 },
   mapPoint: new Point({ x: -107.75, y: 38, spatialReference })
};

const controlPoints = [swCorner, neCorner];
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

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

```javascript
const mapPoint = controlPointGeoreference.toMap({x: 100, y: 250})
```

