# UtilityNetwork

**Module:** `@arcgis/core/networks/UtilityNetwork`

## Import

```javascript
import UtilityNetwork from "@arcgis/core/networks/UtilityNetwork.js";
```

```javascript
// CDN
const UtilityNetwork = await $arcgis.import("@arcgis/core/networks/UtilityNetwork.js");
```

**Since:** 4.20

## See Also

- NamedTraceConfiguration
- Terminal
- TerminalConfiguration
- Domain networks
- Telecom domain network
- Learn more about network schema versions
- Terminal Configurations
- Tiers - ArcGIS Pro
- Domain networks - ArcGIS Pro

## Property Details

### `UtilityNetwork`

### `associationsTable`

### `dataElement`
- **Type:** `Inherited`

### `datasetName`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `domainNetworkNames`

### `featureServiceUrl`
- **Type:** `Inherited`

### `fullExtent`
- **Type:** `Inherited`

### `gdbVersion`
- **Type:** `Inherited`

### `hasTelecomNetwork`

### `historicMoment`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `layerId`
- **Type:** `Inherited`

### `layerUrl`
- **Type:** `Inherited`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `networkServiceUrl`
- **Type:** `Inherited`

### `networkSystemLayers`

### `owner`
- **Type:** `Inherited`

### `parsedUrl`
- **Type:** `Inherited`

### `schemaGeneration`
- **Type:** `Inherited`

### `serviceTerritoryFeatureLayerId`

### `sharedNamedTraceConfigurations`

### `sourceJSON`
- **Type:** `Inherited`

### `spatialReference`
- **Type:** `Inherited`

### `terminalConfigurations`

### `title`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `canAddAssociation`

### `cancelLoad`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `generateAddAssociations`

### `generateCombineNetworkElements`

### `generateDeleteAssociations`

### `generateDivideNetworkElements`

### `getCircuitManager`

### `getLayerIdBySourceId`
- **Type:** `Inherited`

### `getObjectIdsFromElements`
- **Type:** `Inherited`

### `getSourceIdByLayerId`
- **Type:** `Inherited`

### `getTerminalById`

### `getTerminalConfiguration`

### `getTierNames`

### `getUnitIdentifierManager`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `isUtilityLayer`

### `load`

### `loadAssociationsTable`

### `loadSubnetworksTable`

### `queryAssociations`

### `queryNamedTraceConfigurations`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `submitTopologyValidationJob`

### `submitTraceJob`

### `synthesizeAssociationGeometries`

### `toJSON`
- **Type:** `Inherited`

### `trace`

### `validateTopology`

### `when`
- **Type:** `Inherited`

### `ServiceEdits`


## Method Details

### `Method Details()`


## Examples

```javascript
const [WebMap, MapView, esriConfig] = await $arcgis.import([
  "@arcgis/core/WebMap.js",
  "@arcgis/core/views/MapView.js",
  "@arcgis/core/config.js"
]);
let utilityNetwork;

// set the hostname to the portal instance
esriConfig.portalUrl = "https://myHostName.domain.com/arcgis";

const webMap = new WebMap({
  portalItem: {
    id: "webmapID"
  }
});

const mapView = new MapView({
  map: webMap
});

webMap.when(async () => {
  // check if webMap contains utility networks
  if (webMap.utilityNetworks.length > 0) {
    // assign the utility network at index 0
    utilityNetwork = webMap.utilityNetworks.at(0);

    // trigger the loading of the UtilityNetwork instance
    await utilityNetwork.load();
  }
});
```

```javascript
// Instantiating a UtilityNetwork instance using layerUrl
const utilityNetwork = new UtilityNetwork({layerUrl: "https://hostName.com/server/rest/services/Test/FeatureServer/17"});
await utilityNetwork.load();
```

```javascript
`https://utilitynetwork.esri.com/server/rest/services/NapervilleElectric/FeatureServer/`
```

```javascript
`https://utilitynetwork.esri.com/server/rest/services/NapervilleElectric/UtilityNetworkServer/`
```

```javascript
// Print out the dirty areas layer url in the utility network
view.when(async () => {
  // Check if the webmap contains utility networks
  if(webmap?.utilityNetworks?.length > 0) {
    // Assigns the utility network at index 0
    utilityNetwork = webmap.utilityNetworks.at(0);

    // Load the utility network
    await utilityNetwork.load();

    // Print the dirty areas layer url and id
    console.log(`Dirty areas layer id: ${utilityNetwork.networkSystemLayers.dirtyAreasLayerId}`);
    console.log(`Dirty areas layer url: ${utilityNetwork.networkSystemLayers.dirtyAreasLayerUrl}`);
  }
});
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

