# BinaryColorSizeSlider

**Module:** `@arcgis/core/widgets/smartMapping/BinaryColorSizeSlider`

## Import

```javascript
import BinaryColorSizeSlider from "@arcgis/core/widgets/smartMapping/BinaryColorSizeSlider.js";
```

```javascript
// CDN
const BinaryColorSizeSlider = await $arcgis.import("@arcgis/core/widgets/smartMapping/BinaryColorSizeSlider.js");
```

**Since:** 4.28

## See Also

- BinaryColorSizeSliderViewModel
- univariateColorSizeRendererCreator
- primaryHandleEnabled
- histogram
- Histogram
- Calcite Icon Search
- inputParseFunction
- inputFormatFunction
- updateVisualVariable()
- visibleElements
- handlesSyncedToPrimary
- syncedSegmentsEnabled
- segment-drag event
- visibleElements

## Property Details

### `BinaryColorSizeSlider`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `handlesSyncedToPrimary`

### `histogramConfig`
- **Type:** `Inherited`

### `icon`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `inputFormatFunction`
- **Type:** `Inherited`

### `inputParseFunction`
- **Type:** `Inherited`

### `label`

### `labelFormatFunction`
- **Type:** `Inherited`

### `max`
- **Type:** `Inherited`

### `min`
- **Type:** `Inherited`

### `persistSizeRangeEnabled`

### `precision`
- **Type:** `Inherited`

### `state`
- **Type:** `Inherited`

### `stops`

### `style`

### `syncedSegmentsEnabled`
- **Type:** `Inherited`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleElements`
- **Type:** `Inherited`

### `zoomOptions`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fromRendererResult`

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

### `updateFromRendererResult`

### `updateRenderer`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const params = {
  layer,
  view,
  valueExpression: "$feature.POP_POVERTY_2020 - $feature.POP_POVERTY_2010",
  theme: "above-and-below",
  minValue: -50,
  maxValue: 50,
  colorOptions: {
    isContinuous: false
  },
  symbolOptions: {
    symbolStyle: "arrow"
  }
};

const rendererResult = await univariateColorSizeRendererCreator
  .createContinuousRenderer(colorParams);

layer.renderer = rendererResult.renderer;

const histogramResult = await histogram({
  layer,
  view,
  valueExpression: params.valueExpression,
  minValue: -50,
  maxValue: 50,
  numBins: 30
});

const binarySlider = BinaryColorSizeSlider.fromRendererResult(rendererResult, histogramResult);
sizeSlider.container = "slider";

// when the user slides the handle(s), update the renderer
// with the updated size properties

binarySlider.on(["thumb-change", "thumb-drag"], () => {
  layer.renderer = binarySlider.updateRenderer( layer.renderer );
});
```

```javascript
// when the user slides the handle(s), update the renderer
// with the updated size stops

slider.on(["thumb-change", "thumb-drag"], () => {
  layer.renderer = slider.updateRenderer( layer.renderer );
});
```

```javascript
// Typical usage
const slider = new BinaryColorSizeSlider({
  container: "sliderDiv",
  min: 0,
  max: 100,
  stops: [
    { value: 0, size: 4 },
    { value: 100, size: 40 }
  ]
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

