# promiseUtils

**Module:** `@arcgis/core/core/promiseUtils`

## Import

```javascript
import * as promiseUtils from "@arcgis/core/core/promiseUtils.js";
```

```javascript
// CDN
const promiseUtils = await $arcgis.import("@arcgis/core/core/promiseUtils.js");
```

**Since:** 4.2

## Overview

Various utilities and convenience functions for working with promises.

## See Also

- Samples that use debounce() method

## Property Details

### `createAbortError`

### `debounce`

### `eachAlways`

### `filter`

### `ignoreAbortErrors`

### `isAbortError`

### `EachAlwaysResult`

### `FilterPredicateCallback`


## Method Details

### `Method Details()`


## Examples

```javascript
// Request multiple files and return results in an array
function requestMultiple(urls, abortSignal) {
  // Fire off requests
  let promises = urls.map(url => request(url, { signal: abortSignal });

  // Wait until all requests have either resolved or rejected
  promiseUtils.eachAlways(urls)
    .then(results => {
      if (abortSignal && abortSignal.aborted) {
        // If the user has triggered the abortSignal, all requests will react and reject. eachAlways resolves with
        // an array that contains the reject error for each request. Instead of returning this array as a result, we
        // should reject the promise returned to the user with an abort error.
        throw promiseUtils.createAbortError();
      }
      return results;
  });
}
```

```javascript
// Queries a layer for the count of features that intersect a
// 1 km buffer of the pointer location. The debounce() method
// prevents the updateStatistics function from executing before
// a previous invocation of the same function finishes.
const updateStatistics = promiseUtils.debounce(function (geometry) {
  return layerView.queryFeatures({
    geometry,
    distance: 1,
    units: "kilometers",
    outStatistics: [{
      onStatisticField: "*",
      outStatisticFieldName: "feature_count",
      statisticType: "count"
    }]
  }).then(function(featureSet) {
    console.log(`Feature Count: ${featureSet.features[0].attributes["feature_count"]}`);
  });
});

view.on("drag", (event) => updateStatistics(view.toMap(event)));
```

```javascript
const controller = new AbortController();

// Query for the number of features from
// multiple feature layers
function queryLayerFeatureCount(whereClauses) {
  // pass each whereClause item into callback function
  return promiseUtils.eachAlways(whereClauses.map(function (whereClause) {
    return layer.queryFeatureCount(whereClause, {
      signal: controller.signal
    });
  }));
}

queryLayerFeatureCount(whereClauses).then(function(eachAlwaysResults) {
   eachAlwaysResults.forEach(function(result) {
     // If a Promise was rejected, you can check for the rejected error
     if (result.error) {
       console.log("There was an error in your query.", result.error);
     }
     // The results of the Promise are returned in the value property
     else {
       console.log("The number of features are: " + result.value);
     }
   });
});
```

```javascript
// This function fetches a document via HTTP and logs its content to the console once available
function logHTTPDocumentToConsole(url, abortSignal) {
  // Pass the abort signal into `request` to make it cancelable
  request(url, { signal: abortSignal })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (!promiseUtils.isAbortError(error)) {
        // Only log request failures and ignore cancellations
        console.error("request error", error);
      }
    });
}

let controller = new AbortController();

let url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer";
logHTTPDocumentToConsole(url, controller.signal);

// Cancel the request
controller.abort();
```

