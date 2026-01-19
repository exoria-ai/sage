# UpdateWorkflowData

**Module:** `@arcgis/core/widgets/Editor/UpdateWorkflowData`

## Import

```javascript
import UpdateWorkflowData from "@arcgis/core/widgets/Editor/UpdateWorkflowData.js";
```

```javascript
// CDN
const UpdateWorkflowData = await $arcgis.import("@arcgis/core/widgets/Editor/UpdateWorkflowData.js");
```

**Since:** 4.15

## See Also

- Editor
- EditorViewModel
- Workflow
- Edits
- CreateFeaturesWorkflow
- CreateFeaturesWorkflowData
- UpdateWorkflow

## Property Details

### `candidates`

### `declaredClass`
- **Type:** `Inherited`

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

