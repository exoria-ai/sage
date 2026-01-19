# Features

**Module:** `@arcgis/core/widgets/Features`

## Import

```javascript
import Features from "@arcgis/core/widgets/Features.js";
```

```javascript
// CDN
const Features = await $arcgis.import("@arcgis/core/widgets/Features.js");
```

**Since:** 4.27

## See Also

- PopupTemplate
- Guide - Esri Icon Font
- FeaturesViewModel
- MapView
- SceneView
- Calcite Icon Search
- Type system
- Arcade Profiles: Popup
- Type system
- Arcade Profiles: Popup
- headingLevel
- Features.visible
- selectedFeatureIndex
- Features.visible
- selectedFeatureIndex
- Popup.actions
- PopupTemplate.actions
- Features.open

## Property Details

### `Features`

### `active`

### `collapsed`

### `container`
- **Type:** `Inherited`

### `content`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `featureNavigationTop`

### `features`

### `goToOverride`

### `headerActions`

### `headingLevel`

### `icon`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `initialDisplayMode`

### `label`

### `map`

### `promises`

### `selectedDrillInFeature`

### `selectedFeature`

### `selectedFeatureIndex`

### `selectedFeatureWidget`

### `spatialReference`

### `timeZone`

### `title`

### `view`

### `viewModel`

### `visible`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `blur`

### `classes`
- **Type:** `Inherited`

### `clear`

### `close`

### `destroy`
- **Type:** `Inherited`

### `emit`

### `fetchFeatures`

### `focus`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `next`

### `on`

### `open`

### `postInitialize`
- **Type:** `Inherited`

### `previous`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `triggerAction`

### `when`
- **Type:** `Inherited`

### `FetchFeaturesOptions`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a new instance of Features and set this on the View's
// popup. When features are selected in the map, the Features widget
// will automatically open in its respective container.
const view = new MapView({
  container: "viewDiv",
  map: map,
  popup: new Features({
    container: "features-widget"
  })
});
```

```javascript
// Create a new instance of Features and set the view property
// to the View along with the container that holds the widget
// such as a Calcite Shell Panel.
const featuresWidget = new Features({
  view: view,
  container: "features-widget"
});

// Use reactiveUtils to watch for when the view has a click event
// then open the Features widget in its respective container.
reactiveUtils.on(()=> view, "click",
(event)=>{
  featuresWidget.open({
    location: event.mapPoint,
    fetchFeatures: true
  })
});
```

```javascript
// Create the HTML div element programmatically at runtime and set to the widget's container
const basemapGallery = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
// Specify an already-defined HTML div element in the widget's container

const basemapGallery = new BasemapGallery({
  view: view,
  container: basemapGalleryDiv
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});

// HTML markup
<body>
  <div id="viewDiv"></div>
  <div id="basemapGalleryDiv"></div>
</body>
```

```javascript
// Specify the widget while adding to the view's UI
const basemapGallery = new BasemapGallery({
  view: view
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
// This sets generic instructions in the widget that will always be displayed
// unless it is overridden by a PopupTemplate
featuresWidget.content = "Click a feature on the map to view its attributes";
```

