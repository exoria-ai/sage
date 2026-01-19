# MultidimensionalSubset

**Module:** `@arcgis/core/layers/support/MultidimensionalSubset`

## Import

```javascript
import MultidimensionalSubset from "@arcgis/core/layers/support/MultidimensionalSubset.js";
```

```javascript
// CDN
const MultidimensionalSubset = await $arcgis.import("@arcgis/core/layers/support/MultidimensionalSubset.js");
```

**Since:** 4.25

## See Also

- ImageryLayer - working with multidimensional raster data
- ImageryTileLayer - working with multidimensional raster data
- Sample - Multidimensional ImageryTileLayer

## Property Details

### `MultidimensionalSubset`

### `areaOfInterest`

### `declaredClass`
- **Type:** `Inherited`

### `dimensions`

### `subsetDefinitions`

### `variables`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `SubsetDimension`


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

