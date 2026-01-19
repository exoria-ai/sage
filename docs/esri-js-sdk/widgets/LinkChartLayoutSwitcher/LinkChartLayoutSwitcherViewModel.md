# LinkChartLayoutSwitcherViewModel

**Module:** `@arcgis/core/widgets/LinkChartLayoutSwitcher/LinkChartLayoutSwitcherViewModel`

## Import

```javascript
import LinkChartLayoutSwitcherVM from "@arcgis/core/widgets/LinkChartLayoutSwitcher/LinkChartLayoutSwitcherViewModel.js";
```

```javascript
// CDN
const LinkChartLayoutSwitcherVM = await $arcgis.import("@arcgis/core/widgets/LinkChartLayoutSwitcher/LinkChartLayoutSwitcherViewModel.js");
```

**Since:** 4.32

## See Also

- Link Chart Layout Switcher component
- Programming patterns: Widget viewModel pattern
- switchLayout()

## Property Details

### `LinkChartLayoutSwitcherViewModel`

### `declaredClass`
- **Type:** `Inherited`

### `layout`

### `preventExtentUpdate`

### `state`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `emit`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `on`

### `removeHandles`
- **Type:** `Inherited`

### `switchLayout`


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
view.on("click", function(event){
  // event is the event handle returned after the event fires.
  console.log(event.mapPoint);
});
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

```javascript
layoutSwitcher.viewModel.on("switchLayout", function(event){
  console.log("Layout Switched");
});
```

