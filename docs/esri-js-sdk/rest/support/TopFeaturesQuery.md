# TopFeaturesQuery

**Module:** `@arcgis/core/rest/support/TopFeaturesQuery`

## Import

```javascript
import TopFeaturesQuery from "@arcgis/core/rest/support/TopFeaturesQuery.js";
```

```javascript
// CDN
const TopFeaturesQuery = await $arcgis.import("@arcgis/core/rest/support/TopFeaturesQuery.js");
```

**Since:** 4.20

## See Also

- TopFilter
- FeatureLayer.queryTopFeatures()
- Query and filter guide
- Sample - Aggregate spatial statistics
- FeatureLayer.capabilities

## Property Details

### `TopFeaturesQuery`

### `cacheHint`

### `declaredClass`
- **Type:** `Inherited`

### `distance`

### `geometry`

### `geometryPrecision`

### `maxAllowableOffset`

### `num`

### `objectIds`

### `orderByFields`

### `outFields`

### `outSpatialReference`

### `returnGeometry`

### `returnM`

### `returnZ`

### `spatialRelationship`

### `start`

### `timeExtent`

### `topFilter`

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


## Method Details

### `Method Details()`


## Examples

```javascript
// query the top three most populous counties from each state.
// Results will be ordered based the population of each county in descending order
// top query will run against all features available in the service
const query = new TopFeaturesQuery({
  outFields: ["State, Pop_total, County"],
  topFilter: new TopFilter({
    topCount: 3,
    groupByFields: ["State"],
    orderByFields: ["Pop_total DESC"]
  })
});
featureLayer.queryTopFeatures(query)
  .then(function(response){
     // returns a feature set with features containing the most populous
     // three counties in each state ordered by population.
     // The following attributes are returned as well: State, Pop_total, County
   });
```

```javascript
const query = new TopFeaturesQuery({
  where: "Population >= 1000000",
  outFields: ["Country, Population, Name"],
  topFilter: new TopFilter({
    topCount: 3,
    groupByFields: ["Country"],
    orderByFields: [`Population DESC`]
  })
});
featureLayer.queryTopFeatures(query)
  .then(function(response){
     // returns a feature set with features containing the most populous three cities
     // in each country. The query will run only against cities where the population is
     // over one million.
   });
```

```javascript
view.on("pointer-move", function(event){
  const query = new TopFeaturesQuery({
    outFields: ["Zoning, Floors, Year"],
    topFilter: new TopFilter({
      topCount: 2,
      groupByFields: ["Zoning"],
      orderByFields: ["Floors DESC"]
    }),
    geometry: view.toMap(event),
    spatialRelationship:  "intersects",
    units: "miles",
    distance: 10,
    returnGeometry: true
  });
  featureLayer.queryTopFeatures(query)
    .then(function(response){
       // returns two tallest buildings in zoning category within a given geometry
       // The following attributes are returned as well: Zoning, Floors, Year
     });
});
```

```javascript
// query hurricanes that took place in 1992 and
// return a hurricane track with the highest wind speed in each category
const query = new TopFeaturesQuery({
  outFields: ["STAGE, WINDSPEED, PRESSURE"],
  topFilter: new TopFilter({
    topCount: 1,
    groupByFields: ["STAGE"],
    orderByFields: ["WINDSPEED DESC"]
  }),
  timeExtent: {
    start: new Date(1992, 0, 1),
    end: new Date(1992, 11, 31)
  }
});
featureLayer.queryTopFeatures(query)
  .then(function(response){
     // returns a hurricane with the highest wind speed
     // in each stage... the query will only run against
    // hurricanes  that happened in 1992
   });
```

```javascript
query.orderByFields = ["STATE_NAME DESC"];
```

```javascript
// query for field attributes
query.outFields = [ "NAME", "STATE_ABBR", "POP04" ];
```

