# Search

**Module:** `@arcgis/core/widgets/Search`

## Import

```javascript
import Search from "@arcgis/core/widgets/Search.js";
```

```javascript
// CDN
const Search = await $arcgis.import("@arcgis/core/widgets/Search.js");
```

**Since:** 4.0

## See Also

- SearchViewModel
- SearchSource
- locator
- DefaultUI
- Sample - Search component with multiple sources
- Sample - Search component with custom source
- Proximity searches
- MapView
- SceneView
- Calcite Icon Search
- Event: select-result
- select()

## Property Details

### `Search`

### `activeMenu`

### `activeSource`

### `activeSourceIndex`

### `allPlaceholder`

### `allSources`

### `autoNavigate`

### `autoSelect`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `defaultSources`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `goToOverride`

### `icon`

### `id`
- **Type:** `Inherited`

### `includeDefaultSources`

### `label`

### `locationEnabled`

### `maxResults`

### `maxSuggestions`

### `minSuggestCharacters`

### `popupEnabled`

### `popupTemplate`

### `portal`

### `resultGraphic`

### `resultGraphicEnabled`

### `results`

### `searchAllEnabled`

### `searchTerm`

### `selectedResult`

### `sources`

### `suggestions`

### `suggestionsEnabled`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `blur`

### `classes`
- **Type:** `Inherited`

### `clear`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `focus`

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

### `search`

### `suggest`

### `when`
- **Type:** `Inherited`

### `SearchResponse`

### `SearchResult`

### `SuggestResponse`

### `SuggestResult`


## Method Details

### `Method Details()`


## Examples

```javascript
const searchWidget = new Search({
  view: view
});
// Adds the search widget below other elements in
// the top left corner of the view
view.ui.add(searchWidget, {
  position: "top-left",
  index: 2
});
```

```javascript
// typical usage
const searchWidget = new Search({
  view: view,
  sources: [ ... ]
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
// The following snippet uses Search but can be applied to any
// widgets that support the goToOverride property.
search.goToOverride = function(view, goToParams) {
  goToParams.options = {
    duration: updatedDuration
  };
  return view.goTo(goToParams.target, goToParams.options);
};
```

