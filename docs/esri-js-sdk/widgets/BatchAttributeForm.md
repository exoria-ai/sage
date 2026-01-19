# BatchAttributeForm

**Module:** `@arcgis/core/widgets/BatchAttributeForm`

## Import

```javascript
import BatchAttributeForm from "@arcgis/core/widgets/BatchAttributeForm.js";
```

```javascript
// CDN
const BatchAttributeForm = await $arcgis.import("@arcgis/core/widgets/BatchAttributeForm.js");
```

**Since:** 4.33

## See Also

- BatchAttributeFormViewModel
- DefaultUI
- Editor
- Heading Elements
- Calcite Icon Search
- Map.editableLayers

## Property Details

### `BatchAttributeForm`

### `activeFeatureIndex`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `features`

### `groupDisplay`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`
- **Type:** `Inherited`

### `layerInfos`

### `map`

### `readOnly`

### `timeZone`

### `valid`

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

### `submit`

### `when`
- **Type:** `Inherited`

### `LayerInfo`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const batchAttributeForm = new BatchAttributeForm({
  container: batchAttributeFormDiv, //HTML div
  features: featureCollection,
  map: map, // Required if using Arcade expressions that use the global $map variable
});
```

```javascript
// Typical usage
const batchAttributeForm = new BatchAttributeForm({
  container: "batchAttributeFormDiv", // HTML div
  features: featureCollection, // Pass in the featureCollection that works with the widget
  map: map, // Required if using Arcade expressions that use the global $map variable
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
// form title will render as an <h3>
// group element labels will render as an <h4>
featureForm.headingLevel = 3;
```

