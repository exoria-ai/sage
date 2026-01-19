# TelemetryData

**Module:** `@arcgis/core/layers/support/TelemetryData`

## Import

```javascript
import TelemetryData from "@arcgis/core/layers/support/TelemetryData.js";
```

```javascript
// CDN
const TelemetryData = await $arcgis.import("@arcgis/core/layers/support/TelemetryData.js");
```

**Since:** 4.30

## See Also

- VideoLayer.telemetry

## Property Details

### `TelemetryData`

### `declaredClass`
- **Type:** `Inherited`

### `frameCenter`

### `frameOutline`

### `lineOfSight`

### `sensorLocation`

### `sensorTrail`

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

