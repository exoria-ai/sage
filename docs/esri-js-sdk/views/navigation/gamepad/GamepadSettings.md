# GamepadSettings

**Module:** `@arcgis/core/views/navigation/gamepad/GamepadSettings`

## Import

```javascript
import GamepadSettings from "@arcgis/core/views/navigation/gamepad/GamepadSettings.js";
```

```javascript
// CDN
const GamepadSettings = await $arcgis.import("@arcgis/core/views/navigation/gamepad/GamepadSettings.js");
```

**Since:** 4.9

## See Also

- View.input.gamepad.devices

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `device`

### `enabled`

### `mode`

### `tiltDirection`

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
// Setting the navigation mode to "zoom"
sceneView.navigation.gamepad.mode = "zoom";
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

