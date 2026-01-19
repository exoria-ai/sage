# UtilityNetworkTraceAnalysisViewModel

**Module:** `@arcgis/core/widgets/UtilityNetworkTraceAnalysis/UtilityNetworkTraceAnalysisViewModel`

## Import

```javascript
import UtilityNetworkTraceAnalysisViewModel from "@arcgis/core/widgets/UtilityNetworkTraceAnalysis/UtilityNetworkTraceAnalysisViewModel.js";
```

```javascript
// CDN
const UtilityNetworkTraceAnalysisViewModel = await $arcgis.import("@arcgis/core/widgets/UtilityNetworkTraceAnalysis/UtilityNetworkTraceAnalysisViewModel.js");
```

**Since:** 4.32

## See Also

- UtilityNetwork

## Property Details

### `UtilityNetworkTraceAnalysisViewModel`

### `declaredClass`
- **Type:** `Inherited`

### `executionError`

### `loadError`

### `state`

### `utilityNetwork`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `executeNamedTraceConfiguration`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `NamedTraceConfigurationParameters`


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
const traceLocations = [
 {
     type: "starting-point",
     globalId: "{699C9FDB-3B39-46DC-90D2-13553F3C6694}",
     percentAlong: 0.05,
 },
 {
     type: "barrier",
     globalId: "{8E99EB07-3BA0-4D7D-A1C0-4D69F5487470}",
     percentAlong: 0.7
 },
];
const traceResult = await traceAnalysisViewModel.executeNamedTraceConfiguration({
    namedTraceConfigurationGlobalId: "{E43E4D2C-E191-4547-AFB8-392860694392}",
    traceLocations: traceLocations
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

