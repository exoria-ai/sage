# BuildingSceneLayerView

**Module:** `@arcgis/core/views/layers/BuildingSceneLayerView`

## Import

```javascript
import BuildingSceneLayerView from "@arcgis/core/views/layers/BuildingSceneLayerView.js";
```

**Since:** 4.17

## See Also

- BuildingSceneLayer
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `layer`

### `sublayerViews`

### `suspended`
- **Type:** `Inherited`

### `uid`
- **Type:** `Inherited`

### `updating`
- **Type:** `Inherited`

### `view`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `visibleAtCurrentScale`
- **Type:** `Inherited`

### `visibleAtCurrentTimeExtent`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `highlight`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// query all the loaded features
view.whenLayerView(buildingSceneLayer).then(function(buildingSceneLayerView) {
   buildingSceneLayerView.sublayerViews.forEach(function(sublayerView) {
       const query = sublayerView.createQuery();
       sublayerView.queryFeatures(query).then(function(result) {
         console.log(result.features);
       });
   });
});
```

```javascript
// on user click, select the first feature in the BuildingSceneLayer
let highlight = null;

view.on("click", function (event) {
  view.hitTest(event.screenPoint, {include: buildingSceneLayer}).then((hitTestResult) => {
    if (highlight) {
      highlight.remove();
      highlight = null;
    }
    if (hitTestResult.results.length) {
      highlight = bslv.highlight(hitTestResult.results[0].graphic);
    }
  });
});
```

```javascript
view.whenLayerView(buildingSceneLayer).then(function(buildingSceneLayerView) {
   console.log(buildingSceneLayerView.sublayerViews);
});
```

```javascript
// Check for the first time layerView.updating becomes false. Then query for
// features that are visible within the view associated with the layer view.
await reactiveUtils.whenOnce(() => !layerView.updating);
const query = layerView.createQuery();
query.geometry = layerView.view.extent;
const result = layerView.queryFeatures(query);
```

```javascript
// Check for the first time layerView.updating becomes false. Then query for
// features that are visible within the view associated with the layer view.
await reactiveUtils.whenOnce(() => !layerView.updating);
const query = layerView.createQuery();
query.geometry = layerView.view.extent;
const result = layerView.queryFeatures(query);
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

