# AreaMeasurement2D

**Module:** `@arcgis/core/widgets/AreaMeasurement2D`

## Import

```javascript
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D.js";
```

```javascript
// CDN
const AreaMeasurement2D = await $arcgis.import("@arcgis/core/widgets/AreaMeasurement2D.js");
```

**Since:** 4.10

## See Also

- Sample - Measurement in 2D
- AreaMeasurement2DViewModel
- DistanceMeasurement2D
- DefaultUI
- MapView.theme
- Calcite Icon Search

## Property Details

### `AreaMeasurement2D`

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

### `snappingOptions`

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
// To add the AreaMeasurement2D widget to your map
let measurementWidget = new AreaMeasurement2D({
  view: view
});
view.ui.add(measurementWidget, "top-right");
```

```javascript
// Typical usage
const measurementWidget = new AreaMeasurement2D({
  view: view
});
view.ui.add(measurementWidget, "top-right");
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
// To create the AreaMeasurement2D widget that displays area in square US feet
let measurementWidget = new AreaMeasurement2D({
  view: view,
  unit: "square-us-feet"
});

// To display the current measurement unit
console.log("Current unit: ", measurementWidget.unit);
```

