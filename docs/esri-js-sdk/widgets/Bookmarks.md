# Bookmarks

**Module:** `@arcgis/core/widgets/Bookmarks`

## Import

```javascript
import Bookmarks from "@arcgis/core/widgets/Bookmarks.js";
```

```javascript
// CDN
const Bookmarks = await $arcgis.import("@arcgis/core/widgets/Bookmarks.js");
```

**Since:** 4.8

## See Also

- Sample - Bookmarks widget
- Sample - WebStyleSymbol (has manually defined bookmarks)
- BookmarksViewModel
- MapView
- SceneView
- Heading Elements
- Calcite Icon Search

## Property Details

### `Bookmarks`

### `bookmarks`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `defaultCreateOptions`

### `defaultEditOptions`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `dragEnabled`

### `filterPlaceholder`

### `filterText`

### `goToOverride`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

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
const bookmarks = new Bookmarks({
  view: view,
  bookmarks: [ // array of bookmarks defined manually
    new Bookmark({
      name: "Angeles National Forest",
      viewpoint: {
        targetGeometry: {
          type: "extent",
          spatialReference: {
            wkid: 102100
          },
          xmin: -13139131.948889678,
          ymin: 4047767.23531948,
          xmax: -13092887.54677721,
          ymax: 4090610.189673263
        }
      }
    }),
    new Bookmark({
      name: "Crystal Lake",
      viewpoint: {
        targetGeometry: {
          type: "extent",
          spatialReference: {
            wkid: 102100
          },
          xmin: -13125852.551697943,
          ymin: 4066904.1101411926,
          xmax: -13114291.451169826,
          ymax: 4077614.8487296384
        },
        rotation: 90
      }
    })
  ]
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
const bookmarks = new Bookmarks({
   view: view,
   visibleElements: {
     addBookmarkButton: true,
     editBookmarkButton: true
   },
   draggable: true,
   // whenever a new bookmark is created, a 100x100 px
   // screenshot of the view will be taken and the rotation, scale, and extent
   // of the view will not be set as the viewpoint of the new bookmark
   defaultCreateOptions: {
     takeScreenshot: true,
     captureViewpoint: false,
     captureTimeExtent: false, // the time extent of the view will not be saved in the bookmark
     screenshotSettings: {
       width: 100,
       height: 100
     }
   }
});
```

```javascript
// The following snippet uses Search but can be applied to any
// widgets that support the goToOverride property.
search.goToOverride = function(view, goToParams) {
  goToParams.options = {
    duration: updatedDuration
  };
  return view.goTo(goToParams.target, goToParams.options);
};
```

