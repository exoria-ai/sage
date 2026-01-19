# ElevationProfileLineScene

**Module:** `@arcgis/core/analysis/ElevationProfile/ElevationProfileLineScene`

## Import

```javascript
import ElevationProfileLineScene from "@arcgis/core/analysis/ElevationProfile/ElevationProfileLineScene.js";
```

```javascript
// CDN
const ElevationProfileLineScene = await $arcgis.import("@arcgis/core/analysis/ElevationProfile/ElevationProfileLineScene.js");
```

**Since:** 4.34

## Property Details

### `ElevationProfileLineScene`

### `chartOptions`
- **Type:** `Inherited`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `enabled`
- **Type:** `Inherited`

### `exclude`

### `id`
- **Type:** `Inherited`

### `include`

### `title`
- **Type:** `Inherited`

### `type`

### `viewOptions`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `clone`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create an elevation profile analysis with a scene profile line
const analysis = new ElevationProfileAnalysis({
  profiles: [{
   type: "scene",
   exclude: [view.map.ground], // Exclude ground from elevation sampling
  }],
});
```

```javascript
const analysis = new ElevationProfileAnalysis({
  profiles: [{
    type: "scene",
    exclude: [view.map.ground], // Exclude ground from elevation samplingif this profile line
  }],
});
```

```javascript
const analysis = new ElevationProfileAnalysis({
  profiles: [{
    type: "scene",

    // Only graphics from myGraphicsLayer will be used for elevation sampling of this profile line
    include: [myGraphicsLayer],
  }],
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

