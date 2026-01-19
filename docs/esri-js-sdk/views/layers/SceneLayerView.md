# SceneLayerView

**Module:** `@arcgis/core/views/layers/SceneLayerView`

## Import

```javascript
import SceneLayerView from "@arcgis/core/views/layers/SceneLayerView.js";
```

**Since:** 4.3

## See Also

- SceneLayer
- Sample - Query SceneLayerView
- Working with scene layers guide topic
- SceneLayer.outFields
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended
- SceneView.highlights
- Sample: Highlight SceneLayer

## Property Details

### `availableFields`

### `declaredClass`
- **Type:** `Inherited`

### `filter`

### `layer`

### `maximumNumberOfFeatures`

### `maximumNumberOfFeaturesExceeded`

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

### `createQuery`

### `hasHandles`
- **Type:** `Inherited`

### `highlight`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


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
// Highlight features based on a layer query result
// This workflow is valid only if the scene layer has an associated feature layer

// Add a new set of highlight options to the view's highlights collection
view.highlights.push({
  name: "oaks",
  color: "forestgreen",
  haloOpacity: 0.8,
  fillOpacity: 0.3
});

// A handler can be used to remove any previous highlight when applying a new one
let highlight;

// Query for particualar features in the layer and then highlight them with the specified options
view.whenLayerView(sceneLayer).then((layerView) => {
 let query = sceneLayer.createQuery();
 query.where = "type = 'Quercus'";

 sceneLayer.queryFeatures(query).then((result) => {
   // Remove any previous highlight, if it exists
   highlight?.remove();
   // Apply the "oaks" highlight options to the corresponding tree features
   highlight = layerView.highlight(result.features, { name: "oaks" });
 })
});
```

```javascript
// Use the default highlights collection to apply a highlight to features when you hover over them

// A handler can be used to remove any previous highlight when applying a new one
let hoverHighlight;

view.on("pointer-move", (event) => {
 // Search for the first feature in the layer at the hovered location
 view.hitTest(event).then((response) => {
   if (response.results[0]) {
     const graphic = response.results[0].graphic;
     view.whenLayerView(graphic.layer).then((layerView) => {
       // Remove any previous highlight, if it exists
       hoverHighlight?.remove();
       // Highlight the hit features with the temporary highlight options, which are pre-configured for this use case
       hoverHighlight = layerView.highlight(graphic, { name: "temporary" });
     })
   }
 })
});
```

