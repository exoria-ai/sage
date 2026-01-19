# GeoRSSLayer

**Module:** `@arcgis/core/layers/GeoRSSLayer`

## Import

```javascript
import GeoRSSLayer from "@arcgis/core/layers/GeoRSSLayer.js";
```

```javascript
// CDN
const GeoRSSLayer = await $arcgis.import("@arcgis/core/layers/GeoRSSLayer.js");
```

**Since:** 4.3

## See Also

- Add a GeoRSSLayer to your Map
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
- refreshInterval
- refresh event
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `GeoRSSLayer`

### `blendMode`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `id`
- **Type:** `Inherited`

### `legendEnabled`

### `lineSymbol`

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

### `pointSymbol`

### `polygonSymbol`

### `refreshInterval`

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
// Typical usage
esriConfig.geoRSSServiceUrl = "https://utility.arcgis.com/sharing/rss";

const layer = new GeoRSSLayer({
  url: "https://disasterscharter.org/charter-portlets/cpi-mvc/activations/feed/rss/"
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
// The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
layer.maxScale = 1000;
```

```javascript
// The layer's visibility is not restricted to a maximum scale.
layer.maxScale = 0;
```

```javascript
// The layer will not be visible when the view is zoomed out beyond a scale of 1:3,000,000
layer.minScale = 3000000;
```

