# Editor

**Module:** `@arcgis/core/widgets/Editor`

## Import

```javascript
import Editor from "@arcgis/core/widgets/Editor.js";
```

```javascript
// CDN
const Editor = await $arcgis.import("@arcgis/core/widgets/Editor.js");
```

**Since:** 4.11

## See Also

- Sample - Edit features with the Editor widget
- Sample - Edit features in 3D with the Editor widget
- Sample - Editor widget with configurations
- Sample - Popup with edit action
- Sample - Editing with calculated field expressions
- Sample - SceneLayer upload 3D models and applyEdits
- EditorViewModel
- Workflow
- CreateFeaturesWorkflow
- UpdateWorkflow
- CreateFeaturesWorkflowData
- UpdateWorkflowData
- DefaultUI
- FeatureLayer
- SketchLabelOptions
- SketchTooltipOptions
- SketchValueOptions
- SnappingOptions
- SnappingControls
- Heading Elements
- Calcite Icon Search
- Sample - Editor widget with configurations
- Map.editableLayers
- Sample - Editor widget with configurations
- Sample - Editor widget with configurations
- Sample - Editing with calculated field expressions
- UpdateWorkflow
- UpdateWorkflow
- UpdateWorkflow
- UpdateFeaturesWorkflow
- CreateFeaturesWorkflow
- CreateFeaturesWorkflow
- MergeFeaturesWorkflow
- UpdateFeaturesWorkflow
- UpdateWorkflow
- Sample - Popup with edit action
- UpdateWorkflow
- UpdateWorkflow

## Property Details

### `Editor`

### `activeWorkflow`

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

### `labelOptions`

### `layerInfos`

### `snappingOptions`

### `supportingWidgetDefaults`

### `tooltipOptions`

### `valueOptions`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `cancelWorkflow`

### `classes`
- **Type:** `Inherited`

### `deleteAssociationFromWorkflow`

### `deleteFeatureFromWorkflow`

### `deleteFeatures`

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

### `startCreateFeaturesWorkflowAtFeatureCreation`

### `startCreateFeaturesWorkflowAtFeatureEdit`

### `startCreateFeaturesWorkflowAtFeatureTypeSelection`

### `startMergeFeaturesWorkflow`

### `startSplitFeatureWorkflow`

### `startUpdateFeaturesWorkflow`

### `startUpdateWorkflowAtFeatureEdit`

### `startUpdateWorkflowAtFeatureSelection`

### `startUpdateWorkflowAtMultipleFeatureSelection`

### `when`
- **Type:** `Inherited`

### `CreateFeaturesCreationInfo`

### `CreationInfo`

### `FeatureInfo`

### `LayerInfo`

### `SupportingWidgetDefaults`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
// At the very minimum, set the Editor's view
const editor = new Editor({
  view: view
});

view.ui.add(editor, "top-right");
```

```javascript
// Typical usage for Editor widget. By default, this will recognize all editable layers in the map if no specific layers are set. It is also possible to iterate through the map's editableLayers and load any layers needed for editing.

const editor = new Editor({
  view: view
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
// "Editor" will render as an <h3>
editor.headingLevel = 3;
```

