# sql

**Module:** `@arcgis/core/core/sql`

## Import

```javascript
import * as sql from "@arcgis/core/core/sql.js";
```

```javascript
// CDN
const sql = await $arcgis.import("@arcgis/core/core/sql.js");
```

**Since:** 4.14

## Overview

Creates a WhereClause expression that adheres to standardized SQL expressions. SQL expression is a combination of one or more values, operators and SQL functions that results in to a value.

## See Also

- Standardized SQL functions in ArcGIS Online

## Property Details

### `parseWhereClause`

### `sqlIn`


## Method Details

### `Method Details()`


## Examples

```javascript
sql.parseWhereClause("POPULATION > 100000", layer.fieldsIndex)
.then(function(clause){
  let testResult = clause.testFeature(
    new Graphic({
      attributes: {
        POPULATION: 300000
      }
    })
  );
  console.log(testResult); // prints true
});
```

```javascript
sql.parseWhereClause(
  "START_TIME BETWEEN TIMESTAMP '2023-01-01 00:00:00' AND TIMESTAMP '2023-12-31 23:59:59'",
  layer.fieldsIndex
)
.then(function(clause){
  const utcDate = Date.UTC(2023, 0, 1, 0, 0, 0);
  let testResult = clause.testFeature(
    new Graphic({
      attributes: {
        START_TIME: utcDate
      }
    })
  );
  console.log(testResult); // true
});
```

