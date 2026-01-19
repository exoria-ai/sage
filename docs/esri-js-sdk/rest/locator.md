# locator

**Module:** `@arcgis/core/rest/locator`

## Import

```javascript
import * as locator from "@arcgis/core/rest/locator.js";
```

```javascript
// CDN
const locator = await $arcgis.import("@arcgis/core/rest/locator.js");
```

```javascript
import { addressToLocations } from "@arcgis/core/rest/locator/addressToLocations.js";
import { locationToAddress } from "@arcgis/core/rest/locator/locationToAddress.js";
```

**Since:** 4.19

## Overview

A convenience module for importing locator functions when developing with TypeScript. For example, rather than importing functions one at a time like this: import { addressToLocations } from "@arcgis/core/rest/locator/addressToLocations.js"; import { locationToAddress } from "@arcgis/core/rest/locator/locationToAddress.js"; You can use this module to import them on a single line: import { addressToLocations, locationToAddress } from "@arcgis/core/rest/locator.js"; Represents a geocode service resource exposed by the ArcGIS Server REST API. It is used to generate candidates for an address. It is also used to generate batch results for a set of addresses. Set the URL to the ArcGIS Server REST resource that represents a Locator service, for example: https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer.

## See Also

- World Geocoding Service

## Property Details

### `addressToLocations`

### `addressesToLocations`

### `locationToAddress`

### `suggestLocations`

### `SuggestionResult`


## Method Details

### `Method Details()`


## Examples

```javascript
import { addressToLocations } from "@arcgis/core/rest/locator/addressToLocations.js";
import { locationToAddress } from "@arcgis/core/rest/locator/locationToAddress.js";
```

```javascript
import { addressToLocations, locationToAddress } from "@arcgis/core/rest/locator.js";
```

```javascript
{
  Street: "1234 W Main St",
  City: "Small Town",
  State: "WA",
  Zone: "99027"
}
```

```javascript
let address = {
  "field_name": "380 New York St, Redlands, CA 92373"
};
```

```javascript
{
  "OBJECTID": 0,
  "Single Line Input":"77 Main St, Plymouth, NH 03264"
}
```

