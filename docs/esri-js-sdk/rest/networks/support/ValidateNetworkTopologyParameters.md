# ValidateNetworkTopologyParameters

**Module:** `@arcgis/core/rest/networks/support/ValidateNetworkTopologyParameters`

## Import

```javascript
import ValidateNetworkTopologyParameters from "@arcgis/core/rest/networks/support/ValidateNetworkTopologyParameters.js";
```

```javascript
// CDN
const ValidateNetworkTopologyParameters = await $arcgis.import("@arcgis/core/rest/networks/support/ValidateNetworkTopologyParameters.js");
```

**Since:** 4.26

## See Also

- UtilityNetwork
- Network
- ArcGIS Pro: Validate a network topology
- ArcGIS Pro: Network topology

## Property Details

### `ValidateNetworkTopologyParameters`

### `declaredClass`
- **Type:** `Inherited`

### `gdbVersion`

### `outSpatialReference`

### `sessionID`

### `validateArea`

### `validationSet`

### `validationType`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `ValidationSetItemJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
const validationResult = await network.submitTopologyValidationJob(
  new ValidateNetworkTopologyParameters({
    validateArea: extent,
    gdbVersion: "sde.DEFAULT",
    validationType: "rebuild",
    sessionID: "{7865BAA6-ED9C-4346-9F72-894A49E10C73}",
    validationSet: [
      {
        sourceId: 4134325151,
        globalIds: ["{7865BAA6-ED9C-4346-9F72-894A49E10C73}"]
      }
    ]
  })
);

console.log("result: ", validationResult);
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

```javascript
const validationResult = await network.submitTopologyValidationJob(
  new ValidateNetworkTopologyParameters({
    validateArea: extent,
    gdbVersion: "sde.DEFAULT",
    validationType: "rebuild",
    sessionID: "{7865BAA6-ED9C-4346-9F72-894A49E10C73}",
    validationSet: [
      {
        sourceId: 4134325151,
        globalIds: ["{7865BAA6-ED9C-4346-9F72-894A49E10C73}"]
      }
    ]
  })
);

console.log("result: ", validationResult);
```

