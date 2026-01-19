# UtilityNetworkValidateTopology

**Module:** `@arcgis/core/widgets/UtilityNetworkValidateTopology`

## Import

```javascript
import UtilityNetworkValidateTopology from "@arcgis/core/widgets/UtilityNetworkValidateTopology.js";
```

```javascript
// CDN
const UtilityNetworkValidateTopology = await $arcgis.import("@arcgis/core/widgets/UtilityNetworkValidateTopology.js");
```

**Since:** 4.27

## See Also

- UtilityNetwork
- UtilityNetworkValidateTopologyViewModel
- Calcite Icon Search

## Property Details

### `UtilityNetworkValidateTopology`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `extentToValidate`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `utilityNetwork`

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
// How to use the UtilityNetworkValidateTopology widget
view.when(async () => {
  // load all the layers in the map
  await view.map.loadAll();

  // if the map does not contain a utility network layer return
  if(!(view.map.utilityNetworks.items.length > 0)) {
    return;
  }

  utilityNetwork = view.map.utilityNetworks.getItemAt(0);
  await utilityNetwork.load();

  // function to add the dirty areas layer to the map
  addDirtyAreasLayer();

  // initialize the UtilityNetworkValidateTopology widget
  const unValidateTopology = new UtilityNetworkValidateTopology({
    view,
    utilityNetwork: utilityNetwork
  });

  view.ui.add(unValidateTopology, "top-left");
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

