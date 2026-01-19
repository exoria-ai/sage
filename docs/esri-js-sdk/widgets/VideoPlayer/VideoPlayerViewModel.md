# VideoPlayerViewModel

**Module:** `@arcgis/core/widgets/VideoPlayer/VideoPlayerViewModel`

## Import

```javascript
import VideoPlayerViewModel from "@arcgis/core/widgets/VideoPlayer/VideoPlayerViewModel.js";
```

```javascript
// CDN
const VideoPlayerViewModel = await $arcgis.import("@arcgis/core/widgets/VideoPlayer/VideoPlayerViewModel.js");
```

**Since:** 4.30

## See Also

- VideoPlayer
- seekLength
- seekLength

## Property Details

### `VideoPlayerViewModel`

### `buffered`

### `currentTime`

### `declaredClass`
- **Type:** `Inherited`

### `duration`

### `ended`

### `followingMode`

### `layer`

### `metadata`

### `playing`

### `seekLength`

### `state`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `changeGraphicsColor`

### `changePlaybackSpeed`

### `hasHandles`
- **Type:** `Inherited`

### `pause`

### `play`

### `removeHandles`
- **Type:** `Inherited`

### `seekBackward`

### `seekForward`

### `seekTo`

### `seekToBeginning`

### `seekToEnding`

### `toggleFrameCenterDisplay`

### `toggleFrameDisplay`

### `toggleFrameOutlineDisplay`

### `toggleSensorDisplay`

### `toggleSensorSightLineDisplay`

### `toggleSensorTrailDisplay`


## Method Details

### `Method Details()`


## Examples

```javascript
const videoPlayerViewModel = new VideoPlayerViewModel({
  layer: videoLayer,
  view
});,
```

```javascript
// Follow the sensor location.
videoPlayerViewModel.followingMode = "follow-sensor";
```

```javascript
// Set the video player view model's layer to a video layer.
videoPlayerViewModel.layer = videoLayer;
```

```javascript
// Seek the video layer forward by 5 seconds.
videoPlayerViewModel.seekLength = 5;
```

```javascript
// Set the video player view model's view to a map view.
videoPlayerViewModel.view = mapView;
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

