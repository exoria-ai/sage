# Polyline

**Module:** `@arcgis/core/geometry/Polyline`

## Import

```javascript
import Polyline from "@arcgis/core/geometry/Polyline.js";
```

```javascript
// CDN
const Polyline = await $arcgis.import("@arcgis/core/geometry/Polyline.js");
```

**Since:** 4.0

## See Also

- Sample - Add graphics (MapView)
- Sample - Add graphics (SceneView)

## Property Details

### `Polyline`

### `cache`
- **Type:** `Inherited`

### `curvePaths`

### `declaredClass`
- **Type:** `Inherited`

### `extent`
- **Type:** `Inherited`

### `hasM`
- **Type:** `Inherited`

### `hasZ`
- **Type:** `Inherited`

### `paths`

### `spatialReference`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `addPath`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `getPoint`

### `hasHandles`
- **Type:** `Inherited`

### `insertPoint`

### `removeHandles`
- **Type:** `Inherited`

### `removePath`

### `removePoint`

### `setPoint`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Polyline with two circular arc segments represented with curve objects.
const curvedLine = new Polyline({
  curvePaths: [
    [
      [-13950813.6947, 4028697.5532],
      [-13878602.7757, 4026346.5],
      {
        c: [
          [-13854084.6497, 4009553.2631],
          [-13841976.9737328, 4053525.320625]
        ]
      },
      {
        c: [
          [-13851733.5965, 4069673.0515],
          [-13791446.6027123, 4037209.59502735]
        ]
      }
    ]
  ],
  spatialReference: { wkid: 102100 }
});
```

```javascript
// 2D polyline with to paths with m-values (note that the 2nd path does not have m-values defined)
let paths = [
 [  // first path
  [-97.06138,32.837,5],
  [-97.06133,32.836,6],
  [-97.06124,32.834,7]
 ], [  // second path
  [-97.06326,32.759],
  [-97.06298,32.755]
 ]
];

let line = new Polyline({
  hasZ: false,
  hasM: true,
  paths: paths,
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

