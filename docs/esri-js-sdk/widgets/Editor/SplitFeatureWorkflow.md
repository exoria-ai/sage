# SplitFeatureWorkflow

**Module:** `@arcgis/core/widgets/Editor/SplitFeatureWorkflow`

## Import

```javascript
import SplitFeatureWorkflow from "@arcgis/core/widgets/Editor/SplitFeatureWorkflow.js";
```

```javascript
// CDN
const SplitFeatureWorkflow = await $arcgis.import("@arcgis/core/widgets/Editor/SplitFeatureWorkflow.js");
```

**Since:** 4.34

## See Also

- Editor
- Workflow
- Programming patterns: Widget viewModel pattern

## Property Details

### `activeFeature`

### `data`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `defaultSplitterGeometryType`

### `formViewModel`

### `hasNextStep`
- **Type:** `Inherited`

### `hasPreviousStep`
- **Type:** `Inherited`

### `layer`

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

### `setActiveFeature`

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

