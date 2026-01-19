# workers

**Module:** `@arcgis/core/core/workers`

## Import

```javascript
import * as workers from "@arcgis/core/core/workers.js";
```

```javascript
// CDN
const workers = await $arcgis.import("@arcgis/core/core/workers.js");
```

**Since:** 4.2

## Overview

This module is a utility framework that simplifies the use of Web Workers in the ArcGIS Maps SDK for JavaScript. The workers framework takes advantage of multi-core CPUs to perform computationally expensive tasks in a background thread without interfering with the user interface. This framework loads a script and provides a calling function in the main thread using the Connection class. The Connection can then be used to offload jobs asynchronously from the main thread to workers. The workers framework returns a Promise once the job is completed. Known Limitations Workers do not have access to document, window and parent objects, and cannot directly affect the parent page; this includes DOM manipulation. The esriRequest module can be used within worker script with the following exceptions: esriRequest.options.body FormData value is not supported. esriRequest.options.responseType supported values are: array-buffer, blob, json, native, text esriRequest.getHeader is not supported.

## See Also

- ES modules custom workers sample
- Connection

## Property Details

### `open`


## Method Details

### `Method Details()`


## Examples

```javascript
// Set the path for the worker's AMD loader configuration
// to a folder called workersFolder.
esriConfig.workers.loaderConfig = {
 paths: {
   myWorkers: new URL("./workersFolder", document.baseURI).href
 }
};

// load myWorkers/Calculator.js in the workers framework
// and invoke its "getMaxNumber" method
workers.open("myWorkers/Calculator")
  .then((connection) => {
    return connection.invoke("getMaxNumber", [0, 1, 2, 3, 4]);
  })
  .then((result) => {
    console.log(result);
  });

//*********************************************************
// module: workerFolder/Calculator.js
//*********************************************************
define([], () => {
  return {
    // this function can be invoked from the main thread
    getMaxNumber: function (number) {
      return Math.max.apply(null, numbers);
    }
  };
});
```

```javascript
// Load workerScripts/TimeOfTheDay.js in the workers framework
// We define an API accessible from the module
workers.open(new URL("./workerScripts/TimeOfDay.js", document.baseURI).href, {
  client: {
    getCurrentTime: function() {
      return Date.now();
    }
  }
})
  .then((connection) => {
    return connection.invoke("timeOfTheDay");
  })
  .then((result) => {
    console.log(result);
  });

//*********************************************************
// module: workerScripts/TimeOfTheDay.js
//*********************************************************

define([], () => {

  return {
    timeOfTheDay: function(noArgs, remoteClient) {
      // call back the main thread to get the current time over there.
      return remoteClient.invoke("getCurrentTime")
        .then((time) => {
          return "The time is " + time;
        });
    }
  };
});
```

