# MapView

**Module:** `@arcgis/core/views/MapView`

## Import

```javascript
import MapView from "@arcgis/core/views/MapView.js";
```

```javascript
// CDN
const MapView = await $arcgis.import("@arcgis/core/views/MapView.js");
```

**Since:** 4.0

## See Also

- Intro to MapView
- Sample - Geodesic Buffers (2D & 3D)
- Sample - Event explorer / watch properties
- SceneView
- Map
- ViewAnimation
- LayerView
- goTo()
- Element: ariaDescribedByElements property
- Element: ariaLabelledByElements property
- ARIA: aria-description attribute
- ARIA: aria-label attribute
- Sample: Responsive apps using CSS
- MDN Web docs: Media Queries
- goTo()
- TileInfo.create()
- Zoom and LODs
- goTo()
- tryFatalErrorRecovery()
- Graphic
- GraphicsLayer
- Intro to graphics
- Sample: Responsive widgets
- Sample: Responsive apps using CSS
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- Sample: Highlight features by geometry
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- LayerView
- popupEnabled
- openPopup()
- Loading the Popup
- popup
- openPopup
- when()
- goTo()
- Zoom and LODs
- spatialReferenceLocked
- spatialReference
- Theme
- Sample - Color theming for interactive tools
- wikipedia - List of tz database time zones
- goTo()
- extent
- Sample: Responsive widgets
- Sample: Responsive apps using CSS
- goTo()
- Understanding MapView lods
- popup
- openPopup
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Sample: Access features with pointer events
- popup
- closePopup
- Popup.open
- Intro to popups
- Sample - Query with rest/query
- Sample - Popup with DOM node
- Sample - Take a screenshot of a SceneView
- fatalError
- Sample - StreamLayer
- hitTest()
- Sample: Access features with click events
- View.whenLayerView()
- View.whenLayerView()
- size
- height
- width

## Property Details

### `MapView`

### `allLayerViews`
- **Type:** `Inherited`

### `analyses`
- **Type:** `Inherited`

### `animation`
- **Type:** `Inherited`

### `animationsEnabled`
- **Type:** `Inherited`

### `aria`
- **Type:** `Inherited`

### `background`
- **Type:** `Inherited`

### `basemapView`
- **Type:** `Inherited`

### `breakpoints`
- **Type:** `Inherited`

### `center`
- **Type:** `Inherited`

### `constraints`
- **Type:** `Inherited`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `displayFilterEnabled`
- **Type:** `Inherited`

### `extent`
- **Type:** `Inherited`

### `fatalError`
- **Type:** `Inherited`

### `floors`
- **Type:** `Inherited`

### `focused`
- **Type:** `Inherited`

### `graphics`
- **Type:** `Inherited`

### `height`
- **Type:** `Inherited`

### `heightBreakpoint`
- **Type:** `Inherited`

### `highlightOptions`
- **Type:** `Inherited`

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
- **Type:** `Inherited`

### `padding`
- **Type:** `Inherited`

### `popup`
- **Type:** `Inherited`

### `popupEnabled`
- **Type:** `Inherited`

### `ready`
- **Type:** `Inherited`

### `readyState`
- **Type:** `Inherited`

### `resizeAlign`
- **Type:** `Inherited`

### `resizing`
- **Type:** `Inherited`

### `resolution`
- **Type:** `Inherited`

### `rotation`
- **Type:** `Inherited`

### `scale`
- **Type:** `Inherited`

### `size`
- **Type:** `Inherited`

### `spatialReference`
- **Type:** `Inherited`

### `spatialReferenceLocked`
- **Type:** `Inherited`

### `stationary`
- **Type:** `Inherited`

### `suspended`
- **Type:** `Inherited`

### `theme`
- **Type:** `Inherited`

### `tileInfo`
- **Type:** `Inherited`

### `timeExtent`
- **Type:** `Inherited`

### `timeZone`
- **Type:** `Inherited`

### `type`
- **Type:** `Inherited`

### `ui`
- **Type:** `Inherited`

### `updating`
- **Type:** `Inherited`

### `viewpoint`
- **Type:** `Inherited`

### `visibleArea`
- **Type:** `Inherited`

### `width`
- **Type:** `Inherited`

### `widthBreakpoint`
- **Type:** `Inherited`

### `zoom`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `closePopup`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `goTo`
- **Type:** `Inherited`

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
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `takeScreenshot`

### `toMap`
- **Type:** `Inherited`

### `toScreen`
- **Type:** `Inherited`

### `tryFatalErrorRecovery`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `whenAnalysisView`
- **Type:** `Inherited`

### `whenLayerView`
- **Type:** `Inherited`

### `EasingFunction`

### `GoToOptions2D`

### `GoToTarget2D`

### `GraphicHit`

### `HitTestItem`

### `HitTestResult`

### `MediaHit`

### `RouteHit`

### `ScreenPoint`

### `Screenshot`

### `ToScreenOptions2D`

### `ViewHit`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a MapView instance (for 2D viewing)
const view = new MapView({
  map: myMap,  // References a Map instance
  container: "viewDiv"  // References the ID of a DOM element
});
```

```javascript
view.scale = 24000; // Sets a 1:24,0000 scale on the view
```

```javascript
view.when(function() {
  // MapView is now ready for display and can be used. Here we will
  // use goTo to view a particular location at a given zoom level and center
  view.goTo({
    center: [-112, 38],
    zoom: 12
  });
})
.catch(function(err) {
  // A rejected view indicates a fatal error making it unable to display.
  // Use the errback function to handle when the view doesn't load properly
  console.error("MapView rejected:", err);
});
```

```javascript
const view = new MapView({
  map: map,
  container: "viewDiv",
  zoom: 10,
  extent: initialExtent, // will override zoom
  // map will be centered at [0,0], but the scale from initialExtent will be used
  center: [0,0]
});
```

```javascript
// Create a map with Antarctic imagery basemap
const map = new Map({
  basemap: new Basemap({
    portalItem: {
      id: "6553466517dd4d5e8b0c518b8d6b64cb" // Antarctic Imagery
    }
  });
});

// Set the center and zoom level on the view.
// In this case, the view's spatial reference wkid is 3031
// center is lat/long. projectOperator will be loaded dynamically
// to project the center to match the spatial reference of the view
const view = new MapView({
  map: map,  // References a Map instance
  container: "viewDiv"  // References the ID of a DOM element
  center: [-100, 35], // Sets the center point of the view at a specified lon/lat
  zoom: 3 // MapView converts this to its corresponding scale which is 112823780.660964
});
```

```javascript
// Sets the center point of the view at a specified lon/lat
view.center = [-112, 38];
view.zoom = 13;  // Sets the zoom LOD to 13

// new extent for the mapview where the spatialReference.wkid is 4326
const extent = new Extent({
  xmin: -9177882,
  ymin: 4246761,
  xmax: -9176720,
  ymax: 4247967,
  spatialReference: {
    wkid: 102100
  }
});

if (!projectOperator.isLoaded()) {
  await projectOperator.load();
}
view.extent = extent;
```

