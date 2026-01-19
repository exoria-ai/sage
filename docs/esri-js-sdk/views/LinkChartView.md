# LinkChartView

**Module:** `@arcgis/core/views/LinkChartView`

## Import

```javascript
import LinkChartView from "@arcgis/core/views/LinkChartView.js";
```

```javascript
// CDN
const LinkChartView = await $arcgis.import("@arcgis/core/views/LinkChartView.js");
```

**Since:** 4.31

## See Also

- MapView
- WebLinkChart
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
- fatalError
- Sample - StreamLayer
- Sample: Access features with click events
- View.whenLayerView()
- View.whenLayerView()
- size
- height
- width

## Property Details

### `LinkChartView`

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
- **Type:** `Inherited`

### `openPopup`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

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


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a new LinkChartView
const view = new LinkChartView({
  container: "viewDiv",
  map: new WebLinkChart({
    portalItem: {
      id: "e62b3b3c9e37400d91648fb0a8801e8a",
    }
  })
});
```

```javascript
// Adds an analysis to the View
view.analyses.add(elevationProfileAnalysis);
```

```javascript
// Removes an analysis from the View
view.analyses.remove(elevationProfileAnalysis);
```

```javascript
reactiveUtils.watch(
  () => view.animation,
  (response) => {
    if(response?.state === "running"){
      console.log("Animation in progress");
    } else{
     console.log("No animation");
    }
  }
);
```

```javascript
let view = new MapView({
  container: "viewDiv",
  map: map,
  background: { // autocasts new ColorBackground()
    color: "magenta" // autocasts as new Color()
  }
});
```

```javascript
// Instead of watching the size or resizing properties
reactiveUtils.watch(() => view.size, () => {});
reactiveUtils.watch(() => view.resizing, () => {});

// Set up a watch handle for breakpoint
reactiveUtils.watch(
  () => view.widthBreakpoint,
  (breakpoint) => {
    switch (breakpoint) {
      case "xsmall":
      // do something
        break;
      case "small":
      case "medium":
      case "large":
      case "xlarge":
      // do something else
        break;
      default:
    }
  }
);
```

