# GraphicsLayerView

**Module:** `@arcgis/core/views/layers/GraphicsLayerView`

## Import

```javascript
import GraphicsLayerView from "@arcgis/core/views/layers/GraphicsLayerView.js";
```

**Since:** 4.4

## See Also

- GraphicsLayer
- highlight()
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- suspended
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended
- View.highlights
- Sample: Highlight features by geometry
- Sample: Highlight point features

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `highlightOptions`

### `layer`
- **Type:** `Inherited`

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

### `hasHandles`
- **Type:** `Inherited`

### `highlight`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `queryGraphics`

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
  name: "oaks",
  color: "forestgreen",
  haloOpacity: 0.8,
  fillOpacity: 0.3
});

// A handler can be used to remove any previous highlight when applying a new one
let highlight;

// Query for particualar features in a layer and then highlight them with the specified options
view.whenLayerView(treesLayer).then((layerView) => {
  let query = treesLayer.createQuery();
  query.where = "type = 'Quercus'";

  treesLayer.queryFeatures(query).then((result) => {
    // Remove any previous highlight, if it exists
    highlight?.remove();
    // Apply the "oaks" highlight options to the corresponding tree features
    highlight = layerView.highlight(result.features, {name: "oaks"});
  });
});
```

