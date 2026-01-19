# BuildingGroupSublayer

**Module:** `@arcgis/core/layers/buildingSublayers/BuildingGroupSublayer`

## Import

```javascript
import BuildingGroupSublayer from "@arcgis/core/layers/buildingSublayers/BuildingGroupSublayer.js";
```

```javascript
// CDN
const BuildingGroupSublayer = await $arcgis.import("@arcgis/core/layers/buildingSublayers/BuildingGroupSublayer.js");
```

**Since:** 4.10

## See Also

- Sample - BuildingSceneLayer with Slice widget
- BuildingSceneLayer
- BuildingComponentSublayer
- load

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `isEmpty`
- **Type:** `Inherited`

### `listMode`

### `modelName`
- **Type:** `Inherited`

### `opacity`
- **Type:** `Inherited`

### `sublayers`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `loadAll`

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
// Load all contained sublayers but ignore if one or more of them failed to load
buildingGroupSublayer.loadAll()
  .catch(function(error) {
    // Ignore any failed resources
  })
  .then(function() {
    console.log("All loaded");
  });
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

