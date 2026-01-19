# StatisticDefinition

**Module:** `@arcgis/core/rest/support/StatisticDefinition`

## Import

```javascript
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition.js";
```

```javascript
// CDN
const StatisticDefinition = await $arcgis.import("@arcgis/core/rest/support/StatisticDefinition.js");
```

**Since:** 4.0

## See Also

- Query.outStatistics
- Graphic.aggregateGeometries

## Property Details

### `StatisticDefinition`

### `declaredClass`
- **Type:** `Inherited`

### `onStatisticField`

### `outStatisticFieldName`

### `statisticParameters`

### `statisticType`

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
// query for the sum of the population in all features
let sumPopulation = {
  onStatisticField: "POP_2015",  // service field for 2015 population
  outStatisticFieldName: "Pop_2015_sum",
  statisticType: "sum"
}
let query = layer.createQuery();
query.outStatistics = [ sumPopulation ];
layer.queryFeatures(query)
  .then(function(response){
     let stats = response.features[0].attributes;
     console.log("output stats:", stats);
  });
```

```javascript
// query for the average of the population change for all features
let populationChangeDefinition = {
  onStatisticField: "POP_2015 - POP_2010",  // service field for 2015 population
  outStatisticFieldName: "avg_pop_change_2015_2010",
  statisticType: "avg"
}
let query = layer.createQuery();
query.outStatistics = [ populationChangeDefinition ];
layer.queryFeatures(query)
  .then(function(response){
     let stats = response.features[0].attributes;
     console.log("Average change:", stats.avg_pop_change_2015_2010);
  });
```

```javascript
// query for the sum of the population in all features
let sumPopulation = {
  onStatisticField: "POP_2015",  // service field for 2015 population
  outStatisticFieldName: "Pop_2015_sum",
  statisticType: "sum"
}
let query = layer.createQuery();
query.outStatistics = [ sumPopulation ];
layer.queryFeatures(query)
  .then(function(response){
     let stats = response.features[0].attributes;
     console.log("output stats:", stats);
  });
```

```javascript
// query for the average of the population change for all features
// Notice that you can pass a SQL expression as a field name to calculate statistics
let populationChangeDefinition = {
  onStatisticField: "POP_2015 - POP_2010",  // service field for 2015 population
  outStatisticFieldName: "avg_pop_change_2015_2010",
  statisticType: "avg"
}
let query = layer.createQuery();
query.outStatistics = [ populationChangeDefinition ];
layer.queryFeatures(query)
  .then(function(response){
     let stats = response.features[0].attributes;
     console.log("Average change:", stats.avg_pop_change_2015_2010);
  });
```

```javascript
// query for the average of the population change grouped by regions
// query result will also return an extent for each group encompassing
// all features in each group.
let populationChangeDefinition = {
  onStatisticField: "POP_2015 - POP_2010",  // service field for 2015 population
  outStatisticFieldName: "avg_pop_change_2015_2010",
  statisticType: "avg"
};
let aggregatedExtent = {
  statisticType: "envelope-aggregate"
};
let query = layer.createQuery();
query.groupByFieldsForStatistics = ["Region"];
query.outStatistics = [ populationChangeDefinition, aggregatedExtent ];
layer.queryFeatures(query).then(displayResults);
```

```javascript
let query = layer.createQuery();
// find the median value in descending order for response_rate field
// for all features stored in the layer and order
query.outStatistics = [{
  statisticType: "percentile-continuous",
  statisticParameters: {
    value: 0.5,
    orderBy: "DESC"
  },
  onStatisticField: "response_rate",
  outStatisticFieldName: "Resp_rate_median"
}];
// query the features for the median value statistics against the values
// stored in the response_rate field
queryFeatures(query);
```

