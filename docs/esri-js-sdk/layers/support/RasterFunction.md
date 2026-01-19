# RasterFunction

**Module:** `@arcgis/core/layers/support/RasterFunction`

## Import

```javascript
import RasterFunction from "@arcgis/core/layers/support/RasterFunction.js";
```

```javascript
// CDN
const RasterFunction = await $arcgis.import("@arcgis/core/layers/support/RasterFunction.js");
```

**Since:** 4.0

## See Also

- Sample - Set a server side raster function
- Sample - ImageryLayer raster function
- Sample - Work with pixelFilter in an ImageryLayer
- REST API - Raster functions
- rasterFunctionUtils

## Property Details

### `RasterFunction`

### `declaredClass`
- **Type:** `Inherited`

### `functionArguments`

### `functionName`

### `outputPixelType`

### `rasterFunctionDefinition`

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
let remapRF = new RasterFunction();
remapRF.functionName = "Remap";
remapRF.functionArguments = {
  InputRanges: [-3,10,11,37], // remap pixels with values -3 to 10 to now have value of 1
  OutputValues: [1,2],        // remap pixel values from 11 to 37 to have a value of 2
  Raster: "$$"  // Apply remap to the image service
};
remapRF.outputPixelType = "u8";

let colorRF = new RasterFunction();
colorRF.functionName = "Colormap";
colorRF.functionArguments = {
  Colormap: [
    [1, 255, 0, 0],  // Symbolize pixels with value of 1 using red color
    [2, 0, 255, 0]   // Symbolize pixels with value of 2 using green color
  ],
  Raster : remapRF  // Apply Colormap to output raster from the remap rasterFunction
};

imageLayer.rasterFunction = colorRF;
```

```javascript
// apply NDVI and colormap raster function to an imagery tile layer
// use rasterFunctionUtils convenience methods to create raster functions
const ndvi = rasterFunctionUtils.bandArithmeticNDVI({
  nirBandId: 4,
  redBandId: 3,
  scientificOutput: false
});

 const colormap = rasterFunctionUtils.colormap({
  colorRampName: "NDVI3",
  raster: ndvi
});
layer.rasterFunction = colormap;
```

```javascript
rasterFunction.functionArguments = {
  "Azimuth":215.0,
  "Altitude":75.0,
  "ZFactor":0.3
};
```

```javascript
rasterFunction.functionName = "Stretched";
rasterFunction.name = "GrayScale";
```

```javascript
rasterFunction.outputPixelType = "u8";
```

```javascript
rasterFunction.variableName = "DEM";
```

