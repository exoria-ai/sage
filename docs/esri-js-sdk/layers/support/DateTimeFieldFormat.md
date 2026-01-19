# DateTimeFieldFormat

**Module:** `@arcgis/core/layers/support/DateTimeFieldFormat`

## Import

```javascript
import DateTimeFieldFormat from "@arcgis/core/layers/support/DateTimeFieldFormat.js";
```

```javascript
// CDN
const DateTimeFieldFormat = await $arcgis.import("@arcgis/core/layers/support/DateTimeFieldFormat.js");
```

**Since:** 4.34

## See Also

- MDN documentation - DateTimeFormat
- CLDR
- FieldConfiguration
- MDN documentation
- MDN documentation
- MDN documentation
- MDN documentation
- MDN documentation

## Property Details

### `DateTimeFieldFormat`

### `dateStyle`

### `declaredClass`
- **Type:** `Inherited`

### `hour12`

### `month`

### `timeStyle`

### `type`

### `year`

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
// Create a date-time field format
const dateTimeFormat = new DateTimeFieldFormat ({
  dateStyle: "medium",
  timeStyle: "short",
  hour12: "never"
});

// Create a field configuration object containing the date-time format
const dateFieldConfiguration = new FieldConfiguration ({
  name: "pollsclose", // name of the field in the service
  fieldFormat: dateTimeFormat,
  alias: "Polls close"
});

// Create a feature layer and pass in the field configurations
const featureLayer = new FeatureLayer ({
  url: "URL to feature service",
  outFields: ["*"],
  fieldConfigurations: [dateFieldConfiguration] // add as many field configurations as needed
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

