# CoordinateConversion

**Module:** `@arcgis/core/widgets/CoordinateConversion`

## Import

```javascript
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion.js";
```

```javascript
// CDN
const CoordinateConversion = await $arcgis.import("@arcgis/core/widgets/CoordinateConversion.js");
```

**Since:** 4.7

## See Also

- CoordinateConversion component
- Sample - CoordinateConversion component
- CoordinateConversionViewModel
- coordinateFormatter
- MapView
- SceneView
- Calcite Icon Search
- Window.sessionStorage
- Window.localStorage

## Property Details

### `CoordinateConversion`

### `container`
- **Type:** `Inherited`

### `conversions`

### `currentLocation`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `formats`

### `goToOverride`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `locationSymbol`

### `mode`

### `multipleConversions`

### `orientation`

### `storageEnabled`

### `storageType`

### `view`

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

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `reverseConvert`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
let ccWidget = new CoordinateConversion({
  view: view
});

// Adds widget in the bottom left corner of the view
view.ui.add(ccWidget, "bottom-left");
```

```javascript
// typical usage
let ccWidget = new CoordinateConversion({
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

```javascript
// conversions can be set with an array of strings where each string is a format's name
coordinateConversion.conversions = ["mgrs"];
```

