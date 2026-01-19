# Slide

**Module:** `@arcgis/core/webscene/Slide`

## Import

```javascript
import Slide from "@arcgis/core/webscene/Slide.js";
```

```javascript
// CDN
const Slide = await $arcgis.import("@arcgis/core/webscene/Slide.js");
```

**Since:** 4.0

## See Also

- Presentation
- Sample - WebScene slides

## Property Details

### `Slide`

### `basemap`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `elements`

### `enabledFocusAreas`

### `environment`

### `ground`

### `hidden`

### `id`

### `layout`

### `thumbnail`

### `timeExtent`

### `title`

### `viewpoint`

### `visibleLayers`

### `addHandles`
- **Type:** `Inherited`

### `applyTo`

### `clone`

### `createFrom`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `updateFrom`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a slide from a view and apply it at a later time
Slide.createFrom(view).then(function(slide) {
  // Add slide to the scene presentation
  scene.presentation.slides.add(slide);
});

// At a later time
let firstSlide = scene.presentation.slides.at(0);

firstSlide.applyTo(view).then(function() {
  // Slide has been successfully applied to the view
});
```

```javascript
// Update the slide to only enable the first focus area in the map.
slide.enabledFocusAreas = [ view.map.focusAreas.areas.at(0).id ];
```

```javascript
// Update the visible layers to the second layer in the scene, and the
// first elevation layer in the ground.
slide.visibleLayers = [
  { id: scene.layers.at(1).id }
  { id: scene.ground.layers.at(0).id }
];

// Equivalent using convenience autocasting
slide.visibleLayers = [scene.layers.at(0), scene.ground.layers.at(0)];
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
// Applies the slide's settings to the view, but does
// not use animation when updating the viewpoint
slide.applyTo(view, {
  animate: false
});
```

```javascript
// Applies the slide's settings to the view, animates with a maximum
// duration of 2 seconds.
slide.applyTo(view, {
  maxDuration: 2000
});
```

