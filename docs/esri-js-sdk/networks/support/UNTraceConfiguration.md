# UNTraceConfiguration

**Module:** `@arcgis/core/networks/support/UNTraceConfiguration`

## Import

```javascript
import UNTraceConfiguration from "@arcgis/core/networks/support/UNTraceConfiguration.js";
```

```javascript
// CDN
const UNTraceConfiguration = await $arcgis.import("@arcgis/core/networks/support/UNTraceConfiguration.js");
```

**Since:** 4.23

## See Also

- UtilityNetwork
- NamedTraceConfiguration
- TraceConfiguration
- TraceParameters
- Trace utility networks
- Configure a trace
- Add Trace Configuration (Utility Network)
- Trace - ArcGIS REST API
- Domain networks - ArcGIS Pro
- Attribute propagation - ArcGIS Pro
- Tiers - ArcGIS Pro
- Tiers - ArcGIS Pro
- Trace - ArcGIS REST API

## Property Details

### `UNTraceConfiguration`

### `allowIndeterminateFlow`

### `arcadeExpressionBarrier`

### `circuitName`

### `diagramTemplateName`

### `domainNetworkName`

### `filterBarriers`

### `filterBitsetNetworkAttributeName`

### `filterFunctionBarriers`

### `filterScope`

### `includeContainers`

### `includeContent`

### `includeIsolated`

### `includeStructures`

### `includeUpToFirstSpatialContainer`

### `inferConnectivity`

### `maxHops`

### `nearestNeighbor`

### `numPaths`

### `outputFilterCategories`

### `outputFilters`

### `propagators`

### `subnetworkName`

### `targetTierName`

### `tierName`

### `validateLocatability`


## Examples

```javascript
// create a new instance of UNTraceConfiguration
// and configure some parameters
const unTraceConfiguration = new UNTraceConfiguration({
  domainNetworkName: "Electric",
  tierName: "Electric Distribution",
  subnetworkName: "RMT003",
  includeContainers: true,
  validateConsistency: true,
  // Traversability
  conditionBarriers: [
    {
      name: "E:Device Status",
      type: "networkAttribute",
      operator: "equal",
      value: 1,
      combineUsingOr: false,
      isSpecificValue: true
    }
  ],
  traversabilityScope: "junctionsAndEdges",
});
```

