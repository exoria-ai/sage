# OGCFeatureLayer

**Module:** `@arcgis/core/layers/OGCFeatureLayer`

## Import

```javascript
import OGCFeatureLayer from "@arcgis/core/layers/OGCFeatureLayer.js";
```

```javascript
// CDN
const OGCFeatureLayer = await $arcgis.import("@arcgis/core/layers/OGCFeatureLayer.js");
```

**Since:** 4.16

## See Also

- Sample - OGCFeatureLayer
- OGCFeatureLayerView
- Item access privileges
- API key guide
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
- Sample: Add multiple label classes to a layer
- Sample: Multi-line labels
- Sample: Flat vs. volumetric 3D symbol layers
- limit
- fields
- Arcade Feature Z Profile
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- refresh()
- refresh event
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- refreshInterval
- refresh event
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `OGCFeatureLayer`

### `apiKey`

### `blendMode`

### `collectionId`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `displayField`

### `displayFilterEnabled`

### `displayFilterInfo`

### `effect`

### `elevationInfo`

### `featureEffect`

### `featureReduction`

### `fields`

### `fieldsIndex`

### `fullExtent`
- **Type:** `Inherited`

### `geometryType`

### `id`
- **Type:** `Inherited`

### `labelingInfo`

### `labelsVisible`

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

### `maxRecordCount`

### `maxScale`

### `minScale`

### `objectIdField`

### `opacity`
- **Type:** `Inherited`

### `orderBy`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `refreshInterval`

### `renderer`

### `screenSizePerspectiveEnabled`

### `spatialReference`

### `title`

### `trackInfo`

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

### `createPopupTemplate`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `getField`

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

### `refresh`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Add the "countries" collection from an OGC API Feature server.
const countries = new OGCFeatureLayer({
    url: "https://vtp2.geo-solutions.it/geoserver/ogc/features",
    collectionId: "ne:countries50m"
});
map.add(countries);
```

```javascript
// Add a new OGC Feature Layer to a map.
const layer = new OGCFeatureLayer({
  url: "https://demo.pygeoapi.io/stable",
  collectionId: "dutch_windmills"
});
const map = new Map();
map.add(layer);
```

```javascript
// set the api key to access a protected service
const layer = new FeatureLayer({
  url: serviceUrl,
  apiKey: "YOUR_API_KEY"
});
```

```javascript
// Create a layer from the "topp:states" collection.
const ogcFeatureLayer = new OGCFeatureLayer({
  url: "http://myserver/geoserver/ogc/features",
  collectionId: "topp:states"
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
// Display the description of the layer.
const ogcFeatureLayer = new OGCFeatureLayer({
  url: "http://cloudsdi.geo-solutions.it/geoserver/wfs3",
  collectionId: "topp:states"
});
ogcFeatureLayer.then(function(){
  const description = ogcFeatureLayer.description;
  console.log(description ? description : "No description available");
});
```

