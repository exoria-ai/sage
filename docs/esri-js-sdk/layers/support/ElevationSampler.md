# ElevationSampler

**Module:** `@arcgis/core/layers/support/ElevationSampler`

## Import

```javascript
import ElevationSampler from "@arcgis/core/layers/support/ElevationSampler.js";
```

```javascript
// CDN
const ElevationSampler = await $arcgis.import("@arcgis/core/layers/support/ElevationSampler.js");
```

**Since:** 4.7

## See Also

- ElevationLayer.createElevationSampler()
- Ground.createElevationSampler()
- GroundView.elevationSampler

## Property Details

### `demResolution`

### `extent`

### `noDataValue`

### `spatialReference`

### `elevationAt`

### `emit`

### `hasEventListener`

### `on`

### `queryElevation`


## Method Details

### `Method Details()`


## Examples

```javascript
map.ground.load()
  .then(function() {
    // create an elevation sampler from a given extent
    return view.map.ground.createElevationSampler(extent);
  })
  .then(function(elevationSampler) {
    // use the elevation sampler to get z-values for a point, multipoint or polyline geometry
    let zEnrichedGeometry = elevationSampler.queryElevation(geometry);
  });
```

```javascript
let elevationSampler = view.groundView.elevationSampler;
// listen for elevation changes in the view
elevationSampler.on('changed', function() {
  // enrich geometry with z-values from the elevation displayed in the view
  let zEnrichedGeometry = elevationSampler.queryElevation(point);
});
```

```javascript
view.on("click", function(event){
  // event is the event handle returned after the event fires.
  console.log(event.mapPoint);
});
```

```javascript
view.groundView.elevationSampler.on("changed", function(evt) {
 console.log("elevation has changed");
});
```

