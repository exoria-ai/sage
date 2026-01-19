# RouteParameters

**Module:** `@arcgis/core/rest/support/RouteParameters`

## Import

```javascript
import RouteParameters from "@arcgis/core/rest/support/RouteParameters.js";
```

```javascript
// CDN
const RouteParameters = await $arcgis.import("@arcgis/core/rest/support/RouteParameters.js");
```

**Since:** 4.20

## See Also

- route
- RouteResult
- Find routes and directions
- Network attributes
- accumulateAttributeNames
- API keys
- Display a map tutorial - get an access token
- attributeParameterValues
- directionsLanguage
- directionsLengthUnits
- directionsOutputType
- directionsStyleName
- directionsTimeAttributeName
- findBestSequence
- geometryPrecision
- geometryPrecisionM
- geometryPrecisionZ
- ignoreInvalidLocations
- impedanceAttributeName
- outSR
- outputGeometryPrecision
- outputGeometryPrecisionUnits
- outputLines
- overrides
- barriers
- polygonBarriers
- polylineBarriers
- preserveFirstStop
- preserveLastStop
- preserveObjectID
- restrictUTurns
- restrictionAttributeNames
- returnBarriers
- returnDirections
- returnPolygonBarriers
- returnPolylineBarriers
- returnRoutes
- returnStops
- returnTraversedEdges
- returnTraversedJunctions
- returnTraversedTurns
- returnZ
- startTime
- ServiceDescription
- startTimeIsUTC
- stops
- timeWindowsAreUTC
- Introduction to travel modes
- Default travel modes
- travelMode
- useHierarchy
- useTimeWindows

## Property Details

### `RouteParameters`

### `accumulateAttributes`

### `apiKey`

### `attributeParameterValues`

### `declaredClass`
- **Type:** `Inherited`

### `directionsLanguage`

### `directionsLengthUnits`

### `directionsOutputType`

### `directionsStyleName`

### `directionsTimeAttribute`

### `findBestSequence`

### `geometryPrecision`

### `geometryPrecisionM`

### `geometryPrecisionZ`

### `ignoreInvalidLocations`

### `impedanceAttribute`

### `outSpatialReference`

### `outputGeometryPrecision`

### `outputGeometryPrecisionUnits`

### `outputLines`

### `overrides`

### `pointBarriers`

### `polygonBarriers`

### `polylineBarriers`

### `preserveFirstStop`

### `preserveLastStop`

### `preserveObjectID`

### `restrictUTurns`

### `restrictionAttributes`

### `returnBarriers`

### `returnDirections`

### `returnPolygonBarriers`

### `returnPolylineBarriers`

### `returnRoutes`

### `returnStops`

### `returnTraversedEdges`

### `returnTraversedJunctions`

### `returnTraversedTurns`

### `returnZ`

### `startTime`

### `startTimeIsUTC`

### `stops`

### `timeWindowsAreUTC`

### `travelMode`

### `useHierarchy`

### `useTimeWindows`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `AttributeParameterValue`


## Method Details

### `Method Details()`


## Examples

```javascript
const stops = new FeatureSet({
  features: [
    new Graphic({
      geometry: new Point({
        x: -117.1949676,
        y: 34.0571844
      })
    }),
    new Graphic({
      geometry: new Point({
        x: -117.0619917,
        y: 34.0010284
      })
    })
  ]
});

const routeParameters = new RouteParameters({
  apiKey: "YOUR_API_KEY",
  stops
});

const routeURL = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

const routeContainer = await route.solve(routeURL, routeParameters);
const routeLayer = routeContainer.routeResults[0].route;

const { attributes, geometry } = routeLayer;
view.graphics.add(new Graphic({
  attributes,
  geometry,
  symbol: {
    type: "simple-line",
    color: "green",
    width: "8px"
  }
}));
```

```javascript
// Define stops using a FeatureSet.
const routeParameters = new RouteParameters({
  stops: new FeatureSet({
      features: [
      new Graphic({
        attributes: { Name: "Redlands" },
        geometry: new Point({ x: -117.1825, y: 34.054722 })
      }),
      new Graphic({
        attributes: { Name: "Palm Springs" },
        geometry: new Point({ x: -116.545278, y: 33.830278 })
      })
    ]
  })
});
```

```javascript
// Define stops using a collection of Stops.
const routeParameters = new RouteParameters({
  stops: new Collection([
    new Stop({ name: "Redlands", geometry: { x: -117.1825, y: 34.054722 }}),
    new Stop({ name: "Palm Springs", geometry: { x: -116.545278, y: 33.830278 }})
  ])
});
```

```javascript
// Display the fastest walking time route between two existing graphics.
const apiKey = "<your-api-key>";
const url = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

// Obtain the routing service's description. The description contains all preset travel modes.
const serviceDescription = await networkService.fetchServiceDescription(url, apiKey);

// Find the named travel mode called "Walking Time".
const { supportedTravelModes } = serviceDescription;
const travelMode = supportedTravelModes.find((mode) => mode.name === "Walking Time");

// Construct the route parameter object.
const routeParameters = new RouteParameters({
  apiKey,
  stops: new FeatureSet({
    features: view.graphics.toArray()
  }),
  returnDirections: true,
  travelMode
});

// Solve the route and add the path representing the fastest walk path to the map.
const routeContainer = await route.solve(url, routeParameters);
for (const routeResult of routeContainer.routeResults) {
  const { routeLayer } = routeResult;
  routeLayer.symbol = {
    type: "simple-line",
    color: [5, 150, 255],
    width: 3
  };
  view.graphics.add(routeLayer);
}
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

