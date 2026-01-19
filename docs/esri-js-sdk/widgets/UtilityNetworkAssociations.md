# UtilityNetworkAssociations

**Module:** `@arcgis/core/widgets/UtilityNetworkAssociations`

## Import

```javascript
import UtilityNetworkAssociations from "@arcgis/core/widgets/UtilityNetworkAssociations.js";
```

```javascript
// CDN
const UtilityNetworkAssociations = await $arcgis.import("@arcgis/core/widgets/UtilityNetworkAssociations.js");
```

**Since:** 4.26

## See Also

- UtilityNetworkAssociationsViewModel
- UtilityNetwork
- Calcite Icon Search

## Property Details

### `UtilityNetworkAssociations`

### `autoRefreshAssociations`

### `connectivityAssociationsLineSymbol`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `icon`

### `id`
- **Type:** `Inherited`

### `includeConnectivityAssociations`

### `includeStructuralAttachmentAssociations`

### `label`

### `maxAllowableAssociations`

### `maxAllowableAssociationsSliderMax`

### `maxAllowableAssociationsSliderMin`

### `maxAllowableAssociationsSliderStep`

### `showArrowsConnectivity`

### `showArrowsStructuralAttachment`

### `showAssociationsEnabled`

### `structuralAttachmentAssociationsLineSymbol`

### `utilityNetwork`

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
// Create a new instance of the UtilityNetworkAssociations widget and set
// its required parameters.
const unAssociationsWidget = new UtilityNetworkAssociations({
  view: view
});

view.ui.add(unAssociationsWidget, "top-right");
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

