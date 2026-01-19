# FeatureForm

**Module:** `@arcgis/core/widgets/FeatureForm`

## Import

```javascript
import FeatureForm from "@arcgis/core/widgets/FeatureForm.js";
```

```javascript
// CDN
const FeatureForm = await $arcgis.import("@arcgis/core/widgets/FeatureForm.js");
```

**Since:** 4.9

## See Also

- Sample - Update Feature Attributes
- Sample - Update FeatureLayer using ApplyEdits
- Sample - Advanced Attribute Editing
- FeatureFormViewModel
- FormTemplate
- DefaultUI
- FeatureLayer
- Editor
- Sample - Update Feature Attributes
- Sample - Advanced Attribute Editing
- Sample - Update Feature Attributes
- Heading Elements
- Calcite Icon Search
- submit
- submit()
- submit()
- getValues()

## Property Details

### `FeatureForm`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `feature`

### `formTemplate`

### `groupDisplay`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `layer`

### `map`

### `timeZone`

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

### `getValues`

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

### `submit`

### `when`
- **Type:** `Inherited`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const featureForm = new FeatureForm({
  container: "formDiv",
  map: map, // Required if using Arcade expressions that use the global $map variable
  feature: graphic,
  formTemplate: template
});
```

```javascript
// Typical usage
const featureForm = new FeatureForm({
  container: "formDiv", // HTML div
  map: map, // Required if using Arcade expressions that use the global $map variable
  feature: graphic, // Pass in feature
  // Specify the form's template for how it is configured
  formTemplate: template
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
// Check if a user clicked on an incident feature.
view.on("click", function(event) {
  view.hitTest(event).then(function(response) {
    // Display the attributes of selected incident feature in the form
    if (response.results[0].graphic && response.results[0].graphic.layer.id == "incidentsLayer") {
       formVM.feature = result.results[0].graphic
    }
  });
});
```

