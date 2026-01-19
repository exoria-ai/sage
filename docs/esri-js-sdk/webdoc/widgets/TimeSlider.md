# TimeSlider

**Module:** `@arcgis/core/webdoc/widgets/TimeSlider`

## Import

```javascript
import TimeSlider from "@arcgis/core/webdoc/widgets/TimeSlider.js";
```

```javascript
// CDN
const TimeSlider = await $arcgis.import("@arcgis/core/webdoc/widgets/TimeSlider.js");
```

**Since:** 4.30

## See Also

- WebMap.widgets
- WebScene.widgets
- TimeSlider

## Property Details

### `TimeSlider`

### `currentTimeExtent`

### `declaredClass`
- **Type:** `Inherited`

### `fullTimeExtent`

### `loop`

### `numStops`

### `numThumbs`

### `stopDelay`

### `stopInterval`

### `stops`

### `addHandles`
- **Type:** `Inherited`

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

