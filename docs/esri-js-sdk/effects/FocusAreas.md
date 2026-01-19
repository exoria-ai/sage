# FocusAreas

**Module:** `@arcgis/core/effects/FocusAreas`

## Import

```javascript
import FocusAreas from "@arcgis/core/effects/FocusAreas.js";
```

```javascript
// CDN
const FocusAreas = await $arcgis.import("@arcgis/core/effects/FocusAreas.js");
```

**Since:** 4.33

## See Also

- Sample - Focus Area
- FocusArea
- Map

## Property Details

### `FocusAreas`

### `areas`

### `declaredClass`
- **Type:** `Inherited`

### `style`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
// Adding a focus area to map.
const focusAreaPolygon = new Polygon({
 spatialReference: { wkid: 102100 },
 rings: [[
  [1288603, 6130075],
  [1288415, 6130021],
  [1288459, 6130133],
  [1288603, 6130075],
 ]],
});

const focusArea = new FocusArea({
 outline: { color: [255, 128, 128, 0.55] },
 geometries: new Collection([focusAreaPolygon]),
});

map.focusAreas.areas.add(focusArea);
map.focusAreas.style = "dark";
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

