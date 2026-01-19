# TelecomNetworkElement

**Module:** `@arcgis/core/rest/networks/support/TelecomNetworkElement`

## Import

```javascript
import TelecomNetworkElement from "@arcgis/core/rest/networks/support/TelecomNetworkElement.js";
```

```javascript
// CDN
const TelecomNetworkElement = await $arcgis.import("@arcgis/core/rest/networks/support/TelecomNetworkElement.js");
```

**Since:** 4.34

## See Also

- Terminal

## Property Details

### `TelecomNetworkElement`

### `assetGroupCode`
- **Type:** `Inherited`

### `assetTypeCode`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `firstUnit`

### `globalId`
- **Type:** `Inherited`

### `networkSourceId`
- **Type:** `Inherited`

### `numUnits`

### `objectId`
- **Type:** `Inherited`

### `positionFrom`
- **Type:** `Inherited`

### `positionTo`
- **Type:** `Inherited`

### `terminalId`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
Line feature with objectId 100 with 2 midspan junctions (j1,j2). The line feature has 3 edge network elements
F-j1, j1-j2 and j2-T.

                                       OID=100
                               F------j1------j2------T

F-j1  (objectId=100, positionFrom=0, positionTo=0.33)
j1-j2 (objectId=100, positionFrom=0.33, positionTo=0.66)
j2-T  (objectId=100, positionFrom=0.66, positionTo=1)
```

```javascript
Line feature with objectId 100 with 2 midspan junctions (j1,j2). The line feature has 3 edge network elements
F-j1, j1-j2 and j2-T.

                                       OID=100
                               F------j1------j2------T

F-j1  (objectId=100, positionFrom=0, positionTo=0.33)
j1-j2 (objectId=100, positionFrom=0.33, positionTo=0.66)
j2-T  (objectId=100, positionFrom=0.66, positionTo=1)
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

