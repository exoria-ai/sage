# flow

**Module:** `@arcgis/core/smartMapping/symbology/flow`

## Import

```javascript
import * as flowSchemes from "@arcgis/core/smartMapping/symbology/flow.js";
```

```javascript
// CDN
const flowSchemes = await $arcgis.import("@arcgis/core/smartMapping/symbology/flow.js");
```

**Since:** 4.23

## Overview

Object containing helper methods for generating optimal settings for FlowRenderer. The getSchemes() method is used to generate renderer properties best suited to the basemap and theme.

## See Also

- flowRendererCreator

## Property Details

### `cloneScheme`

### `getSchemeByName`

### `getSchemes`

### `getSchemesByTag`

### `getThemes`

### `FlowScheme`

### `FlowSchemes`

### `Theme`


## Method Details

### `Method Details()`


## Examples

```javascript
// clones the primary scheme returned from the getSchemes() method
let flowScheme = primaryScheme.clone();
```

```javascript
// Constructs the scheme using the Perfect Pigtails color ramp.
const schemes = flowSchemes.getSchemeByName({
  name: "Perfect Pigtails",
  basemapTheme: "dark",
  theme: "wave-front"
});
```

```javascript
// gets the primary scheme for the features of the given geometry type and basemap
const schemes = flowSchemes.getSchemes({
  basemapTheme: "dark",
  theme: "wave-front"
});

// the suggested default scheme for the layer, basemap, and theme
let primaryScheme = schemes.primaryScheme;
```

```javascript
// returns colorblind friendly red color schemes
const schemes = flowSchemes.getSchemesByTag({
  basemapTheme: "dark",
  theme: "wave-front",
  includedTags: [ "reds", "colorblind-friendly" ]
});
```

