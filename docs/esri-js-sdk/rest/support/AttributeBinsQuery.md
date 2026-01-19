# AttributeBinsQuery

**Module:** `@arcgis/core/rest/support/AttributeBinsQuery`

## Import

```javascript
import AttributeBinsQuery from "@arcgis/core/rest/support/AttributeBinsQuery.js";
```

```javascript
// CDN
const AttributeBinsQuery = await $arcgis.import("@arcgis/core/rest/support/AttributeBinsQuery.js");
```

**Since:** 4.32

## See Also

- FeatureLayer.queryAttributeBins()
- Sample - Attribute Bins Query
- wikipedia - List of tz database time zones

## Property Details

### `AttributeBinsQuery`

### `binOrder`

### `binParameters`

### `cacheHint`

### `datumTransformation`

### `declaredClass`
- **Type:** `Inherited`

### `distance`

### `geometry`

### `lowerBoundaryAlias`

### `outSpatialReference`

### `outStatistics`

### `outTimeZone`

### `returnDistinctValues`

### `spatialRelationship`

### `timeExtent`

### `units`

### `upperBoundaryAlias`

### `where`

### `addHandles`
- **Type:** `Inherited`

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
// get the average temperature for each bin
let statisticDefinition = new StatisticDefinition({
  statisticType: "avg",
  onStatisticField: "temp",
  outStatisticFieldName: "temp_avg"
});

// Query bins with fixed interval bin parameters based on field "temp" with 5 degrees interval.
const binQuery = new AttributeBinsQuery({
  binParameters: new FixedIntervalBinParameters({
    interval: 5, // the interval size for each bin. In this case, 5 degrees celsius
    field: "temp", // the field to bin, containing the temperature data
    start: 0, // the lower boundary of the first bin. 0 degrees celsius
    end: 30 // the upper boundary of the last bin. 30 degrees celsius
  }),
 // get the average temperature for each bin
 outStatistics: [statisticDefinition]
});
```

```javascript
// Query bins with date interval bin parameters based on field "date" with monthly intervals.
const binQuery = new AttributeBinsQuery({
  binParameters: new DateBinParameters({
    interval: 3,
    field: "RecordedDate",
    start: new Date(Date.UTC(1980, 0, 2, 0, 0)),
    end: new Date(Date.UTC(1980, 2, 1, 0, 0)),
    number: "1",
    unit: "months"
  }),
  outTimeZone: "America/New_York" // Get the binning results in Eastern Time Zone
});
```

```javascript
let query = new Query({
  spatialRelationship: "contains"
});
```

```javascript
let layer = new FeatureLayer( ... );
let timeExtent = new TimeExtent({
  start: new Date(1992, 0, 1),
  end: new Date(1992, 11, 31)
});
let timeQuery = new Query({
  timeExtent: timeExtent
});
layerView.queryFeatures(timeQuery).then(function(featureSet) { ... });
```

```javascript
// Query at a distance in pixels of the query geometry.
// Use the unit of the query geometry's spatial reference.
layerView.queryFeatures({
  geometry: event.mapPoint,
  distance: 2 * view.resolution,
  returnGeometry: true
}).then(processResults);
```

```javascript
query.where = "NAME = '" + stateName + "'";
```

