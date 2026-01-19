# pointCloudRenderers

**Module:** `@arcgis/core/pointCloudRenderers`

## Import

```javascript
import * as pointCloudRenderers from "@arcgis/core/pointCloudRenderers.js";
```

```javascript
// CDN
const pointCloudRenderers = await $arcgis.import("@arcgis/core/pointCloudRenderers.js");
```

```javascript
import PointCloudClassBreaksRenderer from "@arcgis/core/renderers/PointCloudClassBreaksRenderer.js";
import PointCloudRGBRenderer from "@arcgis/core/renderers/PointCloudRGBRenderer.js";
import PointCloudStretchRenderer from "@arcgis/core/renderers/PointCloudStretchRenderer.js";
import PointCloudUniqueValueRenderer from "@arcgis/core/renderers/PointCloudUniqueValueRenderer.js";
```

**Since:** 4.8

## Overview

A convenience module for importing PointCloudRenderer classes when developing with TypeScript. For example, rather than importing renderers one at a time like this: import PointCloudClassBreaksRenderer from "@arcgis/core/renderers/PointCloudClassBreaksRenderer.js"; import PointCloudRGBRenderer from "@arcgis/core/renderers/PointCloudRGBRenderer.js"; import PointCloudStretchRenderer from "@arcgis/core/renderers/PointCloudStretchRenderer.js"; import PointCloudUniqueValueRenderer from "@arcgis/core/renderers/PointCloudUniqueValueRenderer.js"; You can use this module to import them on a single line: import { PointCloudClassBreaksRenderer, PointCloudRGBRenderer, PointCloudStretchRenderer, PointCloudUniqueValueRenderer } from "@arcgis/core/pointCloudRenderers.js"; This module also allows you to implement type guards on renderers, making your code smarter. import { PointCloudRenderer } from "@arcgis/core/pointCloudRenderers.js"; function logInfos(renderer: PointCloudRenderer): void { if (renderer.type === "point-cloud-class-breaks") { // new at 4.8, the compiler knows the renderer is a PointCloudClassBreaksRenderer console.log("renderer colorClassBreakInfos: ", renderer.colorClassBreakInfos); } }

## See Also

- PointCloudClassBreaksRenderer
- PointCloudRGBRenderer
- PointCloudStretchRenderer
- PointCloudUniqueValueRenderer

## Property Details

### `PointCloudClassBreaksRenderer`

### `PointCloudRGBRenderer`

### `PointCloudRenderer`

### `PointCloudStretchRenderer`

### `PointCloudUniqueValueRenderer`


## Examples

```javascript
import PointCloudClassBreaksRenderer from "@arcgis/core/renderers/PointCloudClassBreaksRenderer.js";
import PointCloudRGBRenderer from "@arcgis/core/renderers/PointCloudRGBRenderer.js";
import PointCloudStretchRenderer from "@arcgis/core/renderers/PointCloudStretchRenderer.js";
import PointCloudUniqueValueRenderer from "@arcgis/core/renderers/PointCloudUniqueValueRenderer.js";
```

```javascript
import {
  PointCloudClassBreaksRenderer,
  PointCloudRGBRenderer,
  PointCloudStretchRenderer,
  PointCloudUniqueValueRenderer
} from "@arcgis/core/pointCloudRenderers.js";
```

```javascript
import { PointCloudRenderer } from "@arcgis/core/pointCloudRenderers.js";

function logInfos(renderer: PointCloudRenderer): void {
  if (renderer.type === "point-cloud-class-breaks") {
    // new at 4.8, the compiler knows the renderer is a PointCloudClassBreaksRenderer
    console.log("renderer colorClassBreakInfos: ", renderer.colorClassBreakInfos);
  }
}
```

