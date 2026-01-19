# Daylight

**Module:** `@arcgis/core/widgets/Daylight`

## Import

```javascript
import Daylight from "@arcgis/core/widgets/Daylight.js";
```

```javascript
// CDN
const Daylight = await $arcgis.import("@arcgis/core/widgets/Daylight.js");
```

**Since:** 4.14

## See Also

- Sample - Daylight widget
- DaylightViewModel
- SceneView.environment
- Heading Elements
- Calcite Icon Search

## Property Details

### `Daylight`

### `container`
- **Type:** `Inherited`

### `dateOrSeason`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `playSpeedMultiplier`

### `timeSliderSteps`

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

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const daylight = new Daylight({
  view: view,
  dateOrSeason: "season"
});
```

```javascript
const daylight = new Daylight({
  view: view,
  playSpeedMultiplier: 2
});
```

```javascript
const daylight = new Daylight({
  view: view,
  visibleElements: {
    timezone: false,
    datePicker: false,
    playButtons: false,
    sunLightingToggle: false,
    shadowsToggle: false
  }
});
```

```javascript
// basic usage of the daylight widget using the default settings
const daylight = new Daylight({
  view: view
});
view.ui.add(daylight, "top-right");
```

```javascript
// Typical usage
const daylightWidget = new Daylight({
  view: view
});

view.ui.add(daylightWidget, "top-right");
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

