# BasemapLayerList

**Module:** `@arcgis/core/widgets/BasemapLayerList`

## Import

```javascript
import BasemapLayerList from "@arcgis/core/widgets/BasemapLayerList.js";
```

```javascript
// CDN
const BasemapLayerList = await $arcgis.import("@arcgis/core/widgets/BasemapLayerList.js");
```

**Since:** 4.13

## See Also

- BasemapLayerListViewModel
- visibleElements.filter
- catalogOptions
- catalogLayerList
- visibleElements.collapseButton
- visibleElements.editTitleButton
- visibleElements.filter
- Heading Elements
- Calcite Icon Search
- visibleElements.filter
- visibleElements.filter
- selectionMode
- selectedItems

## Property Details

### `BasemapLayerList`

### `baseFilterPredicate`

### `baseFilterText`

### `baseItems`

### `baseListItemCreatedFunction`

### `basemapTitle`

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

### `editingTitle`

### `filterPlaceholder`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `minFilterItems`

### `referenceFilterPredicate`

### `referenceFilterText`

### `referenceItems`

### `referenceListItemCreatedFunction`

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

### `BaseFilterPredicate`

### `ListItemCreatedHandler`

### `ReferenceFilterPredicate`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
let basemapLayerList = new BasemapLayerList({
  view: view
});
// Adds the widget below other elements in the top left corner of the view
view.ui.add(basemapLayerList, {
  position: "top-left"
});
```

```javascript
// typical usage
let BasemapLayerList = new BasemapLayerList({
  view: view
});
```

```javascript
layerList.baseFilterPredicate = (item) => item.title.toLowerCase().includes("streets");
```

```javascript
reactiveUtils.watch(
  () => basemapLayerList.baseFilterText,
  (baseFilterText) => console.log(baseFilterText)
);
```

```javascript
const bmLayerList = new BasemapLayerList({
  view: view,
  baseListItemCreatedFunction: (event) => {
    const baseListItem = event.item;
    if(baseListItem.title === "World Imagery_01"){
      // clean up title
      baseListItem.title = "World Imagery";
      // open the baseList item
      baseListItem.open = true;
    }
  }
})
```

```javascript
// Use reactiveUtils to respond to the basemapLayerList.catalogLayerList "trigger-action" event
reactiveUtils.on(
  () => basemapLayerList.catalogLayerList,
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
    }
  }
);

// Use reactiveUtils to watch for a selected item in the basemapLayerList.catalogLayerList
reactiveUtils.watch(
  () => basemapLayerList.catalogLayerList?.selectedItems.at(0)?.layer,
  (layer) => {
    // When a layer is selected log out its title
    if (layer) {
      console.log(layer.title);
    }
  }
);
```

