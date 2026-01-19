# TileLayer

**Module:** `@arcgis/core/layers/TileLayer`

## Import

```javascript
import TileLayer from "@arcgis/core/layers/TileLayer.js";
```

```javascript
// CDN
const TileLayer = await $arcgis.import("@arcgis/core/layers/TileLayer.js");
```

**Since:** 4.0

## See Also

- MapImageLayer
- Map
- Intro to TileLayer
- Item access privileges
- API key guide
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
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
- load
- refreshInterval
- refresh event
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `TileLayer`

### `allSublayers`

### `apiKey`

### `attributionDataUrl`

### `blendMode`

### `capabilities`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `fullExtent`

### `hasAttributionData`

### `id`
- **Type:** `Inherited`

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

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `portalItem`

### `refreshInterval`

### `resampling`

### `sourceJSON`

### `spatialReference`

### `sublayers`

### `subtables`

### `tileInfo`

### `tileServers`

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

### `createServiceSublayers`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `fetchTile`

### `findSublayerById`

### `getTileUrl`

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

### `refresh`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const TileLayer = await $arcgis.import("@arcgis/core/layers/TileLayer.js");
let layer = new TileLayer({
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
});
// Add layer to map
```

```javascript
// Typical usage
let layer = new TileLayer({
  // URL points to a cached tiled map service
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
});
```

```javascript
// finds the census tracts sublayer from a parent sublayer of the
// TileLayer containing various census sublayers
let tractsId = 5;
let tracksSublayer = layer.allSublayers.find(function(sublayer){
  return sublayer.id === tracksId;
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
// the following effect will be applied to the layer at all scales
// brightness will be applied first, then hue-rotate followed by contrast
// changing order of the effects will change the final result
layer.effect = "brightness(5) hue-rotate(270deg) contrast(200%)";
```

