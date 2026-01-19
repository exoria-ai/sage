# PlacesQueryParameters

**Module:** `@arcgis/core/rest/support/PlacesQueryParameters`

## Import

```javascript
import PlacesQueryParameters from "@arcgis/core/rest/support/PlacesQueryParameters.js";
```

```javascript
// CDN
const PlacesQueryParameters = await $arcgis.import("@arcgis/core/rest/support/PlacesQueryParameters.js");
```

**Since:** 4.27

## See Also

- Sample - Find nearby places and details
- Introduction to places
- Places category finder
- Places service
- places
- PlacesParameters
- FetchPlaceParameters
- API keys
- Places category finder
- Extent
- Point

## Property Details

### `PlacesQueryParameters`

### `apiKey`
- **Type:** `Inherited`

### `categoryIds`

### `declaredClass`
- **Type:** `Inherited`

### `extent`

### `icon`
- **Type:** `Inherited`

### `offset`

### `pageSize`

### `point`

### `radius`

### `searchText`

### `url`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const [places, PlacesQueryParameters, Extent] = await $arcgis.import([
 "@arcgis/core/rest/places.js",
 "@arcgis/core/rest/support/PlacesQueryParameters.js",
 "@arcgis/core/geometry/Extent.js"
);
const extent = new Extent({
  xmin: 17.75,
  ymin: 59.55,
  xmax: 18,
  ymax: 59.7,
  spatialReference: SpatialReference.WGS84
});

const swedishPlacesQueryParameters = new PlacesQueryParameters({
  apiKey: "YOUR_API_KEY",
  categoryIds: ["4d4b7105d754a06377d81259"], // Landmarks and Outdoors
  extent,
  offset: 2,
  searchText: "Värma"
});

function findPlaces() {
  places.queryPlacesWithinExtent(swedishPlacesQueryParameters).then(showPlaces);
}

function showPlaces(placesSolveResult) {
  // results from the queryPlacesWithinExtent() method
  console.log("PlacesQueryResult: ", placesSolveResult);
  // first PlaceResult object from PlacesQueryResult.results
  console.log("PlaceResult: ", placesSolveResult.results[0]);
}

findPlaces();
```

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
  point,
  searchText: "Bygg",
  pageSize: 11
});

function findPlaces() {
  places.queryPlacesNearPoint(swedishPlacesQueryParameters).then(showPlaces);
}

function showPlaces(placesSolveResult) {
  // results from the queryPlacesNearPoint() method
  console.log("PlacesQueryResult: ", placesSolveResult);
  // first PlaceResult object from PlacesQueryResult.results
  console.log("PlaceResult: ", placesSolveResult.results[0]);
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

