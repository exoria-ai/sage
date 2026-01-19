# Expand

**Module:** `@arcgis/core/widgets/Expand`

## Import

```javascript
import Expand from "@arcgis/core/widgets/Expand.js";
```

```javascript
// CDN
const Expand = await $arcgis.import("@arcgis/core/widgets/Expand.js");
```

**Since:** 4.3

## See Also

- Samples with the Expand widget
- ExpandViewModel
- DefaultUI
- Calcite Icon Search
- Calcite Icon Search

## Property Details

### `Expand`

### `autoCollapse`

### `closeOnEsc`

### `collapseIcon`

### `collapseTooltip`

### `container`
- **Type:** `Inherited`

### `content`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `expandIcon`

### `expandTooltip`

### `expanded`

### `focusTrapDisabled`

### `group`

### `iconNumber`

### `id`
- **Type:** `Inherited`

### `label`

### `mode`

### `placement`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `collapse`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `expand`

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

### `toggle`

### `when`
- **Type:** `Inherited`

### `DomNodeOwner`


## Method Details

### `Method Details()`


## Examples

```javascript
// LayerList
const layerList = new LayerList({
  container: document.createElement("div"),
  view: view
});
const layerListExpand = new Expand({
  expandIcon: "layers",  // see https://developers.arcgis.com/calcite-design-system/icons/
  // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
  view: view,
  content: layerList
});
view.ui.add(layerListExpand, "top-right");
```

```javascript
let expand = new Expand({
   view: view,
   content: search,
   // widget will not be able to be closed from the ESC key
   closeOnEsc: false
});
```

```javascript
let expand = new Expand({
   view: view,
   content: search,
   // widget will close on ESC when Search has no active menu
   closeOnEsc: function() {
     return search.activeMenu === "none"
   }
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

