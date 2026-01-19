# symbols

**Module:** `@arcgis/core/symbols`

## Import

```javascript
import * as symbols from "@arcgis/core/symbols.js";
```

```javascript
// CDN
const symbols = await $arcgis.import("@arcgis/core/symbols.js");
```

```javascript
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
```

**Since:** 4.8

## Overview

A convenience module for importing Symbol classes when developing with TypeScript. For example, rather than importing symbols one at a time like this: import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js"; import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js"; You can use this module to import them on a single line: import { SimpleFillSymbol, SimpleMarkerSymbol } from "@arcgis/core/symbols.js"; This module also allows you to implement type guards on geometries, making your code smarter. import { Symbol } from "@arcgis/core/symbols.js"; function logSymbol(symbol: Symbol): void { if (symbol.type === "simple-marker") { // new at 4.8, the compiler knows the symbol is a SimpleMarkerSymbol console.log("symbol color: ", symbol.color); } else { // the compiler knows the symbol must be one of the other symbols console.log("symbol type: ", symbol.type); } }

## See Also

- CIMSymbol
- ExtrudeSymbol3DLayer
- FillSymbol3DLayer
- IconSymbol3DLayer
- LineSymbol3DLayer
- ObjectSymbol3DLayer
- PathSymbol3DLayer
- TextSymbol3DLayer
- WaterSymbol3DLayer
- LabelSymbol3D
- LineSymbol3D
- MeshSymbol3D
- PointSymbol3D
- PolygonSymbol3D
- Font
- PictureFillSymbol
- PictureMarkerSymbol
- SimpleFillSymbol
- SimpleLineSymbol
- SimpleMarkerSymbol
- TextSymbol
- WebStyleSymbol

## Property Details

### `CIMSymbol`

### `ExtrudeSymbol3DLayer`

### `FillSymbol`

### `FillSymbol3DLayer`

### `Font`

### `IconSymbol3DLayer`

### `LabelSymbol3D`

### `LineSymbol3D`

### `LineSymbol3DLayer`

### `MarkerSymbol`

### `MeshSymbol3D`

### `ObjectSymbol3DLayer`

### `PathSymbol3DLayer`

### `PictureFillSymbol`

### `PictureMarkerSymbol`

### `PointSymbol3D`

### `PolygonSymbol3D`

### `SimpleFillSymbol`

### `SimpleLineSymbol`

### `SimpleMarkerSymbol`

### `Symbol`

### `Symbol2D`

### `Symbol2D3D`

### `Symbol3D`

### `Symbol3DLayer`

### `TextSymbol`

### `TextSymbol3DLayer`

### `WaterSymbol3DLayer`

### `WebStyleSymbol`


## Examples

```javascript
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
```

```javascript
import { SimpleFillSymbol, SimpleMarkerSymbol } from "@arcgis/core/symbols.js";
```

```javascript
import { Symbol } from "@arcgis/core/symbols.js";

function logSymbol(symbol: Symbol): void {
  if (symbol.type === "simple-marker") {
    // new at 4.8, the compiler knows the symbol is a SimpleMarkerSymbol
    console.log("symbol color: ", symbol.color);
  }
  else {
    // the compiler knows the symbol must be one of the other symbols
    console.log("symbol type: ", symbol.type);
  }
}
```

