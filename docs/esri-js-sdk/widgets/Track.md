# Track

**Module:** `@arcgis/core/widgets/Track`

## Import

```javascript
import Track from "@arcgis/core/widgets/Track.js";
```

```javascript
// CDN
const Track = await $arcgis.import("@arcgis/core/widgets/Track.js");
```

**Since:** 4.0

## See Also

- TrackViewModel
- DefaultUI
- MapView
- SceneView
- Calcite Icon Search

## Property Details

### `Track`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `geolocationOptions`

### `goToLocationEnabled`

### `goToOverride`

### `graphic`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `rotationEnabled`

### `scale`

### `tracking`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `classes`
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

### `on`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `start`

### `stop`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let trackWidget = new Track({
  view: view
});

view.ui.add(trackWidget, "top-left");
```

```javascript
// typical usage
let track = new Track({
  view: view
});
```

```javascript
// Create the HTML div element programmatically at runtime and set to the widget's container
const basemapGallery = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
// Specify an already-defined HTML div element in the widget's container

const basemapGallery = new BasemapGallery({
  view: view,
  container: basemapGalleryDiv
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});

// HTML markup
<body>
  <div id="viewDiv"></div>
  <div id="basemapGalleryDiv"></div>
</body>
```

```javascript
// Specify the widget while adding to the view's UI
const basemapGallery = new BasemapGallery({
  view: view
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
const track = new Track({
  view: view,
  // Set optional position parameters
  geolocationOptions: {
    maximumAge: 0,
    timeout: 15000,
    enableHighAccuracy: true
  }
});
```

