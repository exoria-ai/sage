# CreateFeaturesWorkflow

**Module:** `@arcgis/core/widgets/Editor/CreateFeaturesWorkflow`

## Import

```javascript
import CreateFeaturesWorkflow from "@arcgis/core/widgets/Editor/CreateFeaturesWorkflow.js";
```

```javascript
// CDN
const CreateFeaturesWorkflow = await $arcgis.import("@arcgis/core/widgets/Editor/CreateFeaturesWorkflow.js");
```

**Since:** 4.23

## See Also

- Editor
- Workflow
- UpdateWorkflow
- Programming patterns: Widget viewModel pattern
- Sample - Edit features with the Editor widget
- Sample - Edit features in 3D with the Editor widget
- Sample - Editor widget with configurations
- pendingFeatures
- numPendingFeatures

## Property Details

### `createFeatureState`

### `data`

### `declaredClass`
- **Type:** `Inherited`

### `hasNextStep`
- **Type:** `Inherited`

### `hasPreviousStep`
- **Type:** `Inherited`

### `numPendingFeatures`

### `pendingFeatures`

### `started`
- **Type:** `Inherited`

### `stepId`
- **Type:** `Inherited`

### `type`
- **Type:** `Inherited`

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

### `updatePendingFeature`


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

