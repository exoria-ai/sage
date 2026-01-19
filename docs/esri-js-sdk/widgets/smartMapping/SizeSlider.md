# SizeSlider

**Module:** `@arcgis/core/widgets/smartMapping/SizeSlider`

## Import

```javascript
import SizeSlider from "@arcgis/core/widgets/smartMapping/SizeSlider.js";
```

```javascript
// CDN
const SizeSlider = await $arcgis.import("@arcgis/core/widgets/smartMapping/SizeSlider.js");
```

**Since:** 4.12

## See Also

- SizeSliderViewModel
- sizeRendererCreator
- primaryHandleEnabled
- histogram
- Histogram
- inputParseFunction
- inputFormatFunction
- primaryHandleEnabled
- handlesSyncedToPrimary
- persistSizeRangeEnabled
- updateVisualVariable()
- visibleElements
- handlesSyncedToPrimary
- syncedSegmentsEnabled
- segment-drag event
- visibleElements

## Property Details

### `SizeSlider`

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

### `persistSizeRangeEnabled`

### `precision`
- **Type:** `Inherited`

### `primaryHandleEnabled`

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

### `updateVisualVariable`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const sizeParams = {
  layer: layer,
  basemap: map.basemap,
  valueExpression: "( $feature.POP_POVERTY / $feature.TOTPOP_CY ) * 100",
  view: view
};

let rendererResult = null;

sizeRendererCreator
  .createContinuousRenderer(sizeParams)
  .then(function(response) {
    rendererResult = response;
    layer.renderer = response.renderer;

    return histogram({
      layer: layer,
      valueExpression: sizeParams.valueExpression,
      view: view,
      numBins: 70
    });
  })
   .then(function(histogramResult) {
     const sizeSlider = SizeSlider.fromRendererResult(rendererResult, histogramResult);
     sizeSlider.container = "slider";
   })
   .catch(function(error) {
     console.log("there was an error: ", error);
   });
```

```javascript
// when the user slides the handle(s), update the renderer
// with the updated size stops

sizeSlider.on(["thumb-change", "thumb-drag"], function() {
  const renderer = layer.renderer.clone();
  const sizeVariable = renderer.visualVariables[0];
  renderer.visualVariables = [ sizeSlider.updateVisualVariable(sizeVariable) ];
  layer.renderer = renderer;
});
```

```javascript
// Typical usage
const slider = new SizeSlider({
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

