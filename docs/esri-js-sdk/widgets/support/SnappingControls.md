# SnappingControls

**Module:** `@arcgis/core/widgets/support/SnappingControls`

## Import

```javascript
import SnappingControls from "@arcgis/core/widgets/support/SnappingControls.js";
```

```javascript
// CDN
const SnappingControls = await $arcgis.import("@arcgis/core/widgets/support/SnappingControls.js");
```

**Since:** 4.21

## See Also

- SnappingOptions
- Sketch
- Editor
- FeatureSnappingLayerSource
- Sample - Sketch temporary geometries
- Sample - Snapping with Sketch widget and Magnifier
- Calcite Icon Search

## Property Details

### `SnappingControls`

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

### `snappingOptions`

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
const [Editor, SnappingControls] = await $arcgis.import([
  "@arcgis/core/widgets/Editor.js",
  "@arcgis/core/widgets/support/SnappingControls.js"
]);
const editor = new Editor({
  view: view
});

// create a new instance of the SnappingControls widget
const snappingControls = new SnappingControls({
  view: view,
  snappingOptions: editor.snappingOptions  // set the Editor's snappingOptions property
});

view.ui.add(editor, "top-right");  // adds the Editor widget to the view
view.ui.add(snappingControls, "top-left"); // adds the SnappingControls widget to the view
```

```javascript
// Create a new instance of SketchViewModel
const sketchViewModel = new SketchViewModel({
  view: view,
  layer: graphicsLayer
});

// Create a new instance of the SnappingControls widget
const snappingControls = new SnappingControls({
  view: view,
  snappingOptions: sketchViewModel.snappingOptions
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

