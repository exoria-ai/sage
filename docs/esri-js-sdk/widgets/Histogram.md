# Histogram

**Module:** `@arcgis/core/widgets/Histogram`

## Import

```javascript
import Histogram from "@arcgis/core/widgets/Histogram.js";
```

```javascript
// CDN
const Histogram = await $arcgis.import("@arcgis/core/widgets/Histogram.js");
```

**Since:** 4.12

## See Also

- histogram
- summaryStatistics
- Calcite Icon Search

## Property Details

### `Histogram`

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

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `labelFormatFunction`

### `layout`

### `max`

### `min`

### `state`

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

### `fromHistogramResult`

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

### `BarCreatedFunction`

### `Bin`

### `DataLineCreatedFunction`

### `LabelFormatter`


## Method Details

### `Method Details()`


## Examples

```javascript
const params = {
  layer: povLayer,
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY",
  numBins: 30
};

histogram(params)
  .then(function(histogramResult) {
     const histogram = Histogram.fromHistogramResult(histogramResult);
     histogram.container = "histogram";
  })
   .catch(function(error) {
     console.log("there was an error: ", error);
   });
```

```javascript
// typical usage
const histogram = new Histogram({
  bins: [{
    minValue: 0,
    maxValue: 20,
    count: 1
  }, {
    minValue: 21,
    maxValue: 40,
    count: 60
  },{
    minValue: 41,
    maxValue: 60,
    count: 239
  },{
    minValue: 61,
    maxValue: 80,
    count: 88
  },{
    minValue: 81,
    maxValue: 100,
    count: 20
  }],
  max: 100,
  min: 0,
  average: 44
});
```

```javascript
// sets result returned from a smart mapping method
// to the histogram
histogram.average = response.statistics.avg;
```

```javascript
histogram.barCreatedFunction = function(index, element){
  let bin = histogram.bins[index];
  let midValue = ((bin.maxValue - bin.minValue) / 2) + bin.minValue;
  // colors the histogram bins with a custom function
  // (not defined here for brevity of the snippet) for interpolating
  // colors from data values to match the legend
  let color = getColorFromValue(midValue);
  element.setAttribute("fill", color.toHex());
};
```

```javascript
// sets the bins of the histogram from the bins in the histogram() result
histogram.bins = histogramResult.bins;
```

