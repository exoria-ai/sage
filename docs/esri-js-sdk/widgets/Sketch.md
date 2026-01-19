# Sketch

**Module:** `@arcgis/core/widgets/Sketch`

## Import

```javascript
import Sketch from "@arcgis/core/widgets/Sketch.js";
```

```javascript
// CDN
const Sketch = await $arcgis.import("@arcgis/core/widgets/Sketch.js");
```

**Since:** 4.10

## See Also

- SketchViewModel
- SketchLabelOptions
- SketchTooltipOptions
- SketchValueOptions
- SnappingOptions
- Sample - Sketch temporary geometries
- Sample - Sketch update validation
- Sample - Query statistics by geometry
- Sample - Snapping with Sketch widget and Magnifier
- Sample - Sketch in 3D
- Calcite Icon Search

## Property Details

### `Sketch`

### `activeTool`

### `activeTooltip`

### `availableCreateTools`

### `container`
- **Type:** `Inherited`

### `createGraphic`

### `creationMode`

### `declaredClass`
- **Type:** `Inherited`

### `defaultCreateOptions`

### `defaultUpdateOptions`

### `destroyed`
- **Type:** `Inherited`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `labelOptions`

### `layer`

### `layout`

### `scale`

### `snappingOptions`

### `state`

### `toolbarKind`

### `tooltipOptions`

### `updateGraphics`

### `valueOptions`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `cancel`

### `classes`
- **Type:** `Inherited`

### `complete`

### `create`

### `delete`

### `destroy`
- **Type:** `Inherited`

### `duplicate`

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

### `redo`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `undo`

### `update`

### `when`
- **Type:** `Inherited`

### `CreateToolEventInfo`

### `CursorUpdateEventInfo`

### `MoveEventInfo`

### `ReshapeEventInfo`

### `RotateEventInfo`

### `ScaleEventInfo`

### `SelectionChangeEventInfo`

### `UpdateToolEventInfo`

### `VertexAddEventInfo`

### `VertexRemoveEventInfo`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
// define the GraphicsLayer
const gLayer = new GraphicsLayer({
  elevationInfo: {
    mode: "absolute-height" // default value
  }
});

// define the SketchViewModel
const sketchVM = new SketchViewModel({
  layer: gLayer,
  view: view,
  defaultCreateOptions: {
    hasZ: true  // default value
  },
  defaultUpdateOptions: {
    enableZ: true  // default value
  }
});
```

```javascript
// Create a new instance of sketch widget and set its required parameters
let sketch = new Sketch({
  layer: graphicsLayer,
  view: view
});

// Listen to sketch widget's create event.
sketch.on("create", function(event) {
  // check if the create event's state has changed to complete indicating
  // the graphic create operation is completed.
  if (event.state === "complete") {
    // remove the graphic from the layer. Sketch adds
    // the completed graphic to the layer by default.
    graphicsLayer.remove(event.graphic);

    // use the graphic.geometry to query features that intersect it
    selectFeatures(event.graphic.geometry);
  }
});
```

```javascript
// typical usage
let sketch = new Sketch({
  layer: layer,
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

