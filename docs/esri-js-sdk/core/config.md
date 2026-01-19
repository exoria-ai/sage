# config

**Module:** `@arcgis/core/config`

## Import

```javascript
import esriConfig from "@arcgis/core/config.js";
```

```javascript
// CDN
const esriConfig = await $arcgis.import("@arcgis/core/config.js");
```

```javascript
import esriConfig from "@arcgis/core/config";
```

**Since:** 4.0

## Overview

Configure global properties of the library. This module returns an object with the following properties. You can also use the global esriConfig variable to initialize the esri/config module.

## See Also

- API keys
- API key guide
- API key authentication tutorials
- Display a map tutorial - get an API key
- API keys
- API key guide
- API key authentication tutorials
- BasemapStyle
- Working with assets
- Labeling guide
- Portal.url
- Guide topic - Proxy pages
- Guide topic - CORS

## Property Details

### `apiKey`

### `apiKeys`

### `applicationName`

### `assetsPath`

### `fontsUrl`

### `geoRSSServiceUrl`

### `geometryServiceUrl`

### `kmlServiceUrl`

### `log`

### `portalUrl`

### `request`

### `respectPrefersReducedMotion`

### `routeServiceUrl`

### `userPrivilegesApplied`

### `workers`

### `AfterInterceptorCallback`

### `BeforeInterceptorCallback`

### `ErrorCallback`

### `LogInterceptor`

### `RequestInterceptor`


## Examples

```javascript
const esriConfig = await $arcgis.import("@arcgis/core/config.js");
esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";
```

```javascript
<script>
// use the global esriConfig variable to initialize properties
var esriConfig = {
  portalUrl: "https://myHostName.esri.com/arcgis"
};
</script>
```

```javascript
// Set an API key for multiple services.
esriConfig.apiKeys.scopes = [
 {
   // The API key value.
   token: "API_KEY_FOR_SERVICE",
   // An array of URLs that the API key applies to.
   urls: [portalURL, serverURL]
 },
// More scopes can be added here...
];
```

```javascript
// Set an API key for the basemap styles service
esriConfig.apiKeys.basemapStyles = "API_KEY_FOR_BASEMAP_STYLES";
```

```javascript
esriConfig.applicationName = "Sample Application";
```

```javascript
import esriConfig from "@arcgis/core/config";
esriConfig.assetsPath = "./assets";
```

