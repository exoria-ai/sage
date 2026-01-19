# UnitIdentifierManager

**Module:** `@arcgis/core/networks/UnitIdentifierManager`

## Import

```javascript
import UnitIdentifierManager from "@arcgis/core/networks/UnitIdentifierManager.js";
```

```javascript
// CDN
const UnitIdentifierManager = await $arcgis.import("@arcgis/core/networks/UnitIdentifierManager.js");
```

**Since:** 4.34

## See Also

- UtilityNetwork
- CircuitManager
- Telecom domain network

## Property Details

### `UnitIdentifierManager`

### `declaredClass`
- **Type:** `Inherited`

### `featureServiceUrl`

### `gdbVersion`

### `historicMoment`

### `networkServiceUrl`

### `utilityNetwork`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `insertGap`

### `query`

### `removeHandles`
- **Type:** `Inherited`

### `reset`

### `resize`

### `toJSON`

### `UnitIdentifier`

### `UnitRange`


## Method Details

### `Method Details()`


## Examples

```javascript
const utilityNetwork = new UtilityNetwork({
  layerUrl: "https://host.com/arcgis/rest/services/Test/FeatureServer/0",
});

await utilityNetwork.load();

const unitIdentifierManager = await utilityNetwork.getUnitIdentifierManager();
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

