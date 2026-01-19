# DirectionsFeature

**Module:** `@arcgis/core/rest/support/DirectionsFeature`

## Import

```javascript
import DirectionsFeature from "@arcgis/core/rest/support/DirectionsFeature.js";
```

```javascript
// CDN
const DirectionsFeature = await $arcgis.import("@arcgis/core/rest/support/DirectionsFeature.js");
```

**Since:** 4.25

## See Also

- DirectionsFeatureSet.features
- route.solve()

## Property Details

### `attributes`

### `events`

### `geometry`

### `strings`


## Examples

```javascript
// If I leave Esri now, what time will I arrive at the Redlands Bowl?
const apiKey = "<ENTER YOUR API KEY HERE>";
const url = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

const spatialReference = SpatialReference.WebMercator;

const stops = new Collection([
  new Stop({
    name: "Esri",
    geometry: new Point({ x: -13046165, y: 4036335, spatialReference })
  }),
  new Stop({
    name: "Redland Bowl",
    geometry: new Point({ x: -13045111, y: 4036114, spatialReference })
  })
]);

const routeParameters = new RouteParameters({
  apiKey,
  stops,
  startTime: new Date(),
  outSpatialReference: spatialReference,
  returnDirections: true,
  directionsOutputType: "standard" // default value
});

const { routeResults } = await route.solve(url, routeParameters);
const { directions } = routeResults[0];
const directionFeatures = directions.features;

const lastDirectionFeature = directionFeatures[directionFeatures.length - 1];
const arriveTimeEpoch = lastDirectionFeature.attributes["arriveTimeUTC"];
const arriveTimeDate = new Date(arriveTimeEpoch);

console.log(`I will arrive at: ${arriveTimeDate.toLocaleTimeString()}`);
```

