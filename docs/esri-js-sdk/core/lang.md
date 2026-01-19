# lang

**Module:** `@arcgis/core/core/lang`

## Import

```javascript
import * as esriLang from "@arcgis/core/core/lang.js";
```

```javascript
// CDN
const esriLang = await $arcgis.import("@arcgis/core/core/lang.js");
```

**Since:** 4.0

## Overview

Provides a utility method for deeply cloning objects with properties that are computed or have their own clone() method, such as Extent.

## Property Details

### `clone`


## Method Details

### `Method Details()`


## Examples

```javascript
const esriLang = await $arcgis.import("@arcgis/core/core/lang.js");
let initialProps = {
  extent: appExtent, // app initial extent
  spatialReference: spatReference // app spatialReference
};
// Creates a deep clone of the object
let clonedInitialProps = esriLang.clone(initialProps);
```

