# SlicePlane

**Module:** `@arcgis/core/analysis/SlicePlane`

## Import

```javascript
import SlicePlane from "@arcgis/core/analysis/SlicePlane.js";
```

```javascript
// CDN
const SlicePlane = await $arcgis.import("@arcgis/core/analysis/SlicePlane.js");
```

**Since:** 4.23

## See Also

- SliceAnalysis
- SliceAnalysisView3D
- Slice component
- Sample - Analysis objects

## Property Details

### `SlicePlane`

### `declaredClass`
- **Type:** `Inherited`

### `heading`

### `height`

### `position`

### `tilt`

### `type`

### `width`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
const sliceAnalysis = new SliceAnalysis({
  shape: new SlicePlane({
    position: new Point({ x: -0.1, y: 51.5 }),
    width: 50,
    height: 50,
    tilt: 45
  }),
  tiltEnabled: true
});

view.analyses.add(sliceAnalysis);
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

