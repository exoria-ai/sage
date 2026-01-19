# FeatureReductionCluster

**Module:** `@arcgis/core/layers/support/FeatureReductionCluster`

## Import

```javascript
import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster.js";
```

```javascript
// CDN
const FeatureReductionCluster = await $arcgis.import("@arcgis/core/layers/support/FeatureReductionCluster.js");
```

**Since:** 4.14

## See Also

- Sample - Point clustering
- Sample - Point clustering with visual variables
- Sample - Filter clustered points
- CSVLayer.featureReduction
- FeatureLayer.featureReduction
- GeoJSONLayer.featureReduction
- OGCFeatureLayer.featureReduction
- clusterMinSize
- clusterRadius
- clusterMaxSize
- labelingInfo
- clusterMaxSize
- clusterLabelCreator
- clusterPopupTemplateCreator
- Arcade Feature Reduction Popup Profile
- Sample - Point clustering
- Sample - Point clustering with visual variables
- Sample - Filter clustered points
- symbol

## Property Details

### `FeatureReductionCluster`

### `clusterMaxSize`

### `clusterMinSize`

### `clusterRadius`

### `declaredClass`
- **Type:** `Inherited`

### `fields`

### `labelingInfo`

### `labelsVisible`

### `maxScale`

### `popupEnabled`

### `popupTemplate`

### `renderer`

### `symbol`

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
  type: "cluster",
  clusterRadius: "120px",
  popupTemplate: {
    content: "This cluster represents <b>{cluster_count}</b> features.",
    fieldInfos: [{
      fieldName: "cluster_count",
      format: {
        digitSeparator: true,
        places: 0
      }
    }]
  }
};
```

```javascript
// clusterMaxSize should be adjusted
// appropriately to conform
// to the clusterRadius
layer.featureReduction = {
  type: "cluster",
  clusterRadius: "50px",
  clusterMaxSize: "32px"
};
```

```javascript
// a larger clusterMinSize looks better when labels are enabled
featureReduction.clusterMinSize = "24px";
featureReduction.labelsVisible = true;
```

```javascript
// enables clustering on the layer with a
// clusterRadius of 40pt
layer.featureReduction = {
  type: "cluster",
  clusterRadius: 40,
  clusterMaxSize: 24
};
```

```javascript
// enables clustering on the layer with a
// clusterRadius of 120px
layer.featureReduction = {
  type: "cluster",
  clusterRadius: "120px",
  clusterMaxSize: "80px"
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

