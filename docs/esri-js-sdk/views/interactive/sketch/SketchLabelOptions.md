# SketchLabelOptions

**Module:** `@arcgis/core/views/interactive/sketch/SketchLabelOptions`

## Import

```javascript
import SketchLabelOptions from "@arcgis/core/views/interactive/sketch/SketchLabelOptions.js";
```

```javascript
// CDN
const SketchLabelOptions = await $arcgis.import("@arcgis/core/views/interactive/sketch/SketchLabelOptions.js");
```

**Since:** 4.24

## See Also

- Sketch
- SketchViewModel
- SketchTooltipOptions
- SketchValueOptions
- Editor
- Sample - Sketch in 3D
- Sample - Edit features in 3D with the Editor widget

## Property Details

### `SketchLabelOptions`

### `declaredClass`
- **Type:** `Inherited`

### `enabled`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a PortalItem instance for the map used in the 3D view
view.map.portalItem = new PortalItem({
  portal: {
    units: "english" //or "metric"
  },
});
```

```javascript
// Set the units directly on an existing PortalItem of the 3D view
view.map.portalItem.portal.units = "english" //or "metric"
```

```javascript
// Create an instance of a new Portal and set the unit
const portal = Portal.getDefault();
portal.units = "english" //or "metric"
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

