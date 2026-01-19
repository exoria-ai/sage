# CircuitManager

**Module:** `@arcgis/core/networks/CircuitManager`

## Import

```javascript
import CircuitManager from "@arcgis/core/networks/CircuitManager.js";
```

```javascript
// CDN
const CircuitManager = await $arcgis.import("@arcgis/core/networks/CircuitManager.js");
```

**Since:** 4.34

## See Also

- UtilityNetwork
- UnitIdentifierManager
- Telecom domain network

## Property Details

### `CircuitManager`

### `circuitSectionTable`

### `circuitTable`

### `declaredClass`
- **Type:** `Inherited`

### `featureServiceUrl`

### `gdbVersion`

### `historicMoment`

### `networkServiceUrl`

### `subcircuitTable`

### `telecomDomainNetwork`

### `telecomDomainNetworkName`

### `utilityNetwork`

### `addHandles`
- **Type:** `Inherited`

### `alter`

### `create`

### `delete`

### `export`

### `fromJSON`

### `getCircuit`

### `hasHandles`
- **Type:** `Inherited`

### `loadCircuitSectionTable`

### `loadCircuitTable`

### `loadSubcircuitTable`

### `queryCircuitNames`

### `queryCircuits`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `verify`

### `CircuitExportResult`

### `QueryCircuitProps`


## Method Details

### `Method Details()`


## Examples

```javascript
const utilityNetwork = new UtilityNetwork({
  layerUrl: "https://host.com/arcgis/rest/services/Test/FeatureServer/0",
});

await utilityNetwork.load();

const domainNetworks = utilityNetwork.dataElement?.domainNetworks;
const telecomDomainNetwork = domainNetworks.find((dn) => dn.isTelecomNetwork);

const circuitManager = await utilityNetwork.getCircuitManager(telecomDomainNetwork.domainNetworkName);
```

```javascript
`https://utilitynetwork.esri.com/server/rest/services/NapervilleElectric/FeatureServer/`
```

```javascript
`https://utilitynetwork.esri.com/server/rest/services/NapervilleElectric/UtilityNetworkServer/`
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

