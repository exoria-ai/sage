# Association

**Module:** `@arcgis/core/rest/networks/support/Association`

## Import

```javascript
import Association from "@arcgis/core/rest/networks/support/Association.js";
```

```javascript
// CDN
const Association = await $arcgis.import("@arcgis/core/rest/networks/support/Association.js");
```

**Since:** 4.25

## See Also

- QueryAssociationsResult
- queryAssociations
- QueryAssociationsParameters
- ArcGIS Pro: Association status attribute

## Property Details

### `Association`

### `associationType`

### `declaredClass`
- **Type:** `Inherited`

### `errorCode`

### `errorMessage`

### `fromNetworkElement`

### `geometry`

### `globalId`

### `isContentVisible`

### `percentAlong`

### `status`

### `toNetworkElement`

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
// Define the QueryAssociationsParameters
const queryAssociationsParameters = new QueryAssociationsParameters({
  types: ["containment", "attachment", "junction-edge-from-connectivity"],
  elements: [
    {
      networkSourceId: 2,
      globalId: "{46B3FA19-2237-4D38-A7CF-AA34C3T40420}",
      objectId: 44,
      terminalId: 1,
      assetGroupCode: 1,
      assetTypeCode: 1
    },
    {
      networkSourceId: 9,
      globalId: "{321C0089-1165-42D9-K45B-ED91B1A40500}",
      objectId: 45,
      terminalId: 1,
      assetGroupCode: 13,
      assetTypeCode: 441
    }
 ]
});

// Query associations, and assign the query result to a variable `associations`
const associations = await queryAssociations(networkServiceUrl, queryAssociationsParameters);

// Print out the first association
console.log(associations[0]);
```

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

