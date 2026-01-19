# DirectionsEvent

**Module:** `@arcgis/core/rest/support/DirectionsEvent`

## Import

```javascript
import DirectionsEvent from "@arcgis/core/rest/support/DirectionsEvent.js";
```

```javascript
// CDN
const DirectionsEvent = await $arcgis.import("@arcgis/core/rest/support/DirectionsEvent.js");
```

**Since:** 4.25

## See Also

- DirectionsFeature.events
- DirectionsFeatureSet

## Property Details

### `arriveTime`

### `arriveTimeOffset`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `strings`

### `addHandles`
- **Type:** `Inherited`

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

