# Swipe

**Module:** `@arcgis/core/widgets/Swipe`

## Import

```javascript
import Swipe from "@arcgis/core/widgets/Swipe.js";
```

```javascript
// CDN
const Swipe = await $arcgis.import("@arcgis/core/widgets/Swipe.js");
```

**Since:** 4.13

## See Also

- Swipe component
- Sample - Swipe component
- Sample - Swipe component with scroll
- SwipeViewModel
- Calcite Icon Search
- trailingLayers
- leadingLayers

## Property Details

### `Swipe`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `direction`

### `disabled`

### `dragLabel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `leadingLayers`

### `position`

### `trailingLayers`

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

### `when`
- **Type:** `Inherited`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
let swipe = new Swipe({
  view: view,
  leadingLayers: [layer1, layer2],
  trailingLayers: [layer3],
  direction: "vertical", // swipe widget will move from top to bottom of view
  position: 50 // position set to middle of the view (50%)
});
view.ui.add(swipe);
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

```javascript
swipe.visibleElements = {
  divider: true,
  handle: false // handle will not display
}
```

