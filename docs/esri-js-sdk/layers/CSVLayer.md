# CSVLayer

**Module:** `@arcgis/core/layers/CSVLayer`

## Import

```javascript
import CSVLayer from "@arcgis/core/layers/CSVLayer.js";
```

```javascript
// CDN
const CSVLayer = await $arcgis.import("@arcgis/core/layers/CSVLayer.js");
```

**Since:** 4.1

## See Also

- Sample - Intro to CSVLayer
- Sample - CSVLayer - Project points on the fly
- Sample - Select features by rectangle
- Querying your data
- Data Visualization
- Query and filter guide
- Map
- Layer blending samples
- DisplayFilterInfo
- DisplayFilter
- View.displayFilterEnabled
- displayFilterInfo
- Sample - Scale-dependent DisplayFilter
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- effect
- Sample - Point clustering
- Sample - Point clustering with visual variables
- Sample - Filter clustered points
- Sample - Point styles for cities
- Map.tables
- WebMap.tables
- Map.allTables
- WebMap.allTables
- labelsVisible
- labelingInfo
- fields
- Arcade Feature Z Profile
- SceneView
- View2D
- SceneView
- View2D
- refresh()
- refresh event
- Styles and data visualization
- SpatialReference.WGS84
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- AttributeBinsQuery
- Sample - Attribute Bins Query
- Sample - Select features by rectangle
- Query and filter guide
- refreshInterval
- refresh event
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `CSVLayer`

### `attributeTableTemplate`

### `blendMode`

### `capabilities`

### `copyright`

### `customParameters`

### `dateFieldsTimeZone`

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `delimiter`

### `displayField`

### `displayFilterEnabled`

### `displayFilterInfo`

### `effect`

### `elevationInfo`

### `featureEffect`

### `featureReduction`

### `fields`

### `fieldsIndex`

### `fullExtent`
- **Type:** `Inherited`

### `geometryType`

### `id`
- **Type:** `Inherited`

### `isTable`

### `labelingInfo`

### `labelsVisible`

### `latitudeField`

### `legendEnabled`

### `listMode`
- **Type:** `Inherited`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `longitudeField`

### `maxScale`

### `minScale`

### `objectIdField`

### `opacity`
- **Type:** `Inherited`

### `orderBy`

### `outFields`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`
- **Type:** `Inherited`

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `refreshInterval`

### `renderer`

### `screenSizePerspectiveEnabled`

### `spatialReference`

### `timeExtent`

### `timeInfo`

### `timeOffset`

### `title`

### `trackInfo`

### `type`

### `uid`
- **Type:** `Inherited`

### `url`

### `useViewTime`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `createLayerView`
- **Type:** `Inherited`

### `createPopupTemplate`

### `createQuery`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `getField`

### `getFieldDomain`

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

### `load`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `queryAttributeBins`

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `refresh`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const CSVLayer = await $arcgis.import("@arcgis/core/layers/CSVLayer.js");
// points to the states layer in a service storing U.S. census data
const csvLayer = new CSVLayer({
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",
  copyright: "USGS Earthquakes"
});
map.add(csvLayer);  // adds the layer to the map
```

```javascript
// Pass data by a blob url to create a CSV layer.
const csv = `name|year|latitude|Longitude
aspen|2020|40.418|20.553
birch|2018|-118.123|35.888`;

const blob = new Blob([csv], {
  type: "plain/text"
});
let url = URL.createObjectURL(blob);

const layer = new CSVLayer({
  url: url
});
```

```javascript
// Typical usage
let layer = new CSVLayer({
  // URL to the CSV file
  url: "https://mydomain.com/files/POIs.csv"
});
```

```javascript
// Once the layer loads, check if the supportsStatistics operations is enabled on the layer
await layer.load();
if (layer.capabilities.query.supportsStatistics) {
  // query for the sum of the population in all features
  let sumPopulation = {
    onStatisticField: "POP_2015",  // service field for 2015 population
    outStatisticFieldName: "Pop_2015_sum",
    statisticType: "sum"
  }
  let query = layer.createQuery();
  query.outStatistics = [ sumPopulation ];
  const result = await layer.queryFeatures(query);
  // process the stats query result
}
```

```javascript
// set customParameters to request the top 3 earthquakes since 1900.
// The USGS earthquakes catalog returns earthquakes with specified query parameters.
const csvLayer = new CSVLayer({
  url: "https://earthquake.usgs.gov/fdsnws/event/1/query",
  customParameters: {
    format: "csv",
    starttime: "1900-01-01",
    endtime: "2021-01-01",
    minmagnitude: "8",
    orderby:"magnitude",
    limit: "3"
  }
});
```

```javascript
// Set definition expression in constructor to only display earthquakes magnitude 5.0 and greater
const layer = new CSVLayer({
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",
  definitionExpression: "mag >= 5"
});
```

