# wfsUtils

**Module:** `@arcgis/core/layers/ogc/wfsUtils`

## Import

```javascript
import * as wfsUtils from "@arcgis/core/layers/ogc/wfsUtils.js";
```

```javascript
// CDN
const wfsUtils = await $arcgis.import("@arcgis/core/layers/ogc/wfsUtils.js");
```

**Since:** 4.20

## Overview

Provides utility functions for the WFSLayer.

## See Also

- WFSLayer
- wfsUtils.getCapabilities()
- wfsUtils.getWFSLayerInfo()
- WFSCapabilities
- wfsUtils.getWFSLayerInfo()
- WFSCapabilities

## Property Details

### `getCapabilities`

### `getWFSLayerInfo`

### `WFSCapabilities`

### `WFSFeatureType`

### `WFSLayerInfo`

### `WFSOperations`


## Method Details

### `Method Details()`


## Examples

```javascript
const capabilities = await wfsUtils.getCapabilities(url);
const layerInfo = await wfsUtils.getWFSLayerInfo(capabilities, "layer");

const layer = WFSLayer.fromWFSLayerInfo(layerInfo);

// Same as
const layer = WFSLayer({
  url,
  name: "layer"
});
```

```javascript
const capabilities = await wfsUtils.getCapabilities(url);
const layerInfo = await wfsUtils.getWFSLayerInfo(capabilities, "layer");

const layer = WFSLayer.fromWFSLayerInfo(layerInfo);

// Same as
const layer = WFSLayer({
  url,
  name: "layer"
});
```

