# request

**Module:** `@arcgis/core/request`

## Import

```javascript
import esriRequest from "@arcgis/core/request.js";
```

```javascript
// CDN
const esriRequest = await $arcgis.import("@arcgis/core/request.js");
```

**Since:** 4.0

## Overview

Retrieves data from a remote server or uploads a file.

## See Also

- Sample - Request data from a remote server
- Sample - Search component with custom source

## Property Details

### `request`

### `RequestOptions`

### `RequestResponse`

### `getAllHeaders`

### `getHeader`


## Method Details

### `Method Details()`


## Examples

```javascript
// request GeoJson data from USGS remote server
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

esriRequest(url, {
  responseType: "json"
}).then((response) => {
  // The requested data
  let geoJson = response.data;
});
```

```javascript
const controller = new AbortController();
const signal = controller.signal;

esriRequest(url, { signal })
  .then((response) => {
    // The request went OK
  })
  .catch((err) => {
    if (err.name === 'AbortError') {
      console.log('Request aborted');
    } else {
      console.error('Error encountered', err);
    }
  });

// Abort requests that are aware of the controller's signal
controller.abort();
```

```javascript
// request GeoJson data from USGS remote server
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

esriRequest(url, {
  responseType: "json"
}).then((response) => {
  // The requested data
  let geoJson = response.data;
});
```

```javascript
esriRequest(url, options)
  .then((response) => {
    console.log("All request headers: ", response.getAllHeaders());
  });
```

```javascript
esriRequest(url, options)
  .then((response) => {
    // prints the content type of the request: 'application/json'
    console.log("header: ", response.getHeader('Content-Type'));
  });
```

