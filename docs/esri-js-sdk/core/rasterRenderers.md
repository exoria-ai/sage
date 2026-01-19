# rasterRenderers

**Module:** `@arcgis/core/rasterRenderers`

## Import

```javascript
import * as rasterRenderers from "@arcgis/core/rasterRenderers.js";
```

```javascript
// CDN
const rasterRenderers = await $arcgis.import("@arcgis/core/rasterRenderers.js");
```

```javascript
import { FlowRenderer, ClassBreaksRenderer, UniqueValueRenderer, RasterColormapRenderer, RasterStretchRenderer, RasterShadedReliefRenderer, VectorFieldRenderer } from "@arcgis/core/rasterRenderers.js";
```

**Since:** 4.13

## Overview

A convenience module for importing renderer classes that can be used to render ImageryLayer when developing with TypeScript. For example, rather than importing renderers one at a time like this: import FlowRenderer from "@arcgis/core/renderers/FlowRenderer.js"; import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js"; import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js"; import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer.js"; import RasterColormapRenderer from "@arcgis/core/renderers/RasterColormapRenderer.js"; import RasterShadedReliefRenderer from "@arcgis/core/renderers/RasterShadedReliefRenderer.js"; import VectorFieldRenderer from "@arcgis/core/renderers/VectorFieldRenderer.js"; You can use this module to import them on a single line: import { FlowRenderer, ClassBreaksRenderer, UniqueValueRenderer, RasterColormapRenderer, RasterStretchRenderer, RasterShadedReliefRenderer, VectorFieldRenderer } from "@arcgis/core/rasterRenderers.js"; This module also allows you to implement type guards on renderers, making your code smarter. import { Renderer } from "@arcgis/core/rasterRenderers.js"; function logRenderer(renderer: RasterStretchRenderer): void { if (renderer.type == "raster-stretch") { // the compiler knows the renderer must be a RasterStretchRenderer console.log("renderer color ramp: ", renderer.colorRamp); } }

## See Also

- FlowRenderer
- ClassBreaksRenderer
- UniqueValueRenderer
- RasterColormapRenderer
- RasterStretchRenderer
- RasterShadedReliefRenderer
- VectorFieldRenderer

## Property Details

### `ClassBreaksRenderer`

### `FlowRenderer`

### `RasterColormapRenderer`

### `RasterShadedReliefRenderer`

### `RasterStretchRenderer`

### `UniqueValueRenderer`

### `VectorFieldRenderer`


## Examples

```javascript
import FlowRenderer from "@arcgis/core/renderers/FlowRenderer.js";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer.js";
import RasterColormapRenderer from "@arcgis/core/renderers/RasterColormapRenderer.js";
import RasterShadedReliefRenderer from "@arcgis/core/renderers/RasterShadedReliefRenderer.js";
import VectorFieldRenderer from "@arcgis/core/renderers/VectorFieldRenderer.js";
```

```javascript
import { FlowRenderer, ClassBreaksRenderer, UniqueValueRenderer, RasterColormapRenderer, RasterStretchRenderer, RasterShadedReliefRenderer, VectorFieldRenderer } from "@arcgis/core/rasterRenderers.js";
```

```javascript
import { Renderer } from "@arcgis/core/rasterRenderers.js";

function logRenderer(renderer: RasterStretchRenderer): void {
 if (renderer.type == "raster-stretch") {
   // the compiler knows the renderer must be a RasterStretchRenderer
   console.log("renderer color ramp: ", renderer.colorRamp);
 }
}
```

