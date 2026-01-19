# WMSLayer

**Module:** `@arcgis/core/layers/WMSLayer`

## Import

```javascript
import WMSLayer from "@arcgis/core/layers/WMSLayer.js";
```

```javascript
// CDN
const WMSLayer = await $arcgis.import("@arcgis/core/layers/WMSLayer.js");
```

**Since:** 4.4

## See Also

- Sample - WMSLayer
- OpenGIS Web Map Service Implementation Specification (pdf)
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

### `WMSLayer`

### `allSublayers`

### `blendMode`

### `copyright`

### `customLayerParameters`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `dimensions`

### `effect`

### `featureInfoFormat`

### `featureInfoFormats`

### `featureInfoUrl`

### `fetchFeatureInfoFunction`

### `fullExtent`
- **Type:** `Inherited`

### `fullExtents`

### `id`
- **Type:** `Inherited`

### `imageFormat`

### `imageMaxHeight`

### `imageMaxWidth`

### `imageTransparency`

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

### `spatialReference`

### `spatialReferences`

### `sublayers`

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

### `cancelLoad`
- **Type:** `Inherited`

### `createLayerView`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchImage`

### `findSublayerById`

### `findSublayerByName`

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

### `FetchFeatureInfoFunction`


## Method Details

### `Method Details()`


## Examples

```javascript
// Typical usage
const layer = new WMSLayer({
  url: // url to the service
});
await layer.load();
// filter by a given sublayer
const sublayer = layer.findSublayerByName("My Sublayer");
if (sublayer) {
  layer.sublayers = [sublayer];
}
map.add(layer);
```

```javascript
// Print the names of all sublayers used for rendering.
const layer = new WMSLayer({
  url: "https://geo.weather.gc.ca/geomet"
});
layer.load().then(() => {
  const names = layer.allSublayers
                     .filter((sublayer) => !sublayer.sublayers) // Non-grouping layers will not have any "sublayers".
                     .map((sublayer) => sublayer.name);
  console.log("Names of all child sublayers", names.join());
});
```

```javascript
const layer = new WMSLayer({
  url: "https://public-wms.met.no/verportal/verportal.map?request=GetCapabilities&service=WMS&version=1.3.0"
});
await layer.load();
const timeDimension = layer.dimensions.find((dimension) => dimension.name === "time");
```

```javascript
const dates = timeDimension.extent; // This time dimension is expressed as an array of dates.
const start = dates[0]; // Get the first and earliest date
const end = dates[dates.length -1]; // Get last date
const timeSlider = new TimeSlider({
  container: "timeSliderDiv",
  view: view,
  mode: "instant",
  timeVisible: true,
  loop: true,
  fullTimeExtent: { // The TimeSlider UI will span all dates
    start,
    end
  },
  stops: {
    dates // The TimeSlider thumb will snap exactly to each valid date
  }
})
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

