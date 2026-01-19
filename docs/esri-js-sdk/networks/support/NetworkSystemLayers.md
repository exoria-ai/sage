# NetworkSystemLayers

**Module:** `@arcgis/core/networks/support/NetworkSystemLayers`

## Import

```javascript
import NetworkSystemLayers from "@arcgis/core/networks/support/NetworkSystemLayers.js";
```

```javascript
// CDN
const NetworkSystemLayers = await $arcgis.import("@arcgis/core/networks/support/NetworkSystemLayers.js");
```

**Since:** 4.25

## See Also

- Network
- UtilityNetwork

## Property Details

### `NetworkSystemLayers`

### `associationsTable`

### `associationsTableId`

### `associationsTableUrl`

### `declaredClass`
- **Type:** `Inherited`

### `dirtyAreasLayerId`

### `dirtyAreasLayerUrl`

### `rulesTableId`

### `rulesTableUrl`

### `subnetworksTable`

### `subnetworksTableId`

### `subnetworksTableUrl`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `loadAssociationsTable`

### `loadSubnetworksTable`

### `removeHandles`
- **Type:** `Inherited`


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

    // Print the subnetworks table service url and id
    console.log(`Dirty areas layer id: ${utilityNetwork.networkSystemLayers.subnetworksTableId}`);
    console.log(`Dirty areas layer url: ${utilityNetwork.networkSystemLayers.subnetworksTableUrl}`);
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
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

