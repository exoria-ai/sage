# LineOfSight

**Module:** `@arcgis/core/widgets/LineOfSight`

## Import

```javascript
import LineOfSight from "@arcgis/core/widgets/LineOfSight.js";
```

```javascript
// CDN
const LineOfSight = await $arcgis.import("@arcgis/core/widgets/LineOfSight.js");
```

**Since:** 4.14

## See Also

- LineOfSightViewModel
- Sample - Line of sight widget
- Sample - Analysis objects
- LineOfSightViewModel.analysis
- Calcite Icon Search

## Property Details

### `LineOfSight`

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
const lineOfSight = new LineOfSight({
  view: view
});

// Add widget to the bottom left corner of the view
view.ui.add(lineOfSight, {
  position: "bottom-left"
});
```

```javascript
// typical usage
const lineOfSight = new LineOfSight({
  view: view
});
```

```javascript
// Construct a line of sight analysis object outside of the widget
const analysis = new LineOfSightAnalysis({
  observer: {
    type: "point", // autocasts as new Point()
    x: 7.67,
    y: 45.981,
    z: 3435.765
  },
  targets: [{
    location: {
      type: "point",
      x: 7.659,
      y: 45.976,
      z: 4437
    }
  }]
});

// Ensure that the analysis is added to the view
view.analyses.add(analysis);

// Frame the analysis in the view
view.goTo(analysis.extent);

// Pass the analysis object as a constructor parameter to modify it using the widget
const viewModel = new LineOfSight({
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

