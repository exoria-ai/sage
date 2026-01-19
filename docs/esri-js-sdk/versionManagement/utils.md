# utils

**Module:** `@arcgis/core/versionManagement/utils`

## Import

```javascript
import * as versionManagementUtils from "@arcgis/core/versionManagement/utils.js";
```

```javascript
// CDN
const versionManagementUtils = await $arcgis.import("@arcgis/core/versionManagement/utils.js");
```

**Since:** 4.30

## Overview

Provides utility methods for creating VersioningStates.

## Property Details

### `createVersioningStates`

### `getVersioningStates`


## Method Details

### `Method Details()`


## Examples

```javascript
const webmap = new WebMap({
  portalItem: { // autocasts as new PortalItem()
    id: "e691172598f04ea8881cd2a4adaa45ba"
  }
});
const versioningStates = await utils.createVersioningStates(webmap, false);
```

```javascript
const webmap = new WebMap({
    portalItem: { // autocasts as new PortalItem()
    id: "e691172598f04ea8881cd2a4adaa45ba"
  }
});
const view = new View({
    map: webmap,
    container: "viewDiv",
});
const versioningStates = await utils.getVersioningStates(view, false);
```

