# Polygon

**Module:** `@arcgis/core/geometry/Polygon`

## Import

```javascript
import Polygon from "@arcgis/core/geometry/Polygon.js";
```

```javascript
// CDN
const Polygon = await $arcgis.import("@arcgis/core/geometry/Polygon.js");
```

**Since:** 4.0

## See Also

- Sample - Add graphics (MapView)
- Sample - Add graphics (SceneView)

## Property Details

### `Polygon`

### `cache`
- **Type:** `Inherited`

### `centroid`

### `curveRings`

### `declaredClass`
- **Type:** `Inherited`

### `extent`
- **Type:** `Inherited`

### `hasM`
- **Type:** `Inherited`

### `hasZ`
- **Type:** `Inherited`

### `isSelfIntersecting`

### `rings`

### `spatialReference`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `addRing`

### `clone`

### `contains`

### `fromExtent`

### `fromJSON`
- **Type:** `Inherited`

### `getPoint`

### `hasHandles`
- **Type:** `Inherited`

### `insertPoint`

### `isClockwise`

### `removeHandles`
- **Type:** `Inherited`

### `removePoint`

### `removeRing`

### `setPoint`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

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
view.on("click", function(evt) {
  const area = Polygon.fromExtent(view.extent);
  const graphic = new Graphic({
    geometry: area,
    symbol: { type: "simple-fill" }
  });
  view.graphics.add(graphic);
});
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

