# timeUtils

**Module:** `@arcgis/core/support/timeUtils`

## Import

```javascript
import * as timeUtils from "@arcgis/core/support/timeUtils.js";
```

```javascript
// CDN
const timeUtils = await $arcgis.import("@arcgis/core/support/timeUtils.js");
```

**Since:** 4.21

## Overview

Provides utility methods for working with dates.

## See Also

- TimeExtent
- TimeInterval
- TimeSlider
- TimeSliderViewModel
- Sample - Time-enabled bookmarks

## Property Details

### `getTimeExtentFromLayers`

### `getTimeSliderSettingsFromWebDocument`


## Method Details

### `Method Details()`


## Examples

```javascript
// Get the time extent of all layers in the view.
const fullTimeExtent = await getTimeExtentFromLayers(view.map.allLayers);
```

```javascript
// Get the time extent from an array of layers.
const timeExtent = await getTimeExtentFromLayers([
  earthquakes,
  emergencyCalls
]);
```

```javascript
// Import and apply time slider settings stored in a webmap.
const map = new WebMap({
  portalItem: {
    id: "your-webmap-id",
  }
});

timeUtils.getTimeSliderSettingsFromWebDocument(map).then((timeSliderSettings) => {
  const timeSlider = new TimeSlider({
    ...timeSliderSettings,
    view
  });
});
```

