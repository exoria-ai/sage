# DimensionalDefinition

**Module:** `@arcgis/core/layers/support/DimensionalDefinition`

## Import

```javascript
import DimensionalDefinition from "@arcgis/core/layers/support/DimensionalDefinition.js";
```

```javascript
// CDN
const DimensionalDefinition = await $arcgis.import("@arcgis/core/layers/support/DimensionalDefinition.js");
```

**Since:** 4.0

## See Also

- ImageryLayer - working with multidimensional raster data
- ImageryTileLayer - working with multidimensional raster data
- MosaicRule
- Sample - Work with pixelFilter in an ImageryLayer
- Sample - Multidimensional ImageryTileLayer

## Property Details

### `DimensionalDefinition`

### `declaredClass`
- **Type:** `Inherited`

### `dimensionName`

### `isSlice`

### `values`

### `variableName`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
let multidimensionalDefinition = [];
multidimensionalDefinition.push(new DimensionalDefinition({
  variableName: "water_temp",
  dimensionName: "StdZ", // water depth
  values: [0], // sea surface or 0ft
  isSlice: true
}));

let mosaicRule = new MosaicRule();
mosaicRule.multidimensionalDefinition = multidimensionalDefinition;
```

```javascript
let multidimensionalDefinition = [];
multidimensionalDefinition.push(new DimensionalDefinition({
  variableName: "water_temp",
  dimensionName: "StdZ", // water depth
  values: [-5000], // 5000 m below
  isSlice: true
}));

let mosaicRule = new MosaicRule();
mosaicRule.multidimensionalDefinition = multidimensionalDefinition;
```

```javascript
// -10 is the minimum valid value and 10 is the maximum valid value
definition.values = [[-10, 10]];
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
// Creates a clone of the DimensionalDefinition
let dimensionalDefinition1 = dimensionalDefinition.clone();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

