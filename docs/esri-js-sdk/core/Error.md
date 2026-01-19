# Error

**Module:** `@arcgis/core/core/Error`

## Import

```javascript
import Error from "@arcgis/core/core/Error.js";
```

```javascript
// CDN
const Error = await $arcgis.import("@arcgis/core/core/Error.js");
```

**Since:** 4.5

## Overview

Error is a class that enhances the debugging and error handling process. Rather than returning a generic JavaScript error, this Error returns a standardized error object with several properties. The error class can be useful in many scenarios, such as working with promises, the esriRequest module, and many different layers and widgets.

## See Also

- request

## Property Details

### `Error`

### `details`

### `message`

### `name`


## Examples

```javascript
button.on("click", function() {
  esriRequest(url, options).then(function(response) {
    // do something useful
  }).catch(function(error){
    console.log("informative error message: ", error.message);
  });
});
```

```javascript
someAsyncFunction.then(callback)
  .catch(function(error){
    console.log("Error details: ", error.details);
});
```

```javascript
someAsyncFunction.then(callback)
  .catch(function(error){
    console.log("Error message: ", error.message);
});
```

```javascript
someAsyncFunction.then(callback)
  .catch(function(error){
    console.log("Error name: ", error.name);
});
```

