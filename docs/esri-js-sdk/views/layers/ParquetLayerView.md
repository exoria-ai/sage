# ParquetLayerView

**Module:** `@arcgis/core/views/layers/ParquetLayerView`

## Import

```javascript
import ParquetLayerView from "@arcgis/core/views/layers/ParquetLayerView.js";
```

```javascript
// CDN
const ParquetLayerView = await $arcgis.import("@arcgis/core/views/layers/ParquetLayerView.js");
```

**Since:** 4.33

## See Also

- ParquetLayer
- dataUpdating
- hasAllFeatures
- hasAllFeaturesInView
- hasFullGeometries
- FeatureLayer.featureEffect
- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- Sample - Filter features by attributes
- Sample - Filter features by geometry
- availableFields
- dataUpdating
- queryFeatures
- dataUpdating
- queryFeatures
- dataUpdating
- queryFeatures
- highlight()
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- suspended
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended
- queryAggregates
- View.highlights
- Sample: Highlight features by geometry
- Sample: Highlight point features
- FeatureReductionBinning
- FeatureReductionCluster
- Graphic.isAggregate
- AttributeBinsQuery
- Sample - Attribute Bins Query
- Sample - Query FeatureLayerView
- Sample - Query statistics client-side by distance
- Sample - Query statistics by geometry
- Sample - Query statistics client-side
- Query and filter guide

## Property Details

### `availableFields`

### `dataUpdating`

### `declaredClass`
- **Type:** `Inherited`

### `featureEffect`

### `filter`

### `hasAllFeatures`

### `hasAllFeaturesInView`

### `hasFullGeometries`

### `highlightOptions`

### `layer`
- **Type:** `Inherited`

### `spatialReferenceSupported`
- **Type:** `Inherited`

### `suspended`
- **Type:** `Inherited`

### `uid`
- **Type:** `Inherited`

### `updating`
- **Type:** `Inherited`

### `view`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `visibleAtCurrentScale`
- **Type:** `Inherited`

### `visibleAtCurrentTimeExtent`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `createAggregateQuery`

### `createQuery`

### `hasHandles`
- **Type:** `Inherited`

### `highlight`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `queryAggregates`

### `queryAttributeBins`

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const layerView = await view.whenLayerView(layer);

// availableFields will become available once the
// layerView finishes updating
await reactiveUtils.whenOnce(() => !layerView.updating);

try {
  const results = await layerView.queryFeatures({
    outFields: layerView.availableFields,
    where: "DEW_POINT > 10"
  });
  console.log(results.features.length, " features returned");
} catch(error) {
  console.log("query failed: ", error);
}
```

```javascript
// watch layer view updating and dataUpdating to get the count of features
// available in layer view. Only execute the query once new features are fetched.
let dataWasUpdated = lv.dataUpdating;
reactiveUtils.watch(() => [lv.updating, lv.dataUpdating],
  ([updating, dataUpdating]) => {
  dataWasUpdated ||= dataUpdating;
  if (!updating && dataWasUpdated) {
   dataWasUpdated = false;
   lv.queryFeatureCount().then((results)=>{
      console.log("number of features in layerView", results);
    });
  }
});
```

```javascript
// gray out features that fall outside of the 3 mile buffer of the mouse's location
// by setting feature effect on excluded features
layerView.featureEffect = new FeatureEffect({
  filter: new FeatureFilter({
    geometry: filterGeometry,
    spatialRelationship: "intersects",
    distance: 3,
    units: "miles"
  }),
  excludedEffect: "grayscale(100%) opacity(30%)"
});
```

```javascript
// Apply a drop-shadow feature effect to the features that intersect the borough boundaries,
// while applying blur and brightness effects to the features that are excluded from filter criteria.
// The resulting map will make it easier to spot if the residents are more likely to experience deprivation
// if they live on a borough boundary.
const featureFilter = new FeatureFilter({
  where: "BoroughEdge='true'"
});
layerView.featureEffect = new FeatureEffect({
  filter: featureFilter,
  includedEffect: "drop-shadow(3px, 3px, 3px, black)",
  excludedEffect: "blur(1px) brightness(65%)"
});
```

```javascript
// display rain gauges where their water percent is over 30%
// and if the gauges are completely contained by the 10-mile
// buffer around the filter geometry
featureLayerView.filter = new FeatureFilter({
  where: "percentile >= 30",
  geometry: filterPolygon,
  spatialRelationship: "contains",
  distance: 10,
  units: "miles"
});
```

```javascript
const viewElement = document.querySelector("arcgis-map");
const layerView = await viewElement.whenLayerView(layer);

// Wait until the initial layer load completes
const layerView = await viewElement.whenLayerView(airQualityLayer);
await reactiveUtils.whenOnce(() => !layerView.updating);

// Set up query with outStatistics to compute min, max, and average PM2.5 of all data
const query = airQualityLayer.createQuery();
query.outStatistics = [
  {
    statisticType: "avg",
    onStatisticField: "pm25",
    outStatisticFieldName: "avg_pm25"
  },
  {
    statisticType: "min",
    onStatisticField: "pm25",
    outStatisticFieldName: "min_pm25"
  },
  {
    statisticType: "max",
    onStatisticField: "pm25",
    outStatisticFieldName: "max_pm25"
  }
];

// Run the query on all features to get the min, max, and average values.
// If `hasAllFeatures` is true, all features from the layer are loaded
// and available on the client, so use layerView.queryFeatures for faster performance.
// Otherwise, use layer.queryFeatures to run the query against all features
const results = layerView.hasAllFeatures
  ? await layerView.queryFeatures(query)
  : await airQualityLayer.queryFeatures(query);

// process the result
updateAirQualityStatus(results);
```

