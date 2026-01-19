# TraceResult

**Module:** `@arcgis/core/rest/networks/support/TraceResult`

## Import

```javascript
import TraceResult from "@arcgis/core/rest/networks/support/TraceResult.js";
```

```javascript
// CDN
const TraceResult = await $arcgis.import("@arcgis/core/rest/networks/support/TraceResult.js");
```

**Since:** 4.20

## See Also

- trace
- NetworkElement
- TelecomNetworkElement

## Property Details

### `TraceResult`

### `aggregatedGeometry`

### `circuits`

### `declaredClass`
- **Type:** `Inherited`

### `elements`

### `globalFunctionResults`

### `kFeaturesForKNNFound`

### `paths`

### `startingPointsIgnored`

### `warnings`

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

