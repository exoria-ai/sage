# ElevationProfileLineInput

**Module:** `@arcgis/core/analysis/ElevationProfile/ElevationProfileLineInput`

## Import

```javascript
import ElevationProfileLineInput from "@arcgis/core/analysis/ElevationProfile/ElevationProfileLineInput.js";
```

```javascript
// CDN
const ElevationProfileLineInput = await $arcgis.import("@arcgis/core/analysis/ElevationProfile/ElevationProfileLineInput.js");
```

**Since:** 4.34

## See Also

- ElevationProfileAnalysis

## Property Details

### `ElevationProfileLineInput`

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
const analysis = new ElevationProfileAnalysis({
  geometry: new Polyline({ }), // The input line with z values
  profiles: [
    { type: "input", color: "orange" },
  ]
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

