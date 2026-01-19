# GamepadSettings

**Module:** `@arcgis/core/views/input/gamepad/GamepadSettings`

## Import

```javascript
import GamepadSettings from "@arcgis/core/views/input/gamepad/GamepadSettings.js";
```

```javascript
// CDN
const GamepadSettings = await $arcgis.import("@arcgis/core/views/input/gamepad/GamepadSettings.js");
```

**Since:** 4.9

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `devices`

### `enabledFocusMode`

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
const { devices } = view.input.gamepad;
devices.on("change", () => {
  console.log(`Available devices...`);
  for (const gamepad of devices) {
    const { id, index } = gamepad.native;
    console.log(`
      Device name:  ${id}
      Device index: ${index}
    `);
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

