# FieldInput

**Module:** `@arcgis/core/widgets/BatchAttributeForm/inputs/FieldInput`

## Import

```javascript
import FieldInput from "@arcgis/core/widgets/BatchAttributeForm/inputs/FieldInput.js";
```

```javascript
// CDN
const FieldInput = await $arcgis.import("@arcgis/core/widgets/BatchAttributeForm/inputs/FieldInput.js");
```

**Since:** 4.33

## See Also

- BatchAttributeForm
- BatchAttributeFormViewModel
- BatchFormInputs
- BatchAttributeFormViewModel

## Property Details

### `dataType`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `distinctValues`

### `domain`

### `editType`

### `editable`

### `existsInAllLayers`

### `featuresHaveSameValue`

### `field`

### `fieldName`

### `group`

### `includeTime`

### `includeTimeOffset`

### `invalidFeatures`

### `label`

### `layers`

### `maxLength`

### `minLength`

### `required`

### `type`

### `userHasChangedValue`

### `valid`

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

