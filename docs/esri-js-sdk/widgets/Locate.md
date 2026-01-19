# Locate

**Module:** `@arcgis/core/widgets/Locate`

## Import

```javascript
import Locate from "@arcgis/core/widgets/Locate.js";
```

```javascript
// CDN
const Locate = await $arcgis.import("@arcgis/core/widgets/Locate.js");
```

**Since:** 4.0

## See Also

- LocateViewModel
- DefaultUI
- MapView
- SceneView
- Calcite Icon Search
- Search.popupEnabled

## Property Details

### `Locate`

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

### `popupEnabled`

### `scale`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `cancelLocate`

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

### `locate`

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

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let locateWidget = new Locate({
  view: view,   // Attaches the Locate button to the view
  graphic: new Graphic({
    symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
    // graphic placed at the location of the user when found
  })
});

view.ui.add(locateWidget, "top-right");
```

```javascript
// typical usage
let locate = new Locate({
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
// The following snippet uses Search but can be applied to any
// widgets that support the goToOverride property.
search.goToOverride = function(view, goToParams) {
  goToParams.options = {
    duration: updatedDuration
  };
  return view.goTo(goToParams.target, goToParams.options);
};
```

