# NavigationToggle

**Module:** `@arcgis/core/widgets/NavigationToggle`

## Import

```javascript
import NavigationToggle from "@arcgis/core/widgets/NavigationToggle.js";
```

```javascript
// CDN
const NavigationToggle = await $arcgis.import("@arcgis/core/widgets/NavigationToggle.js");
```

**Since:** 4.0

## See Also

- NavigationToggleViewModel
- SceneView navigation
- DefaultUI

## Property Details

### `NavigationToggle`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `label`

### `layout`

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

### `toggle`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// creates a new instance of the NavigationToggle widget
let navigationToggle = new NavigationToggle({
  view: view
});

// and adds it to the top right of the view
view.ui.add(navigationToggle, "top-right");
```

```javascript
// typical usage
let navigationToggle = new NavigationToggle({
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
// creates a new instance of the NavigationToggle widget
let navigationToggle = new NavigationToggle({
  view: view,
  layout: "horizontal"  // makes the layout horizontal
});
```

