# LabelClass

**Module:** `@arcgis/core/layers/support/LabelClass`

## Import

```javascript
import LabelClass from "@arcgis/core/layers/support/LabelClass.js";
```

```javascript
// CDN
const LabelClass = await $arcgis.import("@arcgis/core/layers/support/LabelClass.js");
```

**Since:** 4.0

## See Also

- FeatureLayer.labelingInfo
- TextSymbol
- Labeling guide
- Sample: Flat vs. volumetric 3D symbol layers
- Sample: MapImageLayer - label sublayer features
- Sample: Add labels to a FeatureLayer
- Sample: Add multiple label classes to a layer
- Sample: Multi-line labels
- Sample: Line markers and label placement
- Arcade Labeling Profile
- Point label placement properties
- Polyline label placement properties
- Polygon label placement properties

## Property Details

### `LabelClass`

### `allowOverrun`

### `declaredClass`
- **Type:** `Inherited`

### `deconflictionStrategy`

### `labelExpression`

### `labelExpressionInfo`

### `labelPlacement`

### `labelPosition`

### `maxScale`

### `minScale`

### `repeatLabel`

### `repeatLabelDistance`

### `symbol`

### `useCodedValues`

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

### `Method Details()`


## Examples

```javascript
const labelClass = {  // autocasts as new LabelClass()
  symbol: {
    type: "text",  // autocasts as new TextSymbol()
    color: "white",
    haloColor: "blue",
    haloSize: 1,
    font: {  // autocast as new Font()
       family: "Ubuntu Mono",
       size: 14,
       weight: "bold"
     }
  },
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.Team + TextFormatting.NewLine + $feature.Division"
  },
  maxScale: 0,
  minScale: 25000000,
  where: "Conference = 'AFC'"
};

const labelLayer = new FeatureLayer({
  portalItem: {  // autocasts as new PortalItem()
    id: "7f0bfc7bf67a407d8efebf584f6d956d"
  },
  labelingInfo: [labelClass]
});
```

```javascript
// Ensures all labels are displayed regardless
// of whether they overlap
labelClass.deconflictionStrategy = "none";
```

```javascript
// For Spokane County, WA, label will display: "Spokane County, Washington"
labelClass.labelExpression = '[COUNTY_NAME] CONCAT " County, " CONCAT [STATE_NAME]';
```

```javascript
// For Spokane County, WA, label will display: "Spokane County, Washington"
labelClass.labelExpressionInfo = {
  expression: "$feature.COUNTY_NAME + ' County, ' + $feature.STATE_NAME"
};
```

```javascript
labelClass.labelPlacement = "above-right";
```

```javascript
const labelClass = {  // autocasts as new LabelClass()
  symbol: {
    type: "text",  // autocasts as new TextSymbol()
    color: "white",
    font: {  // autocast as new Font()
       family: "Orbitron",
       size: 12,
       weight: "bold"
     }
  },
  labelExpressionInfo: {
    expression: "$feature.rte_num1"
  },
  labelPlacement: "center-along",
  repeatLabel: true,
  repeatDistanceLabel: 100
};
```

