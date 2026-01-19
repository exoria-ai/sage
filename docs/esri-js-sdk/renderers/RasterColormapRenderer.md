# RasterColormapRenderer

**Module:** `@arcgis/core/renderers/RasterColormapRenderer`

## Import

```javascript
import RasterColormapRenderer from "@arcgis/core/renderers/RasterColormapRenderer.js";
```

```javascript
// CDN
const RasterColormapRenderer = await $arcgis.import("@arcgis/core/renderers/RasterColormapRenderer.js");
```

**Since:** 4.16

## Property Details

### `RasterColormapRenderer`

### `colormapInfos`

### `declaredClass`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `createFromColormap`

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
// create a new RasterColormapRenderer from provided the colormap array
const renderer = RasterColormapRenderer.createFromColormap(colors);
```

```javascript
// create a new RasterColormapRenderer
const renderer = new RasterColormapRenderer({
 colormapInfos: colormapInfos
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
// Creates a deep clone of the first layer's renderer
let renderer = view.map.layers.at(0).renderer.clone();
```

```javascript
// create a color map where values 0-199 are pink and 200-250 are light blue.
let colors = [];
for (let i = 0; i <= 250; i++) {
  if (i < 200) {
    colors.push([i, 250, 0, 128]);
  } else {
    colors.push([i, 0, 128, 250]);
  }
}

// create a RasterColormapRenderer from the colors array
const renderer = RasterColormapRenderer.createFromColormap(colors);
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

