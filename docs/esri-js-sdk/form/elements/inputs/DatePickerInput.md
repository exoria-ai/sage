# DatePickerInput

**Module:** `@arcgis/core/form/elements/inputs/DatePickerInput`

## Import

```javascript
import DatePickerInput from "@arcgis/core/form/elements/inputs/DatePickerInput.js";
```

```javascript
// CDN
const DatePickerInput = await $arcgis.import("@arcgis/core/form/elements/inputs/DatePickerInput.js");
```

**Since:** 4.28

## See Also

- FieldElement

## Property Details

### `DatePickerInput`

### `declaredClass`
- **Type:** `Inherited`

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
const datePickerInput = new DatePickerInput({
  min: "1982-01-15", // example showing the minimum date input allowed, ie. starts at January 15, 1982
  max: "2030-12-31" // example showing the maximum date input allowed, ie. ends with December 31, 2030
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

