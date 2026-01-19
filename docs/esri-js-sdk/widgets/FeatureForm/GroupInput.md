# GroupInput

**Module:** `@arcgis/core/widgets/FeatureForm/GroupInput`

## Import

```javascript
import GroupInput from "@arcgis/core/widgets/FeatureForm/GroupInput.js";
```

```javascript
// CDN
const GroupInput = await $arcgis.import("@arcgis/core/widgets/FeatureForm/GroupInput.js");
```

**Since:** 4.27

## See Also

- FeatureForm
- FeatureFormViewModel
- FieldInput
- GroupElement

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `initialState`

### `inputs`

### `label`

### `open`

### `type`

### `visible`

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

