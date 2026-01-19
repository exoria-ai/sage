# Slider

**Module:** `@arcgis/core/widgets/Slider`

## Import

```javascript
import Slider from "@arcgis/core/widgets/Slider.js";
```

```javascript
// CDN
const Slider = await $arcgis.import("@arcgis/core/widgets/Slider.js");
```

**Since:** 4.12

## See Also

- SliderViewModel
- Calcite Icon Search
- labelInputsEnabled
- rangeLabelInputsEnabled
- inputParseFunction
- inputFormatFunction
- rangeLabelInputsEnabled
- visibleElements
- rangeLabelInputsEnabled
- visibleElements
- SliderViewModel.setValue()

## Property Details

### `Slider`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `draggableSegmentsEnabled`

### `effectiveMax`

### `effectiveMin`

### `effectiveSegmentElements`

### `icon`

### `id`
- **Type:** `Inherited`

### `inputCreatedFunction`

### `inputFormatFunction`

### `inputParseFunction`

### `label`

### `labelElements`

### `labelFormatFunction`

### `labelInputsEnabled`

### `labels`

### `layout`

### `max`

### `maxLabelElement`

### `min`

### `minLabelElement`

### `precision`

### `rangeLabelInputsEnabled`

### `segmentElements`

### `snapOnClickEnabled`

### `state`

### `steps`

### `syncedSegmentsEnabled`

### `thumbCreatedFunction`

### `thumbElements`

### `thumbsConstrained`

### `tickConfigs`

### `tickElements`

### `trackElement`

### `values`

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

### `Bounds`

### `InputCreatedFunction`

### `InputParser`

### `LabelFormatter`

### `LabelInfos`

### `ThumbCreatedFunction`

### `TickConfig`

### `TickCreatedFunction`

### `TickElementGroup`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const slider = new Slider({
  container: "sliderDiv",
  min: 0,
  max: 100,
  values: [ 50 ],
  snapOnClickEnabled: false,
  visibleElements: {
    labels: true,
    rangeLabels: true
  }
});
```

```javascript
// Typical usage
const slider = new Slider({
  container: "sliderDiv",
  min: 0,
  max: 100,
  values: [ 50 ]
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
// disables draggable segments
slider.draggableSegmentsEnabled = false;
```

