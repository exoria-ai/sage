# Feature

**Module:** `@arcgis/core/widgets/Feature`

## Import

```javascript
import Feature from "@arcgis/core/widgets/Feature.js";
```

```javascript
// CDN
const Feature = await $arcgis.import("@arcgis/core/widgets/Feature.js");
```

**Since:** 4.7

## See Also

- FeatureViewModel
- Popup
- DefaultUI
- PopupTemplate
- Arcade Profiles: Popup
- Arcade - expression language
- PopupTemplate.content
- Heading Elements
- Calcite Icon Search
- Type system
- Arcade Profiles: Popup
- Type system
- Arcade Profiles: Popup
- headingLevel
- PopupTemplate.content

## Property Details

### `Feature`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `defaultPopupTemplateEnabled`

### `destroyed`
- **Type:** `Inherited`

### `graphic`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `location`

### `map`

### `spatialReference`

### `timeZone`

### `title`

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

### `nextMedia`

### `on`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

### `previousMedia`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `setActiveMedia`

### `when`
- **Type:** `Inherited`

### `VisibleContentElements`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create graphic
let graphic = new Graphic({
  geometry: view.center,
  popupTemplate: {
    content: [{
      // add popupTemplate content
    }]
  }
});

// map and spatialReference must be set for Arcade
// expressions to execute and display content
let feature = new Feature({
  graphic: graphic,
  map: map,
  spatialReference: spatialReference
});

view.ui.add(feature, "top-right");
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
let graphic = new Graphic({
  geometry: view.center,
  attributes: {
    "name": "Spruce",
    "family": "Pinaceae",
    "count": 126
  },
  symbol: new SimpleMarkerSymbol({
    style: "square",
    color: "blue",
    size: "8px"
  }),
  popupTemplate: {
    content: [
      {
        // Set popup template content
      }
    ]
  }
});
```

```javascript
// feature title will render as an <h3>
feature.headingLevel = 3;
```

