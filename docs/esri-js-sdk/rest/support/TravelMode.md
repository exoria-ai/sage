# TravelMode

**Module:** `@arcgis/core/rest/support/TravelMode`

## Import

```javascript
import TravelMode from "@arcgis/core/rest/support/TravelMode.js";
```

```javascript
// CDN
const TravelMode = await $arcgis.import("@arcgis/core/rest/support/TravelMode.js");
```

**Since:** 4.20

## See Also

- Introduction to travel modes
- Default ArcGIS Online travel modes
- DirectionsViewModel.selectedTravelMode
- ClosestFacilityParameters.travelMode
- RouteParameters.travelMode
- ServiceAreaParameters.travelMode
- networkService.fetchServiceDescription()

## Property Details

### `TravelMode`

### `attributeParameterValues`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `distanceAttributeName`

### `id`

### `impedanceAttributeName`

### `name`

### `restrictionAttributeNames`

### `simplificationTolerance`

### `simplificationToleranceUnits`

### `timeAttributeName`

### `type`

### `useHierarchy`

### `uturnAtJunctions`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// 1. Get the default and supported travel modes of a route service
const apiKey = "<your api key>";
const url = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
const serviceDescription = await fetchServiceDescription(url, apiKey);
const { defaultTravelMode, supportedTravelModes } = serviceDescription;
console.log(`The name of the default travel mode is: ${defaultTravelMode.name}.`);
console.log(`This service has ${supportedTravelModes.length} preset travel modes`);
```

```javascript
// 2. Find and use the "Driving Time" travel mode
const apiKey = "<your api key>";
const url = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
const serviceDescription = await fetchServiceDescription(url, apiKey);
const { supportedTravelModes } = serviceDescription;
const driveTimeTravelMode = supportedTravelModes.find(({ name }) => name === "Driving Time");

// Solve a route using the "Driving Time" travel mode
const routeParameters = {
  stops: stopsFeatureSet, // route stops
  travelMode: driveTimeTravelMode
};
const result = await solve(url, routeParameters);
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

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

