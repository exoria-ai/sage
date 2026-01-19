# WFSLayer

**Module:** `@arcgis/core/layers/WFSLayer`

## Import

```javascript
import WFSLayer from "@arcgis/core/layers/WFSLayer.js";
```

```javascript
// CDN
const WFSLayer = await $arcgis.import("@arcgis/core/layers/WFSLayer.js");
```

**Since:** 4.20

## See Also

- Sample - WFSLayer
- wfsUtils
- WFSLayerView
- OGCFeatureLayer
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
- namespaceUri
- name
- fields
- Arcade Feature Z Profile
- WFSLayerView.availableFields
- fieldUtils
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- refresh()
- refresh event
- Visualization guide pages
- Data driven styles
- SpatialReference.WGS84
- Sample - GraphicsLayer with visibilityTimeExtent
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
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `WFSLayer`

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

### `maxPageCount`

### `maxRecordCount`

### `maxScale`

### `minScale`

### `name`

### `namespaceUri`

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

### `title`

### `trackInfo`

### `type`

### `uid`
- **Type:** `Inherited`

### `url`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `wfsCapabilities`

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

### `fetchAttributionData`
- **Type:** `Inherited`

### `fromWFSLayerInfo`

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
// Create a layer with features from Massachusetts 1990 census
const censusData = new WFSLayer({
   url: "https://giswebservices.massgis.state.ma.us/geoserver/wfs",
   name: "GISDATA.CENSUS1990BLOCKGROUPS_POLY"
})
map.add(censusData)
```

```javascript
const layer = new WFSLayer({
  url: "https://url_to_your_service"
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
// apply a BBOX parameter to your WFSLayer
const layer = new WFSLayer({
   url: "https://giswebservices.massgis.state.ma.us/geoserver/wfs",
   name: "GISDATA.CENSUS1990BLOCKGROUPS_POLY",
   customParameters: {
     BBOX: `-71.16686, 42.35918, -71.03708, 42.420035, EPSG:4326`
   }
});
```

```javascript
// apply a CQL filter to the layer
const layer = new WFSLayer({
   url: "https://geobretagne.fr/geoserver/ows",
   name: "ign:commune_metro",
   customParameters: {
     "cql_filter": "population > 10000"
   }
});
```

```javascript
// for a layer showing the massachusetts block groups
// only show features where the number of households is greater than 500
const layer = new WFSLayer({
  url: "https://giswebservices.massgis.state.ma.us/geoserver/wfs",
  name: "GISDATA.CENSUS1990BLOCKGROUPS_POLY",
  definitionExpression: "households > 500"
});
```

