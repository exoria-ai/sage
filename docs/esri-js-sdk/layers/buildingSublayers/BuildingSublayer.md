# BuildingSublayer

**Module:** `@arcgis/core/layers/buildingSublayers/BuildingSublayer`

## Import

```javascript
import BuildingSublayer from "@arcgis/core/layers/buildingSublayers/BuildingSublayer.js";
```

```javascript
// CDN
const BuildingSublayer = await $arcgis.import("@arcgis/core/layers/buildingSublayers/BuildingSublayer.js");
```

**Since:** 4.10

## See Also

- Sample - BuildingSceneLayer with Slice widget
- BuildingSceneLayer
- BuildingComponentSublayer
- BuildingGroupSublayer
- SceneLayer

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `id`

### `isEmpty`

### `modelName`

### `opacity`

### `title`

### `uid`

### `visible`

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
// use modelName to identify a sublayer
const doorslayer = buildingSceneLayer.allSublayers.find(function(sublayer) {
  return sublayer.modelName === "Doors";
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

