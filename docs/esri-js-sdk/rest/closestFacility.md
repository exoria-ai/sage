# closestFacility

**Module:** `@arcgis/core/rest/closestFacility`

## Import

```javascript
import * as closestFacility from "@arcgis/core/rest/closestFacility.js";
```

```javascript
// CDN
const closestFacility = await $arcgis.import("@arcgis/core/rest/closestFacility.js");
```

**Since:** 4.19

## Overview

Helps you find closest facilities around any location (incident) on a network. When finding closest facilities, you can specify various parameters including how many to facilities to find and whether the direction of travel is toward or away from them. Once you've found the closest facilities, you can display the best route to or from them, return the travel cost for each route, and display directions to each facility using the ClosestFacilitySolveResult. You can also specify a cutoff cost beyond which ArcGIS Network Analyst should not search for a facility. For instance, you can set up a closest facility problem to search for hospitals within a 15-minute drive time of the site of an accident. Any hospitals that take longer than 15 minutes to reach will not be included in the results. Parameters must be defined using ClosestFacilityParameters and input to the solve() method.

## See Also

- ClosestFacilityParameters
- ClosestFacilitySolveResult

## Property Details

### `solve`


## Method Details

### `Method Details()`


## Examples

```javascript
solve(url, params).then(function(solveResult){
  // Do something with the solveResults here
});
```

