# csvUtils

**Module:** `@arcgis/core/layers/support/csvUtils`

## Import

```javascript
import * as csvUtils from "@arcgis/core/layers/support/csvUtils.js";
```

```javascript
// CDN
const csvUtils = await $arcgis.import("@arcgis/core/layers/support/csvUtils.js");
```

**Since:** 4.32

## Overview

Provides utility functions for the CSVLayer.

## See Also

- CSVLayer
- csvUtils.getCSVLayerInfo()

## Property Details

### `getCSVLayerInfo`

### `CSVLayerInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
const url = "https://example.com/data.csv";
const info = await getCSVLayerInfo(url);
// present to the user the fields and the delimiter, then create the layer
const layer = new CSVLayer(info);
```

