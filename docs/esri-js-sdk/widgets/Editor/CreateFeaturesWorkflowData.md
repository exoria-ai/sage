# CreateFeaturesWorkflowData

**Module:** `@arcgis/core/widgets/Editor/CreateFeaturesWorkflowData`

## Import

```javascript
import CreateFeaturesWorkflowData from "@arcgis/core/widgets/Editor/CreateFeaturesWorkflowData.js";
```

```javascript
// CDN
const CreateFeaturesWorkflowData = await $arcgis.import("@arcgis/core/widgets/Editor/CreateFeaturesWorkflowData.js");
```

**Since:** 4.23

## See Also

- Editor
- EditorViewModel
- Workflow
- CreateFeaturesWorkflow
- UpdateWorkflow
- UpdateWorkflowData
- CreateFeaturesWorkflow

## Property Details

### `creationInfo`

### `declaredClass`
- **Type:** `Inherited`

### `fullTemplate`

### `pendingFeatures`

### `viewModel`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

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

