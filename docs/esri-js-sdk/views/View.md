# View

**Module:** `@arcgis/core/views/View`

## Import

```javascript
import View from "@arcgis/core/views/View.js";
```

```javascript
// CDN
const View = await $arcgis.import("@arcgis/core/views/View.js");
```

```javascript
// CDN
const [Map, MapView] = await $arcgis.import(["@arcgis/core/Map.js", "@arcgis/core/views/MapView.js"]);
```

**Since:** 4.0

## See Also

- SceneView
- MapView
- Intro to MapView
- Intro to SceneView
- LayerView
- goTo()
- tryFatalErrorRecovery()
- Graphic
- GraphicsLayer
- Intro to graphics
- Sample: Highlight features by geometry
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- LayerView
- when()
- Theme
- Sample - Color theming for interactive tools
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- fatalError
- Sample - StreamLayer
- EventDefer
- MapView.whenAnalysisView()
- SceneView.whenAnalysisView()
- MapView.whenAnalysisView()
- SceneView.whenAnalysisView()
- Sample: Access features with click events
- View.whenLayerView()
- View.whenLayerView()
- size
- height
- width

## Property Details

### `allLayerViews`

### `animation`

### `basemapView`

### `declaredClass`
- **Type:** `Inherited`

### `displayFilterEnabled`

### `fatalError`

### `graphics`

### `highlights`

### `input`

### `interacting`

### `layerViews`

### `magnifier`

### `map`

### `navigating`

### `navigation`

### `padding`

### `ready`

### `readyState`

### `resolution`

### `spatialReference`

### `stationary`

### `theme`

### `timeExtent`

### `type`

### `updating`

### `views`

### `addHandles`
- **Type:** `Inherited`

### `destroy`

### `emit`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `on`

### `removeHandles`
- **Type:** `Inherited`

### `tryFatalErrorRecovery`

### `when`

### `whenLayerView`

### `EventDefer`

### `EventDeferredOperation`


## Method Details

### `Method Details()`


## Examples

```javascript
// Load the Map and MapView modules
const [Map, MapView] = await $arcgis.import(["@arcgis/core/Map.js", "@arcgis/core/views/MapView.js"]);
// Create a Map instance
const map = new Map({
  basemap: "topo-vector"
});

// Create a MapView instance (for 2D viewing) and set its map property to
// the map instance we just created
const view = new MapView({
  map: map,
  container: "viewDiv"
});
```

```javascript
<body>
 <div id="viewDiv"></div>
</body>
```

```javascript
reactiveUtils.when(
  () => view.fatalError,
  () => {
    console.error("Fatal Error! View has lost its WebGL context. Attempting to recover...");
    view.tryFatalErrorRecovery();
  }
);
```

```javascript
// Adds a graphic to the View
view.graphics.add(pointGraphic);
```

```javascript
// Removes a graphic from the View
view.graphics.remove(pointGraphic);
```

```javascript
// Use the default highlights collection to apply a highlight to features when you hover over them

// A handler can be used to remove any previous highlight when applying a new one
let hoverHighlight;

view.on("pointer-move", (event) => {
  // Search for the first feature in the featureLayer at the hovered location
  view.hitTest(event, { include: featureLayer }).then((response) => {
    if (response.results[0]) {
       const graphic = response.results[0].graphic;
       view.whenLayerView(graphic.layer).then((layerView) => {
         // Remove any previous highlight, if it exists
         hoverHighlight?.remove();
         // Highlight the hit features with the temporary highlight options, which are pre-configured for this use case
         hoverHighlight = layerView.highlight(graphic, { name: "temporary"});
       });
    }
  });
});
```

