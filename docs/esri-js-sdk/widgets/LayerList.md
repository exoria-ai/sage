# LayerList

**Module:** `@arcgis/core/widgets/LayerList`

## Import

```javascript
import LayerList from "@arcgis/core/widgets/LayerList.js";
```

```javascript
// CDN
const LayerList = await $arcgis.import("@arcgis/core/widgets/LayerList.js");
```

**Since:** 4.2

## See Also

- Sample - LayerList widget
- Sample - LayerList widget with actions
- LayerListViewModel
- catalogOptions
- catalogLayerList
- visibleElements.collapseButton
- minDragEnabledItems
- visibleElements.filter
- visibleElements.filter
- visibleElements.heading
- Calcite Icon Search
- tableList
- Sample - LayerList widget with actions
- dragEnabled
- visibleElements.filter
- catalogLayerList
- tableList
- Layer.listMode
- selectionMode
- selectedItems
- knowledgeGraphOptions

## Property Details

### `LayerList`

### `catalogLayerList`

### `catalogOptions`

### `collapsed`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `dragEnabled`

### `filterPlaceholder`

### `filterPredicate`

### `filterText`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `knowledgeGraphOptions`

### `label`

### `listItemCreatedFunction`

### `minDragEnabledItems`

### `minFilterItems`

### `openedLayers`

### `operationalItems`

### `selectedItems`

### `selectionMode`

### `tableList`

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
const layerList = new LayerList({
  view: view
});
// Adds widget below other elements in the top left corner of the view
view.ui.add(layerList, {
  position: "top-left"
});
```

```javascript
// typical usage
const layerlist = new LayerList({
  view
});
```

```javascript
// Use reactiveUtils to respond to the layerList.catalogLayerList "trigger-action" event
reactiveUtils.on(
  () => layerList.catalogLayerList,
  "trigger-action",
  async (event) => {
    if (event.action.id === "add-layer") {
      // Get the parent catalog layer
      const parentCatalogLayer = catalogUtils.getCatalogLayerForLayer(event.item.layer);
      // Get the footprint from the parent catalog layer
      const footprint = parentCatalogLayer.createFootprintFromLayer(event.item.layer);
      // Get the layer from the footprint
      const layerFromFootprint = await parentCatalogLayer.createLayerFromFootprint(footprint);
      // Add the layer to the map
      map.add(layerFromFootprint);
      // back out of the catalog layer list to the main layer list
      layerList.openedLayers.pop();
    }
  }
);

// Use reactiveUtils to watch for a selected item in the layerList.catalogLayerList
reactiveUtils.watch(
  () => layerList.catalogLayerList?.selectedItems.at(0)?.layer,
  (layer) => {
    // When a layer is selected log out its title
    if (layer) {
      console.log(layer.title);
    }
  }
);
```

```javascript
const layerList = new LayerList({
  catalogOptions: {
    listItemCreatedFunction: (event) => {
      const { item } = event;
      item.actionsSections = [
        [
          {
            title: "Add layer to map",
            icon: "add-layer",
            id: "add-layer"
          }
        ]
      ];
    },
    selectionMode: "single",
    visibleElements: {
      filter: true
    }
  },
  view,
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

