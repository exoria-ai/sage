# AutoIntervalBinParameters

**Module:** `@arcgis/core/rest/support/AutoIntervalBinParameters`

## Import

```javascript
import AutoIntervalBinParameters from "@arcgis/core/rest/support/AutoIntervalBinParameters.js";
```

```javascript
// CDN
const AutoIntervalBinParameters = await $arcgis.import("@arcgis/core/rest/support/AutoIntervalBinParameters.js");
```

**Since:** 4.32

## See Also

- AttributeBinsQuery
- expressionValueType
- expression
- expression

## Property Details

### `AutoIntervalBinParameters`

### `declaredClass`
- **Type:** `Inherited`

### `end`

### `expression`

### `expressionValueType`

### `field`

### `firstDayOfWeek`

### `hideUpperBound`

### `normalizationField`

### `normalizationMaxValue`

### `normalizationMinValue`

### `normalizationTotal`

### `normalizationType`

### `numBins`

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
// Query bins with auto interval bin parameters based on field "total" with 3 bins.
const binQuery = new AttributeBinsQuery({
  where: "Unit = 0",
  binParameters: new AutoIntervalBinParameters({
    bins: 24,
    field: "HOUR", // the field to bin, containing the hours of the day
    start: 0, // the lower boundary of the first bin
    end: 24 // the upper boundary of the last bin
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

