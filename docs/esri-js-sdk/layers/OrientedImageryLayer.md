# OrientedImageryLayer

**Module:** `@arcgis/core/layers/OrientedImageryLayer`

## Import

```javascript
import OrientedImageryLayer from "@arcgis/core/layers/OrientedImageryLayer.js";
```

```javascript
// CDN
const OrientedImageryLayer = await $arcgis.import("@arcgis/core/layers/OrientedImageryLayer.js");
```

**Since:** 4.28

## See Also

- OrientedImageryViewer
- Sample - Intro to OrientedImageryLayer
- Sample - OrientedImageryLayer in SceneView
- Layer blending samples
- DisplayFilterInfo
- DisplayFilter
- View.displayFilterEnabled
- displayFilterInfo
- Sample - Scale-dependent DisplayFilter
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
- source
- objectIdField
- Add an array of client-side features
- labelsVisible
- labelingInfo
- fields
- Arcade Feature Z Profile
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- Styles and data visualization
- SpatialReference.WGS84
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- Sample - Select features by rectangle
- Query and filter guide
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `OrientedImageryLayer`

### `blendMode`

### `cameraHeading`

### `cameraHeight`

### `cameraPitch`

### `cameraRoll`

### `copyright`

### `coveragePercent`

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `demPathPrefix`

### `demPathSuffix`

### `depthImagePathPrefix`

### `depthImagePathSuffix`

### `displayField`

### `displayFilterEnabled`

### `displayFilterInfo`

### `effect`

### `elevationInfo`

### `elevationSource`

### `farDistance`

### `featureEffect`

### `featureReduction`

### `fields`

### `fullExtent`
- **Type:** `Inherited`

### `geometryType`

### `horizontalFieldOfView`

### `horizontalMeasurementUnit`

### `id`
- **Type:** `Inherited`

### `imagePathPrefix`

### `imagePathSuffix`

### `imageRotation`

### `labelingInfo`

### `labelsVisible`

### `layerId`

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

### `maximumDistance`

### `minScale`

### `nearDistance`

### `objectIdField`

### `opacity`
- **Type:** `Inherited`

### `orderBy`

### `orientationAccuracy`

### `orientedImageryType`

### `outFields`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `renderer`

### `spatialReference`

### `timeIntervalUnit`

### `title`
- **Type:** `Inherited`

### `type`
- **Type:** `Inherited`

### `uid`
- **Type:** `Inherited`

### `url`

### `verticalFieldOfView`

### `verticalMeasurementUnit`

### `videoPathPrefix`

### `videoPathSuffix`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `clone`

### `createLayerView`
- **Type:** `Inherited`

### `createQuery`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

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

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `removeHandles`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `when`
- **Type:** `Inherited`

### `ConstantElevation`

### `ElevationSource`


## Method Details

### `Method Details()`


## Examples

```javascript
const OrientedImageryLayer = await $arcgis.import("@arcgis/core/layers/OrientedImageryLayer.js");
const layer = new OrientedImageryLayer({
  url: "url-to-oriented-imagery-service"
});
map.add(layer);  // adds the layer to the map
```

```javascript
// points to a hosted Feature Layer with Oriented Imagery Layer as a sub layer in ArcGIS Online
const layer = new OrientedImageryLayer({
  portalItem: {  // autocasts as esri/portal/PortalItem
    id: "2c65c47b75654a078038abae52c58f70"
  }
});
map.add(layer);  // adds the layer to the map
```

```javascript
const layer = new OrientedImageryLayer({
   url: "url-to-image-service"
});
map.add(layer);  // adds the layer to the map
```

```javascript
// point images without cameraHeading to north using camera heading
layer.cameraHeading = 90;
```

```javascript
// Adds value to images without a cameraHeight
layer.cameraHeight = 100;
```

```javascript
// Adds pitch value to images without a cameraPitch
layer.cameraPitch = 90;
```

