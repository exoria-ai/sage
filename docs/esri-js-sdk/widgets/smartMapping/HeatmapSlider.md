# HeatmapSlider

**Module:** `@arcgis/core/widgets/smartMapping/HeatmapSlider`

## Import

```javascript
import HeatmapSlider from "@arcgis/core/widgets/smartMapping/HeatmapSlider.js";
```

```javascript
// CDN
const HeatmapSlider = await $arcgis.import("@arcgis/core/widgets/smartMapping/HeatmapSlider.js");
```

**Since:** 4.12

## See Also

- HeatmapSliderViewModel
- heatmapRendererCreator

## Property Details

### `HeatmapSlider`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `label`

### `stops`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fromHeatmapRendererResult`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const params = {
  layer: layer,
  basemap: map.basemap,
  view: view
};

let rendererResult = null;

heatmapRendererCreator
  .createRenderer(params)
  .then(function(response) {
    rendererResult = response;
    layer.renderer = response.renderer;

    const slider = slider.fromRendererResult(rendererResult);
    colorSlider.container = "slider";
  })
   .catch(function(error) {
     console.log("there was an error: ", error);
   });
```

```javascript
// when the user slides the handle(s), update the renderer
// with the updated color stops

slider.on(["thumb-change", "thumb-drag"], function() {
  const renderer = layer.renderer.clone();
  renderer.colorStops = slider.stops;
  layer.renderer = renderer;
});
```

```javascript
const slider = new HeatmapSlider({
  stops: [
    { color: "rgba(63, 40, 102, 0)", ratio: 0 },
    { color: "#472b77", ratio: 0.083 },
    { color: "#4e2d87", ratio: 0.166 },
    { color: "#563098", ratio: 0.249 },
    { color: "#5d32a8", ratio: 0.332 },
    { color: "#6735be", ratio: 0.415 },
    { color: "#7139d4", ratio: 0.498 },
    { color: "#7b3ce9", ratio: 0.581 },
    { color: "#853fff", ratio: 0.664 },
    { color: "#a46fbf", ratio: 0.747 },
    { color: "#c29f80", ratio: 0.83 },
    { color: "#e0cf40", ratio: 0.913 },
    { color: "#ffff00", ratio: 1 }
  ]
});
```

```javascript
// Create the HTML div element programmatically at runtime and set to the widget's container
const basemapGallery = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
// Specify an already-defined HTML div element in the widget's container

const basemapGallery = new BasemapGallery({
  view: view,
  container: basemapGalleryDiv
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});

// HTML markup
<body>
  <div id="viewDiv"></div>
  <div id="basemapGalleryDiv"></div>
</body>
```

```javascript
// Specify the widget while adding to the view's UI
const basemapGallery = new BasemapGallery({
  view: view
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

