# ValuePickerSlider

**Module:** `@arcgis/core/widgets/ValuePicker/ValuePickerSlider`

## Import

```javascript
import ValuePickerSlider from "@arcgis/core/widgets/ValuePicker/ValuePickerSlider.js";
```

```javascript
// CDN
const ValuePickerSlider = await $arcgis.import("@arcgis/core/widgets/ValuePicker/ValuePickerSlider.js");
```

**Since:** 4.27

## See Also

- Slider.labelFormatFunction
- Slider
- Slider.min

## Property Details

### `ValuePickerSlider`

### `labelFormatFunction`

### `labels`

### `majorTicks`

### `max`

### `min`

### `minorTicks`

### `reversed`

### `steps`

### `type`

### `visibleElements`

### `VisibleElements`


## Examples

```javascript
// Create a value picker with a slider component show percentages from 0 to 100.
const valuePickerSlider = new ValuePickerSlider({
  min: 0,
  max: 100,
  steps: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  minorTicks: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
  majorTicks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  labels: [0, 20, 40, 60, 80, 100],
  labelFormatFunction: (value) => `${value}%`
});
const valuePicker = new ValuePicker({
  component: valuePickerSlider,
  values: [50]
});
```

```javascript
// Display a label for each step. Each label will display the value as a localized distance in abbreviated
// kilometers (e.g. "90 km").
const formatter = new Intl.NumberFormat(undefined, { style: "unit", unit: "kilometer" });
const steps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const valuePicker = new ValuePicker({
  component: new ValuePickerSlider({
    min: 0,
    max: 100,
    steps,
    labels: steps,
    labelFormatFunction: (value) => formatter.format(value)
  },
  values: [0]
});
```

```javascript
// The assigned slider ranges in value from 0 to 100%. Steps are located at every 10% however labels are spaced very 20%.
const valuePicker = new ValuePicker({
  component: new ValuePickerSlider({
    min: 0,
    max: 100,
    steps: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    labels: [0, 20, 40, 60, 80, 100],
    labelFormatFunction: (value) => `${value}%`
  },
  values: [0]
});
```

```javascript
// Create ValuePicker with steps and minor ticks every 10 units from 0 to 100 and major ticks every 20.
const valuePicker = new ValuePicker({
  component: new ValuePickerSlider({
    min: 0,
    max: 100,
    steps: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    minorTicks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    majorTicks: [0, 20, 40, 60, 80, 100]
  },
  values: [0]
});
```

```javascript
// Create ValuePicker with steps and minor ticks every 10 units from 0 to 100.
const valuePicker = new ValuePicker({
  component: new ValuePickerSlider({
    min: 0,
    max: 100,
    steps: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    minorTicks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  },
  values: [0]
});
```

```javascript
// Create a horizontal ValuePicker with slider values in descending order.
const valuePicker = new ValuePicker({
  layout: "horizontal",
  component: new ValuePickerSlider({
    min: 0,
    max: 100,
    reversed: true
  },
  values: [0]
});
```

