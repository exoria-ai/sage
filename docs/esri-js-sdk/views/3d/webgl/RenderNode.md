# RenderNode

**Module:** `@arcgis/core/views/3d/webgl/RenderNode`

## Import

```javascript
import RenderNode from "@arcgis/core/views/3d/webgl/RenderNode.js";
```

```javascript
// CDN
const RenderNode = await $arcgis.import("@arcgis/core/views/3d/webgl/RenderNode.js");
```

**Since:** 4.29

## Overview

The RenderNode provides low level access to the render pipeline of the SceneView to create custom visualizations and effects. Render nodes inject custom WebGL code in different stages of the render pipeline to alter their outputs. Important guidelines This interface is experimental. Please read the following information carefully before using it in a product: It is not possible to shield users of this interface from SceneView internal implementation details. Therefore, this interface should be considered not stable and subject to changes in upcoming minor releases of the ArcGIS Maps SDK for JavaScript. Because of the complex nature of WebGL and hardware-accelerated 3D rendering, this interface is targeting expert developers that are experienced with WebGL or OpenGL. Improper use of WebGL might not only break the custom rendering, but also the rendering of SceneView itself. Esri does not provide any support for issues related to WebGL rendering in custom rendering code, or for issues that arise in SceneView rendering while using custom rendering code. Integration with third-party libraries is only possible under certain conditions. Specifically, the third-party library has to be capable of working on the same WebGL context as SceneView, and able to set the relevant parts of the WebGL state in every frame. Usage A RenderNode subclass is linked to a specific SceneView during construction: new LuminanceRenderNode({ view }); A RenderNode subclass is created using createSubclass. This example node modifies the "composite-color" output of the render pipeline: const LuminanceRenderNode = RenderNode.createSubclass({ consumes: { required: ["composite-color"] } produces: ["composite-color"] render(inputs) { // custom render code } }); Modifying render graph outputs Rendering a single frame in SceneView traverses the individual nodes of the internal render graph of the SceneView. Every time a node is traversed, the render engine will modify or create framebuffers. For example, the render graph in the images shown below contains nodes which render buildings, one transparent cube, the terrain with textures, atmosphere effects, and post processing effects such as antialiasing. Depending on the SceneView properties and layer configuration, the rendering engine modifies the render graph to traverse the nodes which are required to produce the configured rendering. The chronological render order of the render graph is given by the input-output dependencies between the nodes in the graph. For example, transparent geometry is rendered after all opaque geometry. The RenderNode class offers a way to inject custom render code to this render pipeline. Currently the following outputs can be modified by custom render nodes: opaque-color transparent-color composite-color final-color Opaque color contains all non-transparent 3D geometries. Transparent color contains opaque-color and all transparent 3D geometries. Composite color contains all 3D content, but not 2D content such as icons and highlights. Important to note is that the chronological order for traversing the render graph does not correspond to the object location in the frame. For example, all opaque objects are rendered first even if they are behind transparent objects. Depth testing and alpha blending will create the correct visibility. Once the injection point is declared with produces, the render function needs to return this output in a ManagedFBO for the RenderNode to be correctly traversed. The output is also provided as an input, and typically this input is read as a texture or bound as the framebuffer to create the output. See produces and RenderNodeOutput for details. RenderNode inputs Every RenderNode requires some input framebuffer objects. Typically a node will modify the state of a framebuffer, using its output also as a required input. The RenderNode offers additional input targets to be used as inputs for a rendering code. These are used for advanced graphics effects. The following additional inputs are available: composite-color composite-color depth attachment highlights normals If one of the required inputs is not available then this RenderNode will be skipped during the frame. For example, a custom RenderNode using highlights as required input will only render if highlights are present in the scene. Optional inputs do not cause the render node to be skipped while rendering. If optional inputs are not available they will not be present in the input parameter of the render function. Note that there are restrictions in availability due to the implicit ordering of the render graph as well. For example, opaque-color cannot require composite-color. See details in RenderNodeInput. Managed framebuffer objects and attachments All render nodes have in common that they alter the state of a framebuffer object. This happens either by simply drawing additional geometry "on top" of the input framebuffer, or by using the input as a Texture, e.g. to apply a post processing effect. See WebGL tutorials or the WebGL documentation to get familiar with the concept of framebuffer objects. The ManagedFBO is a wrapper interface to request and provide framebuffer content to the render engine of the SceneView.The ManagedFBO exposes the necessary interface to reference count these framebuffer and attached textures to render nodes. See ManagedFBO for details. Coordinate systems When working with custom render nodes, coordinates have to be specified in the internal rendering coordinate system of SceneView. This coordinate system depends on the viewingMode of the view: In local viewing mode, it is equal to the coordinate system defined by the spatial reference of the view. In global viewing mode, it is an ECEF coordinate system where the X-axis points to 0°N 0°E, the Y-axis points to 0°N 90°E, and the Z-axis points to the North Pole. The virtual globe is drawn as a perfect sphere with a radius of 6378137, so the unit of the coordinate system should be considered meters. You can use toRenderCoordinates() and fromRenderCoordinates() to transform to and from the rendering coordinate system without having to worry about viewingMode and the exact coordinate system definition. Precision and local origins In global scenes, the precision of 32-bit floating point arithmetic is not sufficient for visualizations that go beyond global scale (i.e. country scale to city scale). When zooming the view beyond a certain scale, geometries will appear to wobble or jitter, and generally appear displaced. The same applies to local scenes where geometries are far away from the origin of the coordinate system. In general, you should ensure that all arithmetic done in JavaScript is done in double precision. This is the case for normal JavaScript arithmetic, but you should specifically avoid using Float32Array unless you can rule out precision issues. However, WebGL does not support 64 bit floating point arithmetic. A simple way to work around this limitation is to render scenes with a local origin: Pick a local origin position, approximately at the center of your data. Subtract the local origin position from all positional data (vertex data, uniforms, etc.) before passing it into WebGL. Translate the view transformation matrix by the origin (pre-multiply the view transformation matrix by the origin translation matrix) This technique will cause the data to be rendered in a local coordinate frame, and thus avoid the large numbers which would otherwise be needed to place the data at the right location. Multiple local origins are needed if the data covers large extents with high detail. Note that the local origin has to be representable exactly in 32 bit floating point, which is best achieved by storing the local origin itself as a Float32Array.

## See Also

- Sample - Custom Render Node - Color modification
- Sample - Custom Render Node - Depth of field
- Sample - Custom Render Node - Crossfade slide transition
- Sample - Custom Render Node - Windmills

## Property Details

### `RenderNode`

### `camera`

### `consumes`

### `declaredClass`
- **Type:** `Inherited`

### `gl`

### `produces`

### `sunLight`

### `view`

### `acquireOutputFramebuffer`

### `addHandles`
- **Type:** `Inherited`

### `bindRenderTarget`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`

### `requestRender`

### `resetWebGLState`

### `ColorAndIntensity`

### `SunLight`


## Method Details

### `Method Details()`


## Examples

```javascript
new LuminanceRenderNode({ view });
```

```javascript
const LuminanceRenderNode = RenderNode.createSubclass({
   consumes: { required: ["composite-color"] }
   produces: ["composite-color"]
   render(inputs) {
      // custom render code
   }
 });
```

```javascript
consumes: { required: ["composite-color" , "normals"], optional: ["highlights"] }
```

```javascript
// A grayscale RenderNode producing "composite-color" rendering into a color output
// framebuffer, and then reuses the unmodified input depth texture:
render(inputs) {
   const input = inputs.find(({ name }) => name === "composite-color")!;
   const output = this.acquireOutputFramebuffer();

   gl.activeTexture(gl.TEXTURE0);
   gl.bindTexture(gl.TEXTURE_2D, input.getTexture().glName);
   gl.uniform1i(this.textureUniformLocation, 0);

   // ...render grayscale using input texture

   output.attachDepth(input.getAttachment(gl.DEPTH_STENCIL_ATTACHMENT));
   return output;
 }
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

