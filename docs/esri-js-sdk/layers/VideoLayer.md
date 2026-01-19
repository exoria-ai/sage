# VideoLayer

**Module:** `@arcgis/core/layers/VideoLayer`

## Import

```javascript
import VideoLayer from "@arcgis/core/layers/VideoLayer.js";
```

```javascript
// CDN
const VideoLayer = await $arcgis.import("@arcgis/core/layers/VideoLayer.js");
```

**Since:** 4.30

## See Also

- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- play()
- SpatialReference.WGS84
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

### `VideoLayer`

### `autoplay`

### `blendMode`

### `buffered`

### `cameraInfo`

### `capabilities`

### `codecs`

### `connectionInfo`

### `copyright`

### `created`

### `currentTime`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `duration`

### `effect`

### `ended`

### `frameCenterSymbol`

### `frameCount`

### `frameEffect`

### `frameOpacity`

### `frameOutlineSymbol`

### `fullExtent`

### `groundControlPoints`

### `id`
- **Type:** `Inherited`

### `initialExtent`

### `isLive`

### `layerId`

### `listMode`
- **Type:** `Inherited`

### `livestreamStatus`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `loop`

### `maxScale`

### `metadata`

### `mimeType`

### `minScale`

### `muted`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`
- **Type:** `Inherited`

### `playbackInfo`

### `playbackRate`

### `playerUrl`

### `playing`

### `posterUrl`

### `qualities`

### `sensorSightLineSymbol`

### `sensorSymbol`

### `sensorSymbolOrientation`

### `sensorTrailSymbol`

### `serviceItemId`

### `sourceQuality`

### `sourceType`

### `spatialReference`

### `start`

### `started`

### `state`

### `telemetry`

### `telemetryDisplay`

### `title`

### `type`

### `uid`
- **Type:** `Inherited`

### `url`

### `version`

### `videoHeight`

### `videoLayersInfo`

### `videoTimeExtent`

### `videoWidth`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `volume`

### `waiting`

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

### `pause`

### `play`

### `removeHandles`
- **Type:** `Inherited`

### `reset`

### `setCurrentTime`

### `updateTelemetryColor`

### `when`
- **Type:** `Inherited`

### `CameraInfo`

### `Codecs`

### `LivestreamStatus`

### `SensorSymbolOrientation`

### `VideoMetadataEntry`

### `VideoPoint`

### `VideoServiceLayerInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
const videoLayer = new VideoLayer({ url });
```

```javascript
// Create a new VideoLayer instance referencing a video service
const videoLayer = new VideoLayer({ url });
```

```javascript
// Configure the layer to start playback when ready
videoLayer.autoplay = true;
```

```javascript
// Set the copyright
videoLayer.copyright = "© 2024 Esri";
```

```javascript
// Set the description
videoLayer.description = "This is a video layer";
```

```javascript
// the following effect will be applied to the layer at all scales
// brightness will be applied first, then hue-rotate followed by contrast
// changing order of the effects will change the final result
layer.effect = "brightness(5) hue-rotate(270deg) contrast(200%)";
```

