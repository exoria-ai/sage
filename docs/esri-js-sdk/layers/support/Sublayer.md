# Sublayer

**Module:** `@arcgis/core/layers/support/Sublayer`

## Import

```javascript
import Sublayer from "@arcgis/core/layers/support/Sublayer.js";
```

```javascript
// CDN
const Sublayer = await $arcgis.import("@arcgis/core/layers/support/Sublayer.js");
```

**Since:** 4.1

## See Also

- MapImageLayer
- Sample - MapImageLayer: toggle sublayer visibility
- Sample - MapImageLayer: set definition expression
- Sample - MapImageLayer: set renderers on sublayers
- Sample - MapImageLayer: label sublayer features
- Sample - MapImageLayer: create dynamic map layers
- Sample - MapImageLayer: dynamic data layer with table join
- Sample - MapImageLayer: dynamic data layer with query table
- Sample - MapImageLayer: dynamic data layer with raster
- Sample - MapImageLayer: set definition expression
- load()
- loadStatus
- load()
- fields
- load()
- loadStatus
- Sample - MapImageLayer: toggle sublayer visibility
- MapImageLayer.subtables
- TileLayer.subtables
- Sample - MapImageLayer: label sublayer features
- Sample - MapImageLayer: label sublayer features
- Sample - MapImageLayer - label sublayer features
- Sample - MapImageLayer - label sublayer features
- fields
- load()
- Sample - MapImageLayer: dynamic data layer with table join
- Arcade Feature Z Profile
- Sample - MapImageLayer: dynamic data layer with table join
- Sample - MapImageLayer: set renderers on sublayers
- load()
- load()
- Sample - MapImageLayer: toggle sublayer visibility
- FeatureLayer.dynamicDataSource
- Sample - MapImageLayer: toggle sublayer visibility
- Sample - MapImageLayer: dynamic data layer with table join
- Sample - MapImageLayer: dynamic data layer with query table
- Sample - MapImageLayer: raster data source
- ArcGIS REST API - Layer source object
- Sample - MapImageLayer: create dynamic map layers
- ArcGIS REST API - Layer source object
- Sample - MapImageLayer: dynamic data layer with table join
- ArcGIS REST API - Data source object
- Sample - MapImageLayer: dynamic data layer with query table
- ArcGIS REST API - Data source object
- Sample - MapImageLayer: raster data source
- ArcGIS REST API - Data source object
- Sample - MapImageLayer: toggle sublayer visibility
- Sample - MapImageLayer: dynamic data layer with table join
- ArcGIS REST API - Data source object

## Property Details

### `Sublayer`

### `attributeTableTemplate`

### `capabilities`

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `fields`

### `fieldsIndex`

### `floorInfo`

### `fullExtent`

### `id`

### `isTable`

### `labelingInfo`

### `labelsVisible`

### `layer`

### `legendEnabled`

### `listMode`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `maxScale`

### `minScale`

### `objectIdField`

### `opacity`

### `orderBy`

### `parent`

### `popupEnabled`

### `popupTemplate`

### `relationships`

### `renderer`

### `source`

### `sourceJSON`

### `spatialReference`

### `sublayers`

### `title`

### `type`

### `typeIdField`

### `types`

### `uid`

### `url`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `clone`

### `createFeatureLayer`

### `createPopupTemplate`

### `createQuery`

### `getFeatureType`

### `getFieldDomain`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `queryAttachments`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `queryRelatedFeatures`

### `queryRelatedFeaturesCount`

### `reload`

### `removeHandles`
- **Type:** `Inherited`

### `when`

### `DynamicDataLayer`

### `DynamicMapLayer`

### `JoinTableDataSource`

### `QueryTableDataSource`

### `RasterDataSource`

### `TableDataSource`


## Method Details

### `Method Details()`


## Examples

```javascript
// defines the properties of various sublayers in a map service
let layer = new MapImageLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  sublayers: [
    {  // sets a definition expression on sublayer 3
      id: 3,
      definitionExpression: "pop2000 > 40000000"
    },
    {  // sublayer 2 will be rendered as defined in the map service
      id: 2
    },
    {  // sublayer 1 will be included in the layer, with visibility off
      id: 1,
      visible: false
    },
    {  // sublayer 0 will have new renderer and label
       // expressions applied in the view on the fly
      id: 0,
       renderer: {
         type: "class-breaks"  // autocasts as new ClassBreaksRenderer()
         // set renderer properties here
       },
       labelingInfo: [ new LabelClass ( ... ) ]
     }
   ]
});
```

```javascript
// typical usage
let layer = new MapImageLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  sublayers: [  // autocasts as a Collection of Sublayers
    { // sets a definition expression on sublayer 0
      id: 0,
      definitionExpression: "pop2000 > 40000000"
    },
    {  // creates a dynamic data layer
      source: {
        type: dynamic-layer,
        dataSource: {
          type: "table",
          workspaceId: "MyDatabaseWorkspaceIDSSR2",
          dataSourceName: "ss6.gdb.Railroads"
        }
      }
    }
  ]
});
```

```javascript
// Once the layer loads, check if `supportsAttachment`
// operation is enabled on the layer

layer.when(function(){
  if (layer.capabilities.data.supportsAttachment) {
    // if attachments are enabled on the layer
    setupAttachments();
  }
});
```

```javascript
let countiesLyr = layer.sublayers.find(function(sublayer){
  return sublayer.title === "States";
});
countiesLyr.definitionExpression = "STATE = 'Nebraska'"
```

```javascript
// add a definition expression to sublayer when
// it is created in MapImageLayer constructor
let layer = new MapImageLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  sublayers: [{
    id: 0,
    definitionExpression: "STATE = 'Nebraska'"
  }]
});
```

```javascript
// Set a definition expression on the sublayer with ID of 0
layer.findSublayerById(0).definitionExpression = "STATE = 'Nebraska'";
```

