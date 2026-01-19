# QueryAssociationsParameters

**Module:** `@arcgis/core/rest/networks/support/QueryAssociationsParameters`

## Import

```javascript
import QueryAssociationsParameters from "@arcgis/core/rest/networks/support/QueryAssociationsParameters.js";
```

```javascript
// CDN
const QueryAssociationsParameters = await $arcgis.import("@arcgis/core/rest/networks/support/QueryAssociationsParameters.js");
```

**Since:** 4.24

## See Also

- Association
- QueryAssociationsResult
- queryAssociations
- Learn more about branch versioning
- ArcGIS Pro: Connectivity associations

## Property Details

### `QueryAssociationsParameters`

### `declaredClass`
- **Type:** `Inherited`

### `elements`

### `gdbVersion`

### `moment`

### `returnDeletes`

### `types`

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

