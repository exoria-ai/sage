# HighlightOptions

**Module:** `@arcgis/core/views/support/HighlightOptions`

## Import

```javascript
import HighlightOptions from "@arcgis/core/views/support/HighlightOptions.js";
```

```javascript
// CDN
const HighlightOptions = await $arcgis.import("@arcgis/core/views/support/HighlightOptions.js");
```

**Since:** 4.32

## See Also

- View.highlights
- FeatureLayerView.highlight()
- SceneLayerView.highlight()
- Sample: Highlight features by geometry
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- FeatureLayerView.highlight()

## Property Details

### `HighlightOptions`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `fillOpacity`

### `haloColor`

### `haloOpacity`

### `name`

### `shadowColor`

### `shadowDifference`

### `shadowOpacity`

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
// Override the default highlights collection
const view = new MapView({
  map: map,
  // Set the highlight options to be used in the view
  highlights: [
    { name: "default", color: "orange" },
    { name: "temporary", color: "magenta" },
    { name: "oaks", color: "forestgreen", haloOpacity: 0.8, fillOpacity: 0.3 }
  ]
});
```

```javascript
// Highlight features based on a query result

// A handler can be used to remove any previous highlight when applying a new one
let highlight;

// Query for particualar features in a layer and then highlight them with the specified options
view.whenLayerView(treesLayer).then((layerView) => {
  let query = treesLayer.createQuery();
  query.where = "type = 'Quercus'";

  treesLayer.queryFeatures(query).then((result) => {
    // Remove any previous highlight, if it exists
    highlight?.remove();
    // Apply the user-defined "oaks" highlight options to the corresponding tree features
    highlight = layerView.highlight(result.features, {name: "oaks"});
  });
});
```

```javascript
// Use the default highlights collection to apply a highlight to features when you hover over them

// A handler can be used to remove any previous highlight when applying a new one
let hoverHighlight;

view.on("pointer-move", (event) => {
  // Search for features in the featureLayer at the hovered location
  view.hitTest(event, { include: featureLayer }).then((response) => {
    if (response.results.length) {
      const features = response.results.map(result => result.graphic);
      // Remove any previous highlight, if it exists
      hoverHighlight?.remove();
      // Highlight the hit features with the temporary highlight options, which are pre-configured for this use case
      hoverHighlight = layerView.highlight(features, {name: "temporary"});
    }
  }).catch((error) => {
    console.error("Error during hitTest:", error);
  });
```

```javascript
// SceneView highlights with shadow settings configured
const view = new SceneView({
  map: map,
  highlights: [
    {
      name: "oaks"
      color: "forestgreen",
      haloColor: "green",
      haloOpacity: 0.9,
      fillOpacity: 0.2,
      shadowColor: "goldenrod",
      shadowOpacity: 0.5
    }
  ]
});
```

```javascript
// A handler can be used to remove any previous highlight when applying a new one
let highlight;

// Query for particualar features in a layer and then highlight them with the specified options
view.whenLayerView(treesLayer).then((layerView) => {
  let query = treesLayer.createQuery();
  query.where = "type = 'Quercus'";
  treesLayer.queryFeatures(query).then((result) => {
    // Remove any previous highlight, if it exists
    highlight?.remove();
    // Apply the user-defined "oaks" highlight options to the corresponding tree features
    highlight = layerView.highlight(result.features, {name: "oaks"});
  });
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

