# SceneView

**Module:** `@arcgis/core/views/SceneView`

## Import

```javascript
import SceneView from "@arcgis/core/views/SceneView.js";
```

```javascript
// CDN
const SceneView = await $arcgis.import("@arcgis/core/views/SceneView.js");
```

**Since:** 4.0

## See Also

- Intro to SceneView
- Sample - SceneLayer
- Sample - Create a local scene
- Sample - Easy navigation
- Sample - Elevation Info
- Sample - Toggle basemap elevation
- Sample - Custom background for SceneView
- Sample - Event explorer / watch properties
- Sample - Detect WebGL support
- Sample - Weather visualization
- Sample - Weather component
- MapView
- Map
- LayerView
- goTo()
- Element: ariaDescribedByElements property
- Element: ariaLabelledByElements property
- ARIA: aria-description attribute
- ARIA: aria-label attribute
- Sample: Responsive apps using CSS
- MDN Web docs: Media Queries
- goTo()
- goTo()
- viewingMode
- Sample - Create a local scene
- Sample - Custom background for SceneView (altitude)
- camera
- goTo()
- tryFatalErrorRecovery()
- Graphic
- GraphicsLayer
- Intro to graphics
- Sample: Responsive widgets
- Sample: Responsive apps using CSS
- highlight()
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- Sample: Highlight features by geometry
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- LayerView
- Sample - SceneView memory resources
- popupEnabled
- openPopup()
- Loading the Popup
- popup
- openPopup
- when()
- goTo()
- Theme
- Sample - Color theming for interactive tools
- clippingArea
- Sample - Create a local scene
- goTo()
- Sample: SceneView - visibleArea
- extent
- Sample: Responsive widgets
- Sample: Responsive apps using CSS
- goTo()
- popup
- openPopup
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Sample - SceneView goTo()
- Sample: Access features with click events
- Sample: SceneView - hitTest
- popup
- closePopup
- Popup.open
- Intro to popups
- Sample - Query with rest/query
- Sample - Popup with DOM node
- Sample - Take a screenshot of a SceneView
- fatalError
- Sample - StreamLayer
- toMap
- hitTest
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

### `SceneView`

### `allLayerViews`
- **Type:** `Inherited`

### `alphaCompositingEnabled`

### `analyses`

### `animation`

### `aria`

### `basemapView`
- **Type:** `Inherited`

### `breakpoints`

### `camera`

### `center`

### `clippingArea`

### `constraints`

### `container`

### `declaredClass`
- **Type:** `Inherited`

### `displayFilterEnabled`
- **Type:** `Inherited`

### `environment`

### `extent`

### `fatalError`
- **Type:** `Inherited`

### `floors`

### `focused`

### `graphics`
- **Type:** `Inherited`

### `groundView`

### `height`

### `heightBreakpoint`

### `highlightOptions`

### `highlights`
- **Type:** `Inherited`

### `input`
- **Type:** `Inherited`

### `interacting`
- **Type:** `Inherited`

### `layerViews`
- **Type:** `Inherited`

### `magnifier`
- **Type:** `Inherited`

### `map`
- **Type:** `Inherited`

### `navigating`
- **Type:** `Inherited`

### `navigation`
- **Type:** `Inherited`

### `orientation`

### `padding`
- **Type:** `Inherited`

### `performanceInfo`

### `popup`

### `popupEnabled`

### `qualityProfile`

### `ready`
- **Type:** `Inherited`

### `readyState`
- **Type:** `Inherited`

### `resizing`

### `resolution`
- **Type:** `Inherited`

### `scale`

### `size`

### `spatialReference`

### `stationary`
- **Type:** `Inherited`

### `suspended`

### `theme`
- **Type:** `Inherited`

### `tileInfo`

### `timeExtent`
- **Type:** `Inherited`

### `type`

### `ui`

### `updating`
- **Type:** `Inherited`

### `viewingMode`

### `viewpoint`

### `visibleArea`

### `width`

### `widthBreakpoint`

### `zoom`

### `addHandles`
- **Type:** `Inherited`

### `closePopup`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `goTo`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `hitTest`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `on`

### `openPopup`

### `removeHandles`
- **Type:** `Inherited`

### `takeScreenshot`

### `toMap`

### `toScreen`

### `tryFatalErrorRecovery`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `whenAnalysisView`

### `whenLayerView`
- **Type:** `Inherited`

### `EasingFunction`

### `GoToOptions3D`

### `GoToTarget3D`

### `GraphicHit`

### `HitTestResult`

### `IntersectItem`

### `MediaHit`

### `RouteHit`

### `ScreenPoint`

### `Screenshot`

### `ViewHit`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a basic SceneView instance with a basemap and world elevation
const view = new SceneView({
  // An instance of Map or WebScene
  map: new Map({
    basemap: "hybrid"
  }),

  // The id of a DOM element (may also be an actual DOM element)
  container: "viewDiv"
});
```

```javascript
// create a SceneView instance (for 3D viewing)
const view = new SceneView({
  map: new Map({
    basemap: "topo-vector"
  }),
  container: "viewDiv"
});

view.when(function() {
  // SceneView is now ready for display and can be used. Here we will
  // use goTo to view a particular location at a given zoom level, camera
  // heading and tilt.
  view.goTo({
    center: [-112, 38],
    zoom: 13,
    heading: 30,
    tilt: 60
  })
})
.catch(function(err) {
  // A rejected view indicates a fatal error making it unable to display,
  // this usually means that WebGL is not available, or too old.
  console.error("SceneView rejected:", err);
});
```

```javascript
// Compatibility with 2D viewing properties, such as center and zoom, allows
// convenient transitioning from the familiar use of the 2D MapView to the
// use of the SceneView for 3D viewing.
let view = new SceneView({
  map: new Map({
    basemap: "satellite"
  }),

  container: "viewDiv",

  // Sets the center point of the view at a specified lon/lat
  center: [-112, 38],

  // Sets the zoom LOD to 13
  zoom: 13
});
```

```javascript
// go to a location specified in geographic coordinates,
// from a 45 degree angle.
view.goTo({
  center: [-112, 38],
  heading: 45
});

// go to view all the graphics in view.graphics, while northing the
// the camera and tilting it to 60 degrees
view.goTo({
  target: view.graphics,
  heading: 0,
  tilt: 60
});

// Set the view to show an extent at a -20 degree heading, disabling the
// animated transition
view.goTo({
  target: new Extent(694942, 5596444, 1284090, 6163926, SpatialReference.WebMercator),
  heading: -20
}, {
  animate: false
});
```

```javascript
let view = new SceneView({
  map: new Map({
    basemap: "satellite",

    // A ground preset containing a single elevation layer, sourced from
    // https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer
    ground: "world-elevation"
  },

  container: "viewDiv"
});
```

```javascript
// Typical usage
let view = new SceneView({
  // ID of DOM element containing the view
  container: "viewDiv",
  // Map/WebScene object
  map: new Map()
});
```

