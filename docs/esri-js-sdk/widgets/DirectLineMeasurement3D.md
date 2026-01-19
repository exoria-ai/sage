# DirectLineMeasurement3D

**Module:** `@arcgis/core/widgets/DirectLineMeasurement3D`

## Import

```javascript
import DirectLineMeasurement3D from "@arcgis/core/widgets/DirectLineMeasurement3D.js";
```

```javascript
// CDN
const DirectLineMeasurement3D = await $arcgis.import("@arcgis/core/widgets/DirectLineMeasurement3D.js");
```

**Since:** 4.6

## See Also

- Sample - Measurement in 3D
- Sample - Analysis objects
- Sample - Color theming for interactive tools
- DirectLineMeasurement3DViewModel
- AreaMeasurement3D
- DefaultUI
- SceneView.theme
- DirectLineMeasurement3DViewModel.analysis
- Calcite Icon Search

## Property Details

### `DirectLineMeasurement3D`

### `analysis`

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

### `unit`

### `unitOptions`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

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


## Method Details

### `Method Details()`


## Examples

```javascript
let measurementWidget = new DirectLineMeasurement3D({
  view: view
});

view.ui.add(measurementWidget, "top-right");
```

```javascript
// typical usage
let measurementWidget = new DirectLineMeasurement3D({
  view: view
});
```

```javascript
// Construct a direct line measurement analysis object outside of the widget
const analysis = new DirectLineMeasurementAnalysis({
  startPoint: {
    type: "point", // autocasts as new Point()
    x: 7.67,
    y: 45.981,
    z: 3435.765
  },
  endPoint: {
    type: "point",
    x: 7.659,
    y: 45.976,
    z: 4437
  }
});

// Ensure that the analysis is added to the view
view.analyses.add(analysis);

// Frame the analysis in the view
view.goTo(analysis.extent);

// Pass the analysis object as a constructor parameter to modify it using the widget
const viewModel = new DirectLineMeasurement3D({
  analysis: analysis,
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

