# GeoJSONLayer

**Module:** `@arcgis/core/layers/GeoJSONLayer`

## Import

```javascript
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
```

```javascript
// CDN
const GeoJSONLayer = await $arcgis.import("@arcgis/core/layers/GeoJSONLayer.js");
```

**Since:** 4.11

## See Also

- Sample - Add GeoJSONLayer to your Map
- Sample - Filter features with TimeSlider
- Sample - GeoJSONLayer with dynamic URL
- Query and filter guide
- GeoJSONLayerView
- Querying your data
- Data Visualization
- Layer blending samples
- Sample - GeoJSONLayer with dynamic URL
- DisplayFilterInfo
- DisplayFilter
- View.displayFilterEnabled
- displayFilterInfo
- Sample - Scale-dependent DisplayFilter
- applyEdits
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
- Sample: Add multiple label classes to a layer
- Sample: Multi-line labels
- Sample: Flat vs. volumetric 3D symbol layers
- fields
- Arcade Feature Z Profile
- GeoJSONLayerView.availableFields
- fieldUtils
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- refresh()
- refresh event
- Sample - GeoJSONLayer with dynamic URL
- Styles and data visualization
- SpatialReference.WGS84
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Edit features
- Sample - Custom WebGL layer view
- Sample - Query features from a FeatureLayer
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- AttributeBinsQuery
- Sample - Attribute Bins Query
- Sample - Query features from a FeatureLayer
- refreshInterval
- refresh event
- Sample - GeoJSONLayer with dynamic URL
- applyEdits()
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()
- Sample - GeoJSONLayer with dynamic URL

## Property Details

### `GeoJSONLayer`

### `attributeTableTemplate`

### `blendMode`

### `capabilities`

### `copyright`

### `customParameters`

### `dateFieldsTimeZone`

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `displayField`

### `displayFilterEnabled`

### `displayFilterInfo`

### `editingEnabled`

### `effect`

### `elevationInfo`

### `featureEffect`

### `featureReduction`

### `fields`

### `fieldsIndex`

### `fullExtent`
- **Type:** `Inherited`

### `geometryType`

### `hasZ`

### `id`
- **Type:** `Inherited`

### `isTable`

### `labelingInfo`

### `labelsVisible`

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

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `refreshInterval`

### `renderer`

### `screenSizePerspectiveEnabled`

### `spatialReference`

### `templates`

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

### `applyEdits`

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
const GeoJSONLayer = await $arcgis.import("@arcgis/core/layers/GeoJSONLayer.js");
// points to the states layer in a service storing U.S. census data
const geojsonlayer = new GeoJSONLayer({
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
  copyright: "USGS Earthquakes"
});
map.add(geojsonlayer);  // adds the layer to the map
```

```javascript
// create a geojson layer from geojson feature collection
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: 1,
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
          ]
        ]
      },
      properties: {
        type: "single",
        recordedDate: "2018-02-07T22:45:00-08:00"
      }
    }
  ]
};

// create a new blob from geojson featurecollection
const blob = new Blob([JSON.stringify(geojson)], {
  type: "application/json"
});

// URL reference to the blob
const url = URL.createObjectURL(blob);
// create new geojson layer using the blob url
const layer = new GeoJSONLayer({
  url
});
```

```javascript
const geoJSONLayer = new GeoJSONLayer({
   url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
   copyright: "USGS Earthquakes",
});
map.add(geoJSONLayer);  // adds the layer to the map
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
const geojsonLayer = new GeoJSONLayer({
  url: "https://earthquake.usgs.gov/fdsnws/event/1/query",
  customParameters: {
    format: "geojson",
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
const layer = new GeoJSONLayer({
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
  definitionExpression: "mag >= 5"
});
```

