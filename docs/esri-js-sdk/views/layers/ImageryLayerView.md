# ImageryLayerView

**Module:** `@arcgis/core/views/layers/ImageryLayerView`

## Import

```javascript
import ImageryLayerView from "@arcgis/core/views/layers/ImageryLayerView.js";
```

**Since:** 4.0

## See Also

- ImageryLayer
- Sample - Access pixel values in an ImageryLayer
- highlight()
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- Sample - Access pixel values in an ImageryLayer
- suspended
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended
- View.highlights
- Sample: Highlight point features

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `highlightOptions`

### `layer`
- **Type:** `Inherited`

### `pixelData`

### `spatialReferenceSupported`
- **Type:** `Inherited`

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

### `getSourceScale`

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
// Features in the layerview will be highlighted with bright
// yellow colors in the map.
const layerView = await view.whenLayerView(layer);
layerView.highlightOptions = {
  color: [255, 255, 0, 1],
  haloOpacity: 0.9,
  fillOpacity: 0.2
};
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

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
// Highlight features based on a query result

// Add a new set of highlight options to the view's highlights collection
view.highlights.push({
  name: "forest",
  color: "#forestgreen",
  haloOpacity: 0.8,
  fillOpacity: 0.3
});

// A handler can be used to remove any previous highlight when applying a new one
let highlight;

view.whenLayerView(layer).then((layerView) => {
  let query = layer.createQuery();
  query.where = "Category = 'Forested'";
  layer.queryRasters(query).then((result) => {
    // Remove any previous highlight, if it exists
    highlight?.remove();
    // Apply the "forest" highlight options to the corresponding features
    highlight = layerView.highlight(result.features, { name: "forest" });
  });
});
```

