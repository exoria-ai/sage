# Query

**Module:** `@arcgis/core/rest/support/Query`

## Import

```javascript
import Query from "@arcgis/core/rest/support/Query.js";
```

```javascript
// CDN
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
```

**Since:** 4.20

## See Also

- FeatureLayer.createQuery()
- FeatureLayer.queryFeatures()
- FeatureLayerView.queryFeatures()
- CSVLayer.queryFeatures()
- CSVLayerView.queryFeatures()
- SceneLayer.queryFeatures()
- SceneLayerView.queryFeatures()
- Query and filter guide
- Sample - Query statistics client-side by distance
- Sample - Query statistics by geometry
- Sample - Query statistics client-side
- query
- ArcGIS Blog - Querying Feature Services: Having Clause
- ArcGIS REST API documentation
- FeatureLayer.capabilities
- ArcGIS Pro - creating a query layer
- ArcGIS REST API - query a map service layer
- ArcGIS Pro - creating a query layer
- ArcGIS REST API - query a map service layer

## Property Details

### `Query`

### `aggregateIds`

### `cacheHint`

### `datumTransformation`

### `declaredClass`
- **Type:** `Inherited`

### `distance`

### `gdbVersion`

### `geometry`

### `geometryPrecision`

### `groupByFieldsForStatistics`

### `having`

### `historicMoment`

### `maxAllowableOffset`

### `maxRecordCountFactor`

### `multipatchOption`

### `num`

### `objectIds`

### `orderByFields`

### `outFields`

### `outSpatialReference`

### `outStatistics`

### `parameterValues`

### `pixelSize`

### `quantizationParameters`

### `rangeValues`

### `relationParameter`

### `returnCentroid`

### `returnDistinctValues`

### `returnExceededLimitFeatures`

### `returnGeometry`

### `returnM`

### `returnQueryGeometry`

### `returnZ`

### `spatialRelationship`

### `sqlFormat`

### `start`

### `text`

### `timeExtent`

### `units`

### `where`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `CompositeTransformation`

### `SimpleTransformation`


## Method Details

### `Method Details()`


## Examples

```javascript
const query = featureLayer.createQuery();
query.where = "STATE_NAME = 'Washington'";
query.outFields = [ "STATE_NAME", "COUNTY_NAME", "POPULATION", "(POPULATION / AREA) as 'POP_DENSITY'" ];

// To return a feature set containing the attributes: STATE_NAME, COUNTY_NAME, POPULATION, and POP_DENSITY.
const featureSet = await featureLayer.queryFeatures(query)
```

```javascript
<DateField> = DATE 'YYYY-MM-DD'
<DateField> = TIMESTAMP 'YYYY-MM-DD HH:MI:SS'
<DateOnlyField> = DATE 'YYYY-MM-DD'
<TimeOnlyField> = TIME 'HH:MM:SS'
<TimestampOffsetField> = TIMESTAMP 'YYYY-MM-DD HH:MI:SS +/-UTC offset'
```

```javascript
// Query for features that recorded on January 1, 2012 9:00:00 AM GMT
// DateTime_PST date field values are in PST. Must adjust the epoch values to PST

const queryDate = new Date(1325408400000); // 01/01/2012 9:00:00 AM GMT
let queryFields = ["DateTime_PST"];

// get the timezone of the DateTime_PST date field
const fieldTimeZone = layer.fieldsIndex.getTimeZone("DateTime_PST") ;

// we need to adjust the date value to match the time zone of the field.
const where = `DateTime_PST < DATE '${getDateForTimeZone(queryDate, fieldTimeZone)}'`
layerView.filter = new FeatureFilter({
  where
});
runQueries(where, queryFields);

// This function conveniently formats a dates in terms of the parsed time zone.
function getDateForTimeZone(queryDate, timezone) {

  // adjust the given date field to the timezone of the date field
  const zonedDate = new Date(
    queryDate.toLocaleString("en-US", {
      timeZone: timezone
    })
  );
  const pad = (value) => String(value).padStart(2, "0");
  const month = pad(zonedDate.getMonth() + 1);
  const day = pad(zonedDate.getDate())
  const year = zonedDate.getFullYear();
  const hour = pad(zonedDate.getHours());
  const minutes = pad(zonedDate.getMinutes());
  const seconds = pad(zonedDate.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}
```

```javascript
view.on("pointer-move", async (event) => {
  const query = featureLayer.createQuery();
  query.geometry = view.toMap(event);  // the point location of the pointer
  query.distance = 2;
  query.units = "miles";
  query.spatialRelationship = "intersects";  // this is the default
  query.returnGeometry = true;
  query.outFields = ["POPULATION"];

  // The following line returns features within two miles of the pointer's location
  const { features } = await featureLayer.queryFeatures(query);
});
```

```javascript
// query katrina tracks that took place in Aug 30 - Aug 31, 2005
const query = new Query({
  outFields: ["Name, WindSpeed"],
  where: "Name = 'Katrina'",
  timeExtent: {
    start: new Date(2005, 7, 30),
    end: new Date(2005, 7, 31)
  }
});
const { features } = await featureLayer.queryFeatures(query);
```

```javascript
// query for the sum of the population in all features
const sumPopulation = {
  onStatisticField: "POP_2015",  // service field for 2015 population
  outStatisticFieldName: "Pop_2015_sum",
  statisticType: "sum"
};

// query for the average population in all features
const avgPopulation = {
  onStatisticField: "POP_2015",  // service field for 2015 population
  outStatisticFieldName: "Pop_2015_avg",
  statisticType: "avg"
};

// Notice that you can pass a SQL expression as a field name to calculate statistics
const populationChangeDefinition = {
  onStatisticField: "POP_2015 - POP_2010",  // service field for 2015 population
  outStatisticFieldName: "avg_pop_change_2015_2010",
  statisticType: "avg"
};

const query = layer.createQuery();
query.where = "STATE_NAME = 'Washington'";
query.outStatistics = [sumPopulation, avgPopulation, populationChangeDefinition];

const { feature } = await featureLayer.queryFeatures(query);
const { attributes } = features[0];

console.log(`The total population in WA is ${attributes.Pop_2015_sum}`);
console.log(`The average population in WA counties is ${attributes.Pop_2015_avg}`);
console.log(`The average population change in WA counties is ${attributes.avg_pop_change_2015_2010}`);
```

