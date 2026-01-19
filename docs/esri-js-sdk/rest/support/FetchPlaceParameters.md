# FetchPlaceParameters

**Module:** `@arcgis/core/rest/support/FetchPlaceParameters`

## Import

```javascript
import FetchPlaceParameters from "@arcgis/core/rest/support/FetchPlaceParameters.js";
```

```javascript
// CDN
const FetchPlaceParameters = await $arcgis.import("@arcgis/core/rest/support/FetchPlaceParameters.js");
```

**Since:** 4.27

## See Also

- Sample - Find nearby places and details
- Introduction to places
- Places category finder
- Places service
- places
- PlacesParameters
- PlacesQueryParameters
- API keys
- Enumerated values

## Property Details

### `FetchPlaceParameters`

### `apiKey`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `icon`
- **Type:** `Inherited`

### `placeId`

### `requestedFields`

### `url`
- **Type:** `Inherited`

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
const [places, FetchPlaceParameters] = await $arcgis.import([
 "@arcgis/core/rest/places.js",
 "@arcgis/core/rest/support/FetchPlaceParameters.js"
]);
const swedishFetchPlaceParameters = new FetchPlaceParameters({
  apiKey: "YOUR_API_KEY",
  placeId: "571624acd79b8a99897357a25b744a20",  // really good plumber
  requestedFields: ["address", "description", "hours", "socialMedia"]
});

function fetchPlaceDetails() {
  places.fetchPlace(swedishFetchPlaceParameters).then(showPlaceDetails);
}

function showPlaceDetails(fetchResult) {
  console.log("Fetch place result: ", fetchResult);
}

fetchPlaceDetails();
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

