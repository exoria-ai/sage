# ColorSlider

**Module:** `@arcgis/core/widgets/smartMapping/ColorSlider`

## Import

```javascript
import ColorSlider from "@arcgis/core/widgets/smartMapping/ColorSlider.js";
```

```javascript
// CDN
const ColorSlider = await $arcgis.import("@arcgis/core/widgets/smartMapping/ColorSlider.js");
```

**Since:** 4.12

## See Also

- ColorSliderViewModel
- colorRendererCreator
- primaryHandleEnabled
- histogram
- Histogram
- inputParseFunction
- inputFormatFunction
- handlesSyncedToPrimary
- visibleElements
- handlesSyncedToPrimary
- syncedSegmentsEnabled
- segment-drag event
- fromRendererResult()
- visibleElements

## Property Details

### `ColorSlider`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `handlesSyncedToPrimary`

### `histogramConfig`
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

### `precision`
- **Type:** `Inherited`

### `primaryHandleEnabled`

### `state`
- **Type:** `Inherited`

### `stops`

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

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const colorParams = {
  layer: layer,
  basemap: map.basemap,
  valueExpression: "( $feature.POP_POVERTY / $feature.TOTPOP_CY ) * 100",
  view: view,
  theme: "above-and-below"
};

let rendererResult = null;

colorRendererCreator
  .createContinuousRenderer(colorParams)
  .then(function(response) {
    rendererResult = response;
    layer.renderer = response.renderer;

    return histogram({
      layer: layer,
      valueExpression: colorParams.valueExpression,
      view: view,
      numBins: 70
    });
  })
   .then(function(histogramResult) {
     const colorSlider = ColorSlider.fromRendererResult(rendererResult, histogramResult);
     colorSlider.container = "slider";
     colorSlider.primaryHandleEnabled = true;
   })
   .catch(function(error) {
     console.log("there was an error: ", error);
   });
```

```javascript
// when the user slides the handle(s), update the renderer
// with the updated color stops

colorSlider.on(["thumb-change", "thumb-drag"], function() {
  const renderer = layer.renderer.clone();
  const colorVariable = renderer.visualVariables[0].clone();
  colorVariable.stops = colorSlider.stops;
  renderer.visualVariables = [ colorVariable ];
  layer.renderer = renderer;
});
```

```javascript
// Typical usage
// rendererResponse is result of color.createContinuousRenderer()
const slider = new ColorSlider({
  container: "sliderDiv",
  min: rendererResponse.statistics.min,
  max: rendererResponse.statistics.max,
  stops: rendererResponse.visualVariable.stops
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

