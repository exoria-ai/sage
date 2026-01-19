# ImageryLayer

**Module:** `@arcgis/core/layers/ImageryLayer`

## Import

```javascript
import ImageryLayer from "@arcgis/core/layers/ImageryLayer.js";
```

```javascript
// CDN
const ImageryLayer = await $arcgis.import("@arcgis/core/layers/ImageryLayer.js");
```

**Since:** 4.0

## See Also

- ImageryLayerView
- Sample - Add an ImageryLayer to a map
- Sample - Work with pixelFilter in an ImageryLayer
- Sample - Set a server side raster function
- Sample - ImageryLayer raster function
- Sample - Raster attribute table
- Sample - Image coordinate system
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Mosaic dataset attribute table
- load()
- fields
- ImageryLayer - working with multidimensional raster data
- Sample - Work with pixelFilter in an ImageryLayer
- ImageryLayer - working with multidimensional raster data
- Sample - Work with pixelFilter in an ImageryLayer
- fields
- Sample - Pixel Filter
- createPopupTemplate
- SceneView
- View2D
- Raster functions - ArcGIS REST API
- refresh()
- refresh event
- Sample - Intro to ImageryTileLayer
- Sample - ImageryTileLayer - shaded relief renderer
- Raster info
- Sample - GraphicsLayer with visibilityTimeExtent
- ArcGIS REST API - Compute Pixel Location
- ArcGIS REST API - Compute Angles
- ArcGIS REST API - Compute Pixel Location
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- Sample - ImageryLayer image coordinate system
- Image coordinate system
- Image space analysis
- refreshInterval
- refresh event
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `ImageryLayer`

### `activePresetRendererName`

### `bandIds`

### `blendMode`

### `capabilities`

### `compressionQuality`

### `compressionTolerance`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `defaultMosaicRule`

### `definitionExpression`

### `effect`

### `elevationInfo`

### `fields`

### `fieldsIndex`

### `format`

### `fullExtent`
- **Type:** `Inherited`

### `hasMultidimensions`

### `id`
- **Type:** `Inherited`

### `imageMaxHeight`

### `imageMaxWidth`

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

### `mosaicRule`

### `multidimensionalInfo`

### `multidimensionalSubset`

### `noData`

### `noDataInterpretation`

### `objectIdField`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `pixelFilter`

### `pixelType`

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `presetRenderers`

### `rasterFields`

### `rasterFunction`

### `rasterFunctionInfos`

### `refreshInterval`

### `renderer`

### `screenSizePerspectiveEnabled`

### `serviceRasterInfo`

### `sourceJSON`

### `sourceType`

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

### `calculateVolume`

### `cancelLoad`
- **Type:** `Inherited`

### `clone`

### `computeAngles`

### `computeHistograms`

### `computePixelSpaceLocations`

### `computeStatisticsHistograms`

### `createLayerView`
- **Type:** `Inherited`

### `createPopupTemplate`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `fetchImage`

### `fetchPixels`

### `findImages`

### `generateRasterInfo`

### `getCatalogItemICSInfo`

### `getCatalogItemRasterInfo`

### `getImageUrl`

### `getSamples`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `identify`

### `imageToMap`

### `imageToMapMultiray`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `load`
- **Type:** `Inherited`

### `mapToImage`

### `measureAreaAndPerimeter`

### `measureAreaFromImage`

### `measureDistanceAndAngle`

### `measureHeight`

### `measureLengthFromImage`

### `measurePointOrCentroid`

### `on`
- **Type:** `Inherited`

### `queryBoundary`

### `queryGPSInfo`

### `queryObjectIds`

### `queryRasterCount`

### `queryRasters`

### `redraw`

### `refresh`

### `removeHandles`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `when`
- **Type:** `Inherited`

### `PixelData`

### `PixelFilterFunction`

### `RasterBandStatistics`

### `RasterFunctionInfo`

### `RasterHistogram`

### `measurementValue`


## Method Details

### `Method Details()`


## Examples

```javascript
view.whenLayerView(layer).then(() => {
  // get all time dimension values from the service, create an array of dates
  const windEpochDates = layer.multidimensionalInfo.variables[0].dimensions[0].values;
  const windDates = windEpochDates.map((item) => new Date(item));

  // time slider widget initialization
  // users can visualize daily wind information for all the time dimension available
  const timeSlider = new TimeSlider({
    mode: "instant",
    view: view,
    fullTimeExtent: {
      start: new Date(windDates[0]), // Jan 1, 2011,
      end: new Date(windDates[windDates.length - 1]) // Dec 31, 2011
    },
    // set the stops to match the dates coming from time dimension
    stops: {
      dates: windDates
    }
  });
});
```

```javascript
depthSlider.on(["thumb-change", "thumb-drag"], (delta) => updateRenderer("StdZ", value));
const updateRenderer = promiseUtils.debounce(function (dimensionName, sliderData) {
  // set the depth or StdZ dimension of the layer corresponding to the slider's thumb location
  const multidimensionalDefinition = layer.mosaicRule.multidimensionalDefinition;
  const depthDef = multidimensionalDefinition.find((def) => def.dimensionName === "StdZ");
  if (dimensionName === "StdZ") {
    if (depthDef.values[0] === sliderData.value) {
      return;
    }
    depthDef.values[0] = sliderData.value;
  }
  layer.mosaicRule.multidimensionalDefinition = multidimensionalDefinition;
});
```

```javascript
// Wind speed and direction info for every day of Oct will be available on the layer.
// Users will not be able to access data that falls outside of Oct.
// Only the data intersects the extent will be available to users.
const multidimensionalSubset = new MultidimensionalSubset({
  // extent covering california
  areaOfInterest: new Extent({
    xmax: -12195369.680716056,
    xmin: -14166833.514246799,
    ymax: 5336486.804891889,
    ymin: 3047044.933694898,
    spatialReference: {
      wkid: 102100
    }
  }),
  subsetDefinitions: [
    {
      variableName: "Vector-MagDir",
      dimensionName: "StdTime",
      values: [1412121600000, 1414713600000], // 10/1/14 - 10/31/14
      isSlice: false
    }
  ]
});
layer.multidimensionalSubset = multidimensionalSubset;
```

```javascript
// Typical usage
let layer = new ImageryLayer({
  // URL to the imagery service
  url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer"
});
```

```javascript
// to use a preset renderer
layer.activePresetRenderer = "temperatureRenderer";
```

```javascript
// send a custom parameter to your special service
let layer = new MapImageLayer({
  url: serviceUrl,
  customParameters: {
    "key": "my-special-key"
  }
});
```

