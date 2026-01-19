# PointCloudLayer

**Module:** `@arcgis/core/layers/PointCloudLayer`

## Import

```javascript
import PointCloudLayer from "@arcgis/core/layers/PointCloudLayer.js";
```

```javascript
// CDN
const PointCloudLayer = await $arcgis.import("@arcgis/core/layers/PointCloudLayer.js");
```

**Since:** 4.2

## See Also

- Sample - PointCloudLayer Intro
- Sample - PointCloudLayer with renderer
- Sample - PointCloudLayer with intensity color modulation
- Sample - PointCloudLayer with change point size and density
- Sample - PointCloudLayer with filter points
- SceneLayer
- SceneView
- Map
- Item access privileges
- API key guide
- PointCloudLayerView.availableFields
- fieldUtils
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
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

### `PointCloudLayer`

### `apiKey`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `elevationInfo`

### `fields`

### `fieldsIndex`

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

### `outFields`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `renderer`

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

### `createPopupTemplate`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

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

### `queryCachedStatistics`

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
const pointCloudLayer = new PointCloudLayer({
  url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/BARNEGAT_BAY_LiDAR_UTM/SceneServer"
});
```

```javascript
// Typical usage
const pointCloudLayer = new PointCloudLayer({
  url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/BARNEGAT_BAY_LiDAR_UTM/SceneServer"
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
// decode the rgb value with Arcade:
var rgb = $feature.RGB;
var red = Floor(rgb/65536,0);
var green = Floor((rgb-(red*65536))/256,0);
var blue = rgb-(red*65536)-(green*256);
return "rgb(" + red + "," + green + "," + blue + ")";

// decode the returns value with Arcade:
var returnnumber = $feature.RETURNS % 16;
var numberofreturns = Floor($feature.RETURNS / 16)
return returnnumber + " / " + numberofreturns;
```

```javascript
// lookup a field by name. name is case-insensitive
const field = layer.fieldsIndex.get("SoMeFiEld");

if (field) {
  console.log(field.name); // SomeField
}
```

