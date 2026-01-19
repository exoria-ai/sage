# BuildingExplorer

**Module:** `@arcgis/core/widgets/BuildingExplorer`

## Import

```javascript
import BuildingExplorer from "@arcgis/core/widgets/BuildingExplorer.js";
```

```javascript
// CDN
const BuildingExplorer = await $arcgis.import("@arcgis/core/widgets/BuildingExplorer.js");
```

**Since:** 4.16

## See Also

- Sample - BuildingExplorer widget
- BuildingExplorerViewModel
- Heading Elements
- Calcite Icon Search

## Property Details

### `BuildingExplorer`

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

### `layers`

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

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const buildingExplorer = new BuildingExplorer({
  view: view,
  layers: [buildingSceneLayer]
});
// adds the BuildingExplorer to the top right corner of the SceneView
view.ui.add(buildingExplorer, "top-right");
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
buildingExplorer.headingLevel = 4;
```

```javascript
// Hides the widget in the view
widget.visible = false;
```

