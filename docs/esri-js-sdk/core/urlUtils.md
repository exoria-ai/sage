# urlUtils

**Module:** `@arcgis/core/core/urlUtils`

## Import

```javascript
import * as urlUtils from "@arcgis/core/core/urlUtils.js";
```

```javascript
// CDN
const urlUtils = await $arcgis.import("@arcgis/core/core/urlUtils.js");
```

**Since:** 4.0

## Overview

Utility methods for working with URLs.

## See Also

- esriConfig.request
- Guide topic - Proxy pages
- esriConfig.request
- dataToBlob
- esriConfig.request

## Property Details

### `addProxyRule`

### `dataToArrayBuffer`

### `dataToBlob`

### `downloadBlobAsFile`

### `downloadDataAsFile`

### `getProxyRule`

### `isDataProtocol`

### `isHTTPSProtocol`

### `urlToObject`


## Method Details

### `Method Details()`


## Examples

```javascript
let myObject = urlUtils.urlToObject("http://www.myworld.com?state_name=Ohio&city_name=Akron");
  // The value of my Object is...
  // { path: "http://www.myworld.com", query: {state_name: "Ohio", city_name: "Akron"} }
```

