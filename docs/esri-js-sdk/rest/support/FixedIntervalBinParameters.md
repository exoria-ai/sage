# FixedIntervalBinParameters

**Module:** `@arcgis/core/rest/support/FixedIntervalBinParameters`

## Import

```javascript
import FixedIntervalBinParameters from "@arcgis/core/rest/support/FixedIntervalBinParameters.js";
```

```javascript
// CDN
const FixedIntervalBinParameters = await $arcgis.import("@arcgis/core/rest/support/FixedIntervalBinParameters.js");
```

**Since:** 4.32

## See Also

- AttributeBinsQuery
- expressionValueType
- expression
- expression

## Property Details

### `FixedIntervalBinParameters`

### `declaredClass`
- **Type:** `Inherited`

### `end`

### `expression`

### `expressionValueType`

### `field`

### `firstDayOfWeek`

### `hideUpperBound`

### `interval`

### `normalizationField`

### `normalizationMaxValue`

### `normalizationMinValue`

### `normalizationTotal`

### `normalizationType`

### `splitBy`

### `stackBy`

### `start`

### `type`

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
// Query bins with fixed interval bin parameters based on field "temp" with 5 degrees interval.
const binQuery = new AttributeBinsQuery({
  binParameters: new FixedIntervalBinParameters({
    interval: 5, // the interval size for each bin. In this case, 5 degrees celsius
    field: "temp", // the field to bin, containing the temperature data
    start: 0, // the lower boundary of the first bin. 0 degrees celsius
    end: 30 // the upper boundary of the last bin. 30 degrees celsius
  })
});
```

```javascript
const binQuery = new AttributeBinsQuery({
  binParameters: new AutoIntervalBinParameters({
    numBins: 5, // the interval size for each bin
    // sql expression to calculate the bins based on the product of Quantity and SalesAmount
    expression: "Quantity * SalesAmount"
    expressionValueType: "double"
  })
});
```

```javascript
const binQuery = new AttributeBinsQuery({
  binParameters: new AutoIntervalBinParameters({
    numBins: 5, // the interval size for each bin
    // sql expression to calculate the bins based on the product of Quantity and SalesAmount
    expression: "Quantity * SalesAmount"
    expressionValueType: "double"
  })
});
```

```javascript
// create bins based on the SalesTotal field, split by the Branch field.
const binQuery = new AttributeBinsQuery({
  binParameters: new AutoIntervalBinParameters({
    numBins: 5, // the interval size for each bin
    field: "SalesTotal",
    splitBy: { // autocasts to AttributeBinsGrouping
      type: "field",
      value: "Branch"
    }
  })
});
const result = await layer.queryAttributeBins(binQuery);
```

```javascript
// create bins based on the SalesTotal field, stacked by the Month field.
const binQuery = new AttributeBinsQuery({
  binParameters: new AutoIntervalBinParameters({
    numBins: 5, // the interval size for each bin
    field: "SalesTotal",
    stackBy: {
      value: "EXTRACT(MONTH from invoiceDate)",
      type: "expression",
      valueType: "double",
      alias: "Month"
    }
  })
});
const result = await layer.queryAttributeBins(binQuery);
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

