# TimePickerInput

**Module:** `@arcgis/core/form/elements/inputs/TimePickerInput`

## Import

```javascript
import TimePickerInput from "@arcgis/core/form/elements/inputs/TimePickerInput.js";
```

```javascript
// CDN
const TimePickerInput = await $arcgis.import("@arcgis/core/form/elements/inputs/TimePickerInput.js");
```

**Since:** 4.28

## See Also

- FieldElement
- FeatureForm
- Editor
- FeatureLayer
- FormTemplate

## Property Details

### `TimePickerInput`

### `declaredClass`
- **Type:** `Inherited`

### `max`

### `min`

### `timeResolution`

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
const timePickerInput = new TimePickerInput({
  min: "14:15:00" , // the minimum time input allowed, this equates to 2:15 PM (14th hour), 30 seconds, and 132 milliseconds.
  max: "20:10:15", // the maximum time input allowed, this equates to 8:10 PM (20th hour), 15 seconds, and 123 milliseconds.
  timeResolution: "minutes" // the level of precision needed for the time input
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

