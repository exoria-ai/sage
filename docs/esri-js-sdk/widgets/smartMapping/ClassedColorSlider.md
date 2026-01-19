# ClassedColorSlider

**Module:** `@arcgis/core/widgets/smartMapping/ClassedColorSlider`

## Import

```javascript
import ClassedColorSlider from "@arcgis/core/widgets/smartMapping/ClassedColorSlider.js";
```

```javascript
// CDN
const ClassedColorSlider = await $arcgis.import("@arcgis/core/widgets/smartMapping/ClassedColorSlider.js");
```

**Since:** 4.12

## See Also

- ClassedColorSliderViewModel
- colorRendererCreator
- ClassBreaksRenderer
- histogram
- Histogram
- inputParseFunction
- inputFormatFunction
- visibleElements
- handlesSyncedToPrimary
- syncedSegmentsEnabled
- segment-drag event
- visibleElements

## Property Details

### `ClassedColorSlider`

### `breaks`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

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

### `state`
- **Type:** `Inherited`

### `syncedSegmentsEnabled`
- **Type:** `Inherited`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleElements`
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

### `updateClassBreakInfos`

### `updateFromRendererResult`

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
  view: view,
  classificationMethod: "equal-interval"
};

let rendererResult = null;

colorRendererCreator
  .createClassBreaksRenderer(params)
  .then(function(response) {
    rendererResult = response;
    layer.renderer = response.renderer;

    return histogram({
      layer: layer,
      valueExpression: params.valueExpression,
      view: view,
      numBins: 70
    });
  })
   .then(function(histogramResult) {
     const slider = ClassedColorSlider.fromRendererResult(rendererResult, histogramResult);
     slider.container = "slider";
   })
   .catch(function(error) {
     console.log("there was an error: ", error);
   });
```

```javascript
// when the user slides the handle(s), update the renderer
// with the updated class breaks

slider.on(["thumb-change", "thumb-drag"], function() {
  const renderer = layer.renderer.clone();
  renderer.classBreakInfos = slider.updateClassBreakInfos( renderer.classBreakInfos );
  layer.renderer = renderer;
});
```

```javascript
// Typical usage
const slider = new ClassedColorSlider({
  container: "sliderDiv",
  breaks: [{
    min: 0,
    max: 20,
    color: new Color([ 0, 0, 30 ])
  }, {
    min: 20,
    max: 40,
    color: new Color([ 0, 0, 100 ])
  }, {
    min: 40,
    max: 60,
    color: new Color([ 0, 0, 180 ])
  }, {
    min: 60,
    max: 80,
    color: new Color([ 0, 0, 255 ])
  }]
});
```

```javascript
slider.breaks = [{
  min: 0,
  max: 20,
  color: new Color([ 0, 0, 30 ])
}, {
  min: 20,
  max: 40,
  color: new Color([ 0, 0, 100 ])
}, {
  min: 40,
  max: 60,
  color: new Color([ 0, 0, 180 ])
}, {
  min: 60,
  max: 80,
  color: new Color([ 0, 0, 255 ])
}];
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

