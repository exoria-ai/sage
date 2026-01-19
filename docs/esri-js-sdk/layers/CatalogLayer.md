# CatalogLayer

**Module:** `@arcgis/core/layers/CatalogLayer`

## Import

```javascript
import CatalogLayer from "@arcgis/core/layers/CatalogLayer.js";
```

```javascript
// CDN
const CatalogLayer = await $arcgis.import("@arcgis/core/layers/CatalogLayer.js");
```

**Since:** 4.30

## See Also

- CatalogDynamicGroupLayer
- CatalogFootprintLayer
- Sample - Intro to CatalogLayer
- Sample - Explore data in CatalogLayer
- Item access privileges
- API key guide
- Layer blending samples
- Wikipedia - List of tz database time zones
- Date and time queries
- Date-time queries | Time zone properties
- ArcGIS REST API - New in 10.9
- What's new in ArcGIS Server
- Edit map service settings
- DisplayFilterInfo
- DisplayFilter
- View.displayFilterEnabled
- displayFilterInfo
- Sample - Scale-dependent DisplayFilter
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- ArcGIS REST API documentation
- fields
- Map.tables
- WebMap.tables
- Map.allTables
- WebMap.allTables
- fields
- Add an array of client-side features
- Arcade Feature Z Profile
- fieldUtils
- refresh()
- refresh event
- Set hosted feature layer view definition
- Introduction to subtypes
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Sample - Explore data in CatalogLayer
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- AttributeBinsQuery
- Sample - Attribute Bins Query
- Sample - Explore data in CatalogLayer
- Query and filter guide
- refreshInterval
- refresh event
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `CatalogLayer`

### `apiKey`

### `blendMode`

### `capabilities`

### `copyright`

### `customParameters`

### `dateFieldsTimeZone`

### `datesInUnknownTimezone`

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `displayField`

### `displayFilterEnabled`

### `displayFilterInfo`

### `drawOrderField`

### `dynamicGroupLayer`

### `effect`

### `effectiveCapabilities`

### `fields`

### `fieldsIndex`

### `footprintLayer`

### `fullExtent`
- **Type:** `Inherited`

### `geometryFieldsInfo`

### `geometryType`

### `globalIdField`

### `hasM`

### `hasZ`

### `id`
- **Type:** `Inherited`

### `isTable`

### `itemNameField`

### `itemSourceField`

### `itemTypeField`

### `layerId`

### `layers`

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

### `maxScaleField`

### `minScale`

### `minScaleField`

### `objectIdField`

### `opacity`
- **Type:** `Inherited`

### `orderBy`

### `outFields`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `portalItem`

### `preferredTimeZone`

### `refreshInterval`

### `returnM`

### `returnZ`

### `serviceDefinitionExpression`

### `sourceJSON`

### `spatialReference`

### `subtypeField`

### `subtypes`

### `timeExtent`

### `timeInfo`

### `timeOffset`

### `title`

### `type`

### `uid`
- **Type:** `Inherited`

### `url`

### `useViewTime`

### `version`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `createFootprintFromLayer`

### `createLayerFromFootprint`

### `createLayerView`
- **Type:** `Inherited`

### `createQuery`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
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
const CatalogLayer = await $arcgis.import("@arcgis/core/layers/CatalogLayer.js");
// points to pacific northwest forest fuels inventory status
const layer = new CatalogLayer({
  url: "https://services3.arcgis.com/TVDq0jswpjtt1Xia/arcgis/rest/services/PNW_Forest_Fuels_Inventory_Status/FeatureServer"
});
map.add(layer);  // adds the layer to the map
```

```javascript
// points to a hosted Feature Layer in ArcGIS Online
const layer = new CatalogLayer({
  portalItem: {  // autocasts as esri/portal/PortalItem
    id: "3a9938eab3a3483f88d20b9269f0c098" // portal item id
  }
});
map.add(layer);  // adds the layer to the map
```

```javascript
// Typical usage
// Create catalog layer from a service
const layer = new CatalogLayer({
  // URL to the service
  url: "https://services3.arcgis.com/TVDq0jswpjtt1Xia/arcgis/rest/services/PNW_Forest_Fuels_Inventory_Status/FeatureServer"
});
```

```javascript
// set the api key to access a protected service
const layer = new FeatureLayer({
  url: serviceUrl,
  apiKey: "YOUR_API_KEY"
});
```

```javascript
// Once the layer loads, check if the
// supportsAdd operations is enabled on the layer
await featureLayer.load();
if (featureLayer.capabilities.operations.supportsAdd) {
  // if new features can be created in the layer
  // set up the UI for editing
  setupEditing();
}
```

```javascript
// send a custom parameter to your special service
let layer = new MapImageLayer({
  url: serviceUrl,
  customParameters: {
    "key": "my-special-key"
  }
});
```

