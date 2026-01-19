# UniqueValueRenderer

**Module:** `@arcgis/core/renderers/UniqueValueRenderer`

## Import

```javascript
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
```

```javascript
// CDN
const UniqueValueRenderer = await $arcgis.import("@arcgis/core/renderers/UniqueValueRenderer.js");
```

**Since:** 4.0

## See Also

- Styles and data visualization - Unique types
- Sample - Symbolize features by type
- Sample - Extrude building footprints based on real world heights
- Guide - Esri color ramps
- Guide - Visualization best practices
- fieldDelimiter
- fieldDelimiter
- field2
- field3
- Arcade Visualization Profile
- Styles and data visualization

## Property Details

### `UniqueValueRenderer`

### `authoringInfo`
- **Type:** `Inherited`

### `backgroundFillSymbol`

### `declaredClass`
- **Type:** `Inherited`

### `defaultLabel`

### `defaultSymbol`

### `field`

### `field2`

### `field3`

### `fieldDelimiter`

### `legendOptions`

### `orderByClassesEnabled`

### `type`

### `uniqueValueGroups`

### `uniqueValueInfos`

### `valueExpression`

### `valueExpressionTitle`

### `visualVariables`

### `addHandles`
- **Type:** `Inherited`

### `addUniqueValueInfo`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `getUniqueValueInfo`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `removeUniqueValueInfo`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
layer.renderer = {
  type: "unique-value",  // autocasts as new UniqueValueRenderer()
  field: "REGION",
  defaultSymbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
  uniqueValueInfos: [{
    // All features with value of "North" will be blue
    value: "North",
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: "blue"
    }
  }, {
    // All features with value of "East" will be green
    value: "East",
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: "green"
    }
  }, {
    // All features with value of "South" will be red
    value: "South",
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: "red"
    }
  }, {
    // All features with value of "West" will be yellow
    value: "West",
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: "yellow"
    }
  }],
  visualVariables: [{
    type: "opacity",
    field: "POPULATION",
    normalizationField: "SQ_KM",
    // features with 30 ppl/sq km or below are assigned the first opacity value
    stops: [{ value: 100, opacity: 0.15 },
            { value: 1000, opacity: 0.90 }]
  }]
};
```

```javascript
// Typical usage
let renderer = {
  type: "unique-value",  // autocasts as new UniqueValueRenderer()
  field: "fieldName",
  uniqueValueInfos: [ ]
};
```

```javascript
// this symbol will be applied to all features. It is only
// necessary when visualizing polygon data with icons.
renderer.backgroundFillSymbol = {
  type: "simple-fill",
  outline: {
    width: 1,
    color: "gray"
  }
};
```

```javascript
let renderer = {
  type: "unique-value",  // autocasts as new UniqueValueRenderer()
  field: "RANK",  // contains values referenced in uniqueValueInfos
  uniqueValueInfos: [
    {
      value: "high",  // features labeled as "high"
      symbol: sym1  // will be assigned sym1
    }, {
      value: "medium",  // features labeled as "medium"
      symbol: sym2  // will be assigned sym2
    }, {
      value: "low",  // features labeled as "low"
      symbol: sym3  // will be assigned sym2
    }
  ]
};
```

```javascript
// categorizes combinations of values in field and field2 with uniqueValueInfos
let renderer = {
  type: "unique-value",  // autocasts as new UniqueValueRenderer()
  field: "REGION",
  field2: "RANK",
  fieldDelimiter: ", ",  // comma + space used to separate values from all fields
  uniqueValueInfos: [
    {
      value: "North, 1",  // features in the "North" region and a rank of 1
      symbol: sym1  // will be assigned sym1
    }, {
      value: "North, 2",  // features in the "North" region and a rank of 2
      symbol: sym2  // will be assigned sym2
    }, {
      value: "South, 1",  // features in the "South" region and a rank of 1
      symbol: sym3  // will be assigned sym3
    }, {
      value: "South, 2",  // features in the "South" region and a rank of 2
      symbol: sym4  // will be assigned sym4
    }
  ]
};
```

```javascript
// categorizes combinations of values in field and field2 with uniqueValueGroups
let renderer = {
  type: "unique-value",  // autocasts as new UniqueValueRenderer()
  field: "Obesity_prevalence",  // values are either "high" or "low"
  field2: "Diabetes_prevalence",  // values are either "high" or "low"
  uniqueValueGroups: [{
    classes: [{
      symbol: {
        // an object of common symbol properties
        ...commonProperties,
        color: "yellow"
      },
      label: "Low obesity; Low diabetes",
      values: {
        value: "low",
        value2: "low"
      }
    }, {
      symbol: {
        ...commonProperties,
        color: "orange"
      },
      label: "Low obesity; High diabetes",
      values: {
        value: "low",
        value2: "high"
      }
    }, {
      symbol: {
        ...commonProperties,
        color: "red"
      },
      label: "High obesity; Low diabetes",
      values: {
        value: "high",
        value2: "low"
      }
    }, {
      symbol: {
        ...commonProperties,
        color: "purple"
      },
      label: "High obesity; High diabetes",
      values: {
        value: "high",
        value2: "high"
      }
    }]
  }]
};
```

