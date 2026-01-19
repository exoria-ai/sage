# NetworkElement

**Module:** `@arcgis/core/rest/networks/support/NetworkElement`

## Import

```javascript
import NetworkElement from "@arcgis/core/rest/networks/support/NetworkElement.js";
```

```javascript
// CDN
const NetworkElement = await $arcgis.import("@arcgis/core/rest/networks/support/NetworkElement.js");
```

**Since:** 4.20

## See Also

- trace
- Terminal

## Property Details

### `NetworkElement`

### `assetGroupCode`

### `assetTypeCode`

### `declaredClass`
- **Type:** `Inherited`

### `globalId`

### `networkSourceId`

### `objectId`

### `positionFrom`

### `positionTo`

### `terminalId`

### `type`

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

