# PlaceResult

**Module:** `@arcgis/core/rest/support/PlaceResult`

## Import

```javascript
import PlaceResult from "@arcgis/core/rest/support/PlaceResult.js";
```

```javascript
// CDN
const PlaceResult = await $arcgis.import("@arcgis/core/rest/support/PlaceResult.js");
```

**Since:** 4.27

## See Also

- Sample - Find nearby places and details
- Introduction to places
- Places service
- places
- PlacesParameters
- PlacesQueryParameters
- PlacesQueryResult
- categories
- Places category finder
- PlacesParameters.icon
- Point
- places/{placeId}

## Property Details

### `PlaceResult`

### `categories`

### `declaredClass`
- **Type:** `Inherited`

### `distance`

### `icon`

### `location`

### `name`

### `placeId`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `Category`


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

