# LayerView

**Module:** `@arcgis/core/views/layers/LayerView`

## Import

```javascript
import LayerView from "@arcgis/core/views/layers/LayerView.js";
```

```javascript
// CDN
const LayerView = await $arcgis.import("@arcgis/core/views/layers/LayerView.js");
```

**Since:** 4.0

## See Also

- View.whenLayerView()
- MapView.whenLayerView()
- SceneView.whenLayerView()
- suspended
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `layer`

### `spatialReferenceSupported`

### `suspended`

### `uid`

### `updating`

### `view`

### `visible`

### `visibleAtCurrentScale`

### `visibleAtCurrentTimeExtent`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `removeHandles`
- **Type:** `Inherited`

### `when`


## Method Details

### `Method Details()`


## Examples

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
// Although this example uses MapView, any class instance that is a promise may use when() in the same way
let view = new MapView();
view.when(function(){
  // This function will execute once the promise is resolved
}, function(error){
  // This function will execute if the promise is rejected due to an error
});
```

