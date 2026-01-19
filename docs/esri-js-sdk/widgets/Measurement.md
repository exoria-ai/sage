# Measurement

**Module:** `@arcgis/core/widgets/Measurement`

## Import

```javascript
import Measurement from "@arcgis/core/widgets/Measurement.js";
```

```javascript
// CDN
const Measurement = await $arcgis.import("@arcgis/core/widgets/Measurement.js");
```

**Since:** 4.13

## See Also

- MeasurementViewModel
- Sample - Measurement widget
- DefaultUI
- AreaMeasurement2D
- DistanceMeasurement2D
- AreaMeasurement3D
- DirectLineMeasurement3D
- Calcite Icon Search

## Property Details

### `Measurement`

### `activeTool`

### `activeWidget`

### `areaUnit`

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

### `linearUnit`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `clear`

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

### `startMeasurement`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Add the measurement widget to the upper right hand corner
// with the distance tool active
const map = new Map({
  basemap: "hybrid"
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-71.69, 43.76],
  zoom: 15
});

const measurement = new Measurement({
  view: view,
  activeTool: "distance"
});
view.ui.add(measurement, "top-right");

// Switch between area and distance measurement
function switchTool() {
 const tool = measurement.activeTool === "distance" ? "area" : "distance";
 measurement.activeTool = tool;
}
```

```javascript
// To create the Measurement widget with SceneView's direct-line tool active.
const measurement = new Measurement({
  view: view,
  activeTool: "direct-line"
});

// To switch between direct line and area measurement tools
function switchTool() {
 const tool = measurement.activeTool === "direct-line" ? "area" : "direct-line";
 measurement.activeTool = tool;
}
```

```javascript
// Print the active widget to the console.
const measurement = new Measurement({
  view: view,
  activeTool: "distance"
});
view.ui.add(measurement, "top-right");
console.log("Active Widget: ", measurement.activeWidget);
```

```javascript
// To create the Measurement widget that displays area in square US feet
const measurement = new Measurement({
  view: view,
  activeTool: "area",
  areaUnit: "square-us-feet"
});

// To display the current area measurement unit
console.log("Current unit: ", measurement.areaUnit);
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

