# route

**Module:** `@arcgis/core/rest/route`

## Import

```javascript
import * as route from "@arcgis/core/rest/route.js";
```

```javascript
// CDN
const route = await $arcgis.import("@arcgis/core/rest/route.js");
```

**Since:** 4.19

## Overview

Find routes between two or more locations and optionally get driving directions. The route module uses ArcGIS Server network analysis services to calculate routes. Network analysis services allow you to solve simple routing problems as well as complex ones that take into account multiple stops, barriers, and time windows. To work directly with route, the basic pattern is: Define the URL to the ArcGIS Server REST resource Configure the parameters Solve the route and then specify what to do with its results and handle any errors that may be returned.

## See Also

- RouteResult
- RouteSolveResult
- RouteParameters
- Esri Directions and Routing Services
- Sample - Route

## Property Details

### `solve`


## Method Details

### `Method Details()`


## Examples

```javascript
const [route, Collection, RouteParameters, Stop] = await $arcgis.import([
  "@arcgis/core/rest/route.js",
  "@arcgis/core/core/Collection.js",
  "@arcgis/core/rest/support/RouteParameters.js",
  "@arcgis/core/rest/support/Stop.js"
]);

// point the URL to a valid routing service
const routeUrl =
  "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

// create a Collection of new Stops
const stops = new Collection([
  new Stop({
    geometry: { x: -117.59275, y: 34.06200 },
    name: "Ontario Airport"
  }),
  new Stop({
    geometry: { x: -117.19570, y: 34.05609 },
    name: "Esri Campus"
  })
]);

// setup the RouteParameters with API key and Stops
const routeParams = new RouteParameters({
  // An authorization string used to access the routing service
  apiKey: "YOUR_API_KEY",
  stops
});

// solve the route with the RouteParameters
function solveRoute() {
  route.solve(routeUrl, routeParams).then(showRouteInfo);
}

// do something useful with the results
// like display them to the console
function showRouteInfo(routeSolveResult) {
  console.log("Show all results: ", routeSolveResult);
  console.log("Show the route information: ", routeSolveResult.routeResults[0].route);
}

solveRoute();
```

