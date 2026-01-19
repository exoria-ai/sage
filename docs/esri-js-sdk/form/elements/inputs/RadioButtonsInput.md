# RadioButtonsInput

**Module:** `@arcgis/core/form/elements/inputs/RadioButtonsInput`

## Import

```javascript
import RadioButtonsInput from "@arcgis/core/form/elements/inputs/RadioButtonsInput.js";
```

```javascript
// CDN
const RadioButtonsInput = await $arcgis.import("@arcgis/core/form/elements/inputs/RadioButtonsInput.js");
```

**Since:** 4.19

## See Also

- FieldElement
- CodedValueDomain

## Property Details

### `RadioButtonsInput`

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
// Creates a new Radio buttons input for a field element within a form
const radioButtonsInput = new RadioButtonsInput({
  noValueOptionLabel: "Unknown",
  showNoValueOption: true
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

