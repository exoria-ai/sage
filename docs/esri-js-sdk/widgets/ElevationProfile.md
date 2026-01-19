# ElevationProfile

**Module:** `@arcgis/core/widgets/ElevationProfile`

## Import

```javascript
import ElevationProfile from "@arcgis/core/widgets/ElevationProfile.js";
```

```javascript
// CDN
const ElevationProfile = await $arcgis.import("@arcgis/core/widgets/ElevationProfile.js");
```

**Since:** 4.18

## See Also

- Sample - ElevationProfile widget
- ElevationProfileViewModel
- ElevationProfileLineGround
- ElevationProfileLineInput
- ElevationProfileLineQuery
- ElevationProfileLineView
- Calcite Icon Search

## Property Details

### `ElevationProfile`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `icon`

### `id`
- **Type:** `Inherited`

### `input`

### `label`

### `profiles`

### `unit`

### `unitOptions`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

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

### `postInitialize`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const elevationProfile = new ElevationProfile({ view });
// adds the ElevationProfile to the top right corner of the view
view.ui.add(elevationProfile, "top-right");
```

```javascript
// elevation profile with all the line profiles
const elevationProfile = new ElevationProfile({
  view,
  profiles: [{
    // displays elevation values from Map.ground
    type: "ground", //autocasts as new ElevationProfileLineGround()
    color: "#61d4a4",
    title: "Ground elevation"
  }, {
    // displays elevation values from the input line graphic
    type: "input", //autocasts as new ElevationProfileLineInput()
    color: "#f57e42",
    title: "Line elevation"
  }, {
    // displays elevation values from a SceneView
    type: "view", //autocasts as new ElevationProfileLineView()
    color: "#8f61d4",
    title: "View elevation"
    // by default ground and all layers are used to compute elevation, but
    // you can define which elements should be included/excluded from the computation
    exclude: [map.ground]
  }, {
    // displays elevation values from a custom source
    type: "query",
    source: new ElevationLayer({
      url: "https://elevation3d.arcgis.com/arcgis/rest/../Terrain3D/ImageServer"
    }),
    color: "#d46189",
    title: "Custom elevation"
  }]
});
view.ui.add(elevationProfile, "bottom-right");
```

```javascript
// Line whose elevation profile is to be generated.
const inputLine = new Graphic({
  geometry: new Polyline({
    spatialReference: SpatialReference.WebMercator,
    paths: [
      [
        [950857, 6003812], // Zurich, Switzerland
        [924987, 5950271], // Lucerne, Switzerland
      ]
    ],
  }),
});

// Elevation profile for the existing line.
const elevationProfile = new ElevationProfile({
  view,
  input: inputLine,
  // Don't let the user draw or select a new line because we provide one programmatically.
  visibleElements: {
    sketchButton: false,
    selectButton: false
  }
});
view.ui.add(elevationProfile, "bottom-right");
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

