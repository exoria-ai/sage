# DirectionalPadViewModel

**Module:** `@arcgis/core/widgets/DirectionalPad/DirectionalPadViewModel`

## Import

```javascript
import DirectionalPadVM from "@arcgis/core/widgets/DirectionalPad/DirectionalPadViewModel.js";
```

```javascript
// CDN
const DirectionalPadVM = await $arcgis.import("@arcgis/core/widgets/DirectionalPad/DirectionalPadViewModel.js");
```

**Since:** 4.29

## See Also

- DirectionalPad
- Directional Pad component
- Programming patterns: Widget viewModel pattern

## Property Details

### `DirectionalPadViewModel`

### `angle`

### `declaredClass`
- **Type:** `Inherited`

### `disabled`

### `rotation`

### `state`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `beginFollowingPointer`

### `hasHandles`
- **Type:** `Inherited`

### `moveOnce`

### `removeHandles`
- **Type:** `Inherited`

### `Vector`


## Method Details

### `Method Details()`


## Examples

```javascript
reactiveUtils.watch(
 ()=>directionalPadViewModel.rotation,
 (newAngle,oldAngle)=> console.log({ newAngle, oldAngle })
);
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
moveLeftButton.addEventListener("pointerDown", (event) => {
  const { x, y, width, height } = buttonsContainer.getBoundingClientRect();
  const widgetCenter = { x: x + width / 2, y: y + height / 2 };
  directionalPadViewModel.beginFollowingPointer(event, widgetCenter);
});
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
moveLeftButton.addEventListener("keydown", () => {
  directionalPadViewModel.moveOnce(90);
});
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

