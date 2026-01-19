# ValuePickerLabel

**Module:** `@arcgis/core/widgets/ValuePicker/ValuePickerLabel`

## Import

```javascript
import ValuePickerLabel from "@arcgis/core/widgets/ValuePicker/ValuePickerLabel.js";
```

```javascript
// CDN
const ValuePickerLabel = await $arcgis.import("@arcgis/core/widgets/ValuePicker/ValuePickerLabel.js");
```

**Since:** 4.27

## Property Details

### `ValuePickerLabel`

### `items`

### `type`

### `labelitem`


## Examples

```javascript
// Create a ValuePicker widget with a label component.
const valuePicker = new ValuePicker({
  component: new ValuePickerLabel({
    items: [
      { value: "ind", label: "Industrial" },
      { value: "res", label: "Residential" },
      { value: "com", label: "Commercial" }
    ]
  }),
  values: ["res"]
});
```

```javascript
// Create a ValuePicker with a zip code label component.
const valuePicker = new ValuePicker({
  component: new ValuePickerLabel({
    items: [
      { value: "90606", label: "Whittier, CA (90606)" },
      { value: "76001", label: "Arlington, TX (76001)" },
      { value: "92335", label: "Fontana, CA (92335)" }
    ]
  }),
  values: ["90606"]
});
```

