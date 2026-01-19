# MeshMaterial

**Module:** `@arcgis/core/geometry/support/MeshMaterial`

## Import

```javascript
import MeshMaterial from "@arcgis/core/geometry/support/MeshMaterial.js";
```

```javascript
// CDN
const MeshMaterial = await $arcgis.import("@arcgis/core/geometry/support/MeshMaterial.js");
```

**Since:** 4.11

## See Also

- MeshComponent
- Sample - Working with 3d mesh primitives
- Sample - Low poly terrain using mesh geometry

## Property Details

### `MeshMaterial`

### `alphaCutoff`

### `alphaMode`

### `color`

### `colorTexture`

### `colorTextureTransform`

### `declaredClass`
- **Type:** `Inherited`

### `doubleSided`

### `normalTexture`

### `normalTextureTransform`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// create a material that uses a color

const meshWithColor = new MeshComponent({
  // autocasts to MeshMaterial
  material: {
    color: "#ff00ff"
  }
});

// create a material that uses a texture by linking to
// an image url

const meshTextureByUrl = new MeshTexture({
  url: "./image.png"
});

const boxMesh = Mesh.createBox(location, {
  material: {
    colorTexture: meshTextureByUrl
  }
});

// create a material that uses a texture from
// a canvas element

function createLinearGradient() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;

  const ctx = canvas.getContext("2d");

  // Create the linear gradient with which to fill the canvas
  const gradient = ctx.createLinearGradient(0, 0, 0, 32);
  gradient.addColorStop(0, "#00ff00");
  gradient.addColorStop(1, "#009900");

  // Fill the canvas with the gradient pattern
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  return canvas;
}

const component = new MeshComponent({
  material: {
    // Autocast canvas element to MeshTexture instance
    colorTexture: createLinearGradient()
  }
});
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

