# CatalogLayerListViewModel

**Module:** `@arcgis/core/widgets/CatalogLayerList/CatalogLayerListViewModel`

## Import

```javascript
import CatalogLayerListVM from "@arcgis/core/widgets/CatalogLayerList/CatalogLayerListViewModel.js";
```

```javascript
// CDN
const CatalogLayerListVM = await $arcgis.import("@arcgis/core/widgets/CatalogLayerList/CatalogLayerListViewModel.js");
```

**Since:** 4.30

## See Also

- CatalogLayerList
- Catalog Layer List component
- selectedItems
- Layer.listMode

## Property Details

### `CatalogLayerListViewModel`

### `catalogItems`

### `catalogLayer`

### `checkPublishStatusEnabled`

### `declaredClass`
- **Type:** `Inherited`

### `listItemCreatedFunction`

### `listModeDisabled`

### `state`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `emit`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `on`

### `removeHandles`
- **Type:** `Inherited`

### `triggerAction`

### `ListItemCreatedHandler`


## Method Details

### `Method Details()`


## Examples

```javascript
catalogLayerList.catalogLayer = new CatalogLayer({ url });
```

```javascript
// Create a new CatalogLayerListViewModel with a listItemCreatedFunction
// that adds an "add-layer" action to each catalog layer list item
const catalogLayerListViewModel = new CatalogLayerListViewModel({
 catalogLayer,
 listItemCreatedFunction: (event) => {
   const { item } = event;
   const { layer } = item;

   if (isLayerFromCatalog(layer)) {
     item.actionsSections = [
       [
         {
           title: "Add layer to map",
           icon: "add-layer",
           id: "add-layer"
         }
       ]
     ];
   }
 },
 view
});

// Listen for the trigger-action event on the CatalogLayerListViewModel
// and add layers from the catalog to the map when the "add-layer" action is triggered.
// To correctly add a layer to the map, you must create a footprint from the layer
// and then create a new layer from the footprint.
catalogLayerListViewModel.on("trigger-action", async (event) => {
  const { id } = event.action;
  const { layer } = event.item;

  if (id === "add-layer") {
    const parentCatalogLayer = catalogUtils.getCatalogLayerForLayer(layer);
    const footprint = parentCatalogLayer.createFootprintFromLayer(layer);
    const layerFromFootprint = await parentCatalogLayer.createLayerFromFootprint(footprint);
    map.add(layerFromFootprint);
  }
});
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

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
view.on("click", function(event){
  // event is the event handle returned after the event fires.
  console.log(event.mapPoint);
});
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

