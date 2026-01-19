# geoprocessor

**Module:** `@arcgis/core/rest/geoprocessor`

## Import

```javascript
import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
```

```javascript
// CDN
const geoprocessor = await $arcgis.import("@arcgis/core/rest/geoprocessor.js");
```

**Since:** 4.19

## Overview

Represents a GP resource exposed by the ArcGIS REST API. A GP resource represents a single task in a GP service published using the ArcGIS Server and it supports one of the following operations dependent on how the service was set up: execute - for when the execution type is synchronous. submitJob - for when the execution type is asynchronous. If processExtent is not set then execute and submitJob will format web requests compatible with ArcGIS version prior to 10.6.1.

## See Also

- GPMessage
- ParameterValue
- JobInfo
- Sample - Calculate Viewshed

## Property Details

### `execute`

### `submitJob`


## Method Details

### `Method Details()`


## Examples

```javascript
{
 Input_Points: <FeatureSet>,
 Distance: <Number>
}
```

```javascript
{
  messages: <GPMessage[]>,
  results: <ParameterValue[]>
}
```

```javascript
{
  Input_Points: <FeatureSet>,
  Distance: <Number>
}
```

