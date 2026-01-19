# CatalogLayerList

**Module:** `@arcgis/core/widgets/CatalogLayerList`

## Import

```javascript
import CatalogLayerList from "@arcgis/core/widgets/CatalogLayerList.js";
```

```javascript
// CDN
const CatalogLayerList = await $arcgis.import("@arcgis/core/widgets/CatalogLayerList.js");
```

**Since:** 4.30

## See Also

- CatalogLayer
- CatalogLayerListViewModel
- LayerList.catalogLayerList
- selectedItems
- visibleElements.collapseButton
- visibleElements.filter
- visibleElements.filter
- visibleElements.heading
- Calcite Icon Search
- visibleElements.filter
- selectionMode
- catalogItems
- selectedItems

## Property Details

### `CatalogLayerList`

### `catalogItems`

### `catalogLayer`

### `collapsed`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `filterPlaceholder`

### `filterPredicate`

### `filterText`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `listItemCreatedFunction`

### `minFilterItems`

### `selectedItems`

### `selectionMode`

### `view`

### `viewModel`

### `visibilityAppearance`

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

### `triggerAction`

### `when`
- **Type:** `Inherited`

### `FilterPredicate`

### `ListItemCreatedHandler`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const catalogLayerList = new CatalogLayerList({
  catalogLayer,
  view
});

view.ui.add(catalogLayerList, "top-right");
```

```javascript
// typical usage
const catalogLayerList = new CatalogLayerList({
  catalogLayer,
  view
});

view.ui.add(catalogLayerList, "top-right");
```

```javascript
catalogLayerList.catalogLayer = new CatalogLayer({ url });
```

```javascript
catalogLayerList.collapsed = true;
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

