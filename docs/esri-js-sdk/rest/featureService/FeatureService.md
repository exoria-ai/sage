# FeatureService

**Module:** `@arcgis/core/rest/featureService/FeatureService`

## Import

```javascript
import FeatureService from "@arcgis/core/rest/featureService/FeatureService.js";
```

```javascript
// CDN
const FeatureService = await $arcgis.import("@arcgis/core/rest/featureService/FeatureService.js");
```

**Since:** 4.28

## Property Details

### `FeatureService`

### `capabilities`

### `effectiveCapabilities`

### `layerInfos`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `tableInfos`

### `url`

### `userTypeExtensions`

### `utilityNetworkUrl`

### `versionManagementServiceUrl`

### `applyEdits`

### `cancelLoad`

### `fetchAllLayersAndTables`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `when`

### `Capabilities`

### `CombineGroupedObjectResult`

### `CombineGroupedObjectsEdit`

### `DeleteAssociationEdit`

### `DivideGroupedObjectResult`

### `DivideGroupedObjectsEdit`

### `FeatureEditResult`

### `LayerDefinition`

### `LayerInfo`

### `ServiceContents`

### `ServiceEditsResult`

### `SplitsResult`

### `TableDefinition`

### `TableInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a FeatureService from a url
const featureService = new FeatureService({
 url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer"
});
```

```javascript
// Create a FeatureService using createFeatureServices()
const layer1 = new FeatureLayer({url: `https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/FeatureServer/12`});
const layer2 = new FeatureLayer({url: `https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/FeatureServer/13`});
const layers = [layer1, layer2];
const mapOfServices = createFeatureServices(layers);
//loading featureService from map object.
const featureService = await mapOfServices.get(`https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/FeatureServer`).featureService.load();
```

```javascript
featureService.applyEdits(
  [
    {
      id: 1,  // layer id of the layer in the feature service
      identifierFields: { globalIdField: "GLOBALID", objectIdField: "OBJECTID" },
      addFeatures: [
        new Graphic({
                geometry: new Point({
                  x: -13293155.7588,
                  y: 4038940.6944999993,
                  z: 0,
                  spatialReference: {
                    wkid: 102100,
                    latestWkid: 3857,
                    xyTolerance: 0.001,
                    zTolerance: 0.001,
                    mTolerance: 0.001,
                    falseX: -20037700,
                    falseY: -30241100,
                    xyUnits: 10000,
                    falseZ: -100000,
                    zUnits: 10000,
                    falseM: -100000,
                    mUnits: 10000
                  }
                }),
                attributes: {
                  objectid: 3,
                  name: "test",
                  globalid: "{8E17A611-B139-46E4-A645-AC50A1DD2CCE}",
                  created_user: "unadmin",
                  created_date: 1694024410000,
                  last_edited_user: "unadmin",
                  last_edited_date: 1694024410000
                }
              }))
      ]
    }
  ],
  {
    gdbVersion: "user.versionName",
    globalIdUsed: false,
    honorSequenceOfEdits: false,
    usePreviousEditMoment: false
  }
);
```

```javascript
// Although this example uses MapView, any class instance that is a promise may use when() in the same way
let view = new MapView();
view.when(function(){
  // This function will execute once the promise is resolved
}, function(error){
  // This function will execute if the promise is rejected due to an error
});
```

