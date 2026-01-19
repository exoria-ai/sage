# cimConversionUtils

**Module:** `@arcgis/core/symbols/support/cimConversionUtils`

## Import

```javascript
import * as cimConversionUtils from "@arcgis/core/symbols/support/cimConversionUtils.js";
```

```javascript
// CDN
const cimConversionUtils = await $arcgis.import("@arcgis/core/symbols/support/cimConversionUtils.js");
```

**Since:** 4.29

## Overview

Provides utility functions for converting simple symbols and picture symbols to CIMSymbols.

## See Also

- CIMSymbol
- cimSymbolUtils
- symbolService

## Property Details

### `convertToCIMSymbol`


## Method Details

### `Method Details()`


## Examples

```javascript
const simpleLine = new SimpleLineSymbol({
   width: 1,
   color: "black",
   style: "dash",
   cap: "round",
});
const cimLine = cimConversionUtils.convertToCIMSymbol(simpleLine);
graphic.symbol = cimLine;
```

