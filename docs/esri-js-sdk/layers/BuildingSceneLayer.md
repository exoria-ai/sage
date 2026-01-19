# BuildingSceneLayer

**Module:** `@arcgis/core/layers/BuildingSceneLayer`

## Import

```javascript
import BuildingSceneLayer from "@arcgis/core/layers/BuildingSceneLayer.js";
```

```javascript
// CDN
const BuildingSceneLayer = await $arcgis.import("@arcgis/core/layers/BuildingSceneLayer.js");
```

**Since:** 4.10

## See Also

- Sample - BuildingSceneLayer with Slice widget
- Sample - Filter BuildingScenelayer
- BuildingComponentSublayer
- BuildingGroupSublayer
- SceneLayer
- SceneView
- Map
- Item access privileges
- API key guide
- BuildingComponentSublayer.outFields
- https://github.com/Esri/i3s-spec
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- load
- saveAs()
- save()
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `BuildingSceneLayer`

### `activeFilterId`

### `allSublayers`

### `apiKey`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `elevationInfo`

### `filters`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

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

### `opacity`
- **Type:** `Inherited`

### `outFields`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `portalItem`

### `spatialReference`

### `sublayers`

### `summaryStatistics`

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

### `loadAll`

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
const buildingLayer = new BuildingSceneLayer({
  url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Esri_Admin_Building/SceneServer",
  title: "Administration Building, Redlands - Building Scene Layer"
});
```

```javascript
// Typical usage
layer = new BuildingSceneLayer({
  url: // url to the service
});
```

```javascript
// finds the sublayer containing the doors
// use modelName to identify each layer as this is a standard name
const doorslayer = buildingSceneLayer.allSublayers.find(function(sublayer) {
  return sublayer.modelName === "Doors";
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
// define a floor filter
const buildingFilter = new BuildingFilter({
  filterBlocks: [{
    // an SQL expression that filters using the BldgLevel field
    filterExpression: "BldgLevel = 3"
  }]
});
// set the filter in the filters array on the layer
buildingLayer.filters = [buildingFilter];
// specify which filter is the one that should be applied
buildingLayer.activeFilterId = buildingFilter.id;
```

