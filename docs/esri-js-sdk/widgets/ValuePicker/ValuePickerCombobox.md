# ValuePickerCombobox

**Module:** `@arcgis/core/widgets/ValuePicker/ValuePickerCombobox`

## Import

```javascript
import ValuePickerCombobox from "@arcgis/core/widgets/ValuePicker/ValuePickerCombobox.js";
```

```javascript
// CDN
const ValuePickerCombobox = await $arcgis.import("@arcgis/core/widgets/ValuePicker/ValuePickerCombobox.js");
```

**Since:** 4.27

## See Also

- Calcite combobox.label
- Calcite combobox.placeholder

## Property Details

### `ValuePickerCombobox`

### `items`

### `label`

### `placeholder`

### `type`

### `ComboboxItem`


## Examples

```javascript
// Create a ValuePicker widget with a combobox component.
const valuePicker = new ValuePicker({
  component: new ValuePickerCombobox({
    placeholder: "Pick Zoning Type",
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
// Create a ValuePicker with a zip code combobox component.
const valuePicker = new ValuePicker({
  component: new ValuePickerCombobox({
    placeholder: "Pick a Zip Code",
    items: [
      { value: "90606", label: "Whittier, CA (90606)" },
      { value: "76001", label: "Arlington, TX (76001)" },
      { value: "92335", label: "Fontana, CA (92335)" }
    ]
  }),
  values: ["90606"]
});
```

