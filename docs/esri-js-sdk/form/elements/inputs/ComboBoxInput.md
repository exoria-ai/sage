# ComboBoxInput

**Module:** `@arcgis/core/form/elements/inputs/ComboBoxInput`

## Import

```javascript
import ComboBoxInput from "@arcgis/core/form/elements/inputs/ComboBoxInput.js";
```

```javascript
// CDN
const ComboBoxInput = await $arcgis.import("@arcgis/core/form/elements/inputs/ComboBoxInput.js");
```

**Since:** 4.19

## See Also

- FieldElement
- CodedValueDomain

## Property Details

### `ComboBoxInput`

### `declaredClass`
- **Type:** `Inherited`

### `noValueOptionLabel`

### `showNoValueOption`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// Creates a new ComboBox input for a field element within a form
const comboBoxInput = new ComboBoxInput({
  showNoValueOption: false
});
```

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

