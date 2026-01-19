# DateBinParameters

**Module:** `@arcgis/core/rest/support/DateBinParameters`

## Import

```javascript
import DateBinParameters from "@arcgis/core/rest/support/DateBinParameters.js";
```

```javascript
// CDN
const DateBinParameters = await $arcgis.import("@arcgis/core/rest/support/DateBinParameters.js");
```

**Since:** 4.32

## See Also

- AttributeBinsQuery
- Sample - Attribute Bins Query
- expressionValueType
- expression
- expression
- Time binning

## Property Details

### `DateBinParameters`

### `declaredClass`
- **Type:** `Inherited`

### `end`

### `expression`

### `expressionValueType`

### `field`

### `firstDayOfWeek`

### `hideUpperBound`

### `interval`

### `offset`

### `returnFullIntervalBin`

### `snapToData`

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
// Query total accidents in the USA by month for the year 2021.
// TSODate field values are used to bin the data into monthly intervals.
// Request the binning results in pacific time zone.
const binQuery = new AttributeBinsQuery({
  binParameters: new DateBinParameters({
    field: "TSODate", // timestamp-offset field containing the date of each accident
    start: "2021-01-01T00:00:00+00:00", // the lower boundary of the first bin
    end: "2021-12-31T00:00:00+00:00", // the upper boundary of the last bin
    interval: { // the interval size for each bin. One month
      value: 1,
      units: "months"
    }
  }),
  outTimeZone: "America/Los_Angeles", // Get the binning results in pacific time zone
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

