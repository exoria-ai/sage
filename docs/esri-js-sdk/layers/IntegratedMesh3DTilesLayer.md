# IntegratedMesh3DTilesLayer

**Module:** `@arcgis/core/layers/IntegratedMesh3DTilesLayer`

## Import

```javascript
import IntegratedMesh3DTilesLayer from "@arcgis/core/layers/IntegratedMesh3DTilesLayer.js";
```

```javascript
// CDN
const IntegratedMesh3DTilesLayer = await $arcgis.import("@arcgis/core/layers/IntegratedMesh3DTilesLayer.js");
```

**Since:** 4.29

## See Also

- Sample - IntegratedMesh3DTilesLayer
- SceneView
- IntegratedMeshLayer
- Map
- Item access privileges
- API key guide
- ArcGIS Pro - Modify an integrated mesh layer
- SceneModifications
- SceneModification
- Sample - Integrated mesh modification
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `IntegratedMesh3DTilesLayer`

### `apiKey`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `elevationInfo`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

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

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const integratedMesh3DTilesLayer = new IntegratedMesh3DTilesLayer({
  url: "https://tiles.arcgis.com/tiles/0z60TleH1Y2qkUzY/arcgis/rest/services/Stuttgart_WGS84/3DTilesServer/tileset.json"
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
// The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
layer.maxScale = 1000;
```

```javascript
// The layer's visibility is not restricted to a maximum scale.
layer.maxScale = 0;
```

