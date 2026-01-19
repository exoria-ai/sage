# UtilityNetworkValidateTopologyViewModel

**Module:** `@arcgis/core/widgets/UtilityNetworkValidateTopology/UtilityNetworkValidateTopologyViewModel`

## Import

```javascript
import UtilityNetworkValidateTopologyViewModel from "@arcgis/core/widgets/UtilityNetworkValidateTopology/UtilityNetworkValidateTopologyViewModel.js";
```

```javascript
// CDN
const UtilityNetworkValidateTopologyViewModel = await $arcgis.import("@arcgis/core/widgets/UtilityNetworkValidateTopology/UtilityNetworkValidateTopologyViewModel.js");
```

**Since:** 4.27

## See Also

- UtilityNetwork
- UtilityNetworkValidateTopology
- Utility Network Validate Topology component
- UtilityNetwork

## Property Details

### `UtilityNetworkValidateTopologyViewModel`

### `declaredClass`
- **Type:** `Inherited`

### `executionError`

### `extentToValidate`

### `loadErrors`

### `state`

### `utilityNetwork`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `validateTopology`


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

