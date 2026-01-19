# DateTimeOffsetPickerInput

**Module:** `@arcgis/core/form/elements/inputs/DateTimeOffsetPickerInput`

## Import

```javascript
import DateTimeOffsetPickerInput from "@arcgis/core/form/elements/inputs/DateTimeOffsetPickerInput.js";
```

```javascript
// CDN
const DateTimeOffsetPickerInput = await $arcgis.import("@arcgis/core/form/elements/inputs/DateTimeOffsetPickerInput.js");
```

**Since:** 4.28

## See Also

- {@link:esri/form/elements/FieldElement}
- {@link:esri/form/elements/FieldElement#input inputs}

## Property Details

### `DateTimeOffsetPickerInput`

### `declaredClass`
- **Type:** `Inherited`

### `includeTimeOffset`

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
const dateTimeOffsetPickerInput = new DateTimeOffsetPickerInput({
  min: "2020-03-15T14:30-05:00", // the minimum date/time input allowed, this equates to March 15, 2020, at 2:30 PM in the Eastern time zone, which is UTC-5.
  max: "2020-04-15T24:00-08:00", // the maximum date/time input allowed, this equates to midnight (00:00) on April 15, 2020, in the Pacific time zone with a UTC offset of -8 hours.
  includeTimeOffset: true
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

