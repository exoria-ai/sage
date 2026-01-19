# View2D

**Module:** `@arcgis/core/views/View2D`

## Import

```javascript
import View2D from "@arcgis/core/views/View2D.js";
```

```javascript
// CDN
const View2D = await $arcgis.import("@arcgis/core/views/View2D.js");
```

**Since:** 4.31

## See Also

- LinkChartView
- MapView
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

### `allLayerViews`
- **Type:** `Inherited`

### `analyses`

### `animation`

### `animationsEnabled`

### `aria`

### `background`

### `basemapView`
- **Type:** `Inherited`

### `breakpoints`

### `center`

### `constraints`

### `container`

### `declaredClass`
- **Type:** `Inherited`

### `displayFilterEnabled`
- **Type:** `Inherited`

### `extent`

### `fatalError`
- **Type:** `Inherited`

### `floors`

### `focused`

### `graphics`
- **Type:** `Inherited`

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

### `popup`

### `popupEnabled`

### `ready`
- **Type:** `Inherited`

### `readyState`
- **Type:** `Inherited`

### `resizeAlign`

### `resizing`

### `resolution`

### `rotation`

### `scale`

### `size`

### `spatialReference`

### `spatialReferenceLocked`

### `stationary`
- **Type:** `Inherited`

### `suspended`

### `theme`
- **Type:** `Inherited`

### `tileInfo`

### `timeExtent`
- **Type:** `Inherited`

### `timeZone`

### `type`

### `ui`

### `updating`
- **Type:** `Inherited`

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

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `openPopup`

### `removeHandles`
- **Type:** `Inherited`

### `toMap`

### `toScreen`

### `tryFatalErrorRecovery`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `whenAnalysisView`

### `whenLayerView`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

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

```javascript
// Sets the initial center point of the view to lon/lat coordinates
// lon/lat will be projected to match the spatial reference of the view
let view = new MapView({
  center: [-112, 38]
});
```

