# ValidateNetworkTopologyResult

**Module:** `@arcgis/core/rest/networks/support/ValidateNetworkTopologyResult`

## Import

```javascript
import ValidateNetworkTopologyResult from "@arcgis/core/rest/networks/support/ValidateNetworkTopologyResult.js";
```

```javascript
// CDN
const ValidateNetworkTopologyResult = await $arcgis.import("@arcgis/core/rest/networks/support/ValidateNetworkTopologyResult.js");
```

**Since:** 4.26

## Overview

Class that holds the returned object after running the Network.validateTopology() method.

## Property Details

### `discoveredSubnetworks`

### `exceededTransferLimit`

### `fullUpdate`

### `moment`

### `serviceEdits`

### `validateErrorsCreated`

### `Subnetwork`

### `ValidateServiceEdits`


## Examples

```javascript
const extent = new Extent({
  xmin: 470789.0888,
  ymin: 3597733.2051,
  xmax: 531454.2759999996,
  ymax: 3639864.802100001,
  spatialReference: { wkid: 26911, latestWkid: 26911 }
});

const validateNetworkTopologyResult = await network.validateTopology({
  validateArea: extent
});
```

