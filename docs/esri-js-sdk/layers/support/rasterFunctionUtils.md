# rasterFunctionUtils

**Module:** `@arcgis/core/layers/support/rasterFunctionUtils`

## Import

```javascript
import * as rasterFunctionUtils from "@arcgis/core/layers/support/rasterFunctionUtils.js";
```

```javascript
// CDN
const rasterFunctionUtils = await $arcgis.import("@arcgis/core/layers/support/rasterFunctionUtils.js");
```

**Since:** 4.28

## Overview

Various utility functions that create RasterFunction for imagery processing. Utility methods in this module makes the raster function generations easier when applying raster functions to ImageryLayer and ImageryTileLayer.

## See Also

- Calculator function
- Color Model Conversion function
- Compute Change function
- Create Color Composite function
- Spectral Conversion function
- Tasseled Cap function
- Binary Thresholding function
- Transpose Bits function
- Weighted Overlay function
- Weighted Sum function

## Property Details

### `defaultRaster`

### `abs`

### `acos`

### `acosh`

### `argStatistics`

### `asin`

### `asinh`

### `aspect`

### `atan`

### `atan2`

### `atanh`

### `bandArithmeticBAI`

### `bandArithmeticCIg`

### `bandArithmeticCIre`

### `bandArithmeticClayMinerals`

### `bandArithmeticCustom`

### `bandArithmeticEVI`

### `bandArithmeticFerrousMinerals`

### `bandArithmeticGEMI`

### `bandArithmeticGNDVI`

### `bandArithmeticGVITM`

### `bandArithmeticIronOxide`

### `bandArithmeticMNDWI`

### `bandArithmeticMSAVI`

### `bandArithmeticMTVI2`

### `bandArithmeticNBR`

### `bandArithmeticNDBI`

### `bandArithmeticNDMI`

### `bandArithmeticNDSI`

### `bandArithmeticNDVI`

### `bandArithmeticNDVIre`

### `bandArithmeticNDWI`

### `bandArithmeticPVI`

### `bandArithmeticRTVICore`

### `bandArithmeticSAVI`

### `bandArithmeticSR`

### `bandArithmeticSRre`

### `bandArithmeticSultan`

### `bandArithmeticTSAVI`

### `bandArithmeticVARI`

### `bandArithmeticWNDWI`

### `bitwiseAnd`

### `bitwiseLeftShift`

### `bitwiseNot`

### `bitwiseOr`

### `bitwiseRightShift`

### `bitwiseXor`

### `booleanAnd`

### `booleanNot`

### `booleanOr`

### `booleanXor`

### `calculate`

### `cellStatistics`

### `clip`

### `colormap`

### `colormapToRGB`

### `colorspaceConversion`

### `compositeBand`

### `computeChange`

### `conditional`

### `contrastBrightness`

### `convolution`

### `cos`

### `cosh`

### `createColorComposite`

### `curvature`

### `divide`

### `equalTo`

### `exp`

### `exp10`

### `exp2`

### `extractBand`

### `float`

### `grayscale`

### `greaterThan`

### `greaterThanEqual`

### `hillshade`

### `int`

### `isNull`

### `lessThan`

### `lessThanEqual`

### `log`

### `log10`

### `log2`

### `mask`

### `minus`

### `mod`

### `negate`

### `notEqual`

### `plus`

### `power`

### `remap`

### `roundDown`

### `roundUp`

### `setNull`

### `shadedRelief`

### `sin`

### `sinh`

### `slope`

### `spectralConversion`

### `sqrt`

### `square`

### `statistics`

### `statisticsHistogram`

### `stretchMinMax`

### `stretchNone`

### `stretchPercentClip`

### `stretchStandardDeviation`

### `table`

### `tan`

### `tanh`

### `tasseledCap`

### `threshold`

### `times`

### `transposeBits`

### `weightedOverlay`

### `weightedSum`

### `ArgStatisticsDurationParameters`

### `ArgStatisticsParameters`

### `ColorCompositeByIdParameters`

### `ColorCompositeByNameParameters`

### `ConditionalParameters`

### `ConvolutionFunctionCustomParameters`

### `ConvolutionFunctionParameters`

### `ExtractBandByIdParameters`

### `ExtractBandByNameParameters`

### `ExtractBandByWavelengthParameters`

### `Math1RasterParameters`

### `Math2RastersParameters`

### `OutputPixelType`

### `PixelValueRangeMap`

### `RasterArgument`

### `RasterColormapByMapParameters`

### `RasterColormapByNameParameters`

### `RasterColormapByRampParameters`

### `RasterPrimaryArgument`

### `RasterValueToColor`

### `SetNullParameters`

### `ShadedReliefWithColorRampNameParameters`

### `ShadedReliefWithColorRampParameters`

### `ShadedReliefWithColormapParameters`


## Method Details

### `Method Details()`


## Examples

```javascript
layer.rasterFunction = rasterFunctionUtils.abs({
  raster: rasterFunctionUtils.defaultRaster,
  outputPixelType: "f32"
});
```

```javascript
layer.rasterFunction = rasterFunctionUtils.acos({
  raster: rasterFunctionUtils.defaultRaster,
  outputPixelType: "f32"
});
```

```javascript
layer.rasterFunction = rasterFunctionUtils.acosh({
  raster: rasterFunctionUtils.defaultRaster,
  outputPixelType: "f32"
});
```

```javascript
layer.rasterFunction = rasterFunctionUtils.argStatistics({
  rasters: [rasterFunctionUtils.defaultRaster],
  statisticsType: "min",
  undefinedClass: 0
});
```

```javascript
layer.rasterFunction = rasterFunctionUtils.asin({
  raster: rasterFunctionUtils.defaultRaster,
  outputPixelType: "f32"
});
```

```javascript
layer.rasterFunction = rasterFunctionUtils.asinh({
  raster: rasterFunctionUtils.defaultRaster,
   outputPixelType: "f32"
});
```

