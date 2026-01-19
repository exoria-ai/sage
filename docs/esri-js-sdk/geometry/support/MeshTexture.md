# MeshTexture

**Module:** `@arcgis/core/geometry/support/MeshTexture`

## Import

```javascript
import MeshTexture from "@arcgis/core/geometry/support/MeshTexture.js";
```

```javascript
// CDN
const MeshTexture = await $arcgis.import("@arcgis/core/geometry/support/MeshTexture.js");
```

**Since:** 4.11

## See Also

- MeshMaterial
- Mesh
- Sample - Working with 3d mesh primitives

## Property Details

### `MeshTexture`

### `data`

### `declaredClass`
- **Type:** `Inherited`

### `transparent`

### `url`

### `wrap`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `CompressedTextureData`

### `SeparableWrapModes`


## Method Details

### `Method Details()`


## Examples

```javascript
const meshColorByUrl = new MeshTexture({
  url: "./image.png"
});

const mesh = Mesh.createBox(location, {
  material: {
    colorTexture: meshColorByUrl
  }
});

const meshColorByCanvas = new MeshTexture({
  data: canvasElement
});

const meshWithCanvasMaterial = Mesh.createBox(location, {
  material: {
    colorTexture: meshColorByCanvas
  }
});

// Support for autocasting within a mesh material constructor
const meshWithAutocastMaterial = Mesh.createSphere(location, {
  material: {
    colorTexture: {
      url: "./image.png"
    }
  }
});

// Mesh materials also support additional advanced autocasting types
// such as a Canvas element. In this case the canvas element will be
// available in the MeshTexture.data property.
const meshWithCanvasAutocastMaterial = Mesh.createSphere(location, {
  material: {
    colorTexture: canvasElement
  }
});

// When using a video as a texture, you need to create a Video element
// and pass it in the MeshTexture.data property.
const video = document.createElement("video");
video.src = "./my-video.mp4";
video.crossOrigin = "anonymous";
video.autoplay = true;
video.muted = true;
// The video needs to be added to the DOM and be located in
// the viewport in order for it to play
document.body.appendChild(video);
video.style.position = "absolute";
video.style.top = 0;
// Hide the video element
video.style.height = 0;
video.style.visibility = "hidden";

const meshWithVideoMaterial = Mesh.createPlane(location, {
 material: {
   colorTexture: { data: video }
 }
});
```

```javascript
{
  vertical: "clamp",
  horizontal: "repeat"
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

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

