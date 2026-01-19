# LastMileDeliveryParameters

**Module:** `@arcgis/core/rest/support/LastMileDeliveryParameters`

## Import

```javascript
import LastMileDeliveryParameters from "@arcgis/core/rest/support/LastMileDeliveryParameters.js";
```

```javascript
// CDN
const LastMileDeliveryParameters = await $arcgis.import("@arcgis/core/rest/support/LastMileDeliveryParameters.js");
```

**Since:** 4.34

## See Also

- lastMileDelivery
- Parameters: analysisRegion
- API keys
- Display a map tutorial - get an API key
- token
- Parameters: depots
- Parameters: directions_language
- Parameters: distance_units
- Parameters: earliest_route_start_date
- Parameters: route
- Parameters: earliest_route_start_time
- Parameters: ignore_invalid_order_locations
- Parameters: line_barriers
- Parameters: max_route_total_time
- Parameters: order_specialties
- Parameters: orders
- Parameters: point_barriers
- Parameters: polygon_barriers
- Parameters: populate_directions
- Parameters: route_shape
- Parameters: route_specialties
- Parameters: routes
- Parameters: sequence_gap
- Parameters: time_units
- Parameters: time_zone_usage_for_time_fields
- Introduction to travel modes
- Default travel modes
- Parameters: travel_mode
- Parameters: zones

## Property Details

### `LastMileDeliveryParameters`

### `analysisRegion`

### `apiKey`

### `declaredClass`
- **Type:** `Inherited`

### `depots`

### `directionsLanguage`

### `distanceUnits`

### `earliestRouteStartDate`

### `earliestRouteStartTime`

### `ignoreInvalidOrderLocations`

### `lineBarriers`

### `maximumRouteDuration`

### `orderSpecialties`

### `orders`

### `pointBarriers`

### `polygonBarriers`

### `populateDirections`

### `routeShape`

### `routeSpecialties`

### `routes`

### `sequenceGap`

### `timeUnits`

### `timeZoneUsage`

### `travelMode`

### `zones`

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

