# StreamConnection

**Module:** `@arcgis/core/layers/support/StreamConnection`

## Import

```javascript
import StreamConnection from "@arcgis/core/layers/support/StreamConnection.js";
```

```javascript
// CDN
const StreamConnection = await $arcgis.import("@arcgis/core/layers/support/StreamConnection.js");
```

**Since:** 4.25

## Overview

A web socket connection to a stream service. The connection to the stream service can be established by calling StreamLayer's connect() method.

## See Also

- StreamLayer.connect()

## Property Details

### `connectionError`

### `connectionStatus`

### `destroy`


## Method Details

### `Method Details()`


## Examples

```javascript
// get layer's connection configurations
const parameters = layer.createConnectionParameters();

// set the spatial reference of the service geometries
parameters.spatialReference = new SpatialReference({
  wkid: 2154
});

const connection = await layer.connect(parameters);

// listen to date-received event once the connection is established
// create a graphic from the JSON object returned and add them to view
connection.on("data-received", (feature) => {
  const graphic = Graphic.fromJSON(feature);
  graphic.symbol = myPointSymbol;
  view.graphics.push(graphic);
});

// close the connection when it is not needed anymore
connection.destroy();
```

