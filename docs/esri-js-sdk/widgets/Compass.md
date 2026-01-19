# Compass

**Module:** `@arcgis/core/widgets/Compass`

## Import

```javascript
import Compass from "@arcgis/core/widgets/Compass.js";
```

```javascript
// CDN
const Compass = await $arcgis.import("@arcgis/core/widgets/Compass.js");
```

**Since:** 4.0

## See Also

- CompassViewModel
- DefaultUI
- MapView
- SceneView
- Camera
- MapView
- SceneView
- Calcite Icon Search

## Property Details

### `Compass`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `goToOverride`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

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

### `reset`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let view = new MapView({
  container: "viewDiv",
  map: map
});

let compass = new Compass({
  view: view
});

// Add the compass to the top left corner of the MapView
view.ui.add(compass, "top-left");
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
// The following snippet uses Search but can be applied to any
// widgets that support the goToOverride property.
search.goToOverride = function(view, goToParams) {
  goToParams.options = {
    duration: updatedDuration
  };
  return view.goTo(goToParams.target, goToParams.options);
};
```

```javascript
// Hides the widget in the view
widget.visible = false;
```

