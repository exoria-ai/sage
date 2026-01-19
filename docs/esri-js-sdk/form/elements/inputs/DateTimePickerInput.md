# DateTimePickerInput

**Module:** `@arcgis/core/form/elements/inputs/DateTimePickerInput`

## Import

```javascript
import DateTimePickerInput from "@arcgis/core/form/elements/inputs/DateTimePickerInput.js";
```

```javascript
// CDN
const DateTimePickerInput = await $arcgis.import("@arcgis/core/form/elements/inputs/DateTimePickerInput.js");
```

**Since:** 4.17

## See Also

- FieldElement

## Property Details

### `DateTimePickerInput`

### `declaredClass`
- **Type:** `Inherited`

### `includeTime`

### `max`

### `min`

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
const dateTimePickerInput = new DateTimePickerInput({
  includeTime: true, // this will allow time input, default is false
  min: 1547678342000, // the minimum date input allowed
  max: 1610836742000 // the maximum date input allowed
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

