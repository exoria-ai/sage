# renderers

**Module:** `@arcgis/core/renderers`

## Import

```javascript
import * as renderers from "@arcgis/core/renderers.js";
```

```javascript
// CDN
const renderers = await $arcgis.import("@arcgis/core/renderers.js");
```

```javascript
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer.js";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer.js";
```

**Since:** 4.8

## Overview

A convenience module for importing Renderer classes when developing with TypeScript. For example, rather than importing renderers one at a time like this: import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js"; import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer.js"; import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js"; import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js"; import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer.js"; You can use this module to import them on a single line: import { ClassBreaksRenderer, HeatmapRenderer, SimpleRenderer, UniqueValueRenderer } from "@arcgis/core/renderers.js"; This module also allows you to implement type guards on renderers, making your code smarter. import { Renderer } from "@arcgis/core/renderers.js"; function logRenderer(renderer: Renderer): void { if (renderer.type === "simple") { // new at 4.8, the compiler knows the renderer is a SimpleRenderer console.log("renderer symbol: ", renderer.symbol); } else { if (renderer.type !== "heatmap") { // the compiler knows the renderer must be a `ClassBreaksRenderer | UniqueValueRenderer` console.log("renderer background symbol: ", renderer.backgroundFillSymbol); } } }

## See Also

- ClassBreaksRenderer
- HeatmapRenderer
- SimpleRenderer
- UniqueValueRenderer

## Property Details

### `ClassBreaksRenderer`

### `DictionaryRenderer`

### `DotDensityRenderer`

### `HeatmapRenderer`

### `PieChartRenderer`

### `Renderer`

### `RendererWithVisualVariables`

### `SimpleRenderer`

### `UniqueValueRenderer`


## Examples

```javascript
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer.js";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer.js";
```

```javascript
import { ClassBreaksRenderer, HeatmapRenderer, SimpleRenderer, UniqueValueRenderer } from "@arcgis/core/renderers.js";
```

```javascript
import { Renderer } from "@arcgis/core/renderers.js";

function logRenderer(renderer: Renderer): void {
  if (renderer.type === "simple") {
    // new at 4.8, the compiler knows the renderer is a SimpleRenderer
    console.log("renderer symbol: ", renderer.symbol);
  }
  else {
    if (renderer.type !== "heatmap") {
      // the compiler knows the renderer must be a `ClassBreaksRenderer | UniqueValueRenderer`
      console.log("renderer background symbol: ", renderer.backgroundFillSymbol);
    }
  }
}
```

