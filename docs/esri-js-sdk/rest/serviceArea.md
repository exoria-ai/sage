# serviceArea

**Module:** `@arcgis/core/rest/serviceArea`

## Import

```javascript
import * as serviceArea from "@arcgis/core/rest/serviceArea.js";
```

```javascript
// CDN
const serviceArea = await $arcgis.import("@arcgis/core/rest/serviceArea.js");
```

**Since:** 4.19

## Overview

With the Service area service, you can find the area that can be reached from the input location within a given travel time or travel distance. A service area is the area that encompasses all streets that can be accessed within a given distance or travel time from one or more locations, referred to as facilities. Service areas are generally used to visualize and measure the accessibility of facilities. For example, a three-minute drive-time polygon around a grocery store can determine which residents are able to reach the store within three minutes and are thus more likely to shop there. The service can also create multiple concentric service areas around one or more facilities that can show how accessibility changes with an increase in travel time or travel distance. It can be used, for example, to determine how many hospitals are within 5-, 10-, and 15-minute drive times of schools. When creating service areas based on travel times, the service can make use of traffic data, which can influence the area that can be reached during different times of the day.

## See Also

- ServiceAreaParameters
- ServiceAreaSolveResult
- Tutorial: Find service areas
- Solve Service Area - ArcGIS Server REST API

## Property Details

### `solve`


## Method Details

### `Method Details()`

