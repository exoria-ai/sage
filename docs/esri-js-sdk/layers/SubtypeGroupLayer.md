# SubtypeGroupLayer

**Module:** `@arcgis/core/layers/SubtypeGroupLayer`

## Import

```javascript
import SubtypeGroupLayer from "@arcgis/core/layers/SubtypeGroupLayer.js";
```

```javascript
// CDN
const SubtypeGroupLayer = await $arcgis.import("@arcgis/core/layers/SubtypeGroupLayer.js");
```

**Since:** 4.20

## Inheritance

Extends: **Accessor**

## See Also

- SubtypeSublayer
- Sample - Intro to SubtypeGroupLayer
- How to use the SubtypeGroupLayer with the ArcGIS Maps SDK for JavaScript
- Subtype group layers
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
- applyEdits
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- ArcGIS REST API documentation
- Add an array of client-side features
- fields
- Map.tables
- WebMap.tables
- Map.allTables
- WebMap.allTables
- fields
- Add an array of client-side features
- SubtypeGroupLayerView.availableFields
- fieldUtils
- refresh()
- refresh event
- queryRelatedFeatures
- Set hosted feature layer view definition
- Introduction to subtypes
- Sample - GraphicsLayer with visibilityTimeExtent
- capabilities.data.supportsAttachment
- Sample - Edit features
- Sample - Custom WebGL layer view
- Sample - Query features from a SubtypeGroupLayer
- capabilities.data.supportsAttachment
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- load
- capabilities.data.supportsAttachment
- capabilities.operations.supportsQueryAttachments
- Sample - Query features from a SubtypeGroupLayer
- Query and filter guide
- relationships property
- Sample - Query Related Features
- relationships property
- Sample - Query Related Features
- refreshInterval
- refresh event
- capabilities.data.supportsAttachment
- applyEdits()
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `SubtypeGroupLayer`

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

### `editFieldsInfo`

### `editingEnabled`

### `editingInfo`

### `effect`

### `effectiveCapabilities`

### `effectiveEditingEnabled`

### `elevationInfo`

### `fields`

### `fieldsIndex`

### `floorInfo`

### `fullExtent`
- **Type:** `Inherited`

### `gdbVersion`

### `geometryFieldsInfo`

### `geometryType`

### `globalIdField`

### `hasM`

### `hasZ`

### `historicMoment`

### `id`
- **Type:** `Inherited`

### `isTable`

### `layerId`

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

### `outFields`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `portalItem`

### `preferredTimeZone`

### `refreshInterval`

### `relationships`

### `returnM`

### `returnZ`

### `serviceDefinitionExpression`

### `sourceJSON`

### `spatialReference`

### `sublayers`

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

### `addAttachment`

### `addHandles`
- **Type:** `Inherited`

### `applyEdits`

### `cancelLoad`
- **Type:** `Inherited`

### `clone`

### `createLayerView`
- **Type:** `Inherited`

### `createQuery`

### `deleteAttachments`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `findSublayerForFeature`

### `findSublayerForSubtypeCode`

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

### `loadAll`

### `on`
- **Type:** `Inherited`

### `queryAttachments`

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `queryRelatedFeatures`

### `queryRelatedFeaturesCount`

### `refresh`

### `removeHandles`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `updateAttachment`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const SubtypeGroupLayer = await $arcgis.import("@arcgis/core/layers/SubtypeGroupLayer.js");
const stgl = new SubtypeGroupLayer({
  url: "https://sampleserver7.arcgisonline.com/server/rest/services/UtilityNetwork/NapervilleElectric/FeatureServer/0"
});
map.add(stgl);  // adds the layer to the map
```

```javascript
const stgl = new SubtypeGroupLayer({
  portalItem: {  // autocasts as esri/portal/PortalItem
    id: "8444e275037549c1acab02d2626daae"
  }
});
map.add(stgl);
```

```javascript
const stgl = new SubtypeGroupLayer({
  url: "https://sampleserver7.arcgisonline.com/server/rest/services/UtilityNetwork/NapervilleElectric/FeatureServer/0",
  sublayers: [ // autocasts as a Collection of SubtypeSublayers
    {
      subtypeCode: 12,
      visible: true,
      renderer: simpleRenderer
    },
    {
      subtypeCode: 14,
      visible: false,
      renderer: classBreaksRenderer
    },
    {
      subtypeCode: 16,
      visible: true,
      renderer: classBreaksRenderer,
      popupTemplate: popupTemplate
    }
  ]
});
map.add(stgl);
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

```javascript
const layer = new FeatureLayer({
 // layer's fields definition
 fields: [
 {
   name: "ObjectID",
   alias: "ObjectID",
   type: "oid"
 }, {
   name: "type",
   alias: "Type",
   type: "string"
 }, {
   name: "recordedDate",
   alias: "recordedDate",
   type: "date"
 }],
 dateFieldsTimeZone: "America/New_York", // date field values in are eastern time zone
 objectIdField: "ObjectID", // inferred from fields array if not specified
 geometryType: "point", // geometryType and spatialReference are inferred from the first feature
                        // in the source array if they are not specified.
 spatialReference: { wkid: 4326 },
 source: graphics  //  an array of graphics with geometry and attributes
});
map.add(layer);
```

