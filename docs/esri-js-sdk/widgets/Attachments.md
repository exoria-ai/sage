# Attachments

**Module:** `@arcgis/core/widgets/Attachments`

## Import

```javascript
import Attachments from "@arcgis/core/widgets/Attachments.js";
```

```javascript
// CDN
const Attachments = await $arcgis.import("@arcgis/core/widgets/Attachments.js");
```

**Since:** 4.15

## See Also

- Sample - Popup with edit action
- AttachmentsViewModel
- Editor
- Popup
- PopupTemplate
- AttachmentsContent
- DefaultUI
- FeatureLayer
- AttachmentInfo
- ArcGIS REST API - Attachment Infos (Feature Service)
- Calcite Icon Search

## Property Details

### `Attachments`

### `attachmentKeywords`

### `attachmentTypes`

### `capabilities`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `displayType`

### `graphic`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`
- **Type:** `Inherited`

### `submitting`

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

```javascript
// .tsx syntax showing how to set css classes while rendering the widget

render() {
  const dynamicClasses = {
    [css.flip]: this.flip,
    [css.primary]: this.primary
  };

  return (
    <div class={classes(css.root, css.mixin, dynamicClasses)} />
  );
}
```

