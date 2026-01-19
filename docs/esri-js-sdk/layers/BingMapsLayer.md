# BingMapsLayer

**Module:** `@arcgis/core/layers/BingMapsLayer`

## Import

```javascript
import BingMapsLayer from "@arcgis/core/layers/BingMapsLayer.js";
```

```javascript
// CDN
const BingMapsLayer = await $arcgis.import("@arcgis/core/layers/BingMapsLayer.js");
```

**Since:** 4.8

## See Also

- Map
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- refresh()
- refresh event
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom BlendLayer
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- Sample - Custom BlendLayer
- Sample - Custom LERC Layer
- refreshInterval
- refresh event
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `BingMapsLayer`

### `bingLogo`

### `blendMode`

### `copyright`

### `culture`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `fullExtent`
- **Type:** `Inherited`

### `hasAttributionData`

### `id`
- **Type:** `Inherited`

### `key`

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
- **Type:** `Inherited`

### `minScale`
- **Type:** `Inherited`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `refreshInterval`
- **Type:** `Inherited`

### `region`

### `spatialReference`
- **Type:** `Inherited`

### `style`

### `tileInfo`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `addResolvingPromise`
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

### `fetchTile`
- **Type:** `Inherited`

### `getTileBounds`
- **Type:** `Inherited`

### `getTileUrl`
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

### `refresh`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let bing = new BingMapsLayer({
  style: "aerial",
  key: "~~~~~~~~~~~~~~~~~~~~~~~~ Bing Maps key ~~~~~~~~~~~~~~~~~~~~~~~~~"
});

let map = new Map({
  basemap: {
    baseLayers: [bing]
  }
});

let view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 3,
  center: [0, 45]
});
```

```javascript
// With a valid key this snippet will create a Bing maps layer that can be added to a map.
let bing = new BingMapsLayer({
  style: "aerial",
  key: "~~~~~~~~~~~~~~~~~~~~~~~~ Bing maps key ~~~~~~~~~~~~~~~~~~~~~~~~~"
});
```

```javascript
// To change the default culture.
let bing = new BingMapsLayer({
  key: "~~~~~~~~~~~~~~~~~~~~~~~~ Bing maps key ~~~~~~~~~~~~~~~~~~~~~~~~~",
  culture: "fr"
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

```javascript
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

