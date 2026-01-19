# ParquetLayer

**Module:** `@arcgis/core/layers/ParquetLayer`

## Import

```javascript
import ParquetLayer from "@arcgis/core/layers/ParquetLayer.js";
```

```javascript
// CDN
const ParquetLayer = await $arcgis.import("@arcgis/core/layers/ParquetLayer.js");
```

**Since:** 4.33

## See Also

- Sample - Intro to ParquetLayer
- ParquetLayerView
- Apache Parquet documentation
- Geoparquet documentation
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- effect
- Sample - Point clustering
- Sample - Point clustering with visual variables
- Sample - Filter clustered points
- Sample - Point styles for cities
- Map.tables
- WebMap.tables
- Map.allTables
- WebMap.allTables
- labelsVisible
- fields
- Arcade Feature Z Profile
- ParquetLayerView.availableFields
- fieldUtils
- createPopupTemplate
- View2D
- Styles and data visualization
- SpatialReference.WGS84
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- Sample - Query features from a FeatureLayer
- Query and filter guide
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `ParquetLayer`

### `blendMode`

### `capabilities`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `encoding`

### `featureEffect`

### `featureReduction`

### `fields`

### `fieldsIndex`

### `fullExtent`
- **Type:** `Inherited`

### `geometryType`

### `id`
- **Type:** `Inherited`

### `isTable`

### `labelingInfo`

### `labelsVisible`

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

### `objectIdField`

### `opacity`
- **Type:** `Inherited`

### `orderBy`

### `outFields`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `popupEnabled`

### `popupTemplate`

### `renderer`

### `spatialReference`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `urls`

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

### `fetchAttributionData`
- **Type:** `Inherited`

### `getField`

### `getFieldDomain`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

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

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Add the Parquet files from given urls as a parquet layer.
const layer = new ParquetLayer({
  urls: [
    "url-to-parquet-file1.parquet",
    "url-to-parquet-file2.parquet"
  ]
});
map.add(layer);
```

```javascript
// get parquet layer info from the first Parquet file in the urls array
const urls = ["url-to-your-parquet-file.parquet", "url-to-your-parquet-file2.parquet"];
const info = await parquetUtils.getParquetLayerInfo(urls);
const layer = new ParquetLayer(info);

// create a renderer based on the geometry type
if (info.geometryType === "polygon") {
  const renderer = new SimpleRenderer({
    symbol: {
      type: "simple-fill",
      color: [227, 139, 79, 0.8],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    }
  });
  layer.renderer = renderer;
}
// add the layer to the map
map.add(layer);
```

```javascript
const layer = new ParquetLayer({
   urls: [
     "https://example.com/path/to/parquetfile1.parquet",
     "https://example.com/path/to/parquetfile2.parquet"
   ]
});
mapElement.map.add(layer);  // adds the layer to the map
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

