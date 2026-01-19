# Viewshed

**Module:** `@arcgis/core/analysis/Viewshed`

## Import

```javascript
import Viewshed from "@arcgis/core/analysis/Viewshed.js";
```

```javascript
// CDN
const Viewshed = await $arcgis.import("@arcgis/core/analysis/Viewshed.js");
```

**Since:** 4.30

## See Also

- ViewshedLayer
- ViewshedAnalysis
- Sample - Interactive viewshed analysis
- Sample - ViewshedLayer in slides
- Sample - Analysis objects
- 3D viewshed overview

## Property Details

### `Viewshed`

### `declaredClass`
- **Type:** `Inherited`

### `farDistance`

### `feature`

### `heading`

### `horizontalFieldOfView`

### `observer`

### `tilt`

### `valid`

### `verticalFieldOfView`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `ViewshedFeatureReference`


## Method Details

### `Method Details()`


## Examples

```javascript
const viewshed = new Viewshed({
   observer: new Point({
     spatialReference: {
       latestWkid: 3857,
       wkid: 102100
     },
     x: -9754426,
     y: 5143111,
     z: 330
   }),
   farDistance: 900,
   heading: 64,
   tilt: 84,
   horizontalFieldOfView: 85,
   verticalFieldOfView: 52
 });
 const viewshedAnalysis = new ViewshedAnalysis({
   viewsheds: [viewshed],
 });

 view.analyses.add(viewshedAnalysis);
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

