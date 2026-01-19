# lastMileDelivery

**Module:** `@arcgis/core/rest/lastMileDelivery`

## Import

```javascript
import * as lastMileDelivery from "@arcgis/core/rest/lastMileDelivery.js";
```

```javascript
// CDN
const lastMileDelivery = await $arcgis.import("@arcgis/core/rest/lastMileDelivery.js");
```

**Since:** 4.34

## Overview

Last Mile Delivery is a type of Vehicle Routing Problem operation that can find the most optimized routes for a fleet of vehicles that need to make deliveries. It is specifically tailored to the unique challenges of final deliveries, focusing on efficiency in dense urban environments. It produces geographically clustered routes so drivers can easily visit each location, which minimizes the operating cost for the fleet of vehicles.

## See Also

- LastMileDeliveryParameters
- Solve Last Mile Delivery - ArcGIS Server REST API
- Response objects: usage_cost
- Response objects: depot_visits
- Response objects: output_depots
- Response objects: direction_lines
- Response objects: direction_points
- Response objects: output_orders
- Response objects: output_routes

## Property Details

### `execute`

### `getCost`

### `getDepotVisits`

### `getDepots`

### `getDirectionLines`

### `getDirectionPoints`

### `getOrders`

### `getRoutes`

### `Cost`


## Method Details

### `Method Details()`


## Examples

```javascript
const apiKey = "YOUR_API_KEY";
const url = "https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveLastMileDelivery";
const parameters = new LastMileDeliveryParameters({
  apiKey,
  depots: new FeatureSet({ features: {  <An array of graphics>  } }),
  orders: new FeatureSet({ features: {  <An array of graphics>  } }),
  routes: new FeatureSet({ features: {  <An array of graphics>  } }),
  earliestRouteStartDate: "2024-02-02",
  maxRouteTotalTime: 480,
)};

// Returns job-id when async job is complete.
const jobInfo = await lastMileDelivery.exectute(url, parameters);

const requestOptions = { query: { token: parameters.apiKey } };
const [depots, orders, routes, cost] = await Promise.all([
  getDepots(jobInfo, null, requestOptions),
  getOrders(jobInfo, null, requestOptions),
  getRoutes(jobInfo, null, requestOptions),
  getCost(jobInfo, null, requestOptions),
]);
```

