# utils

**Module:** `@arcgis/core/versionManagement/versionAdapters/utils`

## Import

```javascript
import * as versionManagementAdapterUtils from "@arcgis/core/versionManagement/versionAdapters/utils.js";
```

```javascript
// CDN
const versionManagementAdapterUtils = await $arcgis.import("@arcgis/core/versionManagement/versionAdapters/utils.js");
```

**Since:** 4.30

## Overview

Provides utility methods for creating VersionAdapters.

## Property Details

### `createVersionAdapter`

### `createVersionAdapters`


## Method Details

### `Method Details()`


## Examples

```javascript
const layer = new FeatureLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/12"
});
const adapter = utils.createVersionAdapter(layer);
```

```javascript
const layer1 = new FeatureLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/12"
});
const layer2 = new FeatureLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/13"
});
const adapters = utils.createVersionAdapters([layer1, layer2]);
```

