# ImageryTileLayer

**Module:** `@arcgis/core/layers/ImageryTileLayer`

## Import

```javascript
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer.js";
```

```javascript
// CDN
const ImageryTileLayer = await $arcgis.import("@arcgis/core/layers/ImageryTileLayer.js");
```

**Since:** 4.16

## See Also

- Sample - Intro to ImageryTileLayer
- Sample - ImageryTileLayer - shaded relief renderer
- Sample - Transposed multidimensional ImageryTileLayer
- Sample - Multidimensional ImageryTileLayer
- Cached image services
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- ImageryTileLayer - working with multidimensional raster data
- Multidimensional Definition REST API doc
- RasterInfo.multidimensionalInfo
- Sample - Multidimensional ImageryTileLayer
- Working with multidimensional data
- ImageryTileLayerView
- Raster pixel value fields
- createPopupTemplate
- SceneView
- View2D
- REST API Raster function objects
- List of client-side raster function
- rasterFunctionConstants
- Sample - Intro to ImageryTileLayer
- Sample - ImageryTileLayer - shaded relief renderer
- Sample - Transposed multidimensional ImageryTileLayer
- Sample - FlowRenderer
- Sample - FlowRenderer with Blending and Effects
- Sample - FlowRenderer in a 3D scene
- Sample - FlowRenderer with elevation modes
- Creating ImageryTileLayer from CoverageJSON
- Referencing Cloud Optimized GeoTiff URL
- Creating ImageryTileLayer from CoverageJSON
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

### `ImageryTileLayer`

### `activePresetRendererName`

### `bandIds`

### `blendMode`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `elevationInfo`

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

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `presetRenderers`

### `rasterFields`

### `rasterFunction`

### `renderer`

### `screenSizePerspectiveEnabled`

### `serviceRasterInfo`

### `source`

### `sourceJSON`

### `spatialReference`

### `tileInfo`

### `timeExtent`

### `timeInfo`

### `timeOffset`

### `title`

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

### `clone`

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

### `fetchPixels`

### `fetchTile`

### `generateRasterInfo`

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

### `RasterIdentifyOptions`

### `RasterIdentifyResult`

### `RasterSliceValue`


## Method Details

### `Method Details()`


## Examples

```javascript
// reference an tiled image service via the ImageryTileLayer.url
const ImageryTileLayer = await $arcgis.import("@arcgis/core/layers/ImageryTileLayer.js");
const layer = new ImageryTileLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Toronto/ImageServer"
});
map.add(layer);
```

```javascript
const layer = new ImageryTileLayer({
  portalItem: {
    id: "1fb9eae319e54c74a13e2a8135015c41"
  }
});
map.add(layer);
```

```javascript
const layer = new ImageryTileLayer({
  url: "https://ss6imagery.arcgisonline.com/imagery_sample/landsat8/Bolivia_LC08_L1TP_001069_20190719_MS.tiff",
  bandIds: [3, 2, 1]
});
```

```javascript
const layer = new ImageryTileLayer({
  url: "link-to-coveragejson.covjson"
});
map.add(layer);
```

```javascript
const layer = new ImageryTileLayer({
  source:{
    type: "Coverage",
    domain: {
      type: "Domain",
      domainType: "Grid",
      axes: {
        x: { values: [-10, -5, 0] },
        y: { values: [40, 50] },
        t: { values: ["2010-01-01T00:12:20Z"] }
      },
      referencing: [
        {
          coordinates: ["x", "y"],
          system: {
            type: "GeographicCRS",
            id: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
          }
        },
        {
          coordinates: ["t"],
          system: {
            type: "TemporalRS",
            calendar: "Gregorian"
          }
        }
      ]
    },
    parameters: {
      ...
    },
    ranges: {
      LC: {
        type: "NdArray",
        dataType: "integer",
        axisNames: ["t", "y", "x"],
        shape: [1, 2, 3],
        values: [1, 1, null, 2, 1, 2]
      }
    }
  }
});
map.add(layer);
```

```javascript
view.whenLayerView(layer).then(() => {
  // get all time dimension values from the service, create an array of dates
  const windEpochDates = layer.serviceRasterInfo.multidimensionalInfo.variables[0].dimensions[0].values;
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

