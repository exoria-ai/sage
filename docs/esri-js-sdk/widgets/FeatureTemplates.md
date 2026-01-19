# FeatureTemplates

**Module:** `@arcgis/core/widgets/FeatureTemplates`

## Import

```javascript
import FeatureTemplates from "@arcgis/core/widgets/FeatureTemplates.js";
```

```javascript
// CDN
const FeatureTemplates = await $arcgis.import("@arcgis/core/widgets/FeatureTemplates.js");
```

**Since:** 4.10

## See Also

- Sample - Update FeatureLayer using ApplyEdits
- FeatureTemplatesViewModel
- TemplateItem
- TemplateItemGroup
- DefaultUI
- FeatureLayer
- FeatureTemplate
- Heading Elements
- Calcite Icon Search
- select event
- Sample - Update FeatureLayer using ApplyEdits

## Property Details

### `FeatureTemplates`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `enableListScroll`

### `filterFunction`

### `filterText`

### `groupBy`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `layers`

### `selectionMode`

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

### `select`

### `when`
- **Type:** `Inherited`

### `FilterFunction`

### `GroupByFunction`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const templates = new FeatureTemplates({
  container: "templatesDiv",
  layers: layers
});
```

```javascript
// Typical usage
const templates = new FeatureTemplates({
  container: "templatesDiv",
  layers: layers
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
// Filter and display templates only if their labels contain the word `Street`
function myFilterFunction(filter) {
  let containsName = filter.label.includes("Street");
  return containsName;
}

// Create the FeatureTemplates widget
templates = new FeatureTemplates({
  container: "templatesDiv",
  visibleElements: {
    filter: false, // disable the default filter UI
  },
  layers: [featureLayer], // in this example, one layer is used
  filterFunction: myFilterFunction
});
```

