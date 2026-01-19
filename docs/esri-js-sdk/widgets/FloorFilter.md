# FloorFilter

**Module:** `@arcgis/core/widgets/FloorFilter`

## Import

```javascript
import FloorFilter from "@arcgis/core/widgets/FloorFilter.js";
```

```javascript
// CDN
const FloorFilter = await $arcgis.import("@arcgis/core/widgets/FloorFilter.js");
```

**Since:** 4.19

## See Also

- FloorFilterViewModel
- Sample - FloorFilter widget
- Sample - FloorFilter component
- Heading Elements
- Calcite Icon Search

## Property Details

### `FloorFilter`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `facility`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`
- **Type:** `Inherited`

### `level`

### `longNames`

### `site`

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

### `updateWebDocument`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Initialize FloorFilter
const floorFilter = new FloorFilter({
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
// building headings will render as an <h3>
floorFilter.headingLevel = 3;
```

```javascript
// Hides the widget in the view
widget.visible = false;
```

