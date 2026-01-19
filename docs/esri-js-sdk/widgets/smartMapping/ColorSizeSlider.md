# ColorSizeSlider

**Module:** `@arcgis/core/widgets/smartMapping/ColorSizeSlider`

## Import

```javascript
import ColorSizeSlider from "@arcgis/core/widgets/smartMapping/ColorSizeSlider.js";
```

```javascript
// CDN
const ColorSizeSlider = await $arcgis.import("@arcgis/core/widgets/smartMapping/ColorSizeSlider.js");
```

**Since:** 4.12

## See Also

- ColorSizeSliderViewModel
- univariateColorSizeRendererCreator
- primaryHandleEnabled
- histogram
- Histogram
- inputParseFunction
- inputFormatFunction
- primaryHandleEnabled
- handlesSyncedToPrimary
- persistSizeRangeEnabled
- fromRendererResult()
- updateVisualVariables()
- visibleElements
- handlesSyncedToPrimary
- syncedSegmentsEnabled
- segment-drag event
- visibleElements

## Property Details

### `ColorSizeSlider`

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

### `updateVisualVariables`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const params = {
  layer: layer,
  basemap: map.basemap,
  valueExpression: "( $feature.POP_POVERTY / $feature.TOTPOP_CY ) * 100",
  view: view
};

let rendererResult = null;

univariateColorSizeRendererCreator
  .createContinuousRenderer(params)
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
     const slider = ColorSizeSlider.fromRendererResult(rendererResult, histogramResult);
     slider.container = "slider";
   })
   .catch(function(error) {
     console.log("there was an error: ", error);
   });
```

```javascript
// when the user slides the handle(s), update the renderer
// with the updated color stops

slider.on(["thumb-change", "thumb-drag"], function() {
  const renderer = layer.renderer.clone();
  renderer.visualVariables = slider.updateVisualVariables( renderer.visualVariables );
  layer.renderer = renderer;
});
```

```javascript
const slider = new ColorSizeSlider({
  min: 0,
  max: 100,
  stops: [
    { value: 25, color: "white", size: 1000 },
    { value: 75, color: "dodgerblue", size: 100000 }
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

