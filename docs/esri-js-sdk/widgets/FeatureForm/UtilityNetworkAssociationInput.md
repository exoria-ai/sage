# UtilityNetworkAssociationInput

**Module:** `@arcgis/core/widgets/FeatureForm/UtilityNetworkAssociationInput`

## Import

```javascript
import UtilityNetworkAssociationInput from "@arcgis/core/widgets/FeatureForm/UtilityNetworkAssociationInput.js";
```

```javascript
// CDN
const UtilityNetworkAssociationInput = await $arcgis.import("@arcgis/core/widgets/FeatureForm/UtilityNetworkAssociationInput.js");
```

**Since:** 4.32

## See Also

- FeatureForm
- FeatureFormViewModel
- FieldInput

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `editable`

### `group`

### `type`

### `updating`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `refresh`

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

