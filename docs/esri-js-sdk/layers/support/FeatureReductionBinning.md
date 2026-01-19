# FeatureReductionBinning

**Module:** `@arcgis/core/layers/support/FeatureReductionBinning`

## Import

```javascript
import FeatureReductionBinning from "@arcgis/core/layers/support/FeatureReductionBinning.js";
```

```javascript
// CDN
const FeatureReductionBinning = await $arcgis.import("@arcgis/core/layers/support/FeatureReductionBinning.js");
```

**Since:** 4.24

## See Also

- Sample - Binning - basic configuration
- Sample - Binning - Filter by category
- Sample - Binning with aggregate fields
- Sample - Summarize binned data using Arcade
- CSVLayer.featureReduction
- FeatureLayer.featureReduction
- GeoJSONLayer.featureReduction
- OGCFeatureLayer.featureReduction
- Arcade Feature Reduction Popup Profile
- Sample - Binning - basic configuration

## Property Details

### `FeatureReductionBinning`

### `declaredClass`
- **Type:** `Inherited`

### `fields`

### `fixedBinLevel`

### `labelingInfo`

### `labelsVisible`

### `maxScale`

### `popupEnabled`

### `popupTemplate`

### `renderer`

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
layer.featureReduction = {
  type: "binning",
  fields: [{
    name: "aggregateCount",
    statisticType: "count"
  }]
  renderer: {
    type: "simple",  // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      outline: {  // autocasts as new SimpleLineSymbol()
        width: 0.5,
        color: "white"
      }
    },
    visualVariables: [{
      type: "color",
      field: "aggregateCount",
      stops: [
        { value: 1, color: "white" },
        { value: 1000, color: "blue" }
      ]
    }]
  },
  popupTemplate: {
    content: "This bin contains <b>{aggregateCount}</b> features.",
    fieldInfos: [{
      fieldName: "aggregateCount",
      format: {
        digitSeparator: true,
        places: 0
      }
    }]
  }
};
```

```javascript
featureReduction.fields = [{
  name: "aggregateCount",
  statisticType: "count"
}, {
  name: "SUM_population",
  onStatisticField: "population",
  statisticType: "sum"
}, {
  name: "AVG_age",
  onStatisticField: "age",
  statisticType: "avg"
}, {
  name: "AVG_population_density",
  alias: "Average population density",
  onStatisticExpression: {
    expression: "$feature.population / AreaGeodetic($feature, 'square-miles')",
    title: "population density",
    returnType: "number"
  },
  statisticType: "avg"
}];
```

```javascript
featureReduction.fixedBinLevel = 4;
```

```javascript
// Displays the count inside the bin
layer.featureReduction = {
  type: "binning",
  fields: [{
    name: "aggregateCount",
    statisticType: "count"
  }],
  labelingInfo: [{
    labelExpressionInfo: {
      expression: "$feature.aggregateCount"
    },
    symbol: {
      type: "text",
      color: "white",
      font: {
        size: "12px"
      },
      haloSize: 1,
      haloColor: "black"
    }
  }]
};
```

```javascript
// Turns off bin labels, but preserves labelingInfo
const featureReduction = layer.featureReduction.clone();
featureReduction.labelsVisible = false;
layer.featureReduction = featureReduction;
```

```javascript
// binning is disabled when the user zooms
// in beyond a 1:50,000 view scale
layer.featureReduction = {
  type: "binning",
  maxScale: 50000
};
```

