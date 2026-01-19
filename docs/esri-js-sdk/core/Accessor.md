# Accessor

**Module:** `@arcgis/core/core/Accessor`

## Import

```javascript
import Accessor from "@arcgis/core/core/Accessor.js";
```

```javascript
// CDN
const Accessor = await $arcgis.import("@arcgis/core/core/Accessor.js");
```

**Since:** 4.0

## See Also

- Guide - Implementing Accessor
- Guide - Watching for component changes
- Guide - Watching for changes
- Get started - TypeScript
- Guide - Implementing Accessor

## Property Details

### `declaredClass`

### `addHandles`

### `createSubclass`

### `hasHandles`

### `removeHandles`

### `set`

### `watch`

### `WatchHandle`

### `watchCallback`


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

```javascript
// setting the basemap of the map
map.set("basemap", "topo-vector");
// is equivalent to
map.basemap = "topo-vector";

// currying set
let updateViewScale = view.set.bind(view, "scale");
updateViewScale(5000);
```

```javascript
// updating the title of the basemap
map.set("basemap.title", "World Topographic Map");

// is equivalent to
if (map.basemap != null) {
  map.basemap.title = "World Topographic Map";
}
```

```javascript
// setting a viewpoint on the view
view.set({
  center: [-4.4861, 48.3904],
  scale: 5000
});

// currying set
let updateView = view.set.bind(view);

updateView({
  center: [-4.4861, 48.3904],
  scale: 5000
});
```

