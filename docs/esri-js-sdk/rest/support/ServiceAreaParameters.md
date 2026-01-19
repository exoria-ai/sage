# ServiceAreaParameters

**Module:** `@arcgis/core/rest/support/ServiceAreaParameters`

## Import

```javascript
import ServiceAreaParameters from "@arcgis/core/rest/support/ServiceAreaParameters.js";
```

```javascript
// CDN
const ServiceAreaParameters = await $arcgis.import("@arcgis/core/rest/support/ServiceAreaParameters.js");
```

**Since:** 4.20

## See Also

- serviceArea
- ServiceAreaSolveResult
- Tutorial: Find service areas
- Service area service with synchronous execution
- Network attributes
- accumulateAttributeNames
- API keys
- Display a map tutorial - get an API key
- token
- attributeParameterValues
- defaultBreaks
- facilities
- geometryPrecision
- geometryPrecisionM
- geometryPrecisionZ
- ignoreInvalidLocations
- Network attributes
- impedanceAttributeName
- mergeSimilarPolygonRanges
- outSR
- outputGeometryPrecision
- outputGeometryPrecisionUnits
- outputLines
- outputPolygons
- overlapLines
- overlapPolygons
- overrides
- barriers
- polygonBarriers
- polylineBarriers
- preserveObjectID
- restrictUTurns
- restrictionAttributeNames
- returnFacilities
- returnBarriers
- returnPolygonBarriers
- returnPolylineBarriers
- splitLinesAtBreaks
- splitPolygonsAtBreaks
- timeOfDay
- timeOfDayIsUTC
- travelDirection
- Introduction to travel modes
- Default travel modes
- travelMode
- trimOuterPolygon
- trimPolygonDistance
- trimPolygonDistanceUnits
- useHierarchy

## Property Details

### `ServiceAreaParameters`

### `accumulateAttributes`

### `apiKey`

### `attributeParameterValues`

### `declaredClass`
- **Type:** `Inherited`

### `defaultBreaks`

### `excludeSourcesFromPolygons`

### `facilities`

### `geometryPrecision`

### `geometryPrecisionM`

### `geometryPrecisionZ`

### `ignoreInvalidLocations`

### `impedanceAttribute`

### `mergeSimilarPolygonRanges`

### `outSpatialReference`

### `outputGeometryPrecision`

### `outputGeometryPrecisionUnits`

### `outputLines`

### `outputPolygons`

### `overlapLines`

### `overlapPolygons`

### `overrides`

### `pointBarriers`

### `polygonBarriers`

### `polylineBarriers`

### `preserveObjectID`

### `restrictUTurns`

### `restrictionAttributes`

### `returnFacilities`

### `returnPointBarriers`

### `returnPolygonBarriers`

### `returnPolylineBarriers`

### `splitLinesAtBreaks`

### `splitPolygonsAtBreaks`

### `timeOfDay`

### `timeOfDayIsUTC`

### `travelDirection`

### `travelMode`

### `trimOuterPolygon`

### `trimPolygonDistance`

### `trimPolygonDistanceUnits`

### `useHierarchy`

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
// Compute the service area for a 2km walking distance.
const url = "https://route-api.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World";
const apiKey = "abcdefghijklmnopqrstuvwxyz";
const spatialReference = SpatialReference.WebMercator;

const start = new Graphic({
  geometry: {
    type: "point",
    x: -13039204.060165292,
    y: 4031816.239573444,
    spatialReference
  },
  symbol: {
    type: "simple-marker",
    color: "white",
    size: 8
  }
});

const networkDescription = await fetchServiceDescription(url, apiKey);
const travelMode = networkDescription.supportedTravelModes.find(
  (travelMode) => travelMode.name === "Walking Distance"
);

const serviceAreaParameters = new ServiceAreaParameters({
  apiKey,
  facilities: new FeatureSet({
    features: [start]
  }),
  defaultBreaks: [2.5],
  travelMode,
  travelDirection: "to-facility",
  outSpatialReference: spatialReference,
  trimOuterPolygon: true
});

const results = await solve(url, serviceAreaParameters);
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

