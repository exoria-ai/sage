# FieldInput

**Module:** `@arcgis/core/widgets/FeatureForm/FieldInput`

## Import

```javascript
import FieldInput from "@arcgis/core/widgets/FeatureForm/FieldInput.js";
```

```javascript
// CDN
const FieldInput = await $arcgis.import("@arcgis/core/widgets/FeatureForm/FieldInput.js");
```

**Since:** 4.27

## See Also

- FeatureForm
- FeatureFormViewModel
- GroupInput

## Property Details

### `dataType`

### `declaredClass`
- **Type:** `Inherited`

### `domain`

### `editable`

### `error`

### `field`

### `group`

### `hint`

### `includeDate`

### `includeTime`

### `includeTimeOffset`

### `inputType`

### `label`

### `maxLength`

### `minLength`

### `name`

### `required`

### `submittable`

### `type`

### `updating`

### `valid`

### `value`

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

