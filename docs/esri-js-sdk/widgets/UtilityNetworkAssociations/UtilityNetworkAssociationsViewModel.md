# UtilityNetworkAssociationsViewModel

**Module:** `@arcgis/core/widgets/UtilityNetworkAssociations/UtilityNetworkAssociationsViewModel`

## Import

```javascript
import UtilityNetworkAssociationsViewModel from "@arcgis/core/widgets/UtilityNetworkAssociations/UtilityNetworkAssociationsViewModel.js";
```

```javascript
// CDN
const UtilityNetworkAssociationsViewModel = await $arcgis.import("@arcgis/core/widgets/UtilityNetworkAssociations/UtilityNetworkAssociationsViewModel.js");
```

**Since:** 4.26

## See Also

- UtilityNetworkAssociations
- Utility Network Associations component
- UtilityNetwork
- Programming patterns: Widget viewModel pattern

## Property Details

### `UtilityNetworkAssociationsViewModel`

### `connectivityAssociationsLineSymbol`

### `declaredClass`
- **Type:** `Inherited`

### `includeConnectivityAssociations`

### `includeStructuralAttachmentAssociations`

### `maxAllowableAssociations`

### `showArrowsConnectivity`

### `showArrowsStructuralAttachment`

### `state`

### `structuralAttachmentAssociationsLineSymbol`

### `utilityNetwork`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeAssociations`

### `removeHandles`
- **Type:** `Inherited`

### `showAssociations`


## Method Details

### `Method Details()`


## Examples

```javascript
{
  type: "simple-line",
  color: [190, 159, 159, 1],
  style: "short-dash",
  width: 2
}
```

```javascript
{
  type: "simple-line",
  color: [159, 190, 159, 1],
  style: "short-dash",
  width: 2
}
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

