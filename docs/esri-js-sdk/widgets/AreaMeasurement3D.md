# AreaMeasurement3D

**Module:** `@arcgis/core/widgets/AreaMeasurement3D`

## Import

```javascript
import AreaMeasurement3D from "@arcgis/core/widgets/AreaMeasurement3D.js";
```

```javascript
// CDN
const AreaMeasurement3D = await $arcgis.import("@arcgis/core/widgets/AreaMeasurement3D.js");
```

**Since:** 4.7

## See Also

- Sample - Measurement in 3D
- Sample - Analysis objects
- Sample - Color theming for interactive tools
- AreaMeasurement3DViewModel
- DefaultUI
- SceneView.theme
- AreaMeasurement3DViewModel.analysis
- Calcite Icon Search

## Property Details

### `AreaMeasurement3D`

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
let measurementWidget = new AreaMeasurement3D({
  view: view
});

view.ui.add(measurementWidget, "top-right");
```

```javascript
// typical usage
let measurementWidget = new AreaMeasurement3D({
  view: view
});
```

```javascript
// Construct an area measurement analysis object outside of the widget
const analysis = new AreaMeasurementAnalysis({
  geometry: {
    type: "polygon", // autocasts as new Polygon()
    rings: [
      [-73.9817, 40.7681],
      [-73.9582, 40.8005],
      [-73.9495, 40.7968],
      [-73.9730, 40.7644],
      [-73.9817, 40.7681]
    ]
  }
});

// Ensure that the analysis is added to the view
view.analyses.add(analysis);

// Frame the analysis in the view
view.goTo(analysis.extent);

// Pass the analysis object as a constructor parameter to modify it using the widget
const viewModel = new AreaMeasurement3D({
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

