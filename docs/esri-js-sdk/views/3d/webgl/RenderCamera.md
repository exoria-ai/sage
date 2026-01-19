# RenderCamera

**Module:** `@arcgis/core/views/3d/webgl/RenderCamera`

## Import

```javascript
import RenderCamera from "@arcgis/core/views/3d/webgl/RenderCamera.js";
```

```javascript
// CDN
const RenderCamera = await $arcgis.import("@arcgis/core/views/3d/webgl/RenderCamera.js");
```

**Since:** 4.30

## Overview

This is the RenderCamera interface used by the SceneView. The RenderCamera specifies the view position and orientation in render coordinates only. See section on coordinate systems for details. The render camera is distinct from Camera and is meant to be worked with when using RenderNode. Important guidelines This interface is experimental. Please read the following information carefully before using it in a product: It is not possible to shield users of this interface from SceneView internal implementation details. Therefore, this interface should be considered not stable and subject to changes in upcoming minor releases of the ArcGIS Maps SDK for JavaScript. Because of the complex nature of WebGL and hardware-accelerated 3D rendering, this interface is targeting expert developers that are experienced with WebGL or OpenGL. Improper use of WebGL might not only break the custom rendering, but also the rendering of SceneView itself. Esri does not provide any support for issues related to WebGL rendering in custom rendering code, or for issues that arise in SceneView rendering while using custom rendering code. Integration with third-party libraries is only possible under certain conditions. Specifically, the third-party library has to be capable of working on the same WebGL context as SceneView, and able to set the relevant parts of the WebGL state in every frame. In this documentation vectors (Vec3 and Vec4) are presented as arrays of numbers. Matrices (Mat4) are presented as arrays with 16 elements following the WebGL conventions where the translation component occupies the 13th, 14th, and 15th elements.

## Property Details

### `center`

### `eye`

### `far`

### `fovX`

### `fovY`

### `near`

### `pixelRatio`

### `projectionMatrix`

### `up`

### `viewInverseTransposeMatrix`

### `viewMatrix`

### `viewport`

