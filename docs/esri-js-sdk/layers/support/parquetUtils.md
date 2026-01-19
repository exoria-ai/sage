# parquetUtils

**Module:** `@arcgis/core/layers/support/parquetUtils`

## Import

```javascript
import * as parquetUtils from "@arcgis/core/layers/support/parquetUtils.js";
```

```javascript
// CDN
const parquetUtils = await $arcgis.import("@arcgis/core/layers/support/parquetUtils.js");
```

**Since:** 4.33

## Overview

Provides utility functions for the ParquetLayer.

## See Also

- ParquetLayer
- parquetUtils.getParquetLayerInfo()

## Property Details

### `getParquetLayerInfo`

### `ParquetLayerInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
const urls = ["url-to-your-parquet-file.parquet"];
const info = await parquetUtils.getParquetLayerInfo(urls);

// create new parquet layer using the retrieved info
const layer = new ParquetLayer(info);
```

