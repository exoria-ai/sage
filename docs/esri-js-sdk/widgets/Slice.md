# Slice

**Module:** `@arcgis/core/widgets/Slice`

## Import

```javascript
import Slice from "@arcgis/core/widgets/Slice.js";
```

```javascript
// CDN
const Slice = await $arcgis.import("@arcgis/core/widgets/Slice.js");
```

**Since:** 4.10

## See Also

- SliceViewModel
- Sample - Slice widget
- Sample - Analysis objects
- SliceViewModel.analysis
- Heading Elements
- Calcite Icon Search

## Property Details

### `Slice`

### `analysis`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

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
const sliceWidget = new Slice({
  view: view
});

// Add widget to the bottom left corner of the view
view.ui.add(sliceWidget, {
  position: "bottom-left"
});
```

```javascript
// typical usage
const sliceWidget = new Slice({
  view: view
});
```

```javascript
// Construct a slice analysis object outside of the widget
const sliceAnalysis = new SliceAnalysis({
  shape: {
    type: "plane", // autocasts as new SlicePlane()
    position: {
      type: "point",
      x: -0.1,
      y: 51.5
    },
    width: 50,
    height: 50,
    tilt: 45
  },
  tiltEnabled: true
});

// Ensure that the analysis is added to the view
view.analyses.add(sliceAnalysis);

// Frame the analysis in the view
view.goTo(sliceAnalysis.extent);

// Pass the analysis object as a constructor parameter to modify it using the widget
const sliceWidget = new Slice({
  analysis: sliceAnalysis,
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

