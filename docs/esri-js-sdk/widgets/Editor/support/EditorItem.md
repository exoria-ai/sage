# EditorItem

**Module:** `@arcgis/core/widgets/Editor/support/EditorItem`

## Import

```javascript
import EditorItem from "@arcgis/core/widgets/Editor/support/EditorItem.js";
```

```javascript
// CDN
const EditorItem = await $arcgis.import("@arcgis/core/widgets/Editor/support/EditorItem.js");
```

**Since:** 4.30

## See Also

- Editor
- EditorViewModel
- Editor.layerInfos
- FeatureLayer.formTemplate
- SubtypeSublayer.formTemplate
- FeatureFormViewModel.valid
- FeatureLayer.isTable
- Editor.layerInfos

## Property Details

### `EditorItem`

### `capabilities`

### `declaredClass`
- **Type:** `Inherited`

### `disabled`

### `editable`

### `formTemplate`

### `hasInvalidFormTemplate`

### `isTable`

### `layer`

### `layerInfo`

### `supportsCreateFeaturesWorkflow`

### `supportsMergeFeaturesWorkflow`

### `supportsSplitFeatureWorkflow`

### `supportsUpdateWorkflow`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `AttachmentCapabilities`

### `CreateCapabilities`

### `DefaultEditingCapabilities`

### `DeleteCapabilities`

### `EditorEditingCapabilities`

### `RelationshipCapabilities`

### `UpdateCapabilities`


## Method Details

### `Method Details()`


## Examples

```javascript
//Create the Editor widget with a feature layer and form template
const editor = new Editor({
 view: view,
 layerInfos: [{
   layer: featureLayer, // references an existing feature layer
   formTemplate: formTemplate // references an existing form template
 }]
});
// Access the EditorItem from the Editor's view model
const editorItem = editor.viewModel.editorItems.find(item => item.layer === featureLayer);
//Check if the item is editable and if so, disable it
const isEditable = editorItem?.editable;
if (isEditable) {
  editorItem.disabled = true;
}
```

```javascript
// This creates a new EditorItem instance without the need to reference the Editor widget. It determines the editing capabilities for a specific layer.
const editorItem = new EditorItem({
 layer: featureLayer, // This property is required if creating a new instance of EditorItem
 layerInfo: featureLayerInfo
});
```

```javascript
// This creates a new EditorItem instance without the need to reference the Editor widget. It determines the editing capabilities for a specific layer.
const editorItem = new EditorItem({
  layer: featureLayer, // This property is required if creating a new instance of EditorItem
  layerInfo: featureLayerInfo
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
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

