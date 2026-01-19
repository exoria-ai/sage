# ScaleRangeSlider

**Module:** `@arcgis/core/widgets/ScaleRangeSlider`

## Import

```javascript
import ScaleRangeSlider from "@arcgis/core/widgets/ScaleRangeSlider.js";
```

```javascript
// CDN
const ScaleRangeSlider = await $arcgis.import("@arcgis/core/widgets/ScaleRangeSlider.js");
```

**Since:** 4.13

## See Also

- ScaleRangeSliderViewModel
- ScaleRanges
- Slider
- Calcite Icon Search

## Property Details

### `ScaleRangeSlider`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `layer`

### `maxScale`

### `maxScaleLimit`

### `minScale`

### `minScaleLimit`

### `mode`

### `region`

### `showWorldValue`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

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

### `SupportedRegion`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const scaleRangeSlider = new ScaleRangeSlider({
  view: view,
  layer: featureLayer,  // scale range of this layer sets initial minScale and maxScale
  region: "MX",  // preview thumbnail will be of Mexico
});
view.ui.add(scaleRangeSlider, "bottom-left");

// to update the featureLayer min/max scale based on the slider
reactiveUtils.watch(
  () => [scaleRangeSlider.minScale, scaleRangeSlider.maxScale],
  ([minScale, maxScale]) => {
    featureLayer.minScale = minScale;
    featureLayer.maxScale = maxScale;
  }
);
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

```javascript
// Hides the widget in the view
widget.visible = false;
```

```javascript
scaleRangeSlider.visibleElements = {
  preview: false  // thumbnail preview of map will not be displayed
}
```

