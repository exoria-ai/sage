# BinaryColorSizeSliderViewModel

**Module:** `@arcgis/core/widgets/smartMapping/BinaryColorSizeSlider/BinaryColorSizeSliderViewModel`

## Import

```javascript
import BinaryColorSizeSliderVM from "@arcgis/core/widgets/smartMapping/BinaryColorSizeSlider/BinaryColorSizeSliderViewModel.js";
```

```javascript
// CDN
const BinaryColorSizeSliderVM = await $arcgis.import("@arcgis/core/widgets/smartMapping/BinaryColorSizeSlider/BinaryColorSizeSliderViewModel.js");
```

**Since:** 4.28

## See Also

- BinaryColorSizeSlider
- primaryHandleEnabled
- inputParseFunction
- inputFormatFunction
- handlesSyncedToPrimary
- setValue
- zoomOptions
- zoomOptions
- zoomOptions
- precision

## Property Details

### `BinaryColorSizeSliderViewModel`

### `declaredClass`
- **Type:** `Inherited`

### `effectiveMax`
- **Type:** `Inherited`

### `effectiveMin`
- **Type:** `Inherited`

### `handlesSyncedToPrimary`
- **Type:** `Inherited`

### `inputFormatFunction`
- **Type:** `Inherited`

### `inputParseFunction`
- **Type:** `Inherited`

### `labelFormatFunction`
- **Type:** `Inherited`

### `labels`
- **Type:** `Inherited`

### `max`
- **Type:** `Inherited`

### `min`
- **Type:** `Inherited`

### `persistSizeRangeEnabled`
- **Type:** `Inherited`

### `precision`
- **Type:** `Inherited`

### `primaryHandleEnabled`
- **Type:** `Inherited`

### `state`
- **Type:** `Inherited`

### `stops`
- **Type:** `Inherited`

### `thumbsConstrained`
- **Type:** `Inherited`

### `values`
- **Type:** `Inherited`

### `zoomOptions`
- **Type:** `Inherited`

### `zoomingEnabled`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `defaultInputFormatFunction`
- **Type:** `Inherited`

### `defaultInputParseFunction`
- **Type:** `Inherited`

### `defaultLabelFormatFunction`
- **Type:** `Inherited`

### `getBounds`
- **Type:** `Inherited`

### `getBoundsForValueAtIndex`
- **Type:** `Inherited`

### `getLabelForValue`
- **Type:** `Inherited`

### `getUnzoomedMax`
- **Type:** `Inherited`

### `getUnzoomedMin`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `setValue`
- **Type:** `Inherited`

### `toPrecision`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// slider.viewModel.max = 100
slider.viewModel.effectiveMax = 60;
// now the user cannot slide thumbs above
// 60 even though the slider track displays
// values up to 100.
```

```javascript
// slider.viewModel.min = 0
slider.viewModel.effectiveMin = 4;
// now the user cannot slide thumbs below
// 4 even though the slider track displays
// values down to 0.
```

```javascript
// enables the primary handles and syncs it with the others
slider.viewModel.primaryHandleEnabled = true;
slider.viewModel.handlesSyncedToPrimary = true;
```

```javascript
// Formats the slider input to abbreviated numbers with units
// e.g. a thumb at position 1500 will render with an input label of 1.5k
slider.viewModel.inputFormatFunction = function(value, type){
  if(value >= 1000000){
    return (value / 1000000).toPrecision(3) + "m"
  }
  if(value >= 100000){
    return (value / 1000).toPrecision(3) + "k"
  }
  if(value >= 1000){
    return (value / 1000).toPrecision(2) + "k"
  }
  return value.toFixed(0);
}
```

```javascript
// Parses the slider input (a string value) to a number value understandable to the slider
// This assumes the slider was already configured with an inputFormatFunction
// For example, if the input is 1.5k this function will parse
// it to a value of 1500
slider.viewModel.inputParseFunction = function(value, type, index){
  let charLength = value.length;
  let valuePrefix = parseFloat(value.substring(0,charLength-1));
  let finalChar = value.substring(charLength-1);

  if(parseFloat(finalChar) >= 0){
    return parseFloat(value);
  }
  if(finalChar === "k"){
    return valuePrefix * 1000;
  }
  if(finalChar === "m"){
    return valuePrefix * 1000000;
  }
  return value;
}
```

```javascript
// For thumb values, rounds each label to whole numbers
sliderViewModel.labelFormatFunction = function(value, type) {
  return (type === "value") ? value.toFixed(0): value;
}
```

