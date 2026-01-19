# Circle

**Module:** `@arcgis/core/geometry/Circle`

## Import

```javascript
import Circle from "@arcgis/core/geometry/Circle.js";
```

```javascript
// CDN
const Circle = await $arcgis.import("@arcgis/core/geometry/Circle.js");
```

**Since:** 4.0

## See Also

- Polygon

## Property Details

### `Circle`

### `cache`
- **Type:** `Inherited`

### `center`

### `centroid`
- **Type:** `Inherited`

### `curveRings`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `extent`
- **Type:** `Inherited`

### `geodesic`

### `hasM`
- **Type:** `Inherited`

### `hasZ`
- **Type:** `Inherited`

### `isSelfIntersecting`
- **Type:** `Inherited`

### `numberOfPoints`

### `radius`

### `radiusUnit`

### `rings`
- **Type:** `Inherited`

### `spatialReference`
- **Type:** `Inherited`

### `type`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `addRing`
- **Type:** `Inherited`

### `clone`

### `contains`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `getPoint`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `insertPoint`
- **Type:** `Inherited`

### `isClockwise`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `removePoint`
- **Type:** `Inherited`

### `removeRing`
- **Type:** `Inherited`

### `setPoint`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Add a red circle to the map centered at -113°E, 36°N with a radius of 100 kilometers.
const circle = new Circle({
  center: [-113, 36],
  geodesic: true,
  numberOfPoints: 100,
  radius: 100,
  radiusUnit: "kilometers"
});

view.graphics.add(new Graphic({
  geometry: circle,
  symbol: {
    type: "simple-fill",
    style: "none",
    outline: {
      width: 3,
      color: "red"
    }
  }
}));
```

```javascript
// Polygon with a circular arc segment represented with a curve object.
const curvedPolygon = new Polygon({
  curveRings: [
    [
      [-14008897.772168774,4219321.966491825],
      {
        c: [
          [-13922799.120303603,4218343.568797498],
          [-13964136.273597848,4258702.324397415]
        ]
      },
      [-13922799.120303603,4218343.568797498],
      [-13923532.913909001,4170157.6736310786],
      [-14010365.378040956,4170402.2683893144],
      [-14008897.772168774,4219321.966491825]
    ]
  ],
  spatialReference: { wkid: 102100 }
});
```

```javascript
//3D polygon rings with m-values (note that the second ring does not have m-values defined for it)
const rings = [
  [  // first ring
    [-97.06138,32.837,35.1,4.8],
    [-97.06133,32.836,35.2,4.1],
    [-97.06124,32.834,35.3,4.2],
    [-97.06138,32.837,35.1,4.8]  // same as first vertex
  ], [  // second ring
    [-97.06326,32.759,35.4],
    [-97.06298,32.755,35.5],
    [-97.06153,32.749,35.6],
    [-97.06326,32.759,35.4]  // same as first vertex
 ]
];

const polygon = new Polygon({
  hasZ: true,
  hasM: true,
  rings: rings,
  spatialReference: { wkid: 4326 }
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

