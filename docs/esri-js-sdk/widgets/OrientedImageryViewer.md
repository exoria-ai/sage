# OrientedImageryViewer

**Module:** `@arcgis/core/widgets/OrientedImageryViewer`

## Import

```javascript
import OrientedImageryViewer from "@arcgis/core/widgets/OrientedImageryViewer.js";
```

```javascript
// CDN
const OrientedImageryViewer = await $arcgis.import("@arcgis/core/widgets/OrientedImageryViewer.js");
```

**Since:** 4.28

## See Also

- OrientedImageryLayer
- Sample - Intro to OrientedImageryLayer
- Sample - OrientedImageryLayer in SceneView
- Calcite Icon Search

## Property Details

### `OrientedImageryViewer`

### `container`
- **Type:** `Inherited`

### `currentCoverageVisible`

### `dataCaptureEnabled`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `galleryOpened`

### `icon`

### `id`
- **Type:** `Inherited`

### `imageEnhancementToolActive`

### `imageGalleryEnabled`

### `imageOverlaysOpened`

### `isAdditionalCoverageVisible`

### `isAdditionalPointSourcesVisible`

### `label`
- **Type:** `Inherited`

### `layer`

### `mapImageConversionToolState`

### `navigationToolActive`

### `referencePoint`

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

### `reset`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// typical usage
orientedImageryViewer = new OrientedImageryViewer({
  view,
  container: "oi-container"
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
// Hides the widget in the view
widget.visible = false;
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

