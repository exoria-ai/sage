# DistanceMeasurement2D

**Module:** `@arcgis/core/widgets/DistanceMeasurement2D`

## Import

```javascript
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D.js";
```

```javascript
// CDN
const DistanceMeasurement2D = await $arcgis.import("@arcgis/core/widgets/DistanceMeasurement2D.js");
```

**Since:** 4.10

## See Also

- Sample - Measurement in 2D
- DistanceMeasurement2DViewModel
- AreaMeasurement2D
- DefaultUI
- MapView.theme
- Calcite Icon Search

## Property Details

### `DistanceMeasurement2D`

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
// To add the DistanceMeasurement2D widget to the map
let measurementWidget = new DistanceMeasurement2D({
  view: view
});
view.ui.add(measurementWidget, "top-right");
```

```javascript
// To add the DistanceMeasurement2D widget to the map
let measurementWidget = new DistanceMeasurement2D({
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
// To create the DistanceMeasurement2D widget that displays distance in yards
let measurementWidget = new DistanceMeasurement2D({
  view: view,
  unit: "yards"
});

// To display the current measurement unit
console.log('Current unit: ', measurementWidget.unit);
```

