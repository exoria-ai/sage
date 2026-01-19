# DirectionsFeatureSet

**Module:** `@arcgis/core/rest/support/DirectionsFeatureSet`

## Import

```javascript
import DirectionsFeatureSet from "@arcgis/core/rest/support/DirectionsFeatureSet.js";
```

```javascript
// CDN
const DirectionsFeatureSet = await $arcgis.import("@arcgis/core/rest/support/DirectionsFeatureSet.js");
```

**Since:** 4.20

## See Also

- route
- RouteResult.directions
- Query.returnQueryGeometry
- RouteParameters.directionsLengthUnits
- RouteParameters.directionsTimeAttribute

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `displayFieldName`
- **Type:** `Inherited`

### `exceededTransferLimit`
- **Type:** `Inherited`

### `extent`

### `features`

### `fields`
- **Type:** `Inherited`

### `geometryType`

### `mergedGeometry`

### `queryGeometry`
- **Type:** `Inherited`

### `routeId`

### `routeName`

### `spatialReference`
- **Type:** `Inherited`

### `strings`

### `totalDriveTime`

### `totalLength`

### `totalTime`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`

### `DirectionsString`


## Method Details

### `Method Details()`


## Examples

```javascript
// Get the drive time between Esri and the Redlands Bowl
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
  outSpatialReference: spatialReference,
  returnDirections: true,
  directionsOutputType: "standard" // default value
});

const { routeResults } = await route.solve(url, routeParameters);
const { directions } = routeResults[0];
console.log(`The total drive time is: ${directions.totalTime}`);
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

