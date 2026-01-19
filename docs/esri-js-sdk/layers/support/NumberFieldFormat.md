# NumberFieldFormat

**Module:** `@arcgis/core/layers/support/NumberFieldFormat`

## Import

```javascript
import NumberFieldFormat from "@arcgis/core/layers/support/NumberFieldFormat.js";
```

```javascript
// CDN
const NumberFieldFormat = await $arcgis.import("@arcgis/core/layers/support/NumberFieldFormat.js");
```

**Since:** 4.34

## See Also

- FieldConfiguration
- MDN documentation - DateTimeFormat
- CLDR
- MDN documentation
- MDN documentation
- MDN documentation
- MDN documentation

## Property Details

### `NumberFieldFormat`

### `declaredClass`
- **Type:** `Inherited`

### `maximumFractionDigits`

### `minimumFractionDigits`

### `style`

### `type`

### `useGrouping`

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
// Create a number field format
const numberFieldFormat = new NumberFieldFormat ({
  minimumFractionDigits: 1,
  maximumFractionDigits: 3,
  useGrouping: "never"
});

// Create a field configuration object containing the number format
const numberFieldConfiguration = new FieldConfiguration ({
  name: "voterCount", // name of the field in the service
  fieldFormat: numberFieldFormat,
  alias: "Voter Count"
});

// Create a feature layer and pass in the field configurations
const featureLayer = new FeatureLayer ({
  url: "url to feature layer",
  outFields: ["*"],
  fieldConfigurations: [numberFieldConfiguration] // add as many field configurations as needed
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

