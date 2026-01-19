# Graphic

**Module:** `@arcgis/core/Graphic`

## Import

```javascript
import Graphic from "@arcgis/core/Graphic.js";
```

```javascript
// CDN
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
```

**Since:** 4.0

## See Also

- Intro to graphics
- Sample - Add graphics (SceneView)
- Sample - Query Elevation (points)
- GraphicsLayer
- Geometry
- StatisticDefinition.statisticType
- Query.aggregateIds
- getEffectivePopupTemplate()

## Property Details

### `Graphic`

### `aggregateGeometries`

### `attributes`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `isAggregate`

### `layer`

### `origin`

### `popupTemplate`

### `symbol`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `getAttribute`

### `getEffectivePopupTemplate`

### `getGlobalId`

### `getObjectId`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `setAttribute`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
let polyline = {
  type: "polyline",  // autocasts as new Polyline()
    paths: [
      [-111.30, 52.68],
      [-98, 49.5],
      [-93.94, 29.89]
    ]
};

let polylineSymbol = {
  type: "simple-line",  // autocasts as SimpleLineSymbol()
  color: [226, 119, 40],
  width: 4
};

let polylineAtt = {
  Name: "Keystone Pipeline",
  Owner: "TransCanada"
};

let polylineGraphic = new Graphic({
  geometry: polyline,
  symbol: polylineSymbol,
  attributes: polylineAtt
});

view.graphics.add(polylineGraphic);
```

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

