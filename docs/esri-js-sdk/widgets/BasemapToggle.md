# BasemapToggle

**Module:** `@arcgis/core/widgets/BasemapToggle`

## Import

```javascript
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
```

```javascript
// CDN
const BasemapToggle = await $arcgis.import("@arcgis/core/widgets/BasemapToggle.js");
```

**Since:** 4.0

## See Also

- BasemapToggleViewModel
- Calcite Icon Search

## Property Details

### `BasemapToggle`

### `activeBasemap`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `nextBasemap`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleElements`

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

### `toggle`

### `when`
- **Type:** `Inherited`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a map with an initial basemap
let map = new Map({
  basemap: "streets-vector",  // The initial basemap to toggle from
  ground: "world-elevation"
});

// Reference the map in the view instance
let view = new SceneView({
  container: "viewDiv",
  map: map
});

let basemapToggle = new BasemapToggle({
  view: view,  // The view that provides access to the map's "streets-vector" basemap
  nextBasemap: "hybrid"  // Allows for toggling to the "hybrid" basemap
});
```

```javascript
// typical usage
let basemapToggle = new BasemapToggle({
  view: view,
  nextBasemap: "satellite"
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
// Hides the widget in the view
widget.visible = false;
```

