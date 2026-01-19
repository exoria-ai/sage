# ClosestFacilityParameters

**Module:** `@arcgis/core/rest/support/ClosestFacilityParameters`

## Import

```javascript
import ClosestFacilityParameters from "@arcgis/core/rest/support/ClosestFacilityParameters.js";
```

```javascript
// CDN
const ClosestFacilityParameters = await $arcgis.import("@arcgis/core/rest/support/ClosestFacilityParameters.js");
```

**Since:** 4.20

## See Also

- closestFacility
- ClosestFacilitySolveResult
- Closest Facility service with synchronous execution
- Network attributes
- accumulateAttributeNames
- API keys
- Display a map tutorial - get an API key
- token
- attributeParameterValues
- defaultCutoff
- defaultTargetFacilityCount
- directionsLanguage
- directionsLengthUnits
- directionsOutputType
- directionsStyleName
- directionsTimeAttributeName
- facilities
- geometryPrecision
- geometryPrecisionM
- geometryPrecisionZ
- ignoreInvalidLocations
- Network attributes
- impedanceAttributeName
- incidents
- outSR
- outputGeometryPrecision
- outputGeometryPrecisionUnits
- outputLines
- overrides
- barriers
- polygonBarriers
- polylineBarriers
- preserveObjectID
- restrictUTurns
- restrictionAttributeNames
- returnDirections
- returnFacilities
- returnIncidents
- returnBarriers
- returnPolygonBarriers
- returnPolylineBarriers
- returnCFRoutes
- returnTraversedEdges
- returnTraversedJunctions
- returnTraversedTurns
- returnZ
- timeOfDay
- timeOfDayIsUTC
- timeOfDayUsage
- travelDirection
- Introduction to travel modes
- Default travel modes
- travelMode
- useHierarchy

## Property Details

### `ClosestFacilityParameters`

### `accumulateAttributes`

### `apiKey`

### `attributeParameterValues`

### `declaredClass`
- **Type:** `Inherited`

### `defaultCutoff`

### `defaultTargetFacilityCount`

### `directionsLanguage`

### `directionsLengthUnits`

### `directionsOutputType`

### `directionsStyleName`

### `directionsTimeAttribute`

### `facilities`

### `geometryPrecision`

### `geometryPrecisionM`

### `geometryPrecisionZ`

### `ignoreInvalidLocations`

### `impedanceAttribute`

### `incidents`

### `outSpatialReference`

### `outputGeometryPrecision`

### `outputGeometryPrecisionUnits`

### `outputLines`

### `overrides`

### `pointBarriers`

### `polygonBarriers`

### `polylineBarriers`

### `preserveObjectID`

### `restrictUTurns`

### `restrictionAttributes`

### `returnDirections`

### `returnFacilities`

### `returnIncidents`

### `returnPointBarriers`

### `returnPolygonBarriers`

### `returnPolylineBarriers`

### `returnRoutes`

### `returnTraversedEdges`

### `returnTraversedJunctions`

### `returnTraversedTurns`

### `returnZ`

### `timeOfDay`

### `timeOfDayIsUTC`

### `timeOfDayUsage`

### `travelDirection`

### `travelMode`

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
const start = new Graphic({
  geometry: {
    type: "point",
    x: -13656212.041436872,
    y: 5703897.952531632,
    spatialReference
  }
});

const stores = [
  [-122.67484, 45.52087],
  [-122.68365, 45.52327],
  [-122.66406, 45.52378]
];

const storeGraphics = stores.map(
  (store) =>
    new Graphic({
      geometry: {
        type: "point",
        longitude: store[0],
        latitude: store[1],
        spatialReference
      }
    })
);

const closestFacilityParameters = new ClosestFacilityParameters({
  apiKey: "YOUR_API_KEY",
  incidents: new FeatureSet({
    features: [start]
  }),
  facilities: new FeatureSet({
    features: storeGraphics
  }),
  defaultTargetFacilityCount: 2
});

const results = await solve(url, closestFacilityParameters);
```

```javascript
const closestFacilityParameters = new ClosestFacilityParameters({
  facilities: new FeatureSet({
    features: [
      new Graphic({
        geometry: new Point({ x: -122.4079, 37.78356 }),
        attributes: {
          "Name": "Fire Station 34",
          "Attr_TravelTime": 4
        }
      }),
      new Graphic({
        geometry: new Point({ x: -122.404, 37.782 }),
        attributes: {
          "Name": "Fire Station 29",
          "Attr_TravelTime": 5
        }
      })
    ]
  })
});
```

```javascript
const closestFacilityParameters = new ClosestFacilityParameters({
  incidents: new FeatureSet({
    features: [
      new Graphic({
        geometry: new Point({ x: -122.4079, 37.78356 }),
        attributes: {
          "Name": "Fire Incident 1",
          "Attr_TravelTime": 4
        }
      }),
      new Graphic({
        geometry: new Point({ x: -122.404, 37.782 }),
        attributes: {
          "Name": "Crime Incident 45",
          "Attr_TravelTime": 5
        }
      })
    ]
  })
});
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

