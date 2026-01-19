# WCSLayer

**Module:** `@arcgis/core/layers/WCSLayer`

## Import

```javascript
import WCSLayer from "@arcgis/core/layers/WCSLayer.js";
```

```javascript
// CDN
const WCSLayer = await $arcgis.import("@arcgis/core/layers/WCSLayer.js");
```

**Since:** 4.17

## See Also

- Sample - Intro to WCSLayer
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- ImageryTileLayer - working with multidimensional raster data
- Multidimensional Definition REST API doc
- RasterInfo.multidimensionalInfo
- Sample - Multidimensional ImageryTileLayer
- Working with multidimensional data
- createPopupTemplate
- SceneView
- View2D
- Sample - Intro to WCSLayer
- Sample - Intro to ImageryTileLayer
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- hasMultidimensionalTranspose
- Working with multidimensional data
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `WCSLayer`

### `bandIds`

### `blendMode`

### `copyright`

### `coverageId`

### `coverageInfo`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `interpolation`

### `legendEnabled`

### `listMode`
- **Type:** `Inherited`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `maxScale`

### `minScale`

### `multidimensionalDefinition`

### `multidimensionalSubset`

### `noData`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `rasterFields`

### `renderer`

### `serviceRasterInfo`

### `spatialReference`

### `timeExtent`

### `timeInfo`

### `timeOffset`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `url`

### `useViewTime`

### `version`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `createLayerView`
- **Type:** `Inherited`

### `createPopupTemplate`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchPixels`

### `getSamples`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `identify`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `load`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `when`
- **Type:** `Inherited`

### `CoverageDescriptionV100`

### `CoverageDescriptionV110`

### `CoverageDescriptionV201`

### `CoverageInfo`

### `TemporalDomain`


## Method Details

### `Method Details()`


## Examples

```javascript
// Typical usage
let layer = new WCSLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/services/ScientificData/SeaTemperature/ImageServer/WCSServer"
});
```

```javascript
// request for particular images in a mosaic dataset
// Numbers are the object IDs of the image service catalog table
layer.customParameters = {images: "1,2,3"};
```

```javascript
// the following effect will be applied to the layer at all scales
// brightness will be applied first, then hue-rotate followed by contrast
// changing order of the effects will change the final result
layer.effect = "brightness(5) hue-rotate(270deg) contrast(200%)";
```

```javascript
// set a scale dependent bloom effect on the layer
layer.effect = [
  {
    scale: 36978595,
    value: "drop-shadow(3px, 3px, 4px)"
  },
  {
    scale: 18489297,
    value: "drop-shadow(2px, 2px, 3px)"
  },
  {
    scale: 4622324,
    value: "drop-shadow(1px, 1px, 2px)"
  }
];
```

```javascript
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

```javascript
// The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
layer.maxScale = 1000;
```

