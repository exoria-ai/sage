# HistogramRangeSlider

**Module:** `@arcgis/core/widgets/HistogramRangeSlider`

## Import

```javascript
import HistogramRangeSlider from "@arcgis/core/widgets/HistogramRangeSlider.js";
```

```javascript
// CDN
const HistogramRangeSlider = await $arcgis.import("@arcgis/core/widgets/HistogramRangeSlider.js");
```

**Since:** 4.12

## See Also

- Histogram
- Slider
- HistogramRangeSliderViewModel
- includedBarColor
- rangeType
- Calcite Icon Search
- excludedBarColor
- rangeType
- values
- generateWhereClause()
- rangeType
- rangeType
- FeatureLayerView.filter
- FeatureEffect.filter
- FeatureLayerView.queryFeatures()

## Property Details

### `HistogramRangeSlider`

### `average`

### `barCreatedFunction`

### `bins`

### `container`
- **Type:** `Inherited`

### `dataLineCreatedFunction`

### `dataLines`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `excludedBarColor`

### `icon`

### `id`
- **Type:** `Inherited`

### `includedBarColor`

### `label`

### `labelFormatFunction`

### `max`

### `min`

### `precision`

### `rangeType`

### `standardDeviation`

### `standardDeviationCount`

### `values`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `generateWhereClause`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Typical usage
const slider = new HistogramRangeSlider({
  container: "sliderDiv",
  min: 0,
  max: 100,
  values: [ 50, 150 ]
});
```

```javascript
// sets result returned from a smart mapping method
// to the histogram
slider.average = response.statistics.avg;
```

```javascript
slider.barCreatedFunction = function(index, element){
  const bin = slider.bins[index];
  element.addEventListener("focus", function(){
    layerView.filter = {
      where: `POPULATION >= ${bin.minValue} AND POPULATION < ${bin.maxValue}`
    };
  });
  element.addEventListener("blur", function(){
    layerView.filter = null;
  });
};
```

```javascript
// sets the bins of the histogram from the bins in the histogram() result
histogram.bins = histogramResult.bins;
```

```javascript
// Creates a histogram with 7 bins.
histogram.bins = [
  { minValue: 0, maxValue: 10, count: 4 },
  { minValue: 10.1, maxValue: 20, count: 14 },
  { minValue: 20.1, maxValue: 30, count: 9 },
  { minValue: 30.1, maxValue: 40, count: 34 },
  { minValue: 40.1, maxValue: 50, count: 351 },
  { minValue: 50.1, maxValue: 60, count: 100 },
  { minValue: 60.1, maxValue: 70, count: 1 }
];
```

