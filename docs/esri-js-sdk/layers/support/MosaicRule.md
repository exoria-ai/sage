# MosaicRule

**Module:** `@arcgis/core/layers/support/MosaicRule`

## Import

```javascript
import MosaicRule from "@arcgis/core/layers/support/MosaicRule.js";
```

```javascript
// CDN
const MosaicRule = await $arcgis.import("@arcgis/core/layers/support/MosaicRule.js");
```

**Since:** 4.0

## See Also

- Sample - Work with pixelFilter in an ImageryLayer
- Sample - ImageryLayer raster function
- Mosaicking rules for a mosaic dataset
- ImageryLayer - working with multidimensional raster data
- Sample - Work with pixelFilter in an ImageryLayer

## Property Details

### `MosaicRule`

### `ascending`

### `declaredClass`
- **Type:** `Inherited`

### `itemRasterFunction`

### `lockRasterIds`

### `multidimensionalDefinition`

### `objectIds`

### `operation`

### `sortField`

### `sortValue`

### `viewpoint`

### `where`

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

### `method()`

### `Method Details()`


## Examples

```javascript
new MosaicRule({
  ascending: true,
  method: "center",
  operation: "last"
});
```

```javascript
let mosaicRule = new MosaicRule();
mosaicRule.method = "lock-raster";
mosaicRule.lockRasterIds = [32,454,14];
```

```javascript
let mosaicRule = new MosaicRule();
mosaicRule.method = "lock-raster";
```

```javascript
// Display water salinity at a specific point in time.
// In this case - Nov 30 2009
let mosaicRule = new MosaicRule();
mosaicRule.multidimensionalDefinition = [];
mosaicRule.multidimensionalDefinition.push(new DimensionalDefinition({
  variableName: "Salinity",
  dimensionName: "StdTime",
  values: [1259625600000]
}));

layer.mosaicRule = mosaicRule;
```

```javascript
let mosaicRule = new MosaicRule();
mosaicRule.method = "viewpoint";
mosaicRule.viewpoint = inPoint;
layer.mosaicRule = mosaicRule;
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

