# FieldsIndex

**Module:** `@arcgis/core/layers/support/FieldsIndex`

## Import

```javascript
import FieldsIndex from "@arcgis/core/layers/support/FieldsIndex.js";
```

```javascript
// CDN
const FieldsIndex = await $arcgis.import("@arcgis/core/layers/support/FieldsIndex.js");
```

**Since:** 4.12

## Overview

This class provides convenient methods that can be used to make case-insensitive lookups for a field by its name. It also provides more information such as the list of date fields in a layer.

## See Also

- REST API - Date-time queries
- Date and time queries

## Property Details

### `FieldsIndex`

### `dateFields`

### `get`

### `getTimeZone`

### `has`

### `isDateField`


## Method Details

### `Method Details()`


## Examples

```javascript
// Query for features that recorded on January 1, 2012 9:00:00 AM GMT
// DateTime_PST date field values are in PST. Must adjust the epoch values to PST

const queryDate = new Date(1325408400000); 01/01/2012 9:00:00 AM GMT
let queryFields = ["DateTime_PST"];

// get the timezone of the DateTime_PST date field
const fieldTimeZone = layer.fieldsIndex.getTimeZone("DateTime_PST") ;

// we need to adjust the date value to match the time zone of the field.
const where = `DateTime_PST < DATE '${getDateForTimeZone(queryDate, fieldTimeZone)}'`
layerView.filter = new FeatureFilter({
  where
});
runQueries(where, queryFields);

// This function conveniently formats a date in terms of the parsed time zone.
function getDateForTimeZone(queryDate, timezone) {

  // adjust the given date field to the timezone of the date field
  const zonedDate = new Date(
    queryDate.toLocaleString("en-US", {
      timeZone: timezone
    })
  );
  const pad = (value) => String(value).padStart(2, "0");
  const month = pad(zonedDate.getMonth() + 1);
  const day = pad(zonedDate.getDate())
  const year = zonedDate.getFullYear();
  const hour = pad(zonedDate.getHours());
  const minutes = pad(zonedDate.getMinutes());
  const seconds = pad(zonedDate.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}
```

