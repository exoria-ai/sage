# TraceLocation

**Module:** `@arcgis/core/rest/networks/support/TraceLocation`

## Import

```javascript
import TraceLocation from "@arcgis/core/rest/networks/support/TraceLocation.js";
```

```javascript
// CDN
const TraceLocation = await $arcgis.import("@arcgis/core/rest/networks/support/TraceLocation.js");
```

**Since:** 4.20

## See Also

- trace
- Terminal

## Property Details

### `TraceLocation`

### `declaredClass`
- **Type:** `Inherited`

### `firstUnit`

### `globalId`

### `isFilterBarrier`

### `networkSourceId`

### `numUnits`

### `percentAlong`

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

When percentAlong is 0.5 (50%) the starting location will be placed on the middle edge (j1-j2)

                                       OID=100
                               F------j1---x--j2------T

When percentAlong is 0.1 (10%) the starting location will be placed on the first edge (F-j1)

                                       OID=100
                               F-x----j1------j2------T
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

