# TextBoxInput

**Module:** `@arcgis/core/form/elements/inputs/TextBoxInput`

## Import

```javascript
import TextBoxInput from "@arcgis/core/form/elements/inputs/TextBoxInput.js";
```

```javascript
// CDN
const TextBoxInput = await $arcgis.import("@arcgis/core/form/elements/inputs/TextBoxInput.js");
```

**Since:** 4.16

## See Also

- TextAreaInput
- BarcodeScannerInput
- FieldElement

## Property Details

### `TextBoxInput`

### `declaredClass`
- **Type:** `Inherited`

### `maxLength`

### `minLength`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
// Create a new TextBox input
const textBoxInput = new TextBoxInput({
  minLength: 10,
  maxLength: 30
})
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

