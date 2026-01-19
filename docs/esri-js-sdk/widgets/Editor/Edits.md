# Edits

**Module:** `@arcgis/core/widgets/Editor/Edits`

## Import

```javascript
import Edits from "@arcgis/core/widgets/Editor/Edits.js";
```

```javascript
// CDN
const Edits = await $arcgis.import("@arcgis/core/widgets/Editor/Edits.js");
```

**Since:** 4.15

## See Also

- Editor
- EditorViewModel
- Workflow
- CreateFeaturesWorkflow
- CreateFeaturesWorkflowData
- UpdateWorkflow
- UpdateWorkflowData

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `feature`

### `modified`

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

