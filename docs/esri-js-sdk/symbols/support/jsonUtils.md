# jsonUtils

**Module:** `@arcgis/core/symbols/support/jsonUtils`

## Import

```javascript
import * as symbolJsonUtils from "@arcgis/core/symbols/support/jsonUtils.js";
```

```javascript
// CDN
const symbolJsonUtils = await $arcgis.import("@arcgis/core/symbols/support/jsonUtils.js");
```

**Since:** 4.0

## Overview

Provides a utility method used to deserialize a JSON symbol object returned by the REST API.

## See Also

- Symbol
- Using fromJSON() to create a class instance

## Property Details

### `fromJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// The angle=-30 in the JSON will create a symbol rotated -30 degrees counter-clockwise; that is,
// 30 degrees clockwise, which symbol.angle=30 would also produce.
let symbol = jsonUtils.fromJSON({
   "angle": -30,
   "xoffset": 0,
   "yoffset": 0,
   "type": "esriPMS",
   "url": "http://www.esri.com/careers/profiles/~/media/Images/Content/graphics/icons/socialmedia/pinterest1.png",
   "width": 18,
   "height": 18
});
```

