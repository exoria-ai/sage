# UpdateFeaturesWorkflow

**Module:** `@arcgis/core/widgets/Editor/UpdateFeaturesWorkflow`

## Import

```javascript
import UpdateFeaturesWorkflow from "@arcgis/core/widgets/Editor/UpdateFeaturesWorkflow.js";
```

```javascript
// CDN
const UpdateFeaturesWorkflow = await $arcgis.import("@arcgis/core/widgets/Editor/UpdateFeaturesWorkflow.js");
```

**Since:** 4.33

## Property Details

### `UpdateFeaturesWorkflow`

### `data`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `hasNextStep`
- **Type:** `Inherited`

### `hasPreviousStep`
- **Type:** `Inherited`

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

