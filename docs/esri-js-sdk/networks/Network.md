# Network

**Module:** `@arcgis/core/networks/Network`

## Import

```javascript
import Network from "@arcgis/core/networks/Network.js";
```

**Since:** 4.20

## See Also

- UtilityNetwork
- Learn more about network schema versions

## Property Details

### `dataElement`

### `datasetName`

### `declaredClass`
- **Type:** `Inherited`

### `featureServiceUrl`

### `fullExtent`

### `gdbVersion`

### `historicMoment`

### `id`

### `layerId`

### `layerUrl`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `networkServiceUrl`

### `networkSystemLayers`

### `owner`

### `parsedUrl`

### `schemaGeneration`

### `sourceJSON`

### `spatialReference`

### `title`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `fromJSON`

### `fromPortalItem`

### `getLayerIdBySourceId`

### `getObjectIdsFromElements`

### `getSourceIdByLayerId`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `queryNamedTraceConfigurations`

### `removeHandles`
- **Type:** `Inherited`

### `submitTopologyValidationJob`

### `toJSON`

### `validateTopology`

### `when`

### `DomainNetworkJSON`

### `LayerInfo`

### `NetworkDataElementJSON`

### `ValidateTopologyProps`


## Method Details

### `Method Details()`


## Examples

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

```javascript
// Create a utility network from a specified portal item that contains a utility network feature service
const item = new PortalItem({
  id: "77c7ae75eb3e4e08a7ad98cb37fefe88",
});

const utilityNetwork = await UtilityNetwork.fromPortalItem(item);

await utilityNetwork.load();
console.log("utilityNetwork loaded? ", utilityNetwork.loadStatus);
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

