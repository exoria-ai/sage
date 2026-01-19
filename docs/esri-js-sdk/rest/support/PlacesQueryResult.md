# PlacesQueryResult

**Module:** `@arcgis/core/rest/support/PlacesQueryResult`

## Import

```javascript
import PlacesQueryResult from "@arcgis/core/rest/support/PlacesQueryResult.js";
```

```javascript
// CDN
const PlacesQueryResult = await $arcgis.import("@arcgis/core/rest/support/PlacesQueryResult.js");
```

**Since:** 4.27

## See Also

- Sample - Find nearby places and details
- Introduction to places
- Places service
- places
- PlacesParameters
- PlacesQueryParameters
- PlaceResult
- PlaceResult

## Property Details

### `PlacesQueryResult`

### `declaredClass`
- **Type:** `Inherited`

### `nextQueryParams`

### `previousQueryParams`

### `results`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const [places, PlacesQueryParameters] = await $arcgis.import([
  "@arcgis/core/rest/places.js",
  "@arcgis/core/rest/support/PlacesQueryParameters.js"
]);
const point = {
  type: "point", // autocasts as new Point()
  longitude: 17.81840,
  latitude: 59.42145
};

const swedishPlacesQueryParameters = new PlacesQueryParameters({
  apiKey: "YOUR_API_KEY",
  categoryIds: ["63be6904847c3692a84b9b4c"], // Bathroom Contractor
  radius: 10000,  // set radius to 10,000 meters
  point
});

function findPlaces() {
  places.queryPlacesNearPoint(swedishPlacesQueryParameters).then(showPlaces);
}

function showPlaces(placesSolveResult) {
  // results from the queryPlacesNearPoint() method
  console.log("PlacesQueryResult: ", placesSolveResult);
}

findPlaces();
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

