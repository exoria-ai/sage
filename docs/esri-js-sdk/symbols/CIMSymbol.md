# CIMSymbol

**Module:** `@arcgis/core/symbols/CIMSymbol`

## Import

```javascript
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol.js";
```

```javascript
// CDN
const CIMSymbol = await $arcgis.import("@arcgis/core/symbols/CIMSymbol.js");
```

**Since:** 4.12

## Inheritance

Extends: **pasts**

## See Also

- Sample - CIMSymbol
- Sample - CIMSymbol lines and polygons
- Sample - Symbol animations
- Sample - Arrows along a line
- Sample - Adjust marker placement in polygon symbols
- Sample - WebStyleSymbols (2D)
- Symbol Builder
- Guide - WebStyleSymbol reference list
- ArcGIS Blog - Create points, lines, and polygons using CIMSymbols
- ArcGIS Blog - Visualize electoral swing using composite symbols
- Presentation - ArcGIS Maps SDK for JavaScript: Dynamic Vector Symbology
- WebStyleSymbol
- cimSymbolUtils
- symbolService
- CIMPictureMarker.animatedSymbolProperties
- CIMSymbolAnimationScale
- CIMSymbolAnimationSize
- CIMSymbolAnimationColor
- CIMSymbolAnimationTransparency
- CIMSymbolAnimationRotation
- CIMSymbolAnimationOffset
- CIMTextSymbol.callout
- CIMGradientFill.colorRamp
- CIMGradientStroke.colorRamp
- CIMPictureFill.colorSubstitutions
- CIMPictureMarker.colorSubstitutions
- CIMPictureStroke.colorSubstitutions
- CIMPointSymbol.effects
- CIMLineSymbol.effects
- CIMPolygonSymbol.effects
- CIMHatchFill.effects
- CIMPictureFill.effects
- CIMPictureMarker.effects
- CIMPictureStroke.effects
- CIMSolidFill.effects
- CIMSolidStroke.effects
- CIMVectorMarker.effects
- CIMGradientStroke.effects
- CIMGradientFill.effects
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMGeometricEffect
- CIMSymbolLayer
- CIMSymbolReference.symbol
- CIMMarkerGraphic.symbol
- CIMHatchFill.lineSymbol
- CIMVectorMarker.markerGraphics
- MarkerPlacement
- Sample - Arrows along a line
- MarkerPlacement
- MarkerPlacement
- MarkerPlacement
- Sample - Adjust marker placement in polygon symbols
- MarkerPlacement
- MarkerPlacement
- MarkerPlacement
- CIMSymbolLayer
- CIMSymbolLayer
- CIMSymbolLayer
- CIMSymbolReference.symbol
- CIMMarkerGraphic.symbol
- CIMSymbolReference.symbol
- CIMMarkerGraphic.symbol
- CIMTextSymbol.symbol and CIMTextSymbol.haloSymbol
- CIMSymbolLayer
- CIMSymbolLayer
- Sample - Symbol animations
- CIMPointSymbol.animations
- CIMPictureMarker.animations
- CIMVectorMarker.animations
- CIMSolidStroke.animations
- CIMSolidFill.animations
- CIMSymbolAnimation
- CIMSymbolAnimation
- CIMSymbolAnimation
- Sample - Symbol animations
- CIMSymbolAnimation
- CIMSymbolAnimation
- Sample - Symbol animations
- CIMSymbolAnimation
- CIMPointSymbol.symbolLayers
- CIMLineSymbol.symbolLayers
- CIMPolygonSymbol.symbolLayers
- CIMSymbol.data
- CIMMarkerGraphic.symbol
- CIMSymbolLayer
- CIMVectorMarker.markerPlacement
- CIMPictureMarker.markerPlacement
- CIMSymbolReference.primitiveOverrides
- Sample - CIMSymbol (PrimitiveOverride on TextString)
- Sample - Symbol animations

## Property Details

### `CIMSymbol`

### `data`

### `declaredClass`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`

### `CIMAnimatedSymbolProperties`

### `CIMBackgroundCallout`

### `CIMColorRamp`

### `CIMColorSubstitution`

### `CIMFixedColorRamp`

### `CIMGeometricEffect`

### `CIMGeometricEffectAddControlPoints`

### `CIMGeometricEffectArrow`

### `CIMGeometricEffectBuffer`

### `CIMGeometricEffectControlMeasureLine`

### `CIMGeometricEffectCut`

### `CIMGeometricEffectDashes`

### `CIMGeometricEffectDonut`

### `CIMGeometricEffectEnclosingPolygon`

### `CIMGeometricEffectJog`

### `CIMGeometricEffectMove`

### `CIMGeometricEffectOffset`

### `CIMGeometricEffectRadial`

### `CIMGeometricEffectRotate`

### `CIMGeometricEffectScale`

### `CIMGeometricEffectSuppress`

### `CIMGeometricEffectTaperedPolygon`

### `CIMGeometricEffectWave`

### `CIMGradientFill`

### `CIMGradientStroke`

### `CIMHatchFill`

### `CIMLineSymbol`

### `CIMLinearContinuousColorRamp`

### `CIMMarkerGraphic`

### `CIMMarkerPlacementAlongLineSameSize`

### `CIMMarkerPlacementAtExtremities`

### `CIMMarkerPlacementAtRatioPositions`

### `CIMMarkerPlacementInsidePolygon`

### `CIMMarkerPlacementOnLine`

### `CIMMarkerPlacementOnVertices`

### `CIMMarkerPlacementPolygonCenter`

### `CIMMultipartColorRamp`

### `CIMPictureFill`

### `CIMPictureMarker`

### `CIMPictureStroke`

### `CIMPointSymbol`

### `CIMPolygonSymbol`

### `CIMSolidFill`

### `CIMSolidStroke`

### `CIMSymbolAnimation`

### `CIMSymbolAnimationColor`

### `CIMSymbolAnimationOffset`

### `CIMSymbolAnimationRotation`

### `CIMSymbolAnimationScale`

### `CIMSymbolAnimationSize`

### `CIMSymbolAnimationTransparency`

### `CIMSymbolLayer`

### `CIMSymbolReference`

### `CIMTextSymbol`

### `CIMVectorMarker`

### `Envelope`

### `MarkerPlacement`

### `PrimitiveOverride`


## Method Details

### `Method Details()`


## Examples

```javascript
const symbol = new CIMSymbol({
 data: {
  type: "CIMSymbolReference",
  primitiveOverrides: [{
    type: "CIMPrimitiveOverride",
    // primitiveName matches the primitiveName on the symbol layer
    primitiveName: "symbol-layer-1",
    propertyName: "Color", // property to be overridden
    valueExpressionInfo: {
      type: "CIMExpressionInfo",
      // colors the symbol layer red if the DailyTraffic is greater than 10,000, orange otherwise
      expression: `IIF($feature.DailyTraffic > 10000, "rgba(255,0,0,1)", "rgba(255,165,0,1)")`,
      returnType: "Default"
    }
  }],
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
     {
       type: "CIMSolidStroke",
       // primitiveName matches the primitiveName on the primitive override
       primitiveName: "symbol-layer-1",
       enable: true,
       // the property to be overridden
       color: [0, 0, 0, 255],
       width: 2
     },
     // other symbol layers
   ]
  }
 }
});
```

```javascript
const symbol = new CIMSymbol({
 data: {
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMPointSymbol",
    animations: [{ ... }], // global animation applied to the entire symbol
    symbolLayers: [{ ... }],
  }
 }
});
```

```javascript
const symbol = new CIMSymbol({
 data: {
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMPointSymbol",
    symbolLayers: [{
     type: "CIMVectorMarker",
     enable: true,
     animations: [{ ... }], // animation applied to this symbol layer
     // other props for the symbol layer
    }]
  }
 }
});
```

```javascript
const cimSymbol = new CIMSymbol({
  data: {
    type: "CIMSymbolReference",
    minScale: 750000, // only allow the symbol to be shown at certain scales
    maxScale: 80000,
    symbol: {
      type: "CIMLineSymbol",
      symbolLayers: [{ ... }]
    },
    primitiveOverrides: [{
      type: "CIMPrimitiveOverride",
      primitiveName: "symbol-layer-1", // the name of the symbol layer we want to override
      propertyName: "Size", // the name of the property on the symbol layer we want to override
      valueExpressionInfo: {
        type: "CIMExpressionInfo",
        title: "Size override",
        expression: "..." // the expression to change the size of the symbol
      }
    }]
  }
});
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
// Creates a deep clone of the graphic's symbol
let symLyr = graphic.symbol.clone();
```

