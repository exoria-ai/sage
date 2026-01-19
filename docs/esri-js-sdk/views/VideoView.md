# VideoView

**Module:** `@arcgis/core/views/VideoView`

## Import

```javascript
import VideoView from "@arcgis/core/views/VideoView.js";
```

```javascript
// CDN
const VideoView = await $arcgis.import("@arcgis/core/views/VideoView.js");
```

**Since:** 4.33

## See Also

- VideoLayer
- Element: ariaDescribedByElements property
- Element: ariaLabelledByElements property
- ARIA: aria-description attribute
- ARIA: aria-label attribute
- when()

## Property Details

### `VideoView`

### `aria`

### `container`

### `declaredClass`
- **Type:** `Inherited`

### `focused`

### `height`

### `layer`

### `map`

### `navigation`

### `ready`

### `resizing`

### `scale`

### `size`

### `suspended`

### `ui`

### `videoSize`

### `width`

### `addHandles`
- **Type:** `Inherited`

### `emit`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `on`

### `removeHandles`
- **Type:** `Inherited`

### `when`


## Method Details

### `Method Details()`


## Examples

```javascript
const videoView = new VideoView({
 container: "videoViewDiv",
 layer: videoLayer
});
```

```javascript
// Sets container to the DOM id
let view = new MapView({
  container: "viewDiv"  // ID of the HTML element that holds the view
});
```

```javascript
// Sets container to the node
let viewNode = document.getElementById("viewDiv");
let view = new SceneView({
  container: viewNode
});
```

```javascript
// Disable the gamepad usage, single touch panning, panning momentum and mouse wheel zooming.
const view = new VideoView({
  container: "videoViewDiv",
  layer: videoLayer,
  navigation: {
    gamepad: {
      enabled: false
    },
    actionMap: {
      dragSecondary: "none", // Disable rotating the view with the right mouse button
      mouseWheel: "none" // Disable zooming with the mouse wheel
    },
    browserTouchPanEnabled: false,
    momentumEnabled: false,
  }
});
```

```javascript
let toggle = new BasemapToggle({
  view: view,
  nextBasemap: "hybrid"
});
// Adds an instance of BasemapToggle widget to the
// top right of the view.
view.ui.add(toggle, "top-right");
```

