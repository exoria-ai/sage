# BasemapGallery

**Module:** `@arcgis/core/widgets/BasemapGallery`

## Import

```javascript
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
```

```javascript
// CDN
const BasemapGallery = await $arcgis.import("@arcgis/core/widgets/BasemapGallery.js");
```

**Since:** 4.3

## See Also

- Basemap Gallery component
- Sample - Use Portal Basemaps
- BasemapGalleryViewModel
- Heading Elements
- Calcite Icon Search

## Property Details

### `BasemapGallery`

### `activeBasemap`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `source`

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
let basemapGallery = new BasemapGallery({
  view: view
});
// Add widget to the top right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
// typical usage
let basemapGallery = new BasemapGallery({
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
// "No basemaps available" will render as an <h3>
basemapGallery.headingLevel = 3;
```

