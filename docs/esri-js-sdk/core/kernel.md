# kernel

**Module:** `@arcgis/core/kernel`

## Import

```javascript
import * as esriNS from "@arcgis/core/kernel.js";
```

```javascript
// CDN
const esriNS = await $arcgis.import("@arcgis/core/kernel.js");
```

**Since:** 4.0

## Overview

Utility for retrieving the version of the ArcGIS Maps SDK for JavaScript.

## Property Details

### `fullVersion`

### `version`


## Examples

```javascript
const esriNS = await $arcgis.import("@arcgis/core/kernel.js");
console.log(esriNS.fullVersion); // e.g. "4.34.0" or "4.34.0-next.1"
```

```javascript
const esriNS = await $arcgis.import("@arcgis/core/kernel.js");
console.log(esriNS.version); // e.g. "4.34"
```

