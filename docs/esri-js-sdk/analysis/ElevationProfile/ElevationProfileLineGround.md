# ElevationProfileLineGround

**Module:** `@arcgis/core/analysis/ElevationProfile/ElevationProfileLineGround`

## Import

```javascript
import ElevationProfileLineGround from "@arcgis/core/analysis/ElevationProfile/ElevationProfileLineGround.js";
```

```javascript
// CDN
const ElevationProfileLineGround = await $arcgis.import("@arcgis/core/analysis/ElevationProfile/ElevationProfileLineGround.js");
```

**Since:** 4.34

## See Also

- ElevationProfileAnalysis

## Property Details

### `ElevationProfileLineGround`

### `chartOptions`
- **Type:** `Inherited`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `enabled`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

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
// Create an elevation profile analysis with a ground profile line
const analysis = new ElevationProfileAnalysis({
  profiles: [{
    type: "ground",
    title: "World elevation" // Optional custom label
  }]
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

