# OpacitySlider

**Module:** `@arcgis/core/widgets/smartMapping/OpacitySlider`

## Import

```javascript
import OpacitySlider from "@arcgis/core/widgets/smartMapping/OpacitySlider.js";
```

```javascript
// CDN
const OpacitySlider = await $arcgis.import("@arcgis/core/widgets/smartMapping/OpacitySlider.js");
```

**Since:** 4.12

## See Also

- OpacitySliderViewModel
- opacityVariableCreator
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

### `OpacitySlider`

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

### `fromVisualVariableResult`

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

### `updateFromVisualVariableResult`

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

let variableResult = null;

opacityVariableCreator
  .createVisualVariable(params)
  .then(function(response) {
    variableResult = response;
    layer.renderer.visualVariables = [ response.visualVariable ];

    return histogram({
      layer: layer,
      valueExpression: params.valueExpression,
      view: view,
      numBins: 70
    });
  })
   .then(function(histogramResult) {
     const slider = OpacitySlider.fromVisualVariableResult(variableResult, histogramResult);
     slider.container = "slider";
   })
   .catch(function(error) {
     console.log("there was an error: ", error);
   });
```

```javascript
// when the user slides the handle(s), update the renderer
// with the updated opacity stops

slider.on(["thumb-change", "thumb-drag"], function() {
  const renderer = layer.renderer.clone();
  const opacityVariable = renderer.visualVariables[0].clone();
  opacityVariable.stops = slider.stops;
  renderer.visualVariables = [ opacityVariable ];
  layer.renderer = renderer;
});
```

```javascript
// Typical usage
const slider = new OpacitySlider({
  container: "sliderDiv",
  statistics: stats,  // object generated from summaryStatistics()
  stops: response.visualVariable.stops,  // opacity visual variable generated from the opacityVariableCreator
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

