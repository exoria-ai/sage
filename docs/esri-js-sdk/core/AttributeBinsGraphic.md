# AttributeBinsGraphic

**Module:** `@arcgis/core/AttributeBinsGraphic`

## Import

```javascript
import AttributeBinsGraphic from "@arcgis/core/AttributeBinsGraphic.js";
```

```javascript
// CDN
const AttributeBinsGraphic = await $arcgis.import("@arcgis/core/AttributeBinsGraphic.js");
```

**Since:** 4.32

## See Also

- AttributeBinsQuery
- AttributeBinsFeatureSet
- Sample - Attribute Bins Query
- StatisticDefinition.statisticType
- Query.aggregateIds
- getEffectivePopupTemplate()

## Property Details

### `AttributeBinsGraphic`

### `aggregateGeometries`
- **Type:** `Inherited`

### `attributes`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`
- **Type:** `Inherited`

### `isAggregate`
- **Type:** `Inherited`

### `layer`
- **Type:** `Inherited`

### `origin`
- **Type:** `Inherited`

### `popupTemplate`
- **Type:** `Inherited`

### `stackedAttributes`

### `symbol`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `getAttribute`
- **Type:** `Inherited`

### `getEffectivePopupTemplate`
- **Type:** `Inherited`

### `getGlobalId`
- **Type:** `Inherited`

### `getObjectId`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `setAttribute`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// average of age fields by regions
const ageStatsByRegion = new StatisticDefinition({
  onStatisticField: field,
  outStatisticFieldName: "avgAge",
  statisticType: "avg"
});

// extent encompassing all features by region
const aggregatedExtent = new StatisticDefinition({
  statisticType: "envelope-aggregate",
  outStatisticFieldName: "aggregateExtent",
});

// group the statistics by Region field
// get avg age by Regions and extent of each region
const query = layer.createQuery();
query.groupByFieldsForStatistics = ["Region"];
query.outStatistics = [consumeStatsByRegion, aggregatedExtent];
layer.queryFeatures(query).then((results) => {
  results.features.forEach((feature) => {
    if (feature.attributes.Region === "Midwest") {
       view.goTo(feature.aggregateGeometries.aggregateExtent);
    }
  });
});
```

```javascript
let graphic = new Graphic();
graphic.attributes = {
  "name": "Spruce",
  "family": "Pinaceae",
  "count": 126
};
```

```javascript
// First create a point geometry
let point = {
  type: "point",  // autocasts as new Point()
  longitude: -71.2643,
  latitude: 42.0909
};

// Create a symbol for drawing the point
let markerSymbol = {
  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
  color: [226, 119, 40]
};

// Create a graphic and add the geometry and symbol to it
let pointGraphic = new Graphic({
  geometry: point,
  symbol: markerSymbol
});
```

```javascript
// get screen point from view's click event
view.on("click", (event) => {
  // Search for all features only on included layers at the clicked location
  view.hitTest(event, {include: vectorTileLayer}).then((response) => {
    // if graphics are returned from vector tile layer, do something with results
    if (response.results.length){
      response.results.forEach((result, i) => {
        const layerId = result.graphic?.origin?.layerId;
        const styleLayer = vectorTileLayer.getStyleLayer(layerId);
        // update layer's style
      });
    }
  })
});
```

```javascript
// The following snippet shows how to set a popupTemplate
// on the returned results (features) from identify

 idResult.feature.popupTemplate = {
 title: "{NAME}",
   content: [{
     // Pass in the fields to display
     type: "fields",
     fieldInfos: [{
       fieldName: "NAME",
       label: "Name"
     }, {
       fieldName: "REGION",
       label: "Region"
    }]
   }]
};
```

```javascript
view.on("click", function(event){
  let graphic = new Graphic({
    geometry: event.mapPoint,
    symbol: {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: "blue",
      size: 8,
      outline: { // autocasts as new SimpleLineSymbol()
        width: 0.5,
        color: "darkblue"
      }
    }
  });
});
```

