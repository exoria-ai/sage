# places

**Module:** `@arcgis/core/rest/places`

## Import

```javascript
import * as places from "@arcgis/core/rest/places.js";
```

```javascript
// CDN
const places = await $arcgis.import("@arcgis/core/rest/places.js");
```

**Since:** 4.27

## Overview

Note: Effective February 20, 2025, Esri made changes to our global places data. As a result, the Places service will have new category IDs. Old category IDs will remain functional until March 22, 2025. We encourage you to transition to the new category IDs as soon as possible. For more information, see the Places category finder. Find places within a search distance of a geographic point or within an extent, or find more information about specific places. Places, also known as points of interest (POIs), are businesses and geographic locations that one can discover around the world. Places also contain attributes such as name, category, street address, contact information, and more. With the places service one can build powerful applications to help people discover, locate, and learn more about places around them. The places service can search for businesses, points of interest (POI), and popular geographic features near a location or within a bounding box. This service is currently only available if you have an ArcGIS Location Platform account. To start, one should identify one or more place categories for the types of places of interest. Categories are used to help filter search results so only the places of interest are returned. All categories have a name and a unique ID. To help find the appropriate category and ID, one can use the places category finder tool. Once categories have been chosen, use the queryPlacesNearPoint() or queryPlacesWithinExtent() method. To filter and return the best results, provide a list of categories and/or keywords when you search. When places are returned, they contain attributes such as name, placeId, location, and categories.

## See Also

- Sample - Find nearby places and details
- Introduction to places
- Places category finder
- Places service
- FetchPlaceParameters
- PlacesParameters
- PlacesQueryParameters
- PlaceResult
- PlacesQueryResult
- FetchPlaceParameters
- PlacesQueryParameters
- PlacesQueryResult
- PlacesQueryParameters
- PlacesQueryResult

## Property Details

### `fetchPlace`

### `queryPlacesNearPoint`

### `queryPlacesWithinExtent`


## Method Details

### `Method Details()`


## Examples

```javascript
const [places, FetchPlaceParameters] = await $arcgis.import(
 "@arcgis/core/rest/places.js",
 "@arcgis/core/rest/support/FetchPlaceParameters.js"
]);
const swedishFetchPlaceParameters = new FetchPlaceParameters({
  apiKey: "YOUR_API_KEY",
  placeId: "571624acd79b8a99897357a25b744a20",  // really good plumber
  requestedFields: ["address", "socialMedia"]
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
const [places, PlacesQueryParameters] = await $arcgis.import(
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
  // first PlaceResult object from PlacesQueryResult.results
  console.log("PlaceResult: ", placesSolveResult.results[0]);
}

findPlaces();
```

```javascript
const [places, PlacesQueryParameters, Extent, SpatialReference] = await $arcgis.import(
  "@arcgis/core/rest/places.js",
  "@arcgis/core/rest/support/PlacesQueryParameters.js",
  "@arcgis/core/geometry/Extent.js",
  "@arcgis/core/geometry/SpatialReference.js"
]);
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
  extent
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

