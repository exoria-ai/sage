# UpdateWorkflow

**Module:** `@arcgis/core/widgets/Editor/UpdateWorkflow`

## Import

```javascript
import UpdateWorkflow from "@arcgis/core/widgets/Editor/UpdateWorkflow.js";
```

```javascript
// CDN
const UpdateWorkflow = await $arcgis.import("@arcgis/core/widgets/Editor/UpdateWorkflow.js");
```

**Since:** 4.15

## See Also

- Editor
- Workflow
- UpdateWorkflowData
- Programming patterns: Widget viewModel pattern
- Sample - Edit features with the Editor widget
- Sample - Edit features in 3D with the Editor widget
- Sample - Editor widget with configurations
- Sample - Popup with edit action

## Property Details

### `data`

### `declaredClass`
- **Type:** `Inherited`

### `hasNextStep`
- **Type:** `Inherited`

### `hasPreviousStep`

### `started`
- **Type:** `Inherited`

### `stepId`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `cancel`
- **Type:** `Inherited`

### `commit`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `next`
- **Type:** `Inherited`

### `previous`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `reset`
- **Type:** `Inherited`

### `start`
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

