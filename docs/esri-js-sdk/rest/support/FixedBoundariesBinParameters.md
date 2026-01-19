# FixedBoundariesBinParameters

**Module:** `@arcgis/core/rest/support/FixedBoundariesBinParameters`

## Import

```javascript
import FixedBoundariesBinParameters from "@arcgis/core/rest/support/FixedBoundariesBinParameters.js";
```

```javascript
// CDN
const FixedBoundariesBinParameters = await $arcgis.import("@arcgis/core/rest/support/FixedBoundariesBinParameters.js");
```

**Since:** 4.32

## See Also

- AttributeBinsQuery
- expressionValueType
- expression
- expression

## Property Details

### `FixedBoundariesBinParameters`

### `boundaries`

### `declaredClass`
- **Type:** `Inherited`

### `expression`

### `expressionValueType`

### `field`

### `firstDayOfWeek`

### `hideUpperBound`

### `splitBy`

### `stackBy`

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
// Query bins with fixed boundaries bin parameters based on field "income2022" with the specified income boundaries.
// Show the median income distribution of households in the city.
const binQuery = new AttributeBinsQuery({
  binParameters: new FixedBoundariesBinParameters({
    boundaries: [0, 12500, 48000, 85000, 120000, 20000], // the boundaries of each bin
    field: "income2022" // the field to bin, containing the median income data for individual households
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

