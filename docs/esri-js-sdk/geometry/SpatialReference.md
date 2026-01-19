# SpatialReference

**Module:** `@arcgis/core/geometry/SpatialReference`

## Import

```javascript
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
```

```javascript
// CDN
const SpatialReference = await $arcgis.import("@arcgis/core/geometry/SpatialReference.js");
```

**Since:** 4.0

## See Also

- Sample - ImageryLayer image coordinate system
- Image coordinate system
- Image space analysis
- ImageryLayer.getCatalogItemICSInfo()
- metersPerUnit

## Property Details

### `SpatialReference`

### `WGS84`

### `WebMercator`

### `declaredClass`
- **Type:** `Inherited`

### `imageCoordinateSystem`

### `isGeographic`

### `isWGS84`

### `isWebMercator`

### `isWrappable`

### `metersPerUnit`

### `unit`

### `wkid`

### `wkt`

### `wkt2`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `equals`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// set the spatial reference of a view to WebMercator using wkid
const view = new SceneView({
  container: "viewDiv",
  map: map,
  spatialReference: {
    wkid: 3857
  }
});
```

```javascript
// set the spatial reference of a geometry
// to WGS84 using the WGS84 property
const point = new Point({
  x: 10.1,
  y: 47.4,
  spatialReference: SpatialReference.WGS84
});
```

```javascript
// returns true if the webMercatorUtils can
// project geometries from WGS84 to Web Mercator
let canProjectWGS84toWebMercator = webMercatorUtils.canProject(SpatialReference.WGS84, SpatialReference.WebMercator);
```

```javascript
// returns true if the webMercatorUtils can
// project geometries from WGS84 to Web Mercator
let canProjectWGS84toWebMercator = webMercatorUtils.canProject(SpatialReference.WGS84, SpatialReference.WebMercator);
```

```javascript
// get image coordinate system of the specified catalog item
// for example Raster.OBJECTID = 1600
layer.getCatalogItemICSInfo(imageId).then(function(info) {
// create a spatialReference object and set its
// imageCoordinateSystem property
 let sr = { // autocasts to esri/geometry/SpatialReference
   imageCoordinateSystem: { id: imageId }
 };

 // Calculate an extent for the mapview based on the image's extent
 // in its original coordinate system
 const width = document.getElementById("viewDiv").getBoundingClientRect().width;
 const height = document.getElementById("viewDiv").getBoundingClientRect().height;
 const newExt = info.icsExtent.clone();
 const scaleFactor = 5;
 newExt.xmin = (newExt.xmin + newExt.xmax - width * scaleFactor) / 2;
 newExt.xmax = newExt.xmin + width * scaleFactor;
 newExt.ymin = (newExt.ymin + newExt.ymax - height * scaleFactor) / 2;
 newExt.ymax = newExt.ymin + height * scaleFactor;
 newExt.spatialReference = sr;

 // set the MapView's spatialReference to the image's coordinate system
 // and the extent to the extent calculated above
 view = new MapView({
   container: "viewDiv",
   map: map,
   spatialReference: sr,
   extent: newExt
 });
});
```

```javascript
// Convert 1 pixel in a MapView to meters
const pixelInMeter = view.resolution * view.spatialReference.metersPerUnit;
```

