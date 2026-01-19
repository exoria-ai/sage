# utils

**Module:** `@arcgis/core/rest/featureService/utils`

## Import

```javascript
import * as featureServiceUtils from "@arcgis/core/rest/featureService/utils.js";
```

```javascript
// CDN
const featureServiceUtils = await $arcgis.import("@arcgis/core/rest/featureService/utils.js");
```

**Since:** 4.28

## Overview

Provides utility methods for creating FeatureServices.

## Property Details

### `createFeatureServices`

### `FeatureServiceResourcesBundle`


## Method Details

### `Method Details()`


## Examples

```javascript
const layer1 = new FeatureLayer({url: `${defaultHost}/arcgis/rest/services/TestService/FeatureServer/12`});
const layer2 = new FeatureLayer({url: `${defaultHost}/arcgis/rest/services/TestService/FeatureServer/13`});
const layers = [layer1, layer2];
const mapOfServices = createFeatureServices(layers);

//loading featureService from map object.
const featureService = await mapOfServices.get(`yourFeatureServiceLink/arcgis/rest/services/TestService/FeatureServer`).featureService.load();
```

