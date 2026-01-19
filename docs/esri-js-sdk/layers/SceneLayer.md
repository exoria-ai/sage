# SceneLayer

**Module:** `@arcgis/core/layers/SceneLayer`

## Import

```javascript
import SceneLayer from "@arcgis/core/layers/SceneLayer.js";
```

```javascript
// CDN
const SceneLayer = await $arcgis.import("@arcgis/core/layers/SceneLayer.js");
```

**Since:** 4.0

## See Also

- Sample - Intro to SceneLayer
- Sample - SceneLayer filter and query
- Sample - Highlight SceneLayer
- Sample - Realistic buildings with SceneLayer
- Sample - Generate continuous color visualization for 3D buildings
- Sample - Add edges to a SceneLayer
- Sample - Coloring options for texture buildings
- Sample - SceneLayer attribute editing
- Sample - SceneLayer upload 3D models and applyEdits
- Working with scene layers guide
- 3D object workflows in the SDK
- ArcGIS Blog - Scene Layers and the I3S specification
- 3D Object Layer: A Comprehensive Overview
- 3D Object Layer in ArcGIS Maps SDK for JavaScript
- SceneLayerView
- SceneView
- SimpleRenderer
- Map
- Item access privileges
- API key guide
- Sample - FeatureTable Component
- Sample: Point styles for cities
- SceneFilter
- labelsVisible
- labelingInfo
- fields
- SceneLayerView.availableFields
- fieldUtils
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- queryRelatedFeatures
- Styles and data visualization
- Sample: Point styles for cities
- https://github.com/Esri/i3s-spec
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- capabilities.data.supportsAttachment
- capabilities.operations.supportsQueryAttachments
- FeatureLayer.queryExtent
- FeatureLayer.queryFeatureCount
- FeatureLayer.queryFeatures
- FeatureLayer.queryObjectIds
- relationships property
- relationships property
- saveAs()
- save()
- applyEdits()
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `SceneLayer`

### `apiKey`

### `attributeTableTemplate`

### `capabilities`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `effectiveCapabilities`

### `elevationInfo`

### `excludeObjectIds`

### `featureReduction`

### `fields`

### `fieldsIndex`

### `filter`

### `floorInfo`

### `fullExtent`
- **Type:** `Inherited`

### `geometryType`

### `id`
- **Type:** `Inherited`

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

### `minScale`

### `objectIdField`

### `opacity`
- **Type:** `Inherited`

### `outFields`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`
- **Type:** `Inherited`

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `relationships`

### `renderer`

### `screenSizePerspectiveEnabled`

### `spatialReference`

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

### `applyEdits`

### `cancelLoad`
- **Type:** `Inherited`

### `clone`

### `convertMesh`

### `createLayerView`
- **Type:** `Inherited`

### `createPopupTemplate`

### `createQuery`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `getField`

### `getFieldDomain`

### `getFieldUsageInfo`

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

### `queryAttachments`

### `queryCachedStatistics`

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `queryRelatedFeatures`

### `queryRelatedFeaturesCount`

### `removeHandles`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `when`
- **Type:** `Inherited`

### `Capabilities`

### `ConvertMeshOptions`

### `EditsResult`

### `FeatureIdentifier`


## Method Details

### `Method Details()`


## Examples

```javascript
let sceneLayer = new SceneLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Paris_3D_Local_WSL2/SceneServer/layers/0"
});
```

```javascript
let sceneLayer = new SceneLayer({
 portalItem: {
   id: "b8138adb2ba7479cadba52d382b34c3b"
 }
});
```

```javascript
let symbol = {
  type: "mesh-3d",  // autocasts as new MeshSymbol3D()
  symbolLayers: [{
    type: "fill",  // autocasts as new FillSymbol3DLayer()
    material: { color: "red" }
  }]
};

sceneLayer.renderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: symbol
};
```

```javascript
let layer = new SceneLayer({
 url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Paris_3D_Local_WSL2/SceneServer/layers/0",
 definitionExpression: "Type_Toit = 'plat' AND H_MAX <= 20"
});
```

```javascript
// Typical usage
let layer = new SceneLayer({
  // URL to the service
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Paris_3D_Local_WSL2/SceneServer/layers/0"
});
```

```javascript
// set the api key to access a protected service
const layer = new FeatureLayer({
  url: serviceUrl,
  apiKey: "YOUR_API_KEY"
});
```

