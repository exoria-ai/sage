# Legend

**Module:** `@arcgis/core/widgets/Legend`

## Import

```javascript
import Legend from "@arcgis/core/widgets/Legend.js";
```

```javascript
// CDN
const Legend = await $arcgis.import("@arcgis/core/widgets/Legend.js");
```

**Since:** 4.0

## See Also

- DefaultUI
- Heading Elements
- respectLayerVisibility
- Calcite Icon Search
- definitionExpression
- hideLayersNotInCurrentView

## Property Details

### `Legend`

### `activeLayerInfos`

### `basemapLegendVisible`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `headingLevel`

### `hideLayersNotInCurrentView`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `layerInfos`

### `respectLayerDefinitionExpression`

### `respectLayerVisibility`

### `style`

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
let legend = new Legend({
  view: view
});

view.ui.add(legend, "bottom-right");
```

```javascript
// typical usage
let legend = new Legend({
  view: view
});
```

```javascript
legend.basemapLegendVisible = true;
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

