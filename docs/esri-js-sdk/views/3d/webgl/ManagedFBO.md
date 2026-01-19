# ManagedFBO

**Module:** `@arcgis/core/views/3d/webgl/ManagedFBO`

## Import

```javascript
import ManagedFBO from "@arcgis/core/views/3d/webgl/ManagedFBO.js";
```

```javascript
// CDN
const ManagedFBO = await $arcgis.import("@arcgis/core/views/3d/webgl/ManagedFBO.js");
```

**Since:** 4.29

## Overview

ManagedFBO is an interface to represent a framebuffer object resource of the SceneView. ManagedFBO are used in custom RenderNodes to access current render states of the frame as well as return modified frame states to the render pipeline. Important guidelines This interface is experimental. Please read the following information carefully before using it in a product: It is not possible to shield users of this interface from SceneView internal implementation details. Therefore, this interface should be considered not stable and subject to changes in upcoming minor releases of the ArcGIS Maps SDK for JavaScript. Because of the complex nature of WebGL and hardware-accelerated 3D rendering, this interface is targeting expert developers that are experienced with WebGL or OpenGL. Improper use of WebGL might not only break the custom rendering, but also the rendering of SceneView itself. Esri does not provide any support for issues related to WebGL rendering in custom rendering code, or for issues that arise in SceneView rendering while using custom rendering code. Integration with third-party libraries is only possible under certain conditions. Specifically, the third-party library has to be capable of working on the same WebGL context as SceneView, and able to set the relevant parts of the WebGL state in every frame.

## Property Details

### `name`

### `acquireColor`

### `acquireDepth`

### `attachColor`

### `attachDepth`

### `getAttachment`

### `getTexture`

### `release`

### `retain`

### `ColorAttachment`

### `DepthAttachment`

### `FBOTexture`

### `ManagedColorAttachment`

### `ManagedDepthAttachment`


## Method Details

### `Method Details()`

