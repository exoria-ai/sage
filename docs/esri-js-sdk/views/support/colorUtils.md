# colorUtils

**Module:** `@arcgis/core/views/support/colorUtils`

## Import

```javascript
import * as viewColorUtils from "@arcgis/core/views/support/colorUtils.js";
```

```javascript
// CDN
const viewColorUtils = await $arcgis.import("@arcgis/core/views/support/colorUtils.js");
```

**Since:** 4.13

## Overview

Contains utilities for working with colors in the View.

## Property Details

### `getBackgroundColor`

### `getBackgroundColorTheme`


## Method Details

### `Method Details()`


## Examples

```javascript
viewColorUtils.getBackgroundColor(view)
  .then(function(averageColor){
    // averageColor is the input view's average background color
  });
```

```javascript
const backgroundTheme = await viewColorUtils.getBackgroundColorTheme(view);
if(backgroundTheme === "dark"){
  // style other app elements with a dark theme
}
```

