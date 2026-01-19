# IntegratedMeshLayer

**Module:** `@arcgis/core/layers/IntegratedMeshLayer`

## Import

```javascript
import IntegratedMeshLayer from "@arcgis/core/layers/IntegratedMeshLayer.js";
```

```javascript
// CDN
const IntegratedMeshLayer = await $arcgis.import("@arcgis/core/layers/IntegratedMeshLayer.js");
```

**Since:** 4.1

## See Also

- Sample - IntegratedMeshLayer
- SceneLayer
- SceneView
- Map
- Item access privileges
- API key guide
- ArcGIS Pro - Modify an integrated mesh layer
- Sample - Integrated mesh modification
- SceneModifications
- SceneModification
- https://github.com/Esri/i3s-spec
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- saveAs()
- save()
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `IntegratedMeshLayer`

### `apiKey`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `elevationInfo`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `layerId`

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

### `modifications`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `portalItem`

### `spatialReference`

### `title`

### `type`

### `uid`
- **Type:** `Inherited`

### `url`

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

### `createLayerView`
- **Type:** `Inherited`

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

### `removeHandles`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const integratedMeshLayer = new IntegratedMeshLayer({
  url: "https://tiles.arcgis.com/tiles/u0sSNqDXr7puKJrF/arcgis/rest/services/Frankfurt2017_v17/SceneServer/layers/0"
});
```

```javascript
// set the api key to access a protected service
const layer = new FeatureLayer({
  url: serviceUrl,
  apiKey: "YOUR_API_KEY"
});
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
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

```javascript
// while these examples use a SceneLayer, the same pattern can be
// used for other layers that may be loaded from portalItem ids

// loads the third layer in the given Portal Item
let layer = new SceneLayer({
  portalItem: {
    id: "73df987984b24094b848d580eb83b0fb"
  },
  layerId: 2
});
```

```javascript
// If not specified, the first layer (layerId: 0) will be returned
let layer = new SceneLayer({
  portalItem: {
    id: "73df987984b24094b848d580eb83b0fb"
  }
});
```

